"use strict";
exports.id = 932;
exports.ids = [932];
exports.modules = {

/***/ 5797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ useIsClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
//useIsClient.ts

const useIsClient = ()=>{
    const [isClient, setIsClient] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (false) {}
    }, []);
    return isClient;
};


/***/ }),

/***/ 4932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ useIsResponsive)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6666);
/* harmony import */ var react_responsive__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_responsive__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Responsive_useIsClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5797);



const useIsResponsive = ()=>{
    const isClient = (0,_components_Responsive_useIsClient__WEBPACK_IMPORTED_MODULE_2__/* .useIsClient */ .O)();
    const isDeskTop = (0,react_responsive__WEBPACK_IMPORTED_MODULE_1__.useMediaQuery)({
        query: "(min-width: 1024px)"
    });
    const isTablet = (0,react_responsive__WEBPACK_IMPORTED_MODULE_1__.useMediaQuery)({
        query: "(min-width: 768px)"
    });
    const isMobile = true;
    const [isClientDeskTop, setIsClientDeskTop] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isClientTablet, setIsClientTablet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [isClientMobile, setIsClientMobile] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setIsClientDeskTop(isClient && isDeskTop);
        setIsClientTablet(isClient && !isDeskTop && isTablet);
        setIsClientMobile(isClient && !isDeskTop && !isTablet && isMobile);
    }, [
        isClient,
        isDeskTop,
        isTablet,
        isMobile
    ]);
    return [
        isClientDeskTop,
        isClientTablet,
        isClientMobile
    ];
};


/***/ })

};
;