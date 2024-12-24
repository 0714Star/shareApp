"use strict";
const common_vendor = require("../common/vendor.js");
const store_modules_stompWebsocket = require("./modules/stomp-websocket.js");
const store_modules_userModule = require("./modules/userModule.js");
const store = common_vendor.createStore({
  modules: {
    wsModule: store_modules_stompWebsocket.wsModule,
    userModule: store_modules_userModule.userModule
  }
});
exports.store = store;
