import request from "@/utils/request";

/**
 * 获取验证码图片
 * @param {*} clientToken 请求随机数
 * @returns promise
 */
export function getImageCode(clientToken) {
  return request({
    url: `/user-service/user/imageCode/${clientToken}`,
  });
}
