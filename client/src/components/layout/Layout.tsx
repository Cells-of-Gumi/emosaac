/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { NavigationBar } from "../UI/NavigationBar/NavigationBar";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Props {
  children: any;
  myInfo: any;
  isDarkMode: boolean;
  setIsDarkMode: Function;
}

const Layout = (props: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return (
    <div css={backCSS({ isDeskTop, isTablet, isMobile })}>
      <NavigationBar
        myInfo={props.myInfo}
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
      />
      {props.children}
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const backCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    width: 100vw;
    height: 100vh;
    background-color: var(--back-color);
    color: var(--text-color);
    ${isDeskTop
      ? "padding-top: 70px;"
      : isTablet
      ? "padding-top: 110px;"
      : "padding: 60px 0 75px;"}
  `;
};

export default Layout;
