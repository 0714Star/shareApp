"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "underline",
  emits: ["change"],
  props: {
    active: Boolean,
    disabled: Boolean
  },
  components: {
    ToolbarTool
  },
  methods: {
    change() {
      this.$emit("change", {
        type: "underline",
        value: void 0
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_toolbarTool = common_vendor.resolveComponent("toolbarTool");
  (_easycom_uni_icons2 + _component_toolbarTool)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-underline",
      size: "24px"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "button",
      active: $props.active,
      disabled: $props.disabled,
      tooltip: {
        content: "下划线",
        key: ["Ctrl", "U"]
      }
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
