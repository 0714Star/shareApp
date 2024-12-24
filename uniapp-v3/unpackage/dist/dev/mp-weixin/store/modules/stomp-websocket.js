"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_ws_index = require("../../utils/ws/index.js");
const utils_CONSTANTS = require("../../utils/CONSTANTS.js");
const utils_api_axios = require("../../utils/api/axios.js");
const wsModule = {
  namespaced: true,
  //  启用命名空间
  // 创建一个store 
  // 全局状态
  state: () => common_vendor.index.getStorageSync("state") ? {
    ...JSON.parse(common_vendor.index.getStorageSync("state")),
    my_ws: null
  } : {
    curUser: common_vendor.index.getStorageSync(utils_CONSTANTS.USERINFO_KEY),
    sessions: {},
    // 聊天记录
    talkLists: [],
    //  消息列表
    currentSession: { username: "群聊", nickname: "群聊" },
    // 当前选中的用户
    stomp: null,
    // 当前stomp端点
    isDot: {},
    //  用户之间是否有未读信息
    my_ws: null
    // myWs
  },
  // 同步方法 使用 store.commit('',args) 调用同步方法
  mutations: {
    // 初始化用户信息
    INIT_DATA(state) {
      console.log("INIT_DATA");
      state.curUser = common_vendor.index.getStorageSync(utils_CONSTANTS.USERINFO_KEY);
      utils_api_axios.instance.get("/tkTalkList/selectById/" + state.curUser.userId).then((res) => {
        state.talkLists = [...res.data];
        console.log(" ");
      });
    },
    // 切换聊天框  :iState 
    changeCurrentSession(state, currentSession) {
      state.currentSession = currentSession;
    },
    /** 保存群聊消息 msg为消息内容 */
    addGroupMessage(state, msg2) {
      let to_group_message = {
        message_type_id: 1,
        // 消息类型ID ：1 文本 | 2 图片 | 3 文件
        from_id: state.curUser.user_id,
        // 当前用户ID
        to_id: state.currentSession.to_id,
        // 群聊ID
        content: msg2,
        from_nickname: state.curUser.nickName,
        from_user_profile: state.curUser.avatar
      };
      state.stomp.send("app/publicMessage", {}, to_group_message);
    },
    /** 保存私聊消息 */
    addPrivateMessage(state, msg2) {
      const testMessage = new Object();
      testMessage.fromId = 1;
      testMessage.toId = 2;
      testMessage.content = "你好!";
      state.stomp.send("/app/privateMessage", {}, JSON.stringify(testMessage));
    },
    /**
     * 发送消息
     * @param {Object} context
     */
    sendMessage(state, destination, originMsg) {
      if (state.my_ws.socketConnected) {
        let curSession = state.currentSession;
        curSession.messageList.push(msg);
        let messgae2 = {
          from_id: 1,
          to_id: 2,
          content: "你好！"
        };
        state.stomp.send("/app/privateMessage", {}, messgae2);
      } else {
        state.my_ws.messageQueue.push({
          destination: "app/privateMessage",
          // 发送的目的地
          message: JSON.stringify(messgae)
        });
      }
    }
  },
  // 异步方法 使用 store.dispatch('',args)，调用异步方法方法
  actions: {
    /**
     * 实现连接服务器连接和消息订阅
     * @param {Object} context
     */
    connect(context) {
      const headers = {};
      let my_ws = new utils_ws_index.myWs();
      context.state.my_ws = my_ws;
      function connect_ws() {
        common_vendor.wx$1.connectSocket({
          url: utils_CONSTANTS.WEBSOCKET_BASEURL,
          token: "temp-token"
        });
      }
      connect_ws();
      common_vendor.wx$1.onSocketOpen(function(res) {
        console.log("WebSocket 连接成功");
        my_ws.socketConnected = true;
        my_ws.onopen();
        console.log(my_ws.reconnect);
        let queueLength = my_ws.messageQueue.length;
        for (let i = 0; i < queueLength; i++) {
          my_ws.send(my_ws.messageQueue.shift());
        }
        context.commit("INIT_DATA");
      });
      common_vendor.wx$1.onSocketMessage(function(res) {
        my_ws.onmessage(res);
      });
      common_vendor.wx$1.onSocketError(function(res) {
        console.log("WebSocket 错误事件");
        if (!my_ws.socketConnected) {
          if (my_ws.reconnect) {
            connect_ws();
          }
        }
      });
      common_vendor.wx$1.onSocketClose(function(res) {
        console.log("WebSocket 连接关闭");
        my_ws.socketConnected = false;
        if (my_ws.reconnect) {
          connect_ws();
        }
      });
      common_vendor.Stomp.setInterval = function(interval, f) {
        return setInterval(f, interval);
      };
      common_vendor.Stomp.clearInterval = function(id) {
        return clearInterval(id);
      };
      context.state.stomp = common_vendor.Stomp.over(my_ws);
      context.state.stomp.connect(
        headers,
        (success) => {
          console.log("连接成功", success);
          context.state.stomp.subscribe("/topic/notification", (msg2) => {
          });
          context.state.stomp.subscribe("/topic/message", (msg2) => {
            let receiveMsg = JSON.parse(msg2.body);
            console.log(receiveMsg);
            if (context.state.currentSession.to_id != receiveMsg.group_id)
              ;
            context.commit("addGroupMessage", receiveMsg);
          });
          context.state.stomp.subscribe("/private/all/2", (msg2) => {
            console.log("receiveMsg:", msg2);
            let receiveMsg = JSON.parse(msg2.body);
            if (!context.state.currentSession || receiveMsg.from_id != context.state.currentSession.from_id)
              ;
          });
        },
        (error) => {
          console.log("连接失败 :", error);
        }
      );
    },
    /**
     * 断开websocket连接 :iState
     * @param {Object} context
     */
    disconnect(context) {
      if (context.state.stomp != null) {
        context.stomp.disconnect();
      }
    }
  },
  // 计算属性
  getters: {}
};
exports.wsModule = wsModule;
