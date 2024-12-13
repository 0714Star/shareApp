"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      msg: ""
    };
  },
  created() {
    common_vendor.index.$on("cc", this.recive);
  },
  beforeDestroy() {
    common_vendor.index.$off("cc", this.recive);
  },
  methods: {
    recive(e) {
      this.msg = e.msg;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.msg === "" ? "等待发送" : "收到消息："),
    b: common_vendor.t($data.msg)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
