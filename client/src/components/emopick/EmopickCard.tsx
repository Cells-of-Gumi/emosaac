/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import { RiPlayCircleFill, RiPlayCircleLine } from "react-icons/ri";
import EmopickThumbnail from "./EmopickThumbnail";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type emopickInfoType = {
  writerInfo: {
    userId: number;
    nickname: string;
    profileImg: string;
  };
  emopickId: number;
  title: string;
  thumbnails: string;
  createdDate: string;
  modifiedDate: string;
  likeCnt: number;
  bookCnt: number;
};

interface Props {
  emopick: emopickInfoType;
}

const EmopickCard = ({ emopick }: Props) => {
  const isEmoLimit = !useMediaQuery({
    query: "(min-width: 1250px) or (max-width: 1023px)",
  });
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isMouseOnCard, setIsMouseOnCard] = useState(false);
  function onClickBox(emopickId: number) {
    router.push(`/emopick/${emopickId}`);
  }
  return (
    <div
      key={emopick.emopickId}
      onClick={() => onClickBox(emopick.emopickId)}
      onMouseOver={() => setIsMouseOnCard(true)}
      onMouseLeave={() => setIsMouseOnCard(false)}
      css={pickWrapCSS({ isDeskTop, isTablet, isMobile })}
    >
      <EmopickThumbnail
        thumbnails={emopick.thumbnails}
        bookCnt={emopick.bookCnt}
        isMouseOnCard={isMouseOnCard}
      />
      <div css={pickContentWrapCSS({ isDeskTop, isTablet, isMobile })}>
        {/* 글 정보 */}
        <div>
          <div>
            <RiPlayCircleFill size={isMobile ? 20 : 24} />
            <div>{emopick.title}</div>
          </div>
          {/* <div>{emo.createdDate}</div> */}
          <div>
            <AiFillHeart /> {emopick.likeCnt} · 1시간 전
          </div>
        </div>
        {/* 사용자 정보 */}
        <div>
          <div>
            <img src={emopick.writerInfo.profileImg} alt="profile" />
            {/* <img src="/assets/bazzi.jpg" alt="profile" /> */}
          </div>
          <div>{emopick.writerInfo.nickname}</div>
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

const pickWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  cursor: pointer;
  width: 100%;
  display: grid;
  grid-template-columns: ${!isMobile ? "210px 1fr" : "100px 1fr"};
  column-gap: ${!isMobile ? "20px" : "20px"};
  transition: all 0.3s;
`;

const pickContentWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css`
    /* padding: ${!isMobile ? "10px 0" : "10px 0"}; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    // 글 정보
    & > div:nth-of-type(1) {
      & > div:nth-of-type(1) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: ${isMobile ? "8px 0" : "20px 0"};
        font-weight: bold;
        & > div {
          font-size: ${isMobile ? "16px" : "20px"};
          margin-left: 4px;
        }
      }
      & > div:nth-of-type(2) {
        margin-left: 4px;
        color: var(--text-color-4);
        font-size: 14px;
        display: flex;
        & > svg {
          margin-right: 4px;
        }
      }
    }
    // 작성자 정보
    & > div:nth-of-type(2) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 10px 0;
      & > div:nth-of-type(1) {
        width: 30px;
        height: 30px;
        border-radius: 50px;
        overflow: hidden;
        background-color: var(--back-color-3);
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(2) {
        margin-left: 10px;
      }
    }
  `;

export default EmopickCard;
