/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import StarRating from "./StarRating";

type gradeType = string | number

interface PlatformRatingHoverProps {
    avgGrade: gradeType;
    grade: gradeType[];
    href: string;
}

const PlatformRatingHover = ({avgGrade, grade, href}: PlatformRatingHoverProps) => {
    const [rating, setRating] = useState<gradeType[]>(grade)

    const [hrefArr, setHrefArr] = useState<string[]>(href.split(" "))
    const platformBase = ["https://comic.naver.com/", "https://series.naver.com/", "https://page.kakao.com/", "https://ridibooks.com/"]

    
    const ratingRender = hrefArr.map((el, idx) => {
        const findPlatform = (element: string) => {
            if (el.includes(element)) {
                return true
            }
        }
        const result = platformBase.findIndex(findPlatform)
        return (
            <div css={ratingWrapperCSS}>
                <div css={ratingStringWrapperCSS}>
                    <img src={(result === 0 && "/assets/platform_naver_webtoon.webp") || (result === 1 && "/assets/platform_naver_series.webp") || (result === 2 && "/assets/platform_kakao_page.png") || (result === 3 && "/assets/platform_ridi.webp") || ''} css={platformIconCSS} />
                </div>
                <StarRating initialValue={Number(el)} readonly={true}/>
            </div>

                

            
        )
    })


    // const ratingRender = rating.map((el, idx) => {
    //     return (
    //         <div css={ratingWrapperCSS}>
    //             <div css={ratingStringWrapperCSS}>플랫폼 : </div>
    //             <StarRating initialValue={Number(el)} readonly={true}/>
    //         </div>
    //     )
    // })

    return (
        <div className={"platform-rating-wrapper"} css={platformRatingHoverWrapperCSS}>
            <div css={ratingWrapperCSS}>
                <div css={ratingStringWrapperCSS}>평균 </div>
                <StarRating initialValue={Number(avgGrade)} readonly={true}/>
            </div>
            
            {ratingRender}
        </div>
    )
}

const platformRatingHoverWrapperCSS = () => {
    return css`
        transition-property: opacity;
        transition-duration: 0.3s;
        position: absolute;
        pointer-events: none;
        opacity: 0%;
        background-color: var(--back-color);
        padding: 16px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
        top: 48px;
        z-index: 100;

    `
}

const ratingWrapperCSS = css`
    display: flex;
    align-items: center;
`

const ratingStringWrapperCSS = css`
    width: 64px;
    font-size:18px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const platformIconCSS = css`
    width: 36px;
    height: auto;
    margin: 10px;
`

export default PlatformRatingHover