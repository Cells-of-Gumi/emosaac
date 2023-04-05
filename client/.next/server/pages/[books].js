(() => {
var exports = {};
exports.id = 830;
exports.ids = [830];
exports.modules = {

/***/ 5578:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "SwipeableGallery_wrapper__6sK2n",
	"moveable": "SwipeableGallery_moveable__T49jy",
	"content": "SwipeableGallery_content__TGBBn"
};


/***/ }),

/***/ 2273:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ getBooksByDay)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getBooksByDay({ day , typeCode , genreCode , prevId , prevScore , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/books/day/${day}?typeCode=${typeCode}${genreCode !== undefined ? `&genreCode=${genreCode}` : ""}${prevId !== undefined ? `&prevId=${prevId}` : ""}${prevScore !== undefined ? `&prevScore=${prevScore}` : ""}${size !== undefined ? `&size=${size}` : ""}`, {
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

/***/ 4105:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ getBooksByGenre)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getBooksByGenre({ genreCode , typeCode , prevId , prevScore , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/books/genre/${genreCode}?typeCode=${typeCode}${prevId !== undefined ? `&prevId=${prevId}` : ""}${prevScore !== undefined ? `&prevScore=${prevScore}` : ""}${size !== undefined ? `&size=${size}` : ""}`, {
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

/***/ 6069:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ getGenres)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getGenres({ typeCode , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/genres?typeCode=${typeCode}`, {
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

/***/ 584:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ postOcr)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function createFormData(file) {
    const formdata = new FormData();
    if (file !== null) {
        formdata.append("file", file);
    }
    return formdata;
}
async function postOcr({ file , typeCode  }) {
    try {
        const formData = createFormData(file);
        const response = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosFormDataInstance.post */ .ZX.post(`/ocr?typeCode=${typeCode}`, formData);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 585:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ getHighPrediction)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getHighPrediction({ typeCode , prevId , prevScore , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const query1 = prevId !== undefined ? `&prevId=${prevId}` : "";
        const query2 = prevScore !== undefined ? `&prevScore=${prevScore}` : "";
        const query3 = size !== undefined ? `&size=${size}` : "";
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`recommend/prediction?typeCode=${typeCode}${query1}${query2}${query3}`, {
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

/***/ 6014:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ getMdRecommendation)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getMdRecommendation({ typeCode , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/recommend/md?typeCode=${typeCode}`, {
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

/***/ 8637:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ getPersonalRecommendation)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getPersonalRecommendation({ typeCode , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/recommend/user?typeCode=${typeCode}`, {
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

/***/ 3641:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ getReleased)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getReleased({ typeCode , prevId , prevRegist , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const query1 = prevId !== undefined ? `&prevId=${prevId}` : "";
        const query2 = prevRegist !== undefined ? `&prevRegist=${prevRegist}` : "";
        const query3 = size !== undefined ? `&size=${size}` : "";
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/recommend/newbook?typeCd=${typeCode}${query1}${query2}${query3}`, {
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

/***/ 4407:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ getTop30)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getTop30({ hit , typeCode , prevId , prevScore , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const query1 = prevId !== undefined ? `&prevId=${prevId}` : "";
        const query2 = prevScore !== undefined ? `&prevScore=${prevScore}` : "";
        const query3 = size !== undefined ? `&size=${size}` : "";
        const query4 = hit !== undefined ? `&hit=${hit}` : "";
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/recommend/best30?typeCd=${typeCode}${query1}${query2}${query3}${query4}`, {
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

/***/ 1477:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ getTop3GenreBooks)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getTop3GenreBooks({ order , typeCode , prevId , prevScore , size , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const query1 = prevId !== undefined ? `&prevId=${prevId}` : "";
        const query2 = prevScore !== undefined ? `&prevScore=${prevScore}` : "";
        const query3 = size !== undefined ? `&size=${size}` : "";
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/genres/total/like?typeCode=${typeCode}&order=${order}${query1}${query2}${query3}`, {
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

/***/ 5380:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ getUserCharacteristicRecommendation)
/* harmony export */ });
/* harmony import */ var _instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5394);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_instance__WEBPACK_IMPORTED_MODULE_0__]);
_instance__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function getUserCharacteristicRecommendation({ typeCode , token  }) {
    try {
        const headers = {};
        if (token) {
            headers.Authorization = token;
        }
        const { data  } = await _instance__WEBPACK_IMPORTED_MODULE_0__/* .defaultAxiosInstance.get */ .EC.get(`/recommend/user/ageAndGen?typeCode=${typeCode}`, {
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

/***/ 8971:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/** @jsxImportSource @emotion/react */ 

function Button({ onClick , width , height , children , cancelTheme  }) {
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
            css: buttonCSS({
                width,
                height,
                cancelTheme
            }),
            onClick: onClick,
            children: children
        })
    });
}
const buttonCSS = ({ width , height , cancelTheme  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    cursor: pointer;
    width: ${width};
    height: ${height};
    border: none;
    border-radius: 5px;
    font-size: 16px;
    padding: 0 20px;
    background-color: ${cancelTheme ? "var(--back-color)" : "var(--main-color)"};
    border: ${cancelTheme && "1px solid var(--border-color-2)"};
    /* color: black; */
  `;
};


/***/ }),

/***/ 3169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8252);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_easy_swipe__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5578);
/* harmony import */ var _SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4932);
/** @jsxImportSource @emotion/react */ 





const SwipeableGallery = ({ parentRef , content  })=>{
    const movingDiv = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [positionx, setPositionx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [contentCount, setContentCount] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
    const [endSwipe, setEndSwipe] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const postData = content;
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_4__/* .useIsResponsive */ .j)();
    const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [height, setHeight] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setWidth(()=>parentRef.current.clientWidth);
        setHeight(()=>parentRef.current.clientHeight);
        const resize = ()=>{
            setWidth(()=>parentRef.current.clientWidth);
            setHeight(()=>parentRef.current.clientHeight);
            if (movingDiv.current !== null && parentRef.current.clientWidth) {
                movingDiv.current.style.transitionDuration = "0s";
                movingDiv.current.style.transform = `translateX(${-parentRef.current.clientWidth * (contentCount - 1)}px)`;
            }
        };
        window.addEventListener(`resize`, resize);
        return ()=>{
            window.removeEventListener(`resize`, resize);
        };
    }, [
        contentCount
    ]);
    const onSwipeMove = (position = {
        x: 0
    })=>{
        setEndSwipe(false);
        if (postData.content.length === 1) {
            return;
        }
        if (contentCount >= postData.content.length && positionx < 0 || contentCount === 1 && positionx > 0 || width !== null && Math.abs(positionx) > width) {
            return;
        }
        if (movingDiv.current !== null && width !== null && position.x !== null) {
            movingDiv.current.style.transitionDuration = "0s";
            movingDiv.current.style.transform = `translateX(${positionx + -width * (contentCount - 1)}px)`;
            const x = position.x;
            setPositionx(()=>x);
        }
    };
    const onSwipeEnd = ()=>{
        if (movingDiv.current !== null && width !== null) {
            movingDiv.current.style.transitionDuration = "0.3s";
            if (positionx < -50 && contentCount < postData.content.length) {
                setContentCount((prev)=>prev + 1);
                movingDiv.current.style.transform = `translateX(${-width * contentCount}px)`;
            }
            if (positionx > 50 && contentCount > -1) {
                setContentCount((prev)=>prev - 1);
                movingDiv.current.style.transform = `translateX(${-width * (contentCount - 2)}px)`;
            }
            if (Math.abs(positionx) <= 50) {
                movingDiv.current.style.transform = `translateX(${-width * (contentCount - 1)}px)`;
            }
        }
        setPositionx(()=>0);
        setEndSwipe(true);
    };
    const onClickNextBtn = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (movingDiv.current !== null && width !== null) {
            if (contentCount < postData.content.length) {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount((prev)=>prev + 1);
                movingDiv.current.style.transform = `translateX(${-width * contentCount}px)`;
            } else {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount(()=>1);
                movingDiv.current.style.transform = `translateX(0px)`;
            }
        }
    }, [
        contentCount,
        width
    ]);
    const onClickPrevBtn = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(()=>{
        if (movingDiv.current !== null && width !== null) {
            if (contentCount > 1) {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount((prev)=>prev - 1);
                movingDiv.current.style.transform = `translateX(${-width * (contentCount - 2)}px)`;
            } else {
                movingDiv.current.style.transitionProperty = "transform";
                movingDiv.current.style.transitionDuration = "0.5s";
                setContentCount(()=>postData.content.length);
                movingDiv.current.style.transform = `translateX(${-width * (postData.content.length - 1)}px)`;
            }
        }
    }, [
        contentCount,
        width
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const autoSlide = setInterval(function() {
            onClickNextBtn();
        }, 10000);
        return ()=>{
            clearInterval(autoSlide);
        };
    }, [
        width,
        contentCount
    ]);
    //
    const indicator = postData.content.map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: indicatorCSS({
                idx,
                contentCount
            })
        }, `indicator-${idx}`);
    });
    const indicatorBtn = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: prevBtnCSS,
                onClick: onClickPrevBtn,
                children: "〈"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: nextBtnCSS,
                onClick: onClickNextBtn,
                children: "〉"
            })
        ]
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: outerWrapperCSS,
        children: [
            isMobile === false && indicatorBtn,
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: indicatorWrapperCSS({
                    isMobile
                }),
                children: indicator
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_easy_swipe__WEBPACK_IMPORTED_MODULE_3___default()), {
                onSwipeStart: (event)=>{
                    event.stopPropagation();
                },
                onSwipeEnd: onSwipeEnd,
                onSwipeMove: onSwipeMove,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: (_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default().wrapper),
                    children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: (_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default().moveable),
                        ref: movingDiv,
                        children: postData.content.map((el, idx)=>{
                            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_SwipeableGallery_module_css__WEBPACK_IMPORTED_MODULE_5___default().content),
                                style: {
                                    width: width + "px"
                                },
                                children: el
                            }, `banner-${idx}`); //, height: height + 'px'
                        })
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwipeableGallery);
const outerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
`;
const prevBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: white;
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
const nextBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: white;
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
const indicatorWrapperCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    z-index: 9;
    position: absolute;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    pointer-events: none;
    padding-bottom: ${isMobile ? "8px" : "16px"};
  `;
};
const indicatorCSS = ({ idx , contentCount  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 30px;
    height: 2px;
    background-color: ${contentCount - 1 === idx ? "white" : "gray"};
    margin: 2px;
  `;
};


/***/ }),

/***/ 6157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6878);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4932);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4018);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_useanimations__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8715);
/* harmony import */ var react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_7__);
/** @jsxImportSource @emotion/react */ 







const VerticalScroll = ({ API , identifier  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__/* .useIsResponsive */ .j)();
    const cardLayout = {
        width: isDeskTop ? "200px" : "45vw",
        height: isDeskTop ? "300px" : "70vw",
        minWidth: isDeskTop ? "200px" : "45vw",
        minHeight: isDeskTop ? "300px" : "70vw",
        padding: "0.5vw",
        margin: isDeskTop ? "16px" : "2vw"
    };
    const [fetchedData, setFetchedData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const [quantityPerPage, setQuantityPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(20);
    // const [offset, setOffset] = useState<number>(0)
    const [getFetch, setGetFetch] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const scrollWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const pageClassRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)([]);
    const actualPageRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [onScreenContentIdx, setOnScreenContentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const loadData = window.sessionStorage.getItem(`${identifier}-inf_fetched_data`);
        const loadPage = window.sessionStorage.getItem(`${identifier}-recent_page`);
        console.log("로드", loadData && JSON.parse(loadData));
        if (loadData) {
            setFetchedData(()=>JSON.parse(loadData));
        } else {
            API({
                size: quantityPerPage
            }).then((res)=>{
                if (res.content.length !== 0 || res.content !== null) {
                    const temp = [
                        [
                            ...res.content
                        ]
                    ];
                    setFetchedData(()=>temp);
                }
            }).catch((err)=>{});
        // API({fetchedData: fetchedData, size: quantityPerPage})
        // .then((res: returnBookContentType) => {
        //     if (res.content.length !== 0 || res.content !== null) {
        //         setFetchedData(() => [[...res.content]])
        //     }
        // })
        }
        if (loadPage) {
            setOnScreenContentIdx(()=>JSON.parse(loadPage));
        }
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const loadScroll = window.sessionStorage.getItem(`${identifier}-recent_scroll`);
        if (loadScroll && fetchedData.length !== 0) {
            // setTimeout(function() {
            // }, 1000)
            window.scrollTo(0, Number(JSON.parse(loadScroll)));
        }
    }, [
        fetchedData.length !== 0
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (getFetch === true && fetchedData) {
            const lastContent = fetchedData[fetchedData.length - 1][fetchedData[fetchedData.length - 1].length - 1];
            if (lastContent) {
                console.log(lastContent);
                API({
                    lastContent: lastContent,
                    size: quantityPerPage
                }).then((res)=>{
                    if (res.content.length !== 0 || res.content !== null) {
                        const temp = [
                            ...fetchedData,
                            [
                                ...res.content
                            ]
                        ];
                        setFetchedData(()=>temp);
                        // setOffset((prev) => prev + 1)
                        window.sessionStorage.setItem(`${identifier}-inf_fetched_data`, JSON.stringify(temp));
                    }
                });
            // API({fetchedData: fetchedData, prevId: lastContent.bookId, prevScore: lastContent.avgScore, size: quantityPerPage})
            // .then((res: returnBookContentType) => {
            //     // setFetchedData(() => [...fetchedData, [...res.content]])
            //     if (res.content.length !== 0 || res.content !== null) {
            //         const temp = [...fetchedData, [...res.content]]
            //         setFetchedData(() => temp)
            //         // setOffset((prev) => prev + 1)
            //         window.sessionStorage.setItem('inf_fetched_data', JSON.stringify(temp))
            //         console.log(fetchedData)
            //     }
            // })
            }
            setFetch(false);
        }
    }, [
        getFetch
    ]);
    const setFetch = (value)=>{
        setGetFetch(()=>value);
    };
    const onScrollHandler = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_3__.throttle)((event)=>{
            // if (window && (((document.body.scrollHeight - 10) < document.body.clientHeight) || document.body.scrollTop > document.body.scrollHeight - document.body.clientHeight - 100)) {
            //     setFetch(true)   
            // }
            if (document.documentElement.scrollTop !== 0) {
                window.sessionStorage.setItem(`${identifier}-recent_scroll`, String(document.documentElement.scrollTop));
            }
        }, 1000), [
        fetchedData
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        document.addEventListener("wheel", onScrollHandler);
        document.addEventListener("touchmove", onScrollHandler);
        return ()=>{
            document.removeEventListener("wheel", onScrollHandler);
            document.removeEventListener("touchmove", onScrollHandler);
        };
    }, []);
    const pageRender = fetchedData.map((page, pageIdx)=>{
        const contentRender = page.map((content, contentIdx)=>{
            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: cardWrapperCSS({
                    width: cardLayout.width,
                    height: cardLayout.height,
                    minWidth: cardLayout.minWidth,
                    minHeight: cardLayout.minHeight,
                    margin: cardLayout.margin
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    showPlatform: true,
                    bookData: content,
                    minWidth: cardLayout.minWidth,
                    minHeight: cardLayout.minHeight
                })
            }, `${identifier}-infinity-card-${pageIdx * quantityPerPage + contentIdx}`);
        });
        if (page.length !== 0) {
            return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`${isDeskTop ? "width: auto;" : "width: 100vw;"}`,
                id: `${pageIdx}`,
                ref: (el)=>{
                    pageClassRef.current[pageIdx] = el;
                },
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    ref: page.length === quantityPerPage ? actualPageRef : null,
                    css: contentPageWrapperCSS({
                        isMobile,
                        isTablet,
                        isDeskTop
                    }),
                    children: contentRender
                })
            }, `${identifier}-infinity-${pageIdx}`);
        }
    });
    const io = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            // entry의 target으로 DOM에 접근합니다.
            const $target = entry.target;
            // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
            if (entry.isIntersecting) {
                if ($target.id !== "scrollStart") {
                    setOnScreenContentIdx(()=>Number($target.id));
                    window.sessionStorage.setItem(`${identifier}-recent_page`, $target.id);
                }
                if ($target.id === "scrollStart" && fetchedData.length !== 0) {
                    setFetch(true);
                }
                console.log("화면에 보이는 Div", $target.id);
            // $target.classList.add("screening");
            }
        });
    });
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        pageClassRef.current.forEach((item)=>{
            if (item) {
                io.observe(item);
            }
        });
        if (scrollWrapperRef.current !== null) {
            io.observe(scrollWrapperRef.current);
        }
        return ()=>io.disconnect();
    }, [
        pageClassRef.current.length,
        fetchedData
    ]);
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: scrollWrapperCSS,
        children: [
            pageRender,
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: scrollDivSCC,
                id: "scrollStart",
                ref: scrollWrapperRef,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_useanimations__WEBPACK_IMPORTED_MODULE_6___default()), {
                    strokeColor: "var(--text-color)",
                    animation: (react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_7___default()),
                    size: 50
                })
            })
        ]
    });
};
const scrollWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`

    /* height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden; */
    display: flex;
        align-items: center;
        flex-direction: column;
`;
const contentPageWrapperCSS = ({ isMobile , isTablet , isDeskTop  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
        ${isDeskTop === false ? "width: 100vw;" : "width: 100%"};
        /* display: flex;
        flex-direction: column;
        align-items: center; */
        display: grid;
        grid-template-columns: ${isDeskTop ? "repeat(5,1fr)" : "50% 50%"};
        /* grid-template-columns: 50% 50%; */
        place-items: center;
        /* content-visibility: auto; */

    `;
};
const scrollDivSCC = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
    justify-content: center;
    height: 48px;
    font-size: 24px;
    font-weight: 700;
`;
const cardWrapperCSS = ({ width , height , minWidth , minHeight , margin  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
        width: ${width};
        height: ${height};
        margin: ${margin};
        content-visibility: auto;
    `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VerticalScroll);


/***/ }),

/***/ 7364:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6878);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8252);
/* harmony import */ var react_easy_swipe__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_easy_swipe__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4932);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);
/** @jsxImportSource @emotion/react */ 






const Waterfall = ({ bookData , windowWrapperRef , identifier  })=>{
    const [bookDataList, setBookDataList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([
        ...bookData
    ]);
    const [currentIdx, setCurrentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const dummyNormalRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    // const wrapperRef = useRef<any>([]);
    const carouselWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const dummyHighlightedRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_5__/* .useIsResponsive */ .j)();
    const [showCount, setShowCount] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(9);
    const cardLayout = {
        widthValue: 13,
        heightValue: 19,
        highlightedWidthValue: 17,
        highlightedHeightValue: 25,
        spaceValue: 5,
        unit: "vw",
        // min 관련 값들의 단위는 px
        minWidthValue: 150,
        minHeightValue: 225,
        minHighlightedWidthValue: 210,
        minHighlightedHeightValue: 280,
        minSpaceValue: 24
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (bookDataList[0].title !== bookDataList[bookDataList.length - showCount].title) {
            const temp = bookDataList.concat(bookDataList.slice(0, showCount));
            setBookDataList(()=>temp);
        }
    // console.log(bookDataList);
    // console.log(temp);
    }, []);
    // const handleResize = () => {
    //   if (carouselWrapperRef.current !== null) {
    //     const calcLeft =
    //     carouselWrapperRef.current.clientWidth > windowWrapperRef?.current?.offsetWidth
    //       ? -(
    //           carouselWrapperRef.current.clientWidth - windowWrapperRef?.current?.offsetWidth
    //         ) / 2 + "px" : "0px";
    //     carouselWrapperRef.current.style.left = calcLeft
    //   }
    // }
    const [windowWidth, setWindowWidth] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const handleResize = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_6__.throttle)((event)=>{
            if (carouselWrapperRef.current !== null && dummyNormalRef.current !== null) {
                const calcWidth = dummyNormalRef.current.clientWidth < cardLayout.minWidthValue ? (cardLayout.minWidthValue + cardLayout.minSpaceValue) * (showCount - 1) + cardLayout.minHighlightedWidthValue + "px" : (cardLayout.widthValue + cardLayout.spaceValue) * (showCount - 1) + cardLayout.highlightedWidthValue + cardLayout.unit;
                carouselWrapperRef.current.style.width = calcWidth;
                const calcLeft = carouselWrapperRef.current.clientWidth > windowWrapperRef?.current?.offsetWidth ? -(carouselWrapperRef.current.clientWidth - windowWrapperRef?.current?.offsetWidth) / 2 + "px" : "0px";
                carouselWrapperRef.current.style.left = calcLeft;
            }
            setWindowWidth(()=>window.innerWidth);
        }, 1000), []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const prevBtnHandler = ()=>{
        if (currentIdx > 0) {
            setCurrentIdx((prev)=>prev - 1);
        } else {
            setCurrentIdx(()=>bookDataList.length - showCount - 1);
        }
    };
    const nextBtnHandler = ()=>{
        if (currentIdx < bookDataList.length - showCount - 1) {
            setCurrentIdx((prev)=>prev + 1);
        } else {
            setCurrentIdx(()=>0);
        }
    };
    const renderBooks = bookDataList.slice(currentIdx, currentIdx + showCount).map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: imgWrapperCSS({
                idx,
                widthValue: cardLayout.widthValue,
                heightValue: cardLayout.heightValue,
                unit: cardLayout.unit,
                highlightedWidthValue: cardLayout.highlightedWidthValue,
                highlightedHeightValue: cardLayout.highlightedHeightValue,
                spaceValue: cardLayout.spaceValue,
                normalRef: dummyNormalRef,
                minWidthValue: cardLayout.minWidthValue,
                minHeightValue: cardLayout.minHeightValue,
                minHighlightedWidthValue: cardLayout.minHighlightedWidthValue,
                minHighlightedHeightValue: cardLayout.minHighlightedHeightValue,
                minSpaceValue: cardLayout.minSpaceValue,
                showCount: showCount
            }),
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_BookCard_BookCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                bookData: el,
                showPlatform: true
            })
        }, `${el.title}-${windowWidth}-${identifier}`);
    });
    const [positionx, setPositionx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const onSwipeMove = (position = {
        x: 0
    })=>{
        setPositionx(()=>position.x);
    };
    const onSwipeEnd = ()=>{
        console.log(positionx);
        if (positionx > 40) {
            prevBtnHandler();
        }
        if (positionx < -40) {
            nextBtnHandler();
        }
        setPositionx(()=>0);
    };
    const indicatorBtn = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: prevBtnCSS,
                onClick: prevBtnHandler,
                children: "〈"
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: nextBtnCSS,
                onClick: nextBtnHandler,
                children: "〉"
            })
        ]
    });
    return(// <div css={carouselOuterWrapperCSS({highlightedHeightValue: cardLayout.highlightedHeightValue, unit: cardLayout.unit, minHighlightedHeightValue: cardLayout.minHighlightedHeightValue, highlightedRef: dummyHighlightedRef})}></div>
    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "carousel-outer-wrapper",
        css: carouselOuterWrapperCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: highlightedDecoratorCSS({
                    highlightedHeightValue: cardLayout.highlightedHeightValue,
                    minHighlightedHeightValue: cardLayout.minHighlightedHeightValue,
                    unit: cardLayout.unit,
                    highlightedRef: dummyHighlightedRef,
                    carouselWrapperRef: carouselWrapperRef
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_easy_swipe__WEBPACK_IMPORTED_MODULE_4___default()), {
                onSwipeStart: (event)=>{
                    event.stopPropagation();
                },
                // onSwipeEnd={onSwipeEnd}
                onSwipeMove: onSwipeMove,
                onSwipeEnd: onSwipeEnd,
                children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    children: [
                        isMobile === false && indicatorBtn,
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            ref: carouselWrapperRef,
                            className: "carousel-inner-wrapper",
                            css: carouselInnerWrapperCSS({
                                widthValue: cardLayout.widthValue,
                                unit: cardLayout.unit,
                                highlightedWidthValue: cardLayout.highlightedWidthValue,
                                minWidthValue: cardLayout.minWidthValue,
                                minHighlightedWidthValue: cardLayout.minHighlightedWidthValue,
                                spaceValue: cardLayout.spaceValue,
                                minSpaceValue: cardLayout.minSpaceValue,
                                normalRef: dummyNormalRef,
                                carouselWrapperRef: carouselWrapperRef,
                                windowWrapperRef: windowWrapperRef,
                                showCount: showCount
                            }),
                            children: renderBooks
                        }),
                        /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            css: dummyWrapper,
                            children: [
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "dummy-normal",
                                    ref: dummyNormalRef,
                                    css: dummyNormalCSS({
                                        widthValue: cardLayout.widthValue,
                                        heightValue: cardLayout.heightValue,
                                        unit: cardLayout.unit
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "dummy-highlighted",
                                    ref: dummyHighlightedRef,
                                    css: dummyHighlightedCSS({
                                        highlightedWidthValue: cardLayout.highlightedWidthValue,
                                        highlightedHeightValue: cardLayout.highlightedHeightValue,
                                        unit: cardLayout.unit
                                    })
                                }),
                                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "dummy-min-highlighted",
                                    css: dummyMinHighlightedCSS({
                                        minHighlightedHeightValue: cardLayout.minHighlightedHeightValue
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Waterfall);
// interface carouselOuterWrapperCSSProps {
//     highlightedHeightValue: number;
//     unit: string;
//     minHighlightedHeightValue: number;
//     highlightedRef: any;
// }
// const carouselOuterWrapperCSS = ({highlightedHeightValue, unit, minHighlightedHeightValue, highlightedRef}: carouselOuterWrapperCSSProps) => {
//     const calcHeight = highlightedRef?.current?.clientHeight < minHighlightedHeightValue ? minHighlightedHeightValue + 'px' : highlightedHeightValue + unit
//     return css`
//         width: 100%;
//         height: ${calcHeight};
//         margin: 0 auto;
//         display:flex;
//         justify-content: center;
//     `
// }
const carouselOuterWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  margin: 0 auto;
  /* display:flex;
        justify-content: center; */
  display: grid;
  place-items: center;
  position: relative;
`;
const imgWrapperCSS = ({ idx , widthValue , heightValue , unit , highlightedWidthValue , highlightedHeightValue , spaceValue , normalRef , minWidthValue , minHeightValue , minHighlightedWidthValue , minHighlightedHeightValue , minSpaceValue , showCount  })=>{
    const calcWidth = normalRef?.current?.clientWidth < minWidthValue ? (idx === Math.floor(showCount / 2) ? minHighlightedWidthValue : minWidthValue) + "px" : (idx === Math.floor(showCount / 2) ? highlightedWidthValue : widthValue) + unit;
    const calcHeight = normalRef?.current?.clientHeight < minHeightValue ? (idx === Math.floor(showCount / 2) ? minHighlightedHeightValue : minHeightValue) + "px" : (idx === Math.floor(showCount / 2) ? highlightedHeightValue : heightValue) + unit;
    const calcLeft = normalRef?.current?.clientWidth < minWidthValue ? (idx > Math.floor(showCount / 2) ? idx * (minWidthValue + minSpaceValue) + (minHighlightedWidthValue - minWidthValue) : idx * (minWidthValue + minSpaceValue)) + "px" : (idx > Math.floor(showCount / 2) ? idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue) : idx * (widthValue + spaceValue)) + unit;
    const calcTop = normalRef?.current?.clientWidth < minWidthValue ? (idx !== Math.floor(showCount / 2) ? (minHighlightedHeightValue - minHeightValue) / 2 : 0) + "px" : (idx !== Math.floor(showCount / 2) ? (highlightedHeightValue - heightValue) / 2 : 0) + unit;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: left top width height;
    transition-duration: 0.3s;
    position: absolute;
    left: ${calcLeft};
    top: ${calcTop};
    /* left: ${(idx > 2 ? idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue) : idx * (widthValue + spaceValue)) + unit}; */
    /* top: ${(idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) + unit}; */
    width: ${calcWidth};
    height: ${calcHeight};
    visibility: ${idx < showCount ? "visible" : "hidden"};
    overflow: hidden;
  `;
};
// const imgWrapperCSS = ({idx, widthValue, heightValue, unit, highlightedWidthValue, highlightedHeightValue, spaceValue}: imgCSSProps) => {
//     return css`
//         transition-property: left top width height;
//         transition-duration: 0.3s;
//         position: absolute;
//         left: ${(idx > 2 ? (idx * (widthValue + spaceValue) + (highlightedWidthValue - widthValue)) : idx * (widthValue + spaceValue)) + unit};
//         top: ${(idx === 2 ? -(highlightedHeightValue - heightValue) / 2 : 0) + unit};
//         width: ${(idx === 2 ? highlightedWidthValue : widthValue) + unit};
//         height: ${(idx === 2 ? highlightedHeightValue : heightValue) + unit};
//         visibility: ${idx < 5 ? 'visible' : 'hidden'};
//         overflow: hidden;
//     `
// }
// interface imgCSSProps {
//     idx: number;
//     widthValue: number;
//     heightValue: number;
//     unit: string;
//     highlightedWidthValue: number;
//     highlightedHeightValue: number;
//     spaceValue: number;
//     normalRef: any;
//     highlightedRef: any;
//     minWidthValue: number;
//     minHeightValue: number;
//     minHighlightedWidthValue: number;
//     minHighlightedHeightValue: number;
//     minSpaceValue: number;
// }
// const imgCSS = ({idx, widthValue, unit, highlightedWidthValue, spaceValue}: imgCSSProps) => {
//     return css`
//         /* width: ${(idx === 2 ? highlightedWidthValue : widthValue) + unit};
//         height: auto; */
//         width: 100%;
//         height: auto;
//     `
// }
const imgCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: auto;
`;
const carouselInnerWrapperCSS = ({ widthValue , unit , highlightedWidthValue , spaceValue , minSpaceValue , minWidthValue , minHighlightedWidthValue , normalRef , carouselWrapperRef , windowWrapperRef , showCount  })=>{
    const calcWidth = normalRef?.current?.clientWidth < minWidthValue ? (minWidthValue + minSpaceValue) * (showCount - 1) + minHighlightedWidthValue + "px" : (widthValue + spaceValue) * (showCount - 1) + highlightedWidthValue + unit;
    const calcLeft = carouselWrapperRef?.current?.clientWidth > windowWrapperRef?.current?.offsetWidth ? -(carouselWrapperRef?.current?.clientWidth - windowWrapperRef?.current?.offsetWidth) / 2 + "px" : "0px";
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${calcWidth};
    left: ${calcLeft};
    position: relative;
    display: flex;
  `;
};
const dummyNormalCSS = ({ widthValue , heightValue , unit  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${widthValue + unit};
    height: ${heightValue + unit};
    pointer-events: none;
    /* display: none; */
  `;
};
const dummyHighlightedCSS = ({ highlightedWidthValue , highlightedHeightValue , unit  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${highlightedWidthValue + unit};
    height: ${highlightedHeightValue + unit};
    pointer-events: none;
    /* display: none; */
  `;
};
const prevBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--text-color);
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
const nextBtnCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 9;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  color: var(--text-color);
  transition-property: font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-size: 54px;
  }
`;
const highlightedDecoratorCSS = ({ highlightedHeightValue , minHighlightedHeightValue , unit , highlightedRef  })=>{
    const calcHeight = highlightedRef?.current?.clientHeight < minHighlightedHeightValue ? minHighlightedHeightValue + 48 + "px" : highlightedHeightValue + 5 + unit;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${calcHeight};
    height: ${calcHeight};
    background-color: var(--border-color-2);
    border-radius: 10000px;
    position: absolute;
  `;
};
const dummyMinHighlightedCSS = ({ minHighlightedHeightValue  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 1px;
    height: ${minHighlightedHeightValue}px;
    pointer-events: none;
  `;
};
const dummyWrapper = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  justify-content: center;
`;


/***/ }),

/***/ 2474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4932);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/** @jsxImportSource @emotion/react */ 



const DayList = ({ selected , selectHandler  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    const days = [
        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
        "일",
        "완결"
    ];
    const renderGenres = days.map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), {
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: tagWrapperCSS({
                    selected: selected,
                    curIdx: idx,
                    isMobile: isMobile
                }),
                onClick: ()=>{
                    selectHandler(idx);
                },
                children: el
            })
        }, `dayList-${el}`);
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: outerWrapperCSS({
            isMobile
        }),
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: tagListWrapperCSS({
                isMobile
            }),
            children: renderGenres
        })
    });
};
const outerWrapperCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* position: relative; */
    /* height: 16px; */
    border-top: 1px solid var(--border-color-2);
    height: ${isMobile ? "48px" : "64px"};;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* padding-left: 132px; */
    display: flex;
    margin: 0px 24px 0px 24px;
    background-color: var(--soft-grey);
  `;
};
const tagListWrapperCSS = ({ isMobile  })=>{
    const mask = `
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      var(--back-color) 5%,
      var(--back-color) 90%,
      rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      var(--back-color) 5%,
      var(--back-color) 90%,
      rgba(0, 0, 0, 0) 100%
  );
  `;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
  /* position: absolute; */
  /* margin-top: 12px; */
    
    overflow-x: scroll;
    padding-left: ${isMobile ? "10px" : "0px"};
    margin-left: ${isMobile ? "0px" : "0px"};
    
    padding-right: ${isMobile ? "10px" : "0px"};
    ${isMobile && mask}
    

    &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  `;
};
const tagWrapperCSS = ({ selected , curIdx , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* border-radius: 100px; */
    /* background-color: var(--back-color-2); */
    padding: 14px;
    margin-right: ${isMobile ? "0px" : "16px"};
    /* margin-bottom: 16px; */
    /* color: black; */
    white-space:pre;;
    color: ${selected === curIdx ? "var(--main-color)" : "var(--text-color-2)"};
    font-size: ${isMobile ? "16px" : "20px"};
    font-weight: 500;
    cursor: pointer;
    transition-property: color;
    transition-duration: 0.1s;
    user-select: none;
    &:hover {
      color: ${selected === curIdx ? "var(--main-color)" : "var(--text-color-4)"};
    }
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DayList);


/***/ }),

/***/ 9128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4932);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/** @jsxImportSource @emotion/react */ 



const GenreList = ({ genres , selected , selectHandler  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    const renderGenres = genres.map((el, idx)=>{
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), {
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: tagWrapperCSS({
                    selected: selected,
                    curIdx: el.genreId,
                    isMobile: isMobile
                }),
                onClick: ()=>{
                    selectHandler(el.genreId);
                },
                children: el.name
            })
        }, `genreList-${el.name}`);
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: outerWrapperCSS({
            isMobile
        }),
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            css: tagListWrapperCSS({
                isMobile
            }),
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: tagWrapperCSS({
                        selected: selected,
                        curIdx: -2,
                        isMobile: isMobile
                    }),
                    onClick: ()=>{
                        selectHandler(-2);
                    },
                    children: "추천"
                }),
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: tagWrapperCSS({
                        selected: selected,
                        curIdx: -1,
                        isMobile: isMobile
                    }),
                    onClick: ()=>{
                        selectHandler(-1);
                    },
                    children: "요일별"
                }),
                renderGenres
            ]
        })
    });
};
const outerWrapperCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* position: relative; */
    /* height: 16px; */
    height: ${isMobile ? "48px" : "84px"};
    width: 100%;
    justify-content: center;
    align-items: center;
    /* padding-left: 132px; */
    display: flex;
    margin: 0px 24px 0px 24px;
    background-color: var(--soft-grey);
  `;
};
const tagListWrapperCSS = ({ isMobile  })=>{
    const mask = `
    -webkit-mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      var(--back-color) 5%,
      var(--back-color) 90%,
      rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0%,
      var(--back-color) 5%,
      var(--back-color) 90%,
      rgba(0, 0, 0, 0) 100%
  );
  `;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
    /* position: absolute; */
    /* margin-top: 12px; */

    overflow-x: scroll;
    padding-left: ${isMobile ? "10px" : "0px"};
    margin-left: ${isMobile ? "0px" : "0px"};

    padding-right: ${isMobile ? "10px" : "0px"};
    ${isMobile && mask}

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  `;
};
const tagWrapperCSS = ({ selected , curIdx , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* border-radius: 100px; */
    /* background-color: var(--back-color-2); */
    padding: 14px;
    margin-right: ${isMobile ? "0px" : "16px"};
    /* margin-bottom: 16px; */
    /* color: black; */
    white-space: pre;
    color: ${selected === curIdx ? "var(--main-color)" : "var(--text-color-2)"};
    font-size: ${isMobile ? "16px" : "24px"};
    font-weight: 700;
    cursor: pointer;
    transition-property: color;
    transition-duration: 0.1s;
    user-select: none;
    &:hover {
      color: ${selected === curIdx ? "var(--main-color)" : "var(--text-color-4)"};
    }
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GenreList);


/***/ }),

/***/ 5048:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SortByDay)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _UI_VerticalScroll_VerticalScroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6157);
/* harmony import */ var _api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2273);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_3__]);
_api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 

// import { getToken } from "@/api/instance";

// import HorizontalCarousel from "../UI/ScrollableCarousel/HorizontalCarousel";

function SortByDay({ selectedDay , params  }) {
    const days = [
        "월",
        "화",
        "수",
        "목",
        "금",
        "토",
        "일",
        "완결"
    ];
    const getBooksByDayAPI = ({ lastContent , size  })=>{
        // return getBooksByGenre({genreCode: 11, typeCode: 0, prevId, prevScore, size})
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        return (0,_api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_3__/* .getBooksByDay */ .F)({
            day: days[selectedDay],
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size
        });
    };
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_VerticalScroll_VerticalScroll__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
            identifier: `sortBytDay-${params}-${selectedDay}`,
            API: getBooksByDayAPI
        }, `sortBytDay-${params}-${selectedDay}`)
    });
}
const infinityWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 100%;
  background-color: red;
`; // 이후 작업들...

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 981:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SortByGenre)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4105);
/* harmony import */ var _UI_VerticalScroll_VerticalScroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6157);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_2__]);
_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 


// import { getToken } from "@/api/instance";

function SortByGenre({ selectedGenre , params  }) {
    const getBooksByGenreAPI = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        return (0,_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_2__/* .getBooksByGenre */ .f)({
            genreCode: selectedGenre,
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size: size
        });
    };
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_VerticalScroll_VerticalScroll__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            identifier: `sortBytDay-${params}-${selectedGenre}`,
            API: getBooksByGenreAPI
        }, `sortByGenre-${params}-${selectedGenre}`)
    });
}
const infinityWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 100%;
  background-color: red;

` // 이후 작업들...
;

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 528:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4018);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_useanimations__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_useanimations_lib_archive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2265);
/* harmony import */ var react_useanimations_lib_archive__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_useanimations_lib_archive__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_function_Portal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(363);
/* harmony import */ var _FloatingButtonModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3857);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4932);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_FloatingButtonModal__WEBPACK_IMPORTED_MODULE_5__]);
_FloatingButtonModal__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 


// EVERY ANIMATION NEEDS TO BE IMPORTED FIRST -> YOUR BUNDLE WILL INCLUDE ONLY WHAT IT NEEDS





const FloatingButton = ({ isDarkMode  })=>{
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(null);
    const [modalToggler, setModalToggler] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    const [isMouseOn, setIsMouseOn] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_7__/* .useIsResponsive */ .j)();
    const showModal = ()=>{
        setModalToggler(()=>true);
        setIsMouseOn(()=>true);
    };
    const hideModal = ()=>{
        setIsMouseOn(()=>false);
        setTimeout(function() {
            setModalToggler(()=>false);
        }, 500);
    };
    const modal = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_function_Portal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        selector: ".overlay-root",
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FloatingButtonModal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
            modalToggler: modalToggler,
            isMouseOn: isMouseOn,
            setModalToggler: setModalToggler,
            parentRef: wrapperRef,
            isDarkMode: isDarkMode
        })
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: floatingButtonWrapperCSS({
            modalToggler,
            isMobile
        }),
        ref: wrapperRef,
        onClick: showModal,
        children: [
            modalToggler && modal,
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: iconWrapperCSS({
                    modalToggler
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_useanimations__WEBPACK_IMPORTED_MODULE_2___default()), {
                    strokeColor: "var(--text-color)",
                    animation: (react_useanimations_lib_archive__WEBPACK_IMPORTED_MODULE_3___default()),
                    size: isMobile ? 35 : 50
                })
            })
        ]
    });
};
const floatingButtonWrapperCSS = ({ modalToggler , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: fixed;
    width: ${isMobile ? "60px" : "80px"};
    height: ${isMobile ? "60px" : "80px"};
    background-color: var(--back-color);
    border-radius: 200px;
    right: ${isMobile ? "20px" : "40px"};
    bottom: ${isMobile ? "75px" : "40px"};
    z-index: 99;
    box-shadow: 0px 0px 5px 1px rgba(150, 150, 150, 0.4);
    display: flex;
    visibility: ${modalToggler ? "hidden" : "block"};
    justify-content: center;
    padding-top: 7px;
    cursor: pointer;
    &:hover {
      padding-top: 14px;
    }
  `;
};
const iconWrapperCSS = ({ modalToggler  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    visibility: ${modalToggler ? "hidden" : "block"};
    opacity: ${modalToggler ? "0%" : "100%"};
    transition-property: opacity;
    transition-duration: 0.5s;

  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingButton);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3857:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _api_ocr_postOcr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(584);
/* harmony import */ var _FloatingButtonModalSubmitForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6525);
/* harmony import */ var _FloatingButtonModalLoading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7383);
/* harmony import */ var _FloatingButtonModalFinish__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2922);
/* harmony import */ var _FloatingButtonModalError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7220);
/* harmony import */ var _ScanMain__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8614);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4932);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_ocr_postOcr__WEBPACK_IMPORTED_MODULE_4__, _ScanMain__WEBPACK_IMPORTED_MODULE_9__]);
([_api_ocr_postOcr__WEBPACK_IMPORTED_MODULE_4__, _ScanMain__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 










const FloatingButtonModal = ({ modalToggler , isMouseOn , setModalToggler , parentRef , isDarkMode  })=>{
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_10__/* .useIsResponsive */ .j)();
    const [contentToggler, setContentToggler] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isOpened, setisOpened] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isClosing, setIsClosing] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const [beforePhase, setBeforePhase] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [afterPhase, setAfterPhase] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [bookData, setBookData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const phaseHandler = (phase)=>{
        setBeforePhase(()=>phase);
        setTimeout(()=>{
            setAfterPhase(()=>phase);
        }, 500);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "auto";
        };
    }, []);
    const modalLayout = {
        widthValue: beforePhase === 0 ? isMobile ? 360 : 450 : beforePhase === 1 ? 280 : beforePhase === 2 ? isMobile ? 360 : 1920 : beforePhase === 3 ? 300 : beforePhase === 4 ? 300 : 300,
        heightValue: beforePhase === 0 ? 538 : beforePhase === 1 ? 280 : beforePhase === 2 ? isMobile ? 620 : 1080 : beforePhase === 3 ? 300 : beforePhase === 4 ? 300 : 300
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isMouseOn === true && modalToggler === true) {
            setContentToggler(()=>true);
            setisOpened(()=>true);
        }
    }, []);
    const modalHandler = ()=>{
        if (isMouseOn === true && contentToggler === true) {
            setTimeout(function() {
                if (wrapperRef.current !== null) {
                    wrapperRef.current.style.opacity = "0";
                }
            }, 500);
            setTimeout(function() {
                setModalToggler(()=>false);
            }, 500);
        } else {
            setTimeout(function() {
                setModalToggler(()=>false);
            }, 500);
        }
        setContentToggler(()=>false);
        setIsClosing(()=>true);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        router.beforePopState(({ url , as , options  })=>{
            if (as !== router.asPath) {
                window.history.pushState("", "");
                router.push(router.asPath);
                modalHandler();
                return false;
            }
            return true;
        });
        return ()=>{
            router.beforePopState(()=>true);
        };
    }, []);
    const onClickSubmitHandler = ({ image , contentType  })=>{
        if (image !== null && contentType !== null) {
            phaseHandler(1);
            (0,_api_ocr_postOcr__WEBPACK_IMPORTED_MODULE_4__/* .postOcr */ .e)({
                file: image,
                typeCode: contentType
            }).then((res)=>{
                if (res && res.length !== 0) {
                    setBookData(()=>res);
                    phaseHandler(2);
                } else {
                    setErrorMessage(()=>"이미지에 작품이 존재하지 않는 것 같습니다!");
                    phaseHandler(4);
                }
                console.log(res);
            }).catch((err)=>{
                console.log(err);
                setErrorMessage(()=>err.message);
                phaseHandler(4);
            });
        }
    };
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: backdropCSS({
                    isOpened,
                    isClosing
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                // onClick={modalHandler}
                // onWheelCapture={onWheelHandler}
                ref: wrapperRef,
                css: wrapperCSS({
                    modalToggler: contentToggler,
                    parentRef: parentRef,
                    wrapperRef: wrapperRef,
                    widthValue: modalLayout.widthValue,
                    heightValue: modalLayout.heightValue,
                    isClosing,
                    isOpened
                }),
                children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "inner-wrapper",
                    css: innerWrapperCSS({
                        modalToggler: modalToggler,
                        contentToggler: contentToggler,
                        isOpened: isOpened
                    }),
                    children: [
                        afterPhase === 0 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: phaseCSS({
                                targetPhase: 0,
                                beforePhase: beforePhase,
                                afterPhase: afterPhase
                            }),
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FloatingButtonModalSubmitForm__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                modalHandler: modalHandler,
                                phaseHandler: phaseHandler,
                                onClickSubmitHandler: onClickSubmitHandler,
                                isDarkMode: isDarkMode
                            })
                        }),
                        afterPhase === 1 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: phaseCSS({
                                targetPhase: 1,
                                beforePhase: beforePhase,
                                afterPhase: afterPhase
                            }),
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FloatingButtonModalLoading__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
                        }),
                        afterPhase === 2 && bookData !== null && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: phaseCSS({
                                targetPhase: 2,
                                beforePhase: beforePhase,
                                afterPhase: afterPhase
                            }),
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ScanMain__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                bookData: bookData,
                                phaseHandler: phaseHandler
                            })
                        }),
                        afterPhase === 3 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: phaseCSS({
                                targetPhase: 3,
                                beforePhase: beforePhase,
                                afterPhase: afterPhase
                            }),
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FloatingButtonModalFinish__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                modalHandler: modalHandler,
                                phaseHandler: phaseHandler
                            })
                        }),
                        afterPhase === 4 && errorMessage && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: phaseCSS({
                                targetPhase: 4,
                                beforePhase: beforePhase,
                                afterPhase: afterPhase
                            }),
                            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_FloatingButtonModalError__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                modalHandler: modalHandler,
                                phaseHandler: phaseHandler,
                                errorMessage: errorMessage,
                                setErrorMessage: setErrorMessage
                            })
                        })
                    ]
                })
            })
        ]
    });
};
const wrapperCSS = ({ modalToggler , parentRef , wrapperRef , widthValue , heightValue , isClosing , isOpened  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: absolute;
    /* z-index: 9; */
    transition-property: width height;
    will-change: width height left top transform;
    transition-duration: 0.5s;
    
    /* transition-timing-function: ease-in; */
    overflow: hidden;

    width: ${modalToggler ? `${widthValue === 1920 ? "100vw" : widthValue + "px"}` : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler ? `${heightValue === 1080 ? "100vh" : heightValue + "px"}` : `${parentRef?.current?.clientHeight}px`};
    left: ${modalToggler ? widthValue === 1920 ? "0px" : `calc(50vw - ${widthValue / 2}px)` : `${parentRef?.current?.getBoundingClientRect().left}px`};
    top: ${modalToggler ? heightValue === 1080 ? "0px" : `calc(50vh - ${heightValue / 2}px)` : `${parentRef?.current?.getBoundingClientRect().top}px`};


    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */

    background-color: var(--back-color-2);
    border-radius: ${modalToggler ? "10px" : `200px`};
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  `;
};
const innerWrapperCSS = ({ modalToggler , contentToggler , isOpened  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* opacity: ${contentToggler ? "255" : isOpened ? "255" : "0"}; */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  `;
};
const phaseCSS = ({ targetPhase , beforePhase , afterPhase  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: opacity;
    transition-duration: 0.5s;
    opacity: ${beforePhase === targetPhase ? "100%" : "0%"};
    width: 100%;
    height: 100%;
  `;
};
const backdropCSS = ({ isOpened , isClosing  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(10px);
    transition-property: opacity;
    transition-duration: 0.3s;
    opacity: ${isOpened ? isClosing ? "0%" : "100%" : "0%"};
    
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingButtonModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7220:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ FloatingButton_FloatingButtonModalError)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-useanimations"
var external_react_useanimations_ = __webpack_require__(4018);
var external_react_useanimations_default = /*#__PURE__*/__webpack_require__.n(external_react_useanimations_);
;// CONCATENATED MODULE: external "react-useanimations/lib/alertTriangle"
const alertTriangle_namespaceObject = require("react-useanimations/lib/alertTriangle");
var alertTriangle_default = /*#__PURE__*/__webpack_require__.n(alertTriangle_namespaceObject);
;// CONCATENATED MODULE: ./src/components/scan/FloatingButton/FloatingButtonModalError.tsx
/** @jsxImportSource @emotion/react */ 




const FloatingButtonModalError = ({ modalHandler , phaseHandler , errorMessage , setErrorMessage  })=>{
    (0,external_react_.useEffect)(()=>{
        setTimeout(()=>{
            // modalHandler()
            setErrorMessage(null);
            phaseHandler(0);
        }, 2000);
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        css: loadingWrapperCSS,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((external_react_useanimations_default()), {
                strokeColor: "var(--text-color)",
                animation: (alertTriangle_default()),
                size: 96
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                css: descWrapperCSS,
                children: errorMessage
            })
        ]
    });
};
const loadingWrapperCSS = react_.css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const descWrapperCSS = react_.css`
    margin: 16px;
    font-size: 24px;
    text-align: center;
`;
/* harmony default export */ const FloatingButton_FloatingButtonModalError = (FloatingButtonModalError);


/***/ }),

/***/ 2922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ FloatingButton_FloatingButtonModalFinish)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-useanimations"
var external_react_useanimations_ = __webpack_require__(4018);
var external_react_useanimations_default = /*#__PURE__*/__webpack_require__.n(external_react_useanimations_);
;// CONCATENATED MODULE: external "react-useanimations/lib/alertCircle"
const alertCircle_namespaceObject = require("react-useanimations/lib/alertCircle");
var alertCircle_default = /*#__PURE__*/__webpack_require__.n(alertCircle_namespaceObject);
;// CONCATENATED MODULE: ./src/components/scan/FloatingButton/FloatingButtonModalFinish.tsx
/** @jsxImportSource @emotion/react */ 




const FloatingButtonModalFinish = ({ modalHandler , phaseHandler  })=>{
    (0,external_react_.useEffect)(()=>{
        setTimeout(()=>{
            modalHandler();
            phaseHandler(10);
        }, 2000);
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        css: loadingWrapperCSS,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((external_react_useanimations_default()), {
                strokeColor: "var(--text-color)",
                animation: (alertCircle_default()),
                size: 96
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                css: descWrapperCSS,
                children: "저장 완료!"
            })
        ]
    });
};
const loadingWrapperCSS = react_.css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const descWrapperCSS = react_.css`
    margin-top: 16px;
    font-size: 32px;
`;
/* harmony default export */ const FloatingButton_FloatingButtonModalFinish = (FloatingButtonModalFinish);


/***/ }),

/***/ 7383:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4018);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_useanimations__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8715);
/* harmony import */ var react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_3__);
/** @jsxImportSource @emotion/react */ 



const FloatingButtonModalLoading = ()=>{
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: loadingWrapperCSS,
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_useanimations__WEBPACK_IMPORTED_MODULE_2___default()), {
                strokeColor: "var(--text-color)",
                animation: (react_useanimations_lib_loading2__WEBPACK_IMPORTED_MODULE_3___default()),
                size: 96
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: descWrapperCSS,
                children: "이미지를 분석중입니다."
            })
        ]
    });
};
const loadingWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const descWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    margin-top: 16px;
    font-size: 24px;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingButtonModalLoading);


/***/ }),

/***/ 6525:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UI_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8971);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4041);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_icons_md__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8098);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_5__);
/** @jsxImportSource @emotion/react */ 





const FloatingButtonModalSubmitForm = ({ modalHandler , phaseHandler , onClickSubmitHandler , isDarkMode  })=>{
    const [currentTheme, setCurrentTheme] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    const inputRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const temp = document.documentElement.getAttribute("data-theme");
        setCurrentTheme(()=>temp);
    }, []);
    const [image, setImage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [contentType, setContentType] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const onClickImageChange = (event)=>{
        if (event.target.files) {
            setImage(event.target.files[0]);
            console.log(inputRef);
        }
    };
    const descDetail = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "detail-backdrop",
        css: backdropCSS,
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            css: descDetailWrapperCSS,
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    css: exampleImgCSS,
                    src: "/assets/scan_example.jpg"
                }),
                /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    css: descStringWrapperCSS,
                    children: [
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`font-size: 18px; font-weight: 700; margin-bottom: 8px;`,
                            children: "어떤 이미지를 사용하면 되나요?"
                        }),
                        /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`font-size: 15px; font-weight: 500; color: var(--text-color-4);`,
                            children: "웹툰의 제목이 포함된 보관함이 잘 보이게 스크린샷을 찍고, 스캔을 시작하세요!"
                        })
                    ]
                })
            ]
        })
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: headerCSS,
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                css: headerIconCSS,
                                src: isDarkMode === true ? "/assets/scan_icon_white.png" : "/assets/scan_icon.png"
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                css: headerTitleCSS,
                                children: "작품 스캔"
                            }),
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                css: descWrapperCSS,
                                children: [
                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`color: var(--text-color-4); margin-top: 20px; margin-bottom: 5px;`,
                                        children: "각 플랫폼의 보관함을 캡쳐해서 가져올 수 있습니다."
                                    }),
                                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`color: var(--text-color-4);`,
                                        children: [
                                            "더 정확한 개인 맞춤형 추천이 가능해집니다.",
                                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                css: showMoreDetailCSS,
                                                children: [
                                                    "자세히",
                                                    descDetail
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: bodyCSS,
                        children: [
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                                method: "post",
                                encType: "multipart/form-data",
                                children: [
                                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        css: altInputCSS,
                                        children: [
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                css: altInputPathCSS,
                                                children: inputRef?.current?.files ? inputRef?.current?.files[0]?.name : "이미지를 첨부해 주세요."
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                css: altInputButtonCSS,
                                                className: "button",
                                                htmlFor: "chooseFile",
                                                children: "파일 선택"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        ref: inputRef,
                                        css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`display: none;`,
                                        type: "file",
                                        id: "chooseFile",
                                        name: "chooseFile",
                                        accept: "image/*",
                                        onChange: onClickImageChange
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                css: radioButtonSectorCSS,
                                children: [
                                    "스캔하려는 작품의 종류를 선택해 주세요!",
                                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        css: radioButtonInnerSectorCSS,
                                        children: [
                                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                css: radioButtonWrapperCSS({
                                                    targetType: 0,
                                                    currentType: contentType
                                                }),
                                                onClick: ()=>{
                                                    setContentType(()=>0);
                                                },
                                                children: [
                                                    contentType === 0 ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_4__.MdCookie, {
                                                        css: iconCSS,
                                                        size: 36
                                                    }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_4__.MdOutlineCookie, {
                                                        css: iconCSS,
                                                        size: 36
                                                    }),
                                                    "웹툰"
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                css: radioButtonWrapperCSS({
                                                    targetType: 1,
                                                    currentType: contentType
                                                }),
                                                onClick: ()=>{
                                                    setContentType(()=>1);
                                                },
                                                children: [
                                                    contentType === 1 ? /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_5__.RiBookReadFill, {
                                                        css: iconCSS,
                                                        size: 36
                                                    }) : /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_5__.RiBookReadLine, {
                                                        css: iconCSS,
                                                        size: 36
                                                    }),
                                                    "웹소설"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: footerCSS,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_Button__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        width: "47.5%",
                        height: "48px",
                        onClick: ()=>{
                            modalHandler();
                            phaseHandler(4);
                        },
                        cancelTheme: true,
                        children: "취소"
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_Button_Button__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        width: "47.5%",
                        height: "48px",
                        onClick: ()=>{
                            onClickSubmitHandler({
                                image,
                                contentType
                            });
                        },
                        children: "제출"
                    })
                ]
            })
        ]
    });
};
const footerCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  justify-content: space-between;;
  padding: 16px 16px 16px 16px;
  border-top: 1px solid var(--border-color-2);
  background-color: var(--back-color-2);
`;
const radioButtonSectorCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 160px;
  border-radius: 10px;
  /* border: 1px solid var(--border-color); */
  padding: 24px 0px 16px 0px;
  overflow: hidden;
  background-color: var(--back-color);
`;
const radioButtonInnerSectorCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;
const radioButtonWrapperCSS = ({ targetType , currentType  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    display: flex;
    align-items: center;
    border-radius: 10px;
    width: 45%;
    height: 84px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${targetType === currentType ? `var(--main-color)` : `var(--border-color-2)`};
    cursor: pointer;
  `;
};
const headerCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--back-color);
  border-bottom: 1px solid var(--border-color-2);
  padding-top: 20px;
`;
const headerTitleCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 24px;
  font-weight: 500;
`;
const headerIconCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 36px;
  height: 36px;
  margin-bottom: 16px;
`;
const bodyCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  padding: 16px;
`;
const altInputCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  /* border: 1px solid var(--border-color); */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: var(--back-color);
`;
const altInputPathCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  flex: 1;
  overflow:hidden;
  text-overflow:ellipsis;
  padding-right: 8px;
`;
const altInputButtonCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  transition-property: background-color;
  transition-duration: 0.3s;
  height: 100%;
  width: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--border-color-2);
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
`;
const iconCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-bottom: 6px;
`;
const descWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;
const showMoreDetailCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover .detail-backdrop {
    opacity: 100%;
  }
`;
const backdropCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  z-index: 999999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  transition-property: opacity;
  transition-duration: 0.3s;
  opacity: 0%;
  pointer-events: none;
  /* background-color: black; */
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;

`;
const descDetailWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 360px;
  height: 620px;
  background-color: var(--back-color);
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border-radius: 10px;;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;
const exampleImgCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  height: auto;
  width: 100%;
  border-radius: 10px;

`;
const descStringWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-top: 20px;
  
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingButtonModalSubmitForm);


/***/ }),

/***/ 8614:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Waterfall_Waterfall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2711);
/* harmony import */ var _Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4932);
/* harmony import */ var _UI_Button_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8971);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4018);
/* harmony import */ var react_useanimations__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_useanimations__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_useanimations_lib_activity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3160);
/* harmony import */ var react_useanimations_lib_activity__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_useanimations_lib_activity__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Waterfall_Waterfall__WEBPACK_IMPORTED_MODULE_2__]);
_Waterfall_Waterfall__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 






const ScanMain = ({ bookData , phaseHandler  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__/* .useIsResponsive */ .j)();
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: scanOuterWrapperCSS,
        children: [
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: headerCSS({
                    isMobile
                }),
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react_useanimations__WEBPACK_IMPORTED_MODULE_5___default()), {
                        strokeColor: "var(--text-color)",
                        animation: (react_useanimations_lib_activity__WEBPACK_IMPORTED_MODULE_6___default()),
                        size: isMobile ? 64 : 96
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: descWrapperCSS({
                            isMobile
                        }),
                        children: "읽은 작품들의 평가를 진행해 주세요!"
                    })
                ]
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "waterfall-wrapper",
                css: waterfallWrapperCSS,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Waterfall_Waterfall__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                    bookData: bookData,
                    identifier: "scanned",
                    rotate: 1,
                    duration: 2000
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`width: 100%; display: flex; justify-content: center; ${isMobile ? "margin-top: 50px;" : ""}`,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_UI_Button_Button__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    width: isMobile ? "50%" : "20%",
                    height: "64px",
                    onClick: ()=>{
                        phaseHandler(3);
                    },
                    children: "평가 완료"
                })
            })
        ]
    });
};
const scanOuterWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-content: center;
    /* margin-top: 50px; */
    /* padding-top: 3vw; */


`;
const descWrapperCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
        
        font-size: ${isMobile ? "5vw" : "3vw"};
        display: flex;
        justify-content: center;
        -webkit-box-align: center;
    `;
};
const waterfallWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* width: auto; */
    margin-top: 30px;
    

    
`;
const headerCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
        width: 100%;
        height: ${isMobile ? "40vw" : "12vw"};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: var(--back-color);
        border-bottom: 1px solid var(--border-color-2);
        /* padding-top: 20px; */
    `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScanMain);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2711:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4932);
/* harmony import */ var _useInterval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1206);
/* harmony import */ var _WaterfallCard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8463);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_WaterfallCard__WEBPACK_IMPORTED_MODULE_5__]);
_WaterfallCard__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 





const Waterfall = ({ bookData , identifier , rotate , duration  })=>{
    const [bookDataList, setBookDataList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([
        ...bookData
    ]);
    const [currentIdx, setCurrentIdx] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_3__/* .useIsResponsive */ .j)();
    const [isModalOn, setModalOn] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isIntervalOn, setIntervalOn] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [ratingList, setRatingList] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({});
    const responsiveLayout = {
        showCount: bookData.length > 9 ? 9 : bookData.length > 5 ? bookData.length % 2 === 0 ? bookData.length - 1 : bookData.length : bookData.length,
        width: isDeskTop ? 20 : isTablet ? 30 : isMobile ? 40 : 0,
        height: isDeskTop ? 30 : isTablet ? 45 : isMobile ? 60 : 0,
        heightCorrection: isDeskTop ? 2 : isTablet ? 4.2 : isMobile ? 9 : 0,
        unit: "vw"
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        // if (bookDataList[0].title !== bookDataList[bookDataList.length - responsiveLayout.showCount].title) {
        const temp = bookDataList.concat(bookDataList.slice(0, responsiveLayout.showCount));
        setBookDataList(()=>temp);
    // }
    }, []);
    const interval = (0,_useInterval__WEBPACK_IMPORTED_MODULE_4__/* .useInterval */ .Y)(()=>{
        if (isModalOn === false) {
            if (rotate === 1) {
                nextBtnHandler();
            } else if (rotate === -1) {
                prevBtnHandler();
            }
        }
    }, duration !== undefined ? duration : 1000);
    const prevBtnHandler = ()=>{
        if (currentIdx > 0) {
            setCurrentIdx((prev)=>prev - 1);
        } else {
            setCurrentIdx(()=>bookDataList.length - responsiveLayout.showCount - 1);
        }
    };
    const nextBtnHandler = ()=>{
        if (currentIdx < bookDataList.length - responsiveLayout.showCount - 1) {
            setCurrentIdx((prev)=>prev + 1);
        } else {
            setCurrentIdx(()=>0);
        }
    };
    const isModalOnHandler = (boolean)=>{
        setModalOn(()=>boolean);
    // setTimeout(() => {setIntervalOn(() => boolean)}, 1)
    };
    const renderBooks = bookDataList.slice(currentIdx, currentIdx + responsiveLayout.showCount).map((el, idx)=>{
        const calcRotate = isDeskTop ? 20 : 20;
        const result = (Math.floor(responsiveLayout.showCount / 2) - idx) * calcRotate;
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: cardCSS({
                duration,
                responsiveLayout,
                rotateY: result,
                idx,
                showCount: responsiveLayout.showCount,
                center: Math.floor(responsiveLayout.showCount / 2),
                isDeskTop,
                isTablet,
                isMobile,
                isModalOn
            }),
            children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_WaterfallCard__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                bookData: el,
                showPlatform: true,
                isModalOnHandler: isModalOnHandler,
                rotateY: result,
                waterfallWrapperRef: wrapperRef,
                width: "95%",
                height: "95%",
                setRatingList: setRatingList,
                ratingList: ratingList
            })
        }, `${identifier}-${el.title}`);
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "carousel-outer-wrapper",
        css: waterfallOuterWrapperCSS({
            responsiveLayout
        }),
        ref: wrapperRef,
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: waterfallInnerWrapperCSS,
            children: renderBooks
        })
    });
};
const cardCSS = ({ duration , responsiveLayout , rotateY , idx , showCount , center , isDeskTop , isTablet , isMobile , isModalOn  })=>{
    const widthCalc = (idx === 0 || idx === showCount - 1) && showCount > 3 ? "0px" : responsiveLayout.width + responsiveLayout.unit;
    const heightCalc = responsiveLayout.height + Math.abs(center - idx) * (Math.abs(center - idx) * responsiveLayout.heightCorrection) + responsiveLayout.unit;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transition-property: width height;
    transition-duration: ${duration ? duration : "1000"}ms;
    transition-timing-function: linear;
    position: relative;
    width: ${widthCalc};
    height:${heightCalc};
    /* background-color: white; */
    transform: rotateY(${rotateY}deg) translateZ(20px);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: width, height, transform;
  `;
};
const imgCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  height: 100%;
  width: auto;
`;
const waterfallOuterWrapperCSS = ({ responsiveLayout  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: auto;;
    height: ${responsiveLayout.height + responsiveLayout.unit};
    /* margin: 0 auto; */
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
};
const waterfallInnerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: auto;
  height: 100%;;
  perspective: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: blue; */
  /* margin: 0 auto; */
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Waterfall);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8463:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _WaterfallCardModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1917);
/* harmony import */ var _components_function_Portal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(363);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_WaterfallCardModal__WEBPACK_IMPORTED_MODULE_3__]);
_WaterfallCardModal__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 





const WaterfallCard = ({ bookData , showPlatform , width , height , minWidth , minHeight , margin , isModalOnHandler , rotateY , waterfallWrapperRef , setRatingList , ratingList  })=>{
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [modalToggler, setModalToggler] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isMouseOn, setIsMouseOn] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const platformBase = [
        "https://comic.naver.com/",
        "https://series.naver.com/",
        "https://page.kakao.com/",
        "https://ridibooks.com/"
    ];
    const showModal = ()=>{
        setModalToggler(()=>true);
        setIsMouseOn(()=>true);
        isModalOnHandler(true);
    };
    const hideModal = ()=>{
        setIsMouseOn(()=>false);
        setTimeout(function() {
            setModalToggler(()=>false);
        }, 500);
    };
    const platformRender = bookData?.href?.split(" ").map((el, idx)=>{
        const findPlatform = (element)=>{
            if (el.includes(element)) {
                return true;
            }
        };
        const result = platformBase.findIndex(findPlatform);
        return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
            src: result === 0 && "/assets/platform_naver_webtoon.webp" || result === 1 && "/assets/platform_naver_series.webp" || result === 2 && "/assets/platform_kakao_page.png" || result === 3 && "/assets/platform_ridi.webp" || "",
            css: platformIconCSS
        });
    });
    const modal = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_function_Portal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        selector: ".overlay-root",
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_WaterfallCardModal__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            modalToggler: modalToggler,
            isMouseOn: isMouseOn,
            setModalToggler: setModalToggler,
            bookData: bookData,
            parentRef: wrapperRef,
            imgHeight: height,
            imgMinHeight: minHeight,
            isModalOnHandler: isModalOnHandler,
            rotateY: rotateY,
            waterfallWrapperRef: waterfallWrapperRef,
            setRatingList: setRatingList,
            ratingList: ratingList
        })
    });
    const platformBar = /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: platformBarCSS,
        children: bookData.href && platformRender
    });
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "bookcard-outer-wrapper",
        css: cardOuterWrapper({
            width,
            height,
            minWidth,
            minHeight,
            margin
        }),
        ref: wrapperRef,
        onClick: showModal,
        children: [
            modalToggler && modal,
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "bookcard-inner-wrapper",
                css: cardInnerWrapperCSS({
                    width,
                    height,
                    minWidth,
                    minHeight
                }),
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        css: skeletonLoadingTagCSS({
                            state: bookData !== "LOADING" ? true : false
                        })
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        className: "img",
                        src: bookData && bookData.thumbnail,
                        alt: bookData && bookData.title,
                        css: imageCSS({
                            hasValue: ratingList[bookData.bookId] ? true : false
                        })
                    }),
                    showPlatform && bookData !== "LOADING" && platformBar
                ]
            })
        ]
    });
};
const cardOuterWrapper = ({ width , height , minWidth , minHeight , margin  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    ${margin && `margin: ${margin}`};
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
  `;
};
const cardInnerWrapperCSS = ({ width , height , minWidth , minHeight  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `;
};
const platformBarCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 2vw;
  min-height: 32px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 0;
  pointer-events: none;

  display: flex;
  align-items: center;
`;
const imageCSS = ({ hasValue  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: auto;
    height: 100%;
    transition: transform 0.3s;
    ${hasValue && "filter: brightness(20%)"};
    &:hover {
      transform: scale(1.1);
    }
  `;
};
const skeletonLoadingTagCSS = ({ state  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 100%;
    transition-property: opacity;
    transition-duration: 0.3s;
    border-radius: 10px;
    background-color: rgb(200, 200, 200);
    position: absolute;
    opacity: ${state ? "0" : "255"};
    pointer-events: none;
  `;
};
const platformIconCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 1.3vw;
    min-width: 20px;
    height: auto;
    margin: 10px;
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaterfallCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1917:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(567);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_bookDetail_StarRating__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6441);
/* harmony import */ var _components_bookDetail_TagList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6167);
/* harmony import */ var _api_book_putBookRating__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4932);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_book_putBookRating__WEBPACK_IMPORTED_MODULE_7__]);
_api_book_putBookRating__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/** @jsxImportSource @emotion/react */ 








const WaterfallCardModal = ({ modalToggler , isMouseOn , setModalToggler , bookData , parentRef , imgHeight , imgMinHeight , isModalOnHandler , rotateY , waterfallWrapperRef , setRatingList , ratingList  })=>{
    const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [contentToggler, setContentToggler] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isOpened, setisOpened] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isClosing, setIsClosing] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_8__/* .useIsResponsive */ .j)();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const modalLayout = {
        widthValue: isMobile ? 360 : 460,
        heightValue: isMobile ? 680 : 750
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        if (isMouseOn === true && modalToggler === true) {
            setContentToggler(()=>true);
            setisOpened(()=>true);
        }
    }, []);
    const modalHandler = ()=>{
        if (isMouseOn === true && contentToggler === true) {
            setTimeout(function() {
                if (wrapperRef.current !== null) {
                    wrapperRef.current.style.opacity = "0";
                }
                isModalOnHandler(false);
            }, 100);
            setTimeout(function() {
                setModalToggler(()=>false);
            }, 500);
        } else {
            setModalToggler(()=>false);
        }
        setContentToggler(()=>false);
        setIsClosing(()=>true);
    };
    const putBookRatingHandler = (score)=>{
        const temp = ratingList;
        temp[bookData.bookId] = score;
        setRatingList(()=>temp);
        (0,_api_book_putBookRating__WEBPACK_IMPORTED_MODULE_7__/* .putBookRating */ .K)({
            bookId: bookData.bookId,
            score: score
        });
    //   setRatingList,
    // ratingList,
    };
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`transform-style: preserve-3d;`,
        children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            css: outerWrapperCSS({
                waterfallWrapperRef
            }),
            children: [
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    css: backdropCSS({
                        isOpened,
                        isClosing
                    })
                }),
                /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    // onMouseLeave={modalHandler}
                    // onWheelCapture={onWheelHandler}
                    ref: wrapperRef,
                    css: wrapperCSS({
                        modalToggler: contentToggler,
                        parentRef: parentRef,
                        wrapperRef: wrapperRef,
                        widthValue: modalLayout.widthValue,
                        heightValue: modalLayout.heightValue,
                        rotateY,
                        isOpened,
                        isClosing
                    }),
                    children: /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        css: innerWrapperCSS({
                            modalToggler: modalToggler,
                            contentToggler: contentToggler,
                            isOpened: isOpened
                        }),
                        children: [
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                css: backgroundCSS({
                                    imgUrl: bookData.thumbnail
                                })
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                css: imageWrapperCSS,
                                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: bookData && bookData.thumbnail,
                                    alt: bookData && bookData.title,
                                    css: imageCSS({
                                        modalToggler: contentToggler,
                                        parentRef: parentRef,
                                        isClosing: isClosing,
                                        imgHeight: imgHeight,
                                        imgMinHeight: imgMinHeight,
                                        isMobile
                                    })
                                })
                            }),
                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                css: spaceDivCSS({
                                    isMobile
                                })
                            }),
                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                css: contentDivCSS,
                                children: [
                                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "book-info",
                                        css: bookInfoWrapperCSS,
                                        children: [
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                css: titleCSS,
                                                children: bookData.title
                                            }),
                                            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                css: additionalInfoWrapperCSS,
                                                children: [
                                                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        css: starRatingWrapperCSS,
                                                        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_StarRating__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                                            onClick: putBookRatingHandler,
                                                            readonly: false,
                                                            initialValue: ratingList[bookData.bookId] ? ratingList[bookData.bookId] : bookData.myScore
                                                        })
                                                    }),
                                                    bookData && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookDetail_TagList__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                                        tag: bookData.tag,
                                                        identifier: `waterfall-${bookData.bookId}`
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        css: _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`display:flex; flex-direction: column; align-items:end; justify-content:space-between;`,
                                        children: [
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                css: dateCSS,
                                                children: bookData.regist
                                            }),
                                            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__.BsArrowDownCircleFill, {
                                                css: icons,
                                                onClick: ()=>{
                                                    modalHandler();
                                                    isModalOnHandler(false);
                                                }
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};
const wrapperCSS = ({ modalToggler , parentRef , wrapperRef , widthValue , heightValue , rotateY , isOpened , isClosing  })=>{
    // const isLeftEdge =
    //   (widthValue - parentRef?.current?.clientWidth) / 2 >=
    //   parentRef?.current?.getBoundingClientRect().left;
    // const isRightEdge =
    //   parentRef?.current?.getBoundingClientRect().left +
    //     (widthValue - (widthValue - parentRef?.current?.clientWidth) / 2) >=
    //   document.body.offsetWidth;
    // const leftStandard = `left: ${
    //   modalToggler && isLeftEdge === true
    //     ? "42"
    //     : parentRef?.current?.getBoundingClientRect().left -
    //       (widthValue - parentRef?.current?.clientWidth) / 2
    // }px;`; // parentRef?.current?.getBoundingClientRect().left
    // const rightStandard = `left: ${
    //   modalToggler && isRightEdge === true
    //     ? document.body.offsetWidth - widthValue - 42
    //     : parentRef?.current?.getBoundingClientRect().left
    // }px`;
    // const activated = isRightEdge === true ? rightStandard : leftStandard;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    transform: ${isOpened ? isClosing ? `rotateY(${rotateY * 1.6}deg)` : null : `rotateY(${rotateY * 1.6}deg)`} ;
    position: absolute;
    z-index: 999999999;
    transition-property: width height;
    will-change: width, height, left, top, transform;
    transition-duration: 0.3s;
    /* transition-timing-function: ease-in; */
    overflow: hidden;
    /* left: calc(50vw - ${widthValue / 2}px); */
    left: ${modalToggler ? `calc(50vw - ${widthValue / 2}px)` : `${parentRef?.current?.getBoundingClientRect().left}px`};
    top: ${modalToggler ? `calc(50vh - ${heightValue / 2}px)` : `${parentRef?.current?.getBoundingClientRect().top}px`};
    width: ${modalToggler ? `${widthValue}px` : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler ? `${heightValue}px` : `${parentRef?.current?.clientHeight}px`};

    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */
        background-color: ${modalToggler ? _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`var(--back-color-2)` : `rgba(0,0,0,0)`};
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    
  `;
};
const innerWrapperCSS = ({ modalToggler , contentToggler , isOpened  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    /* opacity: ${contentToggler ? "255" : isOpened ? "255" : "0"}; */
    height: 100%;
    display: flex;
    flex-direction: column;
    
  `;
};
const backgroundCSS = ({ imgUrl  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 110%;
    position: absolute;
    left: -5%;
    top: -5%;
    height: 550px;
    background: no-repeat url("${imgUrl}") 0 / cover;
    filter: blur(10px);
    -webkit-filter: blur(10px);
    pointer-events: none;
    display: flex;
    justify-content: center;
  `;
};
const imageWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 550px;
  position: absolute;
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0), var(--back-color-2));
  pointer-events: none;
`;
const imageCSS = ({ modalToggler , parentRef , isClosing , imgHeight , imgMinHeight , isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    will-change: width height transform;
    transition-property: width height transform;
    transition-duration: 0.3s;
    ${modalToggler ? `transform: scale(1.0)` : isClosing ? `transform: scale(1.0)` : `transform: scale(1.1)`};
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${modalToggler ? isMobile ? "550px" : "600px" : `${parentRef?.current?.clientHeight}px`};
    min-height: ${imgMinHeight};
  `;
};
const spaceDivCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: ${isMobile ? "550px" : "600px"};
  `;
};
const contentDivCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  flex: 1 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
`;
const titleCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* width: 40%; */
`;
const dateCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  font-size: 13px;
  /* margin-top: 8px; */
  color: var(--text-color-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const icons = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  /* background-color: white; */
  color: var(--text-color-4);
  width: 52px;
  height: 52px;
  cursor: pointer;

  transition-property: color;
  transition-duration: 0.3s;

  &:hover {
    color: var(--text-color-3);
  }
`;
const starRatingWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  margin-top: 6px;
  margin-bottom: 6px;
`;
const bookInfoWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 80%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const additionalInfoWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`

`;
const backdropCSS = ({ isOpened , isClosing  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(30px);
    transition-property: opacity;
    transition-duration: 0.3s;
    opacity: ${isOpened ? isClosing ? "0%" : "100%" : "0%"};
    
  `;
};
const outerWrapperCSS = ({ waterfallWrapperRef  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: ${waterfallWrapperRef?.current?.clientWidth}px;
    height: 100vh;
    perspective: 100vw;
    display: flex;
    align-items: center;
    

  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaterfallCardModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ useInterval)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const useInterval = (callback, delay)=>{
    const savedCallback = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        savedCallback.current = callback;
    }, [
        callback
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        function tick() {
            if (savedCallback.current !== undefined) {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return ()=>clearInterval(id);
        }
    }, [
        delay
    ]);
};


/***/ }),

/***/ 7512:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Home),
/* harmony export */   "getStaticPaths": () => (/* binding */ getStaticPaths),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_UI_SwipeableCarousel_SwipeableGallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3169);
/* harmony import */ var _components_bookTab_HighlightedCarousel_HighlightedCarousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7364);
/* harmony import */ var _components_bookTab_RowTitle_RowTitle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8932);
/* harmony import */ var _components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4932);
/* harmony import */ var _api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4105);
/* harmony import */ var _api_book_getGenres__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6069);
/* harmony import */ var _components_bookTab_MenuTab_GenreList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9128);
/* harmony import */ var _components_bookTab_MenuTab_DayList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2474);
/* harmony import */ var _components_bookTab_SortByRows__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2132);
/* harmony import */ var _components_bookTab_SortByDay__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5048);
/* harmony import */ var _components_scan_FloatingButton_FloatingButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(528);
/* harmony import */ var _api_recommendation_getHighPrediction__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(585);
/* harmony import */ var _api_recommendation_getMdRecommendation__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6014);
/* harmony import */ var _api_recommendation_getPersonalRecommendation__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(8637);
/* harmony import */ var _api_recommendation_getRelative__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(2008);
/* harmony import */ var _api_recommendation_getReleased__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(3641);
/* harmony import */ var _api_recommendation_getTop3GenreBooks__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1477);
/* harmony import */ var _api_recommendation_getTop30__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(4407);
/* harmony import */ var _api_recommendation_getUserCharacteristicRecommendation__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(5380);
/* harmony import */ var _api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(2273);
/* harmony import */ var _components_bookTab_SortByGenre__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(981);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(6517);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_24__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_7__, _api_book_getGenres__WEBPACK_IMPORTED_MODULE_8__, _components_bookTab_SortByDay__WEBPACK_IMPORTED_MODULE_12__, _components_scan_FloatingButton_FloatingButton__WEBPACK_IMPORTED_MODULE_13__, _api_recommendation_getHighPrediction__WEBPACK_IMPORTED_MODULE_14__, _api_recommendation_getMdRecommendation__WEBPACK_IMPORTED_MODULE_15__, _api_recommendation_getPersonalRecommendation__WEBPACK_IMPORTED_MODULE_16__, _api_recommendation_getRelative__WEBPACK_IMPORTED_MODULE_17__, _api_recommendation_getReleased__WEBPACK_IMPORTED_MODULE_18__, _api_recommendation_getTop3GenreBooks__WEBPACK_IMPORTED_MODULE_19__, _api_recommendation_getTop30__WEBPACK_IMPORTED_MODULE_20__, _api_recommendation_getUserCharacteristicRecommendation__WEBPACK_IMPORTED_MODULE_21__, _api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_22__, _components_bookTab_SortByGenre__WEBPACK_IMPORTED_MODULE_23__]);
([_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_7__, _api_book_getGenres__WEBPACK_IMPORTED_MODULE_8__, _components_bookTab_SortByDay__WEBPACK_IMPORTED_MODULE_12__, _components_scan_FloatingButton_FloatingButton__WEBPACK_IMPORTED_MODULE_13__, _api_recommendation_getHighPrediction__WEBPACK_IMPORTED_MODULE_14__, _api_recommendation_getMdRecommendation__WEBPACK_IMPORTED_MODULE_15__, _api_recommendation_getPersonalRecommendation__WEBPACK_IMPORTED_MODULE_16__, _api_recommendation_getRelative__WEBPACK_IMPORTED_MODULE_17__, _api_recommendation_getReleased__WEBPACK_IMPORTED_MODULE_18__, _api_recommendation_getTop3GenreBooks__WEBPACK_IMPORTED_MODULE_19__, _api_recommendation_getTop30__WEBPACK_IMPORTED_MODULE_20__, _api_recommendation_getUserCharacteristicRecommendation__WEBPACK_IMPORTED_MODULE_21__, _api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_22__, _components_bookTab_SortByGenre__WEBPACK_IMPORTED_MODULE_23__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/** @jsxImportSource @emotion/react */ 


// import ScrollableCarousel from "@/components/UI/ScrollableCarousel/ScrollableCarousel";




// import contentBannerDesktop from "/assets/content_banner_desktop_tablet.png"
// import contentBannerMobile from "/assets/content_banner_mobile.png"







// import HorizontalCarousel from "@/components/UI/ScrollableCarousel/HorizontalCarousel";











function Home({ highlightedBookData , genres , params , isDarkMode , myInfo  }) {
    // webtoon, novel
    const parentRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const indexWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const [selectedGenre, setSelectedGenre] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(window.sessionStorage.getItem(`${params}-selected_genre`) ? Number(window.sessionStorage.getItem(`${params}-selected_genre`)) : -2);
    const [isDeskTop, isTablet, isMobile] = (0,_components_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_6__/* .useIsResponsive */ .j)();
    const [isScrolling, setIsScrolling] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const [selectedDay, setSelectedDay] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(window.sessionStorage.getItem(`${params}-selected_day`) ? Number(window.sessionStorage.getItem(`${params}-selected_day`)) : 0);
    // useEffect(() => {
    //   return () => {
    //     setSelectedGenre(() => window.localStorage.getItem(`${params}-_genre`) ? Number(window.localStorage.getItem(`${params}-selected_genre`)) : -2)
    //   setSelectedDay(() => window.localStorage.getItem(`${params}-selected_day`) ? Number(window.localStorage.getItem(`${params}-selected_day`)) : 0)
    //   }
    // }, [params])
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        window.addEventListener("scroll", throttleScroll);
        window.addEventListener("scroll", debounceScroll);
        return ()=>{
            window.removeEventListener("scroll", throttleScroll); //clean up
            window.removeEventListener("scroll", debounceScroll); //clean up
        };
    }, []);
    const throttleScroll = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_24__.throttle)(()=>{
            if (indexWrapperRef.current) {
                indexWrapperRef.current.style.pointerEvents = "none";
            }
            setIsScrolling(()=>true);
        }, 100), []);
    const debounceScroll = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(()=>(0,lodash__WEBPACK_IMPORTED_MODULE_24__.debounce)(()=>{
            if (indexWrapperRef.current) {
                indexWrapperRef.current.style.pointerEvents = "auto";
            }
            setIsScrolling(()=>false);
        }, 200), []);
    // ________________________________________________________________________________________________
    // 임시 데이터
    const postData = {
        content: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: isMobile ? "/assets/temp_banner_1_mobile.png" : "/assets/temp_banner_1.png",
                alt: "",
                css: bannerImage
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                src: isMobile ? "/assets/temp_banner_2_mobile.png" : "/assets/temp_banner_2.png",
                alt: "",
                css: bannerImage
            })
        ]
    };
    // const getBookData = recvBooks(0, 20).then((res: any) =>
    //   setBookData(() => res)
    // );
    const [bookData, setBookData] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    // ________________________________________________________________________________________________
    const selectGenreHandler = (selected)=>{
        window.sessionStorage.setItem(`${params}-selected_genre`, String(selected));
        setSelectedGenre(()=>selected);
    };
    const selectDayHandler = (selected)=>{
        window.sessionStorage.setItem(`${params}-selected_day`, String(selected));
        setSelectedDay(()=>selected);
    };
    const days = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ];
    const getBooksByDayAPI = ({ lastContent , size  })=>{
        // return getBooksByGenre({genreCode: 11, typeCode: 0, prevId, prevScore, size})
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        return (0,_api_book_getBooksByDay__WEBPACK_IMPORTED_MODULE_22__/* .getBooksByDay */ .F)({
            day: days[new Date().getDay()],
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            genreCode: selectedGenre,
            size
        });
    };
    const getBooksByGenreAPI = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        return (0,_api_book_getBooksByGenre__WEBPACK_IMPORTED_MODULE_7__/* .getBooksByGenre */ .f)({
            genreCode: selectedGenre,
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size: size
        });
    };
    const getHighPredictionAPI = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.predictScore : 10;
        return (0,_api_recommendation_getHighPrediction__WEBPACK_IMPORTED_MODULE_14__/* .getHighPrediction */ .I)({
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size: size
        });
    };
    const getReleasedAPI = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 20000;
        const prevRegist = lastContent ? lastContent.regist : "2023.03.20";
        return (0,_api_recommendation_getReleased__WEBPACK_IMPORTED_MODULE_18__/* .getReleased */ .F)({
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevRegist: prevRegist,
            size: size
        });
    };
    const getTop1GenreBooksAPI = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        return (0,_api_recommendation_getTop3GenreBooks__WEBPACK_IMPORTED_MODULE_19__/* .getTop3GenreBooks */ .Y)({
            order: 1,
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size: size
        });
    };
    const getTop2GenreBooksAPI = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 0;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        return (0,_api_recommendation_getTop3GenreBooks__WEBPACK_IMPORTED_MODULE_19__/* .getTop3GenreBooks */ .Y)({
            order: 2,
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size: size
        });
    };
    const getTop30API = ({ lastContent , size  })=>{
        const prevId = lastContent ? lastContent.bookId : 20000;
        const prevScore = lastContent ? lastContent.avgScore : 10;
        const hit = lastContent ? lastContent.hit : 1000;
        return (0,_api_recommendation_getTop30__WEBPACK_IMPORTED_MODULE_20__/* .getTop30 */ .S)({
            typeCode: params === "webtoon" ? 0 : 1,
            prevId: prevId,
            prevScore: prevScore,
            size: size,
            hit: hit
        });
    };
    const getMdRecommendationAPI = ({ lastContent , size  })=>{
        return (0,_api_recommendation_getMdRecommendation__WEBPACK_IMPORTED_MODULE_15__/* .getMdRecommendation */ .q)({
            typeCode: params === "webtoon" ? 0 : 1
        });
    };
    const getPersonalRecommendationAPI = ({ lastContent , size  })=>{
        return (0,_api_recommendation_getPersonalRecommendation__WEBPACK_IMPORTED_MODULE_16__/* .getPersonalRecommendation */ .k)({
            typeCode: params === "webtoon" ? 0 : 1
        });
    };
    const getRelativeAPI = ({ lastContent , size  })=>{
        return (0,_api_recommendation_getRelative__WEBPACK_IMPORTED_MODULE_17__/* .getRelative */ .X)({
            bookId: 0
        });
    };
    const getUserCharacteristicRecommendationAPI = ({ lastContent , size  })=>{
        return (0,_api_recommendation_getUserCharacteristicRecommendation__WEBPACK_IMPORTED_MODULE_21__/* .getUserCharacteristicRecommendation */ .e)({
            typeCode: params === "webtoon" ? 0 : 1
        });
    };
    const bookHomeFetchList = [
        {
            API: getHighPredictionAPI,
            identifier: `HighPrediction-${params}`,
            beforeLabel: `놀라지마세요, `,
            highlightedLabel: "완전 내 취향",
            afterLabel: " 작품을 보여줄게요",
            requireLogin: true
        },
        {
            API: getRelativeAPI,
            identifier: `Relative-${params}`,
            beforeLabel: "최근 읽은 작품과  ",
            highlightedLabel: "비슷한",
            afterLabel: " 작품을 보여줄게요",
            requireLogin: true
        },
        {
            API: getTop1GenreBooksAPI,
            identifier: `Top1GenreBooks-${params}`,
            // beforeLabel: `${myInfo.nickname}님이 `,
            highlightedLabel: "가장 선호하는 장르 ",
            afterLabel: "를 보여줄게요",
            requireLogin: true
        },
        {
            API: getTop2GenreBooksAPI,
            identifier: `Top2GenreBooks-${params}`,
            // beforeLabel: `${myInfo.nickname}님이  `,
            highlightedLabel: "두번째 선호하는 장르",
            afterLabel: "를 보여줄게요",
            requireLogin: true
        },
        {
            API: getPersonalRecommendationAPI,
            identifier: `PersonalRecommendation-${params}`,
            // beforeLabel: "나와 ",
            highlightedLabel: "비슷한 취향",
            afterLabel: "을 가진 사람이 읽은 작품을 보여줄게요",
            requireLogin: true
        },
        {
            API: getUserCharacteristicRecommendationAPI,
            identifier: `UserCharacteristicRecommendation-${params}`,
            highlightedLabel: `${myInfo.age}대 ${myInfo.gender === 0 ? "남성" : "여성"}`,
            afterLabel: "이 좋아하는 작품",
            requireLogin: true
        },
        {
            API: getReleasedAPI,
            identifier: `Released-${params}`,
            beforeLabel: "지난 1년간  ",
            highlightedLabel: "새로 나온",
            afterLabel: " 작품",
            requireLogin: false
        },
        {
            API: getTop30API,
            identifier: `Top30-${params}`,
            beforeLabel: "이모들이  ",
            highlightedLabel: "가장 많이 조회한",
            afterLabel: " 작품",
            requireLogin: false
        }
    ];
    const bookGenreFetchList = [
        {
            API: getBooksByDayAPI,
            identifier: `getBooksByGenre-${params}-${selectedGenre}`,
            beforeLabel: "장르 추천 ",
            highlightedLabel: "EMOSAAC!",
            requireLogin: false
        }
    ];
    // useEffect(() => {
    //   getTop3GenreBooks({
    //     order: 1,
    //     typeCode: (params === 'webtoon' ? 0 : 1),
    //     prevId: 0,
    //     prevScore: 10,
    //     size: 10,
    //   }).then((res) => console.log('top3', res))
    //   .catch((err) => console.log(err))
    // }, [])
    // const RowtitleBeforeLabe = `${myInfo.nickname}님께 `;
    const highlightedCarouselRender = /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: whiteSpace1CSS
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: innerLayoutWrapperCSS({
                    isDeskTop,
                    isTablet,
                    isMobile
                }),
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_RowTitle_RowTitle__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                    beforeLabel: "당신께 ",
                    highlightedLabel: "강력 추천하는",
                    afterLabel: " 작품이에요",
                    noLine: true,
                    marginBottom: "35px"
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: highlightedCarouselWrapper,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_HighlightedCarousel_HighlightedCarousel__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    bookData: highlightedBookData,
                    windowWrapperRef: indexWrapperRef,
                    identifier: params
                }, params)
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: whiteSpace2CSS
            })
        ]
    });
    // const bookHomeFetchList = [
    //   {
    //     API: getBooksByGenreAPI,
    //     identifier: 'test1',
    //     beforeLabel: '너만의',
    //     highlightedLabel: 'EMOSAAC!',
    //   }
    // ]
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: indexWrapperRef,
        css: indexWrapperCSS({
            isScrolling
        }),
        children: [
            myInfo !== false && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_scan_FloatingButton_FloatingButton__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                isDarkMode: isDarkMode
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: bannerWrapperCSS,
                ref: parentRef,
                children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_UI_SwipeableCarousel_SwipeableGallery__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    parentRef: parentRef,
                    content: postData
                })
            }),
            /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_MenuTab_GenreList__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                genres: genres,
                selected: selectedGenre,
                selectHandler: selectGenreHandler
            }),
            selectedGenre === -1 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_MenuTab_DayList__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                selected: selectedDay,
                selectHandler: selectDayHandler
            }),
            selectedGenre === -2 && highlightedCarouselRender,
            selectedGenre === -2 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_SortByRows__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                fetchList: bookHomeFetchList,
                myInfo: myInfo
            }),
            selectedGenre === -1 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_SortByDay__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                params: params,
                selectedDay: selectedDay
            }),
            selectedGenre >= 0 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_SortByRows__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                fetchList: bookGenreFetchList,
                myInfo: myInfo
            }),
            selectedGenre >= 0 && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_bookTab_SortByGenre__WEBPACK_IMPORTED_MODULE_23__/* ["default"] */ .Z, {
                selectedGenre: selectedGenre,
                params: params
            })
        ]
    });
}
// export const getServerSideProps = async (context: any) => {
//   // const params = await context.params;
//   // 임시 API
//   const data = await getBooksByGenre({genreCode: 10, typeCode: 0, prevId: 0, prevScore: 10, size: 20 })
//     .then((res) => {
//       if (res !== null) {
//         return res.content;
//       }
//     })
//     .catch((err) => {
//       console.log("pages/books/index.tsx => getBooksByGenre", err);
//     });
//   return await {
//     props: {
//       highlightedBookData: data,
//       // params: params.books,
//     },
//   };
// };
async function getStaticPaths(context) {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: "blocking"
        };
    }
    const paths = [
        {
            params: {
                books: "webtoon"
            }
        },
        {
            params: {
                books: "novel"
            }
        }
    ];
    // { fallback: false } means other routes should 404
    return {
        paths,
        fallback: false
    };
// const params = context.params;
// console.log(params);
// return {
//   // 아래의 코드는 동적 라우팅 주소를 하드코딩 한 것입니다.
//   // paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//   // 아래의 코드는 동적 라우팅 주소 배열을 받아오는 함수를 이용하여 paths에 유효한 주소값을 모두 받아옵니다.
//   // 자세한 코드는 getAllPostIds.tsx 파일을 참조하도록 합니다.
//   paths: [{ params: { books: 'webtoon' } }, { params: { books: 'novel' } }],
//   fallback: false, // true, false 외에도 'blocking'으로 설정할 수 있습니다.
// };
}
// getStaticPaths는 getStaticProps와 함께 사용하여야 합니다.
const getStaticProps = async (context)=>{
    const params = context.params.books;
    const genreTypeCode = {
        webtoon: 0,
        novel: 1
    };
    let genres = null;
    if (params === "webtoon" || params === "novel") {
        genres = await (0,_api_book_getGenres__WEBPACK_IMPORTED_MODULE_8__/* .getGenres */ .J)({
            typeCode: genreTypeCode[params]
        }).then((res)=>{
            if (res !== null) {
                return res;
            }
        });
    }
    // const highlightedBookData = await getBooksByGenre({
    //   genreCode: 10,
    //   typeCode: 0,
    //   prevId: 0,
    //   prevScore: 10,
    //   size: 30,
    // })
    //   .then((res) => {
    //     if (res !== null) {
    //       return res.content;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("pages/books/index.tsx => getBooksByGenre", err);
    //   });
    const highlightedBookData = await (0,_api_recommendation_getMdRecommendation__WEBPACK_IMPORTED_MODULE_15__/* .getMdRecommendation */ .q)({
        typeCode: params === "webtoon" ? 0 : 1
    }).then((res)=>{
        if (res !== null) {
            return res.content;
        }
    }).catch((err)=>{
        console.log("pages/books/index.tsx => getBooksByGenre", err);
    });
    return {
        props: {
            highlightedBookData: highlightedBookData,
            genres: genres,
            params: params
        },
        revalidate: 86400
    };
};
const indexWrapperCSS = ({ isScrolling  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 64px;
  `;
};
const bannerImage = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: auto;
`;
const whiteSpace1CSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 5vw;
  min-height: 48px;
`;
const whiteSpace2CSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;
const bannerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  overflow: hidden;
`;
const highlightedCarouselWrapper = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: center;
`;
const bookCarouselWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;
const innerLayoutWrapperCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    const whiteSpace = isDeskTop && 210 || isTablet && 100 || isMobile && 0;
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `;
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2805:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react");

/***/ }),

/***/ 5193:
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react/jsx-runtime");

/***/ }),

/***/ 4802:
/***/ ((module) => {

"use strict";
module.exports = require("cookie");

/***/ }),

/***/ 6517:
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 8252:
/***/ ((module) => {

"use strict";
module.exports = require("react-easy-swipe");

/***/ }),

/***/ 567:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/bs");

/***/ }),

/***/ 4041:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/md");

/***/ }),

/***/ 8098:
/***/ ((module) => {

"use strict";
module.exports = require("react-icons/ri");

/***/ }),

/***/ 6666:
/***/ ((module) => {

"use strict";
module.exports = require("react-responsive");

/***/ }),

/***/ 7386:
/***/ ((module) => {

"use strict";
module.exports = require("react-simple-star-rating");

/***/ }),

/***/ 4018:
/***/ ((module) => {

"use strict";
module.exports = require("react-useanimations");

/***/ }),

/***/ 3160:
/***/ ((module) => {

"use strict";
module.exports = require("react-useanimations/lib/activity");

/***/ }),

/***/ 2265:
/***/ ((module) => {

"use strict";
module.exports = require("react-useanimations/lib/archive");

/***/ }),

/***/ 8715:
/***/ ((module) => {

"use strict";
module.exports = require("react-useanimations/lib/loading2");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [394,932,878,132,997], () => (__webpack_exec__(7512)));
module.exports = __webpack_exports__;

})();