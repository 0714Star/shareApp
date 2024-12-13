"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      current: 3,
      total: 10,
      pageSize: 10
    };
  },
  mounted() {
    setTimeout(() => {
      this.current = 5;
    }, 3e3);
  },
  methods: {
    add() {
      this.total += 10;
    },
    reset() {
      this.total = 0;
      this.current = 1;
    },
    change(e) {
      console.log(e);
      this.current = e.current;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_pagination2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_pagination + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      total: 50,
      title: "标题文字"
    }),
    c: common_vendor.p({
      title: "默认样式",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      total: 50,
      title: "标题文字",
      ["prev-text"]: "前一页",
      ["next-text"]: "后一页"
    }),
    e: common_vendor.p({
      title: "修改按钮文字",
      subTitle: "使用 prev-text / next-text 属性修改按钮文字",
      type: "line",
      padding: true
    }),
    f: common_vendor.p({
      ["show-icon"]: true,
      total: 50,
      title: "标题文字"
    }),
    g: common_vendor.p({
      title: "图标样式",
      subTitle: "使用 show-icon 属性显示图标按钮",
      type: "line",
      padding: true
    }),
    h: common_vendor.o($options.change),
    i: common_vendor.p({
      current: $data.current,
      total: $data.total,
      pageSize: 20,
      title: "标题文字",
      ["show-icon"]: true
    }),
    j: common_vendor.t($data.current),
    k: common_vendor.t($data.total),
    l: common_vendor.t($data.pageSize),
    m: common_vendor.o((...args) => $options.add && $options.add(...args)),
    n: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    o: common_vendor.p({
      title: "修改数据长度",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
