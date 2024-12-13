"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {},
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      title: "主色",
      type: "line"
    }),
    c: common_vendor.p({
      title: "辅助色",
      ["sub-title"]: "除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。",
      type: "line"
    }),
    d: common_vendor.p({
      title: "中性色",
      ["sub-title"]: "中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。",
      type: "line"
    }),
    e: common_vendor.p({
      title: "分隔线",
      ["sub-title"]: "主要用于边框颜色",
      type: "line"
    }),
    f: common_vendor.p({
      title: "常规色",
      ["sub-title"]: "通用颜色,如黑色白色",
      type: "line"
    }),
    g: common_vendor.p({
      title: "阴影",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
