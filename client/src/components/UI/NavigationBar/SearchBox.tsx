/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useRouter } from "next/router";
import { returnSearchHistoryType } from "@/types/search";
import SearchBookCard from "./SearchBookCard";
import ToggleButton from "../Button/ToggleButton";
import { getSearchHistory } from "@/api/search/getSearchHistory";
import { getBookDetail } from "@/api/book/getBookDetail";
import { BasicButton } from "./BasicButton";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

interface Props {
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchBox = (props: Props) => {
  const router = useRouter();
  const [bookData, setBookData] = useState<returnSearchHistoryType[] | null>(
    []
  );
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isLogin, setIsLogin] = useState(false);
  const [tagList, setTagList] = useState<string[]>([]);
  function onClickBack() {
    props.setIsSearchBoxOpen(false);
  }
  function onClickTagToggle(tag: string) {
    props.setIsSearchBoxOpen(false);
    router.push({
      pathname: `/search/tagname`,
      query: {
        type: "total",
        query: tag,
      },
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    getSearchHistory({ token }).then((res: any) => setBookData(res));
  }, []);

  useEffect(() => {
    if (bookData && bookData.length !== 0) {
      setTagList([]);
      bookData.slice(0, 3).forEach((book) => {
        getBookDetail({ bookId: String(book.bookId) }).then((res) => {
          if (res !== null) {
            setTagList((prev) => [...prev, ...res.tag.split(" ")]);
          }
        });
      });
    } else {
      setTagList(["먼치킨", "복수", "환생", "회귀", "로판"]);
    }
  }, [bookData]);

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
            {!bookData ? (
              isLogin ? (
                <div css={noHistoryCSS({ isDeskTop, isTablet, isMobile })}>
                  <div>조회한 컨텐츠가 없습니다.</div>
                </div>
              ) : (
                <div css={noHistoryCSS({ isDeskTop, isTablet, isMobile })}>
                  <div>로그인이 필요한 서비스입니다.</div>
                  <BasicButton setIsSearchBoxOpen={props.setIsSearchBoxOpen} />
                </div>
              )
            ) : null}
          </div>
          <div css={tagSearchCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>태그로 검색하기</h3>
            <div>
              {[...new Set(tagList)].map((tag, idx) => {
                if (tag !== "") {
                  return (
                    <ToggleButton
                      key={idx}
                      text={"#" + tag}
                      isClicked={false}
                      onClick={() => onClickTagToggle(tag)}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div
            css={flipCSS({ isDeskTop, isTablet, isMobile })}
            onClick={onClickBack}
          >
            접기 <MdOutlineKeyboardDoubleArrowUp size={20} />
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
    ${isDeskTop && "padding: 20px 105px 50px;"}
    ${isTablet && "padding: 20px 50px 50px;"}
    ${isMobile && "padding: 20px 20px 50px;"}
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
    ${isDeskTop &&
    "display: grid; grid-template-columns: 3fr 1fr; column-gap: 30px;"}
    ${!isDeskTop && "display: block;"}
  `;
};

const recentHistoryCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${isDeskTop &&
    "border-right: 1px solid var(--border-color); padding-right:30px;"}
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

const noHistoryCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: grid;
    line-height: 50px;
    ${isDeskTop &&
    "height: 150px; grid-template-columns: 200px; grid-template-rows: 60px 30px; "}
    ${!isDeskTop &&
    "height: 100px; row-gap: 10px; grid-template-rows: 50px 30px; row-gap: 10px;"}
    /* background-color: antiquewhite; */
    & > div {
      ${!isDeskTop && "text-align: center;"}
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
    /* background-color: antiquewhite; */
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
