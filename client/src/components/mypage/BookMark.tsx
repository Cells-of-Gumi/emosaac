// /** @jsxImportSource @emotion/react */
// import getBookMark from "@/api/user/getBookMark";
// import { css } from "@emotion/react";
// import { useEffect } from "react";
// import { useState } from "react";
// import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
// import { useRouter } from "next/router";
// import ScrollableCarousel from "../UI/HorizontalScroll/HorizontalScroll";
// import SortByRows from "../bookTab/SortByRows";

// type BookMarkProps = {
//   typeCode: number;
// };
// type returnGetBookMarkProps = {
//   bookId: number;
//   thumbnail: string;
//   modifiedDate: string;
//   prevTime: string;
// };
// const BookMark = ({ typeCode }: BookMarkProps) => {



//   const getBookMarkAPI = ({
//     bookList,
//     size,
//   }: {
//     bookList: returnGetBookMarkProps[];
//     size: number;
//   }) => {
//     const prevId = bookList?.length ? bookList[bookList.length - 1].bookId : 0;
//     const prevTime = bookList?.length
//       ? bookList[bookList.length - 1]?.prevTime
//       : "";
//     return getBookMark(prevId, prevTime, size, typeCode);
//   };


  

//   const router = useRouter();
//   const [isDeskTop, isTablet, isMobile] = useIsResponsive();
//   const [prevId, setPrevId] = useState<number>(0);
//   const [prevTime, setPrevTime] = useState<string>("0");
//   const [size, setSize] = useState<number>(7);
//   const [bookmarks, setBookmarks] = useState<returnGetBookMarkProps[]>([]);

//   useEffect(() => {
//     getBookMark(prevId, prevTime, size, typeCode).then((res) => {
//       const data = res;
//       if (data !== null) {
//         // console.log(data);
//         setBookmarks(() => data.content);
//       }
//     });
//   }, [typeCode]);


//   const bookFetchList = [
//     {
//       API: getBookMarkAPI,
//       identifier: `getBookMark-${typeCode}`,
//       beforeLabel: '북마크 목록 ',
//       requireLogin: false,
//     },
//   ]

//   return (
//     <section css={bookmarkwrapCSS}>
//       {/* <h3>북마크 목록{typeCode}</h3> */}
//       {bookmarks && bookmarks?.length > 0 ? (
//         <div css={scrollCSS}>
//           <SortByRows fetchList={bookFetchList}/>
//           {/* <ScrollableCarousel
//             API={getBookMarkAPI}
//             identifier={"북마크리스트"}
//           /> */}
//         </div>
//       ) : (
//         <div css={nobookmarkCSS}>
//           북마크 한 {typeCode === 0 ? "웹툰" : "웹소설"}이 없어요
//         </div>
//       )}
      
//     </section>
//   );
// };
// const bookmarkwrapCSS = css`
//   display: flex;
//   flex-direction: column;
//   /* padding-left: 30px;
//   margin-right: 50px; */
//   width: 100%;
//   & > h3 {
//     font-size: 25px;
//     margin-bottom: 20px;
//   }
// `;

// const scrollCSS = css`
//   width: 100%;
// `;

// const bookmarkimageCSS = (
//   isDeskTop: boolean,
//   isTablet: boolean,
//   isMobile: boolean
// ) => css`
//   display: grid;
//   grid-template-columns: ${isDeskTop ? "repeat(5, 1fr)" : "null"};
//   grid-template-columns: ${isTablet
//     ? "repeat(3,1fr)"
//     : isMobile
//     ? "repeat(2,1fr)"
//     : "null"};
//   gap: 16px;
//   width: 100%;
// `;

// const imageCSS = (
//   isDeskTop: boolean,
//   isTablet: boolean,
//   isMobile: boolean
// ) => css`
//   width: 100%;
//   height: ${isDeskTop ? "300px" : isTablet ? "100%" : "100%"};
//   min-width: 200px;
//   min-height: 200px;
//   object-fit: contain;
//   padding: 10px;
//   cursor: pointer;
// `;

// const nobookmarkCSS = css`
//   height: 200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// export default BookMark;
