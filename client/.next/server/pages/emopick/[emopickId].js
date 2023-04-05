"use strict";
(() => {
var exports = {};
exports.id = 45;
exports.ids = [45];
exports.modules = {

/***/ 1674:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ getEmopickDetail)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getEmopickDetail({ emopickId , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/emopicks/like/${emopickId}`, {
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

/***/ 1547:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5394);
/* harmony import */ var _api_emopick_getEmopickDetail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1674);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_instance__WEBPACK_IMPORTED_MODULE_1__, _api_emopick_getEmopickDetail__WEBPACK_IMPORTED_MODULE_2__]);
([_api_instance__WEBPACK_IMPORTED_MODULE_1__, _api_emopick_getEmopickDetail__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 


const index = ({ data  })=>{
    console.log(data);
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {})
        })
    });
};
const getServerSideProps = async (context)=>{
    const emopickId = await context.params;
    console.log(emopickId);
    // 토큰 가져오기
    const token = (0,_api_instance__WEBPACK_IMPORTED_MODULE_1__/* .getToken */ .LP)(context.req);
    // console.log(token);
    // 토큰을 getBookDetail 함수에 전달
    const data = await (0,_api_emopick_getEmopickDetail__WEBPACK_IMPORTED_MODULE_2__/* .getEmopickDetail */ .e)({
        emopickId,
        token
    }).then((res)=>{
        console.log(res);
        return res;
    }).catch((err)=>{
        console.log("pages/books/[emopickId].tsx => ", err);
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

/***/ 5193:
/***/ ((module) => {

module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

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
var __webpack_exports__ = __webpack_require__.X(0, [394], () => (__webpack_exec__(1547)));
module.exports = __webpack_exports__;

})();