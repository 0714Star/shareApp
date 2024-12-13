"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      active: 1,
      list1: [{
        title: "事件一"
      }, {
        title: "事件二"
      }, {
        title: "事件三"
      }, {
        title: "事件四"
      }],
      list2: [{
        title: "买家下单",
        desc: "2018-11-11"
      }, {
        title: "卖家发货",
        desc: "2018-11-12"
      }, {
        title: "买家签收",
        desc: "2018-11-13"
      }, {
        title: "交易完成",
        desc: "2018-11-14"
      }]
    };
  },
  methods: {
    change() {
      if (this.active < this.list1.length - 1) {
        this.active += 1;
      } else {
        this.active = 0;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_steps2 + _easycom_uni_section2)();
}
const _easycom_uni_steps = () => "../../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      options: $data.list1,
      active: $data.active
    }),
    b: common_vendor.p({
      title: "基本用法",
      type: "line",
      padding: true
    }),
    c: common_vendor.p({
      options: $data.list1,
      ["active-icon"]: "checkbox",
      active: $data.active
    }),
    d: common_vendor.p({
      title: "自定义图标",
      type: "line",
      padding: true
    }),
    e: common_vendor.p({
      options: $data.list1,
      ["active-icon"]: "medal",
      active: $data.active
    }),
    f: common_vendor.p({
      title: "自定义图标",
      type: "line",
      padding: true
    }),
    g: common_vendor.p({
      options: $data.list2,
      ["active-color"]: "#007AFF",
      active: $data.active,
      direction: "column"
    }),
    h: common_vendor.p({
      title: "纵向排列",
      type: "line",
      padding: true
    }),
    i: common_vendor.o((...args) => $options.change && $options.change(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
