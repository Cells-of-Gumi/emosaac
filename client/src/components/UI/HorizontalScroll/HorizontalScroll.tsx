/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { bookContentType, returnBookContentType } from "@/types/books";
import BookCard from "../BookCard/BookCard";


const HorizontalScroll = ({ API, identifier, setNoData, stopVerticalScroll }: any) => {
  const [bookListData, setBookListData] = useState<bookContentType[]>([])
  const [quantity, setQuantity] = useState<number>(10)
  const [getFetch, setGetFetch] = useState<boolean>(false)
  const cardsRef = useRef<any>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dummyRef = useRef<HTMLDivElement>(null);
  const [rightEdgeIdx, setRightEdgeIdx] = useState<number>(0)
  const [leftEdgeIdx, setLeftEdgeIdx] = useState<number>(0)

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
    setGetFetch(() => true)
  }, [])


  useEffect(() => {
    if (getFetch === true && hasNext === true) {
      const lastContent = bookListData[bookListData.length - 1];
      API({ lastContent: lastContent, size: quantity }).then(
        (res: returnBookContentType) => {
          console.log('fewfewefw')
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
          setGetFetch(() => false)
          // alert('fwe')
        }
      );
    }
  }, [getFetch])


  const getShowCount = () => {
    if (dummyRef.current && scrollRef.current) {
      const count = Math.floor(scrollRef.current.clientWidth / dummyRef.current.clientWidth)
      return count
    }
  }


  const cardsRender = bookListData.map((el, idx) => {
    return (
      <div id={`${idx}`} css={cardWrapperCSS({padding: cardLayout.padding})} ref={(el) => (cardsRef.current[idx] = el)}>
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
      
    ) 
  })

  const getFetchPoint = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // entry의 target으로 DOM에 접근합니다.
        const $target = entry.target;
    
        // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
        if (entry.isIntersecting) {
          
            setGetFetch(() => true)
        // $target.classList.add("screening");
        }
    })
});


const getScrollPoint = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      // entry의 target으로 DOM에 접근합니다.
      const $target = entry.target;
      let showing: number = 0
      let hiding: number = 0

      if (entry.isIntersecting === true) {
        showing = Number($target.id)
      }
      if (entry.isIntersecting === false) {
        hiding = Number($target.id)
      }
      if (showing > hiding) {
        // 오른쪽으로 스크롤중
        console.log('오른쪽으로 스크롤중')
      } else if (showing < hiding) {
        // 왼쪽으로 스크롤중
        console.log('왼쪽으로 스크롤중')
      }
      console.log(showing, hiding)
      console.log($target.id)
  })
});




useEffect(() => {
  if (cardsRef.current[cardsRef.current.length - quantity]) {
    getFetchPoint.observe(cardsRef.current[cardsRef.current.length - quantity])
  }

  cardsRef.current.forEach((item: any) => {
    if (item) {
      getScrollPoint.observe(item)
    }   
    
  })

    
    return () => getFetchPoint.disconnect();
}, [cardsRef.current.length, bookListData])


  return (
    <div css={carouselWrapper}>
      
      <div ref={scrollRef} css={carousel}>
        {cardsRender}
      </div>
      <div ref={dummyRef} css={dummyCSS({cardLayout})} />
    </div>
  )

}


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

const cardWrapperCSS = ({padding}: {padding: string}) => {
  return css`
    padding-left: ${padding};
    padding-right: ${padding};
  `;
};

const dummyCSS = ({cardLayout}: {cardLayout: any}) => {
  return css`
    width: ${cardLayout.width};
    height: ${cardLayout.height};
    min-width: ${cardLayout.minWidth};
    min-height: ${cardLayout.minHeight};
    padding-left: ${cardLayout.padding};
    padding-right: ${cardLayout.padding};
    position: absolute;
    visibility: hidden;
    pointer-events: none;
  `
}


export default HorizontalScroll