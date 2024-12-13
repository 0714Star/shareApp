"use strict";
const common_vendor = require("../../../common/vendor.js");
const mediaItem = () => "./news-item.js";
const MAX_CACHE_DATA = 100;
const MAX_CACHE_PAGE = 3;
const newsData = {
  data0: {
    "datetime": "40分钟前",
    "article_type": 0,
    "title": "uni-app行业峰会频频亮相，开发者反响热烈!",
    "source": "DCloud",
    "comment_count": 639
  },
  data1: {
    "datetime": "一天前",
    "article_type": 1,
    "title": "DCloud完成B2轮融资，uni-app震撼发布!",
    "image_url": "https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao-small.jpg",
    "source": "DCloud",
    "comment_count": 11395
  },
  data2: {
    "datetime": "一天前",
    "article_type": 2,
    "title": "中国技术界小奇迹：HBuilder开发者突破200万",
    "image_url": "https://web-assets.dcloud.net.cn/unidoc/zh/muwu-samll.jpg",
    "source": "DCloud",
    "comment_count": 11395
  },
  data3: {
    "article_type": 3,
    "image_list": [{
      "url": "https://web-assets.dcloud.net.cn/unidoc/zh/cbd%20-small.jpg",
      "width": 563,
      "height": 316
    }, {
      "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4cd3000-517d-11eb-a16f-5b3e54966275.jpg",
      "width": 641,
      "height": 360
    }, {
      "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
      "width": 640,
      "height": 360
    }],
    "datetime": "5分钟前",
    "title": "uni-app 支持使用 npm 安装第三方包，生态更趋丰富",
    "source": "DCloud",
    "comment_count": 11
  },
  data4: {
    "datetime": "2小时前",
    "article_type": 4,
    "title": "uni-app 支持原生小程序自定义组件，更开放、更自由",
    "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b2e201d0-517d-11eb-8a36-ebb87efcf8c0.jpg",
    "source": "DCloud",
    "comment_count": 69
  }
};
const _sfc_main = {
  components: {
    mediaItem
  },
  data() {
    return {
      newsList: [],
      cacheTab: [],
      tabIndex: 0,
      tabBars: [{
        name: "关注",
        id: "guanzhu"
      }, {
        name: "推荐",
        id: "tuijian"
      }, {
        name: "体育",
        id: "tiyu"
      }, {
        name: "热点",
        id: "redian"
      }, {
        name: "财经",
        id: "caijing"
      }, {
        name: "娱乐",
        id: "yule"
      }, {
        name: "军事",
        id: "junshi"
      }, {
        name: "历史",
        id: "lishi"
      }, {
        name: "本地",
        id: "bendi"
      }],
      scrollInto: "",
      showTips: false,
      navigateFlag: false,
      pulling: false,
      refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="
    };
  },
  onLoad() {
    setTimeout(() => {
      this.tabBars.forEach((tabBar) => {
        this.newsList.push({
          data: [],
          isLoading: false,
          refreshText: "",
          loadingText: "加载更多..."
        });
      });
      this.getList(0);
    }, 350);
  },
  methods: {
    getList(index) {
      let activeTab = this.newsList[index];
      let list = [];
      for (let i = 1; i <= 10; i++) {
        let item = Object.assign({}, newsData["data" + Math.floor(Math.random() * 5)]);
        item.id = this.newGuid();
        list.push(item);
      }
      activeTab.data = activeTab.data.concat(list);
    },
    goDetail(e) {
      if (this.navigateFlag) {
        return;
      }
      this.navigateFlag = true;
      common_vendor.index.navigateTo({
        url: "./detail/detail?title=" + e.title
      });
      setTimeout(() => {
        this.navigateFlag = false;
      }, 200);
    },
    close(index1, index2) {
      common_vendor.index.showModal({
        content: "是否删除本条信息？",
        success: (res) => {
          if (res.confirm) {
            this.newsList[index1].data.splice(index2, 1);
          }
        }
      });
    },
    loadMore(e) {
      setTimeout(() => {
        this.getList(this.tabIndex);
      }, 500);
    },
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    ontabchange(e) {
      let index = e.target.current || e.detail.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.newsList[index].data.length === 0) {
        this.getList(index);
      }
      if (this.tabIndex === index) {
        return;
      }
      if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
        let isExist = this.cacheTab.indexOf(this.tabIndex);
        if (isExist < 0) {
          this.cacheTab.push(this.tabIndex);
        }
      }
      this.tabIndex = index;
      this.scrollInto = this.tabBars[index].id;
      if (this.cacheTab.length > MAX_CACHE_PAGE) {
        let cacheIndex = this.cacheTab[0];
        this.clearTabData(cacheIndex);
        this.cacheTab.splice(0, 1);
      }
    },
    clearTabData(e) {
      this.newsList[e].data.length = 0;
      this.newsList[e].loadingText = "加载更多...";
    },
    refreshData() {
    },
    onrefresh(e) {
      var tab = this.newsList[this.tabIndex];
      if (!tab.refreshFlag) {
        return;
      }
      tab.refreshing = true;
      tab.refreshText = "正在刷新...";
      setTimeout(() => {
        this.refreshData();
        this.pulling = true;
        tab.refreshing = false;
        tab.refreshFlag = false;
        tab.refreshText = "已刷新";
        setTimeout(() => {
          this.pulling = false;
        }, 500);
      }, 2e3);
    },
    onpullingdown(e) {
      var tab = this.newsList[this.tabIndex];
      if (tab.refreshing || this.pulling) {
        return;
      }
      if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
        tab.refreshFlag = true;
        tab.refreshText = "释放立即刷新";
      } else {
        tab.refreshFlag = false;
        tab.refreshText = "下拉可以刷新";
      }
    },
    newGuid() {
      let s4 = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
      };
      return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
    }
  }
};
if (!Array) {
  const _component_media_item = common_vendor.resolveComponent("media-item");
  _component_media_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabBars, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: common_vendor.n($data.tabIndex == index ? "uni-tab-item-title-active" : ""),
        c: tab.id,
        d: tab.id,
        e: index,
        f: common_vendor.o((...args) => $options.ontabtap && $options.ontabtap(...args), tab.id)
      };
    }),
    b: $data.scrollInto,
    c: common_vendor.f($data.newsList, (tab, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.f(tab.data, (newsitem, index2, i1) => {
          return {
            a: common_vendor.o(($event) => $options.close(index1, index2), newsitem.id),
            b: common_vendor.o(($event) => $options.goDetail(newsitem), newsitem.id),
            c: "42bcca3d-0-" + i0 + "-" + i1,
            d: common_vendor.p({
              options: newsitem
            }),
            e: newsitem.id
          };
        }),
        b: tab.isLoading || tab.data.length > 4
      }, tab.isLoading || tab.data.length > 4 ? {
        c: common_vendor.t(tab.loadingText)
      } : {}, {
        d: common_vendor.o(($event) => $options.loadMore(index1), index1),
        e: index1
      });
    }),
    d: $data.tabIndex,
    e: common_vendor.o((...args) => $options.ontabchange && $options.ontabchange(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
