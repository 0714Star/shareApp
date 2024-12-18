"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    function sendMessage() {
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.messages, (msg, index, i0) => {
          return {
            a: common_vendor.t(msg.content),
            b: common_vendor.n(msg.type),
            c: index
          };
        }),
        b: common_vendor.o(sendMessage),
        c: _ctx.newMessage,
        d: common_vendor.o(($event) => _ctx.newMessage = $event.detail.value),
        e: common_vendor.o(sendMessage)
      };
    };
  }
};
wx.createPage(_sfc_main);
