/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";
// import { getToken } from "@/api/instance";
import InfinityScroll from "@/components/UI/InfinityScroll/InfinityScroll";
import BookCard from "@/components/UI/BookCard/BookCard";

export default function Home() {

  const infinityScrollAPI = ({fetchedData, prevId, prevScore, size}: {fetchedData: any; prevId?: number; prevScore?: number; size: number}) => {
    return getBooksByGenre({genreCode: 11, typeCode: 0, prevId, prevScore, size})
  }

  return (
    <div>
      <InfinityScroll API={infinityScrollAPI}/>
    </div>
  );
}

// 이후 작업들...
