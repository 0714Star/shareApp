"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "onAccelerometerChange",
      value: ""
    };
  },
  onUnload() {
    common_vendor.index.stopAccelerometer();
  },
  methods: {
    watchAcce() {
      common_vendor.index.onAccelerometerChange((res) => {
        this.value = "监听设备的加速度变化:\nX轴：" + res.x.toFixed(2) + "\nY轴：" + res.y.toFixed(2) + "\nZ轴：" + res.z.toFixed(2);
      });
    },
    stopAcce() {
      common_vendor.index.stopAccelerometer();
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
    b: common_vendor.o((...args) => $options.watchAcce && $options.watchAcce(...args)),
    c: common_vendor.o((...args) => $options.stopAcce && $options.stopAcce(...args)),
    d: $data.value
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
