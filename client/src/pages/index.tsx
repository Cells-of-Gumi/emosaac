/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import { useRouter } from "next/router";

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
  const [books1, setBooks1] = useState<any>([]);
  const [books2, setBooks2] = useState<any>([]);
  const [rotateXY, setRotateXY] = useState<number[]>([0, 0]);

  const laptopRef = useRef<HTMLImageElement>(null);

  function onClickWebtoon() {
    router.push("/webtoon");
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
    console.log(laptopRef);
    clientX && clientY && setRotateXY([clientX / centerX, clientY / centerY]);
  }
  useEffect(() => {
    console.log(laptopRef);
    //clientHeight, offsetTop, offsetWidth
  }, []);
  return (
    <div>
      <div css={fullPageCSS({ isDeskTop, isTablet, isMobile })}>
        <div
          css={firstPageTestCSS({ isDeskTop, isTablet, isMobile })}
          onMouseMove={onMouseMove}
        >
          <div css={firstImgWrapCSS(rotateXY)}>
            <img src={papers} alt="gif" ref={laptopRef} />
          </div>
          <div>이곳에서 모든 작품을,</div>
          <div>
            {/* <img src={logo_white} /> */}
            <button onClick={onClickWebtoon}>웹툰 홈으로 (임시)</button>
          </div>
        </div>
        <div css={secondPageCSS({ isDeskTop, isTablet, isMobile })}>
          <div>
            <h2>emosaac의 첫 번째 추천,</h2>
            <div>당신의 취향을 반영한 어쩌구</div>
          </div>
          <div></div>
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
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: var(--main-color-2);
     */
    background: linear-gradient(
      0deg,
      var(--back-color-2) 0%,
      var(--back-color-2) 14%,
      var(--back-color) 100%
    );
    & > div:nth-of-type(2) {
      // 이곳에서 모든 작품을
      position: relative;
      z-index: 12;
      font-size: 60px;
      font-weight: 900;
      /* text-align: left; */
      text-align: center;
      margin: 30px 0 30px;
    }
    & > div:nth-of-type(3) {
      // 이모작 로고
      display: flex;
      position: relative;
      z-index: 12;
      justify-content: center;
      margin-bottom: 30px;
      & > img {
        width: 700px;
      }
    }
  `;
};

const firstImgWrapCSS = (rotateXY: number[]) => css`
  position: absolute;
  z-index: 10;
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  width: 500px;
  height: 500px;
  transform: rotateX(${rotateXY[1] * 20}deg) rotateY(${rotateXY[0] * -20}deg)
    translate3d(
      ${rotateXY[0] * 10}px,
      ${rotateXY[1] * 10}px,
      ${((rotateXY[0] + 20) / (rotateXY[1] + 20)) * 10}px
    );
  border-radius: 30px;
  /* background-image: url("/assets/bazzi.png"); */
  background-color: black;
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
  return css`
    height: 100vh;
    /* background-color: #0787f6; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 20px;
  `;
};
