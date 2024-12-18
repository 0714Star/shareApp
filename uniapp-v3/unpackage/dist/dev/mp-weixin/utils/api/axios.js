"use strict";
const common_vendor = require("../../common/vendor.js");
const ip = "http://192.168.123.203:24123";
common_vendor.axios.defaults.baseURL = ip;
common_vendor.axios.defaults.headers.common["Content-Type"] = "application/json";
const instance = common_vendor.axios.create({
  baseURL: "http://192.168.123.203:24123",
  headers: {
    "Content-Type": "application/json"
  }
});
instance.interceptors.request.use(
  (config) => {
    const user = common_vendor.index.getStorageSync("user-info") || {};
    if (user) {
      config.headers["token"] = user == null ? void 0 : user.token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          common_vendor.index.navigateTo({
            url: "/pages/profile/wxLogin/wxLogin"
          });
          break;
        case 500:
          common_vendor.index.showToast({
            title: "服务器错误，请稍后重试",
            icon: "none"
          });
          break;
        default:
          common_vendor.index.showToast({
            title: error.response.data.message || "请求失败",
            icon: "none"
          });
          break;
      }
    }
    return Promise.reject(error);
  }
);
instance.defaults.adapter = function(config) {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: config.baseURL + config.url,
      // 拼接完整的 URL
      method: config.method || "GET",
      // 默认为 GET 请求
      params: config.params,
      data: config.data,
      header: config.headers || {},
      // 确保 header 是对象
      success: (res) => {
        resolve({
          data: res.data,
          status: res.statusCode,
          headers: res.header,
          config
        });
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.instance = instance;
