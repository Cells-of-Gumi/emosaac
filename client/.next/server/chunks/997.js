"use strict";
exports.id = 997;
exports.ids = [997];
exports.modules = {

/***/ 12:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ putBookRating)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function putBookRating({ bookId , score , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.put */ .EC.put(`/books/score/${bookId}?score=${score}`, {
            headers
        });
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2008:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ getRelative)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// bookId = 0 -> 사용자가 최근 읽은 작품과 유사한 작품 추천
async function getRelative({ bookId , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/recommend/item?bookId=${bookId}`, {
            headers
        });
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;