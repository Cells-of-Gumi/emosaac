/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import BookCard from "@/components/UI/BookCard/BookCard";
import Swipe from "react-easy-swipe";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { bookContentType } from "@/types/books";
import { throttle } from "lodash";

interface HighlightedCarousel {
  bookData: bookContentType[];
  windowWrapperRef: any;
}

const Waterfall = ({ bookData, windowWrapperRef }: HighlightedCarousel) => {
  const [bookDataList, setBookDataList] = useState<bookContentType[]>([
    ...bookData,
  ]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const dummyNormalRef = useRef<HTMLInputElement>(null);
  // const wrapperRef = useRef<any>([]);
  const carouselWrapperRef = useRef<HTMLInputElement>(null);

  const dummyHighlightedRef = useRef<HTMLInputElement>(null);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [showCount, setShowCount] = useState<number>(7);

  const cardLayout = {
    widthValue: 13,
    heightValue: 21,
    spaceValue: 5,
    unit: "vw",

    // min 관련 값들의 단위는 px
    minWidthValue: 150,
    minHeightValue: 225,
    minSpaceValue: 24,
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
      return (
        // <div key={`${el.title}-${windowWidth}`} css={css`perspective: 600px;`}>
        <div
          // ref={(ele) => (wrapperRef.current[idx] = ele)}
          key={`${el.title}-${windowWidth}`}
          css={imgWrapperCSS({
            showCount,
            idx,
            widthValue: cardLayout.widthValue,
            heightValue: cardLayout.heightValue,
            unit: cardLayout.unit,
          })}
        >
          {/* <img src={el.img} css={imgCSS} /> */}

          <BookCard
            bookData={el}
            showPlatform={true}
            // width={`${wrapperRef?.current[idx]?.clientWidth}px`}
            // height={`${wrapperRef?.current[idx]?.clientHeight}px`}
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
    // console.log(positionx);
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

    <div className={"carousel-outer-wrapper"} css={carouselOuterWrapperCSS}>
      <Swipe
        onSwipeStart={(event: any) => {
          event.stopPropagation();
        }}
        // onSwipeEnd={onSwipeEnd}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
      >
        {isMobile === false && indicatorBtn}

        <div css={carouselInnerWrapperCSS}></div>

        <div css={wrapperContainerCss}>
          <div css={wrapperTopCss}></div>
          <div css={wrapperCenterCss}>{renderBooks}</div>
          <div css={wrapperBottomCss}></div>
        </div>
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
}
const imgWrapperCSS = ({
  showCount,
  idx,
  widthValue,
  heightValue,
  unit,
}: imgWrapperCSSProps) => {
  return css`
    transition-property: width height;
    transition-duration: 0.3s;
    width: ${widthValue + unit};
    height: ${heightValue + unit};

    transform: rotateY(45deg);
  `;
};

const carouselOuterWrapperCSS = () => {
  return css`
    position: relative;
    width: 100vw;
    height: 50vh;
  `;
};

const carouselInnerWrapperCSS = () => {
  return css`
    display: flex;
    position: absolute;
    perspective: 400px;
  `;
};

const wrapperTopCss = () => {
  return css`
    background-color: #ffffff;
    width: 100vw;
    height: 200px;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    z-index: 100;
    position: relative;
  `;
};

const wrapperCenterCss = () => {
  return css`
    background-color: black;
    width: 100vw;
    height: 300px;
    color: #fff;
    text-align: center;

    display: flex;
    justify-content: center;
    perspective: 600px;
    /* overflow: hidden; */
  `;
};

const wrapperBottomCss = () => {
  return css`
    background-color: #ffffff;
    width: 100vw;
    height: 300px;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
    z-index: 100;
    position: relative;
  `;
};

const wrapperContainerCss = () => {
  return css`
    width: 100vw;
    background-color: black;
  `;
};
