import axios from "axios";

function getToken() {
  
  if (typeof window !== "undefined") {
    const information = localStorage.getItem("access_token");
    return `Bearer ${information}`; 
  }
  
  return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc5NzM5NjczLCJleHAiOjE2ODA2MDM2NzN9.WtIMfSj612i75FPfpTuL0b-3D-HDYKwB9o9NpAMpDOyAF5Lnae31c0Sn8mT_ujn1jhD8LYD3atBG-V_JceqmKA";
}

function defaultInstace() {
  const token = getToken();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      "Content-Type": "application/JSON;charset=utf-8",
      Authorization: token,
    },
  });
  return instance;
}

function defaultFormDataInstance() {
  const token = getToken();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: { "Content-Type": "multipart/form-data", Authorization: token },
  });
  return instance;
}

export const defaultAxiosInstance = defaultInstace();
export const defaultAxiosFormDataInstance = defaultFormDataInstance();
