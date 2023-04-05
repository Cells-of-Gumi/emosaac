/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { keyframes } from "@emotion/react";
import MiddleWideButton from "../UI/Button/MiddleWideButton";
import React, { useState } from "react";
import Chart from "./Chart";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
// import getRecommendGenre from "./../../api/mypage/ReommendTopGenre";
import { getToken } from "@/api/instance";
import { getHasBeenReadBooks } from "@/api/user/getHasBeenReadBooks";
import { getBookmarkBooks } from "@/api/user/getBookmarkBooks";
import { bookContentType } from "@/types/books";

import MyPagePersonalInfo from "./MyPagePersonalInfo";
import MyPageAnalyze from "./MyPageAnalyze";
import SortByRows from "../bookTab/SortByRows";
import { getMyEmopick } from "@/api/emopick/getMyEmopickList";
import MyPageEmopick from "./MyPageEmopick";


const MyPage = ({ myInfo }: any) => {
  // console.log(myinfo);
  const router = useRouter();
  const token = getToken();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();



  

  




  const [typeCode, setTypeCode] = useState<number>(0);
  const [tabState, setTabState] = useState<number>(0)

  const onClickTabHandler = (value: number) => {
    window.sessionStorage.setItem('my_profile_tab_idx', JSON.stringify(value))
    setTabState(() => value)
  }

  const onClickTypeCodeHandler = (value: number) => {
    setTypeCode(() => value)
  }

  const tabConfig: {label: string; setTabState: number; execFunction: Function}[] = [
    {label: '웹툰', setTabState: 0, execFunction: onClickTypeCodeHandler.bind(this, 0)},
    {label: '웹소설', setTabState: 1, execFunction: onClickTypeCodeHandler.bind(this, 1)},
    {label: 'EMOSAAC', setTabState: 2, execFunction: () => {}},
  ]

useEffect(() => {
    const loadTabIdx = Number(window.sessionStorage.getItem('my_profile_tab_idx'))
    if (loadTabIdx) {
      setTabState(() => loadTabIdx)
      tabConfig[loadTabIdx].execFunction()
    }
  }, [])

  const tabRender = tabConfig.map((el, idx) => {
    return (
      <div onClick={() => {onClickTabHandler(el.setTabState); el.execFunction && el.execFunction()}} css={tabIndividualCSS({targetState: el.setTabState, currentState: tabState})}>
        {el.label}
      </div>
    )
  })



  return (
    <>
            <div css={myPageWrapperCSS({isMobile})}>
              <MyPagePersonalInfo myInfo={myInfo} />
              <div css={myPageTabWrapperCSS}>
                {tabRender}
              </div>
              <div css={myPageTabContentCSS({isMobile})}>
                {(tabState === 0 || tabState === 1) &&
                    <MyPageAnalyze typeCode={typeCode}/>
                }
                {tabState === 2 &&
                    <MyPageEmopick/>
                }

                
              </div>
              
              
            </div>
            
            

    
     
    </>
  );
};

const myPageWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
  return css`
    ${isMobile ? 'padding: 24px 16px 0px 16px' : 'padding: 64px 105px 0px 105px'};
    
  `
}

const myPageTabWrapperCSS = css`
  margin-top: 24px;
  width: 100%;
  height: 48px;
  display: flex;
`

const myPageTabContentCSS = ({isMobile}: {isMobile: boolean}) => {
  return css`
    ${isMobile ? 'padding: 8px 8px 8px 8px' : 'padding: 16px 16px 16px 16px'};
    
    background-color: var(--back-color-2);
  `
}

const tabIndividualCSS = ({targetState, currentState}: {targetState: number, currentState: number}) => {
  return css`
  transition-property: background-color;
  transition-duration: 0.3s;
    width: 128px;
    height: 100%;
    background-color: ${targetState === currentState ? 'var(--back-color-2)' : null};
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    border-radius: 4px 4px 0px 0px;
    font-weight: ${targetState === currentState ? '700' : null};
  `
}
export default MyPage;
