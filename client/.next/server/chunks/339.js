"use strict";
exports.id = 339;
exports.ids = [339];
exports.modules = {

/***/ 5339:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ OauthLoginButton)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/** @jsxImportSource @emotion/react */ 

function OauthLoginButton({ text , src , alt , backgroundColor , color , onClick  }) {
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
            type: "button",
            style: {
                backgroundColor,
                color
            },
            css: oauthButtonCSS,
            onClick: onClick,
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: imageWrapCSS,
                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: src,
                        alt: alt,
                        css: socialLogoCSS
                    })
                }),
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: textWrapCSS,
                    children: text
                })
            ]
        })
    });
}
const oauthButtonCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  cursor: pointer;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 300px;
  height: 50px;
  position: relative;
  padding: 0px;
  border: none;
  border-radius: 5px;
`;
const imageWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 80px;
  display: flex;
  justify-content: center;
`;
const socialLogoCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  object-fit: contain;
  height: 100%;
`;
const textWrapCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  /* width: calc(100% - 80px); */
  margin-left: 45px;
`;


/***/ })

};
;