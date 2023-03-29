/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useEffect, useState } from "react";
import { getToken } from "@/api/instance";
import { getRecommendTest } from "@/api/search/getRecommendTest";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const labtop = "/assets/labtop.png";
  const phone = "/assets/phone.png";
  const logo_black = "assets/emosaac_logo.png";
  const logo_white = "assets/emosaac_logo_white.png";
  const [books1, setBooks1] = useState<any>([]);
  const [books2, setBooks2] = useState<any>([]);

  function getRecommendBooks() {
    const typeCode = 1;
    const token = localStorage.getItem("access_token");
    getRecommendTest({ typeCode, token }).then((res) => {
      if (res !== null && res?.length !== 0) {
        setBooks1(res.slice(0, 5));
        setBooks2(res.slice(5, 10));
      }
    });
  }
  function onClickWebtoon() {
    router.push("/webtoon");
  }
  useEffect(() => {
    getRecommendBooks();
  }, []);
  return (
    <div>
      <div css={fullPageCSS({ isDeskTop, isTablet, isMobile })}>
        <div css={firstPageTestCSS({ isDeskTop, isTablet, isMobile })}>
          <div>이곳에서 모든 작품을,</div>
          <div>
            <img src={logo_black} />
            <button onClick={onClickWebtoon}>웹툰 홈으로 (임시)</button>
          </div>
          <div css={blocksWrapCSS({ isDeskTop, isTablet, isMobile })}>
            <div></div>
            <div css={blocksCSS({ isDeskTop, isTablet, isMobile })}>
              {books1 &&
                books1.map((book: any, idx: number) => (
                  <div key={idx}>
                    <img src={book.thumbnail} alt={book.title} />
                  </div>
                ))}
            </div>
            <div css={blocksCSS({ isDeskTop, isTablet, isMobile })}>
              {books2 &&
                books2.map((book: any, idx: number) => (
                  <div key={idx}>
                    <img src={book.thumbnail} alt={book.title} />
                  </div>
                ))}
            </div>
            <img src={labtop} />
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

const secondPageCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    height: 100vh;
    /* background-color: #0787f6; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 20px;
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
    height: 100vh;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* background-color: var(--main-color-2);
     */
    background: linear-gradient(
      0deg,
      var(--main-color-2) 0%,
      var(--main-color-2) 14%,
      var(--main-color) 100%
    );
    & > div:nth-of-type(1) {
      // 이곳에서 모든 작품을
      font-size: 24px;
      font-weight: bold;
      /* text-align: left; */
      text-align: center;
      margin: 30px 0 30px;
    }
    & > div:nth-of-type(2) {
      // 이모작 로고
      display: flex;
      /* justify-content: flex-start; */
      justify-content: center;
      margin-bottom: 30px;
      & > img {
        width: 250px;
      }
    }
    & > div:nth-of-type(3) {
      position: relative;
      display: flex;
      justify-content: center;
      & > img {
        // 랩탑
        position: absolute;
        top: -0px;
        width: 500px;
      }
      /* & > div:nth-of-type(1) {
        // 랩탑 배경
        position: absolute;
        top: -0px;
        width: 100%;
        height: 100%;
        background-color: #000;
      } */
    }
  `;
};

const blocksWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css``;
};

const blocksCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: flex;
    margin-top: 70px;
    & > div {
      height: 180px;
      width: 180px;
      border-radius: 20px;
      /* background-color: var(--text-color-2); */
      margin-left: 20px;
      overflow: hidden;
      & > img {
        width: 100%;
        object-fit: cover;
      }
    }
  `;
};

const firstImgCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    height: calc(100vh - 70px);
  `;
};

const firstTitleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > div:nth-of-type(1) {
      font-size: 30px;
      line-height: 40px;
      font-weight: bold;
    }
    & > div:nth-of-type(2) {
      margin-top: 30px;
    }
  `;
};

// 이후 작업들...
