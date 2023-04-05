/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import EmopickListView from "../emopick/EmopickListView"
import { useState, useEffect } from "react"
import { getMyEmopick } from "@/api/emopick/getMyEmopickList"
import { getEmopickList } from "@/api/emopick/getEmopickList"
import { emopickContentType, returnEmopickType } from "@/types/emopick"
import EmopickInfinityScroll from "../emopick/EmopickInfinityScroll"
import DropDownStyled from "../UI/DropDownStyled/DropDownStyled";

const MyPageEmopick = () => {
    
    const getEmopickListAPI = ({
        lastContent,
        size,
      }: {
        lastContent?: emopickContentType;
        size: number;
      }) => {
        const prevId = lastContent ? lastContent.emopickId : 0;
        return getEmopickList({
          prevId,
          size: size,
        });
      };

      const [emopickState, setEmopickState] = useState<number>(0)
      const emopickLabel = ["내가 작성한 이모픽", "댓글을 작성한 이모픽", "좋아요를 누른 이모픽"]

      const [dropdownState, setDropdownState] = useState<boolean>(false)
      const dropDownItems = {
        label: emopickLabel,
        description: ["", "", ""],
        function: [()=>{setEmopickState(() => 0)}, ()=>{setEmopickState(() => 1)}, ()=>{setEmopickState(() => 2)}],
      };

    return (
        <div>

        <div className={'dropdown-wrapper'}>
            <DropDownStyled
                dropDownItems={dropDownItems}
                dropDownState={dropdownState}
                setDropDownState={setDropdownState}
                width={"160px"}
                itemHeight={"40px"}
                direction={"down"}
                borderRadius={"5px"}
                noLiTag={true}
            />

            <div
                css={dropdownCSS}
                onClick={() => {
                    setDropdownState(() => true);
                }}
            >
                {/* <li css={dropdownLiTagCSS} /> */}
                {emopickLabel[emopickState]}
            </div>
            </div>

            <EmopickInfinityScroll API={getEmopickListAPI} identifier={`getMyEmopick`} />
        </div>
    )
}


const dropdownCSS = css`
    width: 160px;
    height: 40px;
    /* box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1); */
    border: 1px solid rgb(220, 220, 220);
    background-color: var(--back-color);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition-property: background-color color;
    transition-duration: 0.2s;
    user-select: none;
    margin-right: 8px;
    margin-bottom: 6px;
    &:hover {
        background-color: var(--main-color-2);
    }
  `


  
  

export default MyPageEmopick