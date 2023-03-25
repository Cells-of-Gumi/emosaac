import axios from "axios";

function getToken() {
  
  if (typeof window !== "undefined") {
    const information = localStorage.getItem("access_token");
    return `Bearer ${information}`; 
  }
  
  return "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc5NzI5MjYwLCJleHAiOjE2ODA1OTMyNjB9.XHPc_vgncmmMesknqWB9eBbL2VDDeH_oXlYqIuIUvM9EK0OM5qzWA6Zsa3JDGS6Tf2QSuH8d-_U7CKsbW-H1-g";
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
