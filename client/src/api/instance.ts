import axios from "axios";
import cookie from "cookie";
export function getToken(req?: any) {
  if (typeof window !== "undefined") {
    const information = localStorage.getItem("access_token");
    console.log(information)
    return `Bearer ${information}`;
  }

  if (req) {
    const cookies = cookie.parse(req.headers.cookie || "");
    return cookies.access_token ? `Bearer ${cookies.access_token}` : null;
  }

  return null;
}

export function createDefaultInstance(req?: any) {
  const token = getToken(req);
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/JSON;charset=utf-8",
      Authorization: token,
    },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken(req);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return instance;
}
// function defaultInstace(req?: any) {
//   const token = getToken(req);
//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     headers: {
//       "Content-Type": "application/JSON;charset=utf-8",
//       Authorization: token,
//     },
//   });

//   instance.interceptors.request.use((config) => {
//     const token = getToken(req);
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   });

//   return instance;
// }

function defaultFormDataInstance() {
  const token = getToken();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });

  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return instance;
}

export const defaultAxiosInstance = createDefaultInstance();
export const defaultAxiosFormDataInstance = defaultFormDataInstance();

// getToken() 함수:
// 이 함수는 로컬 스토리지에서 "access_token"을 가져와서 "Bearer" 문자열과 함께 반환합니다.
// 만약 로컬 스토리지에 토큰이 없거나 window 객체가 정의되지 않은 경우(서버사이드 렌더링과 같은 경우), 하드 코딩된 토큰을 반환합니다.

// defaultInstace() 함수: 이 함수는 axios 인스턴스를 생성하고 기본 구성을 설정합니다.
// baseURL은 NEXT_PUBLIC_API_BASE_URL 환경 변수에서 가져옵니다.
// 헤더에는 "Content-Type"과 "Authorization"이 설정되어 있습니다.
// 이 함수는 또한 인터셉터를 설정하여 요청에 토큰을 추가합니다.

// defaultFormDataInstance() 함수:
// 이 함수는 "Content-Type"을 "multipart/form-data"로 설정한 다른 axios 인스턴스를 생성합니다.
// 이 인스턴스는 파일 업로드와 같은 경우에 사용됩니다.
// 이 함수도 인터셉터를 설정하여 요청에 토큰을 추가합니다.

// 마지막으로, 두 개의 인스턴스를 각각 defaultAxiosInstance와 defaultAxiosFormDataInstance로 내보냅니다. 이 인스턴스들은 다른 파일에서 임포트하여 API 요청을 수행하는 데 사용할 수 있습니다.
