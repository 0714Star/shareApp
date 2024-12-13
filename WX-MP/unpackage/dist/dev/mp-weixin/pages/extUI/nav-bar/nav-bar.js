"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      city: "北京"
    };
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    showMenu() {
      common_vendor.index.showToast({
        title: "菜单"
      });
    },
    clickLeft() {
      common_vendor.index.showToast({
        title: "左侧按钮"
      });
    },
    search() {
      common_vendor.index.showToast({
        title: "搜索"
      });
    },
    showCity() {
      common_vendor.index.showToast({
        title: "选择城市"
      });
    },
    scan() {
      common_vendor.index.showToast({
        title: "扫码"
      });
    },
    confirm() {
      common_vendor.index.showToast({
        title: "搜索"
      });
    }
  },
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
      console.log("stopPullDownRefresh");
    }, 1e3);
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_nav_bar2 + _easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_icons2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_card + _easycom_uni_section + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.back),
    b: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#007AFF",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "返回",
      title: "自定义导航栏"
    }),
    c: common_vendor.p({
      ["is-full"]: true,
      isShadow: false
    }),
    d: common_vendor.p({
      title: "标题"
    }),
    e: common_vendor.p({
      title: "基本用法",
      subTitle: "使用 title 属性设置导航栏标题",
      type: "line"
    }),
    f: common_vendor.o($options.back),
    g: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      title: "开启阴影"
    }),
    h: common_vendor.p({
      title: "开启阴影",
      subTitle: "使用 shadow 属性启用阴影",
      type: "line"
    }),
    i: common_vendor.o($options.back),
    j: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      dark: true,
      title: "暗黑模式"
    }),
    k: common_vendor.p({
      title: "开启暗黑模式",
      subTitle: "使用 dark 属性设置暗黑模式",
      type: "line"
    }),
    l: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      ["right-icon"]: "cart",
      title: "标题"
    }),
    m: common_vendor.p({
      title: "带返回箭头+右侧图标",
      subTitle: "使用 left-icon/right-icon 设置左右图标",
      type: "line"
    }),
    n: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      leftText: "返回",
      rightText: "设置",
      title: "标题"
    }),
    o: common_vendor.p({
      title: "左侧文字+右侧文字",
      subTitle: "使用 left-text/right-text 设置左右文字",
      type: "line"
    }),
    p: common_vendor.p({
      dark: true,
      color: "#999",
      backgroundColor: "#f5f5f5",
      shadow: true,
      ["left-icon"]: "left",
      leftText: "返回",
      rightText: "设置",
      title: "自定义颜色"
    }),
    q: common_vendor.p({
      title: "自定义颜色",
      subTitle: "使用 color/background-color 属性设置前景背景色",
      type: "line"
    }),
    r: common_vendor.p({
      height: "65px",
      dark: true,
      shadow: true,
      ["left-icon"]: "left",
      leftText: "返回",
      rightText: "设置",
      title: "自定义高度"
    }),
    s: common_vendor.p({
      title: "自定义高度",
      subTitle: "使用 height 修改组件高度",
      type: "line"
    }),
    t: common_vendor.t($data.city),
    v: common_vendor.p({
      type: "arrowdown",
      color: "#666",
      size: "18"
    }),
    w: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    x: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    y: common_vendor.p({
      title: "自定义内容",
      subTitle: "使用 left/right/default 插槽自定义内容",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
