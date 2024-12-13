"use strict";
const common_vendor = require("../../../common/vendor.js");
var sourceType = [
  ["camera"],
  ["album"],
  ["camera", "album"]
];
const _sfc_main = {
  data() {
    return {
      title: "chooseVideo",
      sourceTypeIndex: 2,
      sourceType: ["拍摄", "相册", "拍摄或相册"],
      src: "",
      cameraList: [
        {
          value: "back",
          name: "后置摄像头",
          checked: "true"
        },
        {
          value: "front",
          name: "前置摄像头"
        }
      ],
      cameraIndex: 0
    };
  },
  onUnload() {
    this.src = "", this.sourceTypeIndex = 2, this.sourceType = ["拍摄", "相册", "拍摄或相册"];
  },
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.cameraList.length; i++) {
        if (this.cameraList[i].value === evt.detail.value) {
          this.cameraIndex = i;
          break;
        }
      }
    },
    sourceTypeChange: function(e) {
      this.sourceTypeIndex = parseInt(e.detail.value);
    },
    chooseVideo: function() {
      common_vendor.index.chooseVideo({
        camera: this.cameraList[this.cameraIndex].value,
        sourceType: sourceType[this.sourceTypeIndex],
        success: (res) => {
          this.src = res.tempFilePath;
        },
        fail: (err) => {
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
                  content: "Hello uni-app需要从您的相机或相册获取视频，请在设置界面打开相关权限",
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
    b: common_vendor.t($data.sourceType[$data.sourceTypeIndex]),
    c: $data.sourceType,
    d: common_vendor.o((...args) => $options.sourceTypeChange && $options.sourceTypeChange(...args)),
    e: $data.sourceTypeIndex,
    f: common_vendor.f($data.cameraList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.value,
        c: index === $data.cameraIndex,
        d: item.value
      };
    }),
    g: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args)),
    h: !$data.src
  }, !$data.src ? {
    i: common_vendor.o((...args) => $options.chooseVideo && $options.chooseVideo(...args))
  } : {
    j: $data.src
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
