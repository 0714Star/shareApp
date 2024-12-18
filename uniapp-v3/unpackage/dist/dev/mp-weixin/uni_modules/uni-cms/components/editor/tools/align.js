"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "align",
  emits: ["change"],
  props: {
    active: [Boolean, String],
    disabled: Boolean
  },
  data() {
    return {
      items: [
        {
          icon: "icon-align-left",
          text: "左对齐",
          value: "left",
          active: false
        },
        {
          icon: "icon-align-center",
          text: "居中对齐",
          value: "center",
          active: false
        },
        {
          icon: "icon-align-right",
          text: "右对齐",
          value: "right",
          active: false
        },
        {
          icon: "icon-align-justify",
          text: "两端对齐",
          value: "justify",
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
  computed: {
    activeIcon() {
      const item = this.items.find((item2) => item2.active);
      if (item)
        return item.icon;
      return this.items[0].icon;
    }
  },
  components: {
    ToolbarTool
  },
  methods: {
    change(e) {
      this.$emit("change", {
        type: "align",
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
      type: $options.activeIcon,
      size: "24px"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "dropdown",
      items: $data.items,
      active: $props.active,
      disabled: $props.disabled,
      tooltip: {
        content: "对齐方式"
      },
      ["popup-style"]: "width: 170px;"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
