/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { NavigationBar } from "../UI/NavigationBar/NavigationBar";
import { useIsResponsive } from "../Responsive/useIsResponsive";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Props {
  children: any;
  myInfo: any;
}

const Layout = (props: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [isHome, setIsHome] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.asPath === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
    console.log(router.asPath);
  }, [router.asPath]);

  return (
    <div css={backCSS({ isDeskTop, isTablet, isMobile, isHome })}>
      <NavigationBar myInfo={props.myInfo} />
      {props.children}
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isHome: boolean;
}

const backCSS = ({ isDeskTop, isTablet, isMobile, isHome }: IsResponsive) => {
  return css`
    width: 100vw;
    height: 100vh;
    background-color: var(--back-color);
    color: var(--text-color);
    ${!isHome && isDeskTop
      ? "padding-top: 70px;"
      : isTablet
      ? "padding-top: 110px;"
      : isMobile
      ? "padding: 60px 0 75px;"
      : null}
    ${isHome && isDeskTop
      ? "padding-top: 0px;"
      : isTablet
      ? "padding-top: 0px;"
      : isMobile
      ? "padding: 0px 0px 75px;"
      : null}
  `;
};

export default Layout;
