/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import StarRating from "./StarRating";

type gradeType = string | number

interface PlatformRatingHoverProps {
    avgGrade: gradeType;
    grade: gradeType[];
}

const PlatformRatingHover = ({avgGrade, grade}: PlatformRatingHoverProps) => {
    const [rating, setRating] = useState<gradeType[]>(grade)

    const ratingRender = rating.map((el, idx) => {
        return (
            <div css={ratingWrapperCSS}>
                <div css={ratingStringWrapperCSS}>플랫폼 : </div>
                <StarRating initialValue={Number(el)} readonly={true}/>
            </div>
        )
    })
    return (
        <div className={"platform-rating-wrapper"} css={platformRatingHoverWrapperCSS}>
            <div css={ratingWrapperCSS}>
                <div css={ratingStringWrapperCSS}>평균 : </div>
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
`

export default PlatformRatingHover