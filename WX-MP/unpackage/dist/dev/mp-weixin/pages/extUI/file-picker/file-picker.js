"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      sourceType: ["album", "camera"],
      imageStyles: {
        width: 64,
        height: 64,
        border: {
          radius: "50%"
        }
      },
      listStyles: {
        // 是否显示边框
        border: true,
        // 是否显示分隔线
        dividline: true,
        // 线条样式
        borderStyle: {
          width: 1,
          color: "blue",
          style: "dashed",
          radius: 2
        }
      },
      fileLists: [{
        url: "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao-small.jpg",
        extname: "png",
        name: "shuijiao.png"
      }, {
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
        extname: "png",
        name: "uniapp-logo.png"
      }, {
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
        extname: "png",
        name: "shuijiao.png"
      }]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_file_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_file_picker + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      limit: "9",
      title: "最多选择9张图片",
      ["source-type"]: $data.sourceType
    }),
    c: common_vendor.p({
      title: "只选择图片",
      type: "line"
    }),
    d: common_vendor.p({
      limit: "9",
      ["file-mediatype"]: "video",
      title: "最多选择9个视频",
      ["source-type"]: $data.sourceType
    }),
    e: common_vendor.p({
      title: "只选择视频",
      type: "line"
    }),
    f: common_vendor.p({
      limit: "9",
      title: "从相册选图",
      ["source-type"]: ["album"]
    }),
    g: common_vendor.p({
      limit: "9",
      title: "使用相机",
      ["file-mediatype"]: "video",
      ["source-type"]: ["camera"]
    }),
    h: common_vendor.p({
      title: "自定义图片和视频选择的来源",
      type: "line"
    }),
    i: common_vendor.p({
      limit: "5",
      ["file-mediatype"]: "all",
      title: "最多选择5个文件"
    }),
    j: common_vendor.p({
      title: "选择任意文件",
      type: "line"
    }),
    k: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: true,
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    l: common_vendor.p({
      title: "自定义图片大小",
      type: "line"
    }),
    m: common_vendor.p({
      readonly: true,
      value: $data.fileLists,
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    n: common_vendor.p({
      readonly: true,
      value: $data.fileLists,
      listStyles: $data.listStyles,
      ["file-mediatype"]: "all"
    }),
    o: common_vendor.p({
      title: "自定义图片大小",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
