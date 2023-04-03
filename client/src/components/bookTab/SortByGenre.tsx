/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import RowTitle from "./RowTitle/RowTitle";
import HighlightedCarousel from "./HighlightedCarousel/HighlightedCarousel";
import ScrollableCarousel from "../UI/ScrollableCarousel/ScrollableCarousel";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import { useRef } from "react";
import { bookContentType } from "@/types/books";
import HorizontalCarousel from "../UI/ScrollableCarousel/HorizontalCarousel";
import React from "react";

interface SortByGenreProps {
    fetchList: any;
}

const SortByGenre = ({fetchList}: SortByGenreProps) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();
    const indexWrapperRef = useRef<HTMLDivElement>(null);


    const rowsRender = fetchList.map((el: any, idx: number) => {
        return (
            <React.Fragment key={`sortByGenre-${el.identifier}`}>
              <div css={whiteSpace1CSS} />
                <RowTitle beforeLabel={el.beforeLabel} highlightedLabel={el.highlightedLabel} afterLabel={el?.afterLabel} />
                <div css={bookCarouselWrapperCSS}>
                {/* <ScrollableCarousel API={el.API} identifier={el.identifier} /> */}
                <HorizontalCarousel API={el.API} identifier={el.identifier} />
                </div>
                <div css={whiteSpace1CSS} />
                {Math.ceil(fetchList.length / 2) === idx && 
                <img
                    src={
                    isMobile === true
                        ? "/assets/content_banner_mobile.png"
                        : "/assets/content_banner_desktop_tablet.png"
                    }
                    alt={""}
                    css={bannerImage}
                />
                }
            </React.Fragment>
        )
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


export default SortByGenre
