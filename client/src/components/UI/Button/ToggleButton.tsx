/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ButtonProps {
  text: string;
  isClicked: boolean;
  onClick?: any;
}
const ToggleButton = ({ text, isClicked, onClick }: ButtonProps) => {
  return (
    <>
      <button css={buttonCSS(isClicked)} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

const buttonCSS = (isClicked: boolean) => {
  return css`
    cursor: pointer;
    font-size: 14px;
    width: fit-content;
    height: 30px;
    line-height: 30px;
    ${isClicked &&
    "border: 1px solid var(--main-color); background-color: var(--main-color); color: black;"}
    ${!isClicked &&
    "border: 1px solid var(--back-color); background-color: var(--back-color); color: var(--text-color);"}
    border-radius: 20px;
    padding: 0 10px;
    :hover {
      transition: all 0.2s;
      ${!isClicked &&
      "border: 1px solid var(--main-color-2); background-color: var(--main-color-2); color: var(--text-color);"}
    }
  `;
};

export default ToggleButton;
