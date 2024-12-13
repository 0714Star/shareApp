"use strict";
const common_vendor = require("../../../common/vendor.js");
const DEVICE_UUID_WEICHAT = "FDA50693-A4E2-4FB1-AFCF-C6EB07647825";
const _sfc_main = {
  data() {
    return {
      title: "iBeacon",
      isOpen: false,
      isStarted: false,
      deviceList: [],
      isPageOpened: false
    };
  },
  onLoad() {
    this.onBeaconUpdate();
  },
  onShow() {
    this.isPageOpened = true;
  },
  methods: {
    maskclose() {
      this.maskShow = false;
    },
    openBluetoothAdapter() {
      common_vendor.index.openBluetoothAdapter({
        success: (res) => {
          console.log("初始化蓝牙成功:" + res.errMsg);
          console.log(res);
          this.isOpen = true;
          this.deviceList = [];
        },
        fail: (err) => {
          console.log("初始化蓝牙失败，错误码：" + (err.errCode || err.errMsg));
          if (err.errCode !== 0) {
            initTypes(err.errCode, err.errMsg);
          }
        }
      });
    },
    closeBluetoothAdapter(OBJECT) {
      this.stopBeaconDiscovery();
      common_vendor.wx$1.closeBluetoothAdapter({
        success: (res) => {
          this.isOpen = false;
          console.log("断开蓝牙模块成功");
        }
      });
    },
    onBeaconUpdate() {
      common_vendor.index.onBeaconUpdate((res) => {
        if (!this.isPageOpened || !this.isOpen || !this.isStarted) {
          return;
        }
        console.log(res);
        if (res.beacons && res.beacons.length > 0) {
          this.getBeacons();
        } else if (!res.connected) {
          this.deviceList = [];
        }
      });
    },
    startBeaconDiscovery() {
      common_vendor.index.startBeaconDiscovery({
        uuids: this.getUUIDList(),
        success: (res) => {
          this.isStarted = true;
          console.log(res);
        },
        fail: (err) => {
          console.error(err);
        }
      });
    },
    stopBeaconDiscovery(types) {
      if (this.isStarted) {
        common_vendor.index.stopBeaconDiscovery({
          success: (res) => {
            this.isStarted = false;
          },
          fail: (err) => {
            console.error(err);
          }
        });
      }
    },
    getBeacons() {
      common_vendor.index.getBeacons({
        success: (res) => {
          if (res.beacons && res.beacons.length > 0) {
            console.log(res.beacons);
            this.deviceList = res.beacons;
          }
        },
        fail: (err) => {
          console.log("获取设备服务失败，错误码：" + err.errCode);
          if (errCode.errCode !== 0) {
            initTypes(errCode.errCode);
          }
        }
      });
    },
    getUUIDList() {
      return [DEVICE_UUID_WEICHAT];
    }
  },
  onUnload() {
    this.isPageOpened = false;
  }
};
function initTypes(code, errMsg) {
  switch (code) {
    case 1e4:
      toast("未初始化蓝牙适配器");
      break;
    case 10001:
      toast("未检测到蓝牙，请打开蓝牙重试！");
      break;
    case 10002:
      toast("没有找到指定设备");
      break;
    case 10003:
      toast("连接失败");
      break;
    case 10004:
      toast("没有找到指定服务");
      break;
    case 10005:
      toast("没有找到指定特征值");
      break;
    case 10006:
      toast("当前连接已断开");
      break;
    case 10007:
      toast("当前特征值不支持此操作");
      break;
    case 10008:
      toast("其余所有系统上报的异常");
      break;
    case 10009:
      toast("Android 系统特有，系统版本低于 4.3 不支持 BLE");
      break;
    default:
      toast(errMsg);
  }
}
function toast(content, showCancel = false) {
  common_vendor.index.showModal({
    title: "提示",
    content,
    showCancel
  });
}
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
    b: $data.isOpen,
    c: common_vendor.o((...args) => $options.openBluetoothAdapter && $options.openBluetoothAdapter(...args)),
    d: !$data.isOpen,
    e: common_vendor.o((...args) => $options.closeBluetoothAdapter && $options.closeBluetoothAdapter(...args)),
    f: !$data.isOpen || $data.isStarted,
    g: $data.isStarted,
    h: common_vendor.o((...args) => $options.startBeaconDiscovery && $options.startBeaconDiscovery(...args)),
    i: !$data.isStarted,
    j: common_vendor.o((...args) => $options.stopBeaconDiscovery && $options.stopBeaconDiscovery(...args)),
    k: $data.isStarted || $data.deviceList.length > 0
  }, $data.isStarted || $data.deviceList.length > 0 ? {
    l: common_vendor.t($data.deviceList.length)
  } : {}, {
    m: common_vendor.f($data.deviceList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.uuid),
        b: common_vendor.t(item.major),
        c: common_vendor.t(item.minor),
        d: common_vendor.t(item.rssi),
        e: common_vendor.t(item.accuracy),
        f: common_vendor.t(item.heading),
        g: item.uuid
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
