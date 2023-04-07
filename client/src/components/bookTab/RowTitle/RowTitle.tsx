/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "../../Responsive/useIsResponsive";
import { useState } from "react";

interface RowTitleProps {
  beforeLabel?: string;
  highlightedLabel?: string;
  afterLabel?: string;
  noLine?: true;
  marginBottom?: string;
  backgroundColor?: string;
}

const RowTitle = ({
  beforeLabel,
  highlightedLabel,
  afterLabel,
  noLine,
  marginBottom,
  backgroundColor
}: RowTitleProps) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <div css={rowTitleWrapperCSS({ marginBottom, loading })}>
      <img css={css`display:none; position: absolute; pointer-events: none;`} src={"/assets/emosaac_logo.png"} onLoad={() => {setLoading(() => false)}} />
      {noLine !== true && <div css={lineCSS} />}
      <div css={labelWrapperCSS({backgroundColor})}>
        <span css={normalLabelCSS({ isMobile })}>{beforeLabel}</span>
        <span css={highlightedLabelCSS({ isMobile })}>{highlightedLabel}</span>
        <span css={normalLabelCSS({ isMobile })}>{afterLabel}</span>
      </div>
    </div>
  );
};

interface rowTitleWrapperCSSProps {
  marginBottom: string | undefined;
  loading: boolean;
}

const rowTitleWrapperCSS = ({ marginBottom, loading }: rowTitleWrapperCSSProps) => {
  return css`
    width: 100%;
    height: 36px;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: ${marginBottom !== undefined ? marginBottom : `24px`};

    transition-property: opacity;
    transition-duration: 0.3s;
    transition-delay: 0.5s;
    opacity: ${loading === false ? '100%' : '0%'}; 
  `;
};

const lineCSS = css`
  width: 100%;
  height: 1px;
  background-color: var(--border-color-2);
`;

const labelWrapperCSS = ({backgroundColor}: {backgroundColor: string | undefined}) => {
  return css`
    position: absolute;
    background-color: ${backgroundColor ? backgroundColor : 'var(--back-color)'};
    padding: 12px;
    /* left: 1%; */
  `;
}

const normalLabelCSS = ({ isMobile }: { isMobile: boolean }) => {
  return css`
    font-size: ${isMobile ? "16px" : "28px"};
    color: var(--text-color);
  `;
};

const highlightedLabelCSS = ({ isMobile }: { isMobile: boolean }) => {
  return css`
    font-size: ${isMobile ? "24px" : "36px"};
    color: #ff6565;
  `;
};

export default RowTitle;
