"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      show: true,
      modeClass: "fade",
      styles: {}
    };
  },
  onLoad() {
  },
  methods: {
    handle(type) {
      this.show = !this.show;
      this.modeClass = type;
    },
    custom() {
      this.$refs.ani.step({
        width: "100px",
        height: "100px",
        rotate: "180"
      }, {
        delay: 200,
        duration: 300
      });
      this.$refs.ani.step({
        width: "100px",
        height: "100px",
        rotate: "0"
      }, {
        transformOrigin: "50% 50%"
      });
      this.$refs.ani.step({
        translateX: "-100px"
      }, {
        timingFunction: "ease-in",
        duration: 100
      });
      this.$refs.ani.step({
        translateX: "100px"
      }, {
        timingFunction: "ease",
        duration: 300
      });
      this.$refs.ani.step({
        translateX: "50px",
        scale: 1.5
      }, {
        timingFunction: "linear",
        duration: 100
      });
      this.$refs.ani.step({
        translateX: "0px",
        scale: 1
      }, {
        timingFunction: "linear",
        duration: 150
      });
      this.$refs.ani.run();
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_transition2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_transition = () => "../../../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_transition + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.sr("ani", "5a19e49e-2,5a19e49e-1"),
    c: common_vendor.p({
      ["custom-class"]: "transition",
      ["mode-class"]: $data.modeClass,
      styles: $data.styles,
      show: $data.show
    }),
    d: common_vendor.p({
      title: "示例",
      type: "line"
    }),
    e: common_vendor.o(($event) => $options.handle("fade")),
    f: common_vendor.o(($event) => $options.handle(["fade", "slide-top"])),
    g: common_vendor.o(($event) => $options.handle(["fade", "slide-right"])),
    h: common_vendor.o(($event) => $options.handle(["fade", "zoom-in"])),
    i: common_vendor.o((...args) => $options.custom && $options.custom(...args)),
    j: common_vendor.p({
      title: "操作",
      subTitle: "点击按钮 ,切换动画效果",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
