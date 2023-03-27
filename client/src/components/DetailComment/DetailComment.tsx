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

type criteriaType = "date" | "like"

const DetailComment = ({bookTitle, bookId, modalHandler}: DetailCommentProps) => {

    const commentsWrapperRef = useRef<HTMLDivElement>(null)
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();
    const [criteria, setCriteria] = useState<criteriaType>('like')
    const [totalCount, setTotalCount] = useState<number>(0)


    const criteriaList: {criteria: criteriaType, label: string}[] = [{criteria: 'like', label: '인기순'}, {criteria: 'date', label: '최신순'}]

    const criteriaRender = criteriaList.map((el, idx) => {
        return (
            <span key={`criteria-${idx}`} css={criteriaCSS({elCriteria: el.criteria, curCriteria: criteria})} onClick={() => {setCriteriaHandler(el.criteria)}}>{el.label}</span>
        )
    })



    const setCriteriaHandler = (criteria: criteriaType) => {
        setCriteria(() => criteria)
    }

    const getCommentsCount = (count: number) => {
        if (typeof count === 'number') {
            setTotalCount(() => count)
        }
        
    }

    return (
        <div ref={commentsWrapperRef} css={modalWrapperCSS({isMobile})}>

            <div css={titleWrapperCSS}>
                댓글 ({totalCount})
            </div>
            <div css={criteriaWrapperCSS}>
                {criteriaRender}
            </div>
            {/* <button onClick={modalHandler}>닫기</button> */}
            <DetailCommentView key={criteria} bookId={bookId} parentId={null} position={0} criteria={criteria} commentsWrapperRef={commentsWrapperRef} getCommentsCount={getCommentsCount} />
        </div>
    )
}

const titleWrapperCSS = css`
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 16px;
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

const criteriaWrapperCSS = css`
    display: flex;
    margin: 0px 0px 16px 0px;
`

const criteriaCSS = ({elCriteria, curCriteria}: {elCriteria: string; curCriteria: string;}) => {
    return css`
        font-size: 14px;
        color: ${elCriteria === curCriteria ? 'var(--back-color-4)' : 'var(--text-color-4)'};;
        margin-right: 8px;
        cursor: pointer;
        background-color: ${elCriteria === curCriteria ? 'var(--text-color-4)' : 'var(--back-color)'};

        box-shadow: ${elCriteria === curCriteria ? 'none' : '0 0 0 1px var(--border-color) inset'};;
        padding: 8px 12px 8px 12px;
        border-radius: 20px;
        transition-property: background-color;
        transition-duration: 0.3s;
    `
}

export default DetailComment