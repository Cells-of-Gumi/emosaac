import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "jotai";
import mainStore from "@/jotai/atom";
import Layout from "@/components/layout/Layout";
import { useIsClient } from "@/components/Responsive/useIsClient";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useEffect, useState } from "react";
import getMyInfo from "@/api/user/getMyInfo";
import FixedModal from "@/components/UI/FixedModal/FixedModal";
import RequireLogin from "@/components/UI/RequireLogin/RequireLogin";
import RequireUserInfo from "@/components/UI/RequireLogin/RequireUserInfo";

// import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const isClient = useIsClient();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [myInfo, setMyInfo] = useState<any>(null);
  const [loginModalState, setLoginModalState] = useState<boolean>(false);
  const [requireInfoModalState, setRequireInfoModalState] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (window.localStorage.getItem("access_token")) {
      getMyInfo()
        .then((res) => {
          setMyInfo(() => res);

          if (router.pathname !== "/survey" && router.pathname !== "/mypage/edit") {
            if (res?.webtoonGerne === null || res?.novelGerne === null) {
              setRequireInfoModalState(() => true)
              router.push("/survey")
              // router.push("/mypage/edit");
            }
  
            if ((res?.nickname === null || res?.age === null || res?.gender === null) && (res?.webtoonGerne !== null && res?.novelGerne !== null)) {
              setRequireInfoModalState(() => true)
              router.push("/mypage/edit");
            }
          }
          

          
          
        })
        .catch((err) => {
          console.log("_app.tsx - getMyInfo => ", err);
          setMyInfo(() => false);
        });
    } else {
      setMyInfo(() => false);
    }
  }, [router.pathname]);
  // const router = useRouter();
  // useEffect(() => {
  //   console.log("되고있나요");

  //   const userId = localStorage.getItem("userId");
  //   const nickname = localStorage.getItem("nickname");
  //   const age = localStorage.getItem("age");
  //   const gender = localStorage.getItem("gender");

  //   if (
  //     userId &&
  //     (nickname === "null" || age === "null" || gender === "null")
  //   ) {
  //     alert("회원정보를 입력해주셔야 해요");
  //     router.push("/mypage/edit");
  //   }
  // }, []);
  return (
    <Provider store={mainStore}>
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

      <Layout
        myInfo={myInfo}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      >
        <FixedModal
          content={<RequireLogin />}
          modalState={loginModalState}
          stateHandler={setLoginModalState}
          forced={true}
          blur={true}
          isDarkMode={isDarkMode}
        />
        <FixedModal
          content={<RequireUserInfo />}
          modalState={requireInfoModalState}
          stateHandler={setRequireInfoModalState}
          blur={true}
          isDarkMode={isDarkMode}
        />
        {myInfo !== null && (
          <Component
            {...pageProps}
            myInfo={myInfo}
            loginHandler={setLoginModalState}
            isDarkMode={isDarkMode}
          />
        )}
      </Layout>
    </Provider>
  );
}
