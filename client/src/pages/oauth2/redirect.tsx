import { useRouter } from "next/router";
import { useEffect } from "react";
import getMyInfo from "@/api/user/getMyInfo";
import { GetServerSideProps } from "next";
import cookie from "cookie";
const ACCESS_TOKEN = "access_token";

function getUrlParameter(name: string, search: string): string {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

  const results = regex.exec(search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const OAuth2RedirectHandler = (props: any) => {
  const router = useRouter();
  useEffect(() => {
    // console.log(props);
    // console.log(props.token);

    const token = getUrlParameter("token", window.location.search);
    const error = getUrlParameter("error", window.location.search);
    const code = getUrlParameter("code", window.location.search);
    // console.log(code);

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      getMyInfo()
        .then((userInfo) => {
          if (userInfo) {
            localStorage.setItem("userId", JSON.stringify(userInfo.userId));
            localStorage.setItem("nickname", userInfo.nickname);
            localStorage.setItem("imageUrl", userInfo.imageUrl);
            localStorage.setItem("gender", JSON.stringify(userInfo.gender));
            localStorage.setItem("age", JSON.stringify(userInfo.age));
          }
          // console.log(userInfo);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
      if (code === "200") {
        router
          .push({
            pathname: "/",
            query: { from: router.asPath },
          })
          .then(() => {
            window.history.replaceState({}, document.title, "/");
          });
      } else if (code === "201") {
        router
          .push({
            pathname: "/survey",
            query: {
              from: router.asPath,
              error: error,
            },
          })
          .then(() => {
            window.history.replaceState({}, document.title, "/mypage/edit");
          });
      } else {
        router
          .push({
            pathname: "/error",
            query: { from: router.asPath },
          })
          .then(() => {
            window.history.replaceState({}, document.title, "/error");
          });
      }
    } else {
      router
        .push({
          pathname: "/login",
          query: {
            from: router.asPath,
            error: error,
          },
        })
        .then(() => {
          window.history.replaceState({}, document.title, "/login");
        });
    }
  }, [router]);

  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query.token as string | undefined;
  // console.log(token);
  // 쿠키에 토큰 저장
  if (token) {
    context.res.setHeader(
      "Set-Cookie",
      cookie.serialize(ACCESS_TOKEN, token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60, // 30일
        sameSite: "strict",
        path: "/",
      })
    );
  }

  return {
    props: {
      token,
    },
  };
};

export default OAuth2RedirectHandler;

// 위 코드에서 getServerSideProps 함수에서 token을 쿠키에 저장하도록 수정하였습니다.
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
