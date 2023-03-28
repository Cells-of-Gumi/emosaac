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

    const [fetchedData, setFetchedData] = useState<any>([])
    const [quantityPerPage, setQuantityPerPage] = useState<number>(10)
    const [getFetch, setGetFetch] = useState<boolean>(false)
    const scrollWrapperRef = useRef<HTMLDivElement>(null)
    const pageClassRef = useRef<any>([])

    useEffect(() => {
        API({fetchedData: fetchedData, size: fetchedData.length + quantityPerPage + 1})
        .then((res: returnBookContentType) => {
            console.log('ㅋ', res)
            setFetchedData(() => [...fetchedData, [...res.content]])
        })
    }, [])

    useEffect(() => {
        if (getFetch === true) {
            const lastContent = fetchedData[fetchedData.length - 1][fetchedData[fetchedData.length - 1].length - 1]
            API({fetchedData: fetchedData, prevId: lastContent.bookId, prevScore: lastContent.avgScore, size: fetchedData.length + quantityPerPage + 1})
            .then((res: returnBookContentType) => {
                setFetchedData(() => [...fetchedData, [...res.content]])
            })
            setFetch(false)
        }
        
    }, [getFetch])

    const setFetch = (value: boolean) => {
        setGetFetch(() => value)
    }

    const onScrollHandler = useMemo(
        () =>
            throttle((event) => {
                if (scrollWrapperRef?.current && (((scrollWrapperRef.current.scrollHeight - 10) < scrollWrapperRef.current.clientHeight) || scrollWrapperRef.current.scrollTop > scrollWrapperRef.current.scrollHeight - scrollWrapperRef.current.clientHeight - 100)) {
                    setFetch(true)
                    console.log('페칭 시작!')
                }
            }, 300),
        [fetchedData]
    );


    const pageRender = fetchedData.map((page: any, pageIdx: number) => {
        const contentRender = page.map((content: bookContentType, contentIdx: number) => {

            

            return (
                <BookCard showPlatform={true} bookData={content} width={cardLayout.width} height={cardLayout.height} minWidth={cardLayout.minWidth} minHeight={cardLayout.minHeight} />
            )
        })

        return (
            <div ref={(el) => (pageClassRef.current[pageIdx] = el)}>
                {contentRender}
            </div>
        )
    })

    

    return (
        <div ref={scrollWrapperRef} onWheel={onScrollHandler} onTouchMove={onScrollHandler}>
            {pageRender}
        </div>
    )
}

export default InfinityScroll