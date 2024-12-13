"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "生物认证",
      result: ""
    };
  },
  onLoad() {
  },
  methods: {
    checkIsSupportSoterAuthentication() {
      common_vendor.index.checkIsSupportSoterAuthentication({
        success(res) {
          common_vendor.index.showModal({
            content: "支持的认证方式：" + res.supportMode,
            showCancel: false
          });
          console.log(res);
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    checkIsSoterEnrolledInDeviceFingerPrint() {
      common_vendor.index.checkIsSoterEnrolledInDevice({
        checkAuthMode: "fingerPrint",
        success(res) {
          if (res.isEnrolled) {
            common_vendor.index.showToast({
              icon: "none",
              title: "已录入指纹"
            });
          } else {
            common_vendor.index.showModal({
              content: "未录入指纹",
              showCancel: false
            });
          }
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "未录入指纹",
            showCancel: false
          });
          console.log(err);
        }
      });
    },
    checkIsSoterEnrolledInDeviceFaceID() {
      common_vendor.index.checkIsSoterEnrolledInDevice({
        checkAuthMode: "facial",
        success(res) {
          if (res.isEnrolled) {
            common_vendor.index.showToast({
              icon: "none",
              title: "已录入FaceID"
            });
          } else {
            common_vendor.index.showModal({
              content: "未录入FaceID",
              showCancel: false
            });
          }
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "未录入FaceID",
            showCancel: false
          });
          console.log(err);
        }
      });
    },
    startSoterAuthenticationFingerPrint() {
      common_vendor.index.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "123456",
        authContent: "请用指纹解锁",
        success(res) {
          common_vendor.index.showToast({
            icon: "none",
            title: "指纹验证成功"
          });
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "指纹验证失败，errCode：" + err.errCode,
            showCancel: false
          });
          console.log(err);
        }
      });
    },
    startSoterAuthenticationFaceID() {
      common_vendor.index.startSoterAuthentication({
        requestAuthModes: ["facial"],
        challenge: "123456",
        authContent: "请用FaceID解锁",
        success(res) {
          common_vendor.index.showToast({
            icon: "none",
            title: "FaceID验证成功"
          });
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "FaceID验证失败，errCode：" + err.errCode,
            showCancel: false
          });
          console.log(err);
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
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.checkIsSupportSoterAuthentication && $options.checkIsSupportSoterAuthentication(...args)),
    c: common_vendor.o((...args) => $options.checkIsSoterEnrolledInDeviceFingerPrint && $options.checkIsSoterEnrolledInDeviceFingerPrint(...args)),
    d: common_vendor.o((...args) => $options.checkIsSoterEnrolledInDeviceFaceID && $options.checkIsSoterEnrolledInDeviceFaceID(...args)),
    e: common_vendor.o((...args) => $options.startSoterAuthenticationFingerPrint && $options.startSoterAuthenticationFingerPrint(...args)),
    f: common_vendor.o((...args) => $options.startSoterAuthenticationFaceID && $options.startSoterAuthenticationFaceID(...args)),
    g: common_vendor.t($data.result)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
