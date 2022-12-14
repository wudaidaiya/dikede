import axios from "axios";
import store from "@/store";
import router from "@/router";
import { getTokenTime } from "./auth";
import { Message } from "element-ui";


const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

function isTimeout() {
  const currentTime = Date.now();
  const tokenTime = getTokenTime();
  const timeout = 2 * 60 * 60 * 1000;
  return currentTime - tokenTime > timeout;
}

// 请求拦截器
service.interceptors.request.use(async (config) => {
  if (store.state.user.token.token) {
    if (isTimeout()) {
      await store.dispatch("user/logout");
      router.push("/login");
      return Promise.reject(new Error("登录过期"));
    } else {
      config.headers.Authorization = store.state.user.token.token;
    }
  }
  return config;
}); 

// 响应拦截器
service.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      Message.error("登录过期");
      await store.dispatch("user/logout");
      router.push("/login");
    } else {
      Message.error(error.message);
    }
    return Promise.reject(error);
  }
); 
export default service;
