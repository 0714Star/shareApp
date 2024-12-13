"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      cover: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg",
      avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      }
    };
  },
  methods: {
    onClick(e) {
      console.log("执行click事件", e.data);
      common_vendor.index.showToast({
        title: "点击反馈"
      });
    },
    switchChange(e) {
      common_vendor.index.showToast({
        title: "change:" + e.value,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      title: "列表文字"
    }),
    c: common_vendor.p({
      title: "列表文字",
      rightText: "右侧文字"
    }),
    d: common_vendor.p({
      title: "列表文字",
      note: "列表描述信息",
      rightText: "右侧文字"
    }),
    e: common_vendor.p({
      title: "基础用法",
      type: "line"
    }),
    f: common_vendor.p({
      disabled: true,
      title: "列表禁用状态",
      rightText: "右侧文字"
    }),
    g: common_vendor.p({
      disabled: true,
      title: "列表禁用状态",
      rightText: "右侧文字"
    }),
    h: common_vendor.p({
      title: "禁用列表",
      type: "line"
    }),
    i: common_vendor.p({
      showArrow: true,
      title: "列表文字"
    }),
    j: common_vendor.p({
      showArrow: true,
      title: "列表文字",
      rightText: "右侧文字"
    }),
    k: common_vendor.p({
      title: "显示右侧箭头",
      type: "line"
    }),
    l: common_vendor.o($options.onClick),
    m: common_vendor.p({
      title: "弹窗提示",
      clickable: true
    }),
    n: common_vendor.o($options.onClick),
    o: common_vendor.p({
      title: "页面跳转",
      to: `./chat`
    }),
    p: common_vendor.o($options.onClick),
    q: common_vendor.p({
      title: "关闭当前页面打开新页面",
      showArrow: true,
      link: "redirectTo",
      to: "./chat"
    }),
    r: common_vendor.o($options.onClick),
    s: common_vendor.p({
      title: "打开错误页面(查看控制台)",
      showArrow: true,
      link: "redirectTo",
      to: "./chats"
    }),
    t: common_vendor.p({
      title: "开启点击反馈",
      type: "line"
    }),
    v: common_vendor.p({
      title: "列表文字"
    }),
    w: common_vendor.p({
      border: false,
      title: "列表文字",
      note: "列表描述信息",
      rightText: "右侧文字"
    }),
    x: common_vendor.p({
      border: false,
      title: "列表文字",
      note: "列表描述信息",
      rightText: "右侧文字"
    }),
    y: common_vendor.p({
      border: false
    }),
    z: common_vendor.p({
      title: "不显示分隔线",
      type: "line"
    }),
    A: common_vendor.p({
      title: "列表文字"
    }),
    B: common_vendor.p({
      title: "列表文字",
      note: "列表描述信息",
      rightText: "右侧文字"
    }),
    C: common_vendor.p({
      title: "列表文字",
      note: "列表描述信息",
      rightText: "右侧文字"
    }),
    D: common_vendor.p({
      ["border-full"]: true
    }),
    E: common_vendor.p({
      title: "分隔线通栏",
      type: "line"
    }),
    F: common_vendor.p({
      ellipsis: "1",
      title: "超长文字显示一行,以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字"
    }),
    G: common_vendor.p({
      ellipsis: "2",
      title: "超长文字显示二行,以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字",
      rightText: "二行显示"
    }),
    H: common_vendor.p({
      ellipsis: "1",
      title: "全部显示,以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字",
      note: "列表描述信息,下是测试文字,下是测试文字,下是测试文字,下是测试文字,下是测试文字,下是测试文字,下是测试文字",
      showArrow: true,
      rightText: "一行显示"
    }),
    I: common_vendor.p({
      title: "全部显示,以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字以下是测试文字",
      showArrow: true,
      rightText: "全部"
    }),
    J: common_vendor.p({
      title: "文字溢出隐藏",
      type: "line"
    }),
    K: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.extraIcon,
      title: "列表左侧带扩展图标"
    }),
    L: common_vendor.p({
      title: "列表左侧带略缩图",
      note: "列表描述信息",
      showArrow: true,
      thumb: "/static/c1.png",
      ["thumb-size"]: "sm",
      rightText: "小图"
    }),
    M: common_vendor.p({
      title: "列表左侧带略缩图",
      note: "列表描述信息",
      showArrow: true,
      thumb: "https://web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
      ["thumb-size"]: "base",
      rightText: "默认"
    }),
    N: common_vendor.p({
      title: "列表左侧带略缩图",
      note: "列表描述信息",
      showArrow: true,
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      ["thumb-size"]: "lg",
      rightText: "大图"
    }),
    O: common_vendor.p({
      title: "显示图标或图片",
      type: "line"
    }),
    P: common_assets._imports_0$10,
    Q: common_vendor.p({
      title: "自定义右侧插槽",
      note: "列表描述信息",
      link: true
    }),
    R: common_assets._imports_0$10,
    S: common_assets._imports_0$10,
    T: common_vendor.p({
      title: "使用插槽",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
