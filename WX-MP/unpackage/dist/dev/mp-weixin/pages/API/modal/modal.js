"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "modal",
      modalHidden: true,
      modalHidden2: true
    };
  },
  methods: {
    modalTap: function(e) {
      common_vendor.index.showModal({
        title: "弹窗标题",
        content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
        showCancel: false,
        confirmText: "确定"
      });
    },
    noTitlemodalTap: function(e) {
      common_vendor.index.showModal({
        content: "弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内",
        confirmText: "确定",
        cancelText: "取消"
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
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.modalTap && $options.modalTap(...args)),
    c: common_vendor.o((...args) => $options.noTitlemodalTap && $options.noTitlemodalTap(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
