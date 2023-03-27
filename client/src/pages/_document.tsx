/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <title>emosaac</title> */}
        <meta
          name="description"
          content="다양한 플랫폼의 웹툰과 웹소설을 한 눈에 보고 추천 받아보세요"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const theme = localStorage.getItem("data-theme");
              document.documentElement.setAttribute("data-theme", theme);
              console.log(theme);
            `,
          }}
        ></script>
        <link
          href="https://webfontworld.github.io/sunn/SUIT.css"
          rel="stylesheet"
        ></link>
        <link rel="favicon" href="./favicon.ico"></link>
      </Head>
      <body>
        <div id="overlay-root" className="overlay-root" css={overlayCSS} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

const overlayCSS = css`
  z-index: 999999;
  position: fixed;
`;
