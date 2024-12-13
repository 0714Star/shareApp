"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      status: "more",
      statusTypes: [{
        value: "more",
        text: "加载前",
        checked: true
      }, {
        value: "loading",
        text: "加载中",
        checked: false
      }, {
        value: "noMore",
        text: "没有更多",
        checked: false
      }],
      contentText: {
        contentdown: "查看更多",
        contentrefresh: "加载中",
        contentnomore: "没有更多"
      }
    };
  },
  methods: {
    onChange(e) {
      this.status = e.detail.value;
    },
    clickLoadMore(e) {
      common_vendor.index.showToast({
        icon: "none",
        title: "当前状态：" + e.detail.status
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_load_more2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_load_more + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      status: $data.status
    }),
    c: common_vendor.p({
      title: "基本用法",
      type: "line"
    }),
    d: common_vendor.p({
      status: $data.status,
      ["content-text"]: $data.contentText
    }),
    e: common_vendor.p({
      title: "修改默认文字",
      type: "line"
    }),
    f: common_vendor.p({
      color: "#007AFF",
      status: $data.status
    }),
    g: common_vendor.p({
      title: "改变颜色",
      type: "line"
    }),
    h: common_vendor.p({
      iconType: "auto",
      status: $data.status
    }),
    i: common_vendor.p({
      title: "指定加载图标样式 - 按平台自动选择样式",
      type: "line"
    }),
    j: common_vendor.p({
      iconType: "circle",
      status: $data.status
    }),
    k: common_vendor.p({
      title: "指定加载图标样式 - 环形",
      type: "line"
    }),
    l: common_vendor.f($data.statusTypes, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.value,
        c: item.checked,
        d: index
      };
    }),
    m: common_vendor.o((...args) => $options.onChange && $options.onChange(...args)),
    n: common_vendor.p({
      title: "改变组件状态",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
