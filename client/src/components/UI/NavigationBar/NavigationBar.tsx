/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import Image from "next/image";
// import emosaac_logo from "@/assets/emosaac_logo.png";
// import emosaac_logo_white from "@/assets/emosaac_logo_white.png";
// import emosaac_logo_mobile from "@/assets/emosaac_logo_mobile.png";
// import { ReactComponent as Logo } from "@/assets/emosaac_logo.svg";
import { SearchBar } from "./SearchBar";
import { SearchBarMobile } from "./SearchBarMobile";
import SearchBox from "./SearchBox";
import { DarkModeToggle } from "./DarkModeToggle";
import { BasicButton } from "./BasicButton";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useMediaQuery } from "react-responsive";
import { BsPersonFill, BsPerson } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import {
  MdCookie,
  MdOutlineCookie,
  MdOutlinePersonOutline,
  MdPerson,
} from "react-icons/md";
import {
  RiBookReadFill,
  RiBookReadLine,
  RiPlayCircleFill,
  RiPlayCircleLine,
  RiArrowLeftSLine,
} from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

export const NavigationBar = ({ myInfo, isDarkMode, setIsDarkMode }: any) => {
  const router = useRouter();
  // DeskTop Nav content의 최소 너비
  const isNavLimit = !useMediaQuery({
    query: "(min-width: 1185px) or (max-width: 1023px)",
  });
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [isHome, setIsHome] = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    home: false,
    webtoon: false,
    novel: false,
    emopick: false,
    mypage: false,
  });
  function onClickSearchBar() {
    if (!isMobile) {
      setIsSearchBoxOpen(true);
    }
  }
  function onClickSearchIcon() {
    setIsSearchBoxOpen(!isSearchBoxOpen);
  }
  function onClickSearchMobile() {
    setIsSearchClicked(true);
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    const imageUrl = localStorage.getItem("imageUrl");
    const nick = localStorage.getItem("nickname");
    if (isLogin) {
      imageUrl && setProfileImg(imageUrl);
      nick && setNickname(nick);
    } else {
      setProfileImg("");
      setNickname("");
    }
  }, [isLogin]);

  useEffect(() => {
    if (!isSearchBoxOpen) {
      setIsSearchClicked(true);
    }
  }, [isSearchBoxOpen]);

  useEffect(() => {
    if (router.asPath === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }

    const pathName = router.asPath.split("/")[1];
    switch (pathName) {
      case "":
        setCurrentRoute({
          home: true,
          webtoon: false,
          novel: false,
          emopick: false,
          mypage: false,
        });
        break;
      case "webtoon":
        setCurrentRoute({
          home: false,
          webtoon: true,
          novel: false,
          emopick: false,
          mypage: false,
        });
        break;
      case "novel":
        setCurrentRoute({
          home: false,
          webtoon: false,
          novel: true,
          emopick: false,
          mypage: false,
        });
        break;
      case "mypage":
        setCurrentRoute({
          home: false,
          webtoon: false,
          novel: false,
          emopick: false,
          mypage: true,
        });
        break;
      case "emopick":
        setCurrentRoute({
          home: false,
          webtoon: false,
          novel: false,
          emopick: true,
          mypage: false,
        });
        break;
    }
  }, [router.asPath]);

  return (
    <div>
      {!isHome && (
        <nav>
          <div css={navTopCSS(isHome)}>
            {isSearchBoxOpen && isMobile && (
              <div css={searchBarMobileCSS}>
                <RiArrowLeftSLine size={30} onClick={onClickSearchIcon} />
                <SearchBarMobile
                  isSearchClicked={isSearchClicked}
                  setIsSearchBoxOpen={setIsSearchBoxOpen}
                />
                <FiSearch size={24} onClick={onClickSearchMobile} />
              </div>
            )}
            <div css={navBackCSS(isTablet)}>
              <div
                css={navWrapCSS({
                  isSearchBoxOpen,
                  isNavLimit,
                  isDeskTop,
                  isTablet,
                  isMobile,
                })}
              >
                <Link href={{ pathname: "/" }}>
                  <h1
                    css={logoWrapCSS}
                    onClick={() => {
                      setIsSearchBoxOpen(false);
                    }}
                  >
                    {isMobile && (
                      <img alt="logo" src={"/assets/emosaac_logo_mobile.png"} />
                    )}
                    {!isMobile && isDarkMode && (
                      <img alt="logo" src={"/assets/emosaac_logo_white.png"} />
                    )}
                    {!isMobile && !isDarkMode && (
                      <img alt="logo" src={"/assets/emosaac_logo.png"} />
                    )}
                  </h1>
                </Link>

                {isDeskTop && (
                  <div
                    css={menuWrapCSS(isDeskTop, isTablet)}
                    onClick={() => {
                      setIsSearchBoxOpen(false);
                    }}
                  >
                    <Link href="/webtoon" replace>
                      <div css={routerCSS(currentRoute.webtoon)}>웹툰</div>
                    </Link>
                    <Link href="/novel" replace>
                      <div css={routerCSS(currentRoute.novel)}>웹소설</div>
                    </Link>
                    <Link href="/emopick" replace>
                      <div css={routerCSS(currentRoute.emopick)}>EMOPICK</div>
                    </Link>
                  </div>
                )}
                <div onClick={onClickSearchBar}>
                  {!isMobile && (
                    <SearchBar setIsSearchBoxOpen={setIsSearchBoxOpen} />
                  )}
                </div>

                <DarkModeToggle
                  isDeskTop={isDeskTop}
                  isTablet={isTablet}
                  isMobile={isMobile}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />

                {isDeskTop ? (
                  <BasicButton
                    setIsSearchBoxOpen={setIsSearchBoxOpen}
                    myInfo={myInfo}
                  />
                ) : isTablet ? (
                  <Link href={{ pathname: "/login" }}>
                    <MdPerson
                      size={24}
                      css={css`
                        color: var(--text-color);
                      `}
                      onClick={() => {
                        setIsSearchBoxOpen(false);
                      }}
                    />
                  </Link>
                ) : null}
                {isMobile && (
                  <FiSearch
                    size={24}
                    css={css`
                      cursor: pointer;
                    `}
                    onClick={onClickSearchIcon}
                  />
                )}
              </div>
            </div>
            {isTablet && (
              <div
                css={menuWrapCSS(isDeskTop, isTablet)}
                onClick={() => {
                  setIsSearchBoxOpen(false);
                }}
              >
                <Link href="/" replace>
                  <div css={routerCSS(currentRoute.home)}>홈</div>
                </Link>
                <Link href="/webtoon" replace>
                  <div css={routerCSS(currentRoute.webtoon)}>웹툰</div>
                </Link>
                <Link href="/novel" replace>
                  <div css={routerCSS(currentRoute.novel)}>웹소설</div>
                </Link>
                <Link href="/emopick" replace>
                  <div css={routerCSS(currentRoute.emopick)}>EMOPICK</div>
                </Link>
              </div>
            )}
            {isSearchBoxOpen && (
              <SearchBox setIsSearchBoxOpen={setIsSearchBoxOpen} />
            )}
          </div>
          {isMobile && (
            <div css={mobileBottomCSS}>
              <div css={popUpCSS(isPopUpOpen)}>
                <IoCloseOutline
                  onClick={() => setIsPopUpOpen(false)}
                  size={20}
                />
                <div>
                  {isLogin ? (
                    <>{nickname}님, 안녕하세요</>
                  ) : (
                    "로그인이 필요합니다."
                  )}
                </div>
                <div onClick={() => setIsPopUpOpen(false)}>
                  <div>
                    <Link href={"/mypage"} replace>
                      MY PAGE
                    </Link>
                  </div>
                  <div>
                    <Link href={"/login"} replace>
                      로그인
                    </Link>
                  </div>
                  <div>
                    <Link href={"/login"} replace>
                      로그아웃(임시)
                    </Link>
                  </div>
                </div>
              </div>
              <ul
                css={dockBarCSS}
                onClick={() => {
                  setIsSearchBoxOpen(false);
                }}
              >
                <li>
                  <Link href="/" replace>
                    {currentRoute.home ? (
                      <AiFillHome size={24} />
                    ) : (
                      <AiOutlineHome size={24} />
                    )}
                    <div>홈</div>
                  </Link>
                </li>
                <li>
                  <Link href="/webtoon" replace>
                    {currentRoute.webtoon ? (
                      <MdCookie size={24} />
                    ) : (
                      <MdOutlineCookie size={24} />
                    )}
                    <div>웹툰</div>
                  </Link>
                </li>
                <li>
                  <Link href="/novel" replace>
                    {currentRoute.novel ? (
                      <RiBookReadFill size={24} />
                    ) : (
                      <RiBookReadLine size={24} />
                    )}
                    <div>웹소설</div>
                  </Link>
                </li>
                <li>
                  <Link href="/emopick" replace>
                    {currentRoute.emopick ? (
                      <RiPlayCircleFill size={24} />
                    ) : (
                      <RiPlayCircleLine size={24} />
                    )}
                    <div>이모픽</div>
                  </Link>
                </li>
                <li onClick={() => setIsPopUpOpen(true)}>
                  <a>
                    {currentRoute.mypage ? (
                      <MdPerson size={24} />
                    ) : (
                      <MdOutlinePersonOutline size={24} />
                    )}
                    <div>MY</div>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      )}
    </div>
  );
};

interface IsResponsive {
  isSearchBoxOpen: boolean;
  isNavLimit: boolean;
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const visibleCSS = (transY: string) => {
  return keyframes`
  0% {
    opacity: 0; 
    transform:translateY(${transY});}
  100% {
    opacity : 100; 
    transform:translateY(0);}
`;
};

const routerCSS = (isCurrentRoute: boolean) => {
  return css`
    ${isCurrentRoute ? "color: var(--main-color)" : null}
  `;
};

const navTopCSS = (isHome: boolean) => css`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
`;

const searchBarMobileCSS = css`
  position: absolute;
  top: 0;
  z-index: 40;
  display: grid;
  grid-template-columns: 30px 1fr 20px;
  column-gap: 20px;
  width: 100%;
  height: 60px;
  padding-right: 20px;
  background-color: var(--back-color);
  animation: ${visibleCSS("0")} 0.3s;
  & > * {
    margin: auto 0;
  }
  & > svg:first-of-type {
    transform: translateX(8px);
  }
`;

const navBackCSS = (isTablet: boolean) => {
  return css`
    position: relative;
    z-index: 25;
    ${!isTablet && "border-bottom: 1px solid var(--border-color-2);"}
    background-color: var(--back-color);
    /* box-shadow: var(--shadow-color); */
  `;
};

const navWrapCSS = ({
  isSearchBoxOpen,
  isNavLimit,
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) => {
  return css`
    position: relative;
    display: none;
    grid-template-columns: none;
    ${(isDeskTop || isTablet || isMobile) && "display : grid;"}
    ${isDeskTop
      ? "grid-template-columns: 130px 180px 1fr 60px 80px;"
      : isTablet
      ? "grid-template-columns: 130px 1fr 60px 24px;"
      : isMobile
      ? "grid-template-columns: 40px 1fr 60px 20px;"
      : "grid-template-columns: none;"}
    ${!isMobile && "column-gap: 24px;"}
    ${isMobile && "column-gap: 20px;"}
    margin: ${isDeskTop
      ? isNavLimit
        ? "0 auto"
        : "0 105px"
      : isTablet
      ? "0 50px"
      : "0 20px"};
    /* height: ${isDeskTop ? "70px" : "60px"}; */
    height: 70px;
    ${isMobile && "height: 60px;"}
    width: ${isDeskTop ? (isNavLimit ? "914px" : "auto") : "auto"};
    color: var(--text-color);
    & > * {
      margin: auto 0;
    }
  `;
};

const logoWrapCSS = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    fill: red !important;
    & g {
      fill: red !important;
    }
  }
`;

const menuWrapCSS = (isDeskTop: boolean, isTablet: boolean) => {
  return css`
    position: relative;
    z-index: 20;
    display: flex;
    font-size: 14px;
    font-weight: bold;
    padding: ${isDeskTop ? "0" : isTablet ? "0 50px" : "0 20px"};
    justify-content: ${isDeskTop ? "space-between" : "flex-start"};
    ${isDeskTop ? null : "background-color: var(--back-color);"}
    ${isTablet && "border-bottom: 1px solid var(--border-color-2);"}
    & > a {
      line-height: ${isDeskTop ? "50px" : "40px"};
      ${isDeskTop ? null : "padding: 0 10px;"}
    }
  `;
};

const mobileBottomCSS = css`
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
`;

const popUpCSS = (isPopUpOpen: boolean) => css`
  z-index: 120;
  transition: all 0.3s ease;
  position: relative;
  width: 100vw;
  height: calc(100vh - 80px);
  background-color: var(--back-color);
  border-radius: 10px 10px 0px 0px;
  padding-top: 10px;
  transform: ${isPopUpOpen ? "translateY(0px)" : "translateY(100vh)"};
  & > svg {
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    color: var(--text-color);
  }
  & > div:nth-of-type(1) {
    // 안녕하세요
    padding: 10px 20px;
    font-size: 24px;
    line-height: 100px;
    height: 100px;
  }
  & > div:nth-of-type(2) {
    & > div {
      padding: 10px 20px;
      line-height: 40px;
    }
  }
`;

const dockBarCSS = css`
  cursor: pointer;
  position: fixed;
  z-index: 200;
  display: grid;
  background-color: var(--back-color-op);
  box-shadow: var(--shadow-color);
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55px;
  & > li {
    height: 100%;
    & > a {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      & > div {
        padding-top: 6px;
        font-size: 12px;
      }
    }
  }
`;
