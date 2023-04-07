/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import Carousel3D from "@/components/UI/Carousel3D/Carousel3D";
import { before, throttle } from "lodash";
import { getNewBooksForPlatform } from "@/api/home/getNewBooksForPlatform";
import Head from "next/head";

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
  const [isLogin, setIsLogin] = useState(false);
  const [clickedPlatform, setClickedPlatform] = useState("naver");
  const [mouseCursorClientX, setMouseCursorClientX] = useState(0);
  const [mouseCursorClientY, setMouseCursorClientY] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [booksByPlatform, setBooksByPlatform] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const laptopRef = useRef<HTMLImageElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  function onClickPlatform(platform: string) {
    setClickedPlatform(platform);
  }

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

  function onCursorMove(event: any) {
    const htmlEl = document.getElementsByTagName("html")[0];
    const scrollTop = htmlEl.scrollTop;
    setMouseCursorClientX(event.clientX);
    scrollTop !== undefined && setMouseCursorClientY(event.clientY + scrollTop);
  }

  const onWheel = useMemo(
    () =>
      throttle(() => {
        const htmlEl = document.getElementsByTagName("html")[0];

        if (currentScroll < htmlEl.scrollTop) {
          setCarouselAngle((prev) => prev + htmlEl.scrollTop / 30);
          setCarouselStartAngle((prev) => prev + htmlEl.scrollTop / 30);
          setCurrentScroll(Number(htmlEl.scrollTop));
        } else {
          setCarouselAngle((prev) => prev - htmlEl.scrollTop / 30);
          setCarouselStartAngle((prev) => prev - htmlEl.scrollTop / 30);
          setCurrentScroll(Number(htmlEl.scrollTop));
        }
      }, 300),
    [currentScroll]
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    getNewBooksForPlatform().then((res) => {
      if (res !== null) {
        const content = res;
        // console.log(content);
        setBooksByPlatform(content);
      }
    });

    const darkMode = localStorage.getItem("data-theme");
    if (darkMode === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [router.events]);

  return (
    <>
      {/* 깃랩 테스트 */}
      <Head>
        <title>EMOSAAC</title>
        <meta name="description" content="모든 작품, 모든 즐거움!" />
        <meta name="keywords" content="웹툰, 웹소설, 인기" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="모든 작품, 모든 즐거움! 이모작에서"
        />
        <meta
          property="og:description"
          content="모든 작품, 모든 즐거움! 이모작에서"
        />
        <meta property="og:image" content="/assets/emosaac_logo_mobile.png" />
      </Head>

      <div onWheel={onWheel} css={backCSS({ isDeskTop, isTablet, isMobile })}>
        <div
          css={fullPageCSS(
            { isDeskTop, isTablet, isMobile },
            mouseCursorClientX,
            mouseCursorClientY,
            isMouseOver,
            isMouseActive
          )}
          onMouseMove={onCursorMove}
          ref={pageRef}
        >
          <div onMouseEnter={() => setIsMouseOver(true)}>
            {!isMouseActive && (
              <>
                <p>Click &</p>
                <p>Drag</p>
              </>
            )}
          </div>
          <div
            css={firstPageTestCSS(
              { isDeskTop, isTablet, isMobile },
              currentScroll
            )}
            onMouseMove={onMouseMove}
          >
            <div>이곳에서 모든 작품을,</div>
            <div>
              <img src={logo_white} />
              <img src={logo_black} />
              <div
                css={buttonWrapCSS({ isDeskTop, isTablet, isMobile }, isLogin)}
              >
                {!isLogin && (
                  <button onClick={() => onClickRouterButton("login")}>
                    로그인
                  </button>
                )}
                <button onClick={() => onClickRouterButton("webtoon")}>
                  웹툰 홈으로
                </button>
                <button onClick={() => onClickRouterButton("novel")}>
                  웹소설 홈으로
                </button>
              </div>
            </div>
          </div>
          <div
            css={secondPageCSS(
              { isDeskTop, isTablet, isMobile },
              clickedPlatform,
              currentScroll
            )}
          >
            <div>
              <div css={titleCSS({ isDeskTop, isTablet, isMobile })}>
                <h2>
                  <div>
                    emosaac <span>에서</span>
                  </div>
                  <div>대표 플랫폼 작품들을 만나보세요</div>
                </h2>
                <div>
                  여기저기 흩어져있는 컨텐츠, 찾아다니느라 엄청 불편했죠? <br />
                  이모작에서 <b>약 2만 여건의</b> 웹툰 / 웹소설 컨텐츠를
                  {isMobile ? <br /> : " "}한 번에 보여드릴게요.
                </div>
              </div>
              <div
                css={secondContentCSS(
                  { isDeskTop, isTablet, isMobile },
                  clickedPlatform
                )}
              >
                <div>
                  <div onClick={() => onClickPlatform("kakao")}>
                    {clickedPlatform === "kakao" ? (
                      <img
                        src="/assets/platform_kakao_page_clicked.png"
                        alt="kakao"
                      />
                    ) : (
                      <img src="/assets/platform_kakao_page.png" alt="kakao" />
                    )}
                  </div>
                  <div onClick={() => onClickPlatform("naver")}>
                    {clickedPlatform === "naver" ? (
                      <img
                        src="/assets/platform_naver_series_clicked.png"
                        alt="naver"
                      />
                    ) : (
                      <img
                        src="/assets/platform_naver_series.webp"
                        alt="naver"
                      />
                    )}
                  </div>
                  <div onClick={() => onClickPlatform("ridi")}>
                    {clickedPlatform === "ridi" ? (
                      <img src="/assets/platform_ridi_clicked.png" alt="ridi" />
                    ) : (
                      <img src="/assets/platform_ridi.webp" alt="ridi" />
                    )}
                  </div>
                </div>
                <Carousel3D
                  setCarouselAngle={setCarouselAngle}
                  carouselAngle={carouselAngle}
                  setCarouselStartAngle={setCarouselAngle}
                  carouselStartAngle={carouselAngle}
                  bookData={booksByPlatform}
                  mouseCursorClientX={mouseCursorClientX}
                  setMouseCursorClientX={setMouseCursorClientX}
                  mouseCursorClientY={mouseCursorClientY}
                  setMouseCursorClientY={setMouseCursorClientY}
                  isMouseOver={isMouseOver}
                  setIsMouseOver={setIsMouseOver}
                  isMouseActive={isMouseActive}
                  setIsMouseActive={setIsMouseActive}
                  clickedPlatform={clickedPlatform}
                />
              </div>
            </div>
          </div>
          <div
            css={thirdPageCSS({ isDeskTop, isTablet, isMobile }, currentScroll)}
          >
            <div css={titleCSS({ isDeskTop, isTablet, isMobile })}>
              <h2>
                <div>
                  emosaac <span>에서</span>
                </div>
                <div>당신의 취향에 맞는 컨텐츠를 추천받아보세요.</div>
              </h2>
              <div>
                당신이 좋아할 만한 작품을 추천해드릴게요. <br />
                이모작은 사용자의 성별, 나이, 선호 작품 등을 분석해 <br />
                새로운 컨텐츠를 끊임없이 추천해드립니다.
              </div>
            </div>
            <div
              css={fourthPageCSS(
                { isDeskTop, isTablet, isMobile },
                currentScroll
              )}
            >
              <div css={titleCSS({ isDeskTop, isTablet, isMobile })}>
                <h2>
                  <div>
                    emosaac <span>에서</span>
                  </div>
                  <div>당신의 관심 목록을 편하게 불러오세요.</div>
                </h2>
                <div>
                  다양한 플랫폼을 사용하고 있다면 OCR 스캔 기능을 사용해보세요.
                  <br />
                  캡쳐된 이미지를 업로드하면 관심 목록을 자동으로 인식해
                  <br />내 취향을 더 편리하게 반영할 수 있어요.
                </div>
              </div>
              <img src={"/assets/scan.gif"} alt="스캔" css={scanCSS} />
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const upMotion = () => keyframes`
  0% {
    opacity: 0;
    transform: translateY(0px);
  }
  100% {
    opacity: 1;
    transform: translateY(20px);
  }
`;

const moveMotion = keyframes`
0%{
  transform: translateY(0px);
}
100%{
  transform: translateY(-40px);
}`;

const appearMotion = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

const backCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  /* height: ${isDeskTop
    ? "calc((100vh - 70px) * 4)"
    : isTablet
    ? "calc((100vh - 111px * 4))"
    : "calc((100vh - 115px) * 4)"}; */
  height: 6000px;
`;

const fullPageCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  mouseCursorClientX: number,
  mouseCursorClientY: number,
  isMouseOver: boolean,
  isMouseActive: boolean
) => {
  return css`
    /* background-color: #090a0d; */
    /* color: #fff; */
    & > div {
      position: fixed;
      width: 100%;
      height: ${isDeskTop
        ? "calc(100vh - 70px)"
        : isTablet
        ? "calc(100vh - 111px)"
        : "calc(100vh - 115px)"};
      border: 1px solid #666;
    }
    & > div:nth-of-type(1) {
      display: flex;
      display: none;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      position: absolute;
      z-index: 30;
      left: ${mouseCursorClientX}px;
      top: ${mouseCursorClientY}px;
      visibility: ${isMouseOver ? "visible" : "hidden"};
      opacity: ${isMouseOver ? "1" : "0"};
      clear: both;
      height: ${isMouseActive ? "50px" : "100px"};
      width: ${isMouseActive ? "50px" : "100px"};
      border-radius: 50%;
      background-color: ${isMouseActive
        ? "var(--main-color-2)"
        : "var(--main-color)"};
      transition: all 0.3s;
      text-align: center;
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

const firstPageTestCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  currentScroll: number
) => {
  return css`
    ${isDeskTop &&
    "padding-left: 105px; padding-right: 105px; padding-top: 50px;"}
    ${isTablet &&
    "padding-left: 50px; padding-right: 50px;  padding-top: 50px;"}
      ${isMobile &&
    "padding-left: 20px; padding-right: 20px;  padding-top: 50px;"}
    position: absolute;
    height: 100vh;
    padding-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--back-color);

    & > div:nth-of-type(1) {
      animation: ${moveMotion} 1s 1.5s;
      animation-fill-mode: forwards;
      & > div {
        // 이곳에서 모든 작품을
        position: relative;
        z-index: 12;
        font-size: calc(30px + 1vw);
        /* line-height: calc(40px + 1vw); */
        font-weight: 900;
        text-align: left;
        text-align: center;
        /* margin-bottom: 30px; */
        /* color: #fff; */
        animation-name: ${upMotion()};
        animation-fill-mode: forwards;
        animation-duration: 1s;
      }
      & > img {
        /* animation: 애니메이션이름 지속시간 [타이밍함수 대기시간 반복횟수 반복방향 전후상태 재생/정지]; */
        animation: ${upMotion()} 1s 0.5s;
        /* animation-name: ${upMotion()};
        animation-duration: 1.5s; */
        opacity: 0;
        animation-delay: 1s;
        animation-fill-mode: forwards;
        width: 250px;
        margin: 20px auto;
        display: block;
      }
    }
    & > div:nth-of-type(2) {
      animation: ${appearMotion} 0.5s 2.3s;
      animation-fill-mode: forwards;
      display: flex;
      position: relative;
      flex-direction: column;
      z-index: 12;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      opacity: 0;
    }
  `;
};

const buttonWrapCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  isLogin: boolean
) => {
  return css`
    display: grid;
    /* margin-top: 10px; */
    grid-template-columns: 1fr 1fr;
    column-gap: ${!isMobile ? "14px" : "10px"};
    row-gap: ${!isMobile ? "14px" : "10px"};
    width: ${!isMobile ? "400px" : "320px"};
    & > button:nth-of-type(1) {
      ${!isLogin && " grid-column: 1 / 3; grid-row: 1 / 2;"}
      background-color : var(--main-color);
    }
    & > button {
      cursor: pointer;
      border: none;
      height: 50px;
      background-color: rgba(0, 0, 0, 0);
      border-radius: 40px;
      font-size: 16px;
      font-weight: bold;
      /* border: 1px solid var(--border-color); */
      color: var(--text-color);
      background-color: var(--back-color-3);
      :hover {
        transition: all 0.2s;
        background-color: var(--main-color-2);
      }
    }
  `;
};

const titleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    position: relative;
    z-index: 20;
    width: ${isDeskTop ? "800px" : isTablet ? "600px" : "100%"};
    margin: 0 auto;
    & > h2 {
      font-size: 36px;
      font-weight: bold;
      & > div:nth-of-type(1) {
        line-height: 40px;
        & span {
          font-size: 20px;
        }
      }
      & > div:nth-of-type(2) {
        font-size: 24px;
      }
    }
    & > div:nth-of-type(1) {
      margin-top: 20px;
      line-height: 25px;
      font-size: ${isMobile ? "14px" : "18px"};
      word-break: keep-all;
      & > b {
        font-weight: bold;
      }
    }
  `;
};

const secondPageCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  clickedPlatform: string,
  currentScroll: number
) => {
  return css`
    pointer-events: ${0.01 * (currentScroll - 1000) > 1 ? "auto" : "none"};
    opacity: calc(0.01 * ${currentScroll - 1000});
    & div {
      color: #000 !important;
    }
    /* position: relative; */
    /* height: ${isDeskTop
      ? "calc(100vh + 160px)"
      : isTablet
      ? "calc(100vh + 100px)"
      : "100vh"}; */
    transition: all 0.3s;
    overflow: hidden;
    color: #000 !important;
    & > div {
      ${isDeskTop &&
      "padding-left: 105px; padding-right: 105px; padding-top: 50px;"}
      ${isTablet &&
      "padding-left: 50px; padding-right: 50px;  padding-top: 50px;"}
      ${isMobile &&
      "padding-left: 20px; padding-right: 20px;  padding-top: 50px;"}
      position: absolute;
      z-index: 10;
      transition: all 0.3s;
      background: linear-gradient(-210deg, #ffe608, #f0a503, #f18900);
      height: 100%;
      width: 100%;
      transition: all 0.3s;
      color: #000 !important;
    }
    & > div::after {
      overflow: hidden;
      content: "";
      position: absolute;
      z-index: 10;
      clear: both;
      height: 100%;
      width: 100%;
      left: 0%;
      top: 0;
      background: linear-gradient(-210deg, #00db64, #00db96, #1ea696);
      transition: all 0.3s;
      opacity: ${clickedPlatform === "naver" ? "1" : "0"};
      visibility: ${clickedPlatform === "naver" ? "visible" : "hidden"};
      color: #000 !important;
    }
    & > div::before {
      overflow: hidden;
      content: "";
      z-index: 10;
      position: absolute;
      clear: both;
      height: 100%;
      width: 100%;
      left: 0%;
      top: 0;
      background: linear-gradient(-210deg, #1e9eff, #215be0, #164ac3);
      background-color: #fff;
      transition: all 0.3s;
      opacity: ${clickedPlatform === "ridi" ? "1" : "0"};
      visibility: ${clickedPlatform === "ridi" ? "visible" : "hidden"};
    }
  `;
};

const secondContentCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  clickedPlatform: string
) => {
  return css`
    color: #000;
    position: absolute;
    z-index: 20;
    /* top: calc(50vh +${isDeskTop
      ? "100px"
      : isTablet
      ? "100px"
      : "200px"}); */
    left: calc(50vw - ${isDeskTop ? "150px" : isTablet ? "150px" : "150px"});
    width: 300px;
    padding-top: ${isMobile ? "50px" : "0"};
    & > div:nth-of-type(1) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-top: 20%;
      margin-bottom: 30px;
      column-gap: 20px;
      & > div {
        cursor: pointer;
        border-radius: 10%;
        height: calc(260px / 3);
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        transition: all 0.3s;
        & > img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(1) {
        ${clickedPlatform === "kakao" &&
        "box-shadow: 0 10px 0 #965001; transform: translateY(-10px);"}
        :hover {
          ${clickedPlatform !== "kakao" &&
          "box-shadow: 0 10px 0 #965001; transform: translateY(-10px);"}
        }
      }
      & > div:nth-of-type(2) {
        ${clickedPlatform === "naver" &&
        "box-shadow: 0 10px 0 #007c4a; transform: translateY(-10px);"}
        :hover {
          ${clickedPlatform !== "naver" &&
          "box-shadow: 0 10px 0 #007c4a; transform: translateY(-10px);"}
        }
      }
      & > div:nth-of-type(3) {
        ${clickedPlatform === "ridi" &&
        "box-shadow: 0 10px 0 #0f1187; transform: translateY(-10px);"}
        :hover {
          ${clickedPlatform !== "ridi" &&
          "box-shadow: 0 10px 0 #0f1187; transform: translateY(-10px);"}
        }
      }
    }
  `;
};

const thirdPageCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  currentScroll: number
) => {
  return css`
    pointer-events: none;
    opacity: calc(0.001 * ${currentScroll * 5 - 10000});
    background-color: var(--back-color);
    ${isDeskTop &&
    "padding-left: 105px; padding-right: 105px; padding-top: 50px;"}
    ${isTablet &&
    "padding-left: 50px; padding-right: 50px;  padding-top: 50px;"}
      ${isMobile &&
    "padding-left: 20px; padding-right: 20px;  padding-top: 50px;"}
  `;
};

const fourthPageCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  currentScroll: number
) => {
  return css`
    pointer-events: none;
    opacity: calc(0.001 * ${currentScroll * 5 - 20000});
    /* opacity: 0; */
    /* color: red; */
    /* background-color: var(--back-color); */
    background-color: var(--main-color);
    & div {
      color: #000 !important;
    }
    ${isDeskTop &&
    "padding-left: 105px; padding-right: 105px; padding-top: 50px;"}
    ${isTablet &&
    "padding-left: 50px; padding-right: 50px;  padding-top: 50px;"}
      ${isMobile &&
    "padding-left: 20px; padding-right: 20px;  padding-top: 50px;"}
  `;
};

const scanCSS = css`
  display: block;
  transform: translateY(20px);
  width: 400px;
  height: 350px;
  object-fit: contain;
  object-position: center center;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: var(--shadow-color);
  background-color: var(--back-color);
`;
