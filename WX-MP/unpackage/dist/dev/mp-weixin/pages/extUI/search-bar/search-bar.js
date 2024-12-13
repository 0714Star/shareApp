"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "123123"
    };
  },
  methods: {
    search(res) {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    },
    input(res) {
      console.log("----input:", res);
    },
    clear(res) {
      common_vendor.index.showToast({
        title: "clear事件，清除值为：" + res.value,
        icon: "none"
      });
    },
    blur(res) {
      common_vendor.index.showToast({
        title: "blur事件，输入值为：" + res.value,
        icon: "none"
      });
    },
    focus(e) {
      common_vendor.index.showToast({
        title: "focus事件，输出值为：" + e.value,
        icon: "none"
      });
    },
    cancel(res) {
      common_vendor.index.showToast({
        title: "点击取消，输入值为：" + res.value,
        icon: "none"
      });
    }
  },
  onBackPress() {
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_card2 + _easycom_uni_search_bar2 + _easycom_uni_section2 + _easycom_uni_icons2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_search_bar + _easycom_uni_section + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.search),
    c: common_vendor.o($options.blur),
    d: common_vendor.o($options.focus),
    e: common_vendor.o($options.input),
    f: common_vendor.o($options.cancel),
    g: common_vendor.o($options.clear),
    h: common_vendor.o(($event) => $data.searchValue = $event),
    i: common_vendor.p({
      focus: true,
      modelValue: $data.searchValue
    }),
    j: common_vendor.t($data.searchValue),
    k: common_vendor.p({
      title: "基本用法",
      type: "line"
    }),
    l: common_vendor.o($options.search),
    m: common_vendor.p({
      placeholder: "自定义背景色",
      bgColor: "#EEEEEE"
    }),
    n: common_vendor.p({
      title: "自定义样式",
      subTitle: "使用 bgColor 属性自定义背景色",
      type: "line"
    }),
    o: common_vendor.o($options.search),
    p: common_vendor.p({
      readonly: true,
      placeholder: "自定义背景色"
    }),
    q: common_vendor.p({
      title: "只读样式",
      subTitle: "使用 readonly 使搜索框只读",
      type: "line"
    }),
    r: common_vendor.p({
      color: "#999999",
      size: "18",
      type: "home"
    }),
    s: common_vendor.o($options.search),
    t: common_vendor.o($options.cancel),
    v: common_vendor.p({
      placeholder: "自定义searchIcon",
      ["cancel-text"]: "cancel"
    }),
    w: common_vendor.p({
      title: "自定义icon",
      type: "line"
    }),
    x: common_vendor.o($options.search),
    y: common_vendor.o($options.cancel),
    z: common_vendor.p({
      radius: "5",
      placeholder: "一直显示",
      clearButton: "always",
      cancelButton: "always"
    }),
    A: common_vendor.o($options.search),
    B: common_vendor.p({
      radius: "5",
      placeholder: "自动显示隐藏",
      clearButton: "auto",
      cancelButton: "none"
    }),
    C: common_vendor.o($options.search),
    D: common_vendor.p({
      radius: "100",
      placeholder: "一直不显示",
      clearButton: "none",
      cancelButton: "none"
    }),
    E: common_vendor.p({
      title: "控制清除/取消按钮",
      subTitle: "使用 clearButton 属性设置清除按钮",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
