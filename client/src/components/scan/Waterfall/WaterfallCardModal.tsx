/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { throttle } from "lodash";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { useRouter } from "next/router"
import { bookDetailType } from "@/types/books";
import { getBookDetail } from "@/api/book/getBookDetail";
import StarRating from "@/components/bookDetail/StarRating";
import TagList from "@/components/bookDetail/TagList";
import { putBookRating } from "@/api/book/putBookRating";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";


interface WaterfallCardModalProps {
  modalToggler: boolean;
  isMouseOn: boolean;
  setModalToggler: Function;
  bookData: any;
  parentRef: any;
  imgHeight: string | undefined;
  imgMinHeight: string | undefined;
  isModalOnHandler: Function;
  rotateY: number;
  waterfallWrapperRef: any;
  setRatingList: Function;
  ratingList: any;
}

const WaterfallCardModal = ({
  modalToggler,
  isMouseOn,
  setModalToggler,
  bookData,
  parentRef,
  imgHeight,
  imgMinHeight,
  isModalOnHandler,
  rotateY,
  waterfallWrapperRef,
  setRatingList,
  ratingList,
}: WaterfallCardModalProps) => {
  const wrapperRef = useRef<HTMLInputElement>(null);
  const [contentToggler, setContentToggler] = useState<boolean>(false);
  const [isOpened, setisOpened] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const router = useRouter()




  const modalLayout = {
    widthValue: isMobile ? 360 : 460,
    heightValue: isMobile ? 680 : 750,
  };

  useEffect(() => {
    if (isMouseOn === true && modalToggler === true) {
      setContentToggler(() => true);
      setisOpened(() => true);

    }

    
  }, []);



  const modalHandler = () => {
    
    if (isMouseOn === true && contentToggler === true) {
      
      setTimeout(function () {
        if (wrapperRef.current !== null) {
          wrapperRef.current.style.opacity = '0'
        }
        isModalOnHandler(false)
      }, 100);
      
      setTimeout(function () {
        setModalToggler(() => false);
        
        
      }, 500);
    } else {
      setModalToggler(() => false);
    }
    setContentToggler(() => false);
    setIsClosing(() => true)
    
  };




  const putBookRatingHandler = (score: number) => {
    const temp = ratingList
    temp[bookData.bookId] = score
    setRatingList(() => temp)
    putBookRating({ bookId: bookData.bookId, score: score });

  //   setRatingList,
  // ratingList,
  };

  return (
    <div css={css`transform-style: preserve-3d;`}>
    <div css={outerWrapperCSS({waterfallWrapperRef})}>
      <div css={backdropCSS({isOpened, isClosing})} />
      <div
        // onMouseLeave={modalHandler}
        // onWheelCapture={onWheelHandler}
        
        ref={wrapperRef}
        css={wrapperCSS({
          modalToggler: contentToggler,
          parentRef: parentRef,
          wrapperRef: wrapperRef,
          widthValue: modalLayout.widthValue,
          heightValue: modalLayout.heightValue,
          rotateY,
          isOpened,
          isClosing,
        })}
      >
        <div
          css={innerWrapperCSS({
            modalToggler: modalToggler,
            contentToggler: contentToggler,
            isOpened: isOpened,
          })}
        >
          <div css={backgroundCSS({ imgUrl: bookData.thumbnail })}></div>
          <div css={imageWrapperCSS}>
            <img
              src={bookData && bookData.thumbnail}
              alt={bookData && bookData.title}
              css={imageCSS({
                modalToggler: contentToggler,
                parentRef: parentRef,
                isClosing: isClosing,
                imgHeight: imgHeight,
                imgMinHeight: imgMinHeight,
                isMobile
              })}
            />
          </div>

          <div css={spaceDivCSS({isMobile})}></div>
          <div css={contentDivCSS}>
            <div className={"book-info"} css={bookInfoWrapperCSS}>
              <div css={titleCSS}>
                {bookData.title}
                
              </div>
              <div css={additionalInfoWrapperCSS}>
                
                <div css={starRatingWrapperCSS}>

                <StarRating
                  onClick={putBookRatingHandler}
                  readonly={false}
                  initialValue={ratingList[bookData.bookId] ? ratingList[bookData.bookId] : bookData.myScore}
                />

                </div>
                {bookData && <TagList tag={bookData.tag} identifier={`waterfall-${bookData.bookId}`} />}
              </div>
              
            </div>
            
            <div css={css`display:flex; flex-direction: column; align-items:end; justify-content:space-between;`}>
              <div css={dateCSS}>{bookData.regist}</div>
              <BsArrowDownCircleFill css={icons} onClick={() => {modalHandler(); isModalOnHandler(false);}} />
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
    </div>
  );
};

interface wrapperCSSProps {
  modalToggler: boolean;
  parentRef: any;
  wrapperRef: any;
  widthValue: number;
  heightValue: number;
  rotateY: number;
  isOpened: boolean;
  isClosing: boolean;
}

const wrapperCSS = ({
  modalToggler,
  parentRef,
  wrapperRef,
  widthValue,
  heightValue,
  rotateY,
  isOpened,
  isClosing
}: wrapperCSSProps) => {
  // const isLeftEdge =
  //   (widthValue - parentRef?.current?.clientWidth) / 2 >=
  //   parentRef?.current?.getBoundingClientRect().left;
  // const isRightEdge =
  //   parentRef?.current?.getBoundingClientRect().left +
  //     (widthValue - (widthValue - parentRef?.current?.clientWidth) / 2) >=
  //   document.body.offsetWidth;

  // const leftStandard = `left: ${
  //   modalToggler && isLeftEdge === true
  //     ? "42"
  //     : parentRef?.current?.getBoundingClientRect().left -
  //       (widthValue - parentRef?.current?.clientWidth) / 2
  // }px;`; // parentRef?.current?.getBoundingClientRect().left
  // const rightStandard = `left: ${
  //   modalToggler && isRightEdge === true
  //     ? document.body.offsetWidth - widthValue - 42
  //     : parentRef?.current?.getBoundingClientRect().left
  // }px`;

  // const activated = isRightEdge === true ? rightStandard : leftStandard;

  return css`
    /* transform: ${isOpened ? (isClosing ? `rotateY(${rotateY * 1.6}deg)` : null) : `rotateY(${rotateY * 1.6}deg)`} ; */
    position: absolute;
    z-index: 999999999;
    transition-property: width height;
    will-change: width, height, left, top, transform;
    transition-duration: 0.3s;
    /* transition-timing-function: ease-in; */
    overflow: hidden;
    /* left: calc(50vw - ${(widthValue / 2)}px); */
    left: ${modalToggler ? `calc(50vw - ${(widthValue / 2)}px)` : `${parentRef?.current?.getBoundingClientRect().left}px`};
    top: ${modalToggler ? `calc(50vh - ${(heightValue / 2)}px)` : `${parentRef?.current?.getBoundingClientRect().top}px`};
    width: ${modalToggler
      ? `${widthValue}px`
      : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler
      ? `${heightValue}px`
      : `${parentRef?.current?.clientHeight}px`};

    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */
        background-color: ${modalToggler
      ? css`var(--back-color-2)`
      : `rgba(0,0,0,0)`};
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    
  `;
};

interface innerWrapperCSSProps {
  modalToggler: boolean;
  contentToggler: boolean;
  isOpened: boolean;
}

const innerWrapperCSS = ({
  modalToggler,
  contentToggler,
  isOpened,
}: innerWrapperCSSProps) => {
  return css`
    /* opacity: ${contentToggler ? "255" : isOpened ? "255" : "0"}; */
    height: 100%;
    display: flex;
    flex-direction: column;
    
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
    height: 550px;
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
  height: 550px;
  position: absolute;
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0), var(--back-color-2));
  pointer-events: none;
`;

interface imageCSSProps {
  modalToggler: boolean;
  parentRef: any;
  isClosing: boolean;
  imgHeight: string | undefined;
  imgMinHeight: string | undefined;
  isMobile: boolean
}

const imageCSS = ({ modalToggler, parentRef, isClosing, imgHeight, imgMinHeight, isMobile }: imageCSSProps) => {
  return css`
    will-change: width height transform;
    transition-property: width height transform;
    transition-duration: 0.3s;
    ${modalToggler ? `transform: scale(1.0)` : (isClosing ? `transform: scale(1.0)` : `transform: scale(1.1)`)};
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${modalToggler ? (isMobile ? "550px" : "600px") : `${parentRef?.current?.clientHeight}px`};
    min-height: ${imgMinHeight};
  `;
};

const spaceDivCSS = ({isMobile}: {isMobile: boolean}) => {
  return css`
    width: 100%;
    height: ${isMobile ? "550px" : "600px"};
  `;
}

const contentDivCSS = css`
  flex: 1 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
`;

const titleCSS = css`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* width: 40%; */
`;

const dateCSS = css`
  font-size: 13px;
  /* margin-top: 8px; */
  color: var(--text-color-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const icons = css`
  /* background-color: white; */
  color: var(--text-color-4);
  width: 52px;
  height: 52px;
  cursor: pointer;

  transition-property: color;
  transition-duration: 0.3s;

  &:hover {
    color: var(--text-color-3);
  }
`

const starRatingWrapperCSS = css`
  margin-top: 6px;
  margin-bottom: 6px;
`

const bookInfoWrapperCSS = css`
  width: 80%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const additionalInfoWrapperCSS = css`

`

const backdropCSS = ({isOpened, isClosing}: {isOpened: boolean; isClosing: boolean}) => {
  return css`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(30px);
    transition-property: opacity;
    transition-duration: 0.3s;
    opacity: ${isOpened ? (isClosing ? '0%' : '100%') : '0%'};
    
  `
}

const outerWrapperCSS = ({waterfallWrapperRef}: {waterfallWrapperRef: any}) => {
  return css`
    width: ${waterfallWrapperRef?.current?.clientWidth}px;
    height: 100vh;
    perspective: 100vw;
    display: flex;
    align-items: center;
    

  `
}

export default WaterfallCardModal;
