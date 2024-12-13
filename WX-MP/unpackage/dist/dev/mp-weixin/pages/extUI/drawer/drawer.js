"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showRight: false,
      showLeft: false
    };
  },
  methods: {
    confirm() {
    },
    // 打开窗口
    showDrawer(e) {
      this.$refs[e].open();
    },
    // 关闭窗口
    closeDrawer(e) {
      this.$refs[e].close();
    },
    // 抽屉状态发生变化触发
    change(e, type) {
      console.log((type === "showLeft" ? "左窗口" : "右窗口") + (e ? "打开" : "关闭"));
      this[type] = e;
    }
  },
  onNavigationBarButtonTap(e) {
    if (this.showLeft) {
      this.$refs.showLeft.close();
    } else {
      this.$refs.showLeft.open();
    }
  },
  // app端拦截返回事件 ，仅app端生效
  onBackPress() {
    if (this.showRight || this.showLeft) {
      this.$refs.showLeft.close();
      this.$refs.showRight.close();
      return true;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_drawer2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_drawer = () => "../../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_drawer + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o(($event) => $options.showDrawer("showLeft")),
    c: common_vendor.o(($event) => $options.closeDrawer("showLeft")),
    d: common_vendor.sr("showLeft", "3b885dc4-2,3b885dc4-1"),
    e: common_vendor.o(($event) => $options.change($event, "showLeft")),
    f: common_vendor.p({
      mode: "left",
      width: 320
    }),
    g: common_vendor.p({
      title: "左侧滑出",
      type: "line"
    }),
    h: common_vendor.o(($event) => $options.showDrawer("showRight")),
    i: common_vendor.o(($event) => $options.closeDrawer("showRight")),
    j: common_vendor.f(100, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item
      };
    }),
    k: common_vendor.o(($event) => $options.closeDrawer("showRight")),
    l: common_vendor.sr("showRight", "3b885dc4-4,3b885dc4-3"),
    m: common_vendor.o(($event) => $options.change($event, "showRight")),
    n: common_vendor.p({
      mode: "right",
      ["mask-click"]: false
    }),
    o: common_vendor.p({
      title: "右侧滑出",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
