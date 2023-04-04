/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { throttle } from "lodash";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useRouter } from "next/router"
import { bookDetailType } from "@/types/books";
import { getBookDetail } from "@/api/book/getBookDetail";

import UseAnimations from 'react-useanimations';
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import radioButton from 'react-useanimations/lib/radioButton'

import Button from "@/components/UI/Button/Button";
import { postOcr } from "@/api/ocr/postOcr";

import FloatingButtonModalSubmitForm from "./FloatingButtonModalSubmitForm";
import FloatingButtonModalLoading from "./FloatingButtonModalLoading";
import FloatingButtonModalFinish from "./FloatingButtonModalFinish";
import ScanMain from "../ScanMain";

import { bookContentType } from "@/types/books";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";



interface FloatingButtonModalProps {
  modalToggler: boolean;
  isMouseOn: boolean;
  setModalToggler: Function;
  parentRef: any;
  isDarkMode: boolean;

}

const FloatingButtonModal = ({
  modalToggler,
  isMouseOn,
  setModalToggler,
  parentRef,
  isDarkMode
}: FloatingButtonModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [contentToggler, setContentToggler] = useState<boolean>(false);
  const [isOpened, setisOpened] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const router = useRouter()

  const [beforePhase, setBeforePhase] = useState<number>(0)
  const [afterPhase, setAfterPhase] = useState<number>(0)

  const [bookData, setBookData] = useState<bookContentType[] | null>(null)

  const phaseHandler = (phase: number) => {
    setBeforePhase(() => phase)
    setTimeout(() => {
      setAfterPhase(() => phase)
    }, 500)
  }


  useEffect(() => {
    
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = 'auto';
    };
    
  }, [])

  const modalLayout = {
    widthValue: beforePhase === 0 ? (isMobile ? 360 : 450) : (beforePhase === 1 ? 280 : (beforePhase === 2 ? (isMobile ? 360 : 1920) : (beforePhase === 3 ? 300 : 300))),
    heightValue: beforePhase === 0 ? 538 : (beforePhase === 1 ? 280 : (beforePhase === 2 ? (isMobile ? 620 : 1080) : (beforePhase === 3 ? 300 : 300))),
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
        
      }, 500);
      
      setTimeout(function () {
        setModalToggler(() => false);
        
        
      }, 500);
    } else {
      setModalToggler(() => false);
    }
    setContentToggler(() => false);
    setIsClosing(() => true)
  };


  const onClickSubmitHandler = ({image, contentType}: {image: File | null, contentType: 0 | 1}) => {
    
    if( image !== null && contentType !== null) {
      phaseHandler(1)
      postOcr({file: image, typeCode: contentType})
      .then((res) => {
        setBookData(() => res)
        phaseHandler(2)

        console.log(res)
      })
    }
  }


  return (
    <React.Fragment>
      <div css={backdropCSS({isOpened, isClosing})} />
      <div
        // onClick={modalHandler}
        // onWheelCapture={onWheelHandler}
        
        ref={wrapperRef}
        css={wrapperCSS({
          modalToggler: contentToggler,
          parentRef: parentRef,
          wrapperRef: wrapperRef,
          widthValue: modalLayout.widthValue,
          heightValue: modalLayout.heightValue,
          isClosing,
          isOpened
        })}
      >
        <div
          className={'inner-wrapper'}
          css={innerWrapperCSS({
            modalToggler: modalToggler,
            contentToggler: contentToggler,
            isOpened: isOpened,
          })}
        >

          {afterPhase === 0 &&
            <div css={phaseCSS({targetPhase: 0, beforePhase: beforePhase, afterPhase: afterPhase})}>
              <FloatingButtonModalSubmitForm modalHandler={modalHandler} phaseHandler={phaseHandler} onClickSubmitHandler={onClickSubmitHandler} isDarkMode={isDarkMode} />
            </div>
          }

          {afterPhase === 1 &&
            <div css={phaseCSS({targetPhase: 1, beforePhase: beforePhase, afterPhase: afterPhase})}>
              <FloatingButtonModalLoading/>
            </div>
          }

          {afterPhase === 2 && bookData !== null &&
            <div css={phaseCSS({targetPhase: 2, beforePhase: beforePhase, afterPhase: afterPhase})}>
              <ScanMain bookData={bookData} phaseHandler={phaseHandler} />
            </div>
          }
          
          {afterPhase === 3 &&
            <div css={phaseCSS({targetPhase: 3, beforePhase: beforePhase, afterPhase: afterPhase})}>
              <FloatingButtonModalFinish modalHandler={modalHandler} phaseHandler={phaseHandler} />
            </div>
          }




          
        </div>
      </div>
    </React.Fragment>
  );
};

interface wrapperCSSProps {
  modalToggler: boolean;
  parentRef: any;
  wrapperRef: any;
  widthValue: number;
  heightValue: number;
  isClosing: boolean;
  isOpened: boolean;
}

const wrapperCSS = ({
  modalToggler,
  parentRef,
  wrapperRef,
  widthValue,
  heightValue,
  isClosing,
  isOpened
}: wrapperCSSProps) => {


  return css`
    position: absolute;
    /* z-index: 9; */
    transition-property: width height;
    will-change: width height left top transform;
    transition-duration: 0.5s;
    
    /* transition-timing-function: ease-in; */
    overflow: hidden;

    width: ${modalToggler
      ? `${widthValue === 1920 ? '100vw' : widthValue + 'px'}`
      : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler
      ? `${heightValue === 1080 ? '100vh' : heightValue + 'px'}`
      : `${parentRef?.current?.clientHeight}px`};
    left: ${modalToggler ? (widthValue === 1920 ? '0px' : `calc(50vw - ${(widthValue / 2)}px)`) : `${parentRef?.current?.getBoundingClientRect().left}px`};
    top: ${modalToggler ?  (heightValue === 1080 ? '0px' : `calc(50vh - ${(heightValue / 2)}px)`) : `${parentRef?.current?.getBoundingClientRect().top}px`};


    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */

    background-color: var(--back-color-2);
    border-radius: ${modalToggler
      ? '10px'
      : `200px`};
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
    justify-content: space-between;
    
  `;
};

const phaseCSS = ({targetPhase, beforePhase, afterPhase}: {targetPhase: number; beforePhase: number; afterPhase: number;}) => {

  return css`
    transition-property: opacity;
    transition-duration: 0.5s;
    opacity: ${beforePhase === targetPhase ? '100%' : '0%'};
    width: 100%;
    height: 100%;
  `

}



const backdropCSS = ({isOpened, isClosing}: {isOpened: boolean; isClosing: boolean}) => {
  return css`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(10px);
    transition-property: opacity;
    transition-duration: 0.3s;
    opacity: ${isOpened ? (isClosing ? '0%' : '100%') : '0%'};
    
  `
}


export default FloatingButtonModal;
