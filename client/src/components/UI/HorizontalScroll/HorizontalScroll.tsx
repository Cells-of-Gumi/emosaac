/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { throttle } from "lodash";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { returnBookContentType } from "@/types/books";

// import Test from "./Test";
import BookCard from "../BookCard/BookCard";

const HorizontalScroll = ({ API, identifier, setNoData }: any) => {
  const wrapperRef = useRef<HTMLInputElement>(null);
  const cardsRef = useRef<any>([]);
  const [bookListData, setBookListData] = useState<object[]>([]);
  type BookList = object | string;
  const [bookListResult, setBookListResult] = useState<BookList[]>([]);
  const [page, setPage] = useState<number>(0);
  const [wrapperWidth, setWrapperWidth] = useState<number>(0);
  const [standard, setStandard] = useState<number>(0);
  const [quantityPerPage, setQuantityPerPage] = useState<number>(10);
  const [loadingTag, setLoadingTag] = useState<string[]>(
    Array(9).fill("LOADING")
  );
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [hasNext, setHasNext] = useState<boolean>(true)

  const cardLayout = {
    width: "10vw",
    height: "15vw",
    minWidth: "150px",
    minHeight: "225px",
    padding: "0.5vw",
  };

  const generatePage = (value: number) => {
    if (
      wrapperRef.current !== null &&
      wrapperRef.current.clientWidth !== wrapperWidth
    ) {
      const width = wrapperRef.current.clientWidth;
      const quantity = Math.floor(
        wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth
      );
      const newPage = Math.ceil(standard / quantity);
      setPage(() => newPage);
      setWrapperWidth(() => width);
      setQuantityPerPage(() => quantity);
      return newPage + value;
    } else {
      return page + value;
    }
  };

  const nextBtnClickHandler = () => {
    if (wrapperRef.current !== null) {
      const quantity = Math.floor(
        wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth
      );
      const nextStandard = generatePage(1) * quantity;
      const idx =
        nextStandard < cardsRef.current.length
          ? nextStandard
          : cardsRef.current.length - 1;
      if (nextStandard < cardsRef.current.length) {
        setPage((prev) => prev + 1);
      }
      if (cardsRef.current[idx] ) {
        setStandard(() => idx);
        wrapperRef.current.scrollTo({
          left: cardsRef.current[idx].offsetLeft,
          top: 0,
          behavior: "smooth",
        });
      }
      
      fetchMoreData();
    }
  };

  const prevBtnClickHandler = () => {
    if (wrapperRef.current !== null) {
      const quantity = Math.floor(
        wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth
      );
      const prevStandard = generatePage(-1) * quantity;
      const idx = prevStandard >= 0 ? prevStandard : 0;
      if (prevStandard >= 0) {
        setPage((prev) => prev - 1);
      }
      setStandard(() => idx);
      wrapperRef.current.scrollTo({
        left: cardsRef.current[idx].offsetLeft,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const fetchMoreData = () => {
    let standard = 0;
    if (wrapperRef.current !== null && cardsRef.current[0] !== null) {
      standard = Math.ceil(
        wrapperRef.current.scrollLeft / cardsRef.current[0]?.clientWidth
      );
    }
    if (
      (wrapperRef.current !== null &&
        wrapperRef.current.scrollWidth - wrapperRef.current.scrollLeft - 200 <
          wrapperRef.current.clientWidth) ||
      bookListData.length - loadingTag.length - standard <= loadingTag.length
    ) {
      if (hasNext === true) {
        API({bookList: bookListData, size: bookListData.length + quantityPerPage + 1}).then(
          (res: returnBookContentType) => {
            if (res.content.length === 0 && bookListData.length === 0) {
              setNoData(() => true)
            }
            console.log(res)
            const temp = [...bookListData, ...res.content]
            setBookListData((prev) => temp);

            window.sessionStorage.setItem(
              `${identifier}-horizontal-inf_fetched_data`,
                JSON.stringify(temp)
            );

            setHasNext(() => res.hasNext)


            // alert('fwe')
          }
        );
      }
      
    }
  };

  const onScrollHandler = useMemo(
    () =>
      throttle(() => {
        if (wrapperRef.current !== null) {
          fetchMoreData();
          const standard = Math.ceil(
            wrapperRef.current.scrollLeft / cardsRef.current[0].clientWidth
          );
          setStandard(() => standard);
          if (wrapperRef.current.scrollLeft !== 0) {
            window.sessionStorage.setItem(`${identifier}-horizontal-recent_scroll`, String(wrapperRef.current.scrollLeft))
          }
          
        }
      }, 300),
    [bookListData, setBookListData]
  );

  useEffect(() => {
    const loadData = window.sessionStorage.getItem(`${identifier}-horizontal-inf_fetched_data`)
    

    if (loadData) {
      setBookListData(() => JSON.parse(loadData))
    } else {
      fetchMoreData();
    }

    
  }, []);

  useEffect(() => {
    const loadScroll = window.sessionStorage.getItem(`${identifier}-horizontal-recent_scroll`)

    if (loadScroll && wrapperRef.current) {
      wrapperRef.current.scrollTo(Number(JSON.parse(loadScroll)), 0)
    }

  }, [cardsRef.current.length])

  const generateLoadingData = () => {
    // setBookListResult(() => [...bookListData, ...loadingTag]);
    if (hasNext === true) {
      setBookListResult(() => [...bookListData, ...loadingTag]);
    } else {
      setBookListResult(() => [...bookListData]);
    }
  };

  useEffect(() => {
      
        generateLoadingData();
      
  }, [bookListData]);

  const renderCards = useMemo(
    () =>
      bookListResult.map((el, idx) => {
        return (
          <div
            key={`${identifier}-${idx}`}
            ref={(el) => (cardsRef.current[idx] = el)}
            css={cardWrapperCSS({ padding: cardLayout.padding })}
          >
            <BookCard
              bookData={el}
              showPlatform={true}
              width={cardLayout.width}
              height={cardLayout.height}
              minWidth={cardLayout.minWidth}
              minHeight={cardLayout.minHeight}
            />
          </div>
        );
      }),
    [bookListResult]
  );

  return (
    <div css={carouselWrapper}>
      <div
        css={[indicatorBtn, prevBtn({ isDeskTop, isTablet, isMobile })]}
        onClick={prevBtnClickHandler}
        onMouseEnter={(event) => {
          event.stopPropagation();
        }}
      >
        〈
      </div>
      <div
        css={[indicatorBtn, nextBtn({ isDeskTop, isTablet, isMobile })]}
        onClick={nextBtnClickHandler}
        onMouseEnter={(event) => {
          event.stopPropagation();
        }}
      >
        〉
      </div>
      <div
        ref={wrapperRef}
        css={carousel}
        onWheel={onScrollHandler}
        onTouchMove={onScrollHandler}
      >
        {renderCards}
      </div>
    </div>
  );
};

export default HorizontalScroll;

const cardWrapperCSS = ({ padding }: { padding: string }) => {
  return css`
    padding-left: ${padding};
    padding-right: ${padding};
  `;
};

const carouselWrapper = css`
  width: 100%;
  position: relative;
`;

const carousel = css`
  display: flex;
  width: 100%;
  /* padding-left: 48px; */
  box-sizing: border-box;
  overflow-x: scroll;
  border-radius: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const indicatorBtn = css`
  z-index: 9;
  position: absolute;

  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  color: var(--text-color);
  padding-left: 8px;
  padding-right: 8px;

  transition-property: background font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  @media (max-width: 480px) {
    display: none;
  }
`;

interface nextPrevBtnProps {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const prevBtn = ({ isDeskTop, isTablet, isMobile }: nextPrevBtnProps) => {
  return css`
    left: 0;
    /* background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    transform: ${(isDeskTop === true && `translate(-105px, 0px)`) ||
    (isTablet === true && `translate(-50px, 0px)`)};
    &:hover {
      /* background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};

const nextBtn = ({ isDeskTop, isTablet, isMobile }: nextPrevBtnProps) => {
  return css`
    right: 0;
    /* background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    transform: ${(isDeskTop === true && `translate(105px, 0px)`) ||
    (isTablet === true && `translate(50px, 0px)`)};
    &:hover {
      /* background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};
