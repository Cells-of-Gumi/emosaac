/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import UseAnimations from 'react-useanimations';
import alertCircle from 'react-useanimations/lib/alertCircle'


const FloatingButtonModalFinish = ({modalHandler, phaseHandler}: {modalHandler: Function; phaseHandler: Function;}) => {

    useEffect(() => {
        setTimeout(() => {
            modalHandler()
            phaseHandler(10)
        }, 2000)
    }, [])

    return (
        <div css={loadingWrapperCSS}>
            <UseAnimations strokeColor={'var(--text-color)'} animation={alertCircle} size={96} />
            <div css={descWrapperCSS}>저장 완료!</div>
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
    font-size: 32px;
`

export default FloatingButtonModalFinish