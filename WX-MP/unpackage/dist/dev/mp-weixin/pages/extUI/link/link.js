"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_link2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_link = () => "../../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_link + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/"
    }),
    c: common_vendor.p({
      title: "基本示例",
      subTitle: "打开外部连接",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      color: "#007BFF"
    }),
    e: common_vendor.p({
      title: "自定义颜色",
      type: "line",
      padding: true
    }),
    f: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      showUnderLine: "false"
    }),
    g: common_vendor.p({
      title: "自定义下划线",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      showUnderLine: "false",
      ["font-size"]: "20"
    }),
    i: common_vendor.p({
      title: "自定义字体大小",
      type: "line",
      padding: true
    }),
    j: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      showUnderLine: "false",
      color: "red"
    }),
    k: common_vendor.p({
      title: "自定义插槽",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
