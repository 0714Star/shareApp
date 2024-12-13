"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      type: "default",
      inverted: false
    };
  },
  methods: {
    setType() {
      let types = ["default", "primary", "success", "warning", "error"];
      let index = types.indexOf(this.type);
      types.splice(index, 1);
      let randomIndex = Math.floor(Math.random() * 4);
      this.type = types[randomIndex];
    },
    setInverted() {
      this.inverted = !this.inverted;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_tag2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_tag + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.p({
      text: "标签",
      type: "primary"
    }),
    c: common_vendor.p({
      text: "标签",
      type: "success"
    }),
    d: common_vendor.p({
      text: "标签",
      type: "warning"
    }),
    e: common_vendor.p({
      text: "标签",
      type: "error"
    }),
    f: common_vendor.p({
      text: "标签"
    }),
    g: common_vendor.p({
      title: "实心标签",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      inverted: true,
      text: "标签",
      type: "primary"
    }),
    i: common_vendor.p({
      inverted: true,
      text: "标签",
      type: "success"
    }),
    j: common_vendor.p({
      inverted: true,
      text: "标签",
      type: "warning"
    }),
    k: common_vendor.p({
      inverted: true,
      text: "标签",
      type: "error"
    }),
    l: common_vendor.p({
      inverted: true,
      text: "标签"
    }),
    m: common_vendor.p({
      title: "空心标签",
      subTitle: "使用 inverted 属性显示空心表签",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      text: "标签",
      type: "primary",
      size: "normal"
    }),
    o: common_vendor.p({
      text: "标签",
      type: "primary",
      size: "small"
    }),
    p: common_vendor.p({
      text: "标签",
      type: "primary",
      size: "mini"
    }),
    q: common_vendor.p({
      title: "标签尺寸",
      subTitle: "使用 size 属性控制标签大小",
      type: "line",
      padding: true
    }),
    r: common_vendor.p({
      circle: true,
      text: "标签",
      type: "primary"
    }),
    s: common_vendor.p({
      circle: true,
      text: "标签",
      type: "primary",
      size: "small"
    }),
    t: common_vendor.p({
      circle: true,
      text: "标签",
      type: "primary",
      size: "mini"
    }),
    v: common_vendor.p({
      title: "圆角样式",
      subTitle: "使用 circle 属性控制标签圆角",
      type: "line",
      padding: true
    }),
    w: common_vendor.p({
      mark: true,
      text: "标签",
      type: "primary",
      size: "default"
    }),
    x: common_vendor.p({
      mark: true,
      text: "标签",
      type: "primary",
      size: "small"
    }),
    y: common_vendor.p({
      mark: true,
      text: "标签",
      type: "primary",
      size: "mini"
    }),
    z: common_vendor.p({
      title: "标记样式",
      subTitle: "使用 mark 属性显示标记样式",
      type: "line",
      padding: true
    }),
    A: common_vendor.p({
      disabled: true,
      text: "标签",
      type: "primary"
    }),
    B: common_vendor.p({
      title: "不可点击状态",
      subTitle: "使用 disabled 属性 显示禁用样式",
      type: "line",
      padding: true
    }),
    C: common_vendor.p({
      text: "自定义标签样式",
      ["custom-style"]: "background-color: #4335d6; border-color: #4335d6; color: #fff;"
    }),
    D: common_vendor.p({
      title: "自定义样式",
      subTitle: "使用 custom-style 属性自定义样式",
      type: "line",
      padding: true
    }),
    E: common_vendor.o($options.setType),
    F: common_vendor.p({
      type: $data.type,
      text: "标签"
    }),
    G: common_vendor.o($options.setInverted),
    H: common_vendor.p({
      circle: true,
      inverted: $data.inverted,
      text: "标签",
      type: "primary"
    }),
    I: common_vendor.p({
      title: "点击事件",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
