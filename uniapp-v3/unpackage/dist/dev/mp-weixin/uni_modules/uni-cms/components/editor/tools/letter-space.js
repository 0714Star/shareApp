"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "letter-space",
  emits: ["change"],
  props: {
    active: [Boolean, String],
    disabled: Boolean
  },
  data() {
    return {
      items: [
        {
          text: "0",
          value: "0em",
          active: false
        },
        {
          text: "0.5",
          value: "0.5em",
          active: false
        },
        {
          text: "1",
          value: "1em",
          active: false
        },
        {
          text: "1.5",
          value: "1.5em",
          active: false
        },
        {
          text: "2",
          value: "2em",
          active: false
        }
      ]
    };
  },
  watch: {
    active(newValue) {
      const index = this.items.findIndex((item) => item.value === newValue);
      this.items.map((item, mIndex) => {
        this.items[mIndex].active = index === mIndex;
      });
    }
  },
  components: {
    ToolbarTool
  },
  methods: {
    change(e) {
      this.$emit("change", {
        type: "letterSpacing",
        value: e.value
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
      type: "icon-letter-space",
      size: "18px"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "dropdown",
      items: $data.items,
      active: $props.active,
      disabled: $props.disabled,
      ["default-val"]: "0em",
      tooltip: {
        content: "字间距"
      },
      ["popup-style"]: "width: 170px;"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
