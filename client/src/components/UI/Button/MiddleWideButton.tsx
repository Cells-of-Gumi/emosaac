/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ButtonProps {
  text: string;
  onClick: any;
  myInfo?: any;
}

export default function MiddleWideButton({
  text,
  onClick,
  myInfo,
}: ButtonProps) {
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
  height: 45px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 0 20px;
  background-color: var(--main-color);
  color: #fff;
`;
