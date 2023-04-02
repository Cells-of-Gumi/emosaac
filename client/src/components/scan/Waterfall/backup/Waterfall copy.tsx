/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import BookCard from "@/components/UI/BookCard/BookCard";
import Swipe from "react-easy-swipe";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { bookContentType } from "@/types/books";
import { throttle } from "lodash";
import { useInterval } from "@/components/useInterval";
import WaterfallCard from "../WaterfallCard/WaterfallCard";

interface HighlightedCarousel {
  bookData: bookContentType[];
  windowWrapperRef: any;
  angleTop?: number;
  angleBottom?: number;
  identifier: string;
  rotate?: number;
  duration?: number;
}

const Waterfall = ({
  bookData,
  windowWrapperRef,
  angleTop,
  angleBottom,
  identifier,
  rotate,
  duration,
}: HighlightedCarousel) => {
  const [bookDataList, setBookDataList] = useState<bookContentType[]>([
    ...bookData,
  ]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const dummyNormalRef = useRef<HTMLInputElement>(null);
  // const wrapperRef = useRef<any>([]);
  const carouselWrapperRef = useRef<HTMLInputElement>(null);

  const dummyHighlightedRef = useRef<HTMLInputElement>(null);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [showCount, setShowCount] = useState<number>(10);

  const cardLayout = {
    widthValue: 40,
    heightValue: 60,
    unit: "vw",

    // min 관련 값들의 단위는 px
    minWidthValue: 600,
    minHeightValue: 900,
  };

  useEffect(() => {
    if (
      bookDataList[0].title !==
      bookDataList[bookDataList.length - showCount].title
    ) {
      const temp = bookDataList.concat(bookDataList.slice(0, showCount));
      setBookDataList(() => temp);
    }

    // console.log(bookDataList);
    // console.log(temp);
  }, []);

  // useEffect(()=>{

  // }, []);

  const interval = useInterval(
    () => {
      if (rotate === 1) {
        nextBtnHandler();
      } else if (rotate === -1) {
        prevBtnHandler();
      }
    },
    duration !== undefined ? duration : 1000
  );
  // const handleResize = () => {
  //   if (carouselWrapperRef.current !== null) {
  //     const calcLeft =
  //     carouselWrapperRef.current.clientWidth > windowWrapperRef?.current?.offsetWidth
  //       ? -(
  //           carouselWrapperRef.current.clientWidth - windowWrapperRef?.current?.offsetWidth
  //         ) / 2 + "px" : "0px";
  //     carouselWrapperRef.current.style.left = calcLeft
  //   }
  // }

  const [windowWidth, setWindowWidth] = useState<any>(0);

  const handleResize = useMemo(
    () =>
      throttle((event) => {
        if (
          carouselWrapperRef.current !== null &&
          dummyNormalRef.current !== null
        ) {
          // const calcWidth =
          // dummyNormalRef.current.clientWidth < cardLayout.minWidthValue
          //   ? (cardLayout.minWidthValue + cardLayout.minSpaceValue) * (showCount - 1) + cardLayout.minHighlightedWidthValue + "px"
          //   : (cardLayout.widthValue + cardLayout.spaceValue) * (showCount - 1) + cardLayout.highlightedWidthValue + cardLayout.unit;
          // carouselWrapperRef.current.style.width = calcWidth
          // const calcLeft =
          // carouselWrapperRef.current.clientWidth > windowWrapperRef?.current?.offsetWidth
          //   ? -(
          //       carouselWrapperRef.current.clientWidth - windowWrapperRef?.current?.offsetWidth
          //     ) / 2 + "px" : "0px";
          // carouselWrapperRef.current.style.left = calcLeft
        }
        setWindowWidth(() => window.innerWidth);
      }, 1000),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevBtnHandler = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      setCurrentIdx(() => bookDataList.length - showCount - 1);
    }
  };

  const nextBtnHandler = () => {
    if (currentIdx < bookDataList.length - showCount - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(() => 0);
    }
  };

  const renderBooks = bookDataList
    .slice(currentIdx, currentIdx + showCount)
    .map((el, idx) => {
      const calcRotate: number = isDeskTop ? 30 : 45;
      const result = -(Math.floor(showCount / 2) - idx) * calcRotate;
      return (
        // <div key={`${el.title}-${windowWidth}`} css={css`perspective: 600px;`}>
        <div
          // ref={(ele) => (wrapperRef.current[idx] = ele)}
          key={`${identifier}-${el.title}-${windowWidth}`}
          css={imgWrapperCSS({
            showCount,
            idx,
            widthValue: cardLayout.widthValue,
            heightValue: cardLayout.heightValue,
            unit: cardLayout.unit,
            minWidthValue: cardLayout.minWidthValue,
            minHeightValue: cardLayout.minHeightValue,
            dummyRef: dummyNormalRef,
            duration,
            isDeskTop,
            isTablet,
            isMobile,
          })}
        >
          {/* <img src={el.img} css={imgCSS} /> */}
          <WaterfallCard rotateY={result} />
          <BookCard
            bookData={el}
            showPlatform={true}
            width={`${cardLayout.widthValue}${cardLayout.unit}`}
            height={`${cardLayout.heightValue}${cardLayout.unit}`}
            minWidth={`${cardLayout.minWidthValue}px`}
            minHeight={`${cardLayout.minHeightValue}px`}
          />
          {/* <img src={el.img} css={imgCSS({idx, widthValue: cardLayout.widthValue, heightValue: cardLayout.heightValue, unit: cardLayout.unit, highlightedWidthValue: cardLayout.highlightedWidthValue, highlightedHeightValue: cardLayout.highlightedHeightValue, spaceValue: cardLayout.spaceValue, normalRef: dummyNormalRef, highlightedRef: dummyHighlightedRef, minWidthValue: cardLayout.minWidthValue, minHeightValue: cardLayout.minHeightValue, minHighlightedWidthValue: cardLayout.minHighlightedWidthValue, minHighlightedHeightValue: cardLayout.minHighlightedHeightValue, minSpaceValue: cardLayout.minSpaceValue })} /> */}
        </div>
        // </div>
      );
    });

  const [positionx, setPositionx] = useState<number>(0);

  const onSwipeMove = (position = { x: 0 }) => {
    setPositionx(() => position.x);
  };

  const onSwipeEnd = () => {
    console.log(positionx);
    if (positionx > 40) {
      prevBtnHandler();
    }
    if (positionx < -40) {
      nextBtnHandler();
    }
    setPositionx(() => 0);
  };

  const indicatorBtn = (
    <>
      <div css={prevBtnCSS} onClick={prevBtnHandler}>
        〈
      </div>
      <div css={nextBtnCSS} onClick={nextBtnHandler}>
        〉
      </div>
    </>
  );
  return (
    // <div css={carouselOuterWrapperCSS({highlightedHeightValue: cardLayout.highlightedHeightValue, unit: cardLayout.unit, minHighlightedHeightValue: cardLayout.minHighlightedHeightValue, highlightedRef: dummyHighlightedRef})}></div>

    <div
      className={"carousel-outer-wrapper"}
      css={carouselParentCSS({
        heightValue: cardLayout.heightValue,
        unit: cardLayout.unit,
        minHeightValue: cardLayout.minHeightValue,
        dummyRef: dummyNormalRef,
      })}
    >
      <Swipe
        onSwipeStart={(event: any) => {
          event.stopPropagation();
        }}
        // onSwipeEnd={onSwipeEnd}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
      >
        {isMobile === false && indicatorBtn}

        <div
          css={carouselOuterWrapperCSS({
            angleTop,
            angleBottom,
            isDeskTop,
            isTablet,
            isMobile,
          })}
        >
          <div
            css={carouselInnerWrapperCSS({
              showCount,
              widthValue: cardLayout.widthValue,
              heightValue: cardLayout.heightValue,
              unit: cardLayout.unit,
            })}
          >
            {renderBooks}
          </div>
        </div>

        <div
          className={"dummy-normal"}
          ref={dummyNormalRef}
          css={dummyNormalCSS({
            widthValue: cardLayout.widthValue,
            heightValue: cardLayout.heightValue,
            unit: cardLayout.unit,
          })}
        />
      </Swipe>
    </div>
  );
};

export default Waterfall;

const prevBtnCSS = css`
  z-index: 9;
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--text-color);
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;

const nextBtnCSS = css`
  z-index: 9;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--text-color);
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;

interface imgWrapperCSSProps {
  showCount: number;
  idx: number;
  widthValue: number;
  heightValue: number;
  unit: string;
  minWidthValue: number;
  minHeightValue: number;
  dummyRef: any;
  duration: number | undefined;
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const imgWrapperCSS = ({
  showCount,
  idx,
  widthValue,
  heightValue,
  unit,
  minWidthValue,
  minHeightValue,
  dummyRef,
  duration,
  isDeskTop,
  isTablet,
  isMobile,
}: imgWrapperCSSProps) => {
  const widthCalc =
    dummyRef?.current?.clientWidth > minWidthValue
      ? widthValue + unit
      : minWidthValue + "px";
  const heightCalc =
    dummyRef?.current?.clientHeight > minHeightValue
      ? heightValue + unit
      : minHeightValue + "px";
  const calcRotate: number = isDeskTop ? 30 : 45;
  const calcTranslate: number = isDeskTop ? 2 : 1.3;
  return css`
    position: absolute;
    /* width: 190px;
    height: 120px; */
    /* left: 10px;
    top: 10px; */
    /* border: 2px solid black; */
    /* line-height: 116px; */
    /* font-size: 80px; */
    /* font-weight: bold; */
    /* color: white; */
    /* text-align: center; */

    transition-property: transform;
    transition-duration: ${duration !== undefined ? duration : 1000}ms;
    transition-timing-function: linear;

    width: ${widthCalc};
    height: ${heightCalc};

    transform: rotateY(${(Math.floor(showCount / 2) - idx) * calcRotate}deg)
      translateZ(calc(${widthCalc} * ${calcTranslate})) scaleX(-1);
  `;
};

interface carouselParentCSSProps {
  heightValue: number;
  unit: string;
  minHeightValue: number;
  dummyRef: any;
}

const carouselParentCSS = ({
  heightValue,
  unit,
  minHeightValue,
  dummyRef,
}: carouselParentCSSProps) => {
  const heightCalc =
    dummyRef?.current?.clientHeight > minHeightValue
      ? heightValue + unit
      : minHeightValue + "px";

  return css`
    position: relative;
    width: 100vw;
    height: calc(${heightCalc} + 10px);
  `;
};

interface carouselOuterWrapperCSSProps {
  angleTop: number | undefined;
  angleBottom: number | undefined;
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const carouselOuterWrapperCSS = ({
  angleTop,
  angleBottom,
  isDeskTop,
  isTablet,
  isMobile,
}: carouselOuterWrapperCSSProps) => {
  return css`
    /* border: 1px solid #CCC; */
    /* margin: 40px 0; */
    position: relative;
    width: 1px;
    height: 500px;
    /* margin: 40px auto; */
    margin: auto;
    perspective: 50vw;

    left: ${isDeskTop ? "13%" : "18%"};
    padding-top: ${angleTop}px;
    margin-top: -${angleBottom ? "7" : angleTop}px;
    padding-bottom: ${angleBottom}px;
    margin-bottom: -${angleBottom}px;
  `;
};

interface carouselInnerWrapperCSSProps {
  showCount: number;
  widthValue: number;
  heightValue: number;
  unit: string;
}
const carouselInnerWrapperCSS = ({
  showCount,
  widthValue,
  heightValue,
  unit,
}: carouselInnerWrapperCSSProps) => {
  // const angle = idx / showCount * -360;

  return css`
    width: 100%;
    height: 100%;
    position: absolute;
    /* transform: translateZ(-288px); */
    transform-style: preserve-3d;
    transition: transform 0.3s;
    transform: rotateY(180deg);
  `;
};

interface dummyNormalCSSProps {
  widthValue: number;
  heightValue: number;
  unit: string;
}

const dummyNormalCSS = ({
  widthValue,
  heightValue,
  unit,
}: dummyNormalCSSProps) => {
  return css`
    width: ${widthValue + unit};
    height: ${heightValue + unit};
    pointer-events: none;
    position: absolute;
    /* display: none; */
  `;
};
