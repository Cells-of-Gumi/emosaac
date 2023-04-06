/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react"
import { getRecommendTopGenre } from "@/api/mypage/getReommendTopGenre"
import { bookContentType } from "@/types/books"
import BookCard from "../UI/BookCard/BookCard"
import { useIsResponsive } from "../Responsive/useIsResponsive";

const MyPageAnalyzeBooksRender = ({title, bookData, identifier}: {title: string; bookData: bookContentType[]; identifier: string;}) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();

    const cardsRender = bookData.map((el, idx) => {
        if ((isMobile && idx === 0) || !isMobile) {
            return (
                <div key={`MyPageAnalyzeBooksRender-${el.bookId}`} css={individualCardWrapperCSS({isMobile})}>
                    <BookCard showPlatform={true} bookData={el}/>
                </div>
                
            )
        }
        
    })

    return (
        <div key={identifier} css={parentWrapperCSS({isMobile})}>
            <div css={titleCSS}>{title}</div>
            <div css={cardsWrapperCSS({isMobile})}>
                {cardsRender}
            </div>
            
        </div>
        
    )
}


const MyPageAnalyzeBooks = ({identifier, title, typeCode, isLike, count = 1, }: {identifier: string; title: string; typeCode: number; isLike: number; count: number;}) => {
    const [bookData, setBookData] = useState<bookContentType[]>([])
    
    useEffect(() => {
        getRecommendTopGenre({typeCode, isLike, count})
        .then((res) => {
            if (res) {

                setBookData(() => res)
            }
        })
    }, [])

    return (
        <React.Fragment>
            {bookData?.length !== 0 && <MyPageAnalyzeBooksRender identifier={identifier} bookData={bookData} title={title}/>}
        </React.Fragment>
    )
}

const parentWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: ${isMobile ? `8px` : `16px`};
        background-color: ${isMobile ? '' : 'var(--back-color)'};
        border-radius: 10px;;
        margin: ${isMobile ? '0px' : '16px'};
        margin-top: ${isMobile ? '16px' : '0px'};
    `
}

const titleCSS = css`
    font-size: 18px;
    font-weight: 700;;
`

const cardsWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`

        display: flex;

    `
}

const individualCardWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        
        width: ${isMobile ? '38vw' : '11vw;'};
        display: inline-block;
        margin: 8px;
    `
}

export default MyPageAnalyzeBooks