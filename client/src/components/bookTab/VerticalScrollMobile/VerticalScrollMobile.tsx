/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useMemo, useState, useRef } from "react"
import { throttle } from "lodash";
import BookCard from "../../UI/BookCard/BookCard";
import { bookContentType, returnBookContentType } from "@/types/books";

interface VerticalScrollMobileProps {
    API: ({fetchedData, prevId, prevScore, size}: {fetchedData: any; prevId?: number; prevScore?: number; size: number}) => Promise<any>;

}

const VerticalScrollMobile = ({API}: VerticalScrollMobileProps) => {
    const cardLayout = {
        width: "45vw",
        height: "30vh",
        minWidth: "45vw",
        minHeight: "30vh",
        padding: "0.5vw",
        margin: "6px"
    };

    const [fetchedData, setFetchedData] = useState<any>([])
    const [quantityPerPage, setQuantityPerPage] = useState<number>(10)
    // const [offset, setOffset] = useState<number>(0)
    const [getFetch, setGetFetch] = useState<boolean>(false)
    const scrollWrapperRef = useRef<HTMLDivElement>(null)
    const pageClassRef = useRef<any>([])
    const dummyClassRef = useRef<any>([])
    const actualPageRef = useRef<any>([])
    const [onScreenContentIdx, setOnScreenContentIdx] = useState<number>(0)
    const [dummyWidth, setDummyWidth] = useState<number>(0)
    const [dummyHeight, setDummyHeight] = useState<number>(0)

    useEffect(() => {
        const loadData = window.localStorage.getItem('inf_fetched_data')
        const loadPage = window.localStorage.getItem('recent_page')

        console.log('로드', loadData && JSON.parse(loadData))
        if (loadData) {
            setFetchedData(() => JSON.parse(loadData))
        } else {
            API({fetchedData: fetchedData, size: quantityPerPage})
            .then((res: returnBookContentType) => {
                setFetchedData(() => [[...res.content]])
            })
        }

        if (loadPage) {
            setOnScreenContentIdx(() => JSON.parse(loadPage))
        }
        


        
        
        
    }, [])

    useEffect(() => {
        const loadScroll = window.localStorage.getItem('recent_scroll')
        if (loadScroll && scrollWrapperRef.current) {
            scrollWrapperRef.current.scrollTo(0, Number(JSON.parse(loadScroll)))
        }
    }, [scrollWrapperRef.current])

    useEffect(() => {
        if (getFetch === true && fetchedData) {
            const lastContent = fetchedData[fetchedData.length - 1][fetchedData[fetchedData.length - 1].length - 1]
            API({fetchedData: fetchedData, prevId: lastContent.bookId, prevScore: lastContent.avgScore, size: quantityPerPage})
            .then((res: returnBookContentType) => {
                // setFetchedData(() => [...fetchedData, [...res.content]])
                const temp = [...fetchedData, [...res.content]]
                setFetchedData(() => temp)
                // setOffset((prev) => prev + 1)
                window.localStorage.setItem('inf_fetched_data', JSON.stringify(temp))
                console.log(fetchedData)
            })
            setFetch(false)
        }
        
    }, [getFetch])

    useEffect(() => {
        setDummyWidth(() => actualPageRef?.current?.clientWidth)
        setDummyHeight(() => actualPageRef?.current?.clientHeight)
    }, [fetchedData])



    const setFetch = (value: boolean) => {
        setGetFetch(() => value)
    }

    const onScrollHandler = useMemo(
        () =>
            throttle((event) => {
                if (scrollWrapperRef?.current && (((scrollWrapperRef.current.scrollHeight - 10) < scrollWrapperRef.current.clientHeight) || scrollWrapperRef.current.scrollTop > scrollWrapperRef.current.scrollHeight - scrollWrapperRef.current.clientHeight - 100)) {
                    setFetch(true)   
                }
                if (scrollWrapperRef.current !== null && scrollWrapperRef.current.scrollTop !== 0) {
                    window.localStorage.setItem('recent_scroll', String(scrollWrapperRef.current.scrollTop))
                }
            }, 300),
        [fetchedData]
    );


    


    
    const pageRender = fetchedData.map((page: any, pageIdx: number) => {
        const contentRender = page.map((content: bookContentType, contentIdx: number) => {
            return (
                <BookCard showPlatform={true} bookData={content} margin={cardLayout.margin} width={cardLayout.width} height={cardLayout.height} minWidth={cardLayout.minWidth} minHeight={cardLayout.minHeight} />
            )
        })


            return (
                <div key={`infinity-${pageIdx}`} id={`${pageIdx}`} ref={(el) => {pageClassRef.current[pageIdx] = el;}}>
                    {onScreenContentIdx === pageIdx || onScreenContentIdx === pageIdx - 1 || onScreenContentIdx === pageIdx + 1 ? 
                    <div ref={actualPageRef} css={contentPageWrapperCSS}>{contentRender}</div> : <div id={`${pageIdx}`} css={dummyWrapperCSS({standardWidth: dummyWidth, standardHeight: dummyHeight})} />
                }
                    
                    
                </div>
            )
        
    })


    
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // entry의 target으로 DOM에 접근합니다.
            const $target = entry.target;
        
            // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
            if (entry.isIntersecting) {
                setOnScreenContentIdx(() => Number($target.id))
                window.localStorage.setItem('recent_page', $target.id)
                
                
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


        return () => io.disconnect();

    }, [pageClassRef.current.length, fetchedData])

    


    return (
        <div  css={scrollWrapperCSS} ref={scrollWrapperRef} onWheel={onScrollHandler} onTouchMove={onScrollHandler}>
            <button onClick={() => {console.log(pageClassRef)}}>Console Ref</button>

            {pageRender}
 
        </div>
    )
}

const scrollWrapperCSS = css`
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

`



const dummyWrapperCSS = ({standardWidth, standardHeight}: {standardWidth: any; standardHeight: any}) => {
    return css`
        width: ${standardWidth}px;
        height: ${standardHeight}px;
        /* background-color: gray; */
        /* border: 2px solid red; */
    `
}

const contentPageWrapperCSS = css`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    display: grid;
    grid-template-columns: 50% 50%;
    place-items: center;
`

export default VerticalScrollMobile