/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react"
import { useRouter } from "next/router";




const MyPagePersonalInfo = ({myInfo}: {myInfo: any}) => {
    const router = useRouter();

    function onClickMoveEditPage() {
        router.push("/mypage/edit");
    }

    const profileImageSector = (
        <div css={css`display: flex; justify-content: center;`}>
            <div css={profileImageWrapperCSS}>
                <img css={profileImageCSS} src={myInfo.imageUrl} />
            </div>
        </div>
    )

    const profileNicknameSector = (
        <div css={profileIndividualWrapperCSS}>
            <div css={profileIndividualTitleCSS}>닉네임</div>
            <div>{myInfo.nickname}</div>
        </div>
    )

    const profileEmailSector = (
        <div css={profileIndividualWrapperCSS}>
            <div css={profileIndividualTitleCSS}>이메일</div>
            <div>{myInfo.email}</div>
        </div>
    )

    const profilePersonalSector = (
        <div css={profileIndividualWrapperCSS}>
            <div css={profileIndividualTitleCSS}>나이 / 성별</div>
            <div>{myInfo.age}대 {myInfo.gender === 0 ? '남성' : '여성'}</div>
        </div>
    )

    return (
        <div>
            <div css={myInfoTitleWrapperCSS}>
                <div css={myInfoTitleCSS}>계정 정보</div>
                <div css={myInfoEditLinkCSS} onClick={onClickMoveEditPage}>수정</div>
            </div>
            
            {profileImageSector}
            {profileEmailSector}
            {profileNicknameSector}
            {profilePersonalSector}
            
            
        </div>
    )
}

const myInfoTitleWrapperCSS = css`
    display: flex;
    align-items: end;
    margin-bottom: 36px;
`

const myInfoTitleCSS = css`
    font-size: 24px;
    font-weight: 700;
`

const myInfoEditLinkCSS = css`
    margin-left: 8px;
    font-size: 14px;
    color: var(--text-color-4);
    cursor: pointer;
`

const profileImageWrapperCSS = css`
    /* position: relative; */
    width: 128px; // 자를 사이즈를 명시해준다.
    height: 128px;
    border-radius: 200px;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
`

const profileImageCSS = css`
    /* position: absolute; // 포지션을 주고, */
    height: 128px;
    width: auto;
    top: 0; 		  // 보이기 원하는 위치를 지정
    left: 0;
    background-color: var(--main-color);
`

const profileIndividualWrapperCSS = css`
    width: 100%;
    height: 84px;
    border-bottom: 1px solid var(--back-color-2);
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const profileIndividualTitleCSS = css`
    font-size: 14px;
    color: var(--text-color-4);
    margin-bottom: 6px;
`

export default MyPagePersonalInfo