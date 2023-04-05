/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { keyframes } from "@emotion/react";
import MiddleWideButton from "../UI/Button/MiddleWideButton";
import { useState } from "react";
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


const MyPage = ({ myInfo }: any) => {
  // console.log(myinfo);
  const router = useRouter();
  const token = getToken();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();



  






  const [typeCode, setTypeCode] = useState<number>(0);
  const [tabState, setTabState] = useState<number>(0)

  const onClickTabHandler = (value: number) => {
    setTabState(() => value)
  }

  const onClickTypeCodeHandler = (value: number) => {
    setTypeCode(() => value)
  }

  const tabConfig = [
    {label: '웹툰', setTabState: 0, execFunction: onClickTypeCodeHandler.bind(this, 0)},
    {label: '웹소설', setTabState: 1, execFunction: onClickTypeCodeHandler.bind(this, 1)},
    {label: 'EMOSAAC', setTabState: 2, execFunction: null},
  ]

  

  const tabRender = tabConfig.map((el, idx) => {
    return (
      <div onClick={() => {onClickTabHandler(el.setTabState); el.execFunction && el.execFunction()}} css={tabIndividualCSS({targetState: el.setTabState, currentState: tabState})}>
        {el.label}
      </div>
    )
  })


  const getHasBeenReadBooksAPI = ({
    lastContent,
    size,
  }: {
    lastContent: bookContentType;
    size: number;
  }) => {
    const prevId = lastContent ? lastContent.bookId : 0;
    const prevTime = lastContent ? lastContent.modifiedDate : 0;
    return getHasBeenReadBooks({
      typeCode,
      prevId,
      prevTime,
      size: size,
    });
  };

  const getBookmarkBooksAPI = ({
    lastContent,
    size,
  }: {
    lastContent: bookContentType;
    size: number;
  }) => {
    const prevId = lastContent ? lastContent.bookId : 0;
    const prevTime = lastContent ? lastContent.modifiedDate : 0;
    return getBookmarkBooks({
      typeCode,
      prevId,
      prevTime,
      size: size,
    });
  };

  
  const bookFetchList = [
    {
      API: getHasBeenReadBooksAPI,
      identifier: `getAlreadyList-${typeCode}`,
      beforeLabel: "읽은 목록 ",
      requireLogin: false,
    },
    {
      API: getBookmarkBooksAPI,
      identifier: `getBookmarkList-${typeCode}`,
      beforeLabel: "북마크 목록 ",
      requireLogin: false,
    },
  ];

  return (
    <>
            <div css={myPageWrapperCSS({isMobile})}>
              <MyPagePersonalInfo myInfo={myInfo} />
              <div css={myPageTabWrapperCSS}>
                {tabRender}
              </div>
              <div css={myPageTabContentCSS({isMobile})}>
                <MyPageAnalyze typeCode={typeCode}/>
                <SortByRows fetchList={bookFetchList} titleColor={'rgba(0,0,0,0)'} />
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
    ${isMobile ? 'padding: 36px 8px 8px 8px' : 'padding: 48px 16px 16px 16px'};
    
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
  `
}
export default MyPage;
