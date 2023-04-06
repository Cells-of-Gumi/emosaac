/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import OauthLoginButton from "../OauthLogin/OauthLoginButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

const RequireUserInfo = ({modalHandler}: {modalHandler?: Function}) => {
    const router = useRouter();
    const [isDeskTop, isTablet, isMobile] = useIsResponsive();
    const [currentTheme, setCurrentTheme] = useState<any>()

    const onClickNaver = () => {
      const authUrl = process.env.NEXT_PUBLIC_NAVER_AUTH_URL ?? "";
      // console.log(authUrl);
      window.location.href = authUrl;
    };
    const onClickKakao = () => {
      const authUrl = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL ?? "";
      // console.log(authUrl);
      window.location.href = authUrl;
    };

    useEffect(() => {
        const temp = document.documentElement.getAttribute("data-theme")
        setCurrentTheme(() => temp)
        
    }, [])

    return (
        <div css={formWrapperCSS({isMobile})}>
            <div css={headerCSS}>
                <img
                css={imageWrapperCSS(isDeskTop)}
                src={currentTheme === 'dark' ? "/assets/emosaac_logo_white.png" : "/assets/emosaac_logo.png"}
                alt="이모작의 로고입니다."
                />
                <div css={css`margin-top: 16px;`}>추천을 위한 정보 입력이 필요해요!</div>
                <div>설문 조사와 닉네임, 성별, 나이대를 입력해 주세요!</div>
            </div>
            
            <div css={buttonWrapperCSS}>

                    <Button width={'50%'} height={'64px'} onClick={modalHandler}>확인</Button>

          
            </div>
            

        </div>
    )
}

const formWrapperCSS = ({isMobile}: {isMobile: boolean}) => {
    return css`
        width: ${isMobile ? '90vw' : '400px'};
        height: ${isMobile ? '35vh' : '350px'};
        min-width: 340px;
        background-color: var(--back-color);
        border-radius: 20px;
        color: var(--text-color);

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
        
    `
}

const headerCSS = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 10vh;
    justify-content: space-evenly;
`


const imageWrapperCSS = (isDeskTop: boolean) => css`
  /* width: 70%;
  height: 70%; */
  /* 범위 안에서 안 짤리게 */
  /* cover는 짤리더라도 꽉 채우게 */
  object-fit: contain;
`;

const buttonWrapperCSS = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const eachButtonCSS = css`
  margin-bottom: 50px;
`;


export default RequireUserInfo