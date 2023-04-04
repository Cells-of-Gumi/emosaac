/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

interface Props {
  titleList: string[];
}

export const EmopickBookSearchRes = ({ titleList }: Props) => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  return (
    <div css={searchBarWrapCSS({ isDeskTop, isTablet, isMobile })}>
      <div css={searchIconCSS}>
        <FiSearch color={"#000"} />
      </div>
      <input
        disabled
        type="text"
        placeholder="작품을 찾아보세요."
        css={inputWrapCSS}
        value={
          titleList.length < 3
            ? titleList.join(", ")
            : titleList.slice(0, 2).join(", ") + ` 외 ${titleList.length - 2}건`
        }
      />
      <button id="search_book_button" type="button">
        {/* <FiPlus size={isMobile ? 20 : 24} />  */}
        작품 추가하기
      </button>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const searchBarWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    position: relative;
    display: grid;
    ${!isMobile && "grid-template-columns: 20px 1fr 20px 100px;"}
    ${isMobile && "grid-template-columns: 20px 1fr;"}
    column-gap: 20px;
    height: ${isMobile ? "40px" : "50px"};
    background-color: var(--main-color-2);
    /* border: 1px solid var(--border-color); */
    border-radius: 5px;
    font-weight: bold;
    & > input {
      color: #000;
      background-color: var(--main-color-2);
      font-size: ${isDeskTop ? "16px" : isTablet ? "14px" : "13px"};
    }
    & > * {
      margin: auto 0;
    }
    & > button {
      & > svg {
        margin-right: 6px;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: absolute;
      right: 0;
      height: ${isMobile ? "40px" : "50px"};
      background-color: var(--main-color);
      color: #000;
      padding: ${isMobile ? "0 15px" : "0 15px"};
      border-radius: 5px;
      font-size: ${isDeskTop ? "16px" : isTablet ? "14px" : "13px"};
    }
  `;
};

const searchIconCSS = css`
  & > * {
    margin-left: 14px;
  }
`;

const inputWrapCSS = css`
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--back-color-2);
  ::placeholder {
    font-weight: bold;
  }
`;
