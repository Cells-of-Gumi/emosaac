/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import UseAnimations from 'react-useanimations';
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import archive from 'react-useanimations/lib/archive'
import Portal from "@/components/function/Portal";
import FloatingButtonModal from "./FloatingButtonModal";
import { useState, useRef } from "react";

const FloatingButton = ({isDarkMode}: {isDarkMode: boolean}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [modalToggler, setModalToggler] = useState<boolean>(false);
    const [isMouseOn, setIsMouseOn] = useState<boolean>(false);


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
        <div css={floatingButtonWrapperCSS({modalToggler})} ref={wrapperRef} onClick={showModal}>
            {modalToggler && modal}
            <UseAnimations strokeColor={'var(--text-color)'} animation={archive} size={50} />
        </div>
    )
}


const floatingButtonWrapperCSS = ({modalToggler}: {modalToggler: boolean}) => {
    return css`
        position: fixed;
        width: 80px;
        height: 80px;
        background-color: var(--back-color);
        border-radius: 200px;
        right: 40px;
        bottom: 40px;
        z-index: 9999;
        box-shadow: 0px 0px 5px 1px rgba(150, 150, 150, 0.4);
        display: flex;
        visibility: ${modalToggler ? 'hidden' : 'block'};
        justify-content: center;
        
        padding-top: 7px;
        transition-property: padding;
        transition-duration: 0.2s;
        cursor: pointer;
        &:hover {
            padding-top: 14px;
        }
    `
} 

export default FloatingButton