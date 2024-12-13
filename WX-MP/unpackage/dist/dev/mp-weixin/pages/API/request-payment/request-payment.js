"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "request-payment",
      loading: false,
      price: 1,
      providerList: []
    };
  },
  onLoad: function() {
  },
  methods: {
    loginMpWeixin() {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success(res) {
            console.warn("此处使用uni-id处理微信小程序登录，详情参考: https://uniapp.dcloud.net.cn/uniCloud/uni-id");
            common_vendor.index.request({
              url: "https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/user-center",
              method: "POST",
              data: {
                action: "loginByWeixin",
                params: {
                  code: res.code,
                  platform: "mp-weixin"
                }
              },
              success(res2) {
                if (res2.data.code !== 0) {
                  reject(new Error("获取openid失败：", res2.result.msg));
                  return;
                }
                common_vendor.index.setStorageSync("openid", res2.data.openid);
                resolve(res2.data.openid);
              },
              fail(err) {
                reject(new Error("获取openid失败：" + err));
              }
            });
          },
          fail(err) {
            reject(err);
          }
        });
      });
    },
    async weixinPay() {
      let openid = common_vendor.index.getStorageSync("openid");
      console.log("发起支付");
      this.loading = true;
      if (!openid) {
        try {
          openid = await this.loginMpWeixin();
        } catch (e) {
          console.error(e);
        }
        if (!openid) {
          common_vendor.index.showModal({
            content: "获取openid失败",
            showCancel: false
          });
          this.loading = false;
          return;
        }
      }
      this.openid = openid;
      let orderInfo = await this.getOrderInfo("wxpay");
      if (!orderInfo) {
        common_vendor.index.showModal({
          content: "获取支付信息失败",
          showCancel: false
        });
        return;
      }
      common_vendor.index.requestPayment({
        ...orderInfo,
        success: (res) => {
          common_vendor.index.showToast({
            title: "感谢您的赞助!"
          });
        },
        fail: (res) => {
          common_vendor.index.showModal({
            content: "支付失败,原因为: " + res.errMsg,
            showCancel: false
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    async requestPayment(e, index) {
      this.providerList[index].loading = true;
      const provider = e.id;
      let orderInfo = await this.getOrderInfo(provider);
      if (!orderInfo) {
        common_vendor.index.showModal({
          content: "获取支付信息失败",
          showCancel: false
        });
        return;
      }
      console.log("--------orderInfo--------");
      console.log(orderInfo);
      common_vendor.index.requestPayment({
        provider,
        orderInfo,
        success: (e2) => {
          console.log("success", e2);
          common_vendor.index.showToast({
            title: "感谢您的赞助!"
          });
        },
        fail: (e2) => {
          console.log("fail", e2);
          common_vendor.index.showModal({
            content: "支付失败,原因为: " + e2.errMsg,
            showCancel: false
          });
        },
        complete: () => {
          this.providerList[index].loading = false;
        }
      });
    },
    getOrderInfo(provider) {
      return new Promise((resolve, reject) => {
        if (!this.price) {
          reject(new Error("请输入金额"));
        }
        console.warn("此处使用uni-pay处理支付，详情参考: https://uniapp.dcloud.io/uniCloud/unipay");
        common_vendor.index.request({
          method: "POST",
          url: "https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/pay",
          data: {
            provider,
            openid: this.openid,
            totalFee: Number(this.price) * 100,
            // 转为以分为单位
            platform: "mp-weixin"
          },
          success(res) {
            if (res.data.code === 0) {
              resolve(res.data.orderInfo);
            } else {
              reject(new Error("获取支付信息失败" + res.data.msg));
            }
          },
          fail(err) {
            reject(new Error("请求支付接口失败" + err));
          }
        });
      });
    },
    priceChange(e) {
      console.log(e.detail.value);
      this.price = e.detail.value;
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
    b: $data.price,
    c: common_vendor.o((...args) => $options.priceChange && $options.priceChange(...args)),
    d: common_vendor.o((...args) => $options.weixinPay && $options.weixinPay(...args)),
    e: $data.loading
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
