/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { returnSearchBooksType } from "@/types/search";
import BookCardSearch from "../UI/BookCard/BookCardSearch";
import { throttle } from "lodash";
import { useIsResponsive } from "../Responsive/useIsResponsive";

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
        if (event.deltaY > 0 && isPageEnd === false) {
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
    >
      {books &&
        books.map((book, idx) => (
          <BookCardSearch key={idx} bookData={book} showPlatform={false} />
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
