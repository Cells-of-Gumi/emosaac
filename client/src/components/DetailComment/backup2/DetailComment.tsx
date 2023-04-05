/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { postComment } from "@/api/comment/postComment";
import { useRef, useEffect, useState } from "react";
import DetailCommentInput from "./DetailCommentInput";
import { returnCommentArrayType } from "@/types/comments";
import { getParentComments } from "@/api/comment/getParentComments";
import { DetailCommentView, DetailCommentEmpty } from "./DetailCommentView";

interface DetailCommentProps {
    bookId: number;
    modalHandler?: any;
}

const DetailComment = ({bookId, modalHandler}: DetailCommentProps) => {

    const [comments, setComments] = useState<returnCommentArrayType>([])
    const [offset, setOffset] = useState<number>(2)
    const commentsWrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getParentComments({bookId})
        .then((res: returnCommentArrayType | null) => {
            if (res !== null) {
                setComments(() => res)
                setOffset(() => 2)
            }
        })
    }, [])

    const refreshCommentsHandler = () => {
        getParentComments({bookId})
        .then((res: returnCommentArrayType | null) => {
            if (res !== null) {
                setComments(() => res)
                setOffset(() => 2)
            }
        })
    }


    
    const getCommentsHandler = (criteria: 'date' | 'like') => {
        
            getParentComments({bookId, criteria, offset})
            .then((res: returnCommentArrayType | null) => {
                if (res !== null) {
                    setComments((prev) => [...prev, ...res])
                    setOffset((prev) => prev + 1)
                }
            })
    }

    return (
        <div ref={commentsWrapperRef} css={modalWrapperCSS}>
            <DetailCommentInput action={"post"} bookId={bookId} parentId={null} refreshCommentsHandler={refreshCommentsHandler}  />
            {comments ? <DetailCommentView bookId={bookId} comments={comments} getCommentsHandler={getCommentsHandler} refreshParentComments={refreshCommentsHandler} commentsWrapperRef={commentsWrapperRef} parentId={null}/> : <DetailCommentEmpty />}
            <button onClick={modalHandler}>닫기</button>
        </div>
    )
}

const modalWrapperCSS = css`
    width: 60vw;
    height: 90vh;
    background-color: var(--back-color);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    /* border-radius: 20px; */
    padding: 36px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
`


export default DetailComment