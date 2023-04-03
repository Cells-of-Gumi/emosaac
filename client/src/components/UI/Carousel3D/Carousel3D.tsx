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
  mouseCursorClientX: number;
  setMouseCursorClientX: Dispatch<SetStateAction<number>>;
  mouseCursorClientY: number;
  setMouseCursorClientY: Dispatch<SetStateAction<number>>;
  isMouseOver: boolean;
  setIsMouseOver: Dispatch<SetStateAction<boolean>>;
  isMouseActive: boolean;
  setIsMouseActive: Dispatch<SetStateAction<boolean>>;
  clickedPlatform: string;
}

const Carousel3D = ({
  setCarouselAngle,
  carouselAngle,
  setCarouselStartAngle,
  carouselStartAngle,
  bookData,
  mouseCursorClientX,
  setMouseCursorClientX,
  mouseCursorClientY,
  setMouseCursorClientY,
  isMouseOver,
  setIsMouseOver,
  isMouseActive,
  setIsMouseActive,
  clickedPlatform,
}: Props) => {
  const cursorImg = "/assets/bazzi.jpg";
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseMoveClientX, setMouseMoveClientX] = useState(0);
  const [mouseMoveClientY, setMouseMoveClientY] = useState(0);
  const [isMouseLeave, setIsMouseLeave] = useState(true);
  const coverRef = useRef<HTMLDivElement>(null);
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
    setIsMouseLeave(false);
    setIsMouseActive(true);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMouseLeave(true);
    setMouseDownClientX(0);
    setMouseDownClientY(0);
    setCarouselStartAngle(carouselAngle);
    setIsMouseActive(false);
  };
  const onTouchStart = (e: any) => {
    setMouseDownClientX(e.changedTouches[0].clientX * 3);
    setMouseDownClientY(e.changedTouches[0].clientY * 3);
    setIsMouseLeave(false);
  };
  const onTouchEnd = (e: any) => {
    setIsMouseLeave(true);
    setMouseDownClientX(0);
    setMouseDownClientY(0);
    setCarouselStartAngle(carouselAngle);
  };
  const onTouchMove = (e: any) => {
    // console.log(e.clientX);
    if (!isMouseLeave) {
      setMouseMoveClientX(e.changedTouches[0].clientX);
      setMouseMoveClientY(e.changedTouches[0].clientY);
    }
  };
  const onMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log(e.clientX);
    !isMobile && setIsMouseOver(true);
    if (!isMouseLeave) {
      setMouseMoveClientX(e.clientX);
      setMouseMoveClientY(e.clientY);
    }
    setMouseCursorClientX(e.clientX);
    setMouseCursorClientY(e.clientY);
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMouseLeave(true);
    setIsMouseOver(false);
    setMouseDownClientX(0);
    setMouseDownClientY(0);
    setCarouselStartAngle(carouselAngle);
    setIsMouseActive(false);
  };
  const onMouseEnter = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    !isMobile && setIsMouseOver(true);
  };

  useEffect(() => {
    const dragSpaceX = -(mouseDownClientX - mouseMoveClientX) / 10;
    const dragSpaceY = -(mouseDownClientY - mouseMoveClientY) / 10;

    if (!isMouseLeave) {
      setCarouselAngle(carouselStartAngle + dragSpaceX);
    }
  }, [mouseMoveClientX]);
  return (
    <div css={containerCSS}>
      <div css={sceneCSS(isDeskTop, isTablet, isMobile)}>
        <div css={carouselCSS(isDeskTop, isTablet, isMobile, carouselAngle)}>
          {bookData &&
            clickedPlatform === "kakao" &&
            bookData?.kakao?.slice(0, 15).map((book: any, idx: number) => (
              <div
                key={idx}
                css={carouselCellCSS(isDeskTop, book?.typeCd === 0)}
              >
                <img src={book?.thumbnail} alt={book?.title} />
                <span>{book?.typeCd === 0 ? "웹툰" : "웹소설"}</span>
                <div>
                  <p>{book?.title}</p>
                </div>
              </div>
            ))}
          {bookData &&
            clickedPlatform === "naver" &&
            bookData?.naver?.slice(0, 15).map((book: any, idx: number) => (
              <div
                key={idx}
                css={carouselCellCSS(isDeskTop, book?.typeCd === 0)}
              >
                <img src={book?.thumbnail} alt={book?.title} />
                <span>{book?.typeCd === 0 ? "웹툰" : "웹소설"}</span>
                <div>
                  <p>{book?.title}</p>
                </div>
              </div>
            ))}
          {bookData &&
            clickedPlatform === "ridi" &&
            bookData?.ridi?.slice(0, 15).map((book: any, idx: number) => (
              <div
                key={idx}
                css={carouselCellCSS(isDeskTop, book?.typeCd === 0)}
              >
                <img src={book?.thumbnail} alt={book?.title} />
                <span>{book?.typeCd === 0 ? "웹툰" : "웹소설"}</span>
                <div>
                  <p>{book?.title}</p>
                  <p>{book?.author}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        css={coverCSS(
          isDeskTop,
          isTablet,
          isMobile,
          mouseCursorClientX,
          mouseCursorClientY
        )}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={onMouseEnter}
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
  width: ${isDeskTop ? "360px" : isTablet ? "240px" : "120px"};
  height: ${isDeskTop ? "210px" : isTablet ? "140px" : "70px"};
  position: absolute;
  top: 0px;
  left: calc(50% - ${isDeskTop ? "180px" : isTablet ? "120px" : "60px"});
  perspective: 1000px;
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
      ${isDeskTop ? "-847.5px" : isTablet ? "-565px" : "-282.5px"}
    )
    rotateY(${carouselAngle}deg);
  & > div {
    transition: all 1s;
    background-color: #bcbcbc;
    position: absolute;
    width: ${isDeskTop ? "330px" : isTablet ? "220px" : "110px"};
    height: ${isDeskTop ? "450px" : isTablet ? "300px" : "150px"};
    border-radius: ${isDeskTop ? "10px" : isTablet ? "10px" : "10px"};
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
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(2) {
    transform: rotateY(24deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(3) {
    transform: rotateY(48deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(4) {
    transform: rotateY(72deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(5) {
    transform: rotateY(96deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(6) {
    transform: rotateY(120deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(7) {
    transform: rotateY(144deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(8) {
    transform: rotateY(168deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(9) {
    transform: rotateY(192deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(10) {
    transform: rotateY(216deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(11) {
    transform: rotateY(240deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(12) {
    transform: rotateY(264deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(13) {
    transform: rotateY(288deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(14) {
    transform: rotateY(312deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
  & > div:nth-of-type(15) {
    transform: rotateY(336deg)
      translateZ(${isDeskTop ? "847.5px" : isTablet ? "565px" : "282.5px"});
  }
`;

const carouselCellCSS = (isDeskTop: boolean, isWebtoon: boolean) => css`
  position: absolute;
  width: 190px;
  height: 300px;
  left: 10px;
  top: 10px;
  overflow: hidden;
  & > span {
    position: absolute;
    z-index: 10;
    top: 0;
    display: block;
    margin-right: 6px;
    text-align: center;
    font-weight: bold;
    padding: ${isDeskTop ? "0 10px" : "0 6px"};
    height: ${isDeskTop ? "32px" : "25px"};
    line-height: ${isDeskTop ? "32px" : "25px"};
    font-size: ${isDeskTop ? "14px" : "12px"};
    border-radius: 9px 0px 9px 0px;
    background-color: ${!isWebtoon ? "#fff" : "var(--main-color)"};
    color: ${isWebtoon ? "#fff" : "var(--main-color)"};
  }
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: all 0.3s;
  }
`;

const coverCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean,
  cursorClientX: number,
  cursorClientY: number
) => css`
  cursor: pointer;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  /* border: 10px solid #fff; */
  height: ${isDeskTop ? "360px" : isTablet ? "300px" : "150px"};
  width: 400%;
  left: -150%;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export default Carousel3D;
