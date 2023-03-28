/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";

import ridi from "../../../assets/platform_ridi.webp";
import naverSeries from "../../../assets/platform_naver_series.webp";
import naverWebtoon from "../../../assets/platform_naver_webtoon.webp";
import kakaoPage from "../../../assets/platform_kakao_page.png";

import BookCardModal from "@/components/bookCardModal/BookCardModal";
import Portal from "@/components/function/Portal";
import { useRouter } from "next/router"

import { bookContentType } from "@/types/books";

interface BookData {
  title: string;
  img: string;
  platform: string;
}

interface Props {
  bookData?: any;
  showPlatform: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  margin?: string;
}

const BookCard = ({
  bookData,
  showPlatform,
  width,
  height,
  minWidth,
  minHeight,
  margin
}: Props) => {

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(() => navigator.userAgent);
  }, []);

  const isMobile = () => {
    let is_mobile = false;
    if (
      (user !== undefined && user.length > 0 && user.indexOf("iPhone") > -1) ||
      user.indexOf("Android") > -1 ||
      user.indexOf("iPad") > -1 ||
      user.indexOf("iPod") > -1
    ) {
      is_mobile = true;
    }
    return is_mobile;
  };


  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [modalToggler, setModalToggler] = useState<boolean>(false);
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const platformBase = ["https://comic.naver.com/", "https://series.naver.com/", "https://page.kakao.com/", "https://ridibooks.com/"]

 

  const showModal = () => {
    setTimeout(function () {
      setModalToggler(() => true);
    }, 400);
    setIsMouseOn(() => true);
  };

  const hideModal = () => {
    setIsMouseOn(() => false);
    setTimeout(function () {
      setModalToggler(() => false);
    }, 500);
  };

  const instantlyRedirect = () => {
    if (isMobile() === true) {
      // 모바일에서 Detail 페이지로 바로 이동
      router.push(`/books/${bookData.bookId}`)
    }
  };



  

    
  const platformRender = bookData?.href?.split(" ").map((el:any, idx:number) => {
      const findPlatform = (element: string) => {
          if (el.includes(element)) {
              return true
          }
      }
      const result = platformBase.findIndex(findPlatform)
      return (

          <img src={(result === 0 && "/assets/platform_naver_webtoon.webp") || (result === 1 && "/assets/platform_naver_series.webp") || (result === 2 && "/assets/platform_kakao_page.png") || (result === 3 && "/assets/platform_ridi.webp") || ''} css={platformIconCSS} />
    
      )
  })

  const modal = (
    <Portal selector=".overlay-root">
      <BookCardModal
        modalToggler={modalToggler}
        isMouseOn={isMouseOn}
        setModalToggler={setModalToggler}
        bookData={bookData}
        parentRef={wrapperRef}
        imgHeight={height}
        imgMinHeight={minHeight}
      />
    </Portal>
  );

  const platformBar = <div css={platformBarCSS}>{bookData.href && platformRender}</div>;

  return (
    <div
      className={"bookcard-outer-wrapper"}
      css={cardOuterWrapper({ width, height, minWidth, minHeight, margin })}
      ref={wrapperRef}
      onClick={instantlyRedirect}
      onMouseOver={(event) => {
        event.stopPropagation();
        showModal();
      }}
      onMouseLeave={hideModal}
    >
      {user !== null && isMobile() === false && modalToggler && modal}

      <div
        className={"bookcard-inner-wrapper"}
        css={cardInnerWrapperCSS({ width, height, minWidth, minHeight })}
      >
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
  margin: string | undefined;
}

const cardOuterWrapper = ({
  width,
  height,
  minWidth,
  minHeight,
  margin
}: cardOuterWrapperProps) => {
  return css`
    ${margin && `margin: ${margin}`};
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
  `;
};

interface CardInnerWrapperProps {
  width: string | undefined;
  height: string | undefined;
  minWidth: string | undefined;
  minHeight: string | undefined;
}

const cardInnerWrapperCSS = ({
  width,
  height,
  minWidth,
  minHeight,
}: CardInnerWrapperProps) => {
  return css`
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
};

const platformBarCSS = css`
  width: 100%;
  height: 2vw;
  min-height: 32px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  pointer-events: none;

  display: flex;
  align-items: center;
`;

const imageCSS = css`
  width: auto;
  height: 100%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

interface skeletonLoadingTagCSSProps {
  state: boolean;
}

const skeletonLoadingTagCSS = ({ state }: skeletonLoadingTagCSSProps) => {
  return css`
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


const platformIconCSS = css`
    width: 1.3vw;
    min-width: 20px;
    height: auto;
    margin: 10px;
`

export default BookCard;
