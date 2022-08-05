import request from "@/utils/request";

/**
 * 用户登录接口
 * @param {Object} data loginName password
 * @returns promise
 */
export function login(data) {
  return request({
    url: "/user-service/user/login",
    method: "post",
    data,
  });
}

/**
 * 获取用户基本信息
 * @param {String} id 用户id
 * @returns promise 
 */
export function getUserInfo(id) {
  return request({
    url: "/user-service/user/" + id,
  });
}
