"use strict";
(() => {
var exports = {};
exports.id = 689;
exports.ids = [689];
exports.modules = {

/***/ 1011:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ getEmopickList)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getEmopickList({ prevId , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/emopicks`, {
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

/***/ 835:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1111);
/* harmony import */ var react_icons_hi__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_hi__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4932);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/** @jsxImportSource @emotion/react */ 




const EmopickFloatingButton = ()=>{
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__/* .useIsResponsive */ .j)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: floatingButtonWrapperCSS(isMobile),
        onClick: ()=>router.push("/emopick/write"),
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_hi__WEBPACK_IMPORTED_MODULE_2__.HiOutlinePencil, {
                size: isMobile ? 30 : 35
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {})
        ]
    });
};
const floatingButtonWrapperCSS = (isMobile)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: fixed;
    width: ${isMobile ? "60px" : "80px"};
    height: ${isMobile ? "60px" : "80px"};
    background-color: var(--main-color);
    border-radius: 200px;
    right: ${isMobile ? "20px" : "40px"};
    bottom: ${isMobile ? "75px" : "40px"};
    z-index: 99;
    box-shadow: 0px 0px 5px 1px rgba(150, 150, 150, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    transition-property: padding;
    transition-duration: 0.2s;
    padding-bottom: 4px;
    cursor: pointer;
    &:hover {
      padding-right: ${isMobile ? "10px" : "14px"};
      & > span {
        left: ${isMobile ? "17px" : "23px"};
        width: ${isMobile ? "23px" : "31px"};
      }
    }
    & > span {
      position: absolute;
      bottom: ${isMobile ? "15px" : "22px"};
      left: ${isMobile ? "22px" : "30px"};
      background-color: var(--text-color);
      width: ${isMobile ? "18px" : "24px"};
      height: ${isMobile ? "2.4px" : "3px"};
      transition: all 0.2s;
    }
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmopickFloatingButton);


/***/ }),

/***/ 4928:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ emopick_EmopickListView)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./src/components/Responsive/useIsResponsive.ts
var useIsResponsive = __webpack_require__(4932);
// EXTERNAL MODULE: external "react-responsive"
var external_react_responsive_ = __webpack_require__(6666);
// EXTERNAL MODULE: external "react-icons/ri"
var ri_ = __webpack_require__(8098);
// EXTERNAL MODULE: external "react-icons/md"
var md_ = __webpack_require__(4041);
;// CONCATENATED MODULE: ./src/components/emopick/EmopickThumbnail.tsx
/** @jsxImportSource @emotion/react */ 




const EmopickThumbnail = ({ thumbnails , bookCnt , isMouseOnCard  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,useIsResponsive/* useIsResponsive */.j)();
    const [isMouseOnThumb, setIsMousOnThumb] = (0,external_react_.useState)(false);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        css: pickThumbnailWrapCSS({
            isDeskTop,
            isTablet,
            isMobile
        }, isMouseOnThumb, isMouseOnCard !== undefined && isMouseOnCard),
        onMouseOver: ()=>setIsMousOnThumb(true),
        onMouseLeave: ()=>setIsMousOnThumb(false),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            children: [
                thumbnails.split(" ").slice(0, 4).map((thumb, idx)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: thumb,
                            alt: "thumbnail"
                        })
                    }, idx)),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: isMouseOnCard || isMouseOnThumb ? "전체 보기" : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            bookCnt,
                            /*#__PURE__*/ jsx_runtime_.jsx(md_.MdOutlinePlaylistPlay, {
                                size: 20
                            })
                        ]
                    })
                })
            ]
        })
    });
};
const pickThumbnailWrapCSS = ({ isDeskTop , isTablet , isMobile  }, isMouseOnThumb, isMouseOnCard)=>react_.css`
    & > div:nth-of-type(1) {
      // 썸네일 다발
      width: ${!isMobile ? "210px" : "100px"};
      height: ${!isMobile ? "210px" : "100px"};
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      & > div {
        width: ${!isMobile ? "150px" : "70px"};
        height: ${!isMobile ? "210px" : "100px"};
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(1) {
        left: ${!isMobile ? "60px" : "30px"};
      }
      & > div:nth-of-type(2) {
        left: ${!isMobile ? "40px" : "20px"};
      }
      & > div:nth-of-type(3) {
        left: ${!isMobile ? "20px" : "10px"};
      }
      & > div:nth-of-type(4) {
        left: 0px;
      }
      & > div:nth-of-type(5) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        width: ${isMouseOnCard || isMouseOnThumb ? "100%" : "50%"};
        border-radius: 0px 10px 10px 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.7);
        transition: all 0.2s ease-in-out;
        & > svg {
          margin-top: 8px;
        }
      }
    }
  `;
/* harmony default export */ const emopick_EmopickThumbnail = (EmopickThumbnail);

// EXTERNAL MODULE: external "react-icons/ai"
var ai_ = __webpack_require__(9847);
;// CONCATENATED MODULE: ./src/components/emopick/EmopickCard.tsx
/** @jsxImportSource @emotion/react */ 








const EmopickCard = ({ emopick  })=>{
    const isEmoLimit = !(0,external_react_responsive_.useMediaQuery)({
        query: "(min-width: 1250px) or (max-width: 1023px)"
    });
    const router = (0,router_.useRouter)();
    const [isDeskTop, isTablet, isMobile] = (0,useIsResponsive/* useIsResponsive */.j)();
    const [isMouseOnCard, setIsMouseOnCard] = (0,external_react_.useState)(false);
    function onClickBox(emopickId) {
        router.push(`/emopick/${emopickId}`);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        onClick: ()=>onClickBox(emopick.emopickId),
        onMouseOver: ()=>setIsMouseOnCard(true),
        onMouseLeave: ()=>setIsMouseOnCard(false),
        css: pickWrapCSS({
            isDeskTop,
            isTablet,
            isMobile
        }),
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(emopick_EmopickThumbnail, {
                thumbnails: emopick.thumbnails,
                bookCnt: emopick.bookCnt,
                isMouseOnCard: isMouseOnCard
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                css: pickContentWrapCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(ri_.RiPlayCircleFill, {
                                        size: isMobile ? 20 : 24
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        children: emopick.title
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx(ai_.AiFillHeart, {}),
                                    " ",
                                    emopick.likeCnt,
                                    " \xb7 1시간 전"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    src: emopick.writerInfo.profileImg,
                                    alt: "profile"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: emopick.writerInfo.nickname
                            })
                        ]
                    })
                ]
            })
        ]
    }, emopick.emopickId);
};
const pickWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>react_.css`
  cursor: pointer;
  width: 100%;
  display: grid;
  grid-template-columns: ${!isMobile ? "210px 1fr" : "100px 1fr"};
  column-gap: ${!isMobile ? "20px" : "20px"};
  transition: all 0.3s;
`;
const pickContentWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>react_.css`
    /* padding: ${!isMobile ? "10px 0" : "10px 0"}; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    // 글 정보
    & > div:nth-of-type(1) {
      & > div:nth-of-type(1) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: ${isMobile ? "4px 0" : "10px 0"};
        font-weight: bold;
        & > div {
          font-size: ${isMobile ? "16px" : "20px"};
          margin-left: 4px;
        }
      }
      & > div:nth-of-type(2) {
        margin-left: 4px;
        color: var(--text-color-4);
        font-size: ${isMobile ? "12px" : "14px"};
        display: flex;
        & > svg {
          margin-right: 4px;
        }
      }
    }
    // 작성자 정보
    & > div:nth-of-type(2) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 10px 0;
      & > div:nth-of-type(1) {
        width: ${isMobile ? "24px" : "30px"};
        height: ${isMobile ? "24px" : "30px"};
        border-radius: 50px;
        overflow: hidden;
        background-color: var(--back-color-3);
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(2) {
        margin-left: ${isMobile ? "6px" : "10px"};
        font-size: ${isMobile ? "12px" : "16px"};
      }
    }
  `;
/* harmony default export */ const emopick_EmopickCard = (EmopickCard);

;// CONCATENATED MODULE: ./src/components/emopick/EmopickListView.tsx
/** @jsxImportSource @emotion/react */ 






const EmopickListView = (data)=>{
    const isEmoLimit = !(0,external_react_responsive_.useMediaQuery)({
        query: "(min-width: 1250px) or (max-width: 1023px)"
    });
    const router = (0,router_.useRouter)();
    const [emopickList, setEmopickList] = (0,external_react_.useState)(data);
    const [isDeskTop, isTablet, isMobile] = (0,useIsResponsive/* useIsResponsive */.j)();
    (0,external_react_.useEffect)(()=>{
        setEmopickList(data);
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            css: listWrapCSS({
                isDeskTop,
                isTablet,
                isMobile
            }, isEmoLimit),
            children: emopickList && emopickList?.data?.content.map((emopick)=>/*#__PURE__*/ jsx_runtime_.jsx(emopick_EmopickCard, {
                    emopick: emopick
                }))
        })
    });
};
const listWrapCSS = ({ isDeskTop , isTablet , isMobile  }, isEmoLimit)=>react_.css`
  display: grid;
  /* margin-top: 40px; */
  grid-template-columns: ${isDeskTop && !isEmoLimit ? "1fr 1fr" : "1fr"};
  column-gap: ${isMobile ? "10px" : "30px"};
  row-gap: ${isMobile ? "30px" : "40px"};
`;
/* harmony default export */ const emopick_EmopickListView = (EmopickListView);


/***/ }),

/***/ 207:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _api_instance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5394);
/* harmony import */ var _api_emopick_getEmopickList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1011);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4932);
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6666);
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_responsive__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_emopick_EmopickListView__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4928);
/* harmony import */ var _components_emopick_EmopickFloatingButton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(835);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_instance__WEBPACK_IMPORTED_MODULE_4__, _api_emopick_getEmopickList__WEBPACK_IMPORTED_MODULE_5__]);
([_api_instance__WEBPACK_IMPORTED_MODULE_4__, _api_emopick_getEmopickList__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 









const index = (data)=>{
    const isEmoLimit = !(0,react_responsive__WEBPACK_IMPORTED_MODULE_7__.useMediaQuery)({
        query: "(min-width: 1250px) or (max-width: 1023px)"
    });
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [emopickList, setEmopickList] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(data);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_6__/* .useIsResponsive */ .j)();
    function onClickBox(emopickId) {
        router.push(`/emopick/${emopickId}`);
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setEmopickList(data);
    }, []);
    console.log(emopickList);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_emopick_EmopickFloatingButton__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {}),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: pageTitleCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: [
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                children: [
                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: "emo"
                                    }),
                                    "PICK!"
                                ]
                            }),
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                children: [
                                    "이모작 유저들의 ",
                                    isMobile && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                    "추천 리스트를 만나보세요"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/assets/clap.png",
                        alt: "박수"
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: innerCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_emopick_EmopickListView__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                    ...data
                })
            })
        ]
    });
};
const innerCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    padding: ${isDeskTop ? "20px 105px" : isTablet ? "20px 50px" : "20px 20px"};
  `;
};
const pageTitleCSS = ({ isDeskTop , isTablet , isMobile  })=>_emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
  margin: ${isDeskTop ? "20px 105px" : isTablet ? "20px 50px" : "20px 20px"};
  padding: ${isDeskTop ? "20px 50px" : isTablet ? "20px 30px" : "20px 20px"};
  background: linear-gradient(-210deg, #f0b70c, var(--main-color));
  color: #000;
  height: ${isDeskTop ? "250px" : isTablet ? "200px" : "150px"};
  border-radius: ${!isMobile ? "20px" : "10px"};
  margin-top: ${!isMobile ? "30px" : "20px"};
  margin-bottom: ${!isMobile ? "50px" : "20px"};
  & > div:nth-of-type(1) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    & > h2 {
      letter-spacing: 0px;
      font-weight: 900;
      font-size: ${!isMobile ? "40px" : "24px"};
      line-height: ${!isMobile ? "50px" : "40px"};
      padding-top: ${isDeskTop ? "20px" : isTablet ? "10px" : "0px"};
      color: #000;
      & > span {
        font-size: ${!isMobile ? "50px" : "34px"};
      }
    }
    & > div {
      font-size: ${!isMobile ? "18px" : "14px"};
      color: #000;
      line-height: ${!isMobile ? "30px" : "16px"};
    }
  }
  & > img {
    position: absolute;
    bottom: ${isDeskTop ? "-30px" : isTablet ? "-20px" : "-20px"};
    right: ${isDeskTop ? "20px" : isTablet ? "15px" : "4px"};
    width: ${isDeskTop ? "300px" : isTablet ? "250px" : "150px"};
    height: ${isDeskTop ? "300px" : isTablet ? "250px" : "150px"};
    object-fit: contain;
    object-position: bottom center;
  }
`;
const getServerSideProps = async (context)=>{
    const [prevId, size] = [
        0,
        14
    ];
    const token = (0,_api_instance__WEBPACK_IMPORTED_MODULE_4__/* .getToken */ .LP)(context.req);
    const data = await (0,_api_emopick_getEmopickList__WEBPACK_IMPORTED_MODULE_5__/* .getEmopickList */ .Y)({
        prevId,
        size,
        token
    }).then((res)=>{
        return res;
    });
    return await {
        props: {
            data
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2805:
/***/ ((module) => {

module.exports = require("@emotion/react");

/***/ }),

/***/ 5193:
/***/ ((module) => {

module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 9847:
/***/ ((module) => {

module.exports = require("react-icons/ai");

/***/ }),

/***/ 1111:
/***/ ((module) => {

module.exports = require("react-icons/hi");

/***/ }),

/***/ 4041:
/***/ ((module) => {

module.exports = require("react-icons/md");

/***/ }),

/***/ 8098:
/***/ ((module) => {

module.exports = require("react-icons/ri");

/***/ }),

/***/ 6666:
/***/ ((module) => {

module.exports = require("react-responsive");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [394,932], () => (__webpack_exec__(207)));
module.exports = __webpack_exports__;

})();