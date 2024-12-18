"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "tool-link",
  emits: ["change"],
  props: {
    active: [Boolean, String],
    disabled: Boolean
  },
  data() {
    return {
      link: ""
    };
  },
  watch: {
    active(newValue) {
      if (newValue) {
        this.link = newValue;
      }
    }
  },
  components: {
    ToolbarTool
  },
  methods: {
    change() {
      this.$emit("change", {
        type: "link",
        value: this.link
      });
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_toolbarTool = common_vendor.resolveComponent("toolbarTool");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _component_toolbarTool + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-link",
      size: "24px"
    }),
    b: common_vendor.o(($event) => _ctx.$refs.popup.open()),
    c: common_vendor.p({
      type: "button",
      active: $props.active,
      disabled: $props.disabled,
      tooltip: {
        content: $props.active ? "修改链接" : "添加链接"
      }
    }),
    d: common_vendor.o(($event) => $data.link = $event),
    e: common_vendor.p({
      placeholder: "填写链接地址",
      modelValue: $data.link
    }),
    f: common_vendor.p({
      label: "链接地址",
      name: "link"
    }),
    g: common_vendor.p({
      ["label-width"]: "90px"
    }),
    h: common_vendor.o(($event) => _ctx.$refs.popup.close()),
    i: common_vendor.o((...args) => $options.change && $options.change(...args)),
    j: common_vendor.sr("popup", "e676c690-2"),
    k: common_vendor.p({
      type: "center"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e676c690"]]);
wx.createComponent(Component);
