/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useRouter } from "next/router";
import { returnSearchHistoryType } from "@/types/search";
import EmopickSearchBookCard from "./EmopickSearchBookCard";
import ToggleButton from "../UI/Button/ToggleButton";
import { getSearchHistory } from "@/api/search/getSearchHistory";
import { getBookDetail } from "@/api/book/getBookDetail";
import { BasicButton } from "../UI/NavigationBar/BasicButton";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { returnSearchBooksType } from "@/types/search";
import { throttle } from "lodash";
import { atom, useAtom } from "jotai";

type bookType = {
  title: string;
  bookId: number;
  typeCd: number;
  review: string;
  thumbnail: string;
};

interface Props {
  setSelectedBookList: Dispatch<
    SetStateAction<
      {
        title: string;
        bookId: number;
        typeCd: number;
        review: string;
        thumbnail: string;
      }[]
    >
  >;
  selectedBookList: {
    title: string;
    bookId: number;
    typeCd: number;
    review: string;
    thumbnail: string;
  }[];
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
  books: returnSearchBooksType[];
  type: string;
  getSearchBooks: Function;
  prevId: number;
  prevScore: number;
  isPageEnd: boolean;
  bookList?: {
    title: string;
    bookId: number;
    typeCd: number;
    review: string;
    thumbnail: string;
  }[];
  searchInput: string;
  setBookList: Dispatch<SetStateAction<bookType[]>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const EmopickSearchBox = ({
  setIsSearchBoxOpen,
  setSelectedBookList,
  selectedBookList,
  books,
  type,
  getSearchBooks,
  prevId,
  prevScore,
  isPageEnd,
  bookList,
  searchInput,
  setBookList,
  setIsModalOpen,
}: Props) => {
  const router = useRouter();
  const [bookData, setBookData] = useState<returnSearchHistoryType[] | any[]>(
    []
  );
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [getBooks, setGetBooks] = useState<boolean>(false);
  const [selectedBookIdList, setSelectedBookIdList] = useState<number[]>([]);
  const [bookIdList, setBookIdList] = useState<number[]>([]);
  const booksWrapRef = useRef<HTMLDivElement>(null);
  const onWheelHandler = useMemo(
    () =>
      throttle((event) => {
        if (isPageEnd === false) {
          if (
            booksWrapRef &&
            booksWrapRef.current?.scrollTop &&
            booksWrapRef.current?.clientHeight &&
            booksWrapRef.current.scrollTop +
              booksWrapRef.current.clientHeight +
              100 >
              booksWrapRef.current.scrollHeight
          ) {
            setGetBooks(() => true);
          }
        }
      }, 300),
    [books]
  );

  function selectBook(oneBookData: any) {
    if (bookIdList && !bookIdList.includes(oneBookData)) {
      if (
        selectedBookIdList &&
        selectedBookIdList.includes(oneBookData.bookId)
      ) {
        const newSelectedBookIdList = selectedBookIdList?.filter((bookId) => {
          console.log(bookId !== oneBookData.bookId);
          return bookId !== oneBookData.bookId;
        });
        const newSelectedBookList = selectedBookList?.filter((book) => {
          console.log(book.bookId !== oneBookData.bookId);
          return book.bookId !== oneBookData.bookId;
        });
        setSelectedBookIdList(newSelectedBookIdList);
        setSelectedBookList(newSelectedBookList);
      } else {
        const nowBookObj: bookType = {
          title: oneBookData.title,
          bookId: oneBookData.bookId,
          typeCd: oneBookData.typeCd,
          review: "ggggg",
          thumbnail: oneBookData.thumbnail,
        };
        setSelectedBookIdList((prev) => [...prev, oneBookData.bookId]);
        setSelectedBookList((prev) => [...prev, nowBookObj]);
      }
    }
  }

  function addBook(oneBook: any) {
    console.log(selectedBookList);
    setBookList((prev) => [...prev, ...selectedBookList]);
    setSelectedBookIdList([]);
    setSelectedBookList([]);
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (getBooks === true) {
      setGetBooks(() => false);
      getSearchBooks(prevId, prevScore);
    }
  }, [getBooks]);

  useEffect(() => {
    setBookData(books);
  }, [books]);

  useEffect(() => {
    console.log(selectedBookList);
  }, [searchInput]);

  useEffect(() => {
    if (bookList !== undefined && bookList.length > 0) {
      const newBookIdList = bookList.map((book) => {
        return book.bookId;
      });
      setBookIdList(newBookIdList);
    } else {
      setBookIdList([]);
    }
    console.log(bookList);
  }, [bookList]);
  return (
    <div css={searchWrapCSS}>
      <div
        css={searchBoxCSS({
          isDeskTop,
          isTablet,
          isMobile,
        })}
      >
        <div css={searchContentWrapCSS({ isDeskTop, isTablet, isMobile })}>
          <div css={recentHistoryCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>검색 결과</h3>
            {bookData && (
              <div
                css={booksWrapCSS(
                  { isDeskTop, isTablet, isMobile },
                  bookData.length === 0
                )}
                ref={booksWrapRef}
                onWheel={onWheelHandler}
                onTouchMove={onWheelHandler}
              >
                {bookData.length === 0 &&
                  (searchInput !== "" ? (
                    <div css={noResCSS({ isDeskTop, isTablet, isMobile })}>
                      일치하는 검색 결과가 없습니다.
                    </div>
                  ) : (
                    <div css={noResCSS({ isDeskTop, isTablet, isMobile })}>
                      검색어를 입력해주세요.
                    </div>
                  ))}

                {bookData.length > 0 &&
                  bookData.map((book, idx) => (
                    <div
                      css={bookWrapCSS(book.typeCd === 0)}
                      key={idx}
                      onClick={() => selectBook(book)}
                    >
                      <span>
                        {book && book.typeCd === 0 ? "웹툰" : "웹소설"}
                      </span>
                      <EmopickSearchBookCard
                        bookData={book}
                        showPlatform={false}
                        width={"100%"}
                        height={isMobile ? "170px" : "190px"}
                        setSelectedBookList={setSelectedBookList}
                        selectedBookList={selectedBookList}
                        bookList={bookList}
                        selectedBookIdList={selectedBookIdList}
                        bookIdList={bookIdList}
                      />
                      <div css={titleCSS({ isDeskTop, isTablet, isMobile })}>
                        <div>{book.title}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={addBook}
            type="button"
            css={addButtonCSS(
              { isDeskTop, isTablet, isMobile },
              selectedBookIdList.length === 0
            )}
            disabled={selectedBookIdList.length > 0 ? false : true}
          >
            {selectedBookIdList.length > 0
              ? `${selectedBookIdList.length}개 작품 추가하기`
              : "작품을 선택해주세요"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const visibleCSS = (transY: string) => {
  return keyframes`
    0% {
      opacity: 0; 
      transform:translateY(${transY});}
    100% {
      opacity : 100; 
      transform:translateY(0);}
  `;
};

const searchWrapCSS = css`
  position: relative;
  z-index: 10;
`;

const searchBoxCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    /* position: absolute; */
    width: ${isMobile ? "calc(100vw - 40px)" : "700px"};
    margin: ${isMobile ? "0 20px" : "0px"};
    padding: ${isMobile ? "20px 20px 20px" : "20px 30px 20px"};
    border-radius: 0 0 10px 10px;
    background-color: var(--back-color-2);
    /* box-shadow: var(--shadow-color); */
    animation: ${visibleCSS("-100px")} 0.3s;
  `;
};

const searchContentWrapCSS = ({
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) => {
  return css`
    display: block;
  `;
};

const recentHistoryCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    margin-bottom: 30px;
    & > h3 {
      font-size: ${isDeskTop ? "18px" : isTablet ? "16px" : "14px"};
      line-height: ${isDeskTop ? "30px" : isTablet ? "26px" : "20px"};
      font-weight: bold;
      margin-bottom: 10px;
    }
    & > div {
    }
  `;
};

const booksWrapCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  isNoData: boolean
) => {
  return css`
    display: ${isNoData ? "block" : "grid"};
    ${!isNoData &&
    (isMobile
      ? "grid-template-columns: 1fr 1fr 1fr;"
      : "grid-template-columns: 1fr 1fr 1fr 1fr;")}
    ${isDeskTop && "column-gap: 20px;"}
    ${!isDeskTop && "column-gap: 10px;"}
    height: ${isNoData ? "120px" : "280px"};
    overflow-y: scroll;
  `;
};

const bookWrapCSS = (isWebtoon: boolean) => css`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40px;
  line-height: 40px;
  height: fit-content;
  & > span {
    position: absolute;
    z-index: 10;
    top: 0;
    display: block;
    /* width: 40px; */
    padding: 0 6px;
    text-align: center;
    font-weight: bold;
    height: 25px;
    line-height: 25px;
    border-radius: 5px 0px 5px 0px;
    background-color: ${isWebtoon ? "var(--main-color)" : "#fff"};
    color: ${!isWebtoon ? "var(--main-color)" : "#fff"};
    margin-right: 6px;
    font-size: 12px;
  }
`;

const noResCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    line-height: 100px;
    font-size: ${isDeskTop ? "14px" : isTablet ? "14px" : "14px"};
  `;
};

const titleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: flex;
    line-height: 40px;
    align-items: center;
    width: 102px;
    ${isDeskTop ? "font-size: 14px;" : "font-size: 14px;"}
    & > span {
      display: block;
      width: 34px;
      text-align: center;
      font-weight: bold;
      ${isDeskTop ? "font-size: 10px;" : "font-size: 10px;"}
      height: 20px;
      line-height: 20px;
      border-radius: 5px;
      background-color: var(--main-color);
      margin-right: 6px;
    }
    & > div {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
};

const flipCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    cursor: pointer;
    position: absolute;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--text-color-3);
    :hover svg {
      transition: all 0.3s;
      transform: translateY(-5px);
    }
  `;
};

const addButtonCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  isDisable: boolean
) => css`
  cursor: ${isDisable ? "not-allowed" : "pointer"};
  background-color: ${isDisable ? "#bbb" : "var(--main-color)"};
  border-radius: 5px;
  height: 40px;
  width: ${isMobile ? "100%" : "100%"};
`;

export default EmopickSearchBox;
