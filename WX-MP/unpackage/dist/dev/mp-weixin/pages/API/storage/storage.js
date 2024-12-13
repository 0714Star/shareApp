"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "get/set/clearStorage",
      key: "",
      data: ""
    };
  },
  methods: {
    keyChange: function(e) {
      this.key = e.detail.value;
    },
    dataChange: function(e) {
      this.data = e.detail.value;
    },
    getStorage: function() {
      var key = this.key;
      this.data;
      if (key.length === 0) {
        common_vendor.index.showModal({
          title: "读取数据失败",
          content: "key 不能为空",
          showCancel: false
        });
      } else {
        common_vendor.index.getStorage({
          key,
          success: (res) => {
            common_vendor.index.showModal({
              title: "读取数据成功",
              content: "data: '" + res.data + "'",
              showCancel: false
            });
          },
          fail: () => {
            common_vendor.index.showModal({
              title: "读取数据失败",
              content: "找不到 key 对应的数据",
              showCancel: false
            });
          }
        });
      }
    },
    setStorage: function() {
      var key = this.key;
      var data = this.data;
      if (key.length === 0) {
        common_vendor.index.showModal({
          title: "保存数据失败",
          content: "key 不能为空",
          showCancel: false
        });
      } else {
        common_vendor.index.setStorage({
          key,
          data,
          success: (res) => {
            common_vendor.index.showModal({
              title: "存储数据成功",
              content: JSON.stringify(res.errMsg),
              showCancel: false
            });
          },
          fail: () => {
            common_vendor.index.showModal({
              title: "储存数据失败!",
              showCancel: false
            });
          }
        });
      }
    },
    clearStorage: function() {
      common_vendor.index.clearStorageSync();
      this.key = "", this.data = "";
      common_vendor.index.showModal({
        title: "清除数据成功",
        content: " ",
        showCancel: false
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
    b: $data.key,
    c: common_vendor.o((...args) => $options.keyChange && $options.keyChange(...args)),
    d: $data.data,
    e: common_vendor.o((...args) => $options.dataChange && $options.dataChange(...args)),
    f: common_vendor.o((...args) => $options.setStorage && $options.setStorage(...args)),
    g: common_vendor.o((...args) => $options.getStorage && $options.getStorage(...args)),
    h: common_vendor.o((...args) => $options.clearStorage && $options.clearStorage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
