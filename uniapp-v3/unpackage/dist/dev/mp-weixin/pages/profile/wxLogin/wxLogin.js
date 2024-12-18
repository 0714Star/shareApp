"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_api_axios = require("../../../utils/api/axios.js");
const utils_api_wxLogin = require("../../../utils/api/wxLogin.js");
if (!Array) {
  const _component_uni_card = common_vendor.resolveComponent("uni-card");
  _component_uni_card();
}
const _sfc_main = {
  __name: "wxLogin",
  setup(__props) {
    let wxCode = common_vendor.reactive({ code: "a" });
    let userInfo = common_vendor.reactive({});
    common_vendor.reactive({});
    function autoLogin() {
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
        success: (userInfo2, rawData, signature, encryptedData, iv) => {
          console.log(userInfo2);
          user.nickName = userInfo2.userInfo.nickName;
          user.avatar = userInfo2.userInfo.avatarUrl;
          user.encryptedData = userInfo2.encryptedData;
          user.signature = userInfo2.signature;
          console.log("------user------", user);
          login(user);
        }
      });
      function login(user2) {
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
        utils_api_wxLogin.saveLoginData(resWeb.data);
        console.log("后端返回的 登录数据", resWeb);
      }
    }
    function pingRequest() {
      common_vendor.index.showModal({
        title: "登录成功",
        complete() {
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(autoLogin),
        b: common_vendor.t(common_vendor.unref(wxCode).code),
        c: common_vendor.t(common_vendor.unref(userInfo).nickName),
        d: common_vendor.unref(userInfo).avatarUrl,
        e: common_vendor.o(pingRequest),
        f: common_vendor.o((...args) => common_vendor.unref(utils_api_wxLogin.clearUserData) && common_vendor.unref(utils_api_wxLogin.clearUserData)(...args)),
        g: common_vendor.p({
          title: "Code",
          thumbnail: "",
          extra: "额外信息",
          note: "Tips"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
