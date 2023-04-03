/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import Waterfall from "./Waterfall/Waterfall";
import { bookContentType } from "@/types/books";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import Button from "../UI/Button/Button";

interface ScanMainProps {
    bookData: bookContentType[];
    phaseHandler: Function;
}

const ScanMain = ({bookData, phaseHandler}: ScanMainProps) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();

    return (
        <div css={scanOuterWrapperCSS}>
            <div css={descWrapperCSS({isMobile})}>읽은 작품들의 평가를 진행해 주세요!</div>
            <div className={'waterfall-wrapper'} css={waterfallWrapperCSS}>
                <Waterfall bookData={bookData} identifier="scanned" rotate={1} duration={2000}/>
            </div>
            <div css={css`width: 100vw; display: flex; justify-content: center;`}>
                <Button width={'20%'} height={'64px'} onClick={() => {phaseHandler(3)}}>닫기</Button>
            </div>
            
            
        </div>
    )
}

const scanOuterWrapperCSS = css`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    /* margin-top: 50px; */
    /* padding-top: 3vw; */


`

const descWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        font-size: ${isMobile ? '6vw' : '3vw'};
        display: flex;
        justify-content: center;
        -webkit-box-align: center;
    `
}

const waterfallWrapperCSS = css`
    /* width: auto; */
    margin-top: 100px;
    

    
`

export default ScanMain