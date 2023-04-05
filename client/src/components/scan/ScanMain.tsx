/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import Waterfall from "./Waterfall/Waterfall";
import { bookContentType } from "@/types/books";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import Button from "../UI/Button/Button";
import UseAnimations from 'react-useanimations';
import activity from 'react-useanimations/lib/activity'

interface ScanMainProps {
    bookData: bookContentType[];
    phaseHandler: Function;
}

const ScanMain = ({bookData, phaseHandler}: ScanMainProps) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();

    return (
        <div css={scanOuterWrapperCSS}>
            <div css={headerCSS({isMobile})}>
            <UseAnimations strokeColor={'var(--text-color)'} animation={activity} size={isMobile ? 64 : 96} />
                <div css={descWrapperCSS({isMobile})}>읽은 작품들의 평가를 진행해 주세요!</div>
            </div>
            
            <div className={'waterfall-wrapper'} css={waterfallWrapperCSS}>
                <Waterfall bookData={bookData} identifier="scanned" rotate={1} duration={2000}/>
            </div>
            <div css={css`width: 100%; display: flex; justify-content: center; ${isMobile ? 'margin-top: 50px;' : ''}`}>
                <Button width={isMobile ? '50%' : '20%'} height={'64px'} onClick={() => {phaseHandler(3)}}>평가 완료</Button>
            </div>
            
            
        </div>
    )
}

const scanOuterWrapperCSS = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-content: center;
    /* margin-top: 50px; */
    /* padding-top: 3vw; */


`

const descWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        
        font-size: ${isMobile ? '5vw' : '3vw'};
        display: flex;
        justify-content: center;
        -webkit-box-align: center;
    `
}

const waterfallWrapperCSS = css`
    /* width: auto; */
    margin-top: 30px;
    

    
`

const headerCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        width: 100%;
        height: ${isMobile ? '40vw' : '12vw'};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--back-color);
        border-bottom: 1px solid var(--border-color-2);
        /* padding-top: 20px; */
    `
}

export default ScanMain