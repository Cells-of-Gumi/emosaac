/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2'

const FloatingButtonModalLoading = () => {

    return (
        <div css={loadingWrapperCSS}>
            <UseAnimations strokeColor={'var(--text-color)'} fillColor={'var(--back-color-2)'} animation={loading2} size={96} />
            <div css={descWrapperCSS}>이미지를 분석중입니다.</div>
        </div>
    )
}

const loadingWrapperCSS = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const descWrapperCSS = css`
    margin-top: 16px;
    font-size: 24px;
`

export default FloatingButtonModalLoading