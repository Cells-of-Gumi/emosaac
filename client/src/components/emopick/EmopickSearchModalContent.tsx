/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import EmopickFloatingButton from "./EmopickFloatingButton";
import FixedModal from "../UI/FixedModal/FixedModal";
import { EmopickSearchBarMobile } from "./EmopickSearchBarMobile";
import { EmopickSearchBar } from "./EmopickSearchBar";
import EmopickSearchBox from "./EmopickSearchBox";
import { getListByContent } from "@/api/search/getSearchBooksByContent";

// {width?: string, height?: string, content: any, modalState: any, stateHandler: any, overflow?: string, forced?: boolean, blur?: boolean, isDarkMode?: boolean}

interface Props {
  bookList?:
    | {
        title: string;
        bookId: number;
        typeCd: number;
        review: string;
        thumbnail: string;
      }[]
    | [];
  setBookList?: Dispatch<
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
  selectedBookList: any[] | [];
  setSelectedBookList: Dispatch<SetStateAction<any[] | []>>;
}

const EmopickSearchModalContent = ({
  bookList,
  setBookList,
  selectedBookList,
  setSelectedBookList,
}: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // 검색 관련
  const [books, setBooks] = useState<any>([]);
  const [prevId, setPrevId] = useState(0);
  const [prevScore, setPrevScore] = useState(10);
  const [isPageEnd, setIsPageEnd] = useState(false);
  function getSearchBooks(prevId: number, prevScore: number) {
    const type = "total";
    const content = searchInput;
    const size = 11;
    const token = localStorage.getItem("access_token");
    getListByContent({ type, content, prevId, prevScore, size, token }).then(
      (res) => {
        if (res !== null && res?.length !== 0) {
          setBooks((prev: any) => [...prev, ...res]);
          const prevData = res.slice(-1)[0];
          setPrevId(prevData.bookId);
          setPrevScore(prevData.avgScore);
        } else {
          // setIsPageEnd(true);
        }
      }
    );
  }
  useEffect(() => {
    setIsPageEnd(false);
    if (searchInput && searchInput.length > 0) {
      getSearchBooks(0, 10);
    }
  }, [searchInput]);

  return (
    <div>
      <h3 css={headlineCSS({ isDeskTop, isTablet, isMobile })}>
        작품 검색하기
      </h3>
      {isMobile ? (
        <EmopickSearchBarMobile
          setIsSearchBoxOpen={setIsSearchBoxOpen}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSelectedBookList={setSelectedBookList}
          setBooks={setBooks}
        />
      ) : (
        <EmopickSearchBar
          setIsSearchBoxOpen={setIsSearchBoxOpen}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSelectedBookList={setSelectedBookList}
          setBooks={setBooks}
        />
      )}
      {isSearchBoxOpen && (
        <EmopickSearchBox
          selectedBookList={selectedBookList}
          setSelectedBookList={setSelectedBookList}
          setIsSearchBoxOpen={setIsSearchBoxOpen}
          books={books}
          type={"total"}
          getSearchBooks={getSearchBooks}
          prevId={prevId}
          prevScore={prevScore}
          isPageEnd={isPageEnd}
          bookList={bookList}
        />
      )}
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const headlineCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  font-size: ${isDeskTop ? "20px" : isTablet ? "17px" : "14px"};
  font-weight: bold;
  height: ${isDeskTop ? "40px" : isTablet ? "30px" : "20px"};
  margin: ${isMobile ? "0 20px" : "0"};
`;

export default EmopickSearchModalContent;
