"use strict";
const common_vendor = require("../../../common/vendor.js");
function getDate(type) {
  const date = /* @__PURE__ */ new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (type === "start") {
    year = year - 10;
  } else if (type === "end") {
    year = year + 10;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}
const _sfc_main = {
  data() {
    return {
      title: "picker",
      array: [{ name: "中国" }, { name: "美国" }, { name: "巴西" }, { name: "日本" }],
      index: 0,
      multiArray: [
        ["亚洲", "欧洲"],
        ["中国", "日本"],
        ["北京", "上海", "广州"]
      ],
      multiIndex: [0, 0, 0],
      date: getDate({
        format: true
      }),
      startDate: getDate("start"),
      endDate: getDate("end"),
      time: "12:01"
    };
  },
  methods: {
    bindPickerChange: function(e) {
      console.log("picker发送选择改变，携带值为：" + e.detail.value);
      this.index = e.detail.value;
    },
    bindMultiPickerColumnChange: function(e) {
      console.log("修改的列为：" + e.detail.column + "，值为：" + e.detail.value);
      this.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (this.multiIndex[0]) {
            case 0:
              this.multiArray[1] = ["中国", "日本"];
              this.multiArray[2] = ["北京", "上海", "广州"];
              break;
            case 1:
              this.multiArray[1] = ["英国", "法国"];
              this.multiArray[2] = ["伦敦", "曼彻斯特"];
              break;
          }
          this.multiIndex.splice(1, 1, 0);
          this.multiIndex.splice(2, 1, 0);
          break;
        case 1:
          switch (this.multiIndex[0]) {
            case 0:
              switch (this.multiIndex[1]) {
                case 0:
                  this.multiArray[2] = ["北京", "上海", "广州"];
                  break;
                case 1:
                  this.multiArray[2] = ["东京", "北海道"];
                  break;
              }
              break;
            case 1:
              switch (this.multiIndex[1]) {
                case 0:
                  this.multiArray[2] = ["伦敦", "曼彻斯特"];
                  break;
                case 1:
                  this.multiArray[2] = ["巴黎", "马赛"];
                  break;
              }
              break;
          }
          this.multiIndex.splice(2, 1, 0);
          break;
      }
      this.$forceUpdate();
    },
    bindDateChange: function(e) {
      this.date = e.detail.value;
    },
    bindTimeChange: function(e) {
      this.time = e.detail.value;
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
    b: common_vendor.t($data.array[$data.index].name),
    c: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    d: $data.index,
    e: $data.array,
    f: common_vendor.t($data.multiArray[0][$data.multiIndex[0]]),
    g: common_vendor.t($data.multiArray[1][$data.multiIndex[1]]),
    h: common_vendor.t($data.multiArray[2][$data.multiIndex[2]]),
    i: common_vendor.o((...args) => $options.bindMultiPickerColumnChange && $options.bindMultiPickerColumnChange(...args)),
    j: $data.multiIndex,
    k: $data.multiArray,
    l: common_vendor.t($data.time),
    m: $data.time,
    n: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    o: common_vendor.t($data.date),
    p: $data.date,
    q: $data.startDate,
    r: $data.endDate,
    s: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
