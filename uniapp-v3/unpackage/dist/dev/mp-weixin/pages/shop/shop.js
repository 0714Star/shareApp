"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      // 数据表名
      collection: "opendb-news-articles",
      // 查询字段，多个字段用 , 分割
      field: "_id,mode,avatar,title,user_name,excerpt,last_modify_date",
      formData: {
        status: "loading"
        // 加载状态
      },
      tipShow: false
      // 是否显示顶部提示框
    };
  },
  onLoad() {
  },
  methods: {
    load(data, ended) {
      if (ended) {
        this.formData.status = "noMore";
      }
    }
  },
  /**
   * 下拉刷新回调函数
   */
  onPullDownRefresh() {
    this.formData.status = "more";
    this.$refs.udb.loadData({
      clear: true
    }, () => {
      this.tipShow = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tipShow = false;
      }, 1e3);
      common_vendor.index.stopPullDownRefresh();
    });
  },
  /**
   * 上拉加载回调函数
   */
  onReachBottom() {
    this.$refs.udb.loadMore();
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_load_more2 + _easycom_unicloud_db2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_load_more + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.tipShow ? 1 : "",
    b: common_vendor.w(({
      data,
      loading,
      error,
      options
    }, s0, i0) => {
      return common_vendor.e({
        a: common_vendor.f(data, (item, k1, i1) => {
          return {
            a: common_vendor.t(item.title),
            b: item.avatar.length > 3 ? item.avatar : item.avatar[0],
            c: common_vendor.t(item.excerpt),
            d: common_vendor.t(item.user_name),
            e: common_vendor.t(item.last_modify_date),
            f: item.id,
            g: "741a63a2-2-" + i0 + "-" + i1 + "," + ("741a63a2-1-" + i0),
            h: common_vendor.p({
              direction: "column",
              to: "/pages/detail/detail?id=" + item._id + "&title=" + item.title
            })
          };
        }),
        b: "741a63a2-1-" + i0 + ",741a63a2-0",
        c: loading || options.status === "noMore"
      }, loading || options.status === "noMore" ? {
        d: "741a63a2-3-" + i0 + ",741a63a2-0",
        e: common_vendor.p({
          status: options.status
        })
      } : {}, {
        f: i0,
        g: s0
      });
    }, {
      name: "d",
      path: "b",
      vueId: "741a63a2-0"
    }),
    c: common_vendor.sr("udb", "741a63a2-0"),
    d: common_vendor.o($options.load),
    e: common_vendor.p({
      options: $data.formData,
      collection: $data.collection,
      field: $data.field
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
