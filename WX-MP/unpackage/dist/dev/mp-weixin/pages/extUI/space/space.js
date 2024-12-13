"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      paddingClass: "uni-pa-5",
      marginClass: "uni-ma-5",
      formData: {
        margin: ["t", "r", "l", "b"],
        marginSize: "5",
        padding: ["t", "r", "l", "b"],
        paddingSize: "5"
      },
      directionData: [{
        value: "t",
        text: "上"
      }, {
        value: "r",
        text: "右"
      }, {
        value: "b",
        text: "下"
      }, {
        value: "l",
        text: "左"
      }],
      sizeData: [{
        value: "0",
        text: "0"
      }, {
        value: "2",
        text: "4px"
      }, {
        value: "5",
        text: "10px"
      }, {
        value: "10",
        text: "20px"
      }]
    };
  },
  onLoad() {
  },
  methods: {
    change(e, type) {
      let {
        margin,
        marginSize,
        padding,
        paddingSize
      } = this.formData;
      this.marginClass = "";
      this.paddingClass = "";
      margin.forEach((v) => {
        this.marginClass += `uni-m${v}-${marginSize} `;
      });
      padding.forEach((v) => {
        this.marginClass += `uni-p${v}-${paddingSize} `;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_checkbox2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_checkbox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.n($data.paddingClass),
    c: common_vendor.n($data.marginClass),
    d: common_vendor.o(($event) => $options.change($event, 1)),
    e: common_vendor.o(($event) => $data.formData.margin = $event),
    f: common_vendor.p({
      multiple: true,
      localdata: $data.directionData,
      modelValue: $data.formData.margin
    }),
    g: common_vendor.o(($event) => $options.change($event, 1)),
    h: common_vendor.o(($event) => $data.formData.marginSize = $event),
    i: common_vendor.p({
      localdata: $data.sizeData,
      modelValue: $data.formData.marginSize
    }),
    j: common_vendor.o(($event) => $options.change($event, 2)),
    k: common_vendor.o(($event) => $data.formData.padding = $event),
    l: common_vendor.p({
      multiple: true,
      localdata: $data.directionData,
      modelValue: $data.formData.padding
    }),
    m: common_vendor.o(($event) => $options.change($event, 3)),
    n: common_vendor.o(($event) => $data.formData.paddingSize = $event),
    o: common_vendor.p({
      localdata: $data.sizeData,
      modelValue: $data.formData.paddingSize
    }),
    p: common_vendor.p({
      title: "效果展示",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
