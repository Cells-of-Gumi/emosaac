/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { postComment } from "@/api/comment/postComment";
import { useRef } from "react";


interface DetailCommentInputProps {
    action: string;
    bookId: number;
    parentId: number | null;
    putContent?: string;
    refreshCommentsHandler: Function;
    
}

const DetailCommentInput = ({ action, bookId, parentId, putContent, refreshCommentsHandler }: DetailCommentInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const commentHandler = () => {
        if (inputRef.current && inputRef.current.value.trim() !== '') {
            if (action === 'post') {
                postComment({bookId: bookId, content: inputRef.current.value, parentId: parentId})
                .then(() => {
                    refreshCommentsHandler()
                })
            } else if (action === 'put') {
    
            }
            
        }
    }

    const onEnterHandler = (event: any) => {
        if (event.key === "Enter") {
            commentHandler()
        }
    }

    return (
        <div>
            <input css={inputCSS} ref={inputRef} placeholder={"댓글을 입력해 주세요."} onKeyUp={onEnterHandler}/>
        </div>
        
    )
}

const inputCSS = css`
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: none;
    padding: 16px;
    background-color: var(--back-color-2);
    &:focus {outline: none;};
`

export default DetailCommentInput