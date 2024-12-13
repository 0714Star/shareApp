"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "checkbox 复选框",
      items: [
        {
          value: "USA",
          name: "美国"
        },
        {
          value: "CHN",
          name: "中国",
          checked: "true"
        },
        {
          value: "BRA",
          name: "巴西"
        },
        {
          value: "JPN",
          name: "日本"
        },
        {
          value: "ENG",
          name: "英国"
        },
        {
          value: "FRA",
          name: "法国"
        }
      ]
    };
  },
  methods: {
    checkboxChange: function(e) {
      var items = this.items, values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i];
        if (values.indexOf(item.value) >= 0) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
      }
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item.value,
        b: item.checked,
        c: common_vendor.t(item.name),
        d: item.value
      };
    }),
    c: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
