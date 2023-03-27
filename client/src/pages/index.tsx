/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { getBookDetail } from "@/api/book/getBookDetail";
import { getToken } from "@/api/instance";

export default function Home() {
  return <div></div>;
}
export const getServerSideProps = async (context: any) => {
  // 쿠키 확인
  const cookiesInHeader = context.req.headers.cookie;
  console.log("Cookies in Header:", cookiesInHeader);

  const token = getToken(context.req);
  console.log("Token:", token);

  // 이후 작업들...

  return {
    props: {
      // 여기에 props 설정
    },
  };
};
