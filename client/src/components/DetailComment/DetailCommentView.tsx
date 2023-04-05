/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { getParentComments } from "@/api/comment/getParentComments";
import { getChildComments } from "@/api/comment/getChildComments";
import { returnCommentArrayType } from "@/types/comments";
import { throttle } from "lodash";
import DetailCommentInput from "./DetailCommentInput";
import DetailCommentViewElement from "./DetailCommentViewElement";

enum Position {
    'PARENTS',
    'CHILDREN'
}

interface DetailCommentViewProps {
    bookId: number;
    parentId: number | null;
    position: Position;
    criteria: "like" | "date";
    commentsWrapperRef?: any;
    getCommentsCount?: Function;
    myInfo: any;
}


const DetailCommentView = ({bookId, parentId, position, criteria, commentsWrapperRef, getCommentsCount, myInfo}: DetailCommentViewProps) => {


    const [comments, setComments] = useState<returnCommentArrayType>([])
    const [offset, setOffset] = useState<number>(2)
    const [getComments, setGetComments] = useState<boolean>(false)


    useEffect(() => {
        refreshCommentsHandler()
    }, [])

    
    const refreshCommentsHandler = () => {
        if (position === 0) {
            getParentComments({bookId, criteria})
            .then((res: returnCommentArrayType | null) => {
                if (res !== null) {
                    setComments(() => res)
                    setOffset(() => 2)
                    if (getCommentsCount !== undefined) {
                        getCommentsCount(res[0]?.totalCount)
                    }   
                    
                }
            })
        } else if (position === 1 && parentId !== null) {
            getChildComments({parentId, criteria: 'date', })
            .then((res: returnCommentArrayType | null) => {
                if (res !== null) {
                    setComments(() => res)
                    setOffset(() => 2);
                }
            });
        }
    }


    const getCommentsHandler = () => {
        if (position === 0) {
            getParentComments({bookId, criteria, offset})
            .then((res: returnCommentArrayType | null) => {
                if (res !== null) {
                    setComments((prev) => [...prev, ...res])
                    setOffset((prev) => prev + 1)
                }
            })
        } else if (position === 1 && parentId !== null) {
            getChildComments({ parentId, criteria: 'date', offset})
            .then((res: returnCommentArrayType | null) => {
                if (res !== null) {
                    setComments((prev) => [...prev, ...res])
                    setOffset((prev) => prev + 1)
                }
            });
        }
    }



    

    useEffect(() => {
        if (getComments === true) {
            getCommentsHandler()
            setGetComments(() => false)
        }
    }, [getComments, comments])

    const setGetCommentsHandler = () => {
        setGetComments(() => true)
    }

    const onWheelGetParentCommentsHandler = useMemo(
        () =>
            throttle((event) => {
                if (position === 0) {
                    if (commentsWrapperRef?.current && (((commentsWrapperRef.current.scrollHeight - 10) < commentsWrapperRef.current.clientHeight) || commentsWrapperRef.current.scrollTop > commentsWrapperRef.current.scrollHeight - commentsWrapperRef.current.clientHeight - 100)) {
                        setGetCommentsHandler()
                    }
                }
            }, 300),
        [comments]
    );

    const onClickGetChildCommentsHandler = () => {
        setGetCommentsHandler()
    }


    const commentsRender = comments.map((el, idx) => {
        return (

                <DetailCommentViewElement key={`${idx}${el.commentId}${el.likeStatusSize}`} bookId={bookId} comment={el} parentId={el.commentId} refreshCommentsHandler={refreshCommentsHandler} myInfo={myInfo} />

        )
    })

    const showMoreChildComments = (
        <div onClick={onClickGetChildCommentsHandler} css={childCommentsShowMoreCSS}>답글 더보기 ∨</div>
    )

    const inputRender = (
        <DetailCommentInput action={'post'} bookId={bookId} parentId={parentId} refreshCommentsHandler={refreshCommentsHandler}/>
    )

    const noCommentsRender = (
        <div css={noCommentsWrapperCSS}>
            댓글을 작성해 주세요!
        </div>
    )

    return (
        <div ref={commentsWrapperRef} onWheel={onWheelGetParentCommentsHandler} onTouchMove={onWheelGetParentCommentsHandler}>
            {position === 0 && inputRender}
            {comments.length !== 0 ? commentsRender : noCommentsRender}
            {position === 1 && <div css={childCommentsInputWrapperCSS}>{inputRender}</div>}
            {(position === 1 && comments.length !== 0 && comments.length < comments[0]?.totalCount) && showMoreChildComments}
        </div>
    )

}


const childCommentsShowMoreCSS = css`
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: var(--text-color-4);
    cursor: pointer;
    user-select: none;

`

const childCommentsInputWrapperCSS = css`
    margin-top: 16px;
    margin-bottom: 16px;
`

const noCommentsWrapperCSS = css`
    height: 64px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default DetailCommentView
