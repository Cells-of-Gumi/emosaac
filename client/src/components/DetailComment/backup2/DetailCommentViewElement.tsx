/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { CommentType } from "@/types/comments";
import { DetailCommentView } from "./DetailCommentView";
import { returnCommentArrayType } from "@/types/comments";
import { useState } from "react";
import { getChildComments } from "@/api/comment/getChildComments";
import DetailCommentInput from "./DetailCommentInput";
import { deleteComment } from "@/api/comment/deleteComment";
import { putLikeComment } from "@/api/comment/putLikeComment";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";

// export type CommentType = {
//     "commentId": number;
//     "content": string;
//     "writerInfo": {
//         "userId": string;
//         "nickname": string;
//         "profileImg": string;
//     },
//     "parentWriterNickName": string | null;
//     "depth": number;
//     "createdDate": string;
//     "modifiedDate": string;
//     "isDelete": boolean;
//     "isChild": boolean;
//     }

const DetailCommentViewElement = ({
  bookId,
  comment,
  parentId,
  refreshParentComments,
}: {
  bookId: number;
  comment: CommentType;
  parentId: number | null;
  refreshParentComments: Function;
}) => {
  const [childComments, setChildComments] = useState<returnCommentArrayType>(
    []
  );
  const [offset, setOffset] = useState<number>(2);
  const [showChildComments, setShowChildComments] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const [likeStatusSize, setLikeStatusSize] = useState<number>(
    comment.likeStatusSize
  );
  const [likeState, setLikeState] = useState<boolean>(comment.likeState);

  const refreshChildCommentsHandler = () => {
    if (parentId !== null) {
      getChildComments({ parentId }).then(
        (res: returnCommentArrayType | null) => {
          if (res !== null) {
            setChildComments(() => res);
            // console.log("refreshChildCommentsHandler", parentId, res);
            // console.log("childComments", childComments);
            setOffset(() => 2);
          }
        }
      );
    }
  };

  const getChildCommentsHandler = (criteria: "date" | "like") => {
    if (parentId !== null) {
      getChildComments({ parentId, criteria, offset }).then(
        (res: returnCommentArrayType | null) => {
          if (res !== null) {
            setChildComments((prev) => [...prev, ...res]);
            // console.log("getChildCommentsHandler", parentId, res);
            setOffset((prev) => prev + 1);
          }
        }
      );
    }
  };

  const refreshSelectHandler = () => {
    // if (parentId === comment.commentId) {
    //     refreshParentComments()
    //     refreshChildCommentsHandler();
    // } else {
    //     refreshChildCommentsHandler();
    //     refreshParentComments()

    // }
    refreshChildCommentsHandler();
    refreshParentComments();
    setEditComment(() => false);
  };

  const childCommentsRender = (
    <div css={childCommentsWrapperCSS}>
      <DetailCommentView
        bookId={bookId}
        comments={childComments}
        getCommentsHandler={getChildCommentsHandler}
        parentId={comment.commentId}
        refreshParentComments={refreshParentComments}
      />
      <div css={childCommentInputWrapperCSS}>
        <DetailCommentInput
          action={"post"}
          bookId={bookId}
          parentId={comment.commentId}
          commentId={comment.commentId}
          refreshCommentsHandler={refreshChildCommentsHandler}
        />
      </div>
    </div>
  );

  const toggleChildCommentHandler = () => {
    refreshChildCommentsHandler();
    setShowChildComments((prev) => !prev);
  };

  const showEditCommentHandler = () => {
    setEditComment((prev) => !prev);
  };

  const deleteCommentHandler = () => {
    deleteComment({ commentId: comment.commentId }).then(() => {
      refreshSelectHandler();
    });
  };

  const likeCommentHandler = () => {
    putLikeComment({ commentId: comment.commentId }).then((res) => {
      if (res?.likeCount !== undefined) {
        setLikeStatusSize(() => res?.likeCount);
        setLikeState(() => res?.likeState);
      }
    });
  };

  const commentHeader = (
    <div css={commentInfoWrapperCSS}>
      <div css={writerInfoWrapperCSS}>
        <div css={profileImgWrapperCSS}>
          <img src={comment.writerInfo.profileImg} />
        </div>
        <span>{comment.writerInfo.nickname}</span>
      </div>
      <span css={dateStringCSS}>{comment.createdDate}</span>
    </div>
  );

  const commentFooter = (
    <div css={commentFooterCSS}>
      {comment.isDelete === false && (
        <div css={footerElementCSS} onClick={likeCommentHandler}>
          {likeState ? (
            <FcLike css={footerIconCSS} />
          ) : (
            <FcLikePlaceholder css={footerIconCSS} />
          )}{" "}
          {likeStatusSize ? likeStatusSize : "좋아요"}
        </div>
      )}
      {
        <div css={footerElementCSS} onClick={toggleChildCommentHandler}>
          <FaRegComment css={footerIconCSS} />
          답글 보기
        </div>
      }
      {comment.writerInfo.userId !== "=== example" &&
        comment.isDelete === false && (
          <div css={footerElementCSS} onClick={deleteCommentHandler}>
            삭제
          </div>
        )}
      {comment.writerInfo.userId !== "=== example" &&
        comment.isDelete === false && (
          <div css={footerElementCSS} onClick={showEditCommentHandler}>
            {editComment ? "취소" : "수정"}
          </div>
        )}
    </div>
  );

  const editInput = (
    <DetailCommentInput
      action={"put"}
      commentId={comment.commentId}
      bookId={bookId}
      parentId={parentId}
      putContent={comment.content}
      refreshCommentsHandler={refreshSelectHandler}
    />
  );
  const commentContent = editComment ? (
    editInput
  ) : comment.isDelete ? (
    <div css={deletedStringCSS}>삭제된 댓글입니다.</div>
  ) : (
    `${comment.content}-${comment.commentId}`
  );

  return (
    <div css={commentWrapperCSS}>
      {comment.isDelete === false && commentHeader}

      <div css={commentContentWrapperCSS}>
        {/* {comment.content} */}
        {commentContent}
      </div>
      {commentFooter}
      {showChildComments && childCommentsRender}
    </div>
  );
};

const commentWrapperCSS = css`
  border-bottom: 1px solid var(--back-color-op);
`;

const commentInfoWrapperCSS = css`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const writerInfoWrapperCSS = css`
  display: flex;
`;

const profileImgWrapperCSS = css`
  width: 36px;
  height: 36px;
  border-radius: 100px;
  background-color: var(--back-color-op);
  overflow: hidden;
`;

const commentContentWrapperCSS = css`
  margin-bottom: 16px;
`;

const commentFooterCSS = css`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const footerElementCSS = css`
  margin-right: 12px;
  font-size: 12px;
  color: var(--text-color-4);
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const childCommentsWrapperCSS = css`
  margin-left: 48px;
`;

const footerIconCSS = css`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;

const dateStringCSS = css`
  font-size: 12px;
  color: var(--text-color-4);
`;

const childCommentInputWrapperCSS = css`
  margin-bottom: 16px;
`;

const deletedStringCSS = css`
  margin-top: 16px;
  color: var(--text-color-4);
`;
export default DetailCommentViewElement;
