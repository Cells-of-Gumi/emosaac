/** @jsxImportSource @emotion/react */
import getBookMark from "@/api/user/getBookMark";
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useState } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
type BookMarkProps = {
  typeCode: number;
};
type returnGetBookMarkProps = {
  bookId: number;
  thumbnail: string;
  modifiedDate: string;
};
const BookMark = ({ typeCode }: BookMarkProps) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [prevId, setPrevId] = useState<number>(0);
  const [prevTime, setPrevTime] = useState<string>("0");
  const [size, setSize] = useState<number>(7);
  const [bookmarks, setBookmarks] = useState<returnGetBookMarkProps[]>([]);
  useEffect(() => {
    getBookMark(prevId, prevTime, size, typeCode).then((res) => {
      const data = res;
      if (data !== null) {
        console.log(data);
        setBookmarks(data);
      }
    });
  }, []);

  return (
    <section css={bookmarkwrapCSS}>
      <h3>북마크 한 목록</h3>
      <div css={bookmarkimageCSS(isDeskTop, isTablet, isMobile)}>
        {bookmarks.map((bookmark) => (
          <img
            key={bookmark.bookId}
            src={bookmark.thumbnail}
            alt="북마크 썸네일"
            css={imageCSS(isDeskTop, isTablet, isMobile)}
          />
        ))}
      </div>
    </section>
  );
};
const bookmarkwrapCSS = css`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  width: 100%;
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
`;
export default BookMark;
