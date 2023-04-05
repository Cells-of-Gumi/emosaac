/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import UseAnimations from "react-useanimations";
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import archive from "react-useanimations/lib/archive";
import Portal from "@/components/function/Portal";
import FloatingButtonModal from "./FloatingButtonModal";
import { useState, useRef } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

const FloatingButton = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [modalToggler, setModalToggler] = useState<boolean>(false);
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();

  const showModal = () => {
    setModalToggler(() => true);
    setIsMouseOn(() => true);
  };

  const hideModal = () => {
    setIsMouseOn(() => false);
    setTimeout(function () {
      setModalToggler(() => false);
    }, 500);
  };

  const modal = (
    <Portal selector=".overlay-root">
      <FloatingButtonModal
        modalToggler={modalToggler}
        isMouseOn={isMouseOn}
        setModalToggler={setModalToggler}
        parentRef={wrapperRef}
        isDarkMode={isDarkMode}
      />
    </Portal>
  );

  return (
    <div
      css={floatingButtonWrapperCSS({ modalToggler, isMobile })}
      ref={wrapperRef}
      onClick={showModal}
    >
      {modalToggler && modal}
      <div css={iconWrapperCSS({modalToggler})}>
        <UseAnimations
          strokeColor={"var(--text-color)"}
          animation={archive}
          size={isMobile ? 35 : 50}
        />
      </div>
      
    </div>
  );
};

const floatingButtonWrapperCSS = ({
  modalToggler,
  isMobile,
}: {
  modalToggler: boolean;
  isMobile: boolean;
}) => {
  return css`
    position: fixed;
    width: ${isMobile ? "60px" : "80px"};
    height: ${isMobile ? "60px" : "80px"};
    background-color: var(--back-color);
    border-radius: 200px;
    right: ${isMobile ? "20px" : "40px"};
    bottom: ${isMobile ? "75px" : "40px"};
    z-index: 99;
    box-shadow: 0px 0px 5px 1px rgba(150, 150, 150, 0.4);
    display: flex;
    visibility: ${modalToggler ? "hidden" : "block"};
    justify-content: center;
    padding-top: 7px;
    cursor: pointer;
    &:hover {
      padding-top: 14px;
    }
  `;
};



const iconWrapperCSS = ({
  modalToggler,

}: {
  modalToggler: boolean;

}) => {
  return css`
    visibility: ${modalToggler ? "hidden" : "block"};
    opacity: ${modalToggler ? "0%" : "100%"};
    transition-property: opacity;
    transition-duration: 0.5s;

  `;
};

export default FloatingButton;
