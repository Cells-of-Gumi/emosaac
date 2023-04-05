"use strict";
exports.id = 878;
exports.ids = [878];
exports.modules = {

/***/ 6878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ BookCard_BookCard)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "react-icons/bs"
var bs_ = __webpack_require__(567);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: ./src/components/bookDetail/StarRating.tsx
var StarRating = __webpack_require__(6441);
// EXTERNAL MODULE: ./src/components/bookDetail/TagList.tsx
var TagList = __webpack_require__(6167);
;// CONCATENATED MODULE: ./src/components/bookCardModal/BookCardModal.tsx
/** @jsxImportSource @emotion/react */ 






const BookCardModal = ({ modalToggler , isMouseOn , setModalToggler , bookData , parentRef , imgHeight , imgMinHeight  })=>{
    const wrapperRef = (0,external_react_.useRef)(null);
    const [contentToggler, setContentToggler] = (0,external_react_.useState)(false);
    const [isOpened, setisOpened] = (0,external_react_.useState)(false);
    const [isClosing, setIsClosing] = (0,external_react_.useState)(false);
    const router = (0,router_.useRouter)();
    const modalLayout = {
        widthValue: 380,
        heightValue: 520
    };
    (0,external_react_.useEffect)(()=>{
        if (isMouseOn === true && modalToggler === true) {
            setContentToggler(()=>true);
            setisOpened(()=>true);
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        window.addEventListener("wheel", onWheelHandler);
        return ()=>{
            window.removeEventListener("wheel", onWheelHandler);
        };
    }, []);
    const modalHandler = ()=>{
        if (isMouseOn === true && contentToggler === true) {
            setTimeout(function() {
                if (wrapperRef.current !== null) {
                    wrapperRef.current.style.opacity = "0";
                }
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
    const onWheelHandler = ()=>{
        if (wrapperRef.current !== null) {
            wrapperRef.current.style.width = parentRef.current.clientWidth + "px";
            wrapperRef.current.style.height = parentRef.current.clientHeight + "px";
            wrapperRef.current.style.left = parentRef.current.getBoundingClientRect().left + "px";
            setTimeout(function() {
                if (wrapperRef.current !== null) {
                    wrapperRef.current.style.top = parentRef.current.getBoundingClientRect().top + "px";
                    wrapperRef.current.style.opacity = "0";
                }
            }, 200);
        }
    };
    const onClickNavigateHandler = ()=>{
        router.push(`/books/${bookData.bookId}`);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        onMouseLeave: modalHandler,
        // onWheelCapture={onWheelHandler}
        onMouseMove: (e)=>{
            e.stopPropagation();
        },
        ref: wrapperRef,
        css: wrapperCSS({
            modalToggler: contentToggler,
            parentRef: parentRef,
            wrapperRef: wrapperRef,
            widthValue: modalLayout.widthValue,
            heightValue: modalLayout.heightValue
        }),
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            css: innerWrapperCSS({
                modalToggler: modalToggler,
                contentToggler: contentToggler,
                isOpened: isOpened
            }),
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: backgroundCSS({
                        imgUrl: bookData.thumbnail
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: imageWrapperCSS,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: bookData && bookData.thumbnail,
                        alt: bookData && bookData.title,
                        css: imageCSS({
                            modalToggler: contentToggler,
                            isClosing: isClosing,
                            imgHeight: imgHeight,
                            imgMinHeight: imgMinHeight
                        }),
                        onClick: onClickNavigateHandler
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: spaceDivCSS
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    css: contentDivCSS,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "book-info",
                            css: bookInfoWrapperCSS,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    css: titleCSS,
                                    children: bookData.title
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    css: additionalInfoWrapperCSS,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            css: starRatingWrapperCSS,
                                            children: bookData && /*#__PURE__*/ jsx_runtime_.jsx(StarRating/* default */.Z, {
                                                readonly: true,
                                                initialValue: bookData.avgScore
                                            })
                                        }),
                                        bookData && /*#__PURE__*/ jsx_runtime_.jsx(TagList/* default */.Z, {
                                            tag: bookData.tag,
                                            identifier: `${bookData.bookId}`
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            css: react_.css`
              display: flex;
              flex-direction: column;
              align-items: end;
              justify-content: space-between;
            `,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    css: dateCSS,
                                    children: bookData.regist
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(bs_.BsFillArrowUpCircleFill, {
                                    css: icons,
                                    onClick: onClickNavigateHandler
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
const wrapperCSS = ({ modalToggler , parentRef , wrapperRef , widthValue , heightValue  })=>{
    const isLeftEdge = (widthValue - parentRef?.current?.clientWidth) / 2 >= parentRef?.current?.getBoundingClientRect().left;
    const isRightEdge = parentRef?.current?.getBoundingClientRect().left + (widthValue - (widthValue - parentRef?.current?.clientWidth) / 2) >= document.body.offsetWidth;
    const leftStandard = `left: ${modalToggler && isLeftEdge === true ? "42" : parentRef?.current?.getBoundingClientRect().left - (widthValue - parentRef?.current?.clientWidth) / 2}px;`; // parentRef?.current?.getBoundingClientRect().left
    const rightStandard = `left: ${modalToggler && isRightEdge === true ? document.body.offsetWidth - widthValue - 42 : parentRef?.current?.getBoundingClientRect().left}px`;
    const activated = isRightEdge === true ? rightStandard : leftStandard;
    return react_.css`
    position: absolute;
    z-index: 999999;
    transition-property: width height;
    will-change: width height left top opacity transform;
    transition-duration: 0.3s;
    /* transition-timing-function: ease-in; */
    overflow: hidden;

    top: ${modalToggler ? parentRef?.current?.getBoundingClientRect().top - (heightValue - parentRef?.current?.clientHeight) / 2 : parentRef?.current?.getBoundingClientRect().top}px;
    width: ${modalToggler ? `${widthValue}px` : `${parentRef?.current?.clientWidth}px`};
    height: ${modalToggler ? `${heightValue}px` : `${parentRef?.current?.clientHeight}px`};
    ${modalToggler ? activated : `left: ${parentRef?.current?.getBoundingClientRect().left}px`};
    ${modalToggler ? `pointer-events: auto` : `pointer-events: none`};
    /* background-color: white; */
    background-color: ${modalToggler ? react_.css`var(--back-color-2)` : `rgba(0,0,0,0)`};
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  `;
};
const innerWrapperCSS = ({ modalToggler , contentToggler , isOpened  })=>{
    return react_.css`
    opacity: ${contentToggler ? "255" : isOpened ? "255" : "0"};
    height: 100%;
    display: flex;
    flex-direction: column;
  `;
};
const backgroundCSS = ({ imgUrl  })=>{
    return react_.css`
    width: 110%;
    position: absolute;
    left: -5%;
    top: -5%;
    height: 370px;
    background: no-repeat url("${imgUrl}") 0 / cover;
    filter: blur(10px);
    -webkit-filter: blur(10px);
    pointer-events: none;
    display: flex;
    justify-content: center;
  `;
};
const imageWrapperCSS = react_.css`
  width: 100%;
  height: 370px;
  position: absolute;
  display: flex;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0), var(--back-color-2));
  /* pointer-events: none; */
`;
const imageCSS = ({ modalToggler , isClosing , imgHeight , imgMinHeight  })=>{
    return react_.css`
    cursor: pointer;
    will-change: width height transform;
    transition-property: width height opacity transform;
    transition-duration: 0.3s;
    ${modalToggler ? `transform: scale(1.0)` : isClosing ? `transform: scale(1.0)` : `transform: scale(1.1)`};
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
    width: auto;
    height: ${modalToggler ? "370px" : imgHeight};
    min-height: ${imgMinHeight};
  `;
};
const spaceDivCSS = react_.css`
  width: 100%;
  height: 370px;
`;
const contentDivCSS = react_.css`
  flex: 1 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
`;
const titleCSS = react_.css`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const dateCSS = react_.css`
  font-size: 13px;
  /* margin-top: 8px; */
  color: var(--text-color-4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const icons = react_.css`
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
const starRatingWrapperCSS = react_.css`
  margin-top: 6px;
  margin-bottom: 6px;
`;
const bookInfoWrapperCSS = react_.css`
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
`;
const additionalInfoWrapperCSS = react_.css``;
/* harmony default export */ const bookCardModal_BookCardModal = (BookCardModal);

// EXTERNAL MODULE: ./src/components/function/Portal.tsx
var Portal = __webpack_require__(363);
// EXTERNAL MODULE: ./src/components/Responsive/useIsResponsive.ts
var useIsResponsive = __webpack_require__(4932);
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(6517);
;// CONCATENATED MODULE: ./src/components/UI/BookCard/BookCard.tsx
/** @jsxImportSource @emotion/react */ 







const BookCard = ({ bookData , showPlatform , width , height , minWidth , minHeight , margin  })=>{
    const [user, setUser] = (0,external_react_.useState)(null);
    (0,external_react_.useEffect)(()=>{
        setUser(()=>navigator.userAgent);
    }, []);
    const [isD, isT, isM] = (0,useIsResponsive/* useIsResponsive */.j)();
    const isMobile = ()=>{
        let is_mobile = false;
        if (user !== undefined && user.length > 0 && user.indexOf("iPhone") > -1 || user.indexOf("Android") > -1 || user.indexOf("iPad") > -1 || user.indexOf("iPod") > -1) {
            is_mobile = true;
        }
        return is_mobile;
    };
    const router = (0,router_.useRouter)();
    const wrapperRef = (0,external_react_.useRef)(null);
    const [modalToggler, setModalToggler] = (0,external_react_.useState)(false);
    const [isMouseOn, setIsMouseOn] = (0,external_react_.useState)(false);
    const platformBase = [
        "https://comic.naver.com/",
        "https://series.naver.com/",
        "https://page.kakao.com/",
        "https://ridibooks.com/"
    ];
    const showModal = ()=>{
        // setTimeout(function () {
        // }, 10);
        setModalToggler(()=>true);
        setIsMouseOn(()=>true);
    };
    const hideModal = ()=>{
        setIsMouseOn(()=>false);
        setTimeout(function() {
            setModalToggler(()=>false);
        }, 500);
    };
    const instantlyRedirect = ()=>{
        if (isMobile() === true) {
            // 모바일에서 Detail 페이지로 바로 이동
            router.push(`/books/${bookData.bookId}`);
        }
    };
    const platformRender = bookData?.href?.split(" ").map((el, idx)=>{
        const findPlatform = (element)=>{
            if (el.includes(element)) {
                return true;
            }
        };
        const result = platformBase.findIndex(findPlatform);
        return /*#__PURE__*/ jsx_runtime_.jsx("img", {
            src: result === 0 && "/assets/platform_naver_webtoon.webp" || result === 1 && "/assets/platform_naver_series.webp" || result === 2 && "/assets/platform_kakao_page.png" || result === 3 && "/assets/platform_ridi.webp" || "",
            css: platformIconCSS
        }, `BookCard-${bookData.bookId}-platform-${result}`);
    });
    const modal = /*#__PURE__*/ jsx_runtime_.jsx(Portal/* default */.Z, {
        selector: ".overlay-root",
        children: /*#__PURE__*/ jsx_runtime_.jsx(bookCardModal_BookCardModal, {
            modalToggler: modalToggler,
            isMouseOn: isMouseOn,
            setModalToggler: setModalToggler,
            bookData: bookData,
            parentRef: wrapperRef,
            imgHeight: height,
            imgMinHeight: minHeight
        })
    });
    const platformBar = /*#__PURE__*/ jsx_runtime_.jsx("div", {
        css: platformBarCSS,
        children: bookData.href && platformRender
    });
    const [isMouseOnStart, setIsMouseOnStart] = (0,external_react_.useState)(false);
    const call = (0,external_react_.useMemo)(()=>(0,external_lodash_.debounce)((toggle)=>{
            if (toggle === true) {
                showModal();
            } else {
                hideModal();
            }
        }, 250), []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "bookcard-outer-wrapper",
        css: cardOuterWrapper({
            width,
            height,
            minWidth,
            minHeight,
            margin
        }),
        ref: wrapperRef,
        onClick: instantlyRedirect,
        onMouseMove: ()=>{
            call(true);
        },
        onMouseEnter: ()=>{
            call(true);
        },
        onWheel: ()=>{
            call(false);
        },
        onMouseLeave: ()=>{
            call(false);
            hideModal();
            setIsMouseOnStart(()=>false);
        },
        children: [
            user !== null && isMobile() === false && modalToggler && modal,
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                css: typeCdWrapCSS(bookData.typeCd === 0, isD),
                children: bookData && bookData.typeCd === 0 ? "웹툰" : "웹소설"
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "bookcard-inner-wrapper",
                css: cardInnerWrapperCSS({
                    width,
                    height,
                    minWidth,
                    minHeight
                }),
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        css: skeletonLoadingTagCSS({
                            state: bookData !== "LOADING" ? true : false
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        className: "img",
                        src: bookData && bookData.thumbnail,
                        alt: bookData && bookData.title,
                        css: BookCard_imageCSS
                    }),
                    showPlatform && bookData !== "LOADING" && platformBar
                ]
            })
        ]
    });
};
const cardOuterWrapper = ({ width , height , minWidth , minHeight , margin  })=>{
    return react_.css`
    ${margin && `margin: ${margin}`};
    position: relative;
    width: ${width !== undefined ? width : "auto"};
    height: ${height !== undefined ? height : "100%"};
    ${minWidth && `min-width: ${minWidth}`};
    ${minHeight && `min-height: ${minHeight}`};
    content-visibility: auto;
  `;
};
const typeCdWrapCSS = (isWebtoon, isD)=>react_.css`
  position: absolute;
  z-index: 10;
  top: 0;
  display: block;
  margin-right: 6px;
  text-align: center;
  font-weight: bold;
  padding: ${isD ? "0 10px" : "0 6px"};
  height: ${isD ? "32px" : "25px"};
  line-height: ${isD ? "32px" : "25px"};
  font-size: ${isD ? "14px" : "12px"};
  border-radius: 9px 0px 9px 0px;
  background-color: ${!isWebtoon ? "#fff" : "var(--main-color)"};
  color: ${isWebtoon ? "#fff" : "var(--main-color)"};
`;
const cardInnerWrapperCSS = ({ width , height , minWidth , minHeight  })=>{
    return react_.css`
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
const platformBarCSS = react_.css`
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
const BookCard_imageCSS = react_.css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;
const skeletonLoadingTagCSS = ({ state  })=>{
    return react_.css`
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
const platformIconCSS = react_.css`
  width: 1.3vw;
  min-width: 20px;
  height: auto;
  margin: 10px;
`;
/* harmony default export */ const BookCard_BookCard = (BookCard);


/***/ }),

/***/ 6441:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_simple_star_rating__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7386);
/* harmony import */ var react_simple_star_rating__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_simple_star_rating__WEBPACK_IMPORTED_MODULE_2__);



const StarRating = ({ onClick , readonly , size , initialValue =0  })=>{
    const [rating, setRating] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialValue);
    // Catch Rating value
    const handleRating = (rate)=>{
        setRating(rate * 2);
        onClick(rate * 2);
    // other logic
    };
    // Optinal callback functions
    // const onPointerEnter = () => console.log('Enter')
    // const onPointerLeave = () => console.log('Leave')
    // const onPointerMove = (value: number, index: number) => console.log(value, index)
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "App",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_simple_star_rating__WEBPACK_IMPORTED_MODULE_2__.Rating, {
            onClick: handleRating,
            // onPointerEnter={onPointerEnter}
            // onPointerLeave={onPointerLeave}
            // onPointerMove={onPointerMove}
            /* Available Props */ transition: true,
            allowFraction: true,
            initialValue: rating / 2,
            allowHover: true,
            readonly: readonly,
            size: size
        }, rating)
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StarRating);


/***/ }),

/***/ 6167:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/** @jsxImportSource @emotion/react */ 

const TagList = ({ identifier , tag  })=>{
    const renderTags = tag?.split(" ").map((el, idx)=>{
        if (el.trim() !== "") {
            return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: tagWrapperCSS,
                children: [
                    "#",
                    el,
                    ","
                ]
            }, `${identifier}-${el}`);
        }
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: outerWrapperCSS,
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: tagListWrapperCSS,
            children: renderTags
        })
    });
};
const outerWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: relative;
  height: 16px;
`;
const tagListWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  display: flex;
  position: absolute;
  /* margin-top: 12px; */
  width: 110%;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-left: 50px;
  /* padding-right: -20px; */
  margin-left: -50px;
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

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const tagWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  /* border-radius: 20px; */
  /* background-color: var(--main-color); */
  /* padding: 14px; */
  margin-right: 14px;
  /* margin-bottom: 14px; */
  color: black;
  white-space: pre;
  color: var(--text-color-4);
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TagList);


/***/ }),

/***/ 363:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_0__);

const Portal = ({ children , selector  })=>{
    const element =  false && 0;
    return element && children ? /*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_0___default().createPortal(children, element) : null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Portal);


/***/ })

};
;