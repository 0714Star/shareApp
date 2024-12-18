"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "tool-header",
  emits: ["change"],
  props: {
    active: [Boolean, Number],
    disabled: Boolean
  },
  data() {
    return {
      items: [
        {
          text: "H1",
          value: 1,
          active: false,
          style: {
            fontSize: "24px",
            fontWeight: "bold"
          }
        },
        {
          text: "H2",
          value: 2,
          active: false,
          style: {
            fontSize: "22px",
            fontWeight: "bold"
          }
        },
        {
          text: "H3",
          value: 3,
          active: false,
          style: {
            fontSize: "20px",
            fontWeight: "bold"
          }
        },
        {
          text: "H4",
          value: 4,
          active: false,
          style: {
            fontSize: "18px",
            fontWeight: "bold"
          }
        },
        {
          text: "H5",
          value: 5,
          active: false,
          style: {
            fontSize: "16px",
            fontWeight: "bold"
          }
        },
        {
          text: "H6",
          value: 6,
          active: false,
          style: {
            fontSize: "14px",
            fontWeight: "bold"
          }
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
    activeText() {
      const item = this.items.find((item2) => item2.active);
      if (item)
        return item.text;
      return this.items[0].text;
    }
  },
  components: {
    ToolbarTool
  },
  methods: {
    change(e) {
      this.$emit("change", {
        type: "header",
        value: e.value
      });
    }
  }
};
if (!Array) {
  const _component_toolbarTool = common_vendor.resolveComponent("toolbarTool");
  _component_toolbarTool();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.activeText),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "dropdown",
      items: $data.items,
      active: $props.active,
      disabled: $props.disabled,
      tooltip: {
        content: "标题"
      },
      ["popup-style"]: "width: 100px;"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
