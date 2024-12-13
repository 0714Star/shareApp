"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      rateValue: 0
    };
  },
  onLoad() {
    setTimeout(() => {
      this.rateValue = 3;
    }, 1e3);
  },
  methods: {
    onChange(e) {
      console.log("rate发生改变:" + JSON.stringify(e));
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_rate2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_rate + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o($options.onChange),
    c: common_vendor.o(($event) => $data.rateValue = $event),
    d: common_vendor.p({
      modelValue: $data.rateValue
    }),
    e: common_vendor.p({
      title: "基本用法",
      type: "line",
      padding: true
    }),
    f: common_vendor.o($options.onChange),
    g: common_vendor.p({
      touchable: false,
      value: 5
    }),
    h: common_vendor.p({
      title: "不支持滑动手势选择评分",
      subTitle: "设置 touchable 属性控制是否开启手势选择",
      type: "line",
      padding: true
    }),
    i: common_vendor.p({
      size: "18",
      value: 5
    }),
    j: common_vendor.p({
      title: "设置尺寸大小",
      subTitle: "设置 size 属性控制组件大小",
      type: "line",
      padding: true
    }),
    k: common_vendor.p({
      max: 10,
      value: 5
    }),
    l: common_vendor.p({
      title: "设置评分数",
      subTitle: "设置 max 属性控制组件最大星星数量",
      type: "line",
      padding: true
    }),
    m: common_vendor.p({
      value: 4,
      margin: "20"
    }),
    n: common_vendor.p({
      title: "设置星星间隔",
      subTitle: "设置 margin 属性控制星星间隔",
      type: "line",
      padding: true
    }),
    o: common_vendor.p({
      value: 3,
      color: "#bbb",
      ["active-color"]: "red"
    }),
    p: common_vendor.p({
      title: "设置颜色",
      subTitle: "使用 color 属性设置星星颜色",
      type: "line",
      padding: true
    }),
    q: common_vendor.p({
      ["allow-half"]: true,
      value: 3.5
    }),
    r: common_vendor.p({
      title: "半星",
      subTitle: "使用 allow-half 属性设置是否显示半星",
      type: "line",
      padding: true
    }),
    s: common_vendor.p({
      readonly: true,
      value: 2
    }),
    t: common_vendor.p({
      title: "只读状态",
      subTitle: "使用 readonly 属性设置组件只读",
      type: "line",
      padding: true
    }),
    v: common_vendor.p({
      disabled: true,
      disabledColor: "#ccc",
      value: 3
    }),
    w: common_vendor.p({
      title: "禁用状态",
      subTitle: "使用 disabled 属性设置组件禁用",
      type: "line",
      padding: true
    }),
    x: common_vendor.p({
      value: 3,
      ["is-fill"]: false
    }),
    y: common_vendor.p({
      title: "未选中的星星为镂空状态",
      subTitle: "使用 is-fill 属性设置星星镂空",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
