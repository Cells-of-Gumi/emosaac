/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import React from "react"
import { useRouter } from "next/router";

const Footer = () => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();
    const router = useRouter();

    return (
        <React.Fragment>
        {!isMobile && router.pathname !== '/' &&
        <div css={footerCSS}>
            <div css={footerSectorCSS}>
            
            <div css={footerTextWrapper}><span css={footerLinkCSS}>도움말</span> <span css={footerSepLine}>│</span> <span css={footerLinkCSS}>의견 보내기</span> <span css={footerSepLine}>│</span> <span css={footerLinkCSS}>개인정보처리방침</span> <span css={footerSepLine}>│</span> <span css={footerLinkCSS}>약관</span></div>
            <div css={css`height:24px;`}/>
            <div css={footerTextWrapper}>상호 : (주) 이모작 <span css={footerSepLine}>│</span> 대표자명 : SSAFY-GUMI-D203 <span css={footerSepLine}>│</span> 사업자등록번호 : 제0000-구미-0000호</div>
            <div css={footerTextWrapper}>주소 : 경북 구미시 3공단 3로 302 <span css={footerSepLine}>│</span> 연락처 : 02-3429-5100 <span css={footerSepLine}>│</span> 팩스 : 02-3429-5100 <span css={footerSepLine}>│</span> 이메일 : ssafy@ssafy.com</div>
            
            <div css={footerLineCSS} />
            <div css={footerCopyrightWrapper}>Copyright ⓒ 2023 Emosaac All rights reserved.</div>
            </div>
      
      </div>
        }
        </React.Fragment>
    )
}





const footerCSS = css`
  width: 100%;
  height: 200px;
  background-color: var(--soft-grey-2);
  /* display: grid;
  grid-template-columns: 50% 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
`

const footerSectorCSS = css`
width: 100%;
  padding: 32px;
  text-align: center;

`


const footerTextWrapper = css`
    color: var(--text-color-4);
    
  margin-bottom: 6px;
`

const footerCopyrightWrapper = css`
font-weight: 600;
  margin-bottom: 6px;
`

const footerLineCSS = css`
  width: 100%;
  height: 1px;
  background-color: var(--back-color-3);
  margin-top: 16px;
  margin-bottom: 16px;
`;

const footerLinkCSS = css`
  cursor: pointer;
`

const footerSepLine = css`
    color: var(--back-color-4);
`

export default Footer