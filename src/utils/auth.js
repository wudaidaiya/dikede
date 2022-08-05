import Cookies from "js-cookie";

const TokenKey = "vue_admin_template_token";

const TokenTime = "liked_current_token_time";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function setTokenTime() {
  return Cookies.set(TokenTime, Date.now());
}

export function getTokenTime() {
  return Cookies.get(TokenTime);
}
