"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      radio1: 0,
      radio2: 0,
      radio3: 0,
      radio4: 0,
      radio5: 0,
      radio6: 0,
      checkbox1: [0],
      checkbox2: [0],
      checkbox3: [0],
      checkbox4: [0],
      checkbox5: [0],
      checkbox6: [0],
      sex: [{
        text: "男",
        value: 0
      }, {
        text: "女",
        value: 1
      }, {
        text: "未知",
        value: 2
      }],
      sex1: [{
        text: "男",
        value: 0
      }, {
        text: "女",
        value: 1,
        disable: true
      }, {
        text: "未知",
        value: 2
      }],
      hobby: [{
        text: "足球",
        value: 0
      }, {
        text: "篮球",
        value: 1
      }, {
        text: "游泳",
        value: 2
      }],
      hobby2: [{
        text: "足球",
        value: 0,
        disable: true
      }, {
        text: "篮球",
        value: 1,
        disable: true
      }, {
        text: "游泳",
        value: 2
      }]
    };
  },
  onLoad() {
  },
  onReady() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_checkbox2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_checkbox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.t(JSON.stringify($data.radio1)),
    c: common_vendor.o(($event) => $data.radio1 = $event),
    d: common_vendor.p({
      localdata: $data.sex,
      modelValue: $data.radio1
    }),
    e: common_vendor.p({
      title: "单选",
      type: "line"
    }),
    f: common_vendor.t(JSON.stringify($data.checkbox1)),
    g: common_vendor.o(($event) => $data.checkbox1 = $event),
    h: common_vendor.p({
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox1
    }),
    i: common_vendor.p({
      title: "多选",
      subTitle: "使用multiple属性开启多选",
      type: "line"
    }),
    j: common_vendor.t(JSON.stringify($data.checkbox6)),
    k: common_vendor.o(($event) => $data.checkbox6 = $event),
    l: common_vendor.p({
      min: "1",
      max: "2",
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox6
    }),
    m: common_vendor.p({
      title: "最大最小值",
      subTitle: "使用 min / max 设置多选的最大最小值,单选无效"
    }),
    n: common_vendor.t(JSON.stringify($data.radio2)),
    o: common_vendor.o(($event) => $data.radio2 = $event),
    p: common_vendor.p({
      mode: "button",
      localdata: $data.sex,
      modelValue: $data.radio2
    }),
    q: common_vendor.t(JSON.stringify($data.checkbox2)),
    r: common_vendor.o(($event) => $data.checkbox2 = $event),
    s: common_vendor.p({
      mode: "button",
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox2
    }),
    t: common_vendor.p({
      title: "更多样式 - button",
      subTitle: "使用mode=button属性使用按钮样式",
      type: "line"
    }),
    v: common_vendor.t(JSON.stringify($data.radio3)),
    w: common_vendor.o(($event) => $data.radio3 = $event),
    x: common_vendor.p({
      mode: "tag",
      localdata: $data.sex,
      modelValue: $data.radio3
    }),
    y: common_vendor.t(JSON.stringify($data.checkbox3)),
    z: common_vendor.o(($event) => $data.checkbox3 = $event),
    A: common_vendor.p({
      mode: "tag",
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox3
    }),
    B: common_vendor.p({
      title: "更多样式 - tag",
      subTitle: "使用mode=tag属性使用标签样式",
      type: "line"
    }),
    C: common_vendor.t(JSON.stringify($data.radio4)),
    D: common_vendor.o(($event) => $data.radio4 = $event),
    E: common_vendor.p({
      mode: "button",
      localdata: $data.sex1,
      modelValue: $data.radio4
    }),
    F: common_vendor.t(JSON.stringify($data.checkbox4)),
    G: common_vendor.o(($event) => $data.checkbox4 = $event),
    H: common_vendor.p({
      mode: "button",
      multiple: true,
      localdata: $data.hobby2,
      modelValue: $data.checkbox4
    }),
    I: common_vendor.p({
      title: "禁用",
      subTitle: "数据中使用 disable 属性实现单独禁用,组件使用 disable 属性实现全部禁用",
      type: "line"
    }),
    J: common_vendor.t(JSON.stringify($data.radio5)),
    K: common_vendor.o(($event) => $data.radio5 = $event),
    L: common_vendor.p({
      selectedColor: "red",
      localdata: $data.sex1,
      modelValue: $data.radio5
    }),
    M: common_vendor.t(JSON.stringify($data.checkbox5)),
    N: common_vendor.o(($event) => $data.checkbox5 = $event),
    O: common_vendor.p({
      selectedColor: "red",
      multiple: true,
      localdata: $data.hobby2,
      modelValue: $data.checkbox5
    }),
    P: common_vendor.p({
      title: "自定义高亮颜色",
      subTitle: "使用 selectedColor 属性修改颜色",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
