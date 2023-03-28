/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { getListByContent } from "@/api/search/getSearchBooksByContent";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import BookCardSearch from "@/components/UI/BookCard/BookCardSearch";
import { SearchListView } from "@/components/search/SearchListView";
import ToggleButton from "@/components/UI/Button/ToggleButton";
import batchim from "@/components/search/batchim";
import { createDefaultInstance, getToken } from "@/api/instance";

interface Book {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  score: number;
}

const content = ({ type, content, data }: any) => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [typeList, setTypeList] = useState([false, false, false]);
  const [books, setBooks] = useState<any>([]);
  const [prevId, setPrevId] = useState(0);
  const [prevScore, setPrevScore] = useState(10);
  const [isPageEnd, setIsPageEnd] = useState(data === null);
  const booksWrapRef = useRef<HTMLDivElement>(null);
  const josa = batchim(content);

  function onClickType(type: string) {
    switch (type) {
      case "total":
        setTypeList([true, false, false]);
        break;
      case "webtoon":
        setTypeList([false, true, false]);
        break;
      default:
        setTypeList([false, false, true]);
    }
    setIsPageEnd(false);
    router.push({
      pathname: `/search/content`,
      query: {
        type: type,
        query: content,
      },
    });
  }

  function getSearchBooks(prevId: number, prevScore: number) {
    const size = 14;
    const token = localStorage.getItem("access_token");
    getListByContent({ type, content, prevId, prevScore, size, token }).then(
      (res) => {
        if (res !== null && res?.length !== 0) {
          setBooks((prev: any) => [...prev, ...res]);
          const prevData = res.slice(-1)[0];
          setPrevId(prevData.bookId);
          setPrevScore(prevData.score);
        } else {
          setIsPageEnd(true);
        }
      }
    );
  }

  useEffect(() => {
    switch (type) {
      case "total":
        setTypeList([true, false, false]);
        break;
      case "webtoon":
        setTypeList([false, true, false]);
        break;
      default:
        setTypeList([false, false, true]);
    }
  }, [type]);

  useEffect(() => {
    if (data) {
      setBooks(data);
      const prevData = data.slice(-1)[0];
      setPrevId(prevData?.bookId);
      setPrevScore(prevData?.score);
    }
  }, [data]);

  useEffect(() => {
    if (books !== null && books.length !== 0) {
      const prevData = books.slice(-1)[0];
      if (prevData !== null) {
        setPrevId(prevData?.bookId);
        setPrevScore(prevData?.score);
      }
    }
  }, [books]);

  return (
    <div>
      <h2
        css={[innerPaddingCSS({ isDeskTop, isTablet, isMobile }), headline2CSS]}
      >
        검색 결과
      </h2>
      <div
        css={[
          innerPaddingCSS({ isDeskTop, isTablet, isMobile }),
          searchResCSS({ isDeskTop, isTablet, isMobile }),
        ]}
      >
        <div css={searchContentCSS}>
          "{content}"<span css={josaCSS}>{josa} 포함된 컨텐츠</span>
        </div>
        <div css={toggleWrapCSS}>
          <ToggleButton
            text={"전체"}
            isClicked={typeList[0]}
            onClick={() => onClickType("total")}
          />
          <ToggleButton
            text={"웹툰"}
            isClicked={typeList[1]}
            onClick={() => onClickType("webtoon")}
          />
          <ToggleButton
            text={"웹소설"}
            isClicked={typeList[2]}
            onClick={() => onClickType("novel")}
          />
        </div>
      </div>

      <div css={innerCSS({ isDeskTop, isTablet, isMobile })} ref={booksWrapRef}>
        <SearchListView
          books={books}
          type={type}
          getSearchBooks={getSearchBooks}
          booksWrapRef={booksWrapRef}
          prevId={prevId}
          prevScore={prevScore}
          isPageEnd={isPageEnd}
        />
      </div>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const headline2CSS = css`
  padding-top: 40px;
  font-weight: bold;
`;

const innerCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${isDeskTop && "margin: 20px 105px"}
    ${isTablet && "margin: 20px 50px"}
      ${isMobile && "margin: 20px 20px"}
  `;
};

const innerPaddingCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${isDeskTop && "padding: 20px 105px"}
    ${isTablet && "padding: 20px 50px"}
      ${isMobile && "padding: 20px 20px"}
  `;
};

const searchResCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    ${!isMobile &&
    "display: flex; justify-content: space-between; align-items: center;"}
    ${isMobile && "display: block;"}
    font-size: 34px;
    background-color: var(--back-color-2);
    padding-top: 20px;
    padding-bottom: 20px;
  `;
};

const searchContentCSS = css`
  height: 70px;
  display: flex;
  align-items: center;
`;

const josaCSS = css`
  font-size: 20px;
`;

const toggleWrapCSS = css`
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  & > button {
    margin-left: 8px;
  }
`;

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

export const getServerSideProps = async (context: any) => {
  const type = context.query.type;
  const content = context.query.query;
  const [prevId, prevScore, size] = [0, 10, 14];
  if (typeof type == "string" && typeof content == "string") {
    const token = getToken(context.req);
    const data = await getListByContent({
      type,
      content,
      prevId,
      prevScore,
      size,
      token,
    }).then((res) => {
      return res;
    });
    return await {
      props: {
        type,
        content,
        data,
      },
    };
  } else {
    return { props: {} };
  }
};

export default content;
