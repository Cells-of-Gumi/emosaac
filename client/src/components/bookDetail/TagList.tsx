/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";

interface TagListProps {
  tag: string;
}

const TagList = ({ tag }: TagListProps) => {

  const renderTags = tag.split(" ").map((el, idx) => {
    if (el.trim() !== '') {
        return <div css={tagWrapperCSS}>#{el},</div>;
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
`

const tagListWrapperCSS = css`
  display: flex;
position: absolute;
  /* margin-top: 12px; */
    width: 110%;
    overflow: scroll;
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
  color: black;
  white-space:pre;;
  color: var(--text-color-4);
`;

export default TagList;
