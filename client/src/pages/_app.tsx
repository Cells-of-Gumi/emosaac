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

// import { useMediaQuery } from "react-responsive";

export default function App({ Component, pageProps }: AppProps) {
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const isClient = useIsClient();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [myInfo, setMyInfo] = useState<any>(null);
  const [loginModalState, setLoginModalState] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.getItem('access_token')) {
      getMyInfo()
      .then((res) => {
        setMyInfo(() => res);
      })
      .catch((err) => {
        console.log('_app.tsx - getMyInfo => ', err)
        setMyInfo(() => false);
      });
    } else {
      setMyInfo(() => 'anonymous')
    }
    
  }, [pageProps]);

  return (
    <Provider store={mainStore}>
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

      <Layout myInfo={myInfo} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
        <FixedModal
          content={<RequireLogin />}
          modalState={loginModalState}
          stateHandler={setLoginModalState}
          forced={true}
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
