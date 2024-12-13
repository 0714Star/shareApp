"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      value: ["0"],
      accordionVal: "1",
      content: "折叠内容主体，可自定义内容及样式，点击按钮修改内容使高度发生变化。",
      extraIcon: {
        color: "#4cd964",
        size: "26",
        type: "image"
      }
    };
  },
  methods: {
    add() {
      if (this.content.length > 35) {
        this.content = "折叠内容主体，可自定义内容及样式，点击按钮修改内容使高度发生变化。";
      } else {
        this.content = "折叠内容主体，这是一段比较长内容。通过点击按钮修改后内容后，使组件高度发生变化，在次点击按钮恢复之前的内容和高度。";
      }
      this.$nextTick(() => {
        this.$refs.collapse.resize();
      });
    },
    onClick(e) {
      common_vendor.index.showToast({
        title: "列表被点击"
      });
    },
    change(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_card2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.t($data.content),
    c: common_vendor.p({
      title: "默认开启"
    }),
    d: common_vendor.p({
      title: "折叠内容"
    }),
    e: common_vendor.p({
      title: "禁用状态",
      disabled: true
    }),
    f: common_vendor.sr("collapse", "680c1cc4-2,680c1cc4-1"),
    g: common_vendor.o($options.change),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      modelValue: $data.value
    }),
    j: common_vendor.p({
      title: "基础用法",
      type: "line"
    }),
    k: common_vendor.o((...args) => $options.add && $options.add(...args)),
    l: common_vendor.p({
      title: "使用动画",
      ["show-animation"]: true
    }),
    m: common_vendor.p({
      title: "不使用动画",
      ["show-animation"]: false
    }),
    n: common_vendor.p({
      title: "使用动画效果",
      type: "line"
    }),
    o: common_vendor.p({
      title: "手风琴效果"
    }),
    p: common_vendor.p({
      title: "手风琴效果"
    }),
    q: common_vendor.p({
      title: "手风琴效果"
    }),
    r: common_vendor.o($options.change),
    s: common_vendor.o(($event) => $data.accordionVal = $event),
    t: common_vendor.p({
      accordion: true,
      modelValue: $data.accordionVal
    }),
    v: common_vendor.p({
      title: "手风琴效果（只会保留一个的打开状态）",
      type: "line"
    }),
    w: common_vendor.p({
      title: "标题文字",
      thumb: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
    }),
    x: common_vendor.p({
      title: "标题文字",
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }),
    y: common_vendor.p({
      title: "配置图片",
      type: "line"
    }),
    z: common_vendor.p({
      title: "标题使用自定义标题插槽",
      ["show-extra-icon"]: true,
      ["extra-icon"]: $data.extraIcon
    }),
    A: common_vendor.p({
      titleBorder: "none"
    }),
    B: common_vendor.p({
      title: "列表文字"
    }),
    C: common_vendor.p({
      disabled: true,
      title: "列表文字",
      note: "列表禁用状态"
    }),
    D: common_vendor.p({
      title: "列表右侧显示 switch",
      ["show-switch"]: true
    }),
    E: common_vendor.p({
      ["show-extra-icon"]: true,
      ["extra-icon"]: $data.extraIcon,
      title: "列表左侧带扩展图标"
    }),
    F: common_vendor.p({
      title: "列表左侧带略缩图",
      note: "列表描述信息",
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      ["thumb-size"]: "lg",
      rightText: "右侧文字",
      showArrow: true
    }),
    G: common_vendor.o($options.onClick),
    H: common_vendor.p({
      title: "开启点击反馈",
      clickable: true,
      showArrow: true
    }),
    I: common_vendor.p({
      title: "折叠内容使用 uni-list 组件"
    }),
    J: common_vendor.p({
      title: "使用插槽",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
