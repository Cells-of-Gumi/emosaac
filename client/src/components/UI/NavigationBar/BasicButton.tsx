/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import { useState, Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import getMyInfo from "./../../../api/user/getMyInfo";
import { getListByTagName } from "@/api/search/getSearchBooksByTagName";

interface Props {
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
  myInfo?: any;
}

export const BasicButton = ({ setIsSearchBoxOpen, myInfo }: Props) => {
  const router = useRouter();
  const defaultProfileImage = "/assets/default_image.png";
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState<string>("");
  const [login, setLogin] = useState(false);
  // const token = localStorage.getItem("access_token");
  function onClickLogin() {
    setIsSearchBoxOpen(false);
    router.push({
      pathname: `/login`,
    });
  }
  function onClickLogout() {
    localStorage.clear();
    setLogin(!login);
    setIsSearchBoxOpen(false);
    // router.push({
    //   pathname: "/",
    // });
    // document.location.href = "/";
  }
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [router.events, login]);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const onClickMoveMypage = () => {
    setIsSearchBoxOpen(false);
    router.push("/mypage");
  };
  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      getMyInfo().then((res) => {
        const data = res;
        // console.log(data);
        if (data) {
          setNickname(data?.nickname);
        }
      });
    }
  }, []);
  // 비 로그인시 로그인, 로그인 이면 프로필 사진 보이게. 호버하면 마이페이지랑 로그아웃 버튼
  return (
    <>
      {isLogin ? (
        <div
          css={topCSS}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div css={profileimgCSS}>
            <img
              src={
                myInfo && myInfo.imageUrl?.includes("/null")
                  ? defaultProfileImage
                  : myInfo?.imageUrl
              }
              alt="프로필 사진"
              css={imgCSS}
            />
          </div>
          <div css={hoverwrapCSS(isOpen)}>
            <div onClick={onClickMoveMypage}>마이페이지</div>
            <div onClick={onClickLogout}>로그아웃</div>
          </div>
        </div>
      ) : (
        <button id="basic-button" css={ButtonWrapCSS} onClick={onClickLogin}>
          로그인
        </button>
      )}
    </>
  );
};
const topCSS = css`
  position: relative;
`;

const profileimgCSS = css`
  border-radius: 100%;
  background-color: var(--back-color-4);
  width: 36px;
  height: 36px;
`;

const imgCSS = css`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  overflow: hidden;
  object-fit: cover;
  object-position: center center;
`;
const slideIn = keyframes`
  from {
    transform: translateY(-40%), translateX(-25%);
    opacity: 0;
  }
  to {
    transform: translateY(-5%),translateX(-25%);
    opacity: 1;
  }
`;
const hoverwrapCSS = (isOpen: boolean) => css`
  display: ${isOpen ? "flex" : "none"};
  flex-direction: column;
  width: 130px;
  height: 70px;
  position: absolute;
  left: 25%;
  transform: translateX(-50%);
  border: 1px solid var(--border-color-2);
  border-radius: 5px;
  background-color: var(--back-color);
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-out;
  animation: ${slideIn} 0.3s ease-out forwards;
  cursor: pointer;
  & > div {
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
`;

const ButtonWrapCSS = css`
  cursor: pointer;
  width: 50px;
  height: 37px;
  background-color: var(--back-color);
  color: var(--text-color-2);
`;
