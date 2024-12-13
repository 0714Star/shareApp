"use strict";
const common_vendor = require("../../../common/vendor.js");
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = /* @__PURE__ */ new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);
  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
const _sfc_main = {
  components: {},
  data() {
    return {
      showCalendar: false,
      info: {
        lunar: true,
        range: true,
        insert: false,
        selected: []
      }
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.showCalendar = true;
    });
    setTimeout(() => {
      this.info.date = getDate(/* @__PURE__ */ new Date(), -30).fullDate;
      this.info.startDate = getDate(/* @__PURE__ */ new Date(), -60).fullDate;
      this.info.endDate = getDate(/* @__PURE__ */ new Date(), 30).fullDate;
      this.info.selected = [
        {
          date: getDate(/* @__PURE__ */ new Date(), -3).fullDate,
          info: "打卡"
        },
        {
          date: getDate(/* @__PURE__ */ new Date(), -2).fullDate,
          info: "签到",
          data: {
            custom: "自定义信息",
            name: "自定义消息头"
          }
        },
        {
          date: getDate(/* @__PURE__ */ new Date(), -1).fullDate,
          info: "已打卡"
        }
      ];
    }, 2e3);
  },
  methods: {
    open() {
      this.$refs.calendar.open();
    },
    close() {
      console.log("弹窗关闭");
    },
    change(e) {
      console.log("change 返回:", e);
      if (this.info.selected.length > 5)
        return;
      this.info.selected.push({
        date: e.fulldate,
        info: "打卡"
      });
    },
    confirm(e) {
      console.log("confirm 返回:", e);
    },
    monthSwitch(e) {
      console.log("monthSwitchs 返回:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_calendar2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_calendar = () => "../../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_calendar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showCalendar
  }, $data.showCalendar ? {
    b: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    c: common_vendor.p({
      title: "插入模式",
      type: "line"
    }),
    d: common_vendor.o($options.change),
    e: common_vendor.o($options.monthSwitch),
    f: common_vendor.p({
      selected: $data.info.selected,
      showMonth: false
    }),
    g: common_vendor.p({
      title: "弹出模式",
      type: "line"
    }),
    h: common_vendor.o((...args) => $options.open && $options.open(...args)),
    i: common_vendor.sr("calendar", "2df35684-4"),
    j: common_vendor.o($options.confirm),
    k: common_vendor.o($options.close),
    l: common_vendor.p({
      ["clear-date"]: true,
      date: $data.info.date,
      insert: $data.info.insert,
      lunar: $data.info.lunar,
      startDate: $data.info.startDate,
      endDate: $data.info.endDate,
      range: $data.info.range
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
