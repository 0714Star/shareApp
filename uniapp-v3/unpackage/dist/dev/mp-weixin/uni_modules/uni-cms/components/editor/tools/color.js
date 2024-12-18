"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const ColorPicker = () => "./color-picker.js";
const _sfc_main = {
  name: "color",
  emits: ["change"],
  props: {
    active: [Boolean, String, Array],
    disabled: Boolean
  },
  data() {
    return {
      lastColor: void 0
    };
  },
  components: {
    ColorPicker,
    ToolbarTool
  },
  methods: {
    change(e) {
      if (e && e.hasOwnProperty("color")) {
        this.lastColor = e.color;
      }
      this.$emit("change", {
        type: "color",
        value: e && e.color ? e.color : this.lastColor
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_color_picker = common_vendor.resolveComponent("color-picker");
  const _component_toolbarTool = common_vendor.resolveComponent("toolbarTool");
  (_easycom_uni_icons2 + _component_color_picker + _component_toolbarTool)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-color",
      size: "20px"
    }),
    b: $data.lastColor ? $data.lastColor : "#000000",
    c: common_vendor.w(({
      change
    }, s0, i0) => {
      return {
        a: common_vendor.o(change),
        b: "fe5bfd2b-2-" + i0 + ",fe5bfd2b-0",
        c: i0,
        d: s0
      };
    }, {
      name: "popup",
      path: "c",
      vueId: "fe5bfd2b-0"
    }),
    d: common_vendor.p({
      ["clear-color"]: "#000000"
    }),
    e: common_vendor.o($options.change),
    f: common_vendor.p({
      type: "dropdown",
      split: true,
      active: $props.active,
      disabled: $props.disabled,
      ["popup-style"]: "width: 250px;",
      tooltip: {
        content: "文字颜色"
      }
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fe5bfd2b"]]);
wx.createComponent(Component);
