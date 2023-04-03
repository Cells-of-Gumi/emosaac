/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import { RiPlayCircleFill, RiPlayCircleLine } from "react-icons/ri";
import { MdOutlinePlaylistPlay } from "react-icons/md";

interface Props {
  thumbnails: string;
  bookCnt: number;
  isMouseOnCard?: boolean | null;
}

const EmopickThumbnail = ({ thumbnails, bookCnt, isMouseOnCard }: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isMouseOnThumb, setIsMousOnThumb] = useState(false);
  return (
    <div
      css={pickThumbnailWrapCSS(
        { isDeskTop, isTablet, isMobile },
        isMouseOnThumb,
        isMouseOnCard !== undefined && isMouseOnCard
      )}
      onMouseOver={() => setIsMousOnThumb(true)}
      onMouseLeave={() => setIsMousOnThumb(false)}
    >
      <div>
        {thumbnails
          .split(" ")
          .slice(0, 4)
          .map((thumb, idx) => (
            <div key={idx}>
              <img src={thumb} alt="thumbnail" />
            </div>
          ))}
        <div>
          {isMouseOnCard || isMouseOnThumb ? (
            "전체 보기"
          ) : (
            <>
              {bookCnt}
              <MdOutlinePlaylistPlay size={20} />
            </>
          )}
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

const pickThumbnailWrapCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  isMouseOnThumb: boolean,
  isMouseOnCard: boolean | null
) =>
  css`
    & > div:nth-of-type(1) {
      // 썸네일 다발
      width: ${!isMobile ? "210px" : "160px"};
      height: ${!isMobile ? "210px" : "160px"};
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      & > div {
        width: ${!isMobile ? "150px" : "100px"};
        height: 210px;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(1) {
        left: 60px;
      }
      & > div:nth-of-type(2) {
        left: 40px;
      }
      & > div:nth-of-type(3) {
        left: 20px;
      }
      & > div:nth-of-type(4) {
        left: 0px;
      }
      & > div:nth-of-type(5) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        width: ${isMouseOnCard || isMouseOnThumb ? "100%" : "50%"};
        border-radius: 0px 10px 10px 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        transition: all 0.2s ease-in-out;
        & > svg {
          margin-top: 8px;
        }
      }
    }
  `;

export default EmopickThumbnail;
