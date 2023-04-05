"use strict";
exports.id = 394;
exports.ids = [394];
exports.modules = {

/***/ 5394:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EC": () => (/* binding */ defaultAxiosInstance),
/* harmony export */   "LP": () => (/* binding */ getToken),
/* harmony export */   "ZX": () => (/* binding */ defaultAxiosFormDataInstance)
/* harmony export */ });
/* unused harmony export createDefaultInstance */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getToken(req) {
    if (false) {}
    if (req) {
        const cookies = cookie__WEBPACK_IMPORTED_MODULE_1___default().parse(req.headers.cookie || "");
        return cookies.access_token ? `Bearer ${cookies.access_token}` : null;
    }
    return null;
}
function createDefaultInstance(req) {
    const token = getToken(req);
    const instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
        baseURL: "http://j8d203.p.ssafy.io:8081/api",
        headers: {
            "Content-Type": "application/JSON;charset=utf-8",
            Authorization: token
        }
    });
    instance.interceptors.request.use((config)=>{
        const token = getToken(req);
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });
    return instance;
}
// function defaultInstace(req?: any) {
//   const token = getToken(req);
//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     headers: {
//       "Content-Type": "application/JSON;charset=utf-8",
//       Authorization: token,
//     },
//   });
//   instance.interceptors.request.use((config) => {
//     const token = getToken(req);
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   });
//   return instance;
// }
function defaultFormDataInstance() {
    const token = getToken();
    const instance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
        baseURL: "http://j8d203.p.ssafy.io:8081/api",
        headers: {
            "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundarylTMBUUyXqgLqmAdj",
            Authorization: token
        }
    });
    instance.interceptors.request.use((config)=>{
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });
    return instance;
}
const defaultAxiosInstance = createDefaultInstance();
const defaultAxiosFormDataInstance = defaultFormDataInstance(); // getToken() 함수:
 // 이 함수는 로컬 스토리지에서 "access_token"을 가져와서 "Bearer" 문자열과 함께 반환합니다.
 // 만약 로컬 스토리지에 토큰이 없거나 window 객체가 정의되지 않은 경우(서버사이드 렌더링과 같은 경우), 하드 코딩된 토큰을 반환합니다.
 // defaultInstace() 함수: 이 함수는 axios 인스턴스를 생성하고 기본 구성을 설정합니다.
 // baseURL은 NEXT_PUBLIC_API_BASE_URL 환경 변수에서 가져옵니다.
 // 헤더에는 "Content-Type"과 "Authorization"이 설정되어 있습니다.
 // 이 함수는 또한 인터셉터를 설정하여 요청에 토큰을 추가합니다.
 // defaultFormDataInstance() 함수:
 // 이 함수는 "Content-Type"을 "multipart/form-data"로 설정한 다른 axios 인스턴스를 생성합니다.
 // 이 인스턴스는 파일 업로드와 같은 경우에 사용됩니다.
 // 이 함수도 인터셉터를 설정하여 요청에 토큰을 추가합니다.
 // 마지막으로, 두 개의 인스턴스를 각각 defaultAxiosInstance와 defaultAxiosFormDataInstance로 내보냅니다. 이 인스턴스들은 다른 파일에서 임포트하여 API 요청을 수행하는 데 사용할 수 있습니다.
 // getToken() 함수:
 // 이 함수는 로컬 스토리지에서 "access_token"을 가져와서 "Bearer" 문자열과 함께 반환합니다.
 // 만약 로컬 스토리지에 토큰이 없거나 window 객체가 정의되지 않은 경우(서버사이드 렌더링과 같은 경우), 하드 코딩된 토큰을 반환합니다.
 // defaultInstace() 함수: 이 함수는 axios 인스턴스를 생성하고 기본 구성을 설정합니다.
 // baseURL은 NEXT_PUBLIC_API_BASE_URL 환경 변수에서 가져옵니다.
 // 헤더에는 "Content-Type"과 "Authorization"이 설정되어 있습니다.
 // 이 함수는 또한 인터셉터를 설정하여 요청에 토큰을 추가합니다.
 // defaultFormDataInstance() 함수:
 // 이 함수는 "Content-Type"을 "multipart/form-data"로 설정한 다른 axios 인스턴스를 생성합니다.
 // 이 인스턴스는 파일 업로드와 같은 경우에 사용됩니다.
 // 이 함수도 인터셉터를 설정하여 요청에 토큰을 추가합니다.
 // 마지막으로, 두 개의 인스턴스를 각각 defaultAxiosInstance와 defaultAxiosFormDataInstance로 내보냅니다. 이 인스턴스들은 다른 파일에서 임포트하여 API 요청을 수행하는 데 사용할 수 있습니다.

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;