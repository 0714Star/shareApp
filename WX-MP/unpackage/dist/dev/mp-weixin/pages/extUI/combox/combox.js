"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      candidates: ["北京", "南京", "东京", "武汉", "天津", "上海", "海口"],
      city: ""
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_combox2 = common_vendor.resolveComponent("uni-combox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_combox2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_combox = () => "../../../uni_modules/uni-combox/components/uni-combox/uni-combox.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_combox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o(($event) => $data.city = $event),
    c: common_vendor.p({
      candidates: $data.candidates,
      placeholder: "请选择所在城市",
      modelValue: $data.city
    }),
    d: common_vendor.t($data.city),
    e: common_vendor.p({
      title: "基本用法",
      type: "line"
    }),
    f: common_vendor.p({
      border: false,
      candidates: $data.candidates,
      placeholder: "请选择所在城市"
    }),
    g: common_vendor.p({
      title: "无边框",
      subTitle: "使用 border = false 取消边框",
      type: "line"
    }),
    h: common_vendor.p({
      emptyTips: "这里啥都没有",
      placeholder: "请选择所在城市"
    }),
    i: common_vendor.p({
      title: "设置无匹配项时的提示语",
      subTitle: "使用 emptyTips 属性设置无匹配项时的提示语",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
