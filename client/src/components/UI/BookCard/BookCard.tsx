/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useEffect, useMemo } from "react";
import BookCardModal from "@/components/bookCardModal/BookCardModal";
import Portal from "@/components/function/Portal";
import { useRouter } from "next/router";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { bookContentType } from "@/types/books";
import { throttle, debounce } from "lodash";
import Image from "next/image";

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
  hideType?: boolean;
}

const BookCard = ({
  bookData,
  showPlatform,
  width,
  height,
  minWidth,
  minHeight,
  margin,
  hideType,
}: Props) => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setUser(() => navigator.userAgent);
  }, []);
  const [isD, isT, isM] = useIsResponsive();

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

  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [modalToggler, setModalToggler] = useState<boolean>(false);
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)
  
  const platformBase = [
    "https://comic.naver.com/",
    "https://series.naver.com/",
    "https://page.kakao.com/",
    "https://ridibooks.com/",
  ];

  const showModal = () => {
    // setTimeout(function () {
      
    // }, 10);
    setModalToggler(() => true);
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
      router.push(`/books/${bookData.bookId}`);
    }
  };

  const platformRender = bookData?.href
    ?.split(" ")
    .map((el: any, idx: number) => {
      const findPlatform = (element: string) => {
        if (el.includes(element)) {
          return true;
        }
      };
      const result = platformBase.findIndex(findPlatform);
      return (
        <img
          key={`BookCard-${bookData.bookId}-platform-${result}`}
          src={
            (result === 0 && "/assets/platform_naver_webtoon.webp") ||
            (result === 1 && "/assets/platform_naver_series.webp") ||
            (result === 2 && "/assets/platform_kakao_page.png") ||
            (result === 3 && "/assets/platform_ridi.webp") ||
            ""
          }
          css={platformIconCSS}
        />
      );
    });

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

  const platformBar = (
    <div css={platformBarCSS}>{bookData.href && platformRender}</div>
  );



  const [isMouseOnStart, setIsMouseOnStart] = useState<boolean>(false)

  const call = useMemo(() => debounce((toggle) => {
    if (toggle === true) {
      showModal()
    } else {
      hideModal()
    }
  }, 250), []);

  return (
    <div
      className={"bookcard-outer-wrapper"}
      css={cardOuterWrapper({ width, height, minWidth, minHeight, margin })}
      ref={wrapperRef}
      onClick={instantlyRedirect}
 
      onMouseMove={() => {call(true)}}
      onMouseEnter={() => {call(true)}}
      onWheel={() => {call(false);}}
      onMouseLeave={() => {call(false); hideModal(); setIsMouseOnStart(() => false)}}
    >
      {user !== null && isMobile() === false && modalToggler && modal}
      {hideType !== true && <div css={typeCdWrapCSS(bookData.typeCd === 0, isD)}>
        {bookData && bookData.typeCd === 0 ? "웹툰" : "웹소설"}
      </div>}
      <div
        className={"bookcard-inner-wrapper"}
        css={cardInnerWrapperCSS({ width, height, minWidth, minHeight })}
      >
        <div
          css={skeletonLoadingTagCSS({
            state:  loading === false ? true : false,
          })}
        />
        <Image
          className={"img"}
          width={200}
          height={300}
          src={bookData && bookData.thumbnail}
          alt={bookData && bookData.title}
          css={imageCSS}
          onLoad={() => {setLoading(() => false)}}
        />
        {showPlatform && loading === false && platformBar}
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
  margin,
}: cardOuterWrapperProps) => {
  return css`
    ${margin && `margin: ${margin}`};
    position: relative;
    width: ${width !== undefined ? width : "100%"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    content-visibility: auto;
  `;
};

const typeCdWrapCSS = (isWebtoon: boolean, isD: boolean) => css`
  position: absolute;
  z-index: 10;
  top: 0;
  display: block;
  margin-right: 6px;
  text-align: center;
  font-weight: bold;
  padding: ${isD ? "0 10px" : "0 6px"};
  height: ${isD ? "32px" : "25px"};
  line-height: ${isD ? "32px" : "25px"};
  font-size: ${isD ? "14px" : "12px"};
  border-radius: 9px 0px 9px 0px;
  background-color: ${!isWebtoon ? "#fff" : "var(--main-color)"};
  color: ${isWebtoon ? "#fff" : "var(--main-color)"};
`;

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
  width: 100%;
  height: 100%;
  object-fit: cover;
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
`;

export default BookCard;
