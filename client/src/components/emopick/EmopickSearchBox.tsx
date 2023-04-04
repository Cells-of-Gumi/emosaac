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
import SearchBookCard from "../UI/NavigationBar/SearchBookCard";
import ToggleButton from "../UI/Button/ToggleButton";
import { getSearchHistory } from "@/api/search/getSearchHistory";
import { getBookDetail } from "@/api/book/getBookDetail";
import { BasicButton } from "../UI/NavigationBar/BasicButton";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { returnSearchBooksType } from "@/types/search";
import { throttle } from "lodash";

interface Props {
  setSelectedBookList: Dispatch<SetStateAction<any[]>>;
  selectedBookList: any[];
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
  books: returnSearchBooksType[];
  type: string;
  getSearchBooks: Function;
  prevId: number;
  prevScore: number;
  isPageEnd: boolean;
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
}: Props) => {
  const router = useRouter();
  const [bookData, setBookData] = useState<returnSearchHistoryType[] | null>(
    []
  );
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const booksWrapRef = useRef<HTMLDivElement>(null);
  const [getBooks, setGetBooks] = useState<boolean>(false);
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
  function onClickBack() {
    setIsSearchBoxOpen(false);
  }
  useEffect(() => {
    if (getBooks === true) {
      setGetBooks(() => false);
      getSearchBooks(prevId, prevScore);
    }
  }, [getBooks]);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    getSearchHistory({ token }).then((res: any) => setBookData(res));
  }, []);

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
              <div css={booksWrapCSS({ isDeskTop, isTablet, isMobile })}>
                {bookData.map((book, idx) => (
                  <div
                    css={bookWrapCSS(book.typeCd === 0)}
                    onClick={onClickBack}
                    key={idx}
                  >
                    <span>{book && book.typeCd === 0 ? "웹툰" : "웹소설"}</span>
                    <SearchBookCard
                      bookData={book}
                      showPlatform={false}
                      width={"100%"}
                      // height={isMobile ? "150px" : "200px"}
                    />
                    <div css={titleCSS({ isDeskTop, isTablet, isMobile })}>
                      <div>{book.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            css={flipCSS({ isDeskTop, isTablet, isMobile })}
            onClick={onClickBack}
          >
            접기 <MdOutlineKeyboardDoubleArrowUp size={20} />
          </div>
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
    padding: ${isMobile ? "20px 20px 10px" : "20px 50px 4px"};
    border-radius: 0 0 10px 10px;
    background-color: var(--back-color-2);
    box-shadow: var(--shadow-color);
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
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    & > div {
      ${isDeskTop && "max-width: 700px;"}
      ${!isDeskTop && "max-width: 600px;"}
    }
  `;
};

const booksWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    ${isDeskTop && "column-gap: 20px;"}
    ${!isDeskTop && "column-gap: 10px;"}
    overflow-x: scroll;
  `;
};

const bookWrapCSS = (isWebtoon: boolean) => css`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40px;
  line-height: 40px;
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

export default EmopickSearchBox;
