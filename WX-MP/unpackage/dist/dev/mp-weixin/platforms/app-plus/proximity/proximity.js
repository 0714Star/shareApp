"use strict";
const common_vendor = require("../../../common/vendor.js");
var id = null;
var bright = null;
const _sfc_main = {
  data() {
    return {
      title: "proximity",
      value: ""
    };
  },
  methods: {
    getProximity: function() {
      var that = this;
      plus.proximity.getCurrentProximity(function(d) {
        that.value = "距离为：" + d;
      }, function(e) {
        that.value = "获取失败:" + e.message;
      });
    },
    watchProximity: function() {
      var that = this;
      if (id) {
        return;
      }
      bright = plus.screen.getBrightness();
      id = plus.proximity.watchProximity(function(d) {
        that.value = "距离变化：" + d;
        plus.screen.setBrightness(d < 1 ? 0.01 : bright);
      }, function(e) {
        plus.proximity.clearWatch(id);
        id = null;
        that.value = "监听失败:" + e.message;
      });
    },
    watchStop: function() {
      var that = this;
      if (id) {
        that.value = "停止监听设备距离传感器信息";
        plus.proximity.clearWatch(id);
        id = null;
      } else {
        that.value = "没有监听设备距离传感器";
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
    b: common_vendor.o((...args) => $options.getProximity && $options.getProximity(...args)),
    c: common_vendor.o((...args) => $options.watchProximity && $options.watchProximity(...args)),
    d: common_vendor.o((...args) => $options.watchStop && $options.watchStop(...args)),
    e: $data.value
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
