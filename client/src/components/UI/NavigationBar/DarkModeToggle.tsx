/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import darkmode_dark from "@/assets/darkmode_dark.png";
import darkmode_light from "@/assets/darkmode_light.png";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);
  function onChangeDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <button
      id="dark-mode-toggle"
      css={darkModeToggleCSS}
      onClick={onChangeDarkMode}
    >
      <div css={circleCSS(isDarkMode)}></div>
      <Image alt="darkmode-icon" src={darkmode_dark} />
      <Image alt="lightmode-icon" src={darkmode_light} />
    </button>
  );
};

const darkModeToggleCSS = css`
  position: relative;
  cursor: pointer;
  margin: auto 0;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  background-color: var(--back-color-2);
  & > img {
    width: 25px;
    height: 25px;
    /* filter: brightness(100) grayscale(100%); */
  }
`;

const circleCSS = (isDarkMode: boolean) => {
  return css`
    position: absolute;
    top: 6px;
    left: 6px;
    transform: ${isDarkMode ? "translateX(40px)" : "translateX(0)"};
    width: 28px;
    height: 28px;
    border-radius: 20px;
    background-color: var(--text-color-4);
    transition: all 0.3s;
  `;
};