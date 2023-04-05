"use strict";
exports.id = 132;
exports.ids = [132];
exports.modules = {

/***/ 8932:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4932);
/** @jsxImportSource @emotion/react */ 


const RowTitle = ({ beforeLabel , highlightedLabel , afterLabel , noLine , marginBottom  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,_Responsive_useIsResponsive__WEBPACK_IMPORTED_MODULE_2__/* .useIsResponsive */ .j)();
    return /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        css: rowTitleWrapperCSS({
            marginBottom
        }),
        children: [
            noLine !== true && /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                css: lineCSS
            }),
            /*#__PURE__*/ (0,_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                css: labelWrapperCSS,
                children: [
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        css: normalLabelCSS({
                            isMobile
                        }),
                        children: beforeLabel
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        css: highlightedLabelCSS({
                            isMobile
                        }),
                        children: highlightedLabel
                    }),
                    /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        css: normalLabelCSS({
                            isMobile
                        }),
                        children: afterLabel
                    })
                ]
            })
        ]
    });
};
const rowTitleWrapperCSS = ({ marginBottom  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    width: 100%;
    height: 36px;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: ${marginBottom !== undefined ? marginBottom : `24px`};
  `;
};
const lineCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  width: 100%;
  height: 1px;
  background-color: var(--border-color-2);
`;
const labelWrapperCSS = _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
  position: absolute;
  background-color: var(--back-color);
  padding: 12px;
  /* left: 1%; */
`;
const normalLabelCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    font-size: ${isMobile ? "16px" : "28px"};
    color: var(--text-color);
  `;
};
const highlightedLabelCSS = ({ isMobile  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    font-size: ${isMobile ? "24px" : "36px"};
    color: #ff6565;
  `;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RowTitle);


/***/ }),

/***/ 2132:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ bookTab_SortByRows)
});

// EXTERNAL MODULE: external "@emotion/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5193);
// EXTERNAL MODULE: external "@emotion/react"
var react_ = __webpack_require__(2805);
// EXTERNAL MODULE: ./src/components/Responsive/useIsResponsive.ts
var useIsResponsive = __webpack_require__(4932);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./src/components/bookTab/RowTitle/RowTitle.tsx
var RowTitle = __webpack_require__(8932);
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__(6517);
// EXTERNAL MODULE: ./src/components/UI/BookCard/BookCard.tsx + 1 modules
var BookCard = __webpack_require__(6878);
;// CONCATENATED MODULE: ./src/components/UI/HorizontalScroll/HorizontalScroll.tsx
/** @jsxImportSource @emotion/react */ 




// import Test from "./Test";

const HorizontalScroll = ({ API , identifier , setNoData  })=>{
    const wrapperRef = (0,external_react_.useRef)(null);
    const cardsRef = (0,external_react_.useRef)([]);
    const [bookListData, setBookListData] = (0,external_react_.useState)([]);
    const [bookListResult, setBookListResult] = (0,external_react_.useState)([]);
    const [page, setPage] = (0,external_react_.useState)(0);
    const [wrapperWidth, setWrapperWidth] = (0,external_react_.useState)(0);
    const [standard, setStandard] = (0,external_react_.useState)(0);
    const [quantityPerPage, setQuantityPerPage] = (0,external_react_.useState)(10);
    const [loadingTag, setLoadingTag] = (0,external_react_.useState)(Array(9).fill("LOADING"));
    const [isDeskTop, isTablet, isMobile] = (0,useIsResponsive/* useIsResponsive */.j)();
    const [hasNext, setHasNext] = (0,external_react_.useState)(window.sessionStorage.getItem(`${identifier}-horizontal-inf_has_next`) ? JSON.parse(String(window.sessionStorage.getItem(`${identifier}-horizontal-inf_has_next`))) : true);
    const cardLayout = {
        width: "10vw",
        height: "15vw",
        minWidth: "150px",
        minHeight: "225px",
        padding: "0.5vw"
    };
    const generatePage = (value)=>{
        if (wrapperRef.current !== null && wrapperRef.current.clientWidth !== wrapperWidth) {
            const width = wrapperRef.current.clientWidth;
            const quantity = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth);
            const newPage = Math.ceil(standard / quantity);
            setPage(()=>newPage);
            setWrapperWidth(()=>width);
            setQuantityPerPage(()=>quantity);
            return newPage + value;
        } else {
            return page + value;
        }
    };
    const nextBtnClickHandler = ()=>{
        if (wrapperRef.current !== null) {
            const quantity = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth);
            const nextStandard = generatePage(1) * quantity;
            const idx = nextStandard < cardsRef.current.length ? nextStandard : cardsRef.current.length - 1;
            if (nextStandard < cardsRef.current.length) {
                setPage((prev)=>prev + 1);
            }
            if (cardsRef.current[idx]) {
                setStandard(()=>idx);
                wrapperRef.current.scrollTo({
                    left: cardsRef.current[idx].offsetLeft,
                    top: 0,
                    behavior: "smooth"
                });
            }
            fetchMoreData();
        }
    };
    const prevBtnClickHandler = ()=>{
        if (wrapperRef.current !== null) {
            const quantity = Math.floor(wrapperRef.current.clientWidth / cardsRef.current[0].clientWidth);
            const prevStandard = generatePage(-1) * quantity;
            const idx = prevStandard >= 0 ? prevStandard : 0;
            if (prevStandard >= 0) {
                setPage((prev)=>prev - 1);
            }
            setStandard(()=>idx);
            wrapperRef.current.scrollTo({
                left: cardsRef.current[idx].offsetLeft,
                top: 0,
                behavior: "smooth"
            });
        }
    };
    const fetchMoreData = ()=>{
        let standard = 0;
        if (wrapperRef.current !== null && cardsRef.current[0] !== null) {
            standard = Math.ceil(wrapperRef.current.scrollLeft / cardsRef.current[0]?.clientWidth);
        }
        if (wrapperRef.current !== null && wrapperRef.current.scrollWidth - wrapperRef.current.scrollLeft - 200 < wrapperRef.current.clientWidth || bookListData.length - loadingTag.length - standard <= loadingTag.length) {
            if (hasNext === true) {
                const lastContent = bookListData[bookListData.length - 1];
                API({
                    lastContent: lastContent,
                    size: quantityPerPage
                }).then((res)=>{
                    if (res.content.length === 0 && bookListData.length === 0) {
                        setNoData(()=>true);
                    }
                    console.log(res);
                    const temp = [
                        ...bookListData,
                        ...res.content
                    ];
                    setBookListData((prev)=>temp);
                    window.sessionStorage.setItem(`${identifier}-horizontal-inf_fetched_data`, JSON.stringify(temp));
                    window.sessionStorage.setItem(`${identifier}-horizontal-inf_has_next`, JSON.stringify(res.hasNext));
                    setHasNext(()=>res.hasNext);
                // alert('fwe')
                });
            }
        }
    };
    const onScrollHandler = (0,external_react_.useMemo)(()=>(0,external_lodash_.throttle)(()=>{
            if (wrapperRef.current !== null) {
                fetchMoreData();
                const standard = Math.ceil(wrapperRef.current.scrollLeft / cardsRef.current[0].clientWidth);
                setStandard(()=>standard);
                if (wrapperRef.current.scrollLeft !== 0) {
                    window.sessionStorage.setItem(`${identifier}-horizontal-recent_scroll`, String(wrapperRef.current.scrollLeft));
                }
            }
        }, 300), [
        bookListData,
        setBookListData
    ]);
    (0,external_react_.useEffect)(()=>{
        const loadData = window.sessionStorage.getItem(`${identifier}-horizontal-inf_fetched_data`);
        const hasNext = window.sessionStorage.getItem(`${identifier}-horizontal-inf_has_next`);
        if (loadData) {
            setBookListData(()=>JSON.parse(loadData));
            setHasNext(()=>JSON.parse(String(hasNext)));
        } else {
            fetchMoreData();
        }
    }, []);
    (0,external_react_.useEffect)(()=>{
        const loadScroll = window.sessionStorage.getItem(`${identifier}-horizontal-recent_scroll`);
        if (loadScroll && wrapperRef.current) {
            wrapperRef.current.scrollTo(Number(JSON.parse(loadScroll)), 0);
        }
    }, [
        cardsRef.current.length
    ]);
    const generateLoadingData = ()=>{
        // setBookListResult(() => [...bookListData, ...loadingTag]);
        if (hasNext === true) {
            setBookListResult(()=>[
                    ...bookListData,
                    ...loadingTag
                ]);
        } else {
            setBookListResult(()=>[
                    ...bookListData
                ]);
        }
    };
    (0,external_react_.useEffect)(()=>{
        generateLoadingData();
    }, [
        bookListData
    ]);
    const renderCards = (0,external_react_.useMemo)(()=>bookListResult.map((el, idx)=>{
            return /*#__PURE__*/ jsx_runtime_.jsx("div", {
                ref: (el)=>cardsRef.current[idx] = el,
                css: cardWrapperCSS({
                    padding: cardLayout.padding
                }),
                children: /*#__PURE__*/ jsx_runtime_.jsx(BookCard/* default */.Z, {
                    bookData: el,
                    showPlatform: true,
                    width: cardLayout.width,
                    height: cardLayout.height,
                    minWidth: cardLayout.minWidth,
                    minHeight: cardLayout.minHeight
                })
            }, `${identifier}-${idx}`);
        }), [
        bookListResult
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        css: carouselWrapper,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                css: [
                    indicatorBtn,
                    prevBtn({
                        isDeskTop,
                        isTablet,
                        isMobile
                    })
                ],
                onClick: prevBtnClickHandler,
                onMouseEnter: (event)=>{
                    event.stopPropagation();
                },
                children: "〈"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                css: [
                    indicatorBtn,
                    nextBtn({
                        isDeskTop,
                        isTablet,
                        isMobile
                    })
                ],
                onClick: nextBtnClickHandler,
                onMouseEnter: (event)=>{
                    event.stopPropagation();
                },
                children: "〉"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                ref: wrapperRef,
                css: carousel,
                onWheel: onScrollHandler,
                onTouchMove: onScrollHandler,
                children: renderCards
            })
        ]
    });
};
/* harmony default export */ const HorizontalScroll_HorizontalScroll = (HorizontalScroll);
const cardWrapperCSS = ({ padding  })=>{
    return react_.css`
    padding-left: ${padding};
    padding-right: ${padding};
  `;
};
const carouselWrapper = react_.css`
  width: 100%;
  position: relative;
`;
const carousel = react_.css`
  display: flex;
  width: 100%;
  /* padding-left: 48px; */
  box-sizing: border-box;
  overflow-x: scroll;
  border-radius: 10px;
  content-visibility: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const indicatorBtn = react_.css`
  z-index: 9;
  position: absolute;

  height: 100%;
  display: flex;
  align-items: center;
  font-size: 48px;
  font-weight: 700;
  color: var(--text-color);
  padding-left: 8px;
  padding-right: 8px;

  transition-property: background font-size;
  transition-duration: 0.2s;
  cursor: pointer;
  user-select: none;

  @media (max-width: 480px) {
    display: none;
  }
`;
const prevBtn = ({ isDeskTop , isTablet , isMobile  })=>{
    return react_.css`
    left: 0;
    /* background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    transform: ${isDeskTop === true && `translate(-105px, 0px)` || isTablet === true && `translate(-50px, 0px)`};
    &:hover {
      /* background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};
const nextBtn = ({ isDeskTop , isTablet , isMobile  })=>{
    return react_.css`
    right: 0;
    /* background: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)); */
    transform: ${isDeskTop === true && `translate(105px, 0px)` || isTablet === true && `translate(50px, 0px)`};
    &:hover {
      /* background: linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); */
      font-size: 54px;
    }
  `;
};

;// CONCATENATED MODULE: ./src/components/bookTab/HorizontalCarouselWrapper.tsx
/** @jsxImportSource @emotion/react */ 




const HorizontalCarouselWrapper = ({ el  })=>{
    const [noData, setNoData] = (0,external_react_.useState)(false);
    if (noData === false) {
        return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: whiteSpace1CSS
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(RowTitle/* default */.Z, {
                    beforeLabel: el.beforeLabel,
                    highlightedLabel: el.highlightedLabel,
                    afterLabel: el?.afterLabel
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: bookCarouselWrapperCSS,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(HorizontalScroll_HorizontalScroll, {
                        API: el.API,
                        identifier: el.identifier,
                        setNoData: setNoData
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    css: whiteSpace1CSS
                })
            ]
        });
    } else {
        return /*#__PURE__*/ jsx_runtime_.jsx("div", {});
    }
};
const indexWrapperCSS = react_.css`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const bannerImage = react_.css`
  width: 100%;
  height: auto;
`;
const whiteSpace1CSS = react_.css`
  width: 100%;
  height: 3vw;
  min-height: 24px;
`;
const whiteSpace2CSS = react_.css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;
const bannerWrapperCSS = react_.css`
  width: 100%;
  overflow: hidden;
`;
const highlightedCarouselWrapper = react_.css`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const bookCarouselWrapperCSS = react_.css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;
const innerLayoutWrapperCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    const whiteSpace = isDeskTop && 210 || isTablet && 100 || isMobile && 0;
    return css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `;
};
/* harmony default export */ const bookTab_HorizontalCarouselWrapper = (HorizontalCarouselWrapper);

;// CONCATENATED MODULE: ./src/components/bookTab/SortByRows.tsx
/** @jsxImportSource @emotion/react */ 





const SortByRows = ({ fetchList , myInfo  })=>{
    const [isDeskTop, isTablet, isMobile] = (0,useIsResponsive/* useIsResponsive */.j)();
    const indexWrapperRef = (0,external_react_.useRef)(null);
    const rowsRender = fetchList.map((el, idx)=>{
        if (el.requireLogin === true && myInfo !== false || el.requireLogin === false) {
            return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((external_react_default()).Fragment, {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(bookTab_HorizontalCarouselWrapper, {
                        el: el
                    }),
                    Math.ceil(fetchList.length / 2) === idx && /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: isMobile === true ? "/assets/content_banner_mobile.png" : "/assets/content_banner_desktop_tablet.png",
                        alt: "",
                        css: SortByRows_bannerImage
                    })
                ]
            }, `sortByRows-${el.identifier}`);
        }
    });
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        css: SortByRows_indexWrapperCSS,
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            css: SortByRows_innerLayoutWrapperCSS({
                isDeskTop,
                isTablet,
                isMobile
            }),
            children: rowsRender
        })
    });
};
const SortByRows_indexWrapperCSS = react_.css`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SortByRows_bannerImage = react_.css`
  width: 100%;
  height: auto;
`;
const SortByRows_whiteSpace1CSS = react_.css`
  width: 100%;
  height: 3vw;
  min-height: 24px;
`;
const SortByRows_whiteSpace2CSS = react_.css`
  width: 100%;
  height: 7vw;
  min-height: 72px;
`;
const SortByRows_bannerWrapperCSS = react_.css`
  width: 100%;
  overflow: hidden;
`;
const SortByRows_highlightedCarouselWrapper = react_.css`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const SortByRows_bookCarouselWrapperCSS = react_.css`
  width: 100%;
  /* overflow: hidden; */
  border-radius: 10px; ;
`;
const SortByRows_innerLayoutWrapperCSS = ({ isDeskTop , isTablet , isMobile  })=>{
    const whiteSpace = isDeskTop && 210 || isTablet && 100 || isMobile && 0;
    return react_.css`
    width: calc(100% - ${whiteSpace}px);
    /* margin: 0px 105px; */
  `;
};
/* harmony default export */ const bookTab_SortByRows = (SortByRows);


/***/ })

};
;