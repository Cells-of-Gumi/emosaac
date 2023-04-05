/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useState, Dispatch, SetStateAction } from "react";
import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

interface Props {
  cateList: string[];
  selectedCate: string;
  isDropDownOpen: boolean;
  setSelectedCate: Dispatch<SetStateAction<string>>;
  setIsDropDownOpen: Dispatch<SetStateAction<boolean>>;
  setIsSearchBoxOpen?: Dispatch<SetStateAction<boolean>>;
}

export const DropDown = (props: Props) => {
  const [selectArr, setSelectArr] = useState(props.cateList);
  // const [selectedCate, setSelectedCate] = useState("전체");
  // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  function onClickDropDown() {
    props.setIsDropDownOpen(!props.isDropDownOpen);
    props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(true);
  }
  function onClickSelected(selected: string) {
    props.setSelectedCate(selected);
  }
  return (
    <div css={dropDownWrapCSS} onClick={onClickDropDown}>
      {props.selectedCate}
      <HiOutlineChevronDown />
      <div css={dropDownBoxCSS(props.isDropDownOpen)}>
        <div css={selectedCSS}>
          <div>{props.selectedCate}</div>
          <HiOutlineChevronDown />
        </div>
        {selectArr.map((selected, idx) => (
          <div key={idx} onClick={() => onClickSelected(selected)}>
            {selected}
          </div>
        ))}
      </div>
    </div>
  );
};

const dropDownWrapCSS = css`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  height: 100%;
  font-size: 14px;
`;
const dropDownBoxCSS = (isDropDownOpen: boolean) => {
  return css`
    /* ${isDropDownOpen ? "display : block;" : "display : none;"} */
    ${isDropDownOpen ? "visibility: visible;" : "visibility: hidden;"}
    ${isDropDownOpen ? "opacity : 1;" : "opacity: 0;"}
    transition: all 0.3s;
    position: absolute;
    top: 0;
    left: -10px;
    width: 110px;
    height: 138px;
    padding: 0 10px 20px;
    background-color: var(--back-color-3);
    color: var(--text-color);
    font-size: 14px;
    border-radius: 5px;
    font-weight: normal;
    & > div:nth-of-type(n + 2) {
      height: 30px;
      & :hover {
        filter: var(--hover-color);
      }
    }
  `;
};

const selectedCSS = css`
  height: 45px;
  line-height: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
