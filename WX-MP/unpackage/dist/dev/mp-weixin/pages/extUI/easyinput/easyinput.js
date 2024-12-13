"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: "",
      password: "",
      placeholderStyle: "color:#2979FF;font-size:14px",
      styles: {
        color: "#2979FF",
        borderColor: "#2979FF"
      }
    };
  },
  onLoad() {
  },
  onReady() {
  },
  methods: {
    input(e) {
      console.log("输入内容：", e);
    },
    iconClick(type) {
      common_vendor.index.showToast({
        title: `点击了${type === "prefix" ? "左侧" : "右侧"}的图标`,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.input),
    c: common_vendor.o(($event) => $data.value = $event),
    d: common_vendor.p({
      errorMessage: true,
      focus: true,
      placeholder: "请输入内容",
      modelValue: $data.value
    }),
    e: common_vendor.p({
      title: "默认",
      subTitle: "使用 focus 属性自动获取输入框焦点",
      type: "line",
      padding: true
    }),
    f: common_vendor.t('"' + $data.value + '"'),
    g: common_vendor.o($options.input),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      trim: "all",
      placeholder: "请输入内容",
      modelValue: $data.value
    }),
    j: common_vendor.p({
      title: "去除空格",
      subTitle: "使用 trim 属性 ,可以控制返回内容的空格 ",
      type: "line",
      padding: true
    }),
    k: common_vendor.o($options.input),
    l: common_vendor.o(($event) => $data.value = $event),
    m: common_vendor.p({
      styles: $data.styles,
      placeholderStyle: $data.placeholderStyle,
      placeholder: "请输入内容",
      modelValue: $data.value
    }),
    n: common_vendor.p({
      title: "自定义样式",
      subTitle: "使用 styles 属性 ,可以自定义输入框样式",
      type: "line",
      padding: true
    }),
    o: common_vendor.o($options.iconClick),
    p: common_vendor.o(($event) => $data.value = $event),
    q: common_vendor.p({
      prefixIcon: "search",
      placeholder: "左侧图标",
      modelValue: $data.value
    }),
    r: common_vendor.o($options.iconClick),
    s: common_vendor.o(($event) => $data.value = $event),
    t: common_vendor.p({
      suffixIcon: "search",
      placeholder: "右侧图标",
      modelValue: $data.value
    }),
    v: common_vendor.p({
      title: "图标",
      subTitle: "使用 prefixIcon / suffixIcon 属性 ,可以自定义输入框左右侧图标",
      type: "line",
      padding: true
    }),
    w: common_vendor.o(($event) => $data.value = $event),
    x: common_vendor.p({
      placeholder: "请输入网址",
      modelValue: $data.value
    }),
    y: common_vendor.o(($event) => $data.value = $event),
    z: common_vendor.p({
      prefixIcon: "search",
      placeholder: "想看什么,搜索一下",
      modelValue: $data.value
    }),
    A: common_vendor.p({
      title: "插槽",
      subTitle: "使用 prefixIcon / suffixIcon 插槽 ,可以自定义输入框左右侧内容",
      type: "line",
      padding: true
    }),
    B: common_vendor.p({
      disabled: true,
      value: "已禁用",
      placeholder: "请输入内容"
    }),
    C: common_vendor.p({
      title: "禁用",
      subTitle: "使用 disabled 属性禁用输入框",
      type: "line",
      padding: true
    }),
    D: common_vendor.o(($event) => $data.password = $event),
    E: common_vendor.p({
      type: "password",
      placeholder: "请输入密码",
      modelValue: $data.password
    }),
    F: common_vendor.p({
      title: "密码框",
      subTitle: "指定属性 type=password 使用密码框,右侧会显示眼睛图标",
      type: "line",
      padding: true
    }),
    G: common_vendor.o(($event) => $data.value = $event),
    H: common_vendor.p({
      type: "textarea",
      placeholder: "请输入内容",
      modelValue: $data.value
    }),
    I: common_vendor.p({
      title: "多行文本",
      subTitle: "指定属性 type=textarea 使用多行文本框",
      type: "line",
      padding: true
    }),
    J: common_vendor.o(($event) => $data.value = $event),
    K: common_vendor.p({
      type: "textarea",
      autoHeight: true,
      placeholder: "请输入内容",
      modelValue: $data.value
    }),
    L: common_vendor.p({
      title: "多行文本自动高度",
      subTitle: "使用属性 autoHeight 使多行文本框自动增高",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
