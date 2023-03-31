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
import { useRouter } from "next/router";
import { getGenres } from "@/api/book/getGenres";
import { returnGenresType } from "@/types/books";
import GenreList from "@/components/bookTab/MenuTab/GenreList";
import DayList from "@/components/bookTab/MenuTab/DayList";
import SortByGenre from "@/components/bookTab/SortByGenre";
import SortByDay from "@/components/bookTab/SortByDay";
import Waterfall from "@/components/scan/Waterfall/Waterfall";



interface HomeProps {
  highlightedBookData: bookContentType[];
  genres: returnGenresType;
  params: any;
}

export default function Home({
  highlightedBookData,
  genres,
  params,
}: HomeProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const indexWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedGenre, setSelectedGenre] = useState<number>(window.localStorage.getItem('selected_genre') ? Number(window.localStorage.getItem('selected_genre')) : -2);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();

  const [selectedDay, setSelectedDay] = useState<number>(window.localStorage.getItem('selected_day') ? Number(window.localStorage.getItem('selected_day')) : 0);

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

  const selectGenreHandler = (selected: number) => {
    window.localStorage.setItem('selected_genre', String(selected))

    if (selected === -1) {
      window.localStorage.removeItem('inf_fetched_data')
      window.localStorage.removeItem('recent_scroll')
      window.localStorage.removeItem('recent_page')
    }
    
    setSelectedGenre(() => selected);
  };

  const selectDayHandler = (selected: number) => {
    window.localStorage.removeItem('inf_fetched_data')
    window.localStorage.removeItem('recent_scroll')
    window.localStorage.removeItem('recent_page')
    window.localStorage.setItem('selected_day', String(selected))
    setSelectedDay(() => selected);

  };

  const getBooksByGenreAPI = ({
    bookList,
    size,
  }: {
    bookList: bookContentType[];
    size: number;
  }) => {
    const prevId = bookList.length ? bookList[bookList.length - 1].bookId : 0;
    const prevScore = bookList.length
      ? bookList[bookList.length - 1].avgScore
      : 10;
    return getBooksByGenre({
      genreCode: 10,
      typeCode: 0,
      prevId: prevId,
      prevScore: prevScore,
      size: size,
    });
  };


  const highlightedCarouselRender = (
    <>
      <div css={whiteSpace1CSS} />
        <div css={innerLayoutWrapperCSS({ isDeskTop, isTablet, isMobile })}>
          <RowTitle
            beforeLabel="희MD"
            highlightedLabel=" EMOSAAC!"
            noLine={true}
            marginBottom={"45px"}
          />
        </div>

        {/* <Test/> */}
        <Waterfall
            bookData={highlightedBookData}
            identifier={'row-2'}
            rotate={1}
            duration={2000}
          />

        {/* <div css={highlightedCarouselWrapper}>
          <Waterfall
            bookData={highlightedBookData}
            windowWrapperRef={indexWrapperRef}
            angleBottom={1000}
            identifier={'row-2'}
            rotate={1}
            duration={2000}
          />
        </div> */}

      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />
      <div css={whiteSpace2CSS} />

        <div css={highlightedCarouselWrapper}>
          <HighlightedCarousel
            bookData={highlightedBookData}
            windowWrapperRef={indexWrapperRef}
          />
        </div>
      <div css={whiteSpace2CSS} />
    </>
  )


  const bookHomeFetchList = [
    {
      API: getBooksByGenreAPI,
      identifier: 'test1',
      beforeLabel: '너만의',
      highlightedLabel: 'EMOSAAC!',

    }
  ]

  return (
    <div ref={indexWrapperRef} css={indexWrapperCSS}>
      <div css={bannerWrapperCSS} ref={parentRef}>
        <SwipeableGallery parentRef={parentRef} content={postData} />
      </div>

      <GenreList
        genres={genres}
        selected={selectedGenre}
        selectHandler={selectGenreHandler}
      />
      {selectedGenre === -1 && <DayList selected={selectedDay} selectHandler={selectDayHandler}/>}

      {selectedGenre === -2 && highlightedCarouselRender}

      {selectedGenre === -2 && <SortByGenre fetchList={bookHomeFetchList}/>}

      {selectedGenre === -1 && <SortByDay />}
      

      {/* <div css={innerLayoutWrapperCSS({ isDeskTop, isTablet, isMobile })}>
        <RowTitle beforeLabel="너만의" highlightedLabel=" EMOSAAC!" />
        <div css={bookCarouselWrapperCSS}>
          <ScrollableCarousel API={getBooksByGenreAPI} identifier={"test1"} />
        </div>
        <div css={whiteSpace1CSS} />

      </div>

      <img
        src={
          isMobile === true
            ? "/assets/content_banner_mobile.png"
            : "/assets/content_banner_desktop_tablet.png"
        }
        alt={""}
        css={bannerImage}
      /> */}




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

// export const getServerSideProps = async (context: any) => {
//   // const params = await context.params;

//   // 임시 API
//   const data = await getBooksByGenre({genreCode: 10, typeCode: 0, prevId: 0, prevScore: 10, size: 20 })
//     .then((res) => {
//       if (res !== null) {
//         return res.content;
//       }
//     })
//     .catch((err) => {
//       console.log("pages/books/index.tsx => getBooksByGenre", err);
//     });

//   return await {
//     props: {
//       highlightedBookData: data,
//       // params: params.books,
//     },
//   };
// };

export async function getStaticPaths(context: any) {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const paths = [
    { params: { books: "webtoon" } },
    { params: { books: "novel" } },
  ];

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };

  // const params = context.params;
  // console.log(params);

  // return {
  //   // 아래의 코드는 동적 라우팅 주소를 하드코딩 한 것입니다.
  //   // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],

  //   // 아래의 코드는 동적 라우팅 주소 배열을 받아오는 함수를 이용하여 paths에 유효한 주소값을 모두 받아옵니다.
  //   // 자세한 코드는 getAllPostIds.tsx 파일을 참조하도록 합니다.
  //   paths: [{ params: { books: 'webtoon' } }, { params: { books: 'novel' } }],
  //   fallback: false, // true, false 외에도 'blocking'으로 설정할 수 있습니다.
  // };
}

// getStaticPaths는 getStaticProps와 함께 사용하여야 합니다.



export const getStaticProps = async (context: any) => {
  type paramsType = "webtoon" | "novel";
  const params: paramsType = context.params.books;
  const genreTypeCode: { webtoon: number; novel: number } = {
    webtoon: 0,
    novel: 1,
  };

  let genres = null;
  if (params === "webtoon" || params === "novel") {
    genres = await getGenres({ typeCode: genreTypeCode[params] }).then(
      (res) => {
        if (res !== null) {
          return res;
        }
      }
    );
  }

  const highlightedBookData = await getBooksByGenre({
    genreCode: 10,
    typeCode: 0,
    prevId: 0,
    prevScore: 10,
    size: 30,
  })
    .then((res) => {
      if (res !== null) {
        return res.content;
      }
    })
    .catch((err) => {
      console.log("pages/books/index.tsx => getBooksByGenre", err);
    });

  return {
    props: {
      highlightedBookData: highlightedBookData,
      genres: genres,
      params: params,
    },
    revalidate: 86400,
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
  max-width: 100vw;
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
