/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import ridi from "../../../assets/platform_ridi.webp";
import naverSeries from "../../../assets/platform_naver_series.webp";
import naverWebtoon from "../../../assets/platform_naver_webtoon.webp";
import kakaoPage from "../../../assets/platform_kakao_page.png";
import Portal from "@/components/function/Portal";

import { BsCheck2Circle } from "react-icons/bs";
interface BookData {
  title: string;
  thumbnail: string;
  platform: string;
}

interface Props {
  bookData?: any;
  title?: string;
  showPlatform: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  selectedBookList: {
    title: string;
    bookId: number;
    typeCd: number;
    review: string;
    thumbnail: string;
  }[];
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
  bookList?: {
    title: string;
    bookId: number;
    typeCd: number;
    review: string;
    thumbnail: string;
  }[];
  selectedBookIdList: number[];
}

const EmopickSearchBookCard = ({
  bookData,
  showPlatform,
  width,
  height,
  minWidth,
  minHeight,
  selectedBookList,
  setSelectedBookList,
  bookList,
  selectedBookIdList,
}: Props) => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [user, setUser] = useState<any>(null);
  // let user: any = null;
  useEffect(() => {
    setUser(() => navigator.userAgent);
  }, []);
  type bookType = {
    title: string;
    bookId: number;
    typeCd: number;
    review: string;
    thumbnail: string;
  };
  const wrapperRef = useRef<HTMLInputElement>(null);
  const [modalToggler, setModalToggler] = useState<boolean>(false);
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const platformBar = <div css={platformBarCSS}></div>;
  const [bookObj, setBookObj] = useState<bookType | null>(null);
  function findBook(book: any) {
    return book.bookId === bookData.bookId;
  }

  useEffect(() => {
    bookObj && setSelectedBookList((prev) => [...prev, bookObj]);
  }, [bookObj]);
  return (
    <div
      className={"bookcard-outer-wrapper"}
      css={cardOuterWrapper({ width, height, minWidth, minHeight })}
      ref={wrapperRef}
      onMouseOver={(event) => {
        event.stopPropagation();
      }}
    >
      <div
        className={"bookcard-inner-wrapper"}
        css={cardInnerWrapperCSS(
          { width, height, minWidth, minHeight },
          selectedBookIdList.includes(bookData.bookId)
        )}
      >
        <div>
          <BsCheck2Circle size={isMobile ? 20 : 24} />
          선택 완료
        </div>
        <div
          css={skeletonLoadingTagCSS({
            state: bookData !== "LOADING" ? true : false,
          })}
        />
        <img
          className={"img"}
          src={bookData && bookData.thumbnail}
          alt={bookData && bookData.title}
          css={imageCSS}
        />
        {showPlatform && bookData !== "LOADING" && platformBar}
      </div>
    </div>
  );
};

interface cardOuterWrapperProps {
  width: string | undefined;
  height: string | undefined;
  minWidth: string | undefined;
  minHeight: string | undefined;
}

const cardOuterWrapper = ({
  width,
  height,
  minWidth,
  minHeight,
}: cardOuterWrapperProps) => {
  return css`
    cursor: pointer;
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    box-shadow: var(--shadow-color);
    overflow: hidden;
    border-radius: 10px;
  `;
};

interface CardInnerWrapperProps {
  width: string | undefined;
  height: string | undefined;
  minWidth: string | undefined;
  minHeight: string | undefined;
}

const cardInnerWrapperCSS = (
  { width, height, minWidth, minHeight }: CardInnerWrapperProps,
  isInclueded: boolean
) => {
  return css`
    position: relative;
    /* width: ${width !== undefined ? width : "auto"}; */
    width: 100%;
    /* height: ${height !== undefined ? height : "100%"}; */
    height: 100%;
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > div:nth-of-type(1) {
      visibility: ${isInclueded ? "visible" : "hidden"};
      opacity: ${isInclueded ? "1" : "0"};
      border-radius: 9px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 10;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      color: var(--main-color);
      font-weight: bold;
      overflow: hidden;
      border: 5px solid var(--main-color);
      /* box-shadow: inset 0px 0px 0px 10px var(--main-color); */
    }
  `;
};

const platformBarCSS = css`
  width: 100%;
  height: 3vw;
  min-height: 36px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  pointer-events: none;
`;

const imageCSS = css`
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
  }
`;

interface skeletonLoadingTagCSSProps {
  state: boolean;
}

const skeletonLoadingTagCSS = ({ state }: skeletonLoadingTagCSSProps) => {
  return css`
    position: absolute;
    width: 100%;
    height: 100%;
    transition-property: opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: rgb(200, 200, 200);
    position: absolute;
    opacity: ${state ? "0" : "255"};
    pointer-events: none;
  `;
};

export default EmopickSearchBookCard;
