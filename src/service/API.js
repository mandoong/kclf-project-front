import axios from "axios";

const API = axios.create({
  baseURL: "https://6ah60v7ki9.execute-api.ap-northeast-2.amazonaws.com/dev", // API의 기본 URL을 설정합니다.
});

const Token = window.localStorage.getItem("Token") || null;

if (Token) {
  API.defaults.headers.Authorization = "Bearer " + Token;
}

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
      }
    } else {
    }

    return Promise.reject(error.response);
  }
);

export { API };
