"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      radiusClass: "uni-radius-lg",
      formData: {
        direction: ["t", "b"],
        size: "lg"
      },
      directionData: [{
        value: "t",
        text: "左上+右上"
      }, {
        value: "r",
        text: "右上+右下"
      }, {
        value: "b",
        text: "左下+右下"
      }, {
        value: "l",
        text: "右上+左下"
      }, {
        value: "tl",
        text: "左上"
      }, {
        value: "tr",
        text: "右上"
      }, {
        value: "bl",
        text: "左下"
      }, {
        value: "br",
        text: "右下"
      }],
      sizeData: [{
        value: "0",
        text: "无"
      }, {
        value: "sm",
        text: "小"
      }, {
        value: "lg",
        text: "常规"
      }, {
        value: "xl",
        text: "大"
      }, {
        value: "circle",
        text: "圆"
      }, {
        value: "pill",
        text: "最大化"
      }]
    };
  },
  onLoad() {
  },
  methods: {
    change(e, type) {
      let {
        direction,
        size
      } = this.formData;
      this.radiusClass = "";
      direction.forEach((v) => {
        this.radiusClass += `uni-radius-${v}-${size} `;
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
    b: common_vendor.n($data.radiusClass),
    c: common_vendor.o(($event) => $options.change($event, 1)),
    d: common_vendor.o(($event) => $data.formData.direction = $event),
    e: common_vendor.p({
      multiple: true,
      localdata: $data.directionData,
      modelValue: $data.formData.direction
    }),
    f: common_vendor.o(($event) => $options.change($event, 2)),
    g: common_vendor.o(($event) => $data.formData.size = $event),
    h: common_vendor.p({
      localdata: $data.sizeData,
      modelValue: $data.formData.size
    }),
    i: common_vendor.p({
      title: "效果展示",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
