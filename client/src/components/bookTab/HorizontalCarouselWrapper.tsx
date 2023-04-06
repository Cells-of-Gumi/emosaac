/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, {useState} from "react"

import RowTitle from "./RowTitle/RowTitle";
import HorizontalScroll from "../UI/HorizontalScroll/HorizontalScroll";
import { bookContentType } from "@/types/books";



const HorizontalCarouselWrapper = ({el, titleColor, stopVerticalScroll}: {el: any; titleColor?: string; stopVerticalScroll? : boolean}) => {
    const [noData, setNoData] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    
    if (noData === false) {
        return (
            <div css={horizontalCarouselWrapperCSS({loading})} >
            
                <div css={whiteSpace1CSS} />
                    <RowTitle beforeLabel={el.beforeLabel} highlightedLabel={el.highlightedLabel} afterLabel={el?.afterLabel} backgroundColor={titleColor} />
                    <div css={bookCarouselWrapperCSS}>
                    {/* <ScrollableCarousel API={el.API} identifier={el.identifier} /> */}
                    {/* <HorizontalScroll API={el.API} identifier={el.identifier} setNoData={setNoData} /> */}
                    <HorizontalScroll API={el.API} identifier={el.identifier} setNoData={setNoData} stopVerticalScroll={stopVerticalScroll} setLoading={setLoading} />
                    </div>
                    <div css={whiteSpace1CSS} />
                    
            </div>
        )
    } else {
        return (
            <div>
                
            </div>
        )
    }
    
}

const horizontalCarouselWrapperCSS = ({loading}: {loading: boolean}) => {
  return css`
    transition-property: opacity;
    transition-duration: 0.3s;
    opacity: ${loading === false ? '100%' : '0%'};
  `
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

export default HorizontalCarouselWrapper