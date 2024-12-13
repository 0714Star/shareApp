"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "share",
      shareText: "uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！",
      href: "https://uniapp.dcloud.io",
      image: "",
      shareType: 1,
      providerList: []
    };
  },
  computed: {
    isDisableButton() {
      return function(item) {
        if (this.shareType === 0 && item.id === "qq") {
          return true;
        }
        if (this.shareType === 5 && item.name !== "分享到微信好友") {
          return true;
        }
        return false;
      };
    }
  },
  onShareAppMessage() {
    return {
      title: this.shareText ? this.shareText : "欢迎体验uni-app",
      path: "/pages/tabBar/component/component",
      imageUrl: this.image ? this.image : "https://web-assets.dcloud.net.cn/unidoc/zh/share-logo@3.png"
    };
  },
  onUnload: function() {
    this.shareText = "uni-app可以同时发布成原生App、小程序、H5，邀请你一起体验！", this.href = "https://uniapp.dcloud.io", this.image = "";
  },
  onLoad: function() {
    common_vendor.index.getProvider({
      service: "share",
      success: (e) => {
        console.log("success", e);
        let data = [];
        for (let i = 0; i < e.provider.length; i++) {
          switch (e.provider[i]) {
            case "weixin":
              data.push({
                name: "分享到微信好友",
                id: "weixin",
                sort: 0
              });
              data.push({
                name: "分享到微信朋友圈",
                id: "weixin",
                type: "WXSenceTimeline",
                sort: 1
              });
              break;
            case "sinaweibo":
              data.push({
                name: "分享到新浪微博",
                id: "sinaweibo",
                sort: 2
              });
              break;
            case "qq":
              data.push({
                name: "分享到QQ",
                id: "qq",
                sort: 3
              });
              break;
          }
        }
        this.providerList = data.sort((x, y) => {
          return x.sort - y.sort;
        });
      },
      fail: (e) => {
        console.log("获取分享通道失败", e);
        common_vendor.index.showModal({
          content: "获取分享通道失败",
          showCancel: false
        });
      }
    });
  },
  methods: {
    async share(e) {
      console.log("分享通道:" + e.id + "； 分享类型:" + this.shareType);
      if (!this.shareText && (this.shareType === 1 || this.shareType === 0)) {
        common_vendor.index.showModal({
          content: "分享内容不能为空",
          showCancel: false
        });
        return;
      }
      if (!this.image && (this.shareType === 2 || this.shareType === 0)) {
        common_vendor.index.showModal({
          content: "分享图片不能为空",
          showCancel: false
        });
        return;
      }
      let shareOPtions = {
        provider: e.id,
        scene: e.type && e.type === "WXSceneTimeline" ? "WXSceneTimeline" : "WXSceneSession",
        //WXSceneSession”分享到聊天界面，“WXSceneTimeline”分享到朋友圈，“WXSceneFavorite”分享到微信收藏     
        type: this.shareType,
        success: (e2) => {
          console.log("success", e2);
          common_vendor.index.showModal({
            content: "已分享",
            showCancel: false
          });
        },
        fail: (e2) => {
          console.log("fail", e2);
          common_vendor.index.showModal({
            content: e2.errMsg,
            showCancel: false
          });
        },
        complete: function() {
          console.log("分享操作结束!");
        }
      };
      switch (this.shareType) {
        case 0:
          shareOPtions.summary = this.shareText;
          shareOPtions.imageUrl = this.image;
          shareOPtions.title = "欢迎体验uniapp";
          shareOPtions.href = "https://uniapp.dcloud.io";
          break;
        case 1:
          shareOPtions.summary = this.shareText;
          break;
        case 2:
          shareOPtions.imageUrl = this.image;
          break;
        case 5:
          shareOPtions.imageUrl = this.image ? this.image : "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png";
          shareOPtions.title = "欢迎体验uniapp";
          shareOPtions.miniProgram = {
            id: "gh_33446d7f7a26",
            path: "/pages/tabBar/component/component",
            webUrl: "https://uniapp.dcloud.io",
            type: 0
          };
          break;
      }
      if (shareOPtions.type === 0 && plus.os.name === "iOS") {
        shareOPtions.imageUrl = await this.compress();
      }
      if (shareOPtions.type === 1 && shareOPtions.provider === "qq") {
        shareOPtions.href = "https://uniapp.dcloud.io";
        shareOPtions.title = "欢迎体验uniapp";
      }
      common_vendor.index.share(shareOPtions);
    },
    radioChange(e) {
      console.log("type:" + e.detail.value);
      this.shareType = parseInt(e.detail.value);
    },
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        sizeType: ["compressed", "original"],
        success: (res) => {
          this.image = res.tempFilePaths[0];
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
    compress() {
      console.log("开始压缩");
      let img = this.image;
      return new Promise((res) => {
        var localPath = plus.io.convertAbsoluteFileSystem(img.replace("file://", ""));
        console.log("after" + localPath);
        plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
          entry.file((file) => {
            console.log("getFile:" + JSON.stringify(file));
            if (file.size > 20480) {
              plus.zip.compressImage({
                src: img,
                dst: img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG"),
                width: "10%",
                height: "10%",
                quality: 1,
                overwrite: true
              }, (event) => {
                console.log("success zip****" + event.size);
                let newImg = img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG");
                res(newImg);
              }, function(error) {
                common_vendor.index.showModal({
                  content: "分享图片太大,需要请重新选择图片!",
                  showCancel: false
                });
              });
            }
          });
        }, (e) => {
          console.log("Resolve file URL failed: " + e.message);
          common_vendor.index.showModal({
            content: "分享图片太大,需要请重新选择图片!",
            showCancel: false
          });
        });
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
    b: $data.shareText,
    c: common_vendor.o(($event) => $data.shareText = $event.detail.value),
    d: !$data.image
  }, !$data.image ? {
    e: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    f: $data.image
  }, $data.image ? {
    g: $data.image
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
