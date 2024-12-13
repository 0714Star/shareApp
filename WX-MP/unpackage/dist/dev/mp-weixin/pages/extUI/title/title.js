"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      title: "标题组件通常用于记录页面标题，例如商品标题、新闻标题等，当前组件会自动上报内容统计数据"
    };
  },
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_title2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_title = () => "../../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_title + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      type: "h1",
      title: "h1 一级标题"
    }),
    c: common_vendor.p({
      type: "h2",
      title: "h2 二级标题"
    }),
    d: common_vendor.p({
      type: "h3",
      title: "h3 三级标题"
    }),
    e: common_vendor.p({
      type: "h4",
      title: "h4 四级标题"
    }),
    f: common_vendor.p({
      type: "h5",
      title: "h5 五级标题"
    }),
    g: common_vendor.p({
      title: "不同类型",
      type: "line"
    }),
    h: common_vendor.p({
      type: "h1",
      title: "h1 一级标题",
      color: "#027fff"
    }),
    i: common_vendor.p({
      type: "h2",
      title: "h2 二级标题",
      color: "#2490ff"
    }),
    j: common_vendor.p({
      type: "h3",
      title: "h3 三级标题",
      color: "#439ffc"
    }),
    k: common_vendor.p({
      type: "h4",
      title: "h4 四级标题",
      color: "#60adfb"
    }),
    l: common_vendor.p({
      type: "h5",
      title: "h5 五级标题",
      color: "#7db9f7"
    }),
    m: common_vendor.p({
      title: "改变颜色",
      type: "line"
    }),
    n: common_vendor.p({
      type: "h1",
      title: "h1 左对齐",
      align: "left"
    }),
    o: common_vendor.p({
      type: "h2",
      title: "h2 居中",
      align: "center"
    }),
    p: common_vendor.p({
      type: "h3",
      title: "h3 右对齐",
      align: "right"
    }),
    q: common_vendor.p({
      type: "h4",
      title: "h4 居中",
      align: "center"
    }),
    r: common_vendor.p({
      type: "h5",
      title: "h5 左对齐",
      align: "left"
    }),
    s: common_vendor.p({
      title: "对齐方式",
      type: "line"
    }),
    t: common_vendor.p({
      type: "h1",
      align: "center",
      title: "uni-app介绍"
    }),
    v: common_vendor.p({
      type: "h3",
      title: "1 框架介绍"
    }),
    w: common_vendor.p({
      type: "h4",
      title: "1.1 什么是uni-app"
    }),
    x: common_vendor.p({
      type: "h4",
      title: "1.2 开发规范"
    }),
    y: common_vendor.p({
      type: "h5",
      color: "#666",
      title: "- 页面文件遵循 Vue 单文件组件 (SFC) 规范"
    }),
    z: common_vendor.p({
      type: "h5",
      color: "#666",
      title: "- 组件标签靠近小程序规范，详见uni-app 组件规范"
    }),
    A: common_vendor.p({
      type: "h5",
      color: "#666",
      title: "- 接口能力（JS API）靠近微信小程序规范，但需将前缀 wx 替换为 uni，详见uni-app接口规范"
    }),
    B: common_vendor.p({
      type: "h5",
      color: "#666",
      title: "- 数据绑定及事件处理同 Vue.js 规范，同时补充了App及页面的生命周期"
    }),
    C: common_vendor.p({
      type: "h5",
      color: "#666",
      title: "- 为兼容多端运行，建议使用flex布局进行开发"
    }),
    D: common_vendor.p({
      title: "组合示例",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
