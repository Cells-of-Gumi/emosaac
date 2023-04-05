/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { throttle } from "lodash";

interface BookCardModalProps {
  modalToggler: boolean;
  isMouseOn: boolean;
  setModalToggler: Function;
  bookData: any;
  parentRef: React.ForwardedRef<HTMLDivElement>;
  imgHeight: string | undefined;
}

const BookCardModal = ({
  modalToggler,
  isMouseOn,
  setModalToggler,
  bookData,
  parentRef,
  imgHeight,
}: BookCardModalProps) => {
  const wrapperRef = useRef<HTMLInputElement>(null);
  const [contentToggler, setContentToggler] = useState<boolean>(false);
  const [isOpened, setisOpened] = useState<boolean>(false);

  const modalLayout = {
    widthValue: 450,
    heightValue: 500,
  };

  useEffect(() => {
    if (isMouseOn === true && modalToggler === true) {
      setTimeout(function () {
        setContentToggler(() => true);
        setisOpened(() => true);
      }, 300);
    }
  }, []);

  const modalHandler = () => {
    if (isMouseOn === true && contentToggler === true) {
      setTimeout(function () {
        setModalToggler(() => false);
      }, 300);
    } else {
      setModalToggler(() => false);
    }

    setContentToggler(() => false);
  };

  return (
    <div
      onMouseLeave={modalHandler}
      ref={wrapperRef}
      css={wrapperCSS({
        modalToggler: contentToggler,
        isMouseOn: isMouseOn,
        parentRef: parentRef,
        wrapperRef: wrapperRef,
        widthValue: modalLayout.widthValue,
        heightValue: modalLayout.heightValue,
      })}
    >
      <div
        css={innerWrapperCSS({
          modalToggler: modalToggler,
          contentToggler: contentToggler,
          isMouseOn: isMouseOn,
          isOpened: isOpened,
        })}
      >
        <div css={backgroundCSS({ imgUrl: bookData.img })}></div>
        <div css={imageWrapperCSS}>
          <img
            src={bookData && bookData.img}
            alt={bookData && bookData.title}
            css={imageCSS({
              modalToggler: contentToggler,
              imgHeight: imgHeight,
            })}
          />
        </div>

        <div css={spaceDivCSS}></div>
        <div css={contentDivCSS}>
          <div css={titleCSS}>{bookData.title}</div>
        </div>
      </div>
    </div>
  );
};

interface wrapperCSSProps {
  modalToggler: boolean;
  isMouseOn: boolean;
  parentRef: any;
  wrapperRef: any;
  widthValue: number;
  heightValue: number;
}

const wrapperCSS = ({
  modalToggler,
  isMouseOn,
  parentRef,
  wrapperRef,
  widthValue,
  heightValue,
}: wrapperCSSProps) => {
  const isLeftEdge =
    (widthValue - parentRef?.current?.clientWidth) / 2 >=
    parentRef?.current?.getBoundingClientRect().left;
  const isRightEdge =
    parentRef?.current?.getBoundingClientRect().left +
      (widthValue - (widthValue - parentRef?.current?.clientWidth) / 2) >=
    document.body.offsetWidth;

  const leftStandard = `left: ${
    modalToggler && isLeftEdge === true
      ? "42"
      : parentRef?.current?.getBoundingClientRect().left -
        (widthValue - parentRef?.current?.clientWidth) / 2
  }px;`; // parentRef?.current?.getBoundingClientRect().left
  const rightStandard = `left: ${
    modalToggler && isRightEdge === true
      ? document.body.offsetWidth - widthValue - 42
      : parentRef?.current?.getBoundingClientRect().left
  }px`;

  const activated = isRightEdge === true ? rightStandard : leftStandard;

  return css`
    position: absolute;
    z-index: 999999;
    transition-property: width height;
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
    overflow: hidden;

    top: ${modalToggler && isMouseOn
      ? parentRef?.current?.getBoundingClientRect().top -
        (heightValue - parentRef?.current?.clientHeight) / 2
      : parentRef?.current?.getBoundingClientRect().top}px;
    width: ${modalToggler && isMouseOn
      ? `${widthValue}px`
      : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler && isMouseOn
      ? `${heightValue}px`
      : `${parentRef?.current?.clientHeight}px`};
    ${modalToggler === true && isMouseOn ? activated : `left: ${parentRef?.current?.getBoundingClientRect().left}px`};
    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */
        background-color: ${modalToggler && isMouseOn
      ? `white`
      : `rgba(0,0,0,0)`};
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  `;
};

interface innerWrapperCSSProps {
  modalToggler: boolean;
  contentToggler: boolean;
  isMouseOn: boolean;
  isOpened: boolean;
}

const innerWrapperCSS = ({
  modalToggler,
  contentToggler,
  isMouseOn,
  isOpened,
}: innerWrapperCSSProps) => {
  return css`
    opacity: ${contentToggler ? "255" : isOpened ? "255" : "0"};
  `;
};

interface backgroundCSSProps {
  imgUrl: string;
}

const backgroundCSS = ({ imgUrl }: backgroundCSSProps) => {
  return css`
    width: 110%;
    position: absolute;
    left: -5%;
    top: -5%;
    height: 350px;
    background: no-repeat url("${imgUrl}") 0 / cover;
    filter: blur(10px);
    -webkit-filter: blur(10px);
    pointer-events: none;
    display: flex;
    justify-content: center;
  `;
};

const imageWrapperCSS = css`
  width: 100%;
  height: 350px;
  position: absolute;
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0), white);
  pointer-events: none;
`;

interface imageCSSProps {
  modalToggler: boolean;
  imgHeight: string | undefined;
}

const imageCSS = ({ modalToggler, imgHeight }: imageCSSProps) => {
  return css`
    transition-property: width height opacity;
    transition-duration: 0.3s;
    transition-delay: 0.3s;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${modalToggler ? "350px" : imgHeight};
  `;
};

const spaceDivCSS = css`
  width: 100%;
  height: 350px;
`;

const contentDivCSS = css`
  padding: 12px;
`;

const titleCSS = css`
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default BookCardModal;
