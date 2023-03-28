/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useMemo, useState, useRef } from "react"
import { throttle } from "lodash";
import BookCard from "../../UI/BookCard/BookCard";
import { bookContentType, returnBookContentType } from "@/types/books";

interface PaginationDeskTopProps {
    API: ({fetchedData, prevId, prevScore, size}: {fetchedData: any; prevId?: number; prevScore?: number; size: number}) => Promise<any>;

}

const PaginationDeskTop = ({API}: PaginationDeskTopProps) => {
    const cardLayout = {
        width: "10vw",
        height: "15vw",
        minWidth: "150px",
        minHeight: "225px",
        padding: "0.5vw",
        margin: '12px'
      };

    const [fetchedData, setFetchedData] = useState<any>([])
    const [quantityPerPage, setQuantityPerPage] = useState<number>(10)
    const [offset, setOffset] = useState<number>(0)
    const [getFetch, setGetFetch] = useState<boolean>(false)
    const scrollWrapperRef = useRef<HTMLDivElement>(null)
    const [onScreenContentIdx, setOnScreenContentIdx] = useState<number>(0)


    useEffect(() => {
        const loadData = window.localStorage.getItem('inf_fetched_data')
        const loadPage = window.localStorage.getItem('recent_page')


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
        if (getFetch === true && fetchedData) {
            const lastContent = fetchedData[fetchedData.length - 1][fetchedData[fetchedData.length - 1].length - 1]
            API({fetchedData: fetchedData, prevId: lastContent.bookId, prevScore: lastContent.avgScore, size: quantityPerPage})
            .then((res: returnBookContentType) => {
                // setFetchedData(() => [...fetchedData, [...res.content]])
                const temp = [...fetchedData, [...res.content]]
                setFetchedData(() => temp)
                setOffset((prev) => prev + 1)
                window.localStorage.setItem('inf_fetched_data', JSON.stringify(temp))
                console.log(fetchedData)
            })
            setFetch(false)
        }
        
    }, [getFetch])




    const setFetch = (value: boolean) => {
        setGetFetch(() => value)
    }




    

    const contentRender = (idx: number) => {
        return fetchedData[idx]?.map((content: bookContentType, contentIdx: number) => {
            return (
                <BookCard showPlatform={true} bookData={content} margin={cardLayout.margin} width={cardLayout.width} height={cardLayout.height} minWidth={cardLayout.minWidth} minHeight={cardLayout.minHeight} />
            )
        })
    }

    // 여기에 페이지네이션 렌더링
    // const pageIndicatorRender = 
    
    
    



    
    return (
        <div>
            {contentRender(onScreenContentIdx)}
        </div>
    )


}
    

const scrollWrapperCSS = css`
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;

`







export default PaginationDeskTop