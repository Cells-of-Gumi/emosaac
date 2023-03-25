/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { postComment } from "@/api/comment/postComment";
import { useRef, useEffect, useState } from "react";
import DetailCommentInput from "./DetailCommentInput";
import { returnCommentArrayType } from "@/types/comments";
import { getParentComments } from "@/api/comment/getParentComments";
import DetailCommentView from "./DetailCommentView";
import { useIsResponsive } from "../Responsive/useIsResponsive";



interface DetailCommentProps {
    bookTitle: string;
    bookId: number;
    modalHandler?: any;
}

const DetailComment = ({bookTitle, bookId, modalHandler}: DetailCommentProps) => {

    const commentsWrapperRef = useRef<HTMLDivElement>(null)
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();

    return (
        <div ref={commentsWrapperRef} css={modalWrapperCSS({isMobile})}>
            <div css={titleWrapperCSS}>
                {bookTitle}
            </div>
            
            {/* <button onClick={modalHandler}>닫기</button> */}
            <DetailCommentView bookId={bookId} parentId={null} position={0} criteria={'date'} commentsWrapperRef={commentsWrapperRef} />
        </div>
    )
}

const titleWrapperCSS = css`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const modalWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        width: ${isMobile ? '100vw' : '60vw'};
        height: ${isMobile ? '100vh' : '90vh'};
        background-color: var(--back-color);
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
        /* border-radius: 20px; */
        padding: 36px;
        display: flex;
        flex-direction: column;
        overflow: scroll;
        overflow-x: hidden;
    `
} 


export default DetailComment