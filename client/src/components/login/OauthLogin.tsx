/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Image from "next/image";
// import emosaacLogo from "../../assets/emosaac_logo.png";
// import kakao from "../../assets/social_kakao.png";
import naver from "../../assets/social_naver.png";
import OauthLoginButton from "../UI/OauthLogin/OauthLoginButton";
import { useRouter } from "next/router";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
interface LoginProps {
  isDarkMode: boolean;
}
const OauthLogin = ({ isDarkMode }: LoginProps) => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
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
  return (
    <>
      <main css={topWrapperCSS(isDeskTop)}>
        <section css={logosectionCSS(isDeskTop)}>
          {isDarkMode ? (
            <img
              css={imageWrapperCSS(isDeskTop)}
              src={"/assets/emosaac_logo_white.png"}
              alt="이모작의 로고입니다."
            />
          ) : (
            <img
              css={imageWrapperCSS(isDeskTop)}
              src={"/assets/emosaac_logo.png"}
              alt="이모작의 로고입니다."
            />
          )}
        </section>
        <section>
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
        </section>
      </main>
    </>
  );
};
const topWrapperCSS = (isDeskTop: boolean) => css`
  display: flex;
  flex-direction: ${isDeskTop ? "row" : "column"};
  justify-content: center;
  align-items: center;
  height: 650px;
`;
const logosectionCSS = (isDeskTop: boolean) => css`
  display: ${isDeskTop ? null : "flex"};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${isDeskTop ? null : "100%"};
  margin-bottom: ${isDeskTop ? null : "30px"};
`;

const imageWrapperCSS = (isDeskTop: boolean) => css`
  width: 70%;
  height: 70%;
  /* 범위 안에서 안 짤리게 */
  /* cover는 짤리더라도 꽉 채우게 */
  object-fit: contain;
  margin-right: ${isDeskTop ? "30vh" : "0"};
`;

const buttonWrapperCSS = css`
  display: flex;
  flex-direction: column;
`;

const eachButtonCSS = css`
  margin-bottom: 50px;
`;
export default OauthLogin;
