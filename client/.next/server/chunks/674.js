"use strict";
exports.id = 674;
exports.ids = [674];
exports.modules = {

/***/ 523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "y": () => (/* binding */ SearchListView)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6878);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4932);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/** @jsxImportSource @emotion/react */ 






const SearchListView = ({ books , type , getSearchBooks , booksWrapRef , prevId , prevScore , isPageEnd  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const [isDeskTop, isTablet, isMobile] = (0,_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__/* .useIsResponsive */ .j)();
    const [getBooks, setGetBooks] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (getBooks === true) {
            setGetBooks(()=>false);
            getSearchBooks(prevId, prevScore);
        }
    }, [
        getBooks
    ]);
    const onWheelHandler = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_4__.throttle)((event)=>{
            const htmlEl = document.getElementsByTagName("html")[0];
            if (isPageEnd === false) {
                if (htmlEl && htmlEl.clientHeight + htmlEl.scrollTop + 200 > htmlEl.scrollHeight) {
                    setGetBooks(()=>true);
                }
            }
        }, 300), [
        books
    ]);
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: booksWrapCSS({
            isDeskTop,
            isTablet,
            isMobile
        }),
        onWheel: onWheelHandler,
        onTouchMove: onWheelHandler,
        children: books && books.map((book, idx)=>/*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                bookData: book,
                showPlatform: true,
                width: "100%"
            }, idx))
    });
};
const booksWrapCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    padding-top: 20px;
    display: grid;
    ${isMobile && "grid-template-columns: repeat(3, 1fr);"}
    ${!isMobile && "grid-template-columns: repeat(5, 1fr);"}
    column-gap: 20px;
    row-gap: 30px;
  `;
};


/***/ }),

/***/ 1004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function batchim(name) {
    //name의 마지막 음절의 유니코드(UTF-16)
    const charCode = name.charCodeAt(name.length - 1);
    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
    const consonantCode = (charCode - 44032) % 28;
    if (consonantCode === 0) {
        //0이면 받침 없음 -> 가
        return "가";
    }
    //1이상이면 받침 있음 -> 이
    return "이";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (batchim);


/***/ })

};
;