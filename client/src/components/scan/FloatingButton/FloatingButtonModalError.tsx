/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import UseAnimations from 'react-useanimations';
import alertTriangle from 'react-useanimations/lib/alertTriangle'


const FloatingButtonModalError = ({modalHandler, phaseHandler, errorMessage, setErrorMessage}: {modalHandler: Function; phaseHandler: Function; errorMessage: string; setErrorMessage: Function;}) => {

    useEffect(() => {
        setTimeout(() => {
            // modalHandler()
            setErrorMessage(null)
            phaseHandler(0)
        }, 2000)
    }, [])

    return (
        <div css={loadingWrapperCSS}>
            <UseAnimations strokeColor={'var(--text-color)'} animation={alertTriangle} size={96} />
            <div css={descWrapperCSS}>{errorMessage}</div>
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
    margin: 16px;
    font-size: 24px;
    text-align: center;
`

export default FloatingButtonModalError