/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Image from "next/image";
// import darkmode_dark from "/assets/darkmode_dark.png";
// import darkmode_light from "/assets/darkmode_light.png";

interface Props {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const DarkModeToggle = (props: Props) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkMode = localStorage.getItem("data-theme");
    if (darkMode === "dark") {
      props.setIsDarkMode(true);
    } else {
      props.setIsDarkMode(false);
    }
    document.documentElement.setAttribute(
      "data-theme",
      darkMode === "dark" ? "dark" : "light"
    );
  }, []);
  function onChangeDarkMode() {
    const darkMode = localStorage.getItem("data-theme");
    if (darkMode === "dark") {
      // dark > light모드로 바꾸기
      props.setIsDarkMode(false);
    } else {
      // light > dark모드로 바꾸기
      props.setIsDarkMode(true);
    }
    
    document.documentElement.setAttribute(
      "data-theme",
      darkMode === "dark" ? "light" : "dark"
    );
    localStorage.setItem("data-theme", darkMode === "dark" ? "light" : "dark");
  }

  return (
    <button
      id="dark-mode-toggle"
      css={darkModeToggleCSS}
      onClick={onChangeDarkMode}
    >
      <div css={circleCSS(props.isDarkMode)}></div>
      <img alt="darkmode-icon" src={"/assets/darkmode_dark.png"} />
      <img alt="lightmode-icon" src={"/assets/darkmode_light.png"} />
    </button>
  );
};

const darkModeToggleCSS = css`
  position: relative;
  cursor: pointer;
  margin: auto 0;
  height: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  background-color: var(--back-color-2);
  & > img {
    width: 20px;
    height: 20px;
    /* filter: brightness(100) grayscale(100%); */
  }
`;

const circleCSS = (isDarkMode: boolean) => {
  return css`
    position: absolute;
    top: 4px;
    left: 5px;
    transform: ${isDarkMode ? "translateX(29px)" : "translateX(0)"};
    width: 22px;
    height: 22px;
    border-radius: 20px;
    background-color: var(--text-color-4);
    transition: all 0.3s;
  `;
};
