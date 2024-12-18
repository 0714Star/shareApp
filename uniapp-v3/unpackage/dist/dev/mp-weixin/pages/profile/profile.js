"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_wxLogin = require("../../utils/api/wxLogin.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "profile",
  setup(__props) {
    let userData = common_vendor.reactive(utils_api_wxLogin.getUserdata());
    common_vendor.onMounted(() => {
      const userData2 = utils_api_wxLogin.getUserdata();
      const token = userData2 == null ? void 0 : userData2.token;
      console.log("userData is :", userData2);
      if (!token) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/wxLogin/wxLogin"
          // 假设你的登录页路径为 /pages/login/login
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userData).avatar,
        b: common_vendor.t(common_vendor.unref(userData).nickName)
      };
    };
  }
});
wx.createPage(_sfc_main);
