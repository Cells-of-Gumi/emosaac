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

interface SortByDayProps {
  selectedDay: number;
  params: string;
}

export default function SortByDay({ selectedDay, params }: SortByDayProps) {
  const days = ["월", "화", "수", "목", "금", "토", "일", "완결"];
  
  const getBooksByDayAPI = ({
    lastContent,
    size,
  }: {
    lastContent?: bookContentType;
    size: number;
  }) => {
    // return getBooksByGenre({genreCode: 11, typeCode: 0, prevId, prevScore, size})
    const prevId = lastContent ? lastContent.bookId : 0;
    const prevScore = lastContent ? lastContent.avgScore : 10;
    return getBooksByDay({
      day: days[selectedDay],
      typeCode: params === "webtoon" ? 0 : 1,
      prevId: prevId,
      prevScore: prevScore,
      size,
    });
  };

  return (
    <>
      <VerticalScroll
        key={`sortBytDay-${params}-${selectedDay}`}
        identifier={`sortBytDay-${params}-${selectedDay}`}
        API={getBooksByDayAPI}
      />
      {/* <HorizontalCarousel API={infinityScrollAPI}/> */}
    </>
  );
}

const infinityWrapperCSS = css`
  width: 100%;
  height: 100%;
  background-color: red;
`;

// 이후 작업들...
