"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "bluetooth",
      disabled: [false, true, true, true, true, true, true, true, true, true, true],
      newDeviceLoad: false,
      searchLoad: false,
      maskShow: false,
      equipment: [],
      adapterState: {
        discovering: false,
        available: false
      },
      connected: false,
      showMaskType: "device",
      servicesData: [],
      characteristicsData: [],
      valueChangeData: {},
      isStop: true,
      list: []
    };
  },
  onLoad() {
    this.onBLEConnectionStateChange();
  },
  methods: {
    moveHandle() {
    },
    /**
     * 关闭遮罩
     */
    maskclose() {
      this.maskShow = false;
    },
    /**
     * 选择设备
     */
    queryDevices() {
      this.showMaskType = "device";
      this.maskShow = true;
    },
    tapQuery(item) {
      if (this.showMaskType === "device") {
        this.$set(this.disabled, 4, false);
        if (this.equipment.length > 0) {
          this.equipment[0] = item;
        } else {
          this.equipment.push(item);
        }
        this.newDeviceLoad = false;
      }
      if (this.showMaskType === "service") {
        this.$set(this.disabled, 6, false);
        if (this.servicesData.length > 0) {
          this.servicesData[0] = item;
        } else {
          this.servicesData.push(item);
        }
      }
      if (this.showMaskType === "characteristics") {
        this.$set(this.disabled, 7, false);
        if (this.characteristicsData.length > 0) {
          this.characteristicsData[0] = item;
        } else {
          this.characteristicsData.push(item);
        }
      }
      this.maskShow = false;
    },
    /**
     * 初始化蓝牙设备
     */
    openBluetoothAdapter() {
      common_vendor.index.openBluetoothAdapter({
        success: (e) => {
          console.log("初始化蓝牙成功:" + e.errMsg);
          console.log(JSON.stringify(e));
          this.isStop = false;
          this.$set(this.disabled, 0, true);
          this.$set(this.disabled, 1, false);
          this.$set(this.disabled, 10, false);
          this.getBluetoothAdapterState();
        },
        fail: (e) => {
          console.log(e);
          console.log("初始化蓝牙失败，错误码：" + (e.errCode || e.errMsg));
          if (e.errCode !== 0) {
            initTypes(e.errCode, e.errMsg);
          }
        }
      });
    },
    /**
     * 开始搜索蓝牙设备
     */
    startBluetoothDevicesDiscovery() {
      common_vendor.index.startBluetoothDevicesDiscovery({
        success: (e) => {
          console.log("开始搜索蓝牙设备:" + e.errMsg);
          this.searchLoad = true;
          this.$set(this.disabled, 1, true);
          this.$set(this.disabled, 2, false);
          this.$set(this.disabled, 3, false);
          this.onBluetoothDeviceFound();
        },
        fail: (e) => {
          console.log("搜索蓝牙设备失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 停止搜索蓝牙设备
     */
    stopBluetoothDevicesDiscovery(types) {
      common_vendor.index.stopBluetoothDevicesDiscovery({
        success: (e) => {
          console.log("停止搜索蓝牙设备:" + e.errMsg);
          if (types) {
            this.$set(this.disabled, 1, true);
          } else {
            this.$set(this.disabled, 1, false);
          }
          this.$set(this.disabled, 2, true);
          this.searchLoad = false;
        },
        fail: (e) => {
          console.log("停止搜索蓝牙设备失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 发现外围设备
     */
    onBluetoothDeviceFound() {
      common_vendor.index.onBluetoothDeviceFound((devices) => {
        console.log("开始监听寻找到新设备的事件");
        this.getBluetoothDevices();
      });
    },
    /**
     * 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。
     */
    getBluetoothDevices() {
      common_vendor.index.getBluetoothDevices({
        success: (res) => {
          this.newDeviceLoad = false;
          console.log("获取蓝牙设备成功:" + res.errMsg);
          this.list = res.devices;
        },
        fail: (e) => {
          console.log("获取蓝牙设备错误，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 获取本机蓝牙适配器状态
     */
    getBluetoothAdapterState() {
      console.log("--->");
      common_vendor.index.getBluetoothAdapterState({
        success: (res) => {
          console.log(JSON.stringify(res));
          this.adapterState = res;
        },
        fail: (e) => {
          console.log("获取本机蓝牙适配器状态失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 连接低功耗蓝牙
     */
    createBLEConnection() {
      let deviceId = this.equipment[0].deviceId;
      common_vendor.index.showToast({
        title: "连接蓝牙...",
        icon: "loading",
        duration: 99999
      });
      common_vendor.index.createBLEConnection({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId,
        success: (res) => {
          console.log(res);
          console.log("连接蓝牙成功:" + res.errMsg);
          this.stopBluetoothDevicesDiscovery(true);
          common_vendor.index.hideToast();
          common_vendor.index.showToast({
            title: "连接成功",
            icon: "success",
            duration: 2e3
          });
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, false);
          this.$set(this.disabled, 9, false);
          this.connected = true;
        },
        fail: (e) => {
          console.log("连接低功耗蓝牙失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 断开与低功耗蓝牙设备的连接
     */
    closeBLEConnection() {
      let deviceId = this.equipment[0].deviceId;
      common_vendor.index.closeBLEConnection({
        deviceId,
        success: (res) => {
          console.log(res);
          console.log("断开低功耗蓝牙成功:" + res.errMsg);
          this.$set(this.disabled, 1, false);
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, true);
          this.$set(this.disabled, 6, true);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.$set(this.disabled, 9, true);
          this.equipment = [];
          this.servicesData = [];
          this.characteristicsData = [];
        },
        fail: (e) => {
          console.log("断开低功耗蓝牙成功，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 获取所有服务
     */
    getBLEDeviceServices() {
      let deviceId = this.equipment[0].deviceId;
      console.log("获取所有服务的 uuid:" + deviceId);
      common_vendor.index.getBLEDeviceServices({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId,
        success: (res) => {
          console.log(JSON.stringify(res.services));
          console.log("获取设备服务成功:" + res.errMsg);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.showMaskType = "service";
          this.list = res.services;
          this.characteristicsData = [];
          if (this.list.length <= 0) {
            toast("获取服务失败，请重试!");
            return;
          }
          this.maskShow = true;
        },
        fail: (e) => {
          console.log("获取设备服务失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 获取某个服务下的所有特征值
     */
    getBLEDeviceCharacteristics() {
      let deviceId = this.equipment[0].deviceId;
      let serviceId = this.servicesData[0].uuid;
      console.log(deviceId);
      console.log(serviceId);
      common_vendor.index.getBLEDeviceCharacteristics({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId,
        success: (res) => {
          console.log(JSON.stringify(res));
          console.log("获取特征值成功:" + res.errMsg);
          this.$set(this.disabled, 7, true);
          this.valueChangeData = {};
          this.showMaskType = "characteristics";
          this.list = res.characteristics;
          if (this.list.length <= 0) {
            toast("获取特征值失败，请重试!");
            return;
          }
          this.maskShow = true;
        },
        fail: (e) => {
          console.log("获取特征值失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    /**
     * 监听低功耗蓝牙连接状态的改变事件。包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
     */
    onBLEConnectionStateChange() {
      common_vendor.index.onBLEConnectionStateChange((res) => {
        console.log(`蓝牙连接状态 -------------------------->`);
        console.log(JSON.stringify(res));
        if (!res.connected) {
          if (this.isStop)
            return;
          console.log("断开低功耗蓝牙成功:");
          this.$set(this.disabled, 1, false);
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, true);
          this.$set(this.disabled, 6, true);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.$set(this.disabled, 9, true);
          this.searchLoad = false;
          this.equipment = [];
          this.servicesData = [];
          this.characteristicsData = [];
          this.valueChangeData = {};
          toast("已经断开当前蓝牙连接");
        }
      });
    },
    /**
     * 读取低功耗蓝牙设备的特征值的二进制数据值。注意：必须设备的特征值支持 read 才可以成功调用
     */
    readBLECharacteristicValue() {
      let deviceId = this.equipment[0].deviceId;
      let serviceId = this.servicesData[0].uuid;
      let characteristicId = this.characteristicsData[0].uuid;
      console.log(deviceId);
      console.log(serviceId);
      console.log(characteristicId);
      common_vendor.index.readBLECharacteristicValue({
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId,
        success: (res) => {
          console.log("读取设备数据值成功");
          console.log(JSON.stringify(res));
          this.notifyBLECharacteristicValueChange();
        },
        fail(e) {
          console.log("读取设备数据值失败，错误码：" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
      this.onBLECharacteristicValueChange();
    },
    /**
     * 监听低功耗蓝牙设备的特征值变化事件。必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification。
     */
    onBLECharacteristicValueChange() {
      common_vendor.index.onBLECharacteristicValueChange((characteristic) => {
        console.log("监听低功耗蓝牙设备的特征值变化事件成功");
        console.log(JSON.stringify(characteristic));
        this.valueChangeData = characteristic;
      });
    },
    /**
     * 订阅操作成功后需要设备主动更新特征值的 value，才会触发 uni.onBLECharacteristicValueChange 回调。
     */
    notifyBLECharacteristicValueChange() {
      let deviceId = this.equipment[0].deviceId;
      let serviceId = this.servicesData[0].uuid;
      let characteristicId = this.characteristicsData[0].uuid;
      let notify = this.characteristicsData[0].properties.notify;
      console.log(deviceId);
      console.log(serviceId);
      console.log(characteristicId);
      console.log(notify);
      common_vendor.index.notifyBLECharacteristicValueChange({
        state: true,
        // 启用 notify 功能
        // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
        deviceId,
        // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
        serviceId,
        // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
        characteristicId,
        success(res) {
          console.log("notifyBLECharacteristicValueChange success:" + res.errMsg);
          console.log(JSON.stringify(res));
        }
      });
    },
    /**
     * 	断开蓝牙模块
     */
    closeBluetoothAdapter(OBJECT) {
      common_vendor.index.closeBluetoothAdapter({
        success: (res) => {
          console.log("断开蓝牙模块成功");
          this.isStop = true;
          this.$set(this.disabled, 0, false);
          this.$set(this.disabled, 1, true);
          this.$set(this.disabled, 2, true);
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, true);
          this.$set(this.disabled, 6, true);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.$set(this.disabled, 9, true);
          this.$set(this.disabled, 10, true);
          this.equipment = [];
          this.servicesData = [];
          this.characteristicsData = [];
          this.valueChangeData = {};
          this.adapterState = [];
          this.searchLoad = false;
          toast("断开蓝牙模块");
        }
      });
    }
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
    b: $data.disabled[0],
    c: common_vendor.o((...args) => $options.openBluetoothAdapter && $options.openBluetoothAdapter(...args)),
    d: !$data.adapterState.available
  }, !$data.adapterState.available ? {
    e: common_vendor.t("蓝牙适配器不可用,请初始化蓝牙模块")
  } : {}, {
    f: $data.searchLoad,
    g: $data.disabled[1],
    h: common_vendor.o((...args) => $options.startBluetoothDevicesDiscovery && $options.startBluetoothDevicesDiscovery(...args)),
    i: $data.disabled[2],
    j: common_vendor.o(($event) => $options.stopBluetoothDevicesDiscovery(false)),
    k: $data.newDeviceLoad,
    l: $data.disabled[3],
    m: common_vendor.o((...args) => $options.queryDevices && $options.queryDevices(...args)),
    n: $data.equipment.length > 0
  }, $data.equipment.length > 0 ? {
    o: common_vendor.t(($data.connected ? "已连接设备" : "已选择设备") + " : " + $data.equipment[0].name + " (" + $data.equipment[0].deviceId + ")")
  } : {}, {
    p: $data.disabled[4],
    q: common_vendor.o((...args) => $options.createBLEConnection && $options.createBLEConnection(...args)),
    r: $data.disabled[5],
    s: common_vendor.o((...args) => $options.getBLEDeviceServices && $options.getBLEDeviceServices(...args)),
    t: $data.servicesData.length > 0
  }, $data.servicesData.length > 0 ? {
    v: common_vendor.t($data.servicesData[0].uuid)
  } : {}, {
    w: $data.disabled[6],
    x: common_vendor.o((...args) => $options.getBLEDeviceCharacteristics && $options.getBLEDeviceCharacteristics(...args)),
    y: $data.characteristicsData.length > 0
  }, $data.characteristicsData.length > 0 ? {
    z: common_vendor.t($data.characteristicsData[0].uuid),
    A: common_vendor.t($data.characteristicsData[0].properties.read),
    B: common_vendor.t($data.characteristicsData[0].properties.write),
    C: common_vendor.t($data.characteristicsData[0].properties.notify),
    D: common_vendor.t($data.characteristicsData[0].properties.indicate)
  } : {}, {
    E: $data.disabled[9],
    F: common_vendor.o((...args) => $options.closeBLEConnection && $options.closeBLEConnection(...args)),
    G: $data.disabled[10],
    H: common_vendor.o((...args) => $options.closeBluetoothAdapter && $options.closeBluetoothAdapter(...args)),
    I: $data.maskShow
  }, $data.maskShow ? {
    J: common_vendor.t($data.list.length),
    K: common_vendor.t($data.showMaskType === "device" ? "台设备" : "个服务"),
    L: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e($data.showMaskType === "device" ? {
        a: common_vendor.t(item.name || item.localName),
        b: common_vendor.t(item.RSSI),
        c: common_vendor.t(item.deviceId)
      } : {}, $data.showMaskType === "service" ? common_vendor.e({
        d: common_vendor.t(item.uuid),
        e: $data.showMaskType === "service"
      }, $data.showMaskType === "service" ? {
        f: common_vendor.t(item.isPrimary ? "（主服务）" : "")
      } : {}) : {}, $data.showMaskType === "characteristics" ? {
        g: common_vendor.t(item.uuid),
        h: common_vendor.t(item.properties.read),
        i: common_vendor.t(item.properties.write),
        j: common_vendor.t(item.properties.notify),
        k: common_vendor.t(item.properties.indicate)
      } : {}, {
        l: index,
        m: common_vendor.o(($event) => $options.tapQuery(item), index)
      });
    }),
    M: $data.showMaskType === "device",
    N: $data.showMaskType === "service",
    O: $data.showMaskType === "characteristics",
    P: common_vendor.o((...args) => $options.moveHandle && $options.moveHandle(...args)),
    Q: common_vendor.o((...args) => $options.moveHandle && $options.moveHandle(...args)),
    R: common_vendor.o((...args) => $options.moveHandle && $options.moveHandle(...args)),
    S: common_vendor.o((...args) => $options.maskclose && $options.maskclose(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
