"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "getUserInfo",
      hasUserInfo: false,
      userInfo: {},
      btnLoading: false
    };
  },
  computed: {
    ...common_vendor.mapState([
      "loginProvider",
      "isUniverifyLogin"
    ])
  },
  methods: {
    ...common_vendor.mapActions(["getPhoneNumber"]),
    // 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
    getUserInfo() {
      this.btnLoading = true;
      if (this.isUniverifyLogin) {
        this.getPhoneNumber(common_vendor.index.getStorageSync("univerifyInfo")).then((phoneNumber) => {
          this.hasUserInfo = true;
          this.userInfo = {
            phoneNumber
          };
        }).catch((err) => {
          console.error("getUserInfo fail:", err);
          this.hasUserInfo = false;
        }).finally(() => {
          this.btnLoading = false;
        });
        return;
      }
      if (this.loginProvider === "apple") {
        const nickname = common_vendor.index.getStorageSync("apple_nickname");
        if (nickname) {
          this.hasUserInfo = true;
          this.userInfo = { nickName: nickname };
          this.btnLoading = false;
          return;
        }
      }
      common_vendor.index.getUserInfo({
        provider: this.loginProvider,
        success: (result) => {
          this.hasUserInfo = true;
          this.userInfo = result.userInfo;
        },
        fail: (error) => {
          console.log("getUserInfo fail", error);
          let content = error.errMsg;
          if (~content.indexOf("uni.login")) {
            content = "请在登录页面完成登录操作";
          }
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.userInfo"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "授权失败",
                  content: "Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              } else {
                common_vendor.index.showModal({
                  title: "获取用户信息失败",
                  content: "错误原因" + content,
                  showCancel: false
                });
              }
            }
          });
        },
        complete: () => {
          this.btnLoading = false;
        }
      });
    },
    mpGetUserInfo(result) {
      console.log("mpGetUserInfo", result);
      if (result.detail.errMsg !== "getUserInfo:ok") {
        common_vendor.index.showModal({
          title: "获取用户信息失败",
          content: "错误原因" + result.detail.errMsg,
          showCancel: false
        });
        return;
      }
      this.hasUserInfo = true;
      if (result.detail && result.detail.userInfo) {
        this.userInfo = result.detail.userInfo;
      }
    },
    clear() {
      this.hasUserInfo = false;
      this.userInfo = {};
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.hasUserInfo === false
  }, $data.hasUserInfo === false ? {} : {}, {
    c: $data.hasUserInfo === true
  }, $data.hasUserInfo === true ? common_vendor.e({
    d: common_vendor.t($data.userInfo.nickName || $data.userInfo.nickname || $data.userInfo.gender || $data.userInfo.email || $data.userInfo.phoneNumber),
    e: $data.userInfo.avatarUrl || $data.userInfo.avatar_url
  }, $data.userInfo.avatarUrl || $data.userInfo.avatar_url ? {
    f: $data.userInfo.avatarUrl || $data.userInfo.avatar_url
  } : {}) : {}, {
    g: common_vendor.o((...args) => $options.mpGetUserInfo && $options.mpGetUserInfo(...args)),
    h: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
