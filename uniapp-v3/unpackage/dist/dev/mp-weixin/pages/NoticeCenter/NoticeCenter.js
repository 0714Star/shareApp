"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "NoticeCenter",
  setup(__props) {
    function loadChatDetail(userid) {
      let t = 12;
      return t + 12;
    }
    let contactsList = [
      {
        username: "熊浩毅",
        nickname: "熊bb",
        userid: 1,
        avatar: "http://192.168.123.203:24123/images/xbb.jpg",
        time: "2024-12-16 22:45",
        endMessage: "你好",
        unreadnumber: 1
      },
      {
        username: "叶子彤",
        nickname: "小彤饱饱",
        userid: 2,
        avatar: "http://192.168.123.203:24123/images/xtbb.jpg",
        time: "2024-12-16 22:44",
        endMessage: "你好！41",
        unreadnumber: 12
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(contactsList), (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => loadChatDetail(item.userid)),
            b: "168d8e02-1-" + i0 + "," + ("168d8e02-0-" + i0),
            c: common_vendor.p({
              ["avatar-circle"]: true,
              title: item.username,
              clickable: true,
              avatar: item.avatar,
              time: item.time ? item.time : null,
              note: item.endMessage,
              ["badge-positon"]: "left",
              ["badge-text"]: item.unreadnumber,
              link: "navigateTo",
              to: "/pages/NoticeCenter/chat/chat"
            }),
            d: "168d8e02-0-" + i0
          };
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
