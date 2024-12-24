"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_CONSTANTS = require("../../utils/CONSTANTS.js");
const utils_api_axios = require("../../utils/api/axios.js");
const userModule = {
  namespaced: true,
  // 启用命名空间，防止模块间命名冲突
  state: () => ({
    userInfo: null
  }),
  mutations: {
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      common_vendor.index.setStorageSync(utils_CONSTANTS.USERINFO_KEY, userInfo);
      console.log("保存成功");
    },
    checkState({ userInfo }) {
      console.log("userInfo is", userInfo);
      return userInfo == null ? false : true;
    }
  },
  actions: {
    checkState({ state, dispatch }) {
      console.log("checkState");
      if (state.userInfo == null) {
        dispatch("autoLogin");
        return false;
      }
      return true;
    },
    /**
     *  一键登录
     *  @param {Object} context.state
     */
    autoLogin({ state, commit }) {
      console.log("autoLogin!");
      const user = {
        nickName: "",
        avatar: "",
        openId: "",
        encryptedData: "",
        signature: "",
        wxTempCode: ""
        // 临时凭证
      };
      common_vendor.wx$1.getUserProfile({
        desc: "获取用户信息",
        success: (userInfo, rawData, signature, encryptedData, iv) => {
          console.log(userInfo);
          user.nickName = userInfo.userInfo.nickName;
          user.avatar = userInfo.userInfo.avatarUrl;
          user.encryptedData = userInfo.encryptedData;
          user.signature = userInfo.signature;
          console.log("------user------", user);
          login(state, user);
        }
      });
      function login(state2, user2) {
        common_vendor.wx$1.login().then((res) => {
          user2.wxTempCode = res.code;
          utils_api_axios.instance.post("/wxAuth/wxLogin", user2).then((resWeb) => {
            if (resWeb.code == 200) {
              common_vendor.index.showToast({
                title: "登录成功",
                icon: "success",
                duration: 2e3,
                success() {
                  common_vendor.index.switchTab({
                    url: "/pages/profile/profile"
                  });
                }
              });
              loginSuccess(resWeb);
            }
          });
        }).catch((reason) => {
          console.log(reason);
        });
      }
      function loginSuccess(resWeb) {
        console.log("后端返回的 登录数据 ", resWeb);
        commit("updateUserInfo", resWeb.data);
      }
    },
    clearUserInfo(context) {
      common_vendor.index.removeStorageSync(utils_CONSTANTS.USERINFO_KEY);
      common_vendor.index.showModal({
        title: "请登陆",
        complete() {
          context.dispatch("autoLogin");
        }
      });
    }
  },
  getters: {}
};
exports.userModule = userModule;
