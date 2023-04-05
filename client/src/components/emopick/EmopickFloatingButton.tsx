/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import UseAnimations from "react-useanimations";
// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS
import archive from "react-useanimations/lib/archive";
import Portal from "@/components/function/Portal";
import { HiOutlinePencil } from "react-icons/hi";
import { useState, useRef } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useRouter } from "next/router";

const EmopickFloatingButton = () => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const router = useRouter();
  return (
    <div
      css={floatingButtonWrapperCSS(isMobile)}
      onClick={() => router.push("/emopick/write")}
    >
      <HiOutlinePencil size={isMobile ? 30 : 35} />
      <span></span>
    </div>
  );
};

const floatingButtonWrapperCSS = (isMobile: boolean) => {
  return css`
    position: fixed;
    width: ${isMobile ? "60px" : "80px"};
    height: ${isMobile ? "60px" : "80px"};
    background-color: var(--main-color);
    border-radius: 200px;
    right: ${isMobile ? "20px" : "40px"};
    bottom: ${isMobile ? "75px" : "40px"};
    z-index: 99;
    box-shadow: 0px 0px 5px 1px rgba(150, 150, 150, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: padding;
    transition-duration: 0.2s;
    padding-bottom: 4px;
    cursor: pointer;
    &:hover {
      padding-right: ${isMobile ? "10px" : "14px"};
      & > span {
        left: ${isMobile ? "17px" : "23px"};
        width: ${isMobile ? "23px" : "31px"};
      }
    }
    & > span {
      position: absolute;
      bottom: ${isMobile ? "15px" : "22px"};
      left: ${isMobile ? "22px" : "30px"};
      background-color: var(--text-color);
      width: ${isMobile ? "18px" : "24px"};
      height: ${isMobile ? "2.4px" : "3px"};
      transition: all 0.2s;
    }
  `;
};

export default EmopickFloatingButton;
