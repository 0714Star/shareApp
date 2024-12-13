"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: 0,
      range: [
        {
          "value": 0,
          "text": "篮球",
          "disable": true
        },
        {
          "value": 1,
          "text": "足球"
        },
        {
          "value": 2,
          "text": "游泳"
        }
      ]
    };
  },
  methods: {
    change(e) {
      console.log("e:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_select2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_select + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.o(($event) => $data.value = $event),
    d: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    }),
    e: common_vendor.p({
      title: "本地数据",
      type: "line"
    }),
    f: common_vendor.o(($event) => $data.value = $event),
    g: common_vendor.p({
      disabled: true,
      localdata: $data.range,
      modelValue: $data.value
    }),
    h: common_vendor.p({
      title: "禁用状态",
      type: "line"
    }),
    i: common_vendor.o($options.change),
    j: common_vendor.o(($event) => $data.value = $event),
    k: common_vendor.p({
      localdata: $data.range,
      clear: false,
      modelValue: $data.value
    }),
    l: common_vendor.p({
      title: "是否可清除已选项",
      type: "line"
    }),
    m: common_vendor.o($options.change),
    n: common_vendor.o(($event) => $data.value = $event),
    o: common_vendor.p({
      localdata: $data.range,
      label: "应用选择",
      modelValue: $data.value
    }),
    p: common_vendor.p({
      title: "配置左侧标题",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
