"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const uniAiMsg = () => "./components/uni-ai-msg/uni-ai-msg.js";
let sseChannel = false;
let skip_callback = false;
const _sfc_main = {
  components: {
    uniAiMsg
  },
  data() {
    return {
      scrollIntoView: "",
      msgList: [],
      content: "",
      sseIndex: 0,
      stream: true,
      isWidescreen: false,
      adpid: null
    };
  },
  computed: {
    inputBoxDisabled() {
      if (this.sseIndex !== 0) {
        return true;
      }
      return !!(this.msgList.length && this.msgList.length % 2 !== 0);
    },
    placeholderText() {
      if (this.inputBoxDisabled) {
        return "uni-ai正在回复中";
      } else {
        return "请输入要发给uni-ai的内容";
      }
    },
    NODE_ENV() {
      return "development";
    }
  },
  watch: {
    msgList: {
      handler(msgList) {
        common_vendor.index.setStorageSync("uni-ai-msg", msgList);
      },
      deep: true
    }
  },
  async mounted() {
    if (this.adpid && common_vendor.Zs.getCurrentUserInfo().tokenExpired > Date.now()) {
      let db = common_vendor.Zs.databaseForJQL();
      let res = await db.collection("uni-id-users").where({
        "_id": common_vendor.Zs.getCurrentUserInfo().uid
      }).field("score").get();
      console.log("当前用户有多少积分:", res.data[0] && res.data[0].score);
    }
    this.msgList = common_vendor.index.getStorageSync("uni-ai-msg") || [];
    let length = this.msgList.length;
    if (length) {
      let lastMsg = this.msgList[length - 1];
      if (!lastMsg.isAi) {
        this.retriesSendMsg();
      }
    }
    this.showLastMsg();
  },
  // onUnload() {
  // 	if(sseChannel){
  // 		console.log('onUnload','sseChannel.close()');
  // 		sseChannel.close()
  // 	}
  // },
  methods: {
    //检查是否开通uni-push;决定是否启用stream
    async checkIsOpenPush() {
      try {
        await common_vendor.index.getPushClientId();
        this.checkIsOpenPush = () => {
        };
      } catch (err) {
        this.stream = false;
      }
    },
    updateLastMsg(param) {
      let length = this.msgList.length;
      if (length === 0) {
        return;
      }
      let lastMsg = this.msgList[length - 1];
      if (typeof param == "function") {
        let callback = param;
        callback(lastMsg);
      } else {
        const [data, cover = false] = arguments;
        if (cover) {
          lastMsg = data;
        } else {
          lastMsg = Object.assign(lastMsg, data);
        }
      }
      this.msgList.splice(length - 1, 1, lastMsg);
    },
    onAdClose(e) {
      if (e.detail.isEnded) {
        let i = 0;
        common_vendor.index.showLoading({ mask: true });
        let myIntive = setInterval(async (e2) => {
          i++;
          const db = common_vendor.Zs.database();
          let res = await db.collection("uni-id-users").where('"_id" == $cloudEnv_uid').field("score").get();
          let { score } = res.result.data[0] || {};
          if (score > 0 || i > 5) {
            clearInterval(myIntive);
            common_vendor.index.hideLoading();
            if (score > 0) {
              this.msgList.pop();
              this.$nextTick(() => {
                this.retriesSendMsg();
                common_vendor.index.showToast({
                  title: "积分余额:" + score,
                  icon: "none"
                });
              });
            }
          }
        }, 2e3);
      }
    },
    async retriesSendMsg() {
      await this.checkIsOpenPush();
      this.updateLastMsg({ state: 0 });
      this.send();
    },
    async beforeSendMsg() {
      if (this.adpid) {
        let token = common_vendor.index.getStorageSync("uni_id_token");
        if (!token) {
          return common_vendor.index.showModal({
            content: "启用激励视频，客户端需登录并启用安全网络",
            showCancel: false,
            confirmText: "查看详情",
            complete() {
              let url = "https://uniapp.dcloud.net.cn/uniCloud/uni-ai-chat.html#ad";
              common_vendor.index.setClipboardData({
                data: url,
                showToast: false,
                success() {
                  common_vendor.index.showToast({
                    title: "已复制文档链接，请到浏览器粘贴浏览",
                    icon: "none",
                    duration: 5e3
                  });
                }
              });
            }
          });
        }
      }
      await this.checkIsOpenPush();
      if (!this.content) {
        return common_vendor.index.showToast({
          title: "内容不能为空",
          icon: "none"
        });
      }
      this.msgList.push({
        isAi: false,
        content: this.content,
        state: 0,
        create_time: Date.now()
      });
      this.showLastMsg();
      this.$nextTick(() => {
        this.content = "";
      });
      this.send();
    },
    async send() {
      let messages = [];
      let msgs = JSON.parse(JSON.stringify(this.msgList));
      let findIndex = [...msgs].reverse().findIndex((item) => item.summarize);
      if (findIndex != -1) {
        let aiSummaryIndex = msgs.length - findIndex - 1;
        msgs[aiSummaryIndex].content = msgs[aiSummaryIndex].summarize;
        msgs = msgs.splice(aiSummaryIndex, msgs.length - 1);
      } else {
        msgs = msgs.splice(-10);
      }
      msgs = msgs.filter((msg) => !msg.illegal);
      messages = msgs.map((item) => {
        let role = "user";
        if (item.isAi) {
          role = item.summarize ? "system" : "assistant";
        }
        return {
          content: item.content,
          role
        };
      });
      if (this.stream) {
        sseChannel = new common_vendor.Zs.SSEChannel();
        sseChannel.on("message", (message) => {
          if (this.sseIndex === 0) {
            this.msgList.push({
              isAi: true,
              content: message,
              create_time: Date.now()
            });
            this.showLastMsg();
          } else {
            this.updateLastMsg((lastMsg) => {
              lastMsg.content += message;
            });
            this.showLastMsg();
          }
          this.sseIndex++;
        });
        sseChannel.on("end", (e) => {
          if (e && (e.summarize || e.insufficientScore)) {
            this.updateLastMsg((lastMsg) => {
              if (e.summarize) {
                lastMsg.summarize = e.summarize;
              } else if (e.insufficientScore) {
                lastMsg.insufficientScore;
              }
            });
          }
          this.sseIndex = 0;
          this.showLastMsg();
        });
        await sseChannel.open();
      }
      skip_callback = false;
      const uniAiChat = common_vendor.Zs.importObject("uni-ai-chat", {
        customUI: true
      });
      uniAiChat.send({
        messages,
        sseChannel
      }).then((res) => {
        this.updateLastMsg({ state: 100 });
        if (!sseChannel) {
          if (!skip_callback) {
            let { "reply": content, summarize, insufficientScore, illegal } = res.data;
            if (illegal) {
              this.updateLastMsg({ illegal: true });
            }
            this.msgList.push({
              create_time: Date.now(),
              isAi: true,
              content,
              summarize,
              insufficientScore,
              illegal
            });
            this.showLastMsg();
          } else {
            console.log("用户点击了清空按钮，跳过前一次请求的回调", res.data.reply);
          }
        }
      }).catch((e) => {
        console.log(e);
        let l = this.msgList.length;
        console.log(l, this.msgList[l - 1]);
        if (l && sseChannel && this.msgList[l - 1].isAi) {
          this.sseIndex = 0;
        }
        this.updateLastMsg({ state: -100 });
        common_vendor.index.showModal({
          content: JSON.stringify(e.message),
          showCancel: false
        });
      });
    },
    showLastMsg() {
      this.$nextTick(() => {
        this.scrollIntoView = "last-msg-item";
        this.$nextTick(() => {
          this.scrollIntoView = "";
        });
      });
    },
    msgStateIcon(msg) {
      switch (msg.state) {
        case 0:
          return "spinner-cycle";
        case -100:
          return "refresh-filled";
        case -200:
          return "info-filled";
        default:
          return false;
      }
    },
    clear() {
      common_vendor.index.showModal({
        title: "确认要清空聊天记录？",
        content: "本操作不可撤销",
        complete: (e) => {
          if (e.confirm) {
            if (sseChannel) {
              sseChannel.close();
            }
            skip_callback = true;
            this.sseIndex = 0;
            this.msgList = [];
          }
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_uni_ai_msg = common_vendor.resolveComponent("uni-ai-msg");
  const _component_uni_ad_rewarded_video = common_vendor.resolveComponent("uni-ad-rewarded-video");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  (_easycom_uni_dateformat2 + _component_uni_ai_msg + _component_uni_ad_rewarded_video + _easycom_uni_icons2 + _easycom_uni_link2)();
}
const _easycom_uni_dateformat = () => "../../../uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_link = () => "../../../uni-link/components/uni-link/uni-link.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_uni_icons + _easycom_uni_link)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.msgList.length === 0
  }, $data.msgList.length === 0 ? {} : {}, {
    b: common_vendor.f($data.msgList, (msg, index, i0) => {
      return common_vendor.e({
        a: "1ebf71cd-0-" + i0,
        b: common_vendor.p({
          date: msg.create_time,
          format: "MM/dd hh:mm:ss"
        }),
        c: msg.isAi
      }, msg.isAi ? {
        d: require("./static/uni-ai.png")
      } : {
        e: require("./static/avatar.png")
      }, {
        f: "1ebf71cd-1-" + i0,
        g: common_vendor.p({
          md: msg.content,
          ["show-cursor"]: index == $data.msgList.length - 1 && msg.isAi && $data.sseIndex
        }),
        h: index == $data.msgList.length - 1 && $data.adpid && msg.insufficientScore
      }, index == $data.msgList.length - 1 && $data.adpid && msg.insufficientScore ? {
        i: common_vendor.o($options.onAdClose, index),
        j: "1ebf71cd-2-" + i0,
        k: common_vendor.p({
          adpid: $data.adpid
        })
      } : {}, {
        l: index == $data.msgList.length - 1 && !msg.isAi && msg.state != 100 && $options.msgStateIcon(msg)
      }, index == $data.msgList.length - 1 && !msg.isAi && msg.state != 100 && $options.msgStateIcon(msg) ? {
        m: common_vendor.o(($event) => msg.state == -100 ? $options.retriesSendMsg() : "", index),
        n: "1ebf71cd-3-" + i0,
        o: common_vendor.p({
          color: msg.state === 0 ? "#999" : "#d22",
          type: $options.msgStateIcon(msg)
        })
      } : {}, {
        p: !msg.isAi ? 1 : "",
        q: index
      });
    }),
    c: $data.msgList.length && $data.msgList.length % 2 !== 0
  }, $data.msgList.length && $data.msgList.length % 2 !== 0 ? common_vendor.e({
    d: $options.NODE_ENV == "development" && !$data.stream
  }, $options.NODE_ENV == "development" && !$data.stream ? {
    e: common_vendor.p({
      href: "https://uniapp.dcloud.net.cn/uniCloud/uni-ai-chat.html",
      text: "[流式响应]"
    })
  } : {}) : {}, {
    f: $data.scrollIntoView,
    g: $data.isWidescreen
  }, $data.isWidescreen ? {
    h: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    i: common_assets._imports_0$2
  } : {}, {
    j: !$data.isWidescreen
  }, !$data.isWidescreen ? {
    k: common_vendor.o($options.clear),
    l: common_vendor.p({
      type: "trash",
      size: "24",
      color: "#888"
    })
  } : {}, {
    m: !$data.isWidescreen,
    n: $options.inputBoxDisabled,
    o: $options.placeholderText,
    p: -1,
    q: common_vendor.o((...args) => $options.beforeSendMsg && $options.beforeSendMsg(...args)),
    r: $data.content,
    s: common_vendor.o(($event) => $data.content = $event.detail.value),
    t: $data.isWidescreen
  }, $data.isWidescreen ? {} : {}, {
    v: common_vendor.o((...args) => $options.beforeSendMsg && $options.beforeSendMsg(...args)),
    w: $options.inputBoxDisabled || !$data.content
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1ebf71cd"]]);
wx.createComponent(Component);
