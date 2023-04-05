/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Chart from "./Chart";
import { useEffect } from "react";
import MyPageAnalyzeBooks from "./MyPageAnalyzeBooks";
import { useIsResponsive } from "../Responsive/useIsResponsive";

const MyPageAnalyze = ({typeCode} : {typeCode: number}) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();



    return (
        <div css={myPageAnalyzeWrapperCSS({isMobile})}>
            <div css={chartWrapperCSS({isMobile})}>
                <Chart typeCode={typeCode} />
            </div>
            <div css={css`display: flex;`}>
              <MyPageAnalyzeBooks key={`less-viewed-${typeCode}`} identifier={`less-viewed-${typeCode}`} title={`가장 적게 본 장르 ${typeCode === 0 ? '웹툰' : '웹소설'}`} typeCode={typeCode} isLike={0} count={2}/>
              <MyPageAnalyzeBooks key={`most-viewed-${typeCode}`} identifier={`most-viewed-${typeCode}`} title={`가장 많이 본 장르 ${typeCode === 0 ? '웹툰' : '웹소설'}`} typeCode={typeCode} isLike={1} count={2}/>
            </div>
            
        </div>
    )
}

const myPageAnalyzeWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
  return css`
    width: 100%;
    display: flex;
    ${isMobile ? `
      flex-direction: column;
      align-items: center;
    ` : `
      
      justify-content: space-around;
    `}
    
    /* margin-top: 64px; */
  `
} 

const chartWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
  return css`
    width: 380px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: ${isMobile && '16px'};
    margin-bottom: ${isMobile && '4px'};
    border-bottom: ${isMobile && '1px solid var(--back-color-3)'};

  `
}

export default MyPageAnalyze