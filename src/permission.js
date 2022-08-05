import router from "@/router";
import store from "@/store";
const whiteList = ["/login", "/404"];
router.beforeEach((to, from, next) => {
  const token = store.state.user.token;
  if (token.token) {
    if (!store.state.user.userInfo.userId) {
      store.dispatch("user/getUserInfo", store.state.user.token.userId);
    }
    to.path === "/login" ? next("/") : next();
  } else {
    whiteList.includes(to.path) ? next() : next("/login");
  }
});
