/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";
// import { getToken } from "@/api/instance";
import VerticalScroll from "@/components/bookTab/VerticalScroll/VerticalScroll";
import BookCard from "@/components/UI/BookCard/BookCard";
import HorizontalCarousel from "../UI/ScrollableCarousel/HorizontalCarousel";
export default function SortByDay() {

  const infinityScrollAPI = ({fetchedData, prevId, prevScore, size}: {fetchedData: any; prevId?: number; prevScore?: number; size: number}) => {
    return getBooksByGenre({genreCode: 11, typeCode: 0, prevId, prevScore, size})
  }

  return (

    <>
      <VerticalScroll API={infinityScrollAPI}/>
      {/* <HorizontalCarousel API={infinityScrollAPI}/> */}
    </>
        

      

  );
}

const infinityWrapperCSS = css`
  width: 100%;
  height: 100%;
  background-color: red;

`

// 이후 작업들...
