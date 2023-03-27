/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";
// import { getToken } from "@/api/instance";

export default function Home() {

  const data = () => {
    getBooksByGenre({genreCode: 10, typeCode: 0, prevId: 0, prevScore: 10, size: 20 })
    .then((res) => {
      if (res !== null) {
        console.log(res.content)
        return res.content;
      }
    })
    .catch((err) => {
      console.log("pages/books/index.tsx => getBooksByGenre", err);
    });
  }


  return <div><button onClick={data}>dsa</button></div>;
}

// 이후 작업들...
