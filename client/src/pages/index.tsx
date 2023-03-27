/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";

export default function Home() {
  const test = async () => {
    const data = await getBooksByGenre({genreCode: 10, typeCode: 0, prevId: 0, prevScore: 10, size: 20 })
    .then((res) => {
      if (res !== null) {
        return res.content;
      }
    })
    .catch((err) => {
      console.log("pages/books/index.tsx => getBooksByGenre", err);
    });
    await console.log(data);
  };

  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}

// export const getServerSideProps = async (context: any) => {
//   // const params = await context.params;
//   const data = await getBookDetail({bookId: 1})
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log("pages/books/[bookId].tsx => ", err);
//     });

//   return await {
//     props: {
//       bookData: data,
//     },
//   };
// };
