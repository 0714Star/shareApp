"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "profile",
  setup(__props) {
    function getUserdata() {
      return store_index.store.state.userModule["userInfo"];
    }
    let userData = common_vendor.reactive(getUserdata());
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: (_a = common_vendor.unref(userData)) == null ? void 0 : _a.avatar,
        b: common_vendor.t((_b = common_vendor.unref(userData)) == null ? void 0 : _b.nickName)
      };
    };
  }
});
wx.createPage(_sfc_main);
