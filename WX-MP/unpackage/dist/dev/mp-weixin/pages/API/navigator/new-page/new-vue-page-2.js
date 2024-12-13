"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {
    ...common_vendor.mapState(["colorIndex", "colorList"]),
    ...common_vendor.mapGetters(["currentColor"])
  },
  methods: {
    ...common_vendor.mapMutations(["setColorIndex"]),
    emitMsg() {
      common_vendor.index.$emit("postMsg", {
        msg: "From: Vue Page"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => _ctx.setColorIndex(_ctx.colorIndex > 1 ? 0 : _ctx.colorIndex + 1)),
    b: _ctx.currentColor,
    c: common_vendor.o((...args) => $options.emitMsg && $options.emitMsg(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
