"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onReady() {
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
      title: "基础用法",
      ["sub-title"]: "副标题"
    }),
    c: common_vendor.p({
      title: "竖线装饰",
      ["sub-title"]: "副标题",
      type: "line"
    }),
    d: common_vendor.p({
      title: "装饰器插槽",
      ["sub-title"]: "副标题"
    }),
    e: common_vendor.p({
      title: "默认插槽",
      ["sub-title"]: "副标题",
      padding: "0 0 5px 10px"
    }),
    f: common_vendor.p({
      title: "主标题"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
