"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      numberValue: 0,
      vModelValue: 3
    };
  },
  methods: {
    change(value) {
      this.numberValue = value;
    },
    changeValue(value) {
      console.log("返回数值：", value);
    },
    blur(e) {
      console.log("-------blur:", e);
    },
    focus(e) {
      console.log("-------focus:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_number_box2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_number_box + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.changeValue),
    c: common_vendor.p({
      title: "基本用法",
      type: "line",
      padding: true
    }),
    d: common_vendor.o($options.blur),
    e: common_vendor.o($options.focus),
    f: common_vendor.o($options.changeValue),
    g: common_vendor.o(($event) => $data.vModelValue = $event),
    h: common_vendor.p({
      modelValue: $data.vModelValue
    }),
    i: common_vendor.p({
      title: "使用v-model : " + $data.vModelValue,
      subTitle: "使用 v-model 显示默认值",
      type: "line",
      padding: true
    }),
    j: common_vendor.p({
      min: 2,
      max: 9,
      value: 555
    }),
    k: common_vendor.p({
      title: "设置最小值和最大值",
      subTitle: "使用 min \\ max 属性设置最大最小值",
      type: "line",
      padding: true
    }),
    l: common_vendor.p({
      value: 1.1,
      step: 0.1
    }),
    m: common_vendor.p({
      title: "设置步长（步长0.1)",
      subTitle: "使用 step 属性设置步长",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      value: 50,
      background: "#2979FF",
      color: "#fff"
    }),
    o: common_vendor.p({
      title: "自定义背景",
      type: "line",
      subTitle: "使用 background 属性设置自定义背景色",
      padding: true
    }),
    p: common_vendor.p({
      disabled: true
    }),
    q: common_vendor.p({
      title: "禁用状态",
      subTitle: "使用 disabled 属性设置组件禁用",
      type: "line",
      padding: true
    }),
    r: common_vendor.o($options.change),
    s: common_vendor.p({
      value: $data.numberValue
    }),
    t: common_vendor.p({
      title: "获取输入的值 : " + $data.numberValue,
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
