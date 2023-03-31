/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { bookContentType } from "@/types/books";
import {useInterval} from "./useInterval";

import WaterfallCard from "./WaterfallCard";



interface HighlightedCarousel {
  bookData: bookContentType[];
  identifier: string;
  rotate?: number;
  duration?: number;
}

const Waterfall = ({ bookData, identifier, rotate, duration }: HighlightedCarousel) => {
  const [bookDataList, setBookDataList] = useState<bookContentType[]>([...bookData]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isModalOn, setModalOn] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const responsiveLayout = {
    showCount: 9,
    width: (isDeskTop ? 20 : (isTablet ? 30 : (isMobile ? 40 : 0))),
    height: (isDeskTop ? 30 : (isTablet ? 45 : (isMobile ? 60 : 0))),
    heightCorrection: (isDeskTop ? 2 : (isTablet ? 4.2 : (isMobile ? 9 : 0))),
    unit: 'vw',
  }

  useEffect(() => {
    if (bookDataList[0].title !== bookDataList[bookDataList.length - responsiveLayout.showCount].title) {
      const temp = bookDataList.concat(bookDataList.slice(0, responsiveLayout.showCount));
      setBookDataList(() => temp);
    }
  }, []);

  const interval = useInterval(()=>{
    if (isModalOn === false) {
      if (rotate === 1) {
        nextBtnHandler()
      } else if (rotate === -1) {
        prevBtnHandler()
      }
    }
    
  }, duration !== undefined ? duration : 1000);

  const prevBtnHandler = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      setCurrentIdx(() => bookDataList.length - responsiveLayout.showCount - 1);
    }
  };

  const nextBtnHandler = () => {
    if (currentIdx < bookDataList.length - responsiveLayout.showCount - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(() => 0);
    }
  };

  const isModalOnHandler = (boolean: boolean) => {

    setModalOn(() => boolean)
    
  }

  const renderBooks = bookDataList
    .slice(currentIdx, currentIdx + responsiveLayout.showCount)
    .map((el, idx) => {
      const calcRotate: number = isDeskTop ? 20 : 20
      const result = (Math.floor(responsiveLayout.showCount / 2) - idx) * calcRotate
      return (
        <div
          key={`${identifier}-${el.title}`}
          css={cardCSS({duration, responsiveLayout, rotateY: result, idx, showCount: responsiveLayout.showCount, center: Math.floor(responsiveLayout.showCount / 2), isDeskTop, isTablet, isMobile, isModalOn})}
        >
          <WaterfallCard
              bookData={el}
              showPlatform={true}
              isModalOnHandler={isModalOnHandler}
              rotateY={result}
              waterfallWrapperRef={wrapperRef}
          />
          {/* <img css={imgCSS} src={el.thumbnail}/> */}
        </div>
      );
    });

  return (
    <div className={"carousel-outer-wrapper"} css={waterfallOuterWrapperCSS} ref={wrapperRef}>
      <div css={waterfallInnerWrapperCSS}>
        {renderBooks}
      </div>
    </div>
  );
};

const cardCSS = ({duration, responsiveLayout, rotateY, idx, showCount, center, isDeskTop, isTablet, isMobile, isModalOn}: {duration: number | undefined; responsiveLayout: any; rotateY: number; idx: number; showCount:number; center: number; isDeskTop: boolean; isTablet: boolean; isMobile: boolean; isModalOn: boolean;}) => {
  const widthCalc = (idx === 0 || idx === showCount - 1) ? '0px' : responsiveLayout.width + responsiveLayout.unit
  const heightCalc = responsiveLayout.height + (Math.abs(center - idx) * (Math.abs(center - idx) * responsiveLayout.heightCorrection)) + responsiveLayout.unit
  return css`
    transition-property: width height;
    transition-duration: ${duration ? duration : '1000'}ms;
    transition-timing-function: linear;
    position: relative;
    width: ${widthCalc};
    height:${heightCalc};
    background-color: white;
    transform: rotateY(${rotateY}deg) translateZ(20px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `
}

const imgCSS = css`
  height: 100%;
  width: auto;
`

const waterfallOuterWrapperCSS = css`
  width: auto;
  height: 300px;
  /* margin: 0 auto; */
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
`

const waterfallInnerWrapperCSS = css`
  width: auto;
  height: 100%;;
  perspective: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: blue; */
  /* margin: 0 auto; */
`

export default Waterfall;

