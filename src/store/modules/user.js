import { login, getUserInfo } from "@/api/user";
import { Message } from "element-ui";
import router from "@/router";
import { setTokenTime } from "@/utils/auth";
export default {
  namespaced: true,
  state: {
    token: {},
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload);
      if (res.data.success) {
        commit("setToken", res.data);
        router.push("/");
        Message.success(res.data.msg);
        setTokenTime();
      } else {
        Message.error(res.data.msg);
      }
    },
    async getUserInfo({ commit }, payload) {
      const res = await getUserInfo(payload);
      commit("setUserInfo", res.data);
    },
    logout({ commit }) {
      commit("setToken", {});
      commit("setUserInfo", {});
    },
  },
};
