/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ButtonProps {
  text: string;
  onClick: any;
}

export default function LargeWideButton({ text, onClick }: ButtonProps) {
  return (
    <>
      <button css={buttonCSS} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
const buttonCSS = css`
  cursor: pointer;
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 0 20px;
  background-color: var(--main-color);
  color: #fff;
`;
