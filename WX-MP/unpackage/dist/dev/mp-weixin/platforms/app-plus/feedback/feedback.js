"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      msgContents: ["界面显示错乱", "启动缓慢，卡出翔了", "UI无法直视，丑哭了", "偶发性崩溃"],
      stars: [1, 2, 3, 4, 5],
      imageList: [],
      sendDate: {
        score: 0,
        content: "",
        contact: ""
      }
    };
  },
  onLoad() {
    this.deviceInfo = {
      // appid: plus.runtime.appid,
      appid: "__UNI__5D0B0CA",
      imei: plus.device.imei,
      //设备标识
      p: plus.os.name === "Android" ? "a" : "i",
      //平台类型，i表示iOS平台，a表示Android平台。
      md: plus.device.model,
      //设备型号
      app_version: plus.runtime.version,
      plus_version: plus.runtime.innerVersion,
      //基座版本号
      os: plus.os.version,
      net: "" + plus.networkinfo.getCurrentType()
    };
    this.sendDate = Object.assign(this.deviceInfo, this.sendDate);
  },
  methods: {
    /**
     * 关闭图片
     * @param {Object} e
     */
    close(e) {
      this.imageList.splice(e, 1);
    },
    /**
     * 快速输入
     */
    chooseMsg() {
      common_vendor.index.showActionSheet({
        itemList: this.msgContents,
        success: (res) => {
          this.sendDate.content = this.msgContents[res.tapIndex];
        }
      });
    },
    /**
     * 选择图片
     */
    chooseImg() {
      common_vendor.index.chooseImage({
        sourceType: ["camera", "album"],
        sizeType: "compressed",
        count: 5 - this.imageList.length,
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
        }
      });
    },
    /**
     * 评分
     * @param {Object} e
     */
    chooseStar(e) {
      this.sendDate.score = e;
    },
    /**
     * 预览图片
     * @param {Object} index
     */
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.imageList,
        current: this.imageList[index]
      });
    },
    /**
     * 提交
     */
    send() {
      if (this.sendDate.content.length === 0) {
        common_vendor.index.showModal({
          content: "请输入问题和意见",
          showCancel: false
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "上传中..."
      });
      let imgs = this.imageList.map((value, index) => {
        return {
          name: "images" + index,
          uri: value
        };
      });
      this.request(this.sendDate, imgs).then((res) => {
        if (typeof res.data === "string") {
          res.data = JSON.parse(res.data);
        }
        if (res.statusCode === 200 && res.data && res.data.ret === 0) {
          common_vendor.index.showModal({
            content: "反馈成功",
            showCancel: false
          });
          this.imageList = [];
          this.sendDate = Object.assign(this.deviceInfo, {
            score: 0,
            content: "",
            contact: ""
          });
        } else if (res.statusCode !== 200) {
          common_vendor.index.showModal({
            content: "反馈失败，错误码为：" + res.statusCode,
            showCancel: false
          });
        } else {
          common_vendor.index.showModal({
            content: "反馈失败",
            showCancel: false
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    /**
     * 发送请求到后台
     */
    request(sendDate, imgs) {
      return new Promise((resolve, reject) => {
        let fromData = {
          url: "https://service.dcloud.net.cn/feedback",
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          },
          complete() {
            common_vendor.index.hideLoading();
          }
        };
        if (imgs.length > 0) {
          fromData.files = imgs;
          fromData.formData = sendDate;
          common_vendor.index.uploadFile(fromData);
        } else {
          fromData.data = sendDate;
          fromData.method = "POST";
          common_vendor.index.request(fromData);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.chooseMsg && $options.chooseMsg(...args)),
    b: $data.sendDate.content,
    c: common_vendor.o(($event) => $data.sendDate.content = $event.detail.value),
    d: common_vendor.t($data.imageList.length),
    e: common_vendor.f($data.imageList, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.previewImage(index), index),
        c: common_vendor.o(($event) => $options.close(index), index),
        d: index
      };
    }),
    f: common_vendor.o((...args) => $options.chooseImg && $options.chooseImg(...args)),
    g: $data.imageList.length < 5,
    h: $data.sendDate.contact,
    i: common_vendor.o(($event) => $data.sendDate.contact = $event.detail.value),
    j: common_vendor.o(($event) => $data.sendDate.score = $event),
    k: common_vendor.p({
      color: "#bbb",
      modelValue: $data.sendDate.score
    }),
    l: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
