/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ButtonProps {
  onClick: any;
  width: string;
  height: string;
  children: any;
  cancelTheme?: boolean;
}

export default function Button({ onClick, width, height, children, cancelTheme }: ButtonProps) {
  return (
    <>
      <button css={buttonCSS({width, height, cancelTheme})} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

interface buttonCSSProps {
  width: string;
  height: string;
  cancelTheme: boolean | undefined;
}

const buttonCSS = ({width, height, cancelTheme}: buttonCSSProps) => {
  return css`
    cursor: pointer;
    width: ${width};
    height: ${height};
    border: none;
    border-radius: 5px;
    font-size: 16px;
    padding: 0 20px;
    background-color: ${cancelTheme ? 'var(--back-color)' : 'var(--main-color)'};
    border: ${cancelTheme && '1px solid var(--border-color-2)'};
    /* color: black; */
  `;
}