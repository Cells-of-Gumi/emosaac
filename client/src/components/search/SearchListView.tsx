/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { returnSearchBooksType } from "@/types/search";
import BookCard from "../UI/BookCard/BookCard";
import { throttle } from "lodash";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import { useRouter } from "next/router";

export const SearchListView = ({
  books,
  type,
  getSearchBooks,
  booksWrapRef,
  prevId,
  prevScore,
  isPageEnd,
}: {
  books: returnSearchBooksType[];
  type: string;
  getSearchBooks: Function;
  booksWrapRef: any;
  prevId: number;
  prevScore: number;
  isPageEnd: boolean;
}) => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [getBooks, setGetBooks] = useState<boolean>(false);

  useEffect(() => {
    if (getBooks === true) {
      setGetBooks(() => false);
      getSearchBooks(prevId, prevScore);
    }
  }, [getBooks]);

  const onWheelHandler = useMemo(
    () =>
      throttle((event) => {
        const htmlEl = document.getElementsByTagName("html")[0];
        if (isPageEnd === false) {
          if (
            htmlEl &&
            htmlEl.clientHeight + htmlEl.scrollTop + 200 > htmlEl.scrollHeight
          ) {
            setGetBooks(() => true);
          }
        }
      }, 300),
    [books]
  );

  return (
    <div
      css={booksWrapCSS({ isDeskTop, isTablet, isMobile })}
      onWheel={onWheelHandler}
      onTouchMove={onWheelHandler}
    >
      {books &&
        books.map((book, idx) => (
          <BookCard
            key={idx}
            bookData={book}
            showPlatform={true}
            width={"100%"}
          />
        ))}
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const booksWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    padding-top: 20px;
    display: grid;
    ${isMobile && "grid-template-columns: repeat(3, 1fr);"}
    ${!isMobile && "grid-template-columns: repeat(5, 1fr);"}
    column-gap: 20px;
    row-gap: 30px;
  `;
};
