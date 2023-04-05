/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { postComment } from "@/api/comment/postComment";
import { putComment } from "@/api/comment/putComment";
import { useRef } from "react";


interface DetailCommentInputProps {
    action: string;
    bookId: number;
    parentId: number | null;
    putContent?: string;
    commentId?: number;
    refreshCommentsHandler: Function;
    
}

const DetailCommentInput = ({ action, bookId, parentId, putContent, commentId, refreshCommentsHandler }: DetailCommentInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const commentHandler = () => {
        if (inputRef.current && inputRef.current.value.trim() !== '') {
            if (action === 'post') {
                postComment({bookId: bookId, content: inputRef.current.value, parentId: parentId})
                .then(() => {
                    refreshCommentsHandler()
                    if (inputRef.current) {
                        inputRef.current.value = ''
                    }
                    
                })
            } else if (action === 'put' && commentId !== undefined) {
                
                putComment({commentId: commentId, content: inputRef.current.value})
                .then(() => {
                    refreshCommentsHandler()
                    if (inputRef.current) {
                        inputRef.current.value = ''
                    }
                })
            }
            
        }
    }

    const onEnterHandler = (event: any) => {
        if (event.key === "Enter") {
            commentHandler()
        }
    }

    return (
        <div css={inputWrapperCSS}>
            <input css={inputCSS} ref={inputRef} placeholder={`댓글을 입력해 주세요. ${parentId}`} defaultValue={putContent ? putContent : ``} onKeyUp={onEnterHandler}/>
            <div onClick={commentHandler} css={confirmBtnCSS} >작성</div>
        </div>
        
    )
}

const inputCSS = css`
    width: 100%;
    height: 48px;
    border-radius: 10px 0px 0px 10px;
    border: none;
    padding: 16px;
    background-color: var(--back-color-2);
    &:focus {outline: none;};
`

const confirmBtnCSS = css`
    background-color: var(--back-color-2);
    width: 96px;
    height: 48px;
    display: flex;
    border-radius: 0px 10px 10px 0px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition-property: background-color;
    transition-duration: 0.3s;

    &:hover {
        background-color: var(--back-color-3);
    }
`

const inputWrapperCSS = css`
    display: flex;
`

export default DetailCommentInput