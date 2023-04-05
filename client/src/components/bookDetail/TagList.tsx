/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

interface TagListProps {
  identifier: string;
  tag: string;
}

const TagList = ({identifier, tag }: TagListProps) => {
  const router = useRouter()

  const onClickTagHandler = (value: string) => {
    router.push(`/search/tagname?type=total&query=${value}`);
  }
  const renderTags = tag?.split(" ").map((el, idx) => {
    if (el.trim() !== "") {
      return <div key={`${identifier}-${el}`} css={tagWrapperCSS} onClick={() => {onClickTagHandler(el)}}>#{el},</div>;
    }
  });

 
  return (
    <div css={outerWrapperCSS}>
      <div css={tagListWrapperCSS}>{renderTags}</div>
    </div>
  );
};

const outerWrapperCSS = css`
  position: relative;
  height: 16px;
`;

const tagListWrapperCSS = css`
  display: flex;
  position: absolute;
  /* margin-top: 12px; */
  width: 110%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 50px;
  /* padding-right: -20px; */
  margin-left: -50px;
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    var(--back-color) 5%,
    var(--back-color) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    var(--back-color) 5%,
    var(--back-color) 90%,
    rgba(0, 0, 0, 0) 100%
  );

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const tagWrapperCSS = css`
  /* border-radius: 20px; */
  /* background-color: var(--main-color); */
  /* padding: 14px; */
  margin-right: 14px;
  /* margin-bottom: 14px; */
  /* color: black; */
  white-space: pre;
  color: var(--text-color-4);
  cursor: pointer;
`;

export default TagList;
