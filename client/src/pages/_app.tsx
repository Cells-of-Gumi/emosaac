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

  const [myInfo, setMyInfo] = useState<any>(null);
  const [loginModalState, setLoginModalState] = useState<boolean>(false);

  useEffect(() => {
    getMyInfo()
      .then((res) => {
        setMyInfo(() => res);
      })
      .catch((err) => {
        setMyInfo(() => false);
      });
  }, [pageProps]);

  return (
    <Provider store={mainStore}>
      <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

      <Layout myInfo={myInfo}>
        <FixedModal
          content={<RequireLogin />}
          modalState={loginModalState}
          stateHandler={setLoginModalState}
          forced={true}
          blur={true}
        />
        {myInfo !== null && (
          <Component
            {...pageProps}
            myInfo={myInfo}
            loginHandler={setLoginModalState}
          />
        )}
      </Layout>
    </Provider>
  );
}
