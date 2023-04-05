/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { getParentComments } from "@/api/comment/getParentComments";
import { returnCommentArrayType } from "@/types/comments";
import DetailCommentViewElement from "./DetailCommentViewElement";
import { throttle } from "lodash";


interface DetailCommentViewProps {
    bookId: number;

}

export const DetailCommentView = ({bookId, comments, getCommentsHandler, refreshParentComments, commentsWrapperRef, parentId}: {bookId: number; comments: returnCommentArrayType; getCommentsHandler: Function; refreshParentComments: Function; commentsWrapperRef?: any; parentId: number | null}) => {
    
    const [getComments, setGetComments] = useState<boolean>(false)

    useEffect(() => {
        if (getComments === true) {
            getCommentsHandler('date')
            setGetComments(() => false)
        }
    }, [getComments, comments])

    const setGetCommentsHandler = () => {
        setGetComments(() => true)
    }

    const onWheelHandler = useMemo(
        () =>
            throttle((event) => {
                if (event.deltaY > 0) {
                    if (commentsWrapperRef?.current && (((commentsWrapperRef.current.scrollHeight - 10) < commentsWrapperRef.current.clientHeight) || commentsWrapperRef.current.scrollTop > commentsWrapperRef.current.scrollHeight - commentsWrapperRef.current.clientHeight - 100)) {
                        setGetCommentsHandler()
                    }
                }
            }, 300),
        [comments]
    );

    const commentsRender = comments.map((el, idx) => {

        return (
            <div key={`${idx}${el.content}${el.writerInfo.nickname}`} >
                <DetailCommentViewElement bookId={bookId} refreshParentComments={refreshParentComments} comment={el} parentId={el.depth === 0 ? el.commentId : parentId} />
            </div>
            
        )   
    })

    

    const childCommentsShowMore = (
        <div onClick={setGetCommentsHandler} css={childCommentsShowMoreCSS}>
            답글 더보기 ∨
        </div>
    )

    return (
        <div css={commentsWrapperCSS} onWheel={onWheelHandler}>
            {commentsRender}
            {(parentId && comments.length !== 0) && childCommentsShowMore}
            { comments.length === 0 && <DetailCommentEmpty />}
        </div>
    )
}

export const DetailCommentEmpty = () => {
    return (
        <div css={emptyWrapperCSS}>
            댓글이 없어요!
        </div>
    )
}

const commentsWrapperCSS = css`
    margin-top: 24px;
    margin-bottom: 24px;
`

const emptyWrapperCSS = css`
    height: 48px;
    width: 100%;
    display: flex;
    justify-content: center;
`

const childCommentsShowMoreCSS = css`
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: var(--text-color-4);

`