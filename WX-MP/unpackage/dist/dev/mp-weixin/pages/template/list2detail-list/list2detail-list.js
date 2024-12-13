"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_util = require("../../../common/util.js");
const _sfc_main = {
  data() {
    return {
      banner: {},
      listData: [],
      last_id: "",
      reload: false,
      status: "more",
      adpid: "",
      contentText: {
        contentdown: "上拉加载更多",
        contentrefresh: "加载中",
        contentnomore: "没有更多"
      }
    };
  },
  onLoad() {
    this.adpid = this.$adpid;
    this.getBanner();
    this.getList();
  },
  onPullDownRefresh() {
    this.reload = true;
    this.last_id = "";
    this.getBanner();
    this.getList();
  },
  onReachBottom() {
    this.status = "more";
    this.getList();
  },
  methods: {
    getBanner() {
      let data = {
        column: "id,post_id,title,author_name,cover,published_at"
        //需要的字段名
      };
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/banner/36kr",
        data,
        success: (data2) => {
          common_vendor.index.stopPullDownRefresh();
          if (data2.statusCode == 200) {
            this.banner = data2.data;
          }
        },
        fail: (data2, code) => {
          console.log("fail" + JSON.stringify(data2));
        }
      });
    },
    getList() {
      var data = {
        column: "id,post_id,title,author_name,cover,published_at"
        //需要的字段名
      };
      if (this.last_id) {
        this.status = "loading";
        data.minId = this.last_id;
        data.time = (/* @__PURE__ */ new Date()).getTime() + "";
        data.pageSize = 10;
      }
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/news",
        data,
        success: (data2) => {
          if (data2.statusCode == 200) {
            let list = this.setTime(data2.data);
            this.listData = this.reload ? list : this.listData.concat(list);
            this.last_id = list[list.length - 1].id;
            this.reload = false;
          }
        },
        fail: (data2, code) => {
          console.log("fail" + JSON.stringify(data2));
        }
      });
    },
    goDetail: function(e) {
      let detail = {
        author_name: e.author_name,
        cover: e.cover,
        id: e.id,
        post_id: e.post_id,
        published_at: e.published_at,
        title: e.title
      };
      common_vendor.index.navigateTo({
        url: "../list2detail-detail/list2detail-detail?detailDate=" + encodeURIComponent(JSON.stringify(detail))
      });
    },
    setTime: function(items) {
      var newItems = [];
      items.forEach((e) => {
        newItems.push({
          author_name: e.author_name,
          cover: e.cover,
          id: e.id,
          post_id: e.post_id,
          published_at: common_util.dateUtils.format(e.published_at),
          title: e.title
        });
      });
      return newItems;
    },
    aderror(e) {
      console.log("aderror: " + JSON.stringify(e.detail));
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.banner.cover,
    b: common_vendor.t($data.banner.title),
    c: common_vendor.o(($event) => $options.goDetail($data.banner)),
    d: common_vendor.f($data.listData, (value, index, i0) => {
      return {
        a: value.cover,
        b: common_vendor.t(value.title),
        c: common_vendor.t(value.author_name),
        d: common_vendor.t(value.published_at),
        e: common_vendor.o(($event) => $options.goDetail(value), index),
        f: index
      };
    }),
    e: common_vendor.p({
      status: $data.status,
      ["icon-size"]: 16,
      ["content-text"]: $data.contentText
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
