"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "get/setClipboardData",
      data: ""
    };
  },
  methods: {
    dataChange: function(e) {
      this.data = e.detail.value;
    },
    getClipboard: function() {
      common_vendor.index.getClipboardData({
        success: (res) => {
          console.log(res.data);
          const content = res.data ? "剪贴板内容为:" + res.data : "剪贴板暂无内容";
          common_vendor.index.showModal({
            content,
            title: "读取剪贴板",
            showCancel: false
          });
        },
        fail: () => {
          common_vendor.index.showModal({
            content: "读取剪贴板失败!",
            showCancel: false
          });
        }
      });
    },
    setClipboard: function() {
      var data = this.data;
      if (data.length === 0) {
        common_vendor.index.showModal({
          title: "设置剪贴板失败",
          content: "内容不能为空",
          showCancel: false
        });
      } else {
        common_vendor.index.setClipboardData({
          data,
          success: () => {
          },
          fail: () => {
          }
        });
      }
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
    b: $data.data,
    c: common_vendor.o((...args) => $options.dataChange && $options.dataChange(...args)),
    d: common_vendor.o((...args) => $options.setClipboard && $options.setClipboard(...args)),
    e: common_vendor.o((...args) => $options.getClipboard && $options.getClipboard(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
