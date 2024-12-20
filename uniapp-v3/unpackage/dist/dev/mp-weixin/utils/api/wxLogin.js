"use strict";
const common_vendor = require("../../common/vendor.js");
const saveLoginData = (data) => {
  console.log("save ,data : ", data);
  let storageData = data;
  common_vendor.index.setStorageSync("user-info", storageData);
};
const getUserdata = () => {
  return common_vendor.index.getStorageSync("user-info");
};
const clearUserData = () => {
  common_vendor.index.setStorageSync("user-info", null);
  common_vendor.index.$emit("updateUserInfo");
};
exports.clearUserData = clearUserData;
exports.getUserdata = getUserdata;
exports.saveLoginData = saveLoginData;
