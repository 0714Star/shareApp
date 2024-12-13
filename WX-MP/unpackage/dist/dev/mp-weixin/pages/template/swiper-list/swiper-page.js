"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    pid: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      dataList: []
    };
  },
  created() {
  },
  methods: {
    loadData() {
    },
    clear() {
      this.dataList.length = 0;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.pid)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b9697df1"]]);
wx.createComponent(Component);
