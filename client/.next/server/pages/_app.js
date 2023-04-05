(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 7546:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G": () => (/* binding */ getBookDetail)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getBookDetail({ bookId , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/books/${bookId}`, {
            headers
        });
        return data.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 446:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ getSearchHistory)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getSearchHistory({ token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/search/latest-book`, {
            headers
        });
        if (data.status === 200) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6511:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getMyInfo() {
    try {
        const { data , status  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/users/me`);
        if (status === 200) {
            return data.data;
        }
    } catch (error) {
        throw error;
    }
    return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getMyInfo);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5150:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ BasicButton)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6511);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_4__]);
_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 






const BasicButton = ({ setIsSearchBoxOpen , myInfo  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const defaultProfileImage = "/assets/default_image.png";
    const [isLogin, setIsLogin] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const [nickname, setNickname] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const token = localStorage.getItem("access_token");
    function onClickLogin() {
        setIsSearchBoxOpen(false);
        router.push({
            pathname: `/login`
        });
    }
    function onClickLogout() {
        localStorage.clear();
        setIsSearchBoxOpen(false);
        router.push({
            pathname: "/"
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [
        token
    ]);
    const handleMouseEnter = ()=>{
        setIsOpen(true);
    };
    const handleMouseLeave = ()=>{
        setIsOpen(false);
    };
    const onClickMoveMypage = ()=>{
        setIsSearchBoxOpen(false);
        router.push("/mypage");
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (window.localStorage.getItem("access_token")) {
            (0,_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)().then((res)=>{
                const data = res;
                // console.log(data);
                if (data) {
                    setNickname(data?.nickname);
                }
            });
        }
    }, []);
    // 비 로그인시 로그인, 로그인 이면 프로필 사진 보이게. 호버하면 마이페이지랑 로그아웃 버튼
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: isLogin ? /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            css: topCSS,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: profileimgCSS,
                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: myInfo && myInfo.imageUrl?.includes("/null") ? defaultProfileImage : myInfo?.imageUrl,
                        alt: "프로필 사진",
                        css: imgCSS
                    })
                }),
                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    css: hoverwrapCSS(isOpen),
                    children: [
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            onClick: onClickMoveMypage,
                            children: "마이페이지"
                        }),
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            onClick: onClickLogout,
                            children: "로그아웃"
                        })
                    ]
                })
            ]
        }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            id: "basic-button",
            css: ButtonWrapCSS,
            onClick: onClickLogin,
            children: "로그인"
        })
    });
};
const topCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
`;
const profileimgCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  border-radius: 100%;
  background-color: var(--back-color-4);
  width: 36px;
  height: 36px;
`;
const imgCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  overflow: hidden;
  object-fit: cover;
  object-position: center center;
`;
const slideIn = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.keyframes`
  from {
    transform: translateY(-40%), translateX(-25%);
    opacity: 0;
  }
  to {
    transform: translateY(-5%),translateX(-25%);
    opacity: 1;
  }
`;
const hoverwrapCSS = (isOpen)=>_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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
const ButtonWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  cursor: pointer;
  height: 36px;
  background-color: var(--back-color);
  color: var(--text-color-2);
`;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5864:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ DarkModeToggle)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/** @jsxImportSource @emotion/react */ 


const DarkModeToggle = (props)=>{
    // const [isDarkMode, setIsDarkMode] = useState(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const darkMode = localStorage.getItem("data-theme");
        if (darkMode === "dark") {
            props.setIsDarkMode(true);
        } else {
            props.setIsDarkMode(false);
        }
        document.documentElement.setAttribute("data-theme", darkMode === "dark" ? "dark" : "light");
    }, []);
    function onChangeDarkMode() {
        const darkMode = localStorage.getItem("data-theme");
        if (darkMode === "dark") {
            // dark > light모드로 바꾸기
            props.setIsDarkMode(false);
        } else {
            // light > dark모드로 바꾸기
            props.setIsDarkMode(true);
        }
        document.documentElement.setAttribute("data-theme", darkMode === "dark" ? "light" : "dark");
        localStorage.setItem("data-theme", darkMode === "dark" ? "light" : "dark");
    }
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        id: "dark-mode-toggle",
        css: darkModeToggleCSS,
        onClick: onChangeDarkMode,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: circleCSS(props.isDarkMode)
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                alt: "darkmode-icon",
                src: "/assets/darkmode_dark.png"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                alt: "lightmode-icon",
                src: "/assets/darkmode_light.png"
            })
        ]
    });
};
const darkModeToggleCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
  cursor: pointer;
  margin: auto 0;
  height: 30px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  background-color: var(--back-color-2);
  & > img {
    width: 20px;
    height: 20px;
    /* filter: brightness(100) grayscale(100%); */
  }
`;
const circleCSS = (isDarkMode)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: absolute;
    top: 4px;
    left: 5px;
    transform: ${isDarkMode ? "translateX(29px)" : "translateX(0)"};
    width: 22px;
    height: 22px;
    border-radius: 20px;
    background-color: var(--text-color-4);
    transition: all 0.3s;
  `;
};


/***/ }),

/***/ 6259:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v": () => (/* binding */ NavigationBar)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SearchBar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1882);
/* harmony import */ var _SearchBarMobile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7336);
/* harmony import */ var _SearchBox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9441);
/* harmony import */ var _DarkModeToggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5864);
/* harmony import */ var _BasicButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5150);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4932);
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6666);
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_responsive__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(9847);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_icons_ai__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(4041);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8098);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(9989);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_icons_io5__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_16__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_SearchBox__WEBPACK_IMPORTED_MODULE_6__, _BasicButton__WEBPACK_IMPORTED_MODULE_8__]);
([_SearchBox__WEBPACK_IMPORTED_MODULE_6__, _BasicButton__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 



// import Image from "next/image";
// import emosaac_logo from "@/assets/emosaac_logo.png";
// import emosaac_logo_white from "@/assets/emosaac_logo_white.png";
// import emosaac_logo_mobile from "@/assets/emosaac_logo_mobile.png";
// import { ReactComponent as Logo } from "@/assets/emosaac_logo.svg";













const NavigationBar = ({ myInfo , isDarkMode , setIsDarkMode  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    // DeskTop Nav content의 최소 너비
    const isNavLimit = !(0,react_responsive__WEBPACK_IMPORTED_MODULE_10__.useMediaQuery)({
        query: "(min-width: 1185px) or (max-width: 1023px)"
    });
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_9__/* .useIsResponsive */ .j)();
    // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isSearchClicked, setIsSearchClicked] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isLogin, setIsLogin] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [profileImg, setProfileImg] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [nickname, setNickname] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [isHome, setIsHome] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isPopUpOpen, setIsPopUpOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [currentRoute, setCurrentRoute] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
        home: false,
        webtoon: false,
        novel: false,
        emopick: false,
        mypage: false
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
    function onClickLogout() {
        localStorage.clear();
        setIsSearchBoxOpen(false);
        router.push({
            pathname: "/"
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const imageUrl = localStorage.getItem("imageUrl");
        const nick = localStorage.getItem("nickname");
        if (isLogin) {
            imageUrl && setProfileImg(imageUrl);
            nick && setNickname(nick);
        } else {
            setProfileImg("");
            setNickname("");
        }
    }, [
        isLogin
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (!isSearchBoxOpen) {
            setIsSearchClicked(true);
        }
    }, [
        isSearchBoxOpen
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (router.asPath === "/") {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
        const pathName = router.asPath.split("/")[1];
        switch(pathName){
            case "":
                setCurrentRoute({
                    home: true,
                    webtoon: false,
                    novel: false,
                    emopick: false,
                    mypage: false
                });
                break;
            case "webtoon":
                setCurrentRoute({
                    home: false,
                    webtoon: true,
                    novel: false,
                    emopick: false,
                    mypage: false
                });
                break;
            case "novel":
                setCurrentRoute({
                    home: false,
                    webtoon: false,
                    novel: true,
                    emopick: false,
                    mypage: false
                });
                break;
            case "mypage":
                setCurrentRoute({
                    home: false,
                    webtoon: false,
                    novel: false,
                    emopick: false,
                    mypage: true
                });
                break;
            case "emopick":
                setCurrentRoute({
                    home: false,
                    webtoon: false,
                    novel: false,
                    emopick: true,
                    mypage: false
                });
                break;
        }
    }, [
        router.asPath
    ]);
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: !isHome && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
            children: [
                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    css: navTopCSS(isHome),
                    children: [
                        isSearchBoxOpen && isMobile && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: searchBarMobileCSS,
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiArrowLeftSLine, {
                                    size: 30,
                                    onClick: onClickSearchIcon
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SearchBarMobile__WEBPACK_IMPORTED_MODULE_5__/* .SearchBarMobile */ .X, {
                                    isSearchClicked: isSearchClicked,
                                    setIsSearchBoxOpen: setIsSearchBoxOpen
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_11__.FiSearch, {
                                    size: 24,
                                    onClick: onClickSearchMobile
                                })
                            ]
                        }),
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: navBackCSS(isTablet),
                            children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                css: navWrapCSS({
                                    isSearchBoxOpen,
                                    isNavLimit,
                                    isDeskTop,
                                    isTablet,
                                    isMobile
                                }),
                                children: [
                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        href: {
                                            pathname: "/"
                                        },
                                        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                                            css: logoWrapCSS,
                                            onClick: ()=>{
                                                setIsSearchBoxOpen(false);
                                            },
                                            children: [
                                                isMobile && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    alt: "logo",
                                                    src: "/assets/emosaac_logo_mobile.png"
                                                }),
                                                !isMobile && isDarkMode && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    alt: "logo",
                                                    src: "/assets/emosaac_logo_white.png"
                                                }),
                                                !isMobile && !isDarkMode && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                    alt: "logo",
                                                    src: "/assets/emosaac_logo.png"
                                                })
                                            ]
                                        })
                                    }),
                                    isDeskTop && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        css: menuWrapCSS(isDeskTop, isTablet),
                                        onClick: ()=>{
                                            setIsSearchBoxOpen(false);
                                        },
                                        children: [
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                href: "/webtoon",
                                                replace: true,
                                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    css: routerCSS(currentRoute.webtoon),
                                                    children: "웹툰"
                                                })
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                href: "/novel",
                                                replace: true,
                                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    css: routerCSS(currentRoute.novel),
                                                    children: "웹소설"
                                                })
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                href: "/emopick",
                                                replace: true,
                                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    css: routerCSS(currentRoute.emopick),
                                                    children: "EMOPICK"
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        onClick: onClickSearchBar,
                                        children: !isMobile && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SearchBar__WEBPACK_IMPORTED_MODULE_4__/* .SearchBar */ .E, {
                                            setIsSearchBoxOpen: setIsSearchBoxOpen
                                        })
                                    }),
                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_DarkModeToggle__WEBPACK_IMPORTED_MODULE_7__/* .DarkModeToggle */ .J, {
                                        isDeskTop: isDeskTop,
                                        isTablet: isTablet,
                                        isMobile: isMobile,
                                        isDarkMode: isDarkMode,
                                        setIsDarkMode: setIsDarkMode
                                    }),
                                    isDeskTop ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BasicButton__WEBPACK_IMPORTED_MODULE_8__/* .BasicButton */ .k, {
                                        setIsSearchBoxOpen: setIsSearchBoxOpen,
                                        myInfo: myInfo
                                    }) : isTablet ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        href: {
                                            pathname: "/login"
                                        },
                                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_13__.MdPerson, {
                                            size: 24,
                                            css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
                        color: var(--text-color);
                      `,
                                            onClick: ()=>{
                                                setIsSearchBoxOpen(false);
                                            }
                                        })
                                    }) : null,
                                    isMobile && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_11__.FiSearch, {
                                        size: 24,
                                        css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
                      cursor: pointer;
                    `,
                                        onClick: onClickSearchIcon
                                    })
                                ]
                            })
                        }),
                        isTablet && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: menuWrapCSS(isDeskTop, isTablet),
                            onClick: ()=>{
                                setIsSearchBoxOpen(false);
                            },
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                    href: "/",
                                    replace: true,
                                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        css: routerCSS(currentRoute.home),
                                        children: "홈"
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                    href: "/webtoon",
                                    replace: true,
                                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        css: routerCSS(currentRoute.webtoon),
                                        children: "웹툰"
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                    href: "/novel",
                                    replace: true,
                                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        css: routerCSS(currentRoute.novel),
                                        children: "웹소설"
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                    href: "/emopick",
                                    replace: true,
                                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        css: routerCSS(currentRoute.emopick),
                                        children: "EMOPICK"
                                    })
                                })
                            ]
                        }),
                        isSearchBoxOpen && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SearchBox__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                            setIsSearchBoxOpen: setIsSearchBoxOpen
                        })
                    ]
                }),
                isMobile && /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    css: mobileBottomCSS,
                    children: [
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: popUpCSS(isPopUpOpen),
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_15__.IoCloseOutline, {
                                    onClick: ()=>setIsPopUpOpen(false),
                                    size: 20
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: isLogin ? /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            profileImg ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                src: profileImg,
                                                alt: "프로필"
                                            }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                src: "/assets/emosaac_logo_mobile.png",
                                                alt: "프로필"
                                            }),
                                            nickname,
                                            "님, 안녕하세요"
                                        ]
                                    }) : "로그인이 필요합니다."
                                }),
                                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    onClick: ()=>setIsPopUpOpen(false),
                                    children: [
                                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: isLogin ? /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                href: "/mypage",
                                                replace: true,
                                                children: [
                                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_13__.MdPerson, {
                                                        size: 24
                                                    }),
                                                    "MY PAGE"
                                                ]
                                            }) : /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                                href: "/login",
                                                replace: true,
                                                children: [
                                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiLoginBoxLine, {
                                                        size: 24
                                                    }),
                                                    "로그인 페이지로 이동"
                                                ]
                                            })
                                        }),
                                        isLogin && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            onClick: ()=>onClickLogout(),
                                            children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                children: [
                                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiLogoutBoxRLine, {
                                                        size: 24
                                                    }),
                                                    "로그아웃"
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                            css: dockBarCSS,
                            onClick: ()=>{
                                setIsSearchBoxOpen(false);
                            },
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        href: "/",
                                        replace: true,
                                        children: [
                                            currentRoute.home ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_12__.AiFillHome, {
                                                size: 24
                                            }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_12__.AiOutlineHome, {
                                                size: 24
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: "홈"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        href: "/webtoon",
                                        replace: true,
                                        children: [
                                            currentRoute.webtoon ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_13__.MdCookie, {
                                                size: 24
                                            }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_13__.MdOutlineCookie, {
                                                size: 24
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: "웹툰"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        href: "/novel",
                                        replace: true,
                                        children: [
                                            currentRoute.novel ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiBookReadFill, {
                                                size: 24
                                            }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiBookReadLine, {
                                                size: 24
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: "웹소설"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_16___default()), {
                                        href: "/emopick",
                                        replace: true,
                                        children: [
                                            currentRoute.emopick ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiPlayCircleFill, {
                                                size: 24
                                            }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_14__.RiPlayCircleLine, {
                                                size: 24
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: "이모픽"
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    onClick: ()=>setIsPopUpOpen(true),
                                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                        children: [
                                            currentRoute.mypage ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_13__.MdPerson, {
                                                size: 24
                                            }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_13__.MdOutlinePersonOutline, {
                                                size: 24
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                children: "MY"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
const visibleCSS = (transY)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.keyframes`
  0% {
    opacity: 0; 
    transform:translateY(${transY});}
  100% {
    opacity : 100; 
    transform:translateY(0);}
`;
};
const routerCSS = (isCurrentRoute)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isCurrentRoute ? "color: var(--main-color)" : null}
  `;
};
const navTopCSS = (isHome)=>_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
`;
const searchBarMobileCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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
const navBackCSS = (isTablet)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: relative;
    z-index: 25;
    ${!isTablet && "border-bottom: 1px solid var(--border-color-2);"}
    background-color: var(--back-color);
    /* box-shadow: var(--shadow-color); */
  `;
};
const navWrapCSS = ({ isSearchBoxOpen , isNavLimit , isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: relative;
    display: none;
    grid-template-columns: none;
    ${(isDeskTop || isTablet || isMobile) && "display : grid;"}
    ${isDeskTop ? "grid-template-columns: 130px 180px 1fr 60px 80px;" : isTablet ? "grid-template-columns: 130px 1fr 60px 24px;" : isMobile ? "grid-template-columns: 40px 1fr 60px 20px;" : "grid-template-columns: none;"}
    ${!isMobile && "column-gap: 24px;"}
    ${isMobile && "column-gap: 20px;"}
    margin: ${isDeskTop ? isNavLimit ? "0 auto" : "0 105px" : isTablet ? "0 50px" : "0 20px"};
    /* height: ${isDeskTop ? "70px" : "60px"}; */
    height: 70px;
    ${isMobile && "height: 60px;"}
    width: ${isDeskTop ? isNavLimit ? "914px" : "auto" : "auto"};
    color: var(--text-color);
    & > * {
      margin: auto 0;
    }
  `;
};
const logoWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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
const menuWrapCSS = (isDeskTop, isTablet)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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
const mobileBottomCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: fixed;
  z-index: 180;
  bottom: 0;
  left: 0;
`;
const popUpCSS = (isPopUpOpen)=>_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  box-shadow: 0px -10px 10px rgba(120, 120, 120, 0.3);
  z-index: 120;
  transition: all 0.3s ease;
  position: relative;
  width: 100vw;
  height: calc(100vh - 120px);
  background-color: var(--back-color);
  border-radius: 10px 10px 0px 0px;
  padding-top: 10px;
  display: ${isPopUpOpen ? "block" : "none"};
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 24px;
    height: 100px;
    & > img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 14px;
    }
  }
  & > div:nth-of-type(2) {
    cursor: pointer;
    & > div {
      & > a {
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        & > svg {
          margin-right: 10px;
        }
      }
      padding: 10px 20px;
      height: 60px;
    }
  }
`;
const dockBarCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1882:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "E": () => (/* binding */ SearchBar)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react-icons/hi"
var hi_ = __webpack_require__(1111);
;// CONCATENATED MODULE: ./src/components/UI/DropDown/DropDown.tsx
/** @jsxImportSource @emotion/react */ 



const DropDown = (props)=>{
    const [selectArr, setSelectArr] = (0,external_react_.useState)(props.cateList);
    // const [selectedCate, setSelectedCate] = useState("전체");
    // const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    function onClickDropDown() {
        props.setIsDropDownOpen(!props.isDropDownOpen);
        props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(true);
    }
    function onClickSelected(selected) {
        props.setSelectedCate(selected);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        css: dropDownWrapCSS,
        onClick: onClickDropDown,
        children: [
            props.selectedCate,
            /*#__PURE__*/ jsx_runtime_.jsx(hi_.HiOutlineChevronDown, {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                css: dropDownBoxCSS(props.isDropDownOpen),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        css: selectedCSS,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: props.selectedCate
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(hi_.HiOutlineChevronDown, {})
                        ]
                    }),
                    selectArr.map((selected, idx)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                            onClick: ()=>onClickSelected(selected),
                            children: selected
                        }, idx))
                ]
            })
        ]
    });
};
const dropDownWrapCSS = react_.css`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  height: 100%;
  font-size: 14px;
`;
const dropDownBoxCSS = (isDropDownOpen)=>{
    return react_.css`
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
const selectedCSS = react_.css`
  height: 45px;
  line-height: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// EXTERNAL MODULE: external "react-icons/fi"
var fi_ = __webpack_require__(2750);
// EXTERNAL MODULE: ./src/components/Responsive/useIsResponsive.ts
var useIsResponsive = __webpack_require__(4932);
;// CONCATENATED MODULE: ./src/components/UI/NavigationBar/SearchBar.tsx
/** @jsxImportSource @emotion/react */ 






const SearchBar = (props)=>{
    const router = (0,router_.useRouter)();
    const [isDeskTop, isTablet, isMobile] = (0,useIsResponsive/* useIsResponsive */.j)();
    const typeDict = {
        ["전체"]: "total",
        ["웹툰"]: "webtoon",
        ["웹소설"]: "novel"
    };
    const [cateList, setCateList] = (0,external_react_.useState)([
        "전체",
        "웹툰",
        "웹소설"
    ]);
    const [searchInput, setSearchInput] = (0,external_react_.useState)("");
    const [selectedCate, setSelectedCate] = (0,external_react_.useState)("전체");
    const [type, setType] = (0,external_react_.useState)("total");
    const [isDropDownOpen, setIsDropDownOpen] = (0,external_react_.useState)(false);
    const [isTagName, setIsTagName] = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        setType(typeDict[selectedCate]);
    }, [
        selectedCate
    ]);
    (0,external_react_.useEffect)(()=>{
        if (searchInput.slice(0, 1) === "#") {
            setIsTagName(true);
        } else {
            setIsTagName(false);
        }
    }, [
        searchInput
    ]);
    (0,external_react_.useEffect)(()=>{
        if (isMobile) {
            setType("total");
        }
    }, [
        isMobile
    ]);
    function onChangeSearchInput(event) {
        const inputText = event.target.value;
        setSearchInput(inputText);
        props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(true);
    }
    function onEnterKeyDown(event) {
        if (event.key === "Enter") {
            if (searchInput === "") {
                alert("검색어를 입력해주세요");
            } else {
                props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(false);
                const [prevId, prevScore, size] = [
                    20493,
                    10,
                    10
                ];
                if (isTagName) {
                    const tagName = searchInput.slice(1);
                    router.push({
                        pathname: `/search/tagname`,
                        query: {
                            type,
                            query: tagName
                        }
                    });
                    setSearchInput("");
                } else {
                    const content = searchInput;
                    router.push({
                        pathname: `/search/content`,
                        query: {
                            type,
                            query: content
                        }
                    });
                    setSearchInput("");
                }
            }
        }
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        css: searchBarWrapCSS({
            isDeskTop,
            isTablet,
            isMobile
        }),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                css: searchIconCSS,
                children: /*#__PURE__*/ jsx_runtime_.jsx(fi_.FiSearch, {})
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                type: "text",
                placeholder: "제목, 작가를 입력하세요.",
                css: inputWrapCSS,
                value: searchInput,
                onChange: onChangeSearchInput,
                onKeyDown: onEnterKeyDown
            }),
            !isMobile && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: "in"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(DropDown, {
                        selectedCate: selectedCate,
                        setSelectedCate: setSelectedCate,
                        isDropDownOpen: isDropDownOpen,
                        setIsDropDownOpen: setIsDropDownOpen,
                        setIsSearchBoxOpen: props.setIsSearchBoxOpen,
                        cateList: cateList
                    })
                ]
            })
        ]
    });
};
const searchBarWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return react_.css`
    display: grid;
    ${!isMobile && "grid-template-columns: 20px 1fr 20px 100px;"}
    ${isMobile && "grid-template-columns: 20px 1fr;"}
    column-gap: 20px;
    height: 45px;
    background-color: var(--back-color-2);
    border-radius: 5px;
    font-weight: bold;
    & > input {
      color: var(--text-color);
    }
    & > * {
      margin: auto 0;
    }
  `;
};
const searchIconCSS = react_.css`
  & > * {
    margin-left: 14px;
  }
`;
const inputWrapCSS = react_.css`
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--back-color-2);
  ::placeholder {
    font-weight: bold;
  }
`;


/***/ }),

/***/ 7336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ SearchBarMobile)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2750);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_4__);
/** @jsxImportSource @emotion/react */ 




const SearchBarMobile = (props)=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const typeDict = {
        ["전체"]: "total",
        ["웹툰"]: "webtoon",
        ["웹소설"]: "novel"
    };
    const type = "total";
    const [searchInput, setSearchInput] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const [isTagName, setIsTagName] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    function onChangeSearchInput(event) {
        const inputText = event.target.value;
        setSearchInput(inputText);
    }
    function onEnterKeyDown(event) {
        if (event.key === "Enter") {
            if (searchInput === "") {
                alert("검색어를 입력해주세요");
            } else {
                const [prevId, prevScore, size] = [
                    20493,
                    10,
                    10
                ];
                props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(false);
                if (isTagName) {
                    const tagName = searchInput.slice(1);
                    router.push({
                        pathname: `/search/tagname`,
                        query: {
                            type,
                            query: tagName
                        }
                    });
                    setSearchInput("");
                } else {
                    const content = searchInput;
                    router.push({
                        pathname: `/search/content`,
                        query: {
                            type,
                            query: content
                        }
                    });
                    setSearchInput("");
                }
            }
        }
    }
    function onClickSearch() {
        if (searchInput === "") {
        // props.setIsSearchBoxOpen(false);
        } else {
            const [prevId, prevScore, size] = [
                20493,
                10,
                10
            ];
            props.setIsSearchBoxOpen && props.setIsSearchBoxOpen(false);
            console.log("여기옴?");
            console.log("여기옴?");
            if (isTagName) {
                const tagName = searchInput.slice(1);
                router.push({
                    pathname: `/search/tagname`,
                    query: {
                        type,
                        query: tagName
                    }
                });
                setSearchInput("");
            } else {
                const content = searchInput;
                router.push({
                    pathname: `/search/content`,
                    query: {
                        type,
                        query: content
                    }
                });
                setSearchInput("");
            }
        }
    }
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (searchInput.slice(0, 1) === "#") {
            setIsTagName(true);
        } else {
            setIsTagName(false);
        }
    }, [
        searchInput
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (props.isSearchClicked) {
            onClickSearch();
        }
    }, [
        props.isSearchClicked
    ]);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: searchBarWrapCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: searchIconCSS,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_4__.FiSearch, {})
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                type: "text",
                placeholder: "제목, 작가를 입력하세요.",
                css: inputWrapCSS,
                value: searchInput,
                onChange: onChangeSearchInput,
                onKeyDown: onEnterKeyDown
            })
        ]
    });
};
const searchBarWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: grid;
  grid-template-columns: 20px 1fr;
  column-gap: 20px;
  height: 45px;
  background-color: var(--back-color-2);
  border-radius: 5px;
  font-weight: bold;
  & > input {
    color: var(--text-color);
  }
  & > * {
    margin: auto 0;
  }
`;
const searchIconCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  & > * {
    margin-left: 14px;
  }
`;
const inputWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  border: none;
  outline: none;
  background-color: var(--back-color-2);
  ::placeholder {
    font-weight: bold;
  }
`;


/***/ }),

/***/ 5351:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/** @jsxImportSource @emotion/react */ 



const SearchBookCard = ({ bookData , showPlatform , width , height , minWidth , minHeight  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    // let user: any = null;
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setUser(()=>navigator.userAgent);
    }, []);
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [modalToggler, setModalToggler] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isMouseOn, setIsMouseOn] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const platformBar = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: platformBarCSS
    });
    const instantlyRedirect = ()=>{
        router.replace(`/books/${bookData.bookId}`);
    };
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "bookcard-outer-wrapper",
        css: cardOuterWrapper({
            width,
            height,
            minWidth,
            minHeight
        }),
        ref: wrapperRef,
        onClick: instantlyRedirect,
        onMouseOver: (event)=>{
            event.stopPropagation();
        },
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "bookcard-inner-wrapper",
            css: cardInnerWrapperCSS({
                width,
                height,
                minWidth,
                minHeight
            }),
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: skeletonLoadingTagCSS({
                        state: bookData !== "LOADING" ? true : false
                    })
                }),
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    className: "img",
                    src: bookData && bookData.thumbnail,
                    alt: bookData && bookData.title,
                    css: imageCSS
                }),
                showPlatform && bookData !== "LOADING" && platformBar
            ]
        })
    });
};
const cardOuterWrapper = ({ width , height , minWidth , minHeight  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    cursor: pointer;
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    box-shadow: var(--shadow-color);
    overflow: hidden;
    border-radius: 10px;
  `;
};
const cardInnerWrapperCSS = ({ width , height , minWidth , minHeight  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: relative;
    /* width: ${width !== undefined ? width : "auto"}; */
    width: 100%;
    /* height: ${height !== undefined ? height : "100%"}; */
    height: 100%;
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
};
const platformBarCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 3vw;
  min-height: 36px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  pointer-events: none;
`;
const imageCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  object-fit: cover;
  &:hover {
    transform: scale(1.1);
  }
`;
const skeletonLoadingTagCSS = ({ state  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: absolute;
    width: 100%;
    height: 100%;
    transition-property: opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: rgb(200, 200, 200);
    position: absolute;
    opacity: ${state ? "0" : "255"};
    pointer-events: none;
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBookCard);


/***/ }),

/***/ 9441:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4932);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SearchBookCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5351);
/* harmony import */ var _Button_ToggleButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1017);
/* harmony import */ var _api_search_getSearchHistory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(446);
/* harmony import */ var _api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7546);
/* harmony import */ var _BasicButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5150);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4041);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_10__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_search_getSearchHistory__WEBPACK_IMPORTED_MODULE_7__, _api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_8__, _BasicButton__WEBPACK_IMPORTED_MODULE_9__]);
([_api_search_getSearchHistory__WEBPACK_IMPORTED_MODULE_7__, _api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_8__, _BasicButton__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 










const SearchBox = (props)=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const [bookData, setBookData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__/* .useIsResponsive */ .j)();
    const [isLogin, setIsLogin] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [tagList, setTagList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    function onClickBack() {
        props.setIsSearchBoxOpen(false);
    }
    function onClickTagToggle(tag) {
        props.setIsSearchBoxOpen(false);
        router.push({
            pathname: `/search/tagname`,
            query: {
                type: "total",
                query: tag
            }
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
        (0,_api_search_getSearchHistory__WEBPACK_IMPORTED_MODULE_7__/* .getSearchHistory */ .n)({
            token
        }).then((res)=>setBookData(res));
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (bookData && bookData.length !== 0) {
            setTagList([]);
            bookData.slice(0, 4).forEach((book)=>{
                (0,_api_book_getBookDetail__WEBPACK_IMPORTED_MODULE_8__/* .getBookDetail */ .G)({
                    bookId: book.bookId
                }).then((res)=>{
                    if (res !== null) {
                        setTagList((prev)=>[
                                ...prev,
                                ...res.tag.split(" ")
                            ]);
                    }
                });
            });
        } else {
            setTagList([
                "먼치킨",
                "복수",
                "환생",
                "회귀",
                "로판"
            ]);
        }
    }, [
        bookData
    ]);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: searchWrapCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: searchBoxCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    css: searchContentWrapCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    }),
                    children: [
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: recentHistoryCSS({
                                isDeskTop,
                                isTablet,
                                isMobile
                            }),
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    children: "최근 조회한 컨텐츠"
                                }),
                                bookData && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    css: booksWrapCSS({
                                        isDeskTop,
                                        isTablet,
                                        isMobile
                                    }),
                                    children: bookData.map((book, idx)=>/*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            css: bookWrapCSS(book.typeCd === 0),
                                            onClick: onClickBack,
                                            children: [
                                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    children: book && book.typeCd === 0 ? "웹툰" : "웹소설"
                                                }),
                                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_SearchBookCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                    bookData: book,
                                                    showPlatform: false,
                                                    width: "100%"
                                                }),
                                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    css: titleCSS({
                                                        isDeskTop,
                                                        isTablet,
                                                        isMobile
                                                    }),
                                                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        children: book.title
                                                    })
                                                })
                                            ]
                                        }, idx))
                                }),
                                !bookData ? isLogin ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    css: noHistoryCSS({
                                        isDeskTop,
                                        isTablet,
                                        isMobile
                                    }),
                                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        children: "조회한 컨텐츠가 없습니다."
                                    })
                                }) : /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    css: noHistoryCSS({
                                        isDeskTop,
                                        isTablet,
                                        isMobile
                                    }),
                                    children: [
                                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            children: "로그인이 필요한 서비스입니다."
                                        }),
                                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_BasicButton__WEBPACK_IMPORTED_MODULE_9__/* .BasicButton */ .k, {
                                            setIsSearchBoxOpen: props.setIsSearchBoxOpen
                                        })
                                    ]
                                }) : null
                            ]
                        }),
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: tagSearchCSS({
                                isDeskTop,
                                isTablet,
                                isMobile
                            }),
                            children: [
                                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                    children: [
                                        "태그로 검색하기 ",
                                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: "#을 붙이고 태그를 검색해보세요."
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    children: [
                                        ...new Set(tagList)
                                    ].map((tag, idx)=>{
                                        if (tag !== "") {
                                            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                                text: "#" + tag,
                                                isClicked: false,
                                                onClick: ()=>onClickTagToggle(tag)
                                            }, idx);
                                        }
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: flipCSS({
                                isDeskTop,
                                isTablet,
                                isMobile
                            }),
                            onClick: onClickBack,
                            children: [
                                "접기 ",
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_10__.MdOutlineKeyboardDoubleArrowUp, {
                                    size: 20
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: boxBackCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                onClick: onClickBack
            })
        ]
    });
};
const visibleCSS = (transY)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.keyframes`
    0% {
      opacity: 0; 
      transform:translateY(${transY});}
    100% {
      opacity : 100; 
      transform:translateY(0);}
  `;
};
const searchWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
  z-index: 18;
`;
const searchBoxCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: absolute;
    width: 100%;
    ${isDeskTop && "padding: 20px 105px 50px;"}
    ${isTablet && "padding: 20px 50px 50px;"}
    ${isMobile && "padding: 20px 20px 50px;"}
    border-radius: 0 0 10px 10px;
    background-color: var(--back-color-2);
    box-shadow: var(--shadow-color);
    animation: ${visibleCSS("-200px")} 0.3s;
  `;
};
const boxBackCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "height: calc(100vh - 70px);"}
    ${isTablet && "height: calc(100vh - 110.8px);"}
    ${isMobile && "height: calc(100vh - 115px);"}
    background-color: #17171b55;
  `;
};
const searchContentWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "display: grid; grid-template-columns: 3fr 1fr; column-gap: 30px;"}
    ${!isDeskTop && "display: block;"}
  `;
};
const recentHistoryCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "border-right: 1px solid var(--border-color); padding-right:30px;"}
    margin-bottom: 30px;
    & > h3 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    & > div {
      ${isDeskTop && "max-width: 700px;"}
      ${!isDeskTop && "max-width: 600px;"}
    }
  `;
};
const noHistoryCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: grid;
    line-height: 50px;
    ${isDeskTop && "height: 150px; grid-template-columns: 200px; grid-template-rows: 60px 30px; "}
    ${!isDeskTop && "height: 100px; row-gap: 10px; grid-template-rows: 50px 30px; row-gap: 10px;"}
    /* background-color: antiquewhite; */
    & > div {
      ${!isDeskTop && "text-align: center;"}
    }
  `;
};
const booksWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    ${isDeskTop && "column-gap: 20px;"}
    ${!isDeskTop && "column-gap: 10px;"}
    overflow-x: scroll;
  `;
};
const bookWrapCSS = (isWebtoon)=>_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
  display: grid;
  grid-template-rows: 1fr 40px;
  line-height: 40px;
  & > span {
    position: absolute;
    z-index: 10;
    top: 0;
    display: block;
    /* width: 40px; */
    padding: 0 6px;
    text-align: center;
    font-weight: bold;
    height: 25px;
    line-height: 25px;
    border-radius: 5px 0px 5px 0px;
    background-color: ${isWebtoon ? "var(--main-color)" : "#fff"};
    color: ${!isWebtoon ? "var(--main-color)" : "#fff"};
    margin-right: 6px;
    font-size: 12px;
  }
`;
const titleCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
    line-height: 40px;
    align-items: center;
    width: 102px;
    ${isDeskTop ? "font-size: 14px;" : "font-size: 14px;"}
    & > span {
      display: block;
      width: 34px;
      text-align: center;
      font-weight: bold;
      ${isDeskTop ? "font-size: 10px;" : "font-size: 10px;"}
      height: 20px;
      line-height: 20px;
      border-radius: 5px;
      background-color: var(--main-color);
      margin-right: 6px;
    }
    & > div {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
};
const flipCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    cursor: pointer;
    position: absolute;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: antiquewhite; */
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--text-color-3);
    :hover svg {
      transition: all 0.3s;
      transform: translateY(-5px);
    }
  `;
};
const tagSearchCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    & > h3 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
      & > span {
        font-weight: normal;
        font-size: 12px;
        color: var(--text-color-2);
        padding-left: 10px;
      }
    }
    & button {
      margin-right: 6px;
      margin-bottom: 6px;
    }
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchBox);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4932);
/* harmony import */ var _OauthLogin_OauthLoginButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5339);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/** @jsxImportSource @emotion/react */ 





const RequireLogin = ()=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    const [currentTheme, setCurrentTheme] = (0,react__WEBPACK_IMPORTED_MODULE_5__.useState)();
    const onClickNaver = ()=>{
        const authUrl = "http://j8d203.p.ssafy.io:8081/api/oauth2/authorize/naver?redirect_uri=http://localhost:3000/oauth2/redirect" ?? 0;
        // console.log(authUrl);
        window.location.href = authUrl;
    };
    const onClickKakao = ()=>{
        const authUrl = "http://j8d203.p.ssafy.io:8081/api/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/oauth2/redirect" ?? 0;
        // console.log(authUrl);
        window.location.href = authUrl;
    };
    (0,react__WEBPACK_IMPORTED_MODULE_5__.useEffect)(()=>{
        const temp = document.documentElement.getAttribute("data-theme");
        setCurrentTheme(()=>temp);
    }, []);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: formWrapperCSS({
            isMobile
        }),
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: headerCSS,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        css: imageWrapperCSS(isDeskTop),
                        src: currentTheme === "dark" ? "/assets/emosaac_logo_white.png" : "/assets/emosaac_logo.png",
                        alt: "이모작의 로고입니다."
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: "로그인이 필요한 서비스입니다."
                    })
                ]
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: buttonWrapperCSS,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: eachButtonCSS,
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_OauthLogin_OauthLoginButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            src: "/assets/social_kakao.png",
                            alt: "카카오 로그인",
                            text: "카카오로 로그인",
                            backgroundColor: "#FEE502",
                            color: "#000",
                            onClick: onClickKakao
                        })
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_OauthLogin_OauthLoginButton__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                            src: "/assets/social_naver.png",
                            alt: "네이버 로그인",
                            text: "네이버로 로그인",
                            backgroundColor: "#24CD0B",
                            color: "#FFF",
                            onClick: onClickNaver
                        })
                    })
                ]
            })
        ]
    });
};
const formWrapperCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
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
const headerCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 10vh;
    justify-content: space-evenly;
`;
const imageWrapperCSS = (isDeskTop)=>_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  /* width: 70%;
  height: 70%; */
  /* 범위 안에서 안 짤리게 */
  /* cover는 짤리더라도 꽉 채우게 */
  object-fit: contain;
`;
const buttonWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  flex-direction: column;
`;
const eachButtonCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-bottom: 50px;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RequireLogin);


/***/ }),

/***/ 9189:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_NavigationBar_NavigationBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6259);
/* harmony import */ var _Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4932);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_UI_NavigationBar_NavigationBar__WEBPACK_IMPORTED_MODULE_2__]);
_UI_NavigationBar_NavigationBar__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 



const Layout = (props)=>{
    const [isDeskTop, isTablet, isMobile] = (0,_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__/* .useIsResponsive */ .j)();
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: backCSS({
            isDeskTop,
            isTablet,
            isMobile
        }),
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_NavigationBar_NavigationBar__WEBPACK_IMPORTED_MODULE_2__/* .NavigationBar */ .v, {
                myInfo: props.myInfo,
                isDarkMode: props.isDarkMode,
                setIsDarkMode: props.setIsDarkMode
            }),
            props.children
        ]
    });
};
const backCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100vw;
    height: 100vh;
    background-color: var(--back-color);
    color: var(--text-color);
    ${isDeskTop ? "padding-top: 70px;" : isTablet ? "padding-top: 110px;" : "padding: 60px 0 75px;"}
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7046:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports myInfo, addedBookListAtom, selectedBookListAtom, addedBookIdListAtom, selectedBookIdListAtom */
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2451);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jotai__WEBPACK_IMPORTED_MODULE_0__]);
jotai__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const mainStore = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.createStore)();
const myInfo = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)(null);
const addedBookListAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)([]);
const selectedBookListAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)([]);
const addedBookIdListAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)((get)=>get(addedBookListAtom).map((addedBook)=>addedBook.bookId));
const selectedBookIdListAtom = (0,jotai__WEBPACK_IMPORTED_MODULE_0__.atom)((get)=>get(addedBookListAtom).map((addedBook)=>addedBook.bookId));
// const readWriteAtom = atom(
//     (get) => get(priceAtom) * 2,
//     (get, set, newPrice) => {
//       set(priceAtom, newPrice / 2)
//       // set 로직은 원하는 만큼 지정할 수 있다.
//     }
//   )
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mainStore);


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9212:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(108);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jotai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2451);
/* harmony import */ var _jotai_atom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7046);
/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9189);
/* harmony import */ var _components_Responsive_useIsClient__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5797);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4932);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6511);
/* harmony import */ var _components_UI_FixedModal_FixedModal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6826);
/* harmony import */ var _components_UI_RequireLogin_RequireLogin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9967);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jotai__WEBPACK_IMPORTED_MODULE_2__, _jotai_atom__WEBPACK_IMPORTED_MODULE_3__, _components_layout_Layout__WEBPACK_IMPORTED_MODULE_4__, _api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_8__]);
([jotai__WEBPACK_IMPORTED_MODULE_2__, _jotai_atom__WEBPACK_IMPORTED_MODULE_3__, _components_layout_Layout__WEBPACK_IMPORTED_MODULE_4__, _api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











// import { useMediaQuery } from "react-responsive";
function App({ Component , pageProps  }) {
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_6__/* .useIsResponsive */ .j)();
    const isClient = (0,_components_Responsive_useIsClient__WEBPACK_IMPORTED_MODULE_5__/* .useIsClient */ .O)();
    const [isDarkMode, setIsDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    const [myInfo, setMyInfo] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
    const [loginModalState, setLoginModalState] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(()=>{
        if (window.localStorage.getItem("access_token")) {
            (0,_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)().then((res)=>{
                setMyInfo(()=>res);
            }).catch((err)=>{
                console.log("_app.tsx - getMyInfo => ", err);
                setMyInfo(()=>false);
            });
        } else {
            setMyInfo(()=>false);
        }
    }, [
        pageProps
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(jotai__WEBPACK_IMPORTED_MODULE_2__.Provider, {
        store: _jotai_atom__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("script", {
                src: "https://developers.kakao.com/sdk/js/kakao.js"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                myInfo: myInfo,
                isDarkMode: isDarkMode,
                setIsDarkMode: setIsDarkMode,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_FixedModal_FixedModal__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        content: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_RequireLogin_RequireLogin__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
                        modalState: loginModalState,
                        stateHandler: setLoginModalState,
                        forced: true,
                        blur: true,
                        isDarkMode: isDarkMode
                    }),
                    myInfo !== null && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                        ...pageProps,
                        myInfo: myInfo,
                        loginHandler: setLoginModalState,
                        isDarkMode: isDarkMode
                    })
                ]
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 108:
/***/ (() => {



/***/ }),

/***/ 2805:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react");

/***/ }),

/***/ 5193:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 4802:
/***/ ((module) => {

"use strict";
module.exports = require("cookie");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 9847:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/ai");

/***/ }),

/***/ 2750:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/fi");

/***/ }),

/***/ 1111:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/hi");

/***/ }),

/***/ 9989:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/io5");

/***/ }),

/***/ 4041:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/md");

/***/ }),

/***/ 8098:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/ri");

/***/ }),

/***/ 6666:
/***/ ((module) => {

"use strict";
module.exports = require("react-responsive");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 2451:
/***/ ((module) => {

"use strict";
module.exports = import("jotai");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,394,932,826,17,339], () => (__webpack_exec__(9212)));
module.exports = __webpack_exports__;

})();