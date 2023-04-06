/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { bookContentType, returnBookContentType } from "@/types/books";
import BookCard from "../BookCard/BookCard";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { debounce, throttle } from "lodash";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";


const HorizontalScroll = ({
  API,
  identifier,
  setNoData,
  stopVerticalScroll,
}: any) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [bookListData, setBookListData] = useState<bookContentType[]>([]);
  const [quantity, setQuantity] = useState<number>(10);
  const [getFetch, setGetFetch] = useState<boolean>(false);
  const [leftCard, setLeftCard] = useState<number>(0)
  const [rightCard, setRightCard] = useState<number>(0)
  const cardsRef = useRef<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);


  const cardLayout = {
    width: "10vw",
    height: "15vw",
    minWidth: "150px",
    minHeight: "225px",
    padding: "0.5vw",
  };

  const [hasNext, setHasNext] = useState<boolean>(
    window.sessionStorage.getItem(`${identifier}-horizontal-inf_has_next`)
      ? JSON.parse(
          String(
            window.sessionStorage.getItem(
              `${identifier}-horizontal-inf_has_next`
            )
          )
        )
      : true
  );

  useEffect(() => {
    setGetFetch(() => true);

  }, []);


// 스크롤 저장부분 시작---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const loadScroll = window.localStorage.getItem(`index_scroll_value`)
    const preventValue = JSON.parse(String(window.sessionStorage.getItem(`prevent_index_scroll`)))
    const scrollTiming = JSON.parse(String(window.sessionStorage.getItem(`scroll_timing_horizontal`)))
    
    if (loadScroll && preventValue !== true && scrollTiming === true ) {
      if (stopVerticalScroll !== true) {
        document.documentElement.scrollTo({
          left: 0,
          top: Number(JSON.parse(loadScroll)),
          behavior: "auto",
        });
      }
      window.sessionStorage.removeItem(`prevent_index_scroll`)
      
    }
    
  }, [scrollRef.current])


  const onScrollHandler = useMemo(
    () =>
      throttle(() => {

          if (scrollRef.current && scrollRef.current.scrollLeft !== 0) {
            window.sessionStorage.setItem(
              `${identifier}-horizontal-recent_scroll`,
              String(scrollRef.current.scrollLeft)
            );
          }
      }, 300),
    [bookListData, setBookListData]
  );

  useEffect(() => {
    const loadData = window.sessionStorage.getItem(
      `${identifier}-horizontal-inf_fetched_data`
    );
    const hasNext = window.sessionStorage.getItem(
      `${identifier}-horizontal-inf_has_next`
    );

    if (loadData) {
      setBookListData(() => JSON.parse(loadData));
      setHasNext(() => JSON.parse(String(hasNext)));
    } else {
      setGetFetch(() => true);
    }
  }, []);

  useEffect(() => {
    const loadScroll = window.sessionStorage.getItem(
      `${identifier}-horizontal-recent_scroll`
    );

    if (loadScroll && scrollRef.current) {
      scrollRef.current.scrollTo(Number(JSON.parse(loadScroll)), 0);

    }
  }, [cardsRef.current.length !== 0]);


  useEffect(() => {
    if (getFetch === true && hasNext === true) {
      const lastContent = bookListData[bookListData.length - 1];
      API({ lastContent: lastContent, size: quantity }).then(
        (res: returnBookContentType) => {
          if (res.content.length === 0 && bookListData.length === 0) {
            setNoData(() => true);
          }
          const temp = [...bookListData, ...res.content];
          setBookListData((prev) => temp);

          window.sessionStorage.setItem(
            `${identifier}-horizontal-inf_fetched_data`,
            JSON.stringify(temp)
          );

          window.sessionStorage.setItem(
            `${identifier}-horizontal-inf_has_next`,
            JSON.stringify(res.hasNext)
          );
          setHasNext(() => res.hasNext);
          setGetFetch(() => false);
          // alert('fwe')
        }
      )
      .catch(() => {
        if (bookListData.length === 0) {
          setNoData(() => true);
        }
      })
    }
  }, [getFetch]);


// 스크롤 저장부분 끝---------------------------------------------------------------------------------------------------------


  const cardsRender = useMemo(() => bookListData.map((el, idx) => {
    return (
      <div
        id={`${idx}`}
        css={cardWrapperCSS({ padding: cardLayout.padding })}
        ref={(el) => (cardsRef.current[idx] = el)}
      >
        <BookCard
          showPlatform={true}
          bookData={el}
          hideType={true}
          width={cardLayout.width}
          height={cardLayout.height}
          minWidth={cardLayout.minWidth}
          minHeight={cardLayout.minHeight}
        />
      </div>
    );
  }), [bookListData]);


  const getFetchPoint = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // entry의 target으로 DOM에 접근합니다.
      const $target = entry.target;

      // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
      if (entry.isIntersecting) {
        setGetFetch(() => true);
        // $target.classList.add("screening");
      }
    });
  });


  const options = {
    root: null,
    // 타겟 이미지 접근 전 이미지를 불러오기 위해 rootMargin을 설정했습니다.
    rootMargin: '0px 0px 0px 0px',
    threshold: 1
  }

  const getVisibleCard = new IntersectionObserver((entries) => {
      entries.forEach((entry:any) => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add(`${identifier}-visible-card`);

        } else {
          entry.target.classList.remove(`${identifier}-visible-card`);
        }
      }, options);
  })



  useEffect(() => {
    if (cardsRef.current[cardsRef.current.length - quantity]) {
      getFetchPoint.observe(
        cardsRef.current[cardsRef.current.length - quantity]
      );
    }
    const visibleCards = document.querySelectorAll(`.${identifier}-visible-card`)
    const leftRange = Number(visibleCards[0]?.id) - quantity < 0 ? 0 : Number(visibleCards[0]?.id) - quantity
    const rightRange = Number(visibleCards[visibleCards.length - 1]?.id) + quantity + 1 > cardsRef.current.length - 1 ? cardsRef.current.length - 1 : Number(visibleCards[visibleCards.length - 1]?.id) + quantity + 1
    if (!leftRange || !rightRange) {
      cardsRef.current.forEach((item: any) => {
        if (item) {
          getVisibleCard.observe(item);
        }
      });
    } else {
      cardsRef.current.slice(leftRange, rightRange).forEach((item: any) => {
        if (item) {
          getVisibleCard.observe(item);
        }
      });
    }
    
    return () => getFetchPoint.disconnect();
  }, [cardsRef.current.length, bookListData]);


  const prevBtnClickHandler = useMemo(() => debounce(() => {
    const visibleCards = document.querySelectorAll(`.${identifier}-visible-card`)
    const calc = Number(visibleCards[0].id) - visibleCards.length + 1
    const to = calc < 0 ? 0 : calc
    console.log(visibleCards)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: cardsRef.current[to]?.offsetLeft,
        top: 0,
        behavior: "smooth",
      });
      window.sessionStorage.setItem(
        `${identifier}-horizontal-recent_scroll`,
        String(cardsRef.current[to]?.offsetLeft)
      );
    }

  }, 20), [leftCard, rightCard])


  const nextBtnClickHandler = useMemo(() => debounce(() => {
    const visibleCards = document.querySelectorAll(`.${identifier}-visible-card`)
    const calc = Number(visibleCards[visibleCards.length - 1].id)
    const to = calc > cardsRef.current.length - 1 ? cardsRef.current.length - 1 : calc
    console.log(visibleCards)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: cardsRef.current[to]?.offsetLeft,
        top: 0,
        behavior: "smooth",
      });
      window.sessionStorage.setItem(
        `${identifier}-horizontal-recent_scroll`,
        String(cardsRef.current[to]?.offsetLeft)
      );
    }

  }, 20), [leftCard, rightCard])





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

      <div ref={scrollRef} css={carousel} onWheel={onScrollHandler} onTouchMove={onScrollHandler}>
        {cardsRender}
        {hasNext &&
          <div css={loadingDivCSS({cardLayout})}>
            <UseAnimations
              strokeColor={"var(--text-color)"}
              fillColor={"var(--back-color)"}
              animation={loading2}
              size={50}
            />
          </div>
        }
        
      </div>
      
    </div>
  );
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
  content-visibility: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const cardWrapperCSS = ({ padding }: { padding: string }) => {
  return css`
    padding-left: ${padding};
    padding-right: ${padding};
  `;
};




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


const loadingDivCSS = ({cardLayout}: {cardLayout: any}) => {
  return css`
    display: flex;
    height: ${cardLayout.height};
    min-height: ${cardLayout.minHeight};
    align-items: center;
    justify-content: center;
    padding-left: 16px;
    padding-right: 16px;

  `;
} 


export default HorizontalScroll;
