/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, useMemo, useRef } from "react";
import { returnSearchBooksType } from "@/types/search";
import BookCardSearch from "../UI/BookCard/BookCardSearch";
import { throttle } from "lodash";
import { useIsResponsive } from "../Responsive/useIsResponsive";

export const SearchListView = ({
  books,
  getSearchBooks,
  booksWrapRef,
  prevId,
  prevScore,
  isPageEnd,
}: {
  books: returnSearchBooksType[];
  getSearchBooks: Function;
  booksWrapRef: any;
  prevId: number;
  prevScore: number;
  isPageEnd: boolean;
}) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [getBooks, setGetBooks] = useState<boolean>(false);

  useEffect(() => {
    if (getBooks === true && !isPageEnd) {
      getSearchBooks(prevId, prevScore);
      setGetBooks(() => false);
    }
  }, [getBooks]);

  const onWheelHandler = useMemo(
    () =>
      throttle((event) => {
        console.log(booksWrapRef);
        if (event.deltaY > 0) {
          if (
            booksWrapRef.current &&
            (booksWrapRef.current.scrollHeight - 10 <
              booksWrapRef.current.clientHeight ||
              booksWrapRef.current.scrollTop >
                booksWrapRef.current.scrollHeight -
                  booksWrapRef.current.clientHeight -
                  100)
          ) {
            setGetBooks(() => true);
            console.log("업데이트한드아아앙");
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
