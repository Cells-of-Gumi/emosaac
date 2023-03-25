/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";

export default function Home() {
  const test = async () => {
    const data = await getBookDetail({ bookId: 1 }).then(
      (res) => {
        return res;
      }
    );
    await console.log(data);
  };

  return (
    <div>
      <button onClick={test}>test</button>
    </div>
  );
}
