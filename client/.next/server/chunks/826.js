"use strict";
exports.id = 826;
exports.ids = [826];
exports.modules = {

/***/ 6826:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5193);
/* harmony import */ var _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2805);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_emotion_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6405);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/** @jsxImportSource @emotion/react */ 




// 모달창 자체
const ModalOverlay = (props)=>{
    const [showModal, setShowModal] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    // useEffect(() => {
    //   window.history.pushState(null, document.title, window.location.href);
    //   const preventBack = async () => {
    //     await modalHandler();
    //     await window.history.pushState(
    //       null,
    //       document.title,
    //       window.location.href
    //     );
    //   };
    //   window.addEventListener("popstate", preventBack);
    //   return () => {
    //     window.removeEventListener("popstate", preventBack);
    //   };
    // }, [window.history]);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        router.beforePopState(({ url , as , options  })=>{
            if (as !== router.asPath && props.forced !== true) {
                window.history.pushState("", "");
                router.push(router.asPath);
                modalHandler();
                return false;
            }
            if (props.forced === true) {
                setShowModal(()=>false);
                setTimeout(()=>{
                    props.stateHandler(()=>false);
                }, 300);
            }
            return true;
        });
        return ()=>{
            router.beforePopState(()=>true);
        };
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setShowModal(()=>true);
        document.body.style.overflowY = "hidden";
        return ()=>{
            document.body.style.overflowY = "auto";
        };
    }, []);
    const modalHandler = ()=>{
        if (props.forced !== true) {
            setShowModal(()=>false);
            setTimeout(()=>{
                props.stateHandler(()=>false);
            }, 300);
        }
    };
    const content = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_2___default().cloneElement(props.content, {
        ...props,
        modalHandler: modalHandler
    });
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        css: backdrop({
            showModal: showModal,
            blur: props.blur
        }),
        onClick: modalHandler,
        children: /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            css: modalCSS({
                width: props.width,
                height: props.height,
                overflow: props.overflow,
                showModal: showModal
            }),
            onClick: (event)=>{
                event.stopPropagation();
            },
            children: content
        })
    });
};
const FixedModal = (props)=>{
    const [modal, setModal] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        setModal(()=>/*#__PURE__*/ react_dom__WEBPACK_IMPORTED_MODULE_3___default().createPortal(/*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ModalOverlay, {
                ...props
            }), document.getElementById("overlay-root")));
    }, []);
    return /*#__PURE__*/ _emotion_react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), {
        children: props.modalState && modal
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FixedModal);
const backdrop = ({ showModal , blur  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${showModal ? 255 : 0};
    transition-property: opacity;
    transition-duration: 0.3s;
    ${blur && "backdrop-filter: blur(5px);"}
  `;
};
const modalCSS = ({ width , height , overflow , showModal  })=>{
    return _emotion_react__WEBPACK_IMPORTED_MODULE_1__.css`
    position: relative;
    transition-property: top;
    transition-duration: 0.3s;
    width: ${width};
    height: ${height};
    overflow: ${overflow};
    top: ${showModal ? "0px" : "100%"};

  
  `;
};


/***/ })

};
;