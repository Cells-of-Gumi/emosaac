/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import { RiPlayCircleFill, RiPlayCircleLine } from "react-icons/ri";

interface Props {
  thumbnails: string;
  isMouseOnCard?: boolean;
}

const EmopickThumbnail = ({ thumbnails, isMouseOnCard }: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isMouseOnThumb, setIsMousOnThumb] = useState(false);
  return (
    <div css={pickThumbnailWrapCSS({ isDeskTop, isTablet, isMobile })}>
      <div>
        {thumbnails
          .split(" ")
          .slice(0, 4)
          .map((thumb, idx) => (
            <div key={idx}>
              <img src={thumb} alt="thumbnail" />
            </div>
          ))}
        <div></div>
      </div>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const pickThumbnailWrapCSS = ({
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) =>
  css`
    & > div:nth-of-type(1) {
      // 썸네일 다발
      height: ${!isMobile ? "200px" : "160px"};
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      & > div {
        width: ${!isMobile ? "150px" : "100px"};
        height: 200px;
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
        width: 50%;
        border-radius: 0px 10px 10px 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
  `;

export default EmopickThumbnail;
