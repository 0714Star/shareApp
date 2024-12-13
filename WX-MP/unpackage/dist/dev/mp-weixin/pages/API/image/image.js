"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_permission = require("../../../common/permission.js");
var sourceType = [
  ["camera"],
  ["album"],
  ["camera", "album"]
];
var sizeType = [
  ["compressed"],
  ["original"],
  ["compressed", "original"]
];
const _sfc_main = {
  data() {
    return {
      title: "choose/previewImage",
      imageList: [],
      sourceTypeIndex: 2,
      sourceType: ["拍照", "相册", "拍照或相册"],
      sizeTypeIndex: 2,
      sizeType: ["压缩", "原图", "压缩或原图"],
      countIndex: 8,
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  onUnload() {
    this.imageList = [], this.sourceTypeIndex = 2, this.sourceType = ["拍照", "相册", "拍照或相册"], this.sizeTypeIndex = 2, this.sizeType = ["压缩", "原图", "压缩或原图"], this.countIndex = 8;
  },
  methods: {
    sourceTypeChange: function(e) {
      this.sourceTypeIndex = parseInt(e.detail.value);
    },
    sizeTypeChange: function(e) {
      this.sizeTypeIndex = parseInt(e.detail.value);
    },
    countChange: function(e) {
      this.countIndex = e.detail.value;
    },
    chooseImage: async function() {
      if (this.imageList.length === 9) {
        let isContinue = await this.isFullImg();
        console.log("是否继续?", isContinue);
        if (!isContinue) {
          return;
        }
      }
      common_vendor.index.chooseImage({
        sourceType: sourceType[this.sourceTypeIndex],
        sizeType: sizeType[this.sizeTypeIndex],
        count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
        },
        fail: (err) => {
          console.log("err: ", err);
          if (err.errMsg.indexOf("cancel") !== "-1") {
            return;
          }
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = false;
              switch (this.sourceTypeIndex) {
                case 0:
                  authStatus = res.authSetting["scope.camera"];
                  break;
                case 1:
                  authStatus = res.authSetting["scope.album"];
                  break;
                case 2:
                  authStatus = res.authSetting["scope.album"] && res.authSetting["scope.camera"];
                  break;
              }
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "授权失败",
                  content: "Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    isFullImg: function() {
      return new Promise((res) => {
        common_vendor.index.showModal({
          content: "已经有9张图片了,是否清空现有图片？",
          success: (e) => {
            if (e.confirm) {
              this.imageList = [];
              res(true);
            } else {
              res(false);
            }
          },
          fail: () => {
            res(false);
          }
        });
      });
    },
    previewImage: function(e) {
      var current = e.target.dataset.src;
      common_vendor.index.previewImage({
        current,
        urls: this.imageList
      });
    },
    async checkPermission(code) {
      let type = code ? code - 1 : this.sourceTypeIndex;
      let status = common_permission.permission.isIOS ? await common_permission.permission.requestIOS(sourceType[type][0]) : await common_permission.permission.requestAndroid(type === 0 ? "android.permission.CAMERA" : "android.permission.READ_EXTERNAL_STORAGE");
      if (status === null || status === 1) {
        status = 1;
      } else {
        common_vendor.index.showModal({
          content: "没有开启权限",
          confirmText: "设置",
          success: function(res) {
            if (res.confirm) {
              common_permission.permission.gotoAppSetting();
            }
          }
        });
      }
      return status;
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
    b: common_vendor.t($data.sourceType[$data.sourceTypeIndex]),
    c: $data.sourceType,
    d: common_vendor.o((...args) => $options.sourceTypeChange && $options.sourceTypeChange(...args)),
    e: $data.sourceTypeIndex,
    f: common_vendor.t($data.sizeType[$data.sizeTypeIndex]),
    g: $data.sizeType,
    h: common_vendor.o((...args) => $options.sizeTypeChange && $options.sizeTypeChange(...args)),
    i: $data.sizeTypeIndex,
    j: common_vendor.t($data.count[$data.countIndex]),
    k: $data.count,
    l: common_vendor.o((...args) => $options.countChange && $options.countChange(...args)),
    m: common_vendor.t($data.imageList.length),
    n: common_vendor.f($data.imageList, (image, index, i0) => {
      return {
        a: image,
        b: image,
        c: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args), index),
        d: index
      };
    }),
    o: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
