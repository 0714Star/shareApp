"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gutter: 0,
      nvueWidth: 730
    };
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_col = () => "../../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_col + _easycom_uni_row + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      width: $data.nvueWidth
    }),
    c: common_vendor.p({
      span: 12
    }),
    d: common_vendor.p({
      span: 12
    }),
    e: common_vendor.p({
      width: $data.nvueWidth
    }),
    f: common_vendor.p({
      span: 8
    }),
    g: common_vendor.p({
      span: 8
    }),
    h: common_vendor.p({
      span: 8
    }),
    i: common_vendor.p({
      width: $data.nvueWidth
    }),
    j: common_vendor.p({
      span: 6
    }),
    k: common_vendor.p({
      span: 6
    }),
    l: common_vendor.p({
      span: 6
    }),
    m: common_vendor.p({
      span: 6
    }),
    n: common_vendor.p({
      width: $data.nvueWidth
    }),
    o: common_vendor.p({
      span: 4
    }),
    p: common_vendor.p({
      span: 4
    }),
    q: common_vendor.p({
      span: 4
    }),
    r: common_vendor.p({
      span: 4
    }),
    s: common_vendor.p({
      span: 4
    }),
    t: common_vendor.p({
      span: 4
    }),
    v: common_vendor.p({
      width: $data.nvueWidth
    }),
    w: common_vendor.p({
      title: "基础布局",
      subTitle: "使用单一分栏创建基础的栅格布局",
      type: "line"
    }),
    x: common_vendor.p({
      span: 8
    }),
    y: common_vendor.p({
      span: 8
    }),
    z: common_vendor.p({
      span: 4
    }),
    A: common_vendor.p({
      span: 4
    }),
    B: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    C: common_vendor.p({
      span: 4
    }),
    D: common_vendor.p({
      span: 16
    }),
    E: common_vendor.p({
      span: 4
    }),
    F: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    G: common_vendor.p({
      title: "混合布局",
      subTitle: "通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局",
      type: "line"
    }),
    H: common_vendor.p({
      span: 8
    }),
    I: common_vendor.p({
      span: 8,
      offset: 6
    }),
    J: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    K: common_vendor.p({
      span: 6,
      offset: 6
    }),
    L: common_vendor.p({
      span: 6,
      offset: 6
    }),
    M: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    N: common_vendor.p({
      span: 12,
      pull: 6
    }),
    O: common_vendor.p({
      span: 6,
      push: 6
    }),
    P: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    Q: common_vendor.p({
      span: 12,
      offset: 6
    }),
    R: common_vendor.p({
      gutter: $data.gutter,
      width: $data.nvueWidth
    }),
    S: common_vendor.p({
      title: "分栏偏移",
      subTitle: "支持偏移指定的栏数",
      type: "line"
    }),
    T: common_vendor.p({
      xs: 8,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 1
    }),
    U: common_vendor.p({
      xs: 4,
      sm: 6,
      md: 8,
      lg: 9,
      xl: 11
    }),
    V: common_vendor.p({
      xs: 4,
      sm: 6,
      md: 8,
      lg: 9,
      xl: 11
    }),
    W: common_vendor.p({
      xs: 8,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 1
    }),
    X: common_vendor.p({
      gutter: $data.gutter
    }),
    Y: common_vendor.p({
      title: "响应式布局",
      subTitle: "共五个响应尺寸：xs、sm、md、lg 和 xl",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
