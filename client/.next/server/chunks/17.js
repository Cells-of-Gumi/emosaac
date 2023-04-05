"use strict";
exports.id = 17;
exports.ids = [17];
exports.modules = {

/***/ 1017:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/** @jsxImportSource @emotion/react */ 

const ToggleButton = ({ text , isClicked , onClick  })=>{
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            css: buttonCSS(isClicked),
            onClick: onClick,
            children: text
        })
    });
};
const buttonCSS = (isClicked)=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    cursor: pointer;
    font-size: 14px;
    width: fit-content;
    height: 30px;
    line-height: 30px;
    ${isClicked && "border: 1px solid var(--main-color); background-color: var(--main-color); color: black;"}
    ${!isClicked && "border: 1px solid var(--back-color); background-color: var(--back-color); color: var(--text-color);"}
    border-radius: 20px;
    padding: 0 10px;
    :hover {
      transition: all 0.2s;
      ${!isClicked && "border: 1px solid var(--main-color-2); background-color: var(--main-color-2); color: var(--text-color);"}
    }
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToggleButton);


/***/ })

};
;