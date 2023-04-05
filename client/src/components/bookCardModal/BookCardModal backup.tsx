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

  const modalLayout = {
    widthValue: 450,
    heightValue: 500,
  };

  return (
    <div ref={wrapperRef} css={WrapperCSS({parentRef: parentRef})} >
      <div>
        <div css={backgroundCSS({ imgUrl: bookData.img })}></div>
        <div css={imageWrapperCSS}>
          <img
            src={bookData && bookData.img}
            alt={bookData && bookData.title}
            css={imageCSS({
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
}


interface WrapperCSSProps {
  parentRef: any
}

const WrapperCSS = ({parentRef}: WrapperCSSProps) => {
  return css`
    position: absolute;
    z-index: 999999;
    overflow: hidden;
    left: ${parentRef?.current?.getBoundingClientRect().left}px;
    top: ${parentRef?.current?.getBoundingClientRect().top}px;
    width: ${parentRef?.current?.clientWidth}px;
    height: ${parentRef?.current?.clientHeight}px;
  `
}


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
  imgHeight: string | undefined;
}

const imageCSS = ({ imgHeight }: imageCSSProps) => {
  return css`
    transition-property: width height opacity;
    transition-duration: 0.3s;
    transition-delay: 0.3s;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${imgHeight};
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
