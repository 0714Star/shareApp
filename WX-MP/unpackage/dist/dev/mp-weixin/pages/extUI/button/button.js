"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
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
      title: "按钮形状",
      ["sub-title"]: "添加类名 .uni-btn-radius 可以使用圆角按钮",
      type: "line"
    }),
    c: common_vendor.p({
      title: "按钮形状(size=mini)",
      ["sub-title"]: "添加类名 .uni-btn-radius 可以使用圆角按钮",
      type: "line"
    }),
    d: common_vendor.p({
      title: "普通按钮",
      ["sub-title"]: "指定不同的 type 属性 ,展示不同类型按钮",
      type: "line"
    }),
    e: common_vendor.p({
      title: "普通按钮(size=mini)",
      ["sub-title"]: "指定不同的 type 属性 ,展示不同类型按钮",
      type: "line"
    }),
    f: common_vendor.p({
      title: "镂空按钮",
      ["sub-title"]: "添加类名 .uni-btn-plain 使用镂空按钮",
      type: "line"
    }),
    g: common_vendor.p({
      title: "镂空按钮(size=mini)",
      ["sub-title"]: "添加类名 .uni-btn-plain 使用镂空按钮",
      type: "line"
    }),
    h: common_vendor.p({
      title: "禁用",
      ["sub-title"]: "使用 disabled 属性 ,展示禁用按钮",
      type: "line"
    }),
    i: common_vendor.p({
      title: "禁用(size=mini)",
      ["sub-title"]: "使用 disabled 属性 ,展示禁用按钮",
      type: "line"
    }),
    j: common_vendor.p({
      title: "大小",
      ["sub-title"]: "添加类名 .uni-btn-small .uni-btn-mini 展示按钮的不同大小",
      type: "line"
    }),
    k: common_vendor.p({
      title: "大小(sizi=mini)",
      ["sub-title"]: "添加类名 .uni-btn-small .uni-btn-mini 展示按钮的不同大小",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
