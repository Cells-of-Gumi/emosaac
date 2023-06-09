/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import styles from "./FixedModal.module.css";
import ReactDOM from "react-dom";
import { useRouter } from 'next/router'

// 모달창 자체
const ModalOverlay = (props : {width?: string, height?: string, content: any, modalState: any, stateHandler: any, overflow?: string, forced?: boolean, blur?: boolean, isDarkMode?: boolean; }) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href);

  //   const preventBack = async () => {
  //     await modalHandler();
  //     await window.history.pushState(
  //       null,
  //       document.title,
  //       window.location.href
  //     );
  //   };
  //   window.addEventListener("popstate", preventBack);
  //   return () => {
  //     window.removeEventListener("popstate", preventBack);
  //   };
  // }, [window.history]);


  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      if (as !== router.asPath && props.forced !== true) {
        window.history.pushState('', '');
        router.push(router.asPath);
        modalHandler();
        return false
      }
      if (props.forced === true) {
        setShowModal(() => false)
        setTimeout(() => {props.stateHandler(() => false)}, 300)
      }

      return true
    })
    return () => {
    router.beforePopState(() => true);
    };
  }, [])




  useEffect(() => {
    setShowModal(() => true)
    
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = 'auto';
    };
    
  }, [])

  const modalHandler = () => {
    if (props.forced !== true) {
      setShowModal(() => false)
      setTimeout(() => {props.stateHandler(() => false)}, 300)
    } 
    
  }

  const content = React.cloneElement(props.content, {
    ...props,
    modalHandler: modalHandler,
    
  });

  return (
    <div css={backdrop({showModal: showModal, blur: props.blur})} onClick={modalHandler}>
      <div css={modalCSS({width: props.width, height: props.height, overflow: props.overflow, showModal: showModal})} onClick={(event) => {event.stopPropagation()}}>  
          {content}
      </div>
    </div>
  );
};

const FixedModal = (props : {width?: string, height?: string, content: any, modalState: any, stateHandler: any, overflow?: string, forced?: boolean, blur?: boolean, isDarkMode?: boolean}) => {
  const [modal, setModal] = useState<any>()
  useEffect(() => {
    setModal(() => ReactDOM.createPortal(
      <ModalOverlay {...props}  />,
      document.getElementById("overlay-root")! as HTMLDivElement
    ))
  }, [])
  return <React.Fragment>{props.modalState && modal}</React.Fragment>;
};

export default FixedModal;


const backdrop = ({showModal, blur}: {showModal: boolean; blur: boolean | undefined}) => {
  return css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${showModal ? 255 : 0};
    transition-property: opacity;
    transition-duration: 0.3s;
    ${blur && 'backdrop-filter: blur(5px);'}
  `
} 

const modalCSS = ({width, height, overflow, showModal}: {width: string | undefined, height: string | undefined, overflow: string | undefined, showModal: boolean}) => {
  return css`
    position: relative;
    transition-property: top;
    transition-duration: 0.3s;
    width: ${width};
    height: ${height};
    overflow: ${overflow};
    top: ${showModal ? "0px" : "100%"};

  
  `
}

