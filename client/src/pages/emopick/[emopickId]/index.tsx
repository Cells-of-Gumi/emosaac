/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { getToken } from "@/api/instance";
import { getEmopickDetail } from "@/api/emopick/getEmopickDetail";
import EmopickFloatingButtonToTop from "@/components/emopick/EmopickFloatingButtonToTop";

type emopickReviewType = {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  genre: string;
  regist: string;
  grade: string;
  avgScore: number;
  reveiw: string;
};

type returnEmopickType = {
  data: {
    writerInfo: {
      userId: number;
      nickname: string;
      profileImg: string;
    };
    emopickId: number;
    title: string;
    content: string;
    thumbnails: string;
    emoLike: boolean;
    likeCnt: number;
    bookCnt: number;
    createdDate: string;
    modifiedDate: string;
    webtoon: emopickReviewType[];
    novel: emopickReviewType[];
  };
};

const index = ({ data }: returnEmopickType) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  console.log(data);
  return (
    <div>
      <EmopickFloatingButtonToTop />
      <div css={innerCSS({ isDeskTop, isTablet, isMobile })}>
        <div css={titleCSS({ isDeskTop, isTablet, isMobile })}>
          <h2>{data.title}</h2>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div>작성자 정보</div>
          <div css={likeCSS({ isDeskTop, isTablet, isMobile })}>좋아용</div>
        </div>
        <div css={contentCSS({ isDeskTop, isTablet, isMobile })}></div>
        <div css={columnWrapCSS({ isDeskTop, isTablet, isMobile })}>
          <h3>웹툰</h3>
          <div css={noBookWrapCSS({ isDeskTop, isTablet, isMobile })}></div>
          <div css={bookWrapCSS({ isDeskTop, isTablet, isMobile })}></div>
        </div>
        <div css={columnWrapCSS({ isDeskTop, isTablet, isMobile })}>
          <h3>웹소설</h3>
          <div css={noBookWrapCSS({ isDeskTop, isTablet, isMobile })}></div>
          <div css={bookWrapCSS({ isDeskTop, isTablet, isMobile })}></div>
        </div>
      </div>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
const innerCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  scroll-behavior: smooth;
`;
const titleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css``;
const likeCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css``;
const contentCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css``;
const columnWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css``;
const bookWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css``;
const noBookWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css``;

export const getServerSideProps = async (context: any) => {
  const emopickId = await context.params.emopickId;
  // 토큰 가져오기
  const token = getToken(context.req);
  // console.log(token);

  // 토큰을 getBookDetail 함수에 전달
  const data = await getEmopickDetail({ emopickId: emopickId, token })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log("pages/books/[emopickId].tsx => ", err);
    });

  return await {
    props: {
      data,
    },
  };
};

export default index;
