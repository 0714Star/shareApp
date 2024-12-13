"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "saveFile",
      tempFilePath: "",
      savedFilePath: ""
    };
  },
  onLoad() {
    this.savedFilePath = common_vendor.index.getStorageSync("savedFilePath");
  },
  methods: {
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.tempFilePath = res.tempFilePaths[0];
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.album"] && res.authSetting["scope.camera"];
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
    saveFile() {
      if (this.tempFilePath.length > 0) {
        common_vendor.index.saveFile({
          tempFilePath: this.tempFilePath,
          success: (res) => {
            this.savedFilePath = res.savedFilePath;
            common_vendor.index.setStorageSync("savedFilePath", res.savedFilePath);
            common_vendor.index.showModal({
              title: "保存成功",
              content: "下次进入页面时，此文件仍可用",
              showCancel: false
            });
          },
          fail: (res) => {
            common_vendor.index.showModal({
              title: "保存失败",
              content: "失败原因: " + JSON.stringify(res),
              showCancel: false
            });
          }
        });
      } else {
        common_vendor.index.showModal({
          content: "请选择文件",
          showCancel: false
        });
      }
    },
    clear() {
      common_vendor.index.setStorageSync("savedFilePath", "");
      this.tempFilePath = "";
      this.savedFilePath = "";
    },
    openDocument() {
      common_vendor.index.downloadFile({
        url: "https://web-assets.dcloud.net.cn/unidoc/zh/helloworld.pdf",
        success: (res) => {
          common_vendor.index.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              console.log("打开文档成功");
            }
          });
        }
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.tempFilePath
  }, $data.tempFilePath ? {
    c: $data.tempFilePath
  } : {}, {
    d: !$data.tempFilePath && $data.savedFilePath
  }, !$data.tempFilePath && $data.savedFilePath ? {
    e: $data.savedFilePath
  } : {}, {
    f: !$data.tempFilePath && !$data.savedFilePath
  }, !$data.tempFilePath && !$data.savedFilePath ? {
    g: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    h: common_vendor.o((...args) => $options.saveFile && $options.saveFile(...args)),
    i: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    j: common_vendor.o((...args) => $options.openDocument && $options.openDocument(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
