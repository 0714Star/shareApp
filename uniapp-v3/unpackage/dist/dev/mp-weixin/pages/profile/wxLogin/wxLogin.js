"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_index = require("../../../store/index.js");
if (!Array) {
  const _component_uni_card = common_vendor.resolveComponent("uni-card");
  _component_uni_card();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "wxLogin",
  setup(__props) {
    let wxCode = common_vendor.reactive({ code: "a" });
    let userInfo = common_vendor.reactive({});
    common_vendor.reactive({});
    function autoLogin() {
      store_index.store.dispatch("userModule/autoLogin");
    }
    function clearUserData() {
      store_index.store.dispatch("userModule/clearUserInfo");
    }
    function pingRequest() {
      common_vendor.index.showModal({
        title: "登录成功",
        complete() {
        }
      });
    }
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.t((_a = common_vendor.unref(wxCode)) == null ? void 0 : _a.code),
        b: common_vendor.t((_b = common_vendor.unref(userInfo)) == null ? void 0 : _b.nickName),
        c: (_c = common_vendor.unref(userInfo)) == null ? void 0 : _c.avatarUrl,
        d: common_vendor.o(pingRequest),
        e: common_vendor.o(clearUserData),
        f: common_vendor.o(autoLogin),
        g: common_vendor.p({
          title: "Code",
          thumbnail: "",
          extra: "额外信息",
          note: "Tips"
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
