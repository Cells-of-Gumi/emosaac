/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useEffect, useState, Dispatch, SetStateAction, useRef } from "react";
import { useRouter } from "next/router";

interface Props {
  setCarouselAngle: Dispatch<SetStateAction<number>>;
  carouselAngle: number;
  setCarouselStartAngle: Dispatch<SetStateAction<number>>;
  carouselStartAngle: number;
  bookData: any;
}

const Carousel3D = ({
  setCarouselAngle,
  carouselAngle,
  setCarouselStartAngle,
  carouselStartAngle,
}: Props) => {
  const cursorImg = "/assets/bazzi.jpg";
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseMoveClientX, setMouseMoveClientX] = useState(0);
  const [mouseMoveClientY, setMouseMoveClientY] = useState(0);
  const [isMouseLeave, setIsMouseLeave] = useState(true);
  const cellCount = 9;
  const coverRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
    setIsMouseLeave(false);
    // console.log(e.clientX);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMouseLeave(true);
    setMouseDownClientX(0);
    setMouseDownClientY(0);
    setCarouselStartAngle(carouselAngle);
  };
  const onTouchStart = (e: React.TouchEventHandler<HTMLDivElement>) => {
    // setMouseDownClientX(e.changedTouches[0].pageX);
    // setMouseDownClientY(e.clientY);
    // setIsMouseLeave(false);
    // console.log(e.clientX);
  };
  const onTouchEnd = (e: React.TouchEventHandler<HTMLDivElement>) => {
    setIsMouseLeave(true);
    setMouseDownClientX(0);
    setMouseDownClientY(0);
    setCarouselStartAngle(carouselAngle);
  };
  const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.clientX);
    if (!isMouseLeave) {
      setMouseMoveClientX(e.clientX);
      setMouseMoveClientY(e.clientY);
    }
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMouseLeave(true);
    setMouseDownClientX(0);
    setMouseDownClientY(0);
    setCarouselStartAngle(carouselAngle);
  };

  useEffect(() => {
    const dragSpaceX = -(mouseDownClientX - mouseMoveClientX) / 10;
    const dragSpaceY = -(mouseDownClientY - mouseMoveClientY) / 10;
    console.log(dragSpaceX);

    if (!isMouseLeave) {
      setCarouselAngle(carouselStartAngle + dragSpaceX);
    }
  }, [mouseMoveClientX]);

  return (
    <div css={containerCSS}>
      <div css={sceneCSS(isDeskTop, isTablet, isMobile)}>
        <div css={carouselCSS(isDeskTop, isTablet, isMobile, carouselAngle)}>
          <div css={carouselCellCSS}>1</div>
          <div css={carouselCellCSS}>2</div>
          <div css={carouselCellCSS}>3</div>
          <div css={carouselCellCSS}>4</div>
          <div css={carouselCellCSS}>5</div>
          <div css={carouselCellCSS}>6</div>
          <div css={carouselCellCSS}>7</div>
          <div css={carouselCellCSS}>8</div>
          <div css={carouselCellCSS}>9</div>
        </div>
      </div>
      <div
        css={coverCSS(isDeskTop, isTablet, isMobile, cursorImg)}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        // onTouchStart={onTouchStart}
        // onTouchEnd={onTouchEnd}
        ref={coverRef}
      ></div>
    </div>
  );
};

const containerCSS = css`
  position: relative;
  /* height: 100vh; */
  height: 168px;
`;

const sceneCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  /* background-color: aqua; */
  width: ${isDeskTop ? "504px" : isTablet ? "420px" : "210px"};
  height: ${isDeskTop ? "168px" : isTablet ? "140px" : "70px"};
  position: absolute;
  top: 0px;
  left: calc(50% - ${isDeskTop ? "257.5px" : isTablet ? "210px" : "105px"});
  perspective: 700px;
`;

const carouselCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean,
  carouselAngle: number
) => css`
  transition: all 1s;
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transform: translateZ(
      ${isDeskTop ? "-691.2px" : isTablet ? "-576px" : "-288px"}
    )
    rotateY(${carouselAngle}deg);
  & > div {
    transition: all 1s;
    background-color: var(--back-color-2);
    position: absolute;
    width: ${isDeskTop ? "456px" : isTablet ? "380px" : "190px"};
    height: ${isDeskTop ? "360px" : isTablet ? "300px" : "150px"};
    border-radius: ${isDeskTop ? "30px" : isTablet ? "20px" : "10px"};
    left: 10px;
    top: 10px;
    line-height: 116px;
    font-size: 80px;
    font-weight: bold;
    color: white;
    text-align: center;
  }
  & > div:nth-of-type(1) {
    transform: rotateY(0deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(2) {
    transform: rotateY(40deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(3) {
    transform: rotateY(80deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(4) {
    transform: rotateY(120deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(5) {
    transform: rotateY(160deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(6) {
    transform: rotateY(200deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(7) {
    transform: rotateY(240deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(8) {
    transform: rotateY(280deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
  & > div:nth-of-type(9) {
    transform: rotateY(320deg)
      translateZ(${isDeskTop ? "691.2px" : isTablet ? "576px" : "288px"});
  }
`;

const carouselCellCSS = css`
  position: absolute;
  width: 190px;
  /* height: 300px; */
  left: 10px;
  top: 10px;
`;

const coverCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean,
  cursorImg: string
) => css`
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  /* border: 10px solid #fff; */
  height: ${isDeskTop ? "360px" : isTablet ? "300px" : "150px"};
  width: 300%;
  left: -100%;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  ::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    visibility: hidden;
    opacity: 0;
    clear: both;
    height: 0px;
    width: 0px;
    border-radius: 50%;
    background-color: antiquewhite;
    transition: all 0.5s;
  }
  :hover {
    cursor: pointer;
    ::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      visibility: visible;
      opacity: 1;
      clear: both;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: antiquewhite;
      transition: all 0.5s;
    }
  }
  :active {
    cursor: pointer;
    ::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      visibility: visible;
      opacity: 1;
      clear: both;
      height: 100px;
      width: 100px;
      border-radius: 50%;
      background-color: red;
      transition: all 0.5s;
    }
  }
`;

export default Carousel3D;
