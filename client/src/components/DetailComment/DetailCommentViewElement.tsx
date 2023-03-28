/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { CommentType } from "@/types/comments";
import { returnCommentArrayType } from "@/types/comments";
import { useState } from "react";
import { getChildComments } from "@/api/comment/getChildComments";
import DetailCommentInput from "./DetailCommentInput";
import { deleteComment } from "@/api/comment/deleteComment";
import { putLikeComment } from "@/api/comment/putLikeComment";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import DetailCommentView from "./DetailCommentView";
import { useEffect } from "react";

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
  refreshCommentsHandler,
  myInfo
}: {
  bookId: number;
  comment: CommentType;
  parentId: number | null;
  refreshCommentsHandler: Function;
  myInfo: any;
}) => {

  const [likeState, setLikeState] = useState<boolean>(comment.likeState)
  const [likeStatusSize, setLikeStatusSize] = useState<number>(comment.likeStatusSize)
  const [toggleEditComment, setToggleEditComment] = useState<boolean>(false)
  const [toggleChildComments, setToggleChildComments] = useState<boolean>(false)

  useEffect(() => {
    console.log(myInfo)
  }, [])
  

  const refreshCommentsReHandler = () => {
    refreshCommentsHandler()
    setToggleEditComment(() => false)
  }

  const toggleEditCommentHandler = () => {
    setToggleEditComment((prev) => !prev)
  }
  
  const toggleChildCommentsHandler = () => {
    setToggleChildComments((prev) => !prev)
  }

  const deleteCommentHandler = () => {
    deleteComment({commentId: comment.commentId})
    .then(() => {
      refreshCommentsReHandler()
    })
  }

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
      {comment.depth === 0 && 
        <div css={footerElementCSS} onClick={toggleChildCommentsHandler}>
          <FaRegComment css={footerIconCSS} />
          답글 보기
        </div>
      }
      {comment.writerInfo.userId === myInfo &&
        comment.isDelete === false && (
          <div css={footerElementCSS} onClick={deleteCommentHandler}>
            삭제
          </div>
        )}
      {comment.writerInfo.userId === myInfo &&
        comment.isDelete === false && (
          <div css={footerElementCSS} onClick={toggleEditCommentHandler}>
            {toggleEditComment ? "취소" : "수정"}
          </div>
        )}
    </div>
  );


  

  const editInput = (<DetailCommentInput action={'put'} defaultValue={comment.content} bookId={bookId} commentId={comment.commentId} parentId={parentId} refreshCommentsHandler={refreshCommentsReHandler}/>)
  const commentContent = toggleEditComment ? (editInput) : comment.isDelete ? (<div css={deletedStringCSS}>삭제된 댓글입니다.</div>) : (`${comment.content}`);
  
  const childCommentsRender = (
    <div css={childCommentsWrapperCSS({depth: comment.depth})}>
      <DetailCommentView bookId={bookId} position={1} parentId={comment.commentId} criteria={'date'} myInfo={myInfo}/>
    </div>
    
  )


  return (
    <div css={commentWrapperCSS}>
      {comment.isDelete === false && commentHeader}

      <div css={commentContentWrapperCSS}>
        {commentContent}
        {/* {comment.content} */}
       
      </div>
      {commentFooter}
      {toggleChildComments && childCommentsRender}
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
  color: var(--text-color);
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

const childCommentsWrapperCSS = ({depth}: {depth: number}) => {
  return css`
    margin-left: ${depth === 0 ? '24px' : '0px'};
  `;
}

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
