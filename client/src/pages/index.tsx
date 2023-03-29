/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
// import labtop from "../../public/assets/laptop.png";

// import { getToken } from "@/api/instance";

export default function Home() {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const labtop = "/assets/labtop.png";
  return (
    <div>
      <div css={fullPageCSS({ isDeskTop, isTablet, isMobile })}>
        <div css={firstPageTestCSS({ isDeskTop, isTablet, isMobile })}>
          <div>이곳에서 모든 작품을,</div>
          <div>
            <img src={"/assets/emosaac_logo.png"} />
          </div>
          <div>
            <div css={blocksCSS({ isDeskTop, isTablet, isMobile })}>
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
              <img src={labtop} />
            </div>
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
      ${isDeskTop && "padding-left: 105px; padding-right: 105px;"}
      ${isTablet && "padding-left: 50px; padding-right: 50px;"}
      ${isMobile && "padding-left: 20px; padding-right: 20px;"}
    }
  `;
};

const secondPageCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    height: calc(100vh - 70px);
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
    height: calc(100vh - 70px);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    & > div:nth-of-type(1) {
      font-size: 24px;
      font-weight: bold;
      text-align: left;
      margin: 100px 0 30px;
    }
    & > div:nth-of-type(2) {
      display: flex;
      justify-content: start;
      margin-bottom: 30px;
    }
    & > div:nth-of-type(3) {
      display: flex;
      justify-content: center;
      & > img {
        position: absolute;
        top: 300px;
        width: 700px;
      }
    }
  `;
};

const blocksCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    display: flex;
    margin-top: 70px;
    & > div {
      height: 200px;
      width: 200px;
      border-radius: 20px;
      background-color: var(--text-color-2);
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
