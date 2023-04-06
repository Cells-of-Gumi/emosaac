/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { getToken } from "@/api/instance";
import Link from "next/link";
import { getEmopickDetail } from "@/api/emopick/getEmopickDetail";
import EmopickFloatingButtonToTop from "@/components/emopick/EmopickFloatingButtonToTop";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import {
  MdCookie,
  MdOutlineCookie,
  MdOutlinePersonOutline,
  MdPerson,
} from "react-icons/md";
import {
  RiBookReadFill,
  RiBookReadLine,
  RiPlayCircleFill,
  RiPlayCircleLine,
  RiArrowLeftSLine,
  RiLogoutBoxRLine,
  RiLoginBoxLine,
} from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

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
  review: string;
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
        <div
          css={[
            titleCSS({ isDeskTop, isTablet, isMobile }),
            css`
              background-image: url(${data.thumbnails?.split(" ")[0]});
            `,
          ]}
        >
          <img src={data.writerInfo.profileImg} alt="profileImage" />
          <h2>{data.title}</h2>
          <div css={writerCSS({ isDeskTop, isTablet, isMobile })}>
            <img src={data.writerInfo.profileImg} alt="profileImage" />
            {data.writerInfo.nickname}
          </div>
          <div>
            <span>
              <AiFillHeart /> {data.likeCnt}개 · 등록일 : {data.modifiedDate}
            </span>
          </div>
          <div>
            총 {data.bookCnt}개 : 웸툰 {data.webtoon.length} · 웹소설{" "}
            {data.novel.length}
          </div>
          <div css={titleButtonCSS({ isDeskTop, isTablet, isMobile })}>
            <button>댓글</button>
            <button>좋아요</button>
            <button>수정</button>
          </div>
        </div>
        <div>gg</div>
        <div css={sectionCSS({ isDeskTop, isTablet, isMobile })}>
          <div css={contentCSS({ isDeskTop, isTablet, isMobile })}>
            <RiDoubleQuotesL />
            {data.content}
            <RiDoubleQuotesR />
          </div>
          <div css={columnWrapCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>
              <div>
                <MdOutlineCookie />
                웹툰<span>총 {data.webtoon.length}개</span>
              </div>
            </h3>
            <div css={noBookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              추천한 웹툰이 없습니다
            </div>
            <div css={bookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              {/* 여기부턴 맵으로 돌린다 */}
              {data.webtoon.map((book, idx) => (
                <div key={idx}>
                  <div>
                    <div>{book.title}</div>
                    <div>
                      <img src={book.thumbnail} alt={book.title} />
                      <div>
                        {/* 웹툰 정보 */}
                        <div>
                          {book.genre} · {book.regist.slice(0, 4)} ·{" "}
                          {book.author}
                        </div>
                        <div>{book.avgScore}</div>
                        <button>
                          <Link href={`/books/${book.bookId}`} replace>
                            이모작에서 보기
                          </Link>
                        </button>
                        <div>
                          {/* 디테일에서 가져오자 */}
                          웹툰 사이트에서 보기{book.platform}
                          {book.href}
                        </div>
                      </div>
                    </div>
                    <div>{book.review}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div css={columnWrapCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>
              <div>
                <RiBookReadLine /> 웹소설<span>총 {data.novel.length}개</span>
              </div>
              <RiArrowLeftSLine />
            </h3>
            <div css={noBookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              추천한 웹소설이 없습니다
            </div>
            <div css={bookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              {/* 여기부턴 맵으로 돌린다 */}
              {data.novel.map((book, idx) => (
                <div key={idx}>
                  <div>
                    <div>{book.title}</div>
                    <div>
                      <img src={book.thumbnail} alt={book.title} />
                      <div>
                        {/* 웹소설 정보 */}
                        <div>
                          {book.genre} · {book.regist} · {book.author}
                        </div>
                        <div>{book.avgScore}</div>
                        <button>이모작에서 보기{book.bookId}</button>
                        <button>
                          웹툰 사이트로 가기{book.platform}
                          {book.href}
                        </button>
                      </div>
                    </div>
                    <div>{book.review}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
  position: relative;
  scroll-behavior: smooth;
  padding: ${isDeskTop ? "20px 105px" : isTablet ? "15px 50px" : "10px 20px"};
  display: grid;
  grid-template-columns: ${isDeskTop
    ? "1fr 2.5fr"
    : isTablet
    ? "1fr 3fr"
    : "1fr"};
`;
const titleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  background-color: red;
  position: fixed;
  top: ${isDeskTop ? "20px" : isTablet ? "16px" : "10px"};
  & > img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
  }
  & > h2 {
    font-size: ${isDeskTop ? "30px" : isTablet ? "24px" : "18px"};
  }
  & > * {
    margin: auto 0;
  }
`;
const writerCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  display: flex;
  justify-content: left;
  align-items: center;
  height: ${isDeskTop ? "30px" : isTablet ? "24px" : "18px"};
  & > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: center center;
  }
`;
const titleButtonCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css``;
const sectionCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css``;
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
