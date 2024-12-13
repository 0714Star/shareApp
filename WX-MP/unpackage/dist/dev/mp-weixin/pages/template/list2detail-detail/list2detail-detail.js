"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_htmlParser = require("../../../common/html-parser.js");
const DETAIL_PAGE_PATH = "/pages/template/list2detail-detail/list2detail-detail";
function _handleShareChannels(provider) {
  let channels = [];
  for (let i = 0, len = provider.length; i < len; i++) {
    switch (provider[i]) {
      case "weixin":
        channels.push({
          text: "分享到微信好友",
          id: "weixin",
          sort: 0
        });
        channels.push({
          text: "分享到微信朋友圈",
          id: "weixin",
          sort: 1
        });
        break;
    }
  }
  channels.sort(function(x, y) {
    return x.sort - y.sort;
  });
  return channels;
}
const _sfc_main = {
  data() {
    return {
      title: "",
      banner: {},
      htmlNodes: []
    };
  },
  onLoad(event) {
    const payload = event.detailDate || event.payload;
    try {
      this.banner = JSON.parse(decodeURIComponent(payload));
    } catch (error) {
      this.banner = JSON.parse(payload);
    }
    common_vendor.index.setNavigationBarTitle({
      title: this.banner.title
    });
    this.getDetail();
  },
  onShareAppMessage() {
    return {
      title: this.banner.title,
      path: DETAIL_PAGE_PATH + "?detailDate=" + JSON.stringify(this.banner)
    };
  },
  onNavigationBarButtonTap(event) {
    const buttonIndex = event.index;
    if (buttonIndex === 0) {
      common_vendor.index.getProvider({
        service: "share",
        success: (result) => {
          if (result.provider && result.provider.length && ~result.provider.indexOf("weixin")) {
            const channels = _handleShareChannels(result.provider);
            common_vendor.index.showActionSheet({
              itemList: channels.map((channel) => {
                return channel.text;
              }),
              success: (result2) => {
                const tapIndex = result2.tapIndex;
                common_vendor.index.share({
                  provider: "weixin",
                  type: 0,
                  title: this.banner.title,
                  scene: tapIndex === 0 ? "WXSceneSession" : "WXSceneTimeline",
                  href: "https://uniapp.dcloud.io/h5" + DETAIL_PAGE_PATH + "?detailDate=" + JSON.stringify(this.banner),
                  imageUrl: "https://web-assets.dcloud.net.cn/unidoc/zh/share-logo@3.png"
                });
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "未检测到可用的微信分享服务"
            });
          }
        },
        fail: (error) => {
          common_vendor.index.showToast({
            title: "获取分享服务失败"
          });
        }
      });
    }
  },
  methods: {
    getDetail() {
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + this.banner.post_id,
        success: (data) => {
          if (data.statusCode == 200) {
            var htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, '<img style="display:none;"');
            this.htmlNodes = common_htmlParser.parseHtml(htmlString);
          }
        },
        fail: () => {
          console.log("fail");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.banner.cover,
    b: common_vendor.t($data.banner.title),
    c: common_vendor.t($data.banner.author_name),
    d: common_vendor.t($data.banner.published_at),
    e: $data.htmlNodes,
    f: $data.htmlNodes.length > 0
  }, $data.htmlNodes.length > 0 ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
