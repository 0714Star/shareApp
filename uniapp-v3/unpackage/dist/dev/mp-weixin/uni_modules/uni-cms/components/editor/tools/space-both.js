"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "space-both",
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
          value: "0px",
          active: false
        },
        {
          text: "8",
          value: "8px",
          active: false
        },
        {
          text: "16",
          value: "16px",
          active: false
        },
        {
          text: "32",
          value: "32px",
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
        type: "space-both",
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
      type: "icon-space-both",
      size: "18px"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "dropdown",
      items: $data.items,
      active: $props.active,
      disabled: $props.disabled,
      ["popup-style"]: "width: 170px;",
      tooltip: {
        content: "两端缩进"
      }
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
