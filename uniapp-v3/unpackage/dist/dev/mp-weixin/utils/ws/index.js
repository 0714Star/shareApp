"use strict";
const common_vendor = require("../../common/vendor.js");
class myWs {
  constructor() {
    this.that = this;
    this.socketConnected = false;
    this.messageQueue = [];
    this.reconnect = true;
  }
  // 发送消息
  send(msg) {
    if (this.socketConnected) {
      common_vendor.wx$1.sendSocketMessage({
        data: msg
      });
    } else {
      messageQueue.push(msg);
    }
  }
  // 关闭连接
  close() {
    if (socketConnected) {
      common_vendor.wx$1.closeSocket();
      socketConnected = false;
    }
  }
}
exports.myWs = myWs;
