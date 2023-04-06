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
import {
  BookmarkToggle,
  HasBeenReadToggle,
  CommentBtn,
} from "@/components/bookDetail/icons";
import { BsChatSquareDotsFill, BsThreeDotsVertical } from "react-icons/bs";
import StarRating from "@/components/bookDetail/StarRating";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <EmopickFloatingButtonToTop />
      <div css={innerCSS({ isDeskTop, isTablet, isMobile })}>
        <div
          css={titleCSS(
            { isDeskTop, isTablet, isMobile },
            data.writerInfo.profileImg
          )}
        >
          <img src={data.writerInfo.profileImg} alt="profileImage" />
          <h2>{data.title}</h2>
          <div css={writerCSS({ isDeskTop, isTablet, isMobile })}>
            {/* <img src={data.writerInfo.profileImg} alt="profileImage" /> */}
            {data.writerInfo.nickname}
          </div>
          <span>
            <AiFillHeart /> {data.likeCnt}
            {data.createdDate}
          </span>
          <span>
            웹툰 {data.webtoon.length} · 웹소설 {data.novel.length}
          </span>
          <div css={titleButtonCSS({ isDeskTop, isTablet, isMobile })}>
            <button>
              <BsChatSquareDotsFill size={28} />
            </button>
            <button>
              <AiOutlineHeart size={28} />
            </button>
            <button>
              <BsThreeDotsVertical size={28} />
              <div>
                <Link href={`/emopick/${router.query.emopickId}/update`}>
                  <div>수정</div>
                </Link>
                <Link href={`/emopick/${router.query.emopickId}/delete`}>
                  <div>삭제</div>
                </Link>
              </div>
            </button>
          </div>
        </div>
        <div></div>
        <div css={sectionCSS({ isDeskTop, isTablet, isMobile })}>
          <div css={contentCSS({ isDeskTop, isTablet, isMobile })}>
            <RiDoubleQuotesL size={34} />
            {data.content}
            <RiDoubleQuotesR size={34} />
          </div>
          <div css={columnWrapCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>
              <MdOutlineCookie size={24} />
              웹툰<span>총 {data.webtoon.length}개</span>
            </h3>
            <div css={noBookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              추천한 웹툰이 없습니다
            </div>
            <div css={bookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              {/* 여기부턴 맵으로 돌린다 */}
              {data.webtoon.map((book, idx) => (
                <div
                  key={idx}
                  css={emopickCSS({ isDeskTop, isTablet, isMobile })}
                >
                  <div>
                    <div css={bookTitleCSS({ isDeskTop, isTablet, isMobile })}>
                      <span>{idx + 1}</span> {book.title}
                    </div>
                    <div css={bookInfoCSS({ isDeskTop, isTablet, isMobile })}>
                      <img src={book.thumbnail} alt={book.title} />
                      <div>
                        {/* 웹툰 정보 */}
                        <div>
                          <span>이모작 평점</span>
                          <StarRating
                            key={`rating-${book.title}`}
                            onClick={console.log()}
                            readonly={true}
                            initialValue={book.avgScore}
                            size={isMobile ? 25 : 30}
                          />
                          <span>{book.avgScore.toString().slice(0, 3)}</span>
                        </div>
                        <div>
                          <span>{book.genre}</span> · &nbsp;
                          <span>{book.regist.slice(0, 4)}</span> · &nbsp;
                          {book.author}
                        </div>
                        <div
                          css={bookButtonCSS({ isDeskTop, isTablet, isMobile })}
                        >
                          <button>
                            <Link href={`/books/${book.bookId}`} replace>
                              이모작에서 보기
                            </Link>
                          </button>
                          <div>
                            {/* 디테일에서 가져오자 */}
                            웹툰 사이트에서 보기
                            {/* {book.platform} */}
                            {/* {book.href} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div css={reviewCSS({ isDeskTop, isTablet, isMobile })}>
                      {book.review}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div css={columnWrapCSS({ isDeskTop, isTablet, isMobile })}>
            <h3>
              <MdOutlineCookie size={24} />
              웹소설<span>총 {data.novel.length}개</span>
            </h3>
            <div css={noBookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              추천한 웹소설이 없습니다
            </div>
            <div css={bookWrapCSS({ isDeskTop, isTablet, isMobile })}>
              {/* 여기부턴 맵으로 돌린다 */}
              {data.novel.map((book, idx) => (
                <div
                  key={idx}
                  css={emopickCSS({ isDeskTop, isTablet, isMobile })}
                >
                  <div>
                    <div css={bookTitleCSS({ isDeskTop, isTablet, isMobile })}>
                      <span>{idx + 1}</span> {book.title}
                    </div>
                    <div css={bookInfoCSS({ isDeskTop, isTablet, isMobile })}>
                      <img src={book.thumbnail} alt={book.title} />
                      <div>
                        {/* 웹툰 정보 */}
                        <div>
                          <span>이모작 평점</span>
                          <StarRating
                            key={`rating-${book.title}`}
                            onClick={console.log()}
                            readonly={true}
                            initialValue={book.avgScore}
                            size={isMobile ? 25 : 30}
                          />
                          <span>{book.avgScore.toString().slice(0, 3)}</span>
                        </div>
                        <div>
                          <span>{book.genre}</span> · &nbsp;
                          <span>{book.regist.slice(0, 4)}</span> · &nbsp;
                          {book.author}
                        </div>
                        <div
                          css={bookButtonCSS({ isDeskTop, isTablet, isMobile })}
                        >
                          <button>
                            <Link href={`/books/${book.bookId}`} replace>
                              이모작에서 보기
                            </Link>
                          </button>
                          <div>
                            {/* 디테일에서 가져오자 */}
                            웹툰 사이트에서 보기
                            {/* {book.platform} */}
                            {/* {book.href} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div css={reviewCSS({ isDeskTop, isTablet, isMobile })}>
                      {book.review}
                    </div>
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
    ? "1fr 2fr"
    : isTablet
    ? "1fr 2fr"
    : "1fr"};
  column-gap: ${isMobile ? "10px" : "20px"};
  & div {
    font-size: ${isDeskTop ? "16px" : isTablet ? "14px" : "14px"};
  }
  & span {
    font-size: ${isDeskTop ? "14px" : isTablet ? "12px" : "12px"};
  }
  & button {
    font-size: ${isDeskTop ? "16px" : isTablet ? "14px" : "14px"};
  }
`;
const titleCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  profile: string
) => css`
  background-color: var(--back-color-2);
  background-image: url(${profile});
  background-size: cover;
  background-position: center center;
  background-blend-mode: soft-light;
  border-radius: ${isMobile ? "10px" : "20px"};
  width: ${isDeskTop
    ? "calc((100% - 210px - 20px) / 3)"
    : isTablet
    ? "calc((100% - 100px - 20px) / 3)"
    : "calc(100% - 40px)"};
  position: fixed;
  top: ${isDeskTop ? "90px" : isTablet ? "130px" : "70px"};
  left: ${isDeskTop ? "105px" : isTablet ? "50px" : "20px"};
  padding: ${isMobile ? "20px 20px" : "30px 30px"};
  & > img {
    display: block;
    width: ${isDeskTop ? "200px" : isTablet ? "130px" : "120px"};
    height: ${isDeskTop ? "200px" : isTablet ? "130px" : "120px"};
    border-radius: 50%;
    object-fit: cover;
    object-position: center center;
  }
  & > h2 {
    font-size: ${isDeskTop ? "26px" : isTablet ? "20px" : "18px"};
    font-weight: bold;
    padding-top: 20px;
    text-align: center;
  }
  & > * {
    margin: 0 auto;
  }
  & > span {
    & > svg {
      margin-right: 4px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* background-color: yellow; */
    text-align: center;
    line-height: 20px;
  }
`;
const titleButtonCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${isMobile ? "240px" : "150px"};
    padding-top: ${isMobile ? "10px" : "20px"};
    & > button {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: rgba(0, 0, 0, 0);
    }
    & > button:nth-of-type(3) {
      position: relative;
      & > div {
        background-color: var(--back-color);
        border: 1px solid var(--border-color-2);
        position: absolute;
        /* visibility: hidden; */
        /* opacity: 0; */
        top: 0px;
        left: 36px;
        border-radius: 10px;
        width: 80px;
        height: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        visibility: hidden;
        opacity: 0;
        & > * > div {
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          line-height: 30px;
        }
      }
      &:hover > div {
        visibility: visible;
        opacity: 1;
      }
    }
  `;
const writerCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  display: flex;
  justify-content: center;
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
const sectionCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css``;
const contentCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  position: relative;
  height: 200px;
  /* width: 100% !important; */
  border-radius: 20px;
  background-color: var(--back-color-2);
  padding: 30px 30px;
  text-align: center;
  /* display: table-cell; */
  line-height: 160px;
  text-align: center;
  & > svg:nth-of-type(1) {
    position: absolute;
    top: 20px;
    left: 20px;
    color: var(--text-color-4);
  }
  & > svg:nth-of-type(2) {
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: var(--text-color-4);
  }
`;
const columnWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css`
    padding: 20px 0px;
    & > h3 {
      // 웹툰
      border-radius: 10px;
      padding: 14px 14px;
      /* border: 1px solid var(--border-color-2); */
      background-color: var(--main-color);
      /* height: 40px; */
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 20px;
      font-weight: bold;
      & > svg {
        margin-right: 4px;
      }
      & > span {
        color: var(--text-color-3);
        margin-left: 10px;
        font-weight: normal;
      }
    }
  `;
const noBookWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css`
    display: none;
  `;
const emopickCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  padding: 20px 20px;
  border-radius: 10px;
  border: 1px solid var(--border-color-2);
  margin-bottom: 20px;
`;
const bookWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  padding: 0px 0px;
  /* background-color: var(--back-color-2); */
  border-radius: 10px;
  margin-top: 20px;
`;
const bookTitleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  font-size: 20px !important;
  font-weight: bold;
  padding: 0px 0;
  display: flex;
  align-items: center;
  & > span {
    display: flex;
    width: 30px;
    height: 30px;
    background-color: var(--main-color);
    color: #000;
    font-size: 20px !important;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    border-radius: 5px;
  }
`;
const bookInfoCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  display: grid;
  grid-template-columns: 160px 1fr;
  column-gap: 20px;
  padding-top: 10px;
  & > img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border: 10px;
    object-position: center center;
    border-radius: 10px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    & > div:nth-of-type(1) {
      & > span {
        font-weight: bold;
      }
      & > span:nth-of-type(1) {
        margin-right: 10px;
      }
      & > span:nth-of-type(2) {
        margin-left: 10px;
      }
      display: flex;
      height: 50px;
      align-items: center;
    }
    & > div:nth-of-type(2) {
      font-size: 14px;
      & > span {
        font-weight: bold;
      }
    }
  }
`;
const bookButtonCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css`
    /* width: 30%; */
    width: 400px;
    min-width: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr !important;
    column-gap: 10px;
    margin-top: 14px;
    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-radius: 5px;
    }
    & > button:nth-of-type(1) {
      background-color: var(--main-color);
    }
    & > div:nth-of-type(1) {
      background-color: var(--back-color-2);
    }
  `;
const reviewCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  margin-top: 14px;
  border-radius: 10px;
  padding: 20px;
  min-height: 40px;
  background-color: var(--back-color-2);
`;

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
