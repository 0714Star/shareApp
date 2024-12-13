"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0
      }
    };
  },
  methods: {
    upper: function(e) {
      console.log(e);
    },
    lower: function(e) {
      console.log(e);
    },
    scroll: function(e) {
      console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
    },
    goTop: function(e) {
      this.scrollTop = this.old.scrollTop;
      this.$nextTick(function() {
        this.scrollTop = 0;
      });
      common_vendor.index.showToast({
        icon: "none",
        title: "纵向滚动 scrollTop 值已被修改为 0"
      });
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "scroll-view,区域滚动视图"
    }),
    b: $data.scrollTop,
    c: common_vendor.o((...args) => $options.upper && $options.upper(...args)),
    d: common_vendor.o((...args) => $options.lower && $options.lower(...args)),
    e: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    f: common_vendor.o((...args) => $options.goTop && $options.goTop(...args)),
    g: common_vendor.o((...args) => $options.scroll && $options.scroll(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
