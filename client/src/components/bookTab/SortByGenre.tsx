/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";
// import { getToken } from "@/api/instance";
import VerticalScroll from "../UI/VerticalScroll/VerticalScroll";
import BookCard from "@/components/UI/BookCard/BookCard";
// import HorizontalCarousel from "../UI/ScrollableCarousel/HorizontalCarousel";
import { getBooksByDay } from "@/api/book/getBooksByDay";
import { bookContentType } from "@/types/books";

interface SortByGenreProps {
  selectedGenre: number;
  params: string;
}

export default function SortByGenre({selectedGenre, params}: SortByGenreProps) {

  const getBooksByGenreAPI = ({
    lastContent,
    size,
  }: {
    lastContent?: bookContentType;
    size: number;
  }) => {
    const prevId = lastContent ? lastContent.bookId : 0;
    const prevScore = lastContent ? lastContent.avgScore : 10;
    return getBooksByGenre({
      genreCode: selectedGenre,
      typeCode: (params === 'webtoon' ? 0 : 1),
      prevId: prevId,
      prevScore: prevScore,
      size: size,
    });
  };

  return (

    <>
      <VerticalScroll key={`sortByGenre-${params}-${selectedGenre}`} identifier={`sortBytDay-${params}-${selectedGenre}`} API={getBooksByGenreAPI}/>
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
