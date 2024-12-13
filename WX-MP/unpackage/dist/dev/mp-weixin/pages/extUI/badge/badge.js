"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      value: 0,
      customStyle: {
        backgroundColor: "#62ed0d",
        color: "#fff"
      }
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.value >= 199) {
        clearInterval(timer);
        return;
      }
      this.value++;
    }, 100);
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_badge2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_badge = () => "../../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_badge + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      text: "1"
    }),
    c: common_vendor.p({
      text: "2",
      type: "primary"
    }),
    d: common_vendor.p({
      text: "34",
      type: "success"
    }),
    e: common_vendor.p({
      text: "45",
      type: "warning"
    }),
    f: common_vendor.p({
      text: "123",
      type: "info"
    }),
    g: common_vendor.p({
      title: "基础用法",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      inverted: true,
      text: "1"
    }),
    i: common_vendor.p({
      inverted: true,
      text: "2",
      type: "primary"
    }),
    j: common_vendor.p({
      inverted: true,
      text: "34",
      type: "success"
    }),
    k: common_vendor.p({
      inverted: true,
      text: "45",
      type: "warning"
    }),
    l: common_vendor.p({
      inverted: true,
      text: "123",
      type: "info"
    }),
    m: common_vendor.p({
      title: "无底色",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      text: "2",
      type: "primary",
      customStyle: {
        background: "#4335d6"
      }
    }),
    o: common_vendor.p({
      text: "2",
      type: "primary",
      customStyle: $data.customStyle
    }),
    p: common_vendor.p({
      title: "自定义样式",
      type: "line",
      padding: true
    }),
    q: common_vendor.p({
      text: $data.value,
      absolute: "rightTop",
      size: "small"
    }),
    r: common_vendor.p({
      title: "定位: aboslute 属性",
      subTitle: "注：在安卓端不支持 nvue",
      type: "line",
      padding: true
    }),
    s: common_vendor.p({
      text: 8,
      absolute: "rightTop",
      offset: [-3, -3],
      size: "small"
    }),
    t: common_vendor.p({
      title: "偏移: offset 属性(存在 aboslute)",
      type: "line",
      padding: true
    }),
    v: common_vendor.p({
      ["is-dot"]: true,
      text: $data.value,
      absolute: "rightTop",
      size: "small"
    }),
    w: common_vendor.p({
      title: "仅显示点: is-dot 属性",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
