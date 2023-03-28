/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useMemo, useState, useRef } from "react"
import { throttle } from "lodash";
import BookCard from "../BookCard/BookCard";
import { bookContentType, returnBookContentType } from "@/types/books";

interface InfinityScrollProps {
    API: ({fetchedData, prevId, prevScore, size}: {fetchedData: any; prevId?: number; prevScore?: number; size: number}) => Promise<any>;

}

const InfinityScroll = ({API}: InfinityScrollProps) => {
    const cardLayout = {
        width: "10vw",
        height: "15vw",
        minWidth: "150px",
        minHeight: "225px",
        padding: "0.5vw",
    };

    const [fetchedData, setFetchedData] = useState<any>({})
    const [quantityPerPage, setQuantityPerPage] = useState<number>(10)
    const [offset, setOffset] = useState<number>(0)
    const [getFetch, setGetFetch] = useState<boolean>(false)
    const scrollWrapperRef = useRef<HTMLDivElement>(null)
    const pageClassRef = useRef<any>([])
    const [onScreenContentIdx, setOnScreenContentIdx] = useState<number>(0)
    const [dummyElements, setDummyElements] = useState<any>([])

    useEffect(() => {
        API({fetchedData: fetchedData, size: Object.keys(fetchedData).length + quantityPerPage + 1})
        .then((res: returnBookContentType) => {
            const temp = {[fetchedData.length]: [...res.content]}
            setFetchedData(() => temp)
        })
    }, [])

    useEffect(() => {
        if (getFetch === true && fetchedData) {
            const lastContent = fetchedData[Object.keys(fetchedData).length - 1][fetchedData[Object.keys(fetchedData).length - 1].length - 1]
            API({fetchedData: fetchedData, prevId: lastContent.bookId, prevScore: lastContent.avgScore, size: fetchedData.length + quantityPerPage + 1})
            .then((res: returnBookContentType) => {
                // setFetchedData(() => [...fetchedData, [...res.content]])
                const temp = {...fetchedData, [fetchedData.length]: [...res.content]}
                setFetchedData(() => temp)
                setOffset((prev) => prev + 1)
                console.log(fetchedData)
            })
            setFetch(false)
        }
        
    }, [getFetch])

    useEffect(() => {
        setDummyElements(() => Array(onScreenContentIdx + 1).fill(null))
    }, [onScreenContentIdx])

    const setFetch = (value: boolean) => {
        setGetFetch(() => value)
    }

    const onScrollHandler = useMemo(
        () =>
            throttle((event) => {
                if (scrollWrapperRef?.current && (((scrollWrapperRef.current.scrollHeight - 10) < scrollWrapperRef.current.clientHeight) || scrollWrapperRef.current.scrollTop > scrollWrapperRef.current.scrollHeight - scrollWrapperRef.current.clientHeight - 100)) {
                    setFetch(true)
                    
                    
                }
            }, 300),
        [fetchedData]
    );

    const topDummyRender = dummyElements.map((el, idx) => {
        return (
            <div css={dummyWrapperCSS({standardRef: pageClassRef})}>

            </div>
        )
    })
    


    
    const pageRender = Object.keys(fetchedData).slice(onScreenContentIdx, onScreenContentIdx + 2).map((page: any, pageIdx: number) => {
        const contentRender = fetchedData[page].map((content: bookContentType, contentIdx: number) => {
            return (
                <BookCard showPlatform={true} bookData={content} width={cardLayout.width} height={cardLayout.height} minWidth={cardLayout.minWidth} minHeight={cardLayout.minHeight} />
            )
        })

        return (
            <div key={`infinity-${page}`} id={`${page}`} css={pageCSS} ref={(el) => (pageClassRef.current[pageIdx] = el)}>
                {contentRender}
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
                console.log('화면에 보이는 Div', $target.id)
            $target.classList.add("screening");
            } else {
            $target.classList.remove("screening");
            }
        });
    });
    


    useEffect(() => {
        pageClassRef.current.slice(onScreenContentIdx, onScreenContentIdx + 2).forEach((item: any) => {
            io.observe(item)
        })

        return () => {

        }
    }, [offset])

    

    return (
        <div css={scrollWrapperCSS} ref={scrollWrapperRef} onWheel={onScrollHandler} onTouchMove={onScrollHandler}>
            <button onClick={() => {console.log(pageClassRef)}}>Console Ref</button>
            {topDummyRender}
            {pageRender}
            {dummyElements.length}
        </div>
    )
}

const scrollWrapperCSS = css`
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;

`

const pageCSS = css`
    border: 2px solid red;
`

const dummyWrapperCSS = ({standardRef}: {standardRef: any}) => {
    return css`
        width: ${standardRef?.current[0]?.clientWidth}px;
        height: ${standardRef?.current[0]?.clientHeight}px;
        background-color: gray;
    `
}

export default InfinityScroll