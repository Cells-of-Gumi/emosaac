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
import { IoCloseOutline } from "react-icons/io5";
// {width?: string, height?: string, content: any, modalState: any, stateHandler: any, overflow?: string, forced?: boolean, blur?: boolean, isDarkMode?: boolean}

interface Props {
  bookList?: {
    title: string;
    bookId: number;
    typeCd: number;
    review: string;
    thumbnail: string;
  }[];
  setBookList: Dispatch<
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
  selectedBookList:
    | {
        title: string;
        bookId: number;
        typeCd: number;
        review: string;
        thumbnail: string;
      }[]
    | [];
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
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const EmopickSearchModalContent = ({
  bookList,
  setBookList,
  selectedBookList,
  setSelectedBookList,
  setIsModalOpen,
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
  function onClickClose() {
    setIsModalOpen(false);
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
      <div css={searchBarCSS({ isDeskTop, isTablet, isMobile })}>
        <button onClick={onClickClose}>
          <IoCloseOutline size={isMobile ? 20 : 24} />
        </button>
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
      </div>

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
        searchInput={searchInput}
        setBookList={setBookList}
        setIsModalOpen={setIsModalOpen}
      />
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

const searchBarCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  position: relative;
  & > button {
    cursor: pointer;
    position: absolute;
    z-index: 30;
    right: ${isMobile ? "20px" : "0px"};
    background-color: var(--back-color-2);
    top: 2px;
    height: 41px;
    width: 45px;
    border-radius: 5px;
  }
`;
export default EmopickSearchModalContent;
