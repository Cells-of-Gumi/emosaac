/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { returnGenresType } from "@/types/books";
import { useIsResponsive } from "../Responsive/useIsResponsive";


const DayList = ({ selected, selectHandler }: { selected: number, selectHandler: Function }) => {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const days = ['월', '화', '수', '목', '금', '토', '일']
  const renderGenres = days.map((el, idx) => {
      return (
        <>
         <div css={tagWrapperCSS({selected: selected, curIdx: idx, isMobile: isMobile})} onClick={() => {selectHandler(idx)}}>{el}</div>

         
        </>
        
      );
  });

  return (
    <div css={outerWrapperCSS({isMobile})}>
        <div css={tagListWrapperCSS({isMobile})}>
          {renderGenres}
        </div>
    </div>
    
  );
};

const outerWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
  return css`
    /* position: relative; */
    /* height: 16px; */
    height: ${isMobile ? '48px' : '84px'};;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* padding-left: 132px; */
    display: flex;
    margin: 0px 24px 0px 24px;
    background-color: var(--soft-grey);
  `
} 

const tagListWrapperCSS = ({isMobile}: {isMobile: boolean}) => {

  const mask = `
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
  `

  return css`
    display: flex;
  /* position: absolute; */
  /* margin-top: 12px; */
    
    overflow-x: scroll;
    padding-left: ${isMobile ? '10px' : '0px'};
    margin-left: ${isMobile ? '0px' : '0px'};
    
    padding-right: ${isMobile ? '10px' : '0px'};
    ${isMobile && mask}
    

    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  `;

} 

const tagWrapperCSS = ({selected, curIdx, isMobile}: {selected: number, curIdx: number, isMobile: boolean}) => {
  return css`
    /* border-radius: 100px; */
    /* background-color: var(--back-color-2); */
    padding: 14px;
    margin-right: ${isMobile ? '0px' : '16px'};
    /* margin-bottom: 16px; */
    /* color: black; */
    white-space:pre;;
    color: ${selected === curIdx ? 'var(--main-color)' : 'var(--text-color-2)'};
    font-size: ${isMobile ? '16px' : '24px'};
    font-weight: 700;
    cursor: pointer;
    transition-property: color;
    transition-duration: 0.1s;
    user-select: none;
    &:hover {
      color: ${selected === curIdx ? 'var(--main-color)' : 'var(--text-color-4)'};
    }
  `;
}



export default DayList;
