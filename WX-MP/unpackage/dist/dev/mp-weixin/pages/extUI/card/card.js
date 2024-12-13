"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      cover: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
      avatar: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      }
    };
  },
  methods: {
    onClick(e) {
      console.log(e);
    },
    actionsClick(text) {
      common_vendor.index.showToast({
        title: text,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      ["is-shadow"]: false
    }),
    c: common_vendor.p({
      title: "基础卡片",
      type: "line"
    }),
    d: common_vendor.p({
      title: "基础卡片",
      extra: "额外信息"
    }),
    e: common_vendor.p({
      title: "卡片标题+额外信息",
      type: "line"
    }),
    f: common_vendor.o($options.onClick),
    g: common_vendor.p({
      title: "基础卡片",
      ["sub-title"]: "副标题",
      extra: "额外信息",
      thumbnail: $data.avatar
    }),
    h: common_vendor.p({
      title: "双标题卡片",
      type: "line"
    }),
    i: common_vendor.p({
      title: "基础卡片",
      isFull: true,
      ["sub-title"]: "副标题",
      extra: "额外信息",
      thumbnail: $data.avatar
    }),
    j: common_vendor.p({
      title: "通栏卡片",
      type: "line"
    }),
    k: common_vendor.p({
      type: "redo",
      size: "18",
      color: "#999"
    }),
    l: common_vendor.o(($event) => $options.actionsClick("分享")),
    m: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    n: common_vendor.o(($event) => $options.actionsClick("点赞")),
    o: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    p: common_vendor.o(($event) => $options.actionsClick("评论")),
    q: common_vendor.o($options.onClick),
    r: common_vendor.p({
      cover: $data.cover
    }),
    s: common_vendor.p({
      title: "卡片封面图+操作栏",
      type: "line"
    }),
    t: common_vendor.p({
      ["show-switch"]: true,
      title: "自定义标题"
    }),
    v: $data.cover,
    w: common_vendor.p({
      type: "redo",
      size: "18",
      color: "#999"
    }),
    x: common_vendor.o(($event) => $options.actionsClick("分享")),
    y: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    z: common_vendor.o(($event) => $options.actionsClick("点赞")),
    A: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    B: common_vendor.o(($event) => $options.actionsClick("评论")),
    C: common_vendor.p({
      title: "基础卡片",
      ["sub-title"]: "副标题",
      extra: "额外信息",
      padding: "10px 0",
      thumbnail: $data.avatar
    }),
    D: common_vendor.p({
      title: "自定义卡片内容",
      type: "line"
    }),
    E: $data.cover,
    F: common_vendor.p({
      title: "今日新闻",
      showArrow: true
    }),
    G: common_vendor.p({
      title: "今日新闻",
      showArrow: true
    }),
    H: common_vendor.p({
      type: "redo",
      size: "18",
      color: "#999"
    }),
    I: common_vendor.o(($event) => $options.actionsClick("分享")),
    J: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    K: common_vendor.o(($event) => $options.actionsClick("点赞")),
    L: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    M: common_vendor.o(($event) => $options.actionsClick("评论")),
    N: common_vendor.p({
      padding: "0",
      spacing: "0"
    }),
    O: common_vendor.p({
      title: "卡片+列表",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
