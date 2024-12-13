"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "action-sheet",
      buttonRect: {}
    };
  },
  methods: {
    actionSheetTap() {
      const that = this;
      common_vendor.index.showActionSheet({
        title: "标题",
        itemList: ["item1", "item2", "item3", "item4"],
        popover: {
          // 104: navbar + topwindow 高度，暂时 fix createSelectorQuery 在 pc 上获取 top 不准确的 bug
          top: that.buttonRect.top + 104 + that.buttonRect.height,
          left: that.buttonRect.left + that.buttonRect.width / 2
        },
        success: (e) => {
          console.log(e.tapIndex);
          common_vendor.index.showToast({
            title: "点击了第" + e.tapIndex + "个选项",
            icon: "none"
          });
        }
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
    b: common_vendor.o((...args) => $options.actionSheetTap && $options.actionSheetTap(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
