/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { recvBooks } from "@/api/DummyData";
import { returnSearchHistoryType } from "@/types/search";
import SearchBookCard from "./SearchBookCard";
import ToggleButton from "../Button/ToggleButton";
import { getSearchHistory } from "@/api/search/getSearchHistory";

interface Props {
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchBox = (props: Props) => {
  const [bookData, setBookData] = useState<returnSearchHistoryType[] | null>(
    []
  );
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [tagList, setTagList] = useState([
    "먼치킨",
    "복수",
    "환생",
    "회귀",
    "로판",
  ]);
  function onClickBack() {
    props.setIsSearchBoxOpen(false);
  }
  useEffect(() => {
    getSearchHistory().then((res: any) => setBookData(res));
    // recvBooks(0, 3).then((res: any) => setBookData(() => res));
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
            <h3>최근 조회한 컨텐츠</h3>
            {bookData && (
              <div css={booksWrapCSS({ isDeskTop, isTablet, isMobile })}>
                {bookData.map((book, idx) => (
                  <div css={bookWrapCSS} onClick={onClickBack} key={idx}>
                    <span>웹소설</span>
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
            {!bookData && <div>조회한 컨텐츠가 없습니다.</div>}
          </div>
          <div css={tagSearchCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>태그로 검색하기</h3>
            <div>
              {tagList.map((tag, idx) => (
                <ToggleButton key={idx} text={"#" + tag} isClicked={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        css={boxBackCSS({
          isDeskTop,
          isTablet,
          isMobile,
        })}
        onClick={onClickBack}
      ></div>
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
  z-index: 18;
`;

const searchBoxCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    position: absolute;
    width: 100%;
    ${isDeskTop && "padding: 20px 105px 10px;"}
    ${isTablet && "padding: 20px 50px 10px;"}
    ${isMobile && "padding: 20px 20px 30px;"}
    border-radius: 0 0 10px 10px;
    background-color: var(--back-color-2);
    box-shadow: var(--shadow-color);
    animation: ${visibleCSS("-200px")} 0.3s;
  `;
};

const boxBackCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${isDeskTop && "height: calc(100vh - 70px);"}
    ${isTablet && "height: calc(100vh - 110.8px);"}
    ${isMobile && "height: calc(100vh - 115px);"}
    background-color: #17171b55;
  `;
};

const searchContentWrapCSS = ({
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) => {
  return css`
    ${!isMobile &&
    "display: grid; grid-template-columns: 3fr 1fr; column-gap: 30px;"}
    ${isMobile && "display: block;"}
  `;
};

const recentHistoryCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${!isMobile &&
    "border-right: 1px solid var(--border-color); padding-right:30px;"}
    margin-bottom: 30px;
    & > h3 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    & > div {
      max-width: 700px;
    }
  `;
};

const booksWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    ${!isMobile && "column-gap: 20px;"}
    ${isMobile && "column-gap: 10px;"}
  `;
};

const bookWrapCSS = css`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40px;
  line-height: 40px;
  & > span {
    position: absolute;
    z-index: 10;
    top: 0;
    display: block;
    width: 40px;
    text-align: center;
    font-weight: bold;
    height: 25px;
    line-height: 25px;
    border-radius: 5px 0px 5px 0px;
    background-color: var(--main-color);
    margin-right: 6px;
    font-size: 12px;
  }
`;

const titleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: flex;
    line-height: 40px;
    align-items: center;
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

const tagSearchCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    & > h3 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    & button {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  `;
};

export default SearchBox;
