"use strict";
(() => {
var exports = {};
exports.id = 360;
exports.ids = [360];
exports.modules = {

/***/ 6511:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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

/***/ 8778:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6511);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__]);
_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const ACCESS_TOKEN = "access_token";
function getUrlParameter(name, search) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
const OAuth2RedirectHandler = (props)=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        // console.log(props);
        // console.log(props.token);
        const token = getUrlParameter("token", window.location.search);
        const error = getUrlParameter("error", window.location.search);
        const code = getUrlParameter("code", window.location.search);
        console.log(code);
        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            (0,_api_user_getMyInfo__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)().then((userInfo)=>{
                if (userInfo) {
                    localStorage.setItem("userId", JSON.stringify(userInfo.userId));
                    localStorage.setItem("nickname", userInfo.nickname);
                    localStorage.setItem("imageUrl", userInfo.imageUrl);
                    localStorage.setItem("gender", JSON.stringify(userInfo.gender));
                    localStorage.setItem("age", JSON.stringify(userInfo.age));
                }
                console.log(userInfo);
            }).catch((error)=>{
                console.error("Error fetching user info:", error);
            });
            if (code === "200") {
                router.push({
                    pathname: "/",
                    query: {
                        from: router.asPath
                    }
                }).then(()=>{
                    window.history.replaceState({}, document.title, "/");
                });
            } else if (code === "201") {
                router.push({
                    pathname: "/survey",
                    query: {
                        from: router.asPath,
                        error: error
                    }
                }).then(()=>{
                    window.history.replaceState({}, document.title, "/mypage/edit");
                });
            } else {
                router.push({
                    pathname: "/error",
                    query: {
                        from: router.asPath
                    }
                }).then(()=>{
                    window.history.replaceState({}, document.title, "/error");
                });
            }
        } else {
            router.push({
                pathname: "/login",
                query: {
                    from: router.asPath,
                    error: error
                }
            }).then(()=>{
                window.history.replaceState({}, document.title, "/login");
            });
        }
    }, [
        router
    ]);
    return null;
};
const getServerSideProps = async (context)=>{
    const token = context.query.token;
    // console.log(token);
    // 쿠키에 토큰 저장
    if (token) {
        context.res.setHeader("Set-Cookie", cookie__WEBPACK_IMPORTED_MODULE_3___default().serialize(ACCESS_TOKEN, token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60,
            sameSite: "strict",
            path: "/"
        }));
    }
    return {
        props: {
            token
        }
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OAuth2RedirectHandler); // 위 코드에서 getServerSideProps 함수에서 token을 쿠키에 저장하도록 수정하였습니다.
 // context.res.setHeader를 사용하여 Set-Cookie 헤더를 설정하고, cookie.serialize 함수를 사용하여 쿠키 문자열을 생성합니다.
 // 렇게 하면 서버 측에서 쿠키에 토큰을 저장할 수 있습니다.
 // 또한, 코드에서 이미 클라이언트 측에서 localStorage에 토큰을 저장하고 있습니다.
 // 이제 클라이언트와 서버 모두에서 토큰이 사용 가능해졌습니다.
 // 이후에는 쿠키에서 토큰을 읽어서 API 요청 시 사용할 수 있습니다.
 // 참고로, httpOnly 옵션을 true로 설정하면 JavaScript를 통해 클라이언트 측에서 쿠키에 접근할 수 없습니다.
 // 이렇게 설정하면 XSS 공격으로부터 보호할 수 있습니다. 그러나 이 경우에는 클라이언트 측에서 쿠키에 저장된 토큰을 사용할 수 없으므로,
 // 클라이언트 측에서 필요한 경우 localStorage에 별도로 토큰을 저장해야 합니다.
 // 이 코드는 getServerSideProps 함수 내에서 주어진 토큰을 쿠키에 저장합니다.
 // 이 함수는 Next.js의 서버사이드 렌더링을 위한 것이며, context 객체를 통해 쿠키를 설정할 수 있습니다.
 // 주어진 코드에서, 토큰이 존재하면 (즉, token이 undefined가 아니면) context.res.setHeader 메서드를 사용하여 Set-Cookie 헤더를 설정합니다.
 // 이렇게 하면 쿠키에 토큰이 저장됩니다.
 // cookie.serialize() 메서드를 사용하여 쿠키 문자열을 생성합니다.
 // 이 메서드는 다음 옵션을 사용하여 쿠키를 설정합니다.
 // httpOnly: true: JavaScript에서 쿠키에 접근할 수 없게 설정합니다.
 // 이렇게 하면 클라이언트 측 스크립트를 통한 공격으로부터 쿠키를 보호할 수 있습니다.
 // maxAge: 30 * 24 * 60 * 60: 쿠키의 만료 시간을 30일로 설정합니다.
 // sameSite: "strict": 쿠키가 동일한 사이트에서만 전송되도록 설정합니다.
 // 이렇게 하면 CSRF 공격으로부터 보호할 수 있습니다.
 // path: "/": 쿠키가 모든 경로에서 사용할 수 있도록 설정합니다.
 // 이 코드를 사용하면 서버 사이드에서 토큰을 쿠키에 저장할 수 있습니다.
 // 이렇게 하면 클라이언트 사이드에서 getToken 함수를 사용하여 쿠키에 저장된 토큰을 가져올 수 있습니다

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
var __webpack_exports__ = __webpack_require__.X(0, [394], () => (__webpack_exec__(8778)));
module.exports = __webpack_exports__;

})();