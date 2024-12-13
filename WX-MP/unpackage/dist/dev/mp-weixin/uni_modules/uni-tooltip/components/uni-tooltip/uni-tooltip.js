"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uni-tooltip",
  data() {
    return {};
  },
  props: {
    content: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      default: "bottom"
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.content || _ctx.$slots.content
  }, $props.content || _ctx.$slots.content ? {
    b: common_vendor.t($props.content)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
