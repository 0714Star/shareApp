"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      now: Date.now()
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_dateformat2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_dateformat + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      date: $data.now - 72e5
    }),
    c: common_vendor.p({
      date: "2020/12/12"
    }),
    d: common_vendor.p({
      title: "基础用法",
      type: "line",
      padding: true
    }),
    e: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [0, 36e5]
    }),
    f: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [0, 0]
    }),
    g: common_vendor.p({
      title: "设置阈值",
      subTitle: "阈值用于控制什么时候显示刚刚|马上，什么时候显示xx分钟前|xx分钟后",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      date: $data.now - 12e5,
      threshold: [6e4, 36e5],
      locale: "en"
    }),
    i: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [6e4, 36e5],
      locale: "en"
    }),
    j: common_vendor.p({
      date: $data.now - 8e4,
      threshold: [6e4, 36e5],
      locale: "en"
    }),
    k: common_vendor.p({
      title: "使用英文",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
