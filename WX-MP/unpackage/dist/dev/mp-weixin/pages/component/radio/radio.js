"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "radio 单选框",
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
      ],
      current: 0
    };
  },
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
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
    b: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: item.value,
        b: index === $data.current,
        c: common_vendor.t(item.name),
        d: item.value
      };
    }),
    c: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
