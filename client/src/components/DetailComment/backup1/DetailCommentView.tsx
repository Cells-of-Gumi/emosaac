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

export const DetailCommentView = ({comments, getCommentsHandler, commentsWrapperRef}: {comments: returnCommentArrayType; getCommentsHandler: Function; commentsWrapperRef: any}) => {
    
    const [getComments, setGetComments] = useState<boolean>(false)

    useEffect(() => {
        if (getComments === true) {
            getCommentsHandler('date')
            setGetComments(() => false)
        }
    }, [getComments])

    const onWheelHandler = useMemo(
        () =>
            throttle((event) => {
                console.log(commentsWrapperRef)
                if (event.deltaY > 0) {
                    if (commentsWrapperRef.current && (((commentsWrapperRef.current.scrollHeight - 10) < commentsWrapperRef.current.clientHeight) || commentsWrapperRef.current.scrollTop > commentsWrapperRef.current.scrollHeight - commentsWrapperRef.current.clientHeight - 100)) {
                        setGetComments(() => true)
                    }
                }
            }, 300),
        [comments]
    );

    const commentsRender = comments.map((el, idx) => {
        return (
            <DetailCommentViewElement comment={el} isReply={false} />
        )   
    })
    return (
        <div css={commentsWrapperCSS} onWheel={onWheelHandler}>
            {commentsRender}
        </div>
    )
}

export const DetailCommentEmpty = () => {
    return (
        <div>

        </div>
    )
}

const commentsWrapperCSS = css`
    margin-top: 24px;
    margin-bottom: 24px;
`

