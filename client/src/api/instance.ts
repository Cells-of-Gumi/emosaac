import axios from "axios";

function getToken() {
  
  if (typeof window !== "undefined") {
    const information = localStorage.getItem("access_token");
    return `Bearer ${information}`; 
  }
  
  return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc5NzQ3MDk1LCJleHAiOjE2ODA2MTEwOTV9.DsJ7WzqbL5_8TqoU9ESeWVFoUBGWVY2YpR61HVLMkMoJAYuiaC2okKqgTD97FAQBowGTM3WdAAHyIKbeFUSwDw";
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
