"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    openBrowser(url) {
      plus.runtime.openURL(url);
    },
    openMarket(marketPackageName) {
      var appurl;
      if (plus.os.name == "Android") {
        appurl = "market://details?id=io.dcloud.hellouniapp";
      } else {
        appurl = "itms-apps://itunes.apple.com/cn/app/hello-uni-app/id1417078253";
      }
      if (typeof marketPackageName == "undefined") {
        plus.runtime.openURL(appurl, function(res) {
          console.log(res);
        });
      } else {
        if (plus.os.name == "Android") {
          plus.runtime.openURL(appurl, function(res) {
            plus.nativeUI.alert("本机没有安装应用宝");
          }, marketPackageName);
        } else {
          plus.nativeUI.alert("仅Android手机才支持应用宝");
        }
      }
    },
    openTaobao(url) {
      plus.runtime.openURL(url, function(res) {
        common_vendor.index.showModal({
          content: "本机未检测到淘宝客户端，是否打开浏览器访问淘宝？",
          success: function(res2) {
            if (res2.confirm) {
              plus.runtime.openURL("https://s.taobao.com/search?q=uni-app");
            }
          }
        });
      });
    },
    openMap() {
      var url = "";
      if (plus.os.name == "Android") {
        var hasBaiduMap = plus.runtime.isApplicationExist({ pname: "com.baidu.BaiduMap", action: "baidumap://" });
        var hasAmap = plus.runtime.isApplicationExist({ pname: "com.autonavi.minimap", action: "androidamap://" });
        var urlBaiduMap = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";
        var urlAmap = "androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0";
        if (hasAmap && hasBaiduMap) {
          plus.nativeUI.actionSheet({ title: "选择地图应用", cancel: "取消", buttons: [{ title: "百度地图" }, { title: "高德地图" }] }, function(e) {
            switch (e.index) {
              case 1:
                plus.runtime.openURL(urlBaiduMap);
                break;
              case 2:
                plus.runtime.openURL(urlAmap);
                break;
            }
          });
        } else if (hasAmap) {
          plus.runtime.openURL(urlAmap);
        } else if (hasBaiduMap) {
          plus.runtime.openURL(urlBaiduMap);
        } else {
          url = "geo:39.96310,116.340698?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
          plus.runtime.openURL(url);
        }
      } else {
        plus.nativeUI.actionSheet({ title: "选择地图应用", cancel: "取消", buttons: [{ title: "Apple地图" }, { title: "百度地图" }, { title: "高德地图" }] }, function(e) {
          console.log("e.index: " + e.index);
          switch (e.index) {
            case 1:
              url = "http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=39.96310,116.340698&spn=0.008766,0.019441";
              break;
            case 2:
              url = "baidumap://map/marker?location=39.968789,116.347247&title=DCloud&src=Hello%20uni-app";
              break;
            case 3:
              url = "iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname=DCloud&lat=39.9631018208&lon=116.3406135236&dev=0";
              break;
          }
          if (url != "") {
            plus.runtime.openURL(url, function(e2) {
              plus.nativeUI.alert("本机未安装指定的地图应用");
            });
          }
        });
      }
    },
    openQQ: function(e) {
      plus.runtime.openURL("mqqwpa://im/chat?chat_type=" + e.detail.value.qqNumType + "&uin=" + e.detail.value.qqNum, function(res) {
        plus.nativeUI.alert("本机没有安装QQ，无法启动");
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
      title: "通过scheme打开三方app示例"
    }),
    b: common_vendor.o(($event) => $options.openBrowser("https://uniapp.dcloud.io/h5")),
    c: common_vendor.o(($event) => $options.openMarket()),
    d: common_vendor.o(($event) => $options.openMarket("com.tencent.android.qqdownloader")),
    e: common_vendor.o(($event) => $options.openTaobao("taobao://s.taobao.com/search?q=uni-app")),
    f: common_vendor.o(($event) => $options.openMap()),
    g: common_vendor.o((...args) => $options.openQQ && $options.openQQ(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
