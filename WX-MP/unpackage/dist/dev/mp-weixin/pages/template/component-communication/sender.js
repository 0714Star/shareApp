"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  methods: {
    send() {
      let num = parseInt(Math.random() * 1e4);
      common_vendor.index.$emit("cc", {
        msg: "From uni.$emit -> " + num
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
