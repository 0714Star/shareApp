"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api_wxLogin = require("../../utils/api/wxLogin.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(utils_api_wxLogin.clearUserData) && common_vendor.unref(utils_api_wxLogin.clearUserData)(...args)
        )
      };
    };
  }
});
wx.createPage(_sfc_main);
