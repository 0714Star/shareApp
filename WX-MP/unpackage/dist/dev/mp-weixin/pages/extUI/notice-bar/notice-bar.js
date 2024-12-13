"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  },
  created() {
  },
  methods: {
    getMore() {
      common_vendor.index.showToast({
        title: "点击查看更多",
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_notice_bar2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_notice_bar = () => "../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_notice_bar + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      text: "uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
    }),
    c: common_vendor.p({
      title: "多行显示",
      type: "line"
    }),
    d: common_vendor.p({
      single: true,
      text: "uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
    }),
    e: common_vendor.p({
      title: "单行显示",
      subTitle: "使用 single 属性单行显示通知",
      type: "line"
    }),
    f: common_vendor.p({
      ["show-icon"]: true,
      text: "uni-app发布，开发一次、7端覆盖！"
    }),
    g: common_vendor.p({
      title: "显示图标",
      subTitle: "使用 show-icon 属性显示左侧小喇叭图标",
      type: "line"
    }),
    h: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      text: "uni-app 版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
    }),
    i: common_vendor.p({
      title: "文字滚动",
      subTitle: "使用 scrollable 属性使通告滚动,此时 single 属性将失效,始终单行显示",
      type: "line"
    }),
    j: common_vendor.o($options.getMore),
    k: common_vendor.p({
      ["show-get-more"]: true,
      ["show-icon"]: true,
      text: "年末大礼：uni-app1.4 新增百度、支付宝小程序。插件市场重磅上线！"
    }),
    l: common_vendor.o($options.getMore),
    m: common_vendor.p({
      ["show-get-more"]: true,
      ["show-icon"]: true,
      ["more-text"]: "查看更多",
      text: "年末大礼：uni-app1.4 新增百度、支付宝小程序。插件市场重磅上线！"
    }),
    n: common_vendor.p({
      title: "查看更多",
      subTitle: "使用 show-get-more 显示更多,此时 single 属性将失效,始终单行显示,如不配置 more-text 属性 ,将显示箭头图标",
      type: "line"
    }),
    o: common_vendor.p({
      single: true,
      color: "#2979FF",
      ["background-color"]: "#EAF2FF",
      text: "uni-app 1.6版正式发布，开发一次，同时发布iOS、Android、H5、微信小程序、支付宝小程序、百度小程序、头条小程序等7大平台。"
    }),
    p: common_vendor.p({
      title: "修改颜色",
      type: "line"
    }),
    q: common_vendor.p({
      ["show-close"]: true,
      single: true,
      text: "HBuilderX 1.0正式发布！uni-app实现里程碑突破实现里程碑突破！"
    }),
    r: common_vendor.p({
      title: "关闭按钮",
      subTitle: "使用 show-close 属性,可关闭通知",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
