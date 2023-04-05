/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Chart from "./Chart";
import { useEffect } from "react";
import MyPageAnalyzeBooks from "./MyPageAnalyzeBooks";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import SortByRows from "../bookTab/SortByRows";
import { bookContentType } from "@/types/books";
import { getHasBeenReadBooks } from "@/api/user/getHasBeenReadBooks";
import { getBookmarkBooks } from "@/api/user/getBookmarkBooks";

const MyPageAnalyze = ({typeCode} : {typeCode: number}) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();

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
      identifier: `getAlreadyList-${typeCode}-${Math.floor(Math.random() * 100000)}`,
      beforeLabel: "읽은 목록 ",
      requireLogin: false,
    },
    {
      API: getBookmarkBooksAPI,
      identifier: `getBookmarkList-${typeCode}-${Math.floor(Math.random() * 100000)}`,
      beforeLabel: "북마크 목록 ",
      requireLogin: false,
    },
  ];

    return (
      <div>
        <div css={myPageAnalyzeWrapperCSS({isDeskTop})}>
            <div css={chartWrapperCSS({isMobile})}>
                <Chart typeCode={typeCode} />
            </div>
            <div css={css`display: flex;`}>
              <MyPageAnalyzeBooks key={`less-viewed-${typeCode}`} identifier={`less-viewed-${typeCode}`} title={`가장 적게 본 장르 추천`} typeCode={typeCode} isLike={0} count={2}/>
              <MyPageAnalyzeBooks key={`most-viewed-${typeCode}`} identifier={`most-viewed-${typeCode}`} title={`가장 많이 본 장르 추천`} typeCode={typeCode} isLike={1} count={2}/>
              
            </div>
        </div>
        <SortByRows fetchList={bookFetchList} titleColor={'var(--back-color-2)'} hideBanner={true} />
      </div>
        
    )
}

const myPageAnalyzeWrapperCSS = ({isDeskTop}: {isDeskTop: boolean}) => {
  return css`
    width: 100%;
    margin-top: 36px;
    display: flex;
    ${isDeskTop ? `
      
      justify-content: space-around;
    ` : `
      flex-direction: column;
      align-items: center;
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