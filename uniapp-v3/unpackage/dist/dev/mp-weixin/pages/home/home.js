"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const utils_api_axios = require("../../utils/api/axios.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    function check() {
      utils_api_axios.instance.get("/wxAuth/test");
    }
    function connect() {
      store_index.store.dispatch("wsModule/connect");
    }
    function clearState() {
      store_index.store.dispatch("userModule/clearUserInfo");
    }
    common_vendor.onMounted(() => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(connect),
        b: common_vendor.o(clearState),
        c: common_vendor.o(($event) => common_vendor.unref(store_index.store).commit("wsModule/addPrivateMessage", "this is a message.")),
        d: common_vendor.o(($event) => common_vendor.unref(store_index.store).commit("userModule/checkState")),
        e: common_vendor.o(($event) => check())
      };
    };
  }
});
wx.createPage(_sfc_main);
