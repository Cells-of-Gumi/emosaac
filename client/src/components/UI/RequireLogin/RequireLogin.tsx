/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import OauthLoginButton from "../OauthLogin/OauthLoginButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RequireLogin = () => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [currentTheme, setCurrentTheme] = useState<any>();

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
    const temp = document.documentElement.getAttribute("data-theme");
    setCurrentTheme(() => temp);
  }, []);

  return (
    <div css={formWrapperCSS({ isMobile })}>
      <div css={headerCSS}>
        <img
          css={imageWrapperCSS(isDeskTop)}
          src={
            currentTheme === "dark"
              ? "/assets/emosaac_logo_white.png"
              : "/assets/emosaac_logo.png"
          }
          alt="이모작의 로고입니다."
        />
        <div>로그인이 필요한 서비스입니다.</div>
      </div>

      <div css={buttonWrapperCSS}>
        <div css={eachButtonCSS}>
          <OauthLoginButton
            src={"/assets/social_kakao.png"}
            alt={"카카오 로그인"}
            text={"카카오로 로그인"}
            backgroundColor="#FEE502"
            color="#000"
            onClick={onClickKakao}
          />
        </div>
        <div>
          <OauthLoginButton
            src={"/assets/social_naver.png"}
            alt={"네이버 로그인"}
            text={"네이버로 로그인"}
            backgroundColor="#24CD0B"
            color="#FFF"
            onClick={onClickNaver}
          />
        </div>
      </div>
    </div>
  );
};

const formWrapperCSS = ({ isMobile }: { isMobile: boolean }) => {
  return css`
    width: ${isMobile ? "80vw" : "400px"};
    height: ${isMobile ? "60vh" : "500px"};
    min-width: 340px;
    background-color: var(--back-color);
    border-radius: 20px;
    color: var(--text-color);

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  `;
};

const headerCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10vh;
  justify-content: space-evenly;
`;

const imageWrapperCSS = (isDeskTop: boolean) => css`
  /* width: 70%;
  height: 70%; */
  /* 범위 안에서 안 짤리게 */
  /* cover는 짤리더라도 꽉 채우게 */
  object-fit: contain;
`;

const buttonWrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const eachButtonCSS = css`
  margin-bottom: 50px;
`;

export default RequireLogin;
