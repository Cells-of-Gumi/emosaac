import { useRouter } from "next/router";
import { useEffect } from "react";
import getMyInfo from "@/api/user/getMyInfo";

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

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      getMyInfo()
        .then((userInfo) => {
          if (userInfo) {
            localStorage.setItem("userId", JSON.stringify(userInfo.userId));
            localStorage.setItem("nickname", JSON.stringify(userInfo.nickname));
            localStorage.setItem("imageUrl", JSON.stringify(userInfo.imageUrl));
            localStorage.setItem("gender", JSON.stringify(userInfo.gender));
            localStorage.setItem("age", JSON.stringify(userInfo.age));
          }
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
            window.history.replaceState({}, document.title, "/login");
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
            window.history.replaceState({}, document.title, "/survey");
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

export const getServerSideProps = async (context: any) => {
  const token = await context.query.token;
  console.log(context.query);

  return await {
    props: {
      token,
    },
  };
};

export default OAuth2RedirectHandler;
