"use strict";
(() => {
var exports = {};
exports.id = 532;
exports.ids = [532];
exports.modules = {

/***/ 4582:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ getListByTagName)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getListByTagName({ type , tagName , prevId , prevScore , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/search/tag/${type}/${tagName}?prevId=${prevId}&prevScore=${prevScore}&size=${size}`, {
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

/***/ 8713:
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
/* harmony import */ var _api_search_getSearchBooksByTagName__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4582);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4932);
/* harmony import */ var _components_search_SearchListView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(523);
/* harmony import */ var _components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1017);
/* harmony import */ var _components_search_batchim__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1004);
/* harmony import */ var _api_instance__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_search_getSearchBooksByTagName__WEBPACK_IMPORTED_MODULE_4__, _api_instance__WEBPACK_IMPORTED_MODULE_8__]);
([_api_search_getSearchBooksByTagName__WEBPACK_IMPORTED_MODULE_4__, _api_instance__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 









const tagName = ({ type , tagName , data  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__/* .useIsResponsive */ .j)();
    const [typeList, setTypeList] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([
        false,
        false,
        false
    ]);
    const [books, setBooks] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
    const [prevId, setPrevId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(0);
    const [prevScore, setPrevScore] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(10);
    const [isPageEnd, setIsPageEnd] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(data === null);
    const booksWrapRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const josa = (0,_components_search_batchim__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(tagName);
    function onClickType(type) {
        switch(type){
            case "total":
                setTypeList([
                    true,
                    false,
                    false
                ]);
                break;
            case "webtoon":
                setTypeList([
                    false,
                    true,
                    false
                ]);
                break;
            default:
                setTypeList([
                    false,
                    false,
                    true
                ]);
        }
        setIsPageEnd(false);
        router.push({
            pathname: `/search/tagname`,
            query: {
                type: type,
                query: tagName
            }
        });
    }
    function getSearchBooks(prevId, prevScore) {
        const size = 14;
        const token = localStorage.getItem("access_token");
        (0,_api_search_getSearchBooksByTagName__WEBPACK_IMPORTED_MODULE_4__/* .getListByTagName */ .n)({
            type,
            tagName,
            prevId,
            prevScore,
            size,
            token
        }).then((res)=>{
            if (res !== null && res?.length !== 0) {
                setBooks((prev)=>[
                        ...prev,
                        ...res
                    ]);
                const prevData = res.slice(-1)[0];
                setPrevId(prevData.bookId);
                setPrevScore(prevData.avgScore);
            } else {
                setIsPageEnd(true);
            }
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        switch(type){
            case "total":
                setTypeList([
                    true,
                    false,
                    false
                ]);
                break;
            case "webtoon":
                setTypeList([
                    false,
                    true,
                    false
                ]);
                break;
            default:
                setTypeList([
                    false,
                    false,
                    true
                ]);
        }
    }, [
        type
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (data) {
            setBooks(data);
            const prevData = data.slice(-1)[0];
            setPrevId(prevData?.bookId);
            setPrevScore(prevData?.avgScore);
        }
    }, [
        data
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (books !== null && books.length !== 0) {
            const prevData = books.slice(-1)[0];
            if (prevData !== null) {
                setPrevId(prevData?.bookId);
                setPrevScore(prevData?.avgScore);
            }
        }
    }, [
        books
    ]);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                css: [
                    innerPaddingCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    }),
                    headline2CSS
                ],
                children: "태그 검색 결과"
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: [
                    innerPaddingCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    }),
                    searchResCSS({
                        isDeskTop,
                        isTablet,
                        isMobile
                    })
                ],
                children: [
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: searchTagNameCSS,
                        children: [
                            '"#',
                            tagName,
                            '"',
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                css: josaCSS,
                                children: [
                                    josa,
                                    " 포함된 컨텐츠"
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: toggleWrapCSS,
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                text: "전체",
                                isClicked: typeList[0],
                                onClick: ()=>onClickType("total")
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                text: "웹툰",
                                isClicked: typeList[1],
                                onClick: ()=>onClickType("webtoon")
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_ToggleButton__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                text: "웹소설",
                                isClicked: typeList[2],
                                onClick: ()=>onClickType("novel")
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: innerCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                ref: booksWrapRef,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_search_SearchListView__WEBPACK_IMPORTED_MODULE_6__/* .SearchListView */ .y, {
                    books: books,
                    type: type,
                    getSearchBooks: getSearchBooks,
                    booksWrapRef: booksWrapRef,
                    prevId: prevId,
                    prevScore: prevScore,
                    isPageEnd: isPageEnd
                })
            })
        ]
    });
};
const headline2CSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  padding-top: 40px;
  font-weight: bold;
`;
const innerCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "margin: 20px 105px"}
    ${isTablet && "margin: 20px 50px"}
      ${isMobile && "margin: 20px 20px"}
  `;
};
const innerPaddingCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${isDeskTop && "padding: 20px 105px"}
    ${isTablet && "padding: 20px 50px"}
      ${isMobile && "padding: 20px 20px"}
  `;
};
const searchResCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${!isMobile && "display: flex; justify-content: space-between; align-items: center;"}
    ${isMobile && "display: block;"}
    font-size: 34px;
    background-color: var(--back-color-2);
    padding-top: 20px;
    padding-bottom: 20px;
  `;
};
const searchTagNameCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  height: 70px;
  display: flex;
  align-items: center;
`;
const josaCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 20px;
`;
const toggleWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  padding: 5px 0;
  display: flex;
  justify-content: flex-end;
  & > button {
    margin-left: 8px;
  }
`;
const booksWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return css`
    padding-top: 20px;
    display: grid;
    ${isMobile && "grid-template-columns: repeat(3, 1fr);"}
    ${!isMobile && "grid-template-columns: repeat(5, 1fr);"}
    column-gap: 20px;
    row-gap: 30px;
  `;
};
const getServerSideProps = async (context)=>{
    const type = context.query.type;
    const tagName = context.query.query;
    const [prevId, prevScore, size] = [
        0,
        10,
        14
    ];
    if (typeof type == "string" && typeof tagName == "string") {
        const token = (0,_api_instance__WEBPACK_IMPORTED_MODULE_8__/* .getToken */ .LP)(context.req);
        const data = await (0,_api_search_getSearchBooksByTagName__WEBPACK_IMPORTED_MODULE_4__/* .getListByTagName */ .n)({
            type,
            tagName,
            prevId,
            prevScore,
            size,
            token
        }).then((res)=>{
            return res;
        });
        return await {
            props: {
                type,
                tagName,
                data
            }
        };
    } else {
        return {
            props: {}
        };
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tagName);

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

/***/ 6517:
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 567:
/***/ ((module) => {

module.exports = require("react-icons/bs");

/***/ }),

/***/ 6666:
/***/ ((module) => {

module.exports = require("react-responsive");

/***/ }),

/***/ 7386:
/***/ ((module) => {

module.exports = require("react-simple-star-rating");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [394,932,878,17,674], () => (__webpack_exec__(8713)));
module.exports = __webpack_exports__;

})();