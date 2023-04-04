/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "../../Responsive/useIsResponsive";

interface RowTitleProps {
    beforeLabel?: string;
    highlightedLabel?: string;
    afterLabel?: string;
    noLine?: true;
    marginBottom?: string;
}

const RowTitle = ({beforeLabel, highlightedLabel, afterLabel, noLine, marginBottom}: RowTitleProps) => {
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();

    return (
        <div css={rowTitleWrapperCSS({marginBottom})}>
            {noLine !== true && <div css={lineCSS} />}
            <div css={labelWrapperCSS}>
                <span css={normalLabelCSS({isMobile})}>{beforeLabel}</span>
                <span css={highlightedLabelCSS({isMobile})}>{highlightedLabel}</span>
                <span css={normalLabelCSS({isMobile})}>{afterLabel}</span>
            </div>
            
        </div>
    )
}

interface rowTitleWrapperCSSProps {
    marginBottom: string | undefined;
}

const rowTitleWrapperCSS = ({marginBottom}: rowTitleWrapperCSSProps) => {

    return css`
        width: 100%;
        height: 36px;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: ${marginBottom !== undefined ? marginBottom : `24px`};
    `
}


const lineCSS = css`
    width: 100%;
    height: 1px;
    background-color: var(--border-color-2);
`

const labelWrapperCSS = css`
    position: absolute;
    background-color: var(--back-color);
    padding: 24px;
    /* left: 1%; */
`

const normalLabelCSS = ({isMobile} : {isMobile: boolean}) => {
    return css`
        font-size: ${isMobile ? '16px' : '28px'};
        color: var(--text-color);
    `
}

const highlightedLabelCSS = ({isMobile} : {isMobile: boolean}) => {
    return css`
        font-size: ${isMobile ? '24px' : '36px'};
        color: #FF6565;
    `
}


export default RowTitle