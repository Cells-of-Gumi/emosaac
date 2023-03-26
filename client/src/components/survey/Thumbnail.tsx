/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ThumbnailProps {
  src: string;
  alt: string;
  isSelected: boolean;
  onClick: () => void;
}

const Thumbnail = ({ src, alt, isSelected, onClick }: ThumbnailProps) => {
  return (
    <img
      src={src}
      alt={alt}
      css={[imgStyle, thumbnailCSS, isSelected ? dimmedStyle : undefined]}
      onClick={onClick}
    />
  );
};
const imgStyle = css`
  cursor: pointer;
  box-sizing: border-box;
`;

const dimmedStyle = css`
  /* opacity: 0.5; */
  border: 5px solid var(--main-color);
`;

const thumbnailCSS = css`
  width: 100%;
  height: 100%;
`;
export default Thumbnail;
