/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState, Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

interface Props {
  setIsSearchBoxOpen: Dispatch<SetStateAction<boolean>>;
  myInfo?: any;
}

export const BasicButton = ({ setIsSearchBoxOpen, myInfo }: Props) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("access_token");
  function onClickLogin() {
    setIsSearchBoxOpen(false);
    router.push({
      pathname: `/login`,
    });
  }
  function onClickLogout() {
    localStorage.clear();
    setIsSearchBoxOpen(false);
    router.push({
      pathname: "/",
    });
  }
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);
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
              src={myInfo && myInfo.imageUrl}
              alt="프로필 사진"
              css={imgCSS}
              onClick={onClickMoveMypage}
            />
          </div>
          <div css={hoverwrapCSS(isOpen)}>
            <button css={ButtonWrapCSS} onClick={onClickMoveMypage}>
              마이페이지
            </button>
            <button css={ButtonWrapCSS} onClick={onClickLogout}>
              로그아웃
            </button>
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
  width: 60%;
  height: 60%;
`;

const imgCSS = css`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const hoverwrapCSS = (isOpen: boolean) => css`
  display: ${isOpen ? "flex" : "none"};
  position: absolute;
`;

const ButtonWrapCSS = css`
  cursor: pointer;
  height: 36px;
  border: 1px solid var(--border-color-2);
  border-radius: 5px;
  background-color: var(--back-color);
  color: var(--text-color-2);
`;
