/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import Carousel3D from "@/components/UI/Carousel3D/Carousel3D";
import { throttle } from "lodash";

export default function index() {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const labtop = "/assets/labtop.png";
  const labtop_phone = "/assets/laptop_phone.png";
  const phone = "/assets/phone.png";
  const logo_black = "assets/emosaac_logo.png";
  const logo_white = "assets/emosaac_logo_white.png";
  const bazzi = "assets/bazzi.jpg";
  const papers = "assets/papers.gif";
  const [rotateXY, setRotateXY] = useState<number[]>([0, 0]);
  const [carouselAngle, setCarouselAngle] = useState<number>(0);
  const [carouselStartAngle, setCarouselStartAngle] = useState<number>(0);
  const [currentScroll, setCurrentScroll] = useState<number>(0);

  const laptopRef = useRef<HTMLImageElement>(null);

  function onClickRouterButton(pathName: string) {
    router.push(`/${pathName}`);
  }

  function onMouseMove(event: any) {
    const [centerX, centerY] = [
      laptopRef.current &&
        laptopRef.current.x + laptopRef.current.clientWidth / 2,
      laptopRef.current &&
        laptopRef.current.y + laptopRef.current.clientHeight / 2,
    ];
    const clientX = centerX && centerX - event.clientX;
    const clientY = centerY && centerY - event.clientY;
    clientX && clientY && setRotateXY([clientX / centerX, clientY / centerY]);
  }

  const onWheel = useMemo(
    () =>
      throttle(() => {
        const htmlEl = document.getElementsByTagName("html")[0];
        console.log(currentScroll);
        // console.log(htmlEl.scrollTop);
        if (htmlEl && htmlEl.scrollTop < 2000) {
          if (currentScroll < htmlEl.scrollTop) {
            setCarouselAngle((prev) => prev + htmlEl.scrollTop / 20);
            setCarouselStartAngle((prev) => prev + htmlEl.scrollTop / 20);
            setCurrentScroll(Number(htmlEl.scrollTop));
          } else {
            setCarouselAngle((prev) => prev - htmlEl.scrollTop / 20);
            setCarouselStartAngle((prev) => prev - htmlEl.scrollTop / 20);
            setCurrentScroll(Number(htmlEl.scrollTop));
          }
        }
      }, 300),
    [currentScroll]
  );

  useEffect(() => {}, []);
  return (
    <div onWheel={onWheel}>
      <div css={fullPageCSS({ isDeskTop, isTablet, isMobile })}>
        <div
          css={firstPageTestCSS({ isDeskTop, isTablet, isMobile })}
          onMouseMove={onMouseMove}
        >
          <div css={firstImgWrapCSS(rotateXY, isMobile)}>
            <img src={papers} alt="gif" ref={laptopRef} />
          </div>
          <div>
            이곳에서 <br /> 모든 <br /> 작품을,
          </div>
          <div>
            {/* <img src={logo_white} /> */}
            <div css={buttonWrapCSS({ isDeskTop, isTablet, isMobile })}>
              <button onClick={() => onClickRouterButton("login")}>
                로그인
              </button>
              <button onClick={() => onClickRouterButton("webtoon")}>
                웹툰 홈으로
              </button>
              <button onClick={() => onClickRouterButton("novel")}>
                웹소설 홈으로
              </button>
            </div>
          </div>
        </div>
        <div css={secondPageCSS({ isDeskTop, isTablet, isMobile })}>
          <div css={secondTitleCSS({ isDeskTop, isTablet, isMobile })}>
            <h2>
              <div>emosaac에서</div>
              <div>대표 플랫폼 작품들을 만나보세요</div>
            </h2>
            <div>당신의 취향을 반영한 어쩌구</div>
          </div>
          <div css={secondContentCSS({ isDeskTop, isTablet, isMobile })}>
            <div>
              <img src="/assets/platform_kakao_page.png" alt="kakao" />
            </div>
            <div>
              <img src="/assets/platform_naver_series.webp" alt="naver" />
            </div>
            <div>
              <img src="/assets/platform_ridi.webp" alt="ridi" />
            </div>
          </div>
          <div>
            <Carousel3D
              setCarouselAngle={setCarouselAngle}
              carouselAngle={carouselAngle}
              setCarouselStartAngle={setCarouselAngle}
              carouselStartAngle={carouselAngle}
            />
          </div>
        </div>
        <div>
          <div>
            <h2>emosaac의 두 번째 추천,</h2>
            <div>당신의 취향을 반영한 어쩌구</div>
          </div>
          <div></div>
        </div>
        <div>4</div>
      </div>
    </div>
  );
}

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const fullPageCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    background-color: #090a0d;
    color: #fff;
    & > div {
      ${isDeskTop &&
      "padding-left: 105px; padding-right: 105px; padding-top: 70px;"}
      ${isTablet &&
      "padding-left: 50px; padding-right: 50px;  padding-top: 110px;"}
      ${isMobile &&
      "padding-left: 20px; padding-right: 20px;  padding-top: 60px;"}
      overflow: hidden;
    }
  `;
};

const firstPageCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    height: calc(100vh - 70px);
    /* background-color: #0787f6; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 20px;
  `;
};

const firstPageTestCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    position: relative;
    height: 100vh;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #090a0d;

    & > div:nth-of-type(2) {
      // 이곳에서 모든 작품을
      position: relative;
      z-index: 12;
      font-size: calc(30px + 1vw);
      line-height: calc(40px + 1vw);
      font-weight: 900;
      text-align: left;
      text-align: center;
      /* margin-bottom: 30px; */
      color: #fff;
    }
    & > div:nth-of-type(3) {
      // 이모작 로고
      display: flex;
      position: relative;
      flex-direction: column;
      z-index: 12;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      & > img {
        width: 300px;
      }
    }
  `;
};

const buttonWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: grid;
    margin-top: 30px;
    grid-template-columns: 1fr 1fr;
    column-gap: ${!isMobile ? "14px" : "10px"};
    row-gap: ${!isMobile ? "14px" : "10px"};
    width: ${!isMobile ? "300px" : "260px"};
    & > button:nth-of-type(1) {
      grid-column: 1 / 3;
      grid-row: 1 / 2;
    }
    & > button {
      cursor: pointer;
      border: none;
      height: 50px;
      background-color: rgba(0, 0, 0, 0);
      border-radius: 40px;
      border: 1px solid #fff;
      color: #fff;
      :hover {
        transition: all 0.2s;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  `;
};

const firstImgWrapCSS = (rotateXY: number[], isMobile: boolean) => css`
  position: absolute;
  z-index: 10;
  top: calc(50% - ${!isMobile ? "250px" : "170px"});
  left: calc(50% - ${!isMobile ? "250px" : "170px"});
  width: ${!isMobile ? "500px" : "340px"};
  height: ${!isMobile ? "500px" : "340px"};
  transform: rotateX(${rotateXY[1] * 20}deg) rotateY(${rotateXY[0] * -20}deg)
    translate3d(
      ${rotateXY[0] * 10}px,
      ${rotateXY[1] * 10}px,
      ${((rotateXY[0] + 20) / (rotateXY[1] + 20)) * 10}px
    );
  border-radius: ${!isMobile ? "30px" : "10px"};
  /* background-image: url("/assets/bazzi.png"); */
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const blocksWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css``;
};

const secondPageCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css``;
};

const secondTitleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    width: 500px;
    margin: 0 auto;
  `;
};

const secondContentCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    width: ${isDeskTop ? "500px" : isTablet ? "500px" : "300px"};
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: ${!isMobile ? "50px" : "10px"};
    /* padding: ${isDeskTop ? "0 105px" : isTablet ? "0 50px" : "0 20px"}; */
    & > div {
      padding-bottom: 85%;
      border-radius: 10%;
      /* background-color: var(--back-color-3); */
      & > img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  `;
};
