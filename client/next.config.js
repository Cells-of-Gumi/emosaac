/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // SWC 컴파일러 사용을 위한 최적화 코드 삽입
  // swcMinifty이란 Terser와 비슷한 역할을 한다고 생각하면 된다.
  // Terser의 역할은 필요없는 공백이나, 주석을 삭제하여 용량을 줄이고, 해당 스크립트를 해석할 수 없도록 암호화 하는 역할을 한다고 할 수 있다.
  // 기본적으로 React나 Next는 기본 설정을 통해 build 파일을 만들면서, Terser의 역할을 할 수 있다.
  // 이러한 역할에 대한 설정을 handling 할 수 있도록 하는 것이 swcMinifty라고 할 수 있다. 이러한 역할에 대한 용어를 Minification이라고 한다.
  swcMinify: true,

  // 아래의 코드를 사용하면 console.log를 제외한 나머지 console을 제거합니다.
  // compiler: {
  //   removeConsole: {
  //     exclude: ['log'],
  //   },
  // },

  // SWC 컴파일러와 함께 emotion 사용을 위한 기본 설정
  compiler: {
    emotion: true,
  },
  env: {
    REACT_APP_API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
    NEXT_PUBLIC_NAVER_KEY: process.env.NEXT_PUBLIC_NAVER_KEY,
    NEXT_PUBLIC_KAKAO_KEY: process.env.NEXT_PUBLIC_KAKAO_AUTH_URL,
  },
};

// module.exports = nextConfig;
module.exports = {
  // output: 'standalone',
  images: {
    loader: "imgix",
    path: "https://j8d203.p.ssafy.io",
  },
};
