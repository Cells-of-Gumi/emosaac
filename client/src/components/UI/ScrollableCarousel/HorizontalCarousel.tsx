/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useMemo, useState, useRef } from "react"
import { throttle } from "lodash";
import BookCard from "../../UI/BookCard/BookCard";
import { bookContentType, returnBookContentType } from "@/types/books";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2'



interface HorizontalCarouselProps {
    API: ({fetchedData, prevId, prevScore, size}: {fetchedData: any; prevId?: number; prevScore?: number; size: number}) => Promise<any>;
}

const HorizontalCarousel = ({API}: HorizontalCarouselProps) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();
    const cardLayout = {
        width: "200px",
        height: "300px",
        minWidth: "200px",
        minHeight: "300px",
        padding: "0.5vw",
        margin: 16,
    };

    const [fetchedData, setFetchedData] = useState<any>([])
    const [quantityPerPage, setQuantityPerPage] = useState<number>(10)
    // const [offset, setOffset] = useState<number>(0)
    const [getFetch, setGetFetch] = useState<boolean>(false)
    const isEndOfPageRef = useRef<HTMLDivElement>(null)

    const scrollRef = useRef<HTMLDivElement>(null)
    const pageClassRef = useRef<any>([])
    const cardClassRef = useRef<any>([])
    const dummyPageRef = useRef<any>(null)
    const dummyCardRef = useRef<any>(null)
    const [onScreenContentIdx, setOnScreenContentIdx] = useState<number>(0)
    const [dummyWidth, setDummyWidth] = useState<number>(0)
    const [dummyHeight, setDummyHeight] = useState<number>(0)
    const dummy = [Array(quantityPerPage).fill("LOADING")]

    useEffect(() => {
        const loadData = window.localStorage.getItem('inf_fetched_data')
        const loadPage = window.localStorage.getItem('recent_page')

        console.log('로드', loadData && JSON.parse(loadData))
        if (loadData) {
            setFetchedData(() => JSON.parse(loadData))
        } else {
            API({fetchedData: fetchedData, size: quantityPerPage})
            .then((res: returnBookContentType) => {
                if (res.content.length !== 0 || res.content !== null) {
                    setFetchedData(() => [[...res.content]])
                }
            })
        }

        if (loadPage) {
            setOnScreenContentIdx(() => JSON.parse(loadPage))
        }
        


        
        
        
    }, [])

    useEffect(() => {
        const loadScroll = window.localStorage.getItem('recent_scroll')
        if (loadScroll && fetchedData.length !== 0 && scrollRef.current) {
            // setTimeout(function() {
                
            // }, 1000)
            scrollRef.current.scrollTo(Number(JSON.parse(loadScroll)), 0)
            
            
        }
    }, [fetchedData.length === 0])

    useEffect(() => {
        if (getFetch === true && fetchedData) {
            const lastContent = fetchedData[fetchedData.length - 1][fetchedData[fetchedData.length - 1].length - 1]
            if (lastContent) {
                console.log(lastContent)
                API({fetchedData: fetchedData, prevId: lastContent.bookId, prevScore: lastContent.avgScore, size: quantityPerPage})
                .then((res: returnBookContentType) => {
                    // setFetchedData(() => [...fetchedData, [...res.content]])
                    if (res.content.length !== 0 || res.content !== null) {
                        const temp = [...fetchedData, [...res.content]]
                        setFetchedData(() => temp)
                        // setOffset((prev) => prev + 1)
                        window.localStorage.setItem('inf_fetched_data', JSON.stringify(temp))
                        console.log(fetchedData)
                    }
                })
            }
            setFetch(false)
        }
    }, [getFetch])

    // useEffect(() => {
    //     if (dummyPageRef.current) {
    //         setDummyWidth(() => dummyPageRef?.current?.clientWidth)
    //         setDummyHeight(() => dummyPageRef?.current?.clientHeight)
    //     }
    // }, [getFetch])



    const setFetch = (value: boolean) => {
        setGetFetch(() => value)
    }

    const onScrollHandler = useMemo(
        () =>
            throttle((event) => {
                // if (window && (((document.body.scrollHeight - 10) < document.body.clientHeight) || document.body.scrollTop > document.body.scrollHeight - document.body.clientHeight - 100)) {
                //     setFetch(true)   
                // }
                if (scrollRef.current && scrollRef.current.scrollLeft !== 0) {
                    window.localStorage.setItem('recent_scroll', String(scrollRef.current.scrollLeft))
                }
                if (dummyPageRef.current) {
                    setDummyWidth(() => dummyPageRef?.current?.clientWidth)
                    setDummyHeight(() => dummyPageRef?.current?.clientHeight)
                }
                
            }, 1000),
        [fetchedData]
    );


    useEffect(() => {
        document.addEventListener("wheel", onScrollHandler);
        document.addEventListener("touchmove", onScrollHandler);
        return () => {
            document.removeEventListener("wheel", onScrollHandler)
            document.removeEventListener("touchmove", onScrollHandler);
        }
    }
    , [])


    


    
    const pageRender = fetchedData.map((page: any, pageIdx: number) => {
        const contentRender = page.map((content: bookContentType, contentIdx: number) => {
            return (
                <div css={cardWrapperCSS({ width: cardLayout.width, height: cardLayout.height, minWidth: cardLayout.minWidth, minHeight: cardLayout.minHeight, margin: cardLayout.margin })}>
                    <BookCard showPlatform={true} bookData={content} minWidth={cardLayout.minWidth} minHeight={cardLayout.minHeight} />  
                </div>
            )
        })
        if (page.length !== 0) {
            return (
                <div key={`infinity-${pageIdx}`} id={`${pageIdx}`} ref={(el) => {pageClassRef.current[pageIdx] = el;}}>
                    {onScreenContentIdx === pageIdx || onScreenContentIdx === pageIdx - 1 || onScreenContentIdx === pageIdx + 1 ? 
                    <div css={contentPageWrapperCSS({isMobile, isTablet, isDeskTop})}>{contentRender}</div> : <div id={`${pageIdx}`} css={dummyWrapperCSS({standardWidth: dummyWidth, standardHeight: dummyHeight})} /> // css={dummyWrapperCSS({standardWidth: dummyWidth, standardHeight: dummyHeight})}
                }
                </div>
            )
        }
    })



    const dummyRender = dummy.map((page: any, pageIdx: number) => {
        const contentRender = page.map((content: bookContentType, contentIdx: number) => {
            return (
                <div ref={dummyCardRef} css={cardWrapperCSS({ width: cardLayout.width, height: cardLayout.height, minWidth: cardLayout.minWidth, minHeight: cardLayout.minHeight, margin: cardLayout.margin })}>
                    <BookCard showPlatform={true} bookData={content} minWidth={cardLayout.minWidth} minHeight={cardLayout.minHeight} />  
                </div>
            )
        })
        if (page.length !== 0) {
            return (
                <div css={css`visibility: hidden; position: absolute;`} key={`dummy-${pageIdx}`}>
                    {dummyWidth}, {dummyHeight}
                    <div className={'dummy'} ref={dummyPageRef} css={contentPageWrapperCSS({isMobile, isTablet, isDeskTop})}>{contentRender}</div>
                </div>
            )
        }
    })


    
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            // entry의 target으로 DOM에 접근합니다.
            const $target = entry.target;
        
            // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
            if (entry.isIntersecting) {
                if ($target.id && $target.id !== 'scrollStart') {
                    setOnScreenContentIdx(() => Number($target.id))
                    window.localStorage.setItem('recent_page', $target.id)
                } 
                if ($target.id === 'scrollStart' && fetchedData.length !== 0) {
                    setFetch(true)   
                }

                console.log('화면에 보이는 Div', $target.id)
            // $target.classList.add("screening");
            }
        })
    });



    useEffect(() => {
        
        
        pageClassRef.current.forEach((item: any) => {
            if (item) {
                io.observe(item)
            }   
        })

        

        if (isEndOfPageRef.current !== null) {
            io.observe(isEndOfPageRef.current)
        }

        return () => io.disconnect();

    }, [pageClassRef.current.length, fetchedData])

    useEffect(() => {
        cardClassRef.current.forEach((item: any) => {
            if (item) {
                io.observe(item)
            }   
        })
    }, [onScreenContentIdx])


    const prevBtnClickHandler = () => {
        if (dummyCardRef.current && scrollRef.current) {
            const cardWidth = dummyCardRef.current.clientWidth + (cardLayout.margin * 2)
            const calcShownCards = Math.floor(scrollRef.current.clientWidth / cardWidth) - 1
            const result = cardWidth * calcShownCards
            scrollRef.current.scrollTo({left: scrollRef.current.scrollLeft - result, top: 0, behavior: "smooth",})
    
        }
    }

    const nextBtnClickHandler = () => {
        if (dummyCardRef.current && scrollRef.current) {
            const cardWidth = dummyCardRef.current.clientWidth + (cardLayout.margin * 2)
            const calcShownCards = Math.floor(scrollRef.current.clientWidth / cardWidth) - 1
            const result = cardWidth * calcShownCards
            scrollRef.current.scrollTo({left: result + scrollRef.current.scrollLeft, top: 0, behavior: "smooth",})
    
        }
    }


    


    return (
        <div onClick={() => {console.log(dummyCardRef.current.style)}} css={carouselOuterWrapperCSS}>
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
        
            <div ref={scrollRef} css={scrollWrapperCSS}>

                
                {dummyRender}
                {pageRender}
                <div css={scrollDivCSS} id={"scrollStart"} ref={isEndOfPageRef}>
                    {/* ∨ */}
                    <UseAnimations strokeColor={'var(--text-color)'} animation={loading2} size={50} />
                </div>
            </div>
        </div>
    )
}

const carouselOuterWrapperCSS = css`
    width: 100vw;
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    
`

const scrollWrapperCSS = css`

    /* height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden; */
    display: flex;
    align-items: center;
    overflow-x: scroll;
    width: 90%;

    -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    var(--back-color) 1%,
    var(--back-color) 99%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    var(--back-color) 1%,
    var(--back-color) 99%,
    rgba(0, 0, 0, 0) 100%
  );

`



const dummyWrapperCSS = ({standardWidth, standardHeight}: {standardWidth?: any; standardHeight?: any}) => {
    return css`
        width: ${standardWidth ? standardWidth + 'px' : standardWidth + 'px'};
        /* height: ${standardHeight ? standardHeight + 'px' : '100vh'}; */
        
        /* width: 100vw;
        height: 100vh; */
        /* background-color: gray; */
        /* border: 2px solid red; */
    `
}

const contentPageWrapperCSS = ({isMobile, isTablet, isDeskTop}: {isMobile: boolean; isTablet: boolean; isDeskTop: boolean}) => {
    return css`
        width: auto;
        /* display: flex;
        flex-direction: column;
        align-items: center; */
        display: flex;
    `
}

const scrollDivCSS = css`
    display: flex;
    justify-content: center;
    height: 48px;
    font-size: 24px;
    font-weight: 700;
`


const cardWrapperCSS = ({ width, height, minWidth, minHeight, margin }: { width: string, height: string, minWidth: string, minHeight: string, margin: number }) => {
    return css`
        width: ${width};
        height: ${height};
        margin: ${margin}px;

    `
}


const indicatorBtn = css`
  z-index: 99;
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
    left: 20px;
    /* background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    /* transform: ${(isDeskTop === true && `translate(-105px, 0px)`) ||
    (isTablet === true && `translate(-50px, 0px)`)}; */
    &:hover {
      /* background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};

const nextBtn = ({ isDeskTop, isTablet, isMobile }: nextPrevBtnProps) => {
  return css`
    right: 20px;
    /* background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    /* transform: ${(isDeskTop === true && `translate(105px, 0px)`) ||
    (isTablet === true && `translate(50px, 0px)`)}; */
    &:hover {
      /* background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};

export default HorizontalCarousel