/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import RowTitle from "./RowTitle/RowTitle";

import { useIsResponsive } from "../Responsive/useIsResponsive";
import { useRef, useState } from "react";
import { bookContentType } from "@/types/books";

import React from "react";
import HorizontalCarouselWrapper from "./HorizontalCarouselWrapper";
import Link from "next/link";


interface SortByGenreProps {
    fetchList: any;
    myInfo?: any;
    titleColor?: string;
    hideBanner?: boolean;
    stopVerticalScroll?: boolean;
}

const SortByRows = ({fetchList, myInfo, titleColor, hideBanner, stopVerticalScroll}: SortByGenreProps) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();
    const indexWrapperRef = useRef<HTMLDivElement>(null);



    const rowsRender = fetchList.map((el: any, idx: number) => {
        if ((el.requireLogin === true && myInfo !== false) || el.requireLogin === false) {

        
          return (
              <React.Fragment key={`sortByRows-${el.identifier}`}>
                {/* <div css={whiteSpace1CSS} />
                  <RowTitle beforeLabel={el.beforeLabel} highlightedLabel={el.highlightedLabel} afterLabel={el?.afterLabel} />
                  <div css={bookCarouselWrapperCSS}>
                  <HorizontalCarousel API={el.API} identifier={el.identifier} setHasData={setHasData} />
                  </div>
                  <div css={whiteSpace1CSS} /> */}
                  <HorizontalCarouselWrapper el={el} titleColor={titleColor} stopVerticalScroll={stopVerticalScroll} />
                  {Math.ceil(fetchList.length / 2) === idx && !hideBanner &&
                  <Link href={'/books/2556'}>
                    <img
                        src={
                        isMobile === true
                            ? "/assets/content_banner_mobile.png"
                            : "/assets/content_banner_desktop_tablet.png"
                        }
                        alt={""}
                        css={bannerImage}
                    />
                  </Link>
                  
                  }
              </React.Fragment>
          )
        }
    })

    return (
        <div css={indexWrapperCSS}>

            <div css={innerLayoutWrapperCSS({ isDeskTop, isTablet, isMobile })}>
                {rowsRender}
                {/* <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
                <div css={bookCarouselWrapperCSS}>
                <ScrollableCarousel API={recvBooks} identifier={"test1"} />
                </div>
                <div css={whiteSpace1CSS} /> */}
            </div>

            
        </div>
    )
}


const indexWrapperCSS = css`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const bannerImage = css`
  width: 100%;
  height: auto;
`;

const whiteSpace1CSS = css`
  width: 100%;
  height: 3vw;
  min-height: 24px;
`;

const whiteSpace2CSS = css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;

const bannerWrapperCSS = css`
  width: 100%;
  overflow: hidden;
`;

const highlightedCarouselWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const bookCarouselWrapperCSS = css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;

interface innerLayoutWrapperCSSProps {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const innerLayoutWrapperCSS = ({
  isDeskTop,
  isTablet,
  isMobile,
}: innerLayoutWrapperCSSProps) => {
  const whiteSpace = (isDeskTop && 210) || (isTablet && 100) || (isMobile && 0);
  return css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `;
};


export default SortByRows
