"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "text",
      texts: [
        "HBuilder，400万开发者选择的IDE",
        "MUI，轻巧、漂亮的前端开源框架",
        "wap2app，M站快速转换原生体验的App",
        "5+Runtime，为HTML5插上原生的翅膀",
        "HBuilderX，轻巧、极速，极客编辑器",
        "uni-app，终极跨平台方案",
        "HBuilder，400万开发者选择的IDE",
        "MUI，轻巧、漂亮的前端开源框架",
        "wap2app，M站快速转换原生体验的App",
        "5+Runtime，为HTML5插上原生的翅膀",
        "HBuilderX，轻巧、极速，极客编辑器",
        "uni-app，终极跨平台方案",
        "......"
      ],
      text: "",
      canAdd: true,
      canRemove: false,
      extraLine: []
    };
  },
  methods: {
    add: function(e) {
      this.extraLine.push(this.texts[this.extraLine.length % 12]);
      this.text = this.extraLine.join("\n");
      this.canAdd = this.extraLine.length < 12;
      this.canRemove = this.extraLine.length > 0;
    },
    remove: function(e) {
      if (this.extraLine.length > 0) {
        this.extraLine.pop();
        this.text = this.extraLine.join("\n");
        this.canAdd = this.extraLine.length < 12;
        this.canRemove = this.extraLine.length > 0;
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
    b: common_vendor.t($data.text),
    c: !$data.canAdd,
    d: common_vendor.o((...args) => $options.add && $options.add(...args)),
    e: !$data.canRemove,
    f: common_vendor.o((...args) => $options.remove && $options.remove(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
