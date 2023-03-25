/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";
import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";
import SwipeableGallery from "@/components/UI/SwipeableCarousel/SwipeableGallery";
import { recvBooks } from "@/api/DummyData";
// import banner1 from "../../assets/temp_banner_1.png";
// import banner2 from "../../assets/temp_banner_2.png";
import Image from "next/image";
import HighlightedCarousel from "@/components/bookTab/HighlightedCarousel/HighlightedCarousel";
import RowTitle from "@/components/bookTab/RowTitle/RowTitle";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
// import contentBannerDesktop from "/assets/content_banner_desktop_tablet.png"
// import contentBannerMobile from "/assets/content_banner_mobile.png"
import { getBooksByGenre } from "@/api/book/getBooksByGenre";
import { bookContentType } from "@/types/books";

interface HomeProps {
  highlightedBookData: bookContentType[]
}

export default function Home({highlightedBookData}: HomeProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const indexWrapperRef = useRef<HTMLDivElement>(null);

  const [isDeskTop, isTablet, isMobile] = useIsResponsive();

  // ________________________________________________________________________________________________
  // 임시 데이터
  const postData = {
    content: [
      <img src={"/assets/temp_banner_1.png"} alt={""} css={bannerImage} />,
      <img src={"/assets/temp_banner_2.png"} alt={""} css={bannerImage} />,
    ],
  };

  // const getBookData = recvBooks(0, 20).then((res: any) =>
  //   setBookData(() => res)
  // );
  const [bookData, setBookData] = useState<object[]>([]);


  // ________________________________________________________________________________________________


  

  const getBooksByGenreAPI = ({bookList, size}: {bookList: bookContentType[]; size: number}) => {
    const prevId = bookList.length ? bookList[bookList.length - 1].bookId : 0
    const prevScore = bookList.length ? bookList[bookList.length - 1].score : 10
    return getBooksByGenre({genreCode: 10, typeCode: 0, prevId: prevId, prevScore: prevScore, size: size })
  }

  return (
    <div ref={indexWrapperRef} css={indexWrapperCSS}>
      <div css={bannerWrapperCSS} ref={parentRef}>
        <SwipeableGallery parentRef={parentRef} content={postData} />
      </div>

      <div css={whiteSpace1CSS} />
      <div css={innerLayoutWrapperCSS({ isDeskTop, isTablet, isMobile })}>
        <RowTitle
          beforeLabel="희MD"
          highlightedLabel=" EMOSAAC!"
          noLine={true}
          marginBottom={"45px"}
        />
      </div>

      <div css={highlightedCarouselWrapper}>
        <HighlightedCarousel bookData={highlightedBookData} windowWrapperRef={indexWrapperRef} />
      </div>
      <div css={whiteSpace2CSS} />

      <div css={innerLayoutWrapperCSS({ isDeskTop, isTablet, isMobile })}>
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={getBooksByGenreAPI} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
        {/* <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} /> */}
      </div>

      <img
        src={
          isMobile === true
            ? "/assets/content_banner_mobile.png"
            : "/assets/content_banner_desktop_tablet.png"
        }
        alt={""}
        css={bannerImage}
      />

      {/* <div css={innerLayoutWrapperCSS({ isDeskTop, isTablet, isMobile })}>
        <div css={whiteSpace1CSS} />
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={recvBooks} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />
      </div> */}


    </div>
  );
}


export const getServerSideProps = async (context: any) => {
  // 임시 API
  const data = await getBooksByGenre({genreCode: 10, typeCode: 0, prevId: 0, prevScore: 10, size: 20 })
    .then((res) => {
      if (res !== null) {
        return res.content;
      }
    })
    .catch((err) => {
      console.log("pages/books/index.tsx => getBooksByGenre", err);
    });

  return await {
    props: {
      highlightedBookData: data,
    },
  };
};

const indexWrapperCSS = css`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const bannerImage = css`
  width: 100%;
  height: auto;
`;

const whiteSpace1CSS = css`
  width: 100%;
  height: 5vw;
  min-height: 48px;
`;

const whiteSpace2CSS = css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;

const bannerWrapperCSS = css`
  width: 100%;
  overflow: hidden;
`;

const highlightedCarouselWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const bookCarouselWrapperCSS = css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;

interface innerLayoutWrapperCSSProps {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const innerLayoutWrapperCSS = ({
  isDeskTop,
  isTablet,
  isMobile,
}: innerLayoutWrapperCSSProps) => {
  const whiteSpace = (isDeskTop && 210) || (isTablet && 100) || (isMobile && 0);
  return css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `;
};
