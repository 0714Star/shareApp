"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      testHour: 1,
      testMinute: 0,
      testSecond: 0,
      start: false,
      timeupSecond: 10
    };
  },
  mounted() {
    setTimeout(() => {
      this.testHour = 1;
      this.testMinute = 1;
      this.testSecond = 0;
      this.start = true;
    }, 3e3);
    setTimeout(() => {
      this.start = false;
    }, 1e4);
  },
  methods: {
    timeup() {
      common_vendor.index.showToast({
        title: "时间到"
      });
      this.timeupSecond = 29;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_countdown2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_countdown = () => "../../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_countdown + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.p({
      day: 1,
      hour: 1,
      minute: 12,
      second: 40
    }),
    c: common_vendor.p({
      title: "一般用法",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      ["show-day"]: false,
      hour: 12,
      minute: 12,
      second: 12
    }),
    e: common_vendor.p({
      title: "不显示天数",
      subTitle: "设置 show-day = false 不显示天",
      type: "line",
      padding: true
    }),
    f: common_vendor.p({
      minute: 30,
      second: 0,
      ["show-colon"]: false
    }),
    g: common_vendor.p({
      title: "文字分隔符",
      subTitle: "设置 show-colon 属性设置分隔符样式",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      day: 1,
      hour: 2,
      minute: 30,
      second: 0,
      color: "#FFFFFF",
      ["background-color"]: "#007AFF"
    }),
    i: common_vendor.p({
      title: "修改颜色",
      subTitle: "设置 color \\ background 属性设置组件颜色",
      type: "line",
      padding: true
    }),
    j: common_vendor.p({
      ["font-size"]: 30,
      day: 1,
      hour: 2,
      minute: 30,
      second: 0
    }),
    k: common_vendor.p({
      title: "修改字体大小",
      subTitle: "设置 font-size 属性设置组件大小",
      type: "line",
      padding: true
    }),
    l: common_vendor.p({
      ["font-size"]: 30,
      day: 1,
      hour: 2,
      minute: 30,
      second: 0,
      color: "#FFFFFF",
      ["background-color"]: "#007AFF"
    }),
    m: common_vendor.p({
      title: "修改颜色 + 字体大小",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      start: $data.start,
      day: 1,
      hour: 1,
      minute: 12,
      second: 40
    }),
    o: common_vendor.p({
      title: "自由控制开始/暂停",
      subTitle: "设置 start 属性控制是否自动开启",
      type: "line",
      padding: true
    }),
    p: common_vendor.o($options.timeup),
    q: common_vendor.p({
      ["show-day"]: false,
      second: $data.timeupSecond
    }),
    r: common_vendor.p({
      title: "倒计时回调事件",
      type: "line",
      padding: true
    }),
    s: common_vendor.p({
      ["show-day"]: false,
      hour: $data.testHour,
      minute: $data.testMinute,
      second: $data.testSecond
    }),
    t: common_vendor.p({
      title: "动态赋值",
      type: "line",
      padding: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
