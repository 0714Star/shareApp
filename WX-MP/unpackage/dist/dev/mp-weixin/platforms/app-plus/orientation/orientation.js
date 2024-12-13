"use strict";
const common_vendor = require("../../../common/vendor.js");
var id = null;
const _sfc_main = {
  data() {
    return {
      title: "orientation",
      value: ""
    };
  },
  onUnload() {
    this.watchStop();
  },
  methods: {
    getOrient: function() {
      var that = this;
      plus.orientation.getCurrentOrientation(function(o) {
        that.value = "alpha：" + o.alpha + "\nbeta：" + o.beta + "\ngamma：" + o.gamma;
      }, function(e) {
        console.log("获取失败:" + e.message);
      });
    },
    watchOrient: function() {
      var that = this;
      if (id) {
        return;
      }
      id = plus.orientation.watchOrientation(function(o) {
        that.value = "监听设备方向变化信息\nalpha：" + o.alpha + "\nbeta：" + o.beta + "\ngamma：" + o.gamma;
      }, function(e) {
        plus.orientation.clearWatch(id);
        id = null;
        console.log("监听失败:" + e.message);
      });
    },
    watchStop: function() {
      if (id) {
        plus.orientation.clearWatch(id);
        id = null;
      } else {
        console.log("没有监听设备方向变化");
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
    b: common_vendor.o((...args) => $options.getOrient && $options.getOrient(...args)),
    c: common_vendor.o((...args) => $options.watchOrient && $options.watchOrient(...args)),
    d: common_vendor.o((...args) => $options.watchStop && $options.watchStop(...args)),
    e: $data.value
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
