"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "toolbar-tool-base",
  emits: ["change"],
  props: {
    type: {
      type: String,
      default() {
        return "button";
      }
    },
    split: Boolean,
    disabled: Boolean,
    active: [Boolean, String, Number, Array],
    defaultVal: [Boolean, String, Number, Array],
    items: Array,
    popupStyle: String,
    tooltip: {
      type: Object,
      default() {
        return {
          key: "",
          content: ""
        };
      }
    }
  },
  data() {
    return {
      showPopup: false,
      slotData: {}
    };
  },
  computed: {
    popupItems() {
      if (!this.items)
        return [];
      const activeItems = this.items.filter((item) => item.active);
      if (activeItems.length) {
        return this.items;
      } else {
        return this.items.map((item) => {
          if (item.value === this.defaultVal) {
            item.active = true;
          }
          return item;
        });
      }
    }
  },
  mounted() {
    if (this.$refs.editorToolbarTool) {
      this.$refs.editorToolbarTool.$el && this.$refs.editorToolbarTool.$el.addEventListener("mousedown", this.mousedownPreventDefault, { passive: false });
    }
  },
  unmounted() {
    if (this.$refs.editorToolbarTool) {
      this.$refs.editorToolbarTool.$el && this.$refs.editorToolbarTool.$el.removeEventListener("mousedown", this.mousedownPreventDefault, { passive: false });
    }
  },
  methods: {
    mousedownPreventDefault(e) {
      e.preventDefault();
    },
    hide(e) {
      if (this.$refs.main && !this.$refs.main.$el.contains(e.target)) {
        this.showPopup = false;
      }
    },
    click(e) {
      const { type } = e.target.dataset;
      if (!this.disabled) {
        if (this.items && this.items.length || type === "drop") {
          this.dropdownClick();
        } else {
          this.buttonClick();
        }
      }
    },
    buttonClick() {
      this.$emit("change");
    },
    dropdownClick() {
      this.showPopup = !this.showPopup;
    },
    change(e) {
      this.slotData = e;
      this.$emit("change", e);
      this.showPopup = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  (_easycom_uni_icons2 + _easycom_uni_tooltip2 + _easycom_uni_transition2)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tooltip = () => "../../../../uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_transition = () => "../../../../uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_tooltip + _easycom_uni_transition)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.type === "button"
  }, $props.type === "button" ? {} : $props.type === "dropdown" ? common_vendor.e({
    c: $props.split
  }, $props.split ? {
    d: common_vendor.r("d", {
      select: $data.slotData
    }),
    e: common_vendor.p({
      type: "bottom",
      size: "15"
    })
  } : {
    f: common_vendor.r("d", {
      select: $data.slotData
    }),
    g: common_vendor.p({
      type: "bottom",
      size: "15"
    })
  }) : {}, {
    b: $props.type === "dropdown",
    h: $props.disabled ? 1 : "",
    i: $props.active ? 1 : "",
    j: $props.type,
    k: $props.split ? 1 : "",
    l: common_vendor.o((...args) => $options.click && $options.click(...args)),
    m: $props.tooltip.content
  }, $props.tooltip.content ? common_vendor.e({
    n: common_vendor.t($props.tooltip.content),
    o: $props.tooltip.key
  }, $props.tooltip.key ? {
    p: common_vendor.t($props.tooltip.key.join("+"))
  } : {}) : {}, {
    q: common_vendor.f($options.popupItems, (item, k0, i0) => {
      return common_vendor.e({
        a: item.icon
      }, item.icon ? {
        b: common_vendor.s(item.iconStyle),
        c: "103d7a03-4-" + i0 + ",103d7a03-3",
        d: common_vendor.p({
          ["custom-prefix"]: "editor-icon",
          type: item.icon,
          size: "24px"
        })
      } : {}, {
        e: common_vendor.t(item.text),
        f: common_vendor.s(item.style),
        g: $props.defaultVal && item.value === $props.defaultVal
      }, $props.defaultVal && item.value === $props.defaultVal ? {} : {}, {
        h: item.active
      }, item.active ? {
        i: "103d7a03-5-" + i0 + ",103d7a03-3",
        j: common_vendor.p({
          type: "checkmarkempty",
          size: "18",
          color: "#666666"
        })
      } : {}, {
        k: item.text,
        l: common_vendor.o(($event) => $options.change(item), item.text)
      });
    }),
    r: common_vendor.r("popup", {
      change: $options.change
    }),
    s: common_vendor.s($props.popupStyle),
    t: common_vendor.p({
      ["mode-class"]: ["fade"],
      show: $data.showPopup
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-103d7a03"]]);
wx.createComponent(Component);
