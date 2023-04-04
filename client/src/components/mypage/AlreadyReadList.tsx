/** @jsxImportSource @emotion/react */
import getBookMark from "@/api/user/getBookMark";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useState } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useRouter } from "next/router";

import HorizontalScroll from "../UI/HorizontalScroll/HorizontalScroll";
import { returnBookContentType, bookContentType } from "@/types/books";
import { getAlreadyRead } from "@/api/user/getAlreadyRead";

type AlreadyProps = {
  typeCode: number;
};
type returnGetAlreadyProps = {
  bookId: number;
  thumbnail: string;
  modifiedDate: string;
  prevTime: string;
};
const AlreadyReadList = ({ typeCode }: AlreadyProps) => {
  const getAlreadyListkAPI = ({
    bookList,
    size,
  }: {
    bookList: returnGetAlreadyProps[];
    size: number;
  }) => {
    const prevId = bookList.length ? bookList[bookList.length - 1].bookId : 0;
    const prevTime = bookList.length
      ? bookList[bookList.length - 1].prevTime
      : "";
    return getAlreadyRead({ prevId, prevTime, size, typeCode });
  };
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [prevId, setPrevId] = useState<number>(0);
  const [prevTime, setPrevTime] = useState<string>("0");
  const [size, setSize] = useState<number>(7);
  const [alreadyLists, setAlreadyLists] = useState<bookContentType[]>([]);
  useEffect(() => {
    getAlreadyRead({ prevId, prevTime, size, typeCode }).then((res) => {
      const data = res;
      if (data !== null) {
        // console.log(data);
        setAlreadyLists(data.content);
      }
    });
  }, [typeCode]);

  return (
    <section css={bookmarkwrapCSS}>
      <h3>읽은 목록</h3>
      {alreadyLists && alreadyLists.length > 0 ? (
        <div>
          <Temp
            key={`temp1-${typeCode}`}
            API={getAlreadyListkAPI}
            identifier={`temp1-${typeCode}`}
          />
        </div>
      ) : (
        <div css={nobookmarkCSS}>
          읽은 {typeCode === 0 ? "웹툰" : "웹소설"}이 없어요
        </div>
      )}
    </section>
  );
};
const bookmarkwrapCSS = css`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-right: 50px;
  width: 100%;
  margin-top: 50px;
  & > h3 {
    font-size: 25px;
    margin-bottom: 20px;
  }
`;

const bookmarkimageCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  display: grid;
  grid-template-columns: ${isDeskTop ? "repeat(5, 1fr)" : "null"};
  grid-template-columns: ${isTablet
    ? "repeat(3,1fr)"
    : isMobile
    ? "repeat(2,1fr)"
    : "null"};
  gap: 16px;
  width: 100%;
`;

const imageCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  width: 100%;
  height: ${isDeskTop ? "300px" : isTablet ? "100%" : "100%"};
  min-width: 200px;
  min-height: 200px;
  object-fit: contain;
  padding: 10px;
  cursor: pointer;
`;

const nobookmarkCSS = css`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default AlreadyReadList;

const Temp = ({ API, identifier }: any) => {
  return (
    <HorizontalScroll
      API={API}
      identifier={"북마크리스트"}
      key={`temp1-${identifier}`}
    />
  );
};
