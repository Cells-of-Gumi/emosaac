/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { NavigationBar } from "../UI/NavigationBar/NavigationBar";
import { useIsResponsive } from "../Responsive/useIsResponsive";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return (
    <div css={backCSS({ isDeskTop, isTablet, isMobile })}>
      <NavigationBar />
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
    ${isDeskTop && "padding-top: 70px;"}
    ${isTablet && "padding-top: 110px;"}
    ${isMobile && "padding: 60px 0 75px;"}
  `;
};

export default Layout;
