/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react"

interface ButtonProps {
  width: string;
  height: string;
  platform: number;
  href: string;
}

const RedirButton = ({ width, height, platform, href }: ButtonProps) => {
    const [hrefArr, setHrefArr] = useState<string[]>(href.split(" "))
    const platformBase = ["https://comic.naver.com/", "https://series.naver.com/", "https://page.kakao.com/", "https://ridibooks.com/"]

    
    

    const btnRender = hrefArr.map((el, idx) => {
        const findPlatform = (element: string) => {
            if (el.includes(element)) {
                return true
            }
        }
        const result = platformBase.findIndex(findPlatform)
        return (
            <a href={el}>
                <img src={(result === 0 && "/assets/platform_naver_webtoon.webp") || (result === 1 && "/assets/platform_naver_series.webp") || (result === 2 && "/assets/platform_kakao_page.png") || (result === 3 && "/assets/platform_ridi.webp") || ''} css={platformBtnCSS} />
            </a>
            
        )
    })

  return (
    <div css={buttonCSS({width, height})}>
        <div className={'unhovered'} css={unhoveredCSS}>
            보러가기
        </div>
        <div className={'hovered'} css={hoveredCSS}>
            {btnRender}
        </div>
    </div>
  );
}

interface buttonCSSProps {
  width: string;
  height: string;
}

const buttonCSS = ({width, height}: buttonCSSProps) => {
  return css`
    transition-property: background-color;
    transition-duration: 0.3s;
    /* cursor: pointer; */
    width: ${width};
    height: ${height};
    border: none;
    border-radius: 5px;
    font-size: 18px;
    padding: 0 20px;
    background-color: var(--main-color);
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:hover .unhovered {
        opacity: 0;
    }
    &:hover .hovered {
        opacity: 255;
    }
    &:hover {
        background-color: var(--main-color-2);
    }
  `;
}

const hoveredCSS = css`
    transition-property: opacity;
    transition-duration: 0.3s;
    position: absolute;
    opacity: 0;
`

const unhoveredCSS = css`
    transition-property: opacity;
    transition-duration: 0.3s;
    position: absolute;
    opacity: 255;
`

const platformBtnCSS = css`
    width: 48px;
    height: auto;
    margin: 10px;
`

export default RedirButton