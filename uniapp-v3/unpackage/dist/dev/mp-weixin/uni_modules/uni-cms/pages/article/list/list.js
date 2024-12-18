"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniCms_common_validator_uniCmsArticles = require("../../../common/validator/uni-cms-articles.js");
const uni_modules_uniCms_common_authMixin = require("../../../common/auth-mixin.js");
const uni_modules_uniCms_common_parseImageUrl = require("../../../common/parse-image-url.js");
const db = common_vendor.Zs.database();
const articleDBName = "uni-cms-articles";
const categoryDBName = "uni-cms-categories";
const userDBName = "uni-id-users";
const dbOrderBy = "";
const dbSearchFields = ["title", "excerpt"];
const pageSize = 20;
const pageCurrent = 1;
const orderByMapping = {
  "ascending": "asc",
  "descending": "desc"
};
const _sfc_main = {
  mixins: [uni_modules_uniCms_common_authMixin.authMixin],
  data() {
    return {
      // collectionList 包含了三个对象，每个对象都是一个数据库查询对象，用于联表查询。第一个对象查询文章表，第二个对象查询分类表，第三个对象查询用户表。
      collectionList: [
        db.collection(articleDBName).field("is_admin,user_id,category_id,content,title,excerpt,article_status,view_count,like_count,is_sticky,is_essence,comment_status,comment_count,last_comment_user_id,thumbnail,publish_date,publish_ip,last_modify_date,last_modify_ip").getTemp(),
        db.collection(categoryDBName).field("name as text, _id").getTemp(),
        db.collection(userDBName).field("nickname, _id").getTemp()
      ],
      // 用于存储搜索关键字，用于模糊搜索文章标题和内容。
      query: "",
      // 用于存储查询条件。其中包含了文章状态、分类、关键字等多个查询条件。
      where: "",
      // 用于指定查询结果的排序方式，可以指定一个或多个字段进行排序，也可以指定排序方式（升序或降序）。
      orderby: dbOrderBy,
      // 用于存储当前排序字段名的变量。
      orderByFieldName: "",
      // 存储当前选中的文章的索引值。
      selectedIndexs: [],
      options: {
        pageSize,
        pageCurrent,
        filterData: {
          "article_status_localdata": [
            {
              "value": 0,
              "text": "草稿箱"
            },
            {
              "value": 1,
              "text": "已发布"
            }
          ],
          "comment_status_localdata": [
            {
              "value": 0,
              "text": "关闭"
            },
            {
              "value": 1,
              "text": "开放"
            }
          ],
          categories: []
        },
        ...uni_modules_uniCms_common_validator_uniCmsArticles.enumConverter
      },
      imageStyles: {
        width: 64,
        height: 64
      },
      exportExcel: {
        "filename": "uni-cms-articles.xls",
        "type": "xls",
        "fields": {
          "用户ID": "user_id",
          "分类": "category_id",
          "标题": "title",
          "文章内容": "content",
          "文章摘录": "excerpt",
          "文章状态": "article_status",
          "阅读数量": "view_count",
          "点赞数": "like_count",
          "是否置顶": "is_sticky",
          "阅读加精": "is_essence",
          "开放评论": "comment_status",
          "评论数": "comment_count",
          "最后评论的用户ID": "last_comment_user_id",
          "封面大图": "thumbnail",
          "发表时间": "publish_date",
          "发布文章时IP地址": "publish_ip",
          "最后修改时间": "last_modify_date",
          "最后修改人IP": "last_modify_ip"
        }
      },
      tableList: [],
      exportExcelData: []
    };
  },
  onLoad() {
    this._filter = {};
  },
  onReady() {
    this.$refs.udb.loadData();
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      const { result } = await db.collection(categoryDBName).get();
      if (result) {
        this.options.filterData.categories = result.data.map((item) => {
          return {
            text: item.name,
            value: item._id
          };
        });
      }
    },
    /**
       * 封面预览
       * @param imageList
       */
    previewCover(imageList) {
      common_vendor.index.previewImage({
        current: imageList[0],
        urls: imageList
      });
    },
    // 查询数据加载完成
    async onqueryload(data) {
      let listData = [];
      for (const item of data) {
        if (item.thumbnail && typeof item.thumbnail === "string") {
          item.thumbnail = [item.thumbnail];
        }
        const parseImages = await uni_modules_uniCms_common_parseImageUrl.parseImageUrl(item.thumbnail);
        item.thumbnail = parseImages.map((image) => image.src);
        listData.push(item);
      }
      this.tableList = listData;
      this.exportExcelData = listData;
    },
    // 获取查询条件
    getWhere() {
      const query = this.query.trim();
      if (!query) {
        return "";
      }
      const queryRe = new RegExp(query, "i");
      return dbSearchFields.map((name) => queryRe + ".test(" + name + ")").join(" || ");
    },
    // 查询
    search() {
      const newWhere = this.getWhere();
      this.where = newWhere;
      this.$nextTick(() => {
        this.loadData();
      });
    },
    // 加载数据
    loadData(clear = true) {
      this.$refs.udb.loadData({
        clear
      });
    },
    // 分页改变
    onPageChanged(e) {
      this.selectedIndexs.length = 0;
      this.$refs.table.clearSelection();
      this.$refs.udb.loadData({
        current: e.current
      });
    },
    // 跳转页面
    navigateTo(url, clear) {
      common_vendor.index.navigateTo({
        url,
        events: {
          refreshData: () => {
            this.loadData(clear);
          }
        }
      });
    },
    // 获取选中项
    selectedItems() {
      var dataList = this.$refs.udb.dataList;
      return this.selectedIndexs.map((i) => dataList[i]._id);
    },
    // 批量删除
    delTable() {
      this.$refs.udb.remove(this.selectedItems(), {
        success: (res) => {
          this.$refs.table.clearSelection();
        }
      });
    },
    // 选中项改变
    selectionChange(e) {
      this.selectedIndexs = e.detail.index;
    },
    // 确认删除
    confirmDelete(id) {
      this.$refs.udb.remove(id, {
        success: (res) => {
          this.$refs.table.clearSelection();
        }
      });
    },
    // 排序改变
    sortChange(e, name) {
      this.orderByFieldName = name;
      if (e.order) {
        this.orderby = name + " " + orderByMapping[e.order];
      } else {
        this.orderby = "";
      }
      this.$refs.table.clearSelection();
      this.$nextTick(() => {
        this.$refs.udb.loadData();
      });
    },
    // 筛选改变
    filterChange(e, name) {
      this._filter[name] = {
        type: e.filterType,
        value: e.filter
      };
      const { type, value } = this._filter[name];
      if (type === "range") {
        for (const val of value) {
          if (typeof val === "number" && isNaN(val))
            return;
        }
      }
      let newWhere = uni_modules_uniCms_common_validator_uniCmsArticles.filterToWhere(this._filter, db.command);
      if (Object.keys(newWhere).length) {
        this.where = newWhere;
      } else {
        this.where = "";
      }
      this.$nextTick(() => {
        this.$refs.udb.loadData();
      });
    },
    // 下架文章
    takeOffArticle(id) {
      common_vendor.index.showModal({
        title: "下架文章",
        content: "文章下架后将不会在前台展示，确定下架吗？",
        success: (res) => {
          if (res.confirm) {
            this.$refs.udb.update(id, {
              article_status: 0
            }, {
              success: (res2) => {
                this.$refs.table.clearSelection();
                this.$refs.udb.loadData();
              }
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _component_download_excel = common_vendor.resolveComponent("download-excel");
  const _component_uni_th = common_vendor.resolveComponent("uni-th");
  const _component_uni_tr = common_vendor.resolveComponent("uni-tr");
  const _component_uni_td = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _component_uni_table = common_vendor.resolveComponent("uni-table");
  const _component_uni_pagination = common_vendor.resolveComponent("uni-pagination");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_component_download_excel + _component_uni_th + _component_uni_tr + _component_uni_td + _easycom_uni_dateformat2 + _component_uni_table + _component_uni_pagination + _easycom_unicloud_db2)();
}
const _easycom_uni_dateformat = () => "../../../../uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_unicloud_db = () => "../../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.search && $options.search(...args)),
    b: $data.query,
    c: common_vendor.o(($event) => $data.query = $event.detail.value),
    d: common_vendor.o((...args) => $options.search && $options.search(...args)),
    e: _ctx.hasPermission("CREATE_UNI_CMS_ARTICLE")
  }, _ctx.hasPermission("CREATE_UNI_CMS_ARTICLE") ? {
    f: common_vendor.o(($event) => $options.navigateTo("../add/add"))
  } : {}, {
    g: _ctx.hasPermission("DELETE_UNI_CMS_ARTICLE")
  }, _ctx.hasPermission("DELETE_UNI_CMS_ARTICLE") ? {
    h: !$data.selectedIndexs.length,
    i: common_vendor.o((...args) => $options.delTable && $options.delTable(...args))
  } : {}, {
    j: common_vendor.p({
      fields: $data.exportExcel.fields,
      data: $data.exportExcelData,
      type: $data.exportExcel.type,
      name: $data.exportExcel.filename
    }),
    k: common_vendor.w(({
      pagination,
      loading,
      error,
      options
    }, s0, i0) => {
      return {
        a: "30a8929c-4-" + i0 + "," + ("30a8929c-3-" + i0),
        b: "30a8929c-5-" + i0 + "," + ("30a8929c-3-" + i0),
        c: "30a8929c-6-" + i0 + "," + ("30a8929c-3-" + i0),
        d: "30a8929c-7-" + i0 + "," + ("30a8929c-3-" + i0),
        e: "30a8929c-8-" + i0 + "," + ("30a8929c-3-" + i0),
        f: common_vendor.p({
          align: "center",
          ["filter-type"]: "select",
          ["filter-data"]: options.filterData.categories
        }),
        g: "30a8929c-9-" + i0 + "," + ("30a8929c-3-" + i0),
        h: common_vendor.p({
          align: "center",
          ["filter-type"]: "select",
          ["filter-data"]: options.filterData.article_status_localdata
        }),
        i: "30a8929c-10-" + i0 + "," + ("30a8929c-3-" + i0),
        j: "30a8929c-11-" + i0 + "," + ("30a8929c-3-" + i0),
        k: "30a8929c-12-" + i0 + "," + ("30a8929c-3-" + i0),
        l: "30a8929c-3-" + i0 + "," + ("30a8929c-2-" + i0),
        m: common_vendor.f($data.tableList, (item, index, i1) => {
          return common_vendor.e({
            a: item.thumbnail && item.thumbnail.length > 0
          }, item.thumbnail && item.thumbnail.length > 0 ? common_vendor.e({
            b: item.thumbnail[0],
            c: common_vendor.o(($event) => $options.previewCover(item.thumbnail), index),
            d: item.thumbnail && item.thumbnail.length >= 3
          }, item.thumbnail && item.thumbnail.length >= 3 ? {} : {}, {
            e: "30a8929c-14-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            f: common_vendor.p({
              align: "center"
            })
          }) : {
            g: "30a8929c-15-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            h: common_vendor.p({
              align: "center"
            })
          }, {
            i: common_vendor.t(item.title),
            j: "30a8929c-16-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            k: common_vendor.t(item.excerpt),
            l: "30a8929c-17-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            m: common_vendor.t(item.user_id && item.user_id[0] && item.user_id[0].nickname || "-"),
            n: "30a8929c-18-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            o: common_vendor.t(item.category_id && item.category_id[0] && item.category_id[0].text || "-"),
            p: "30a8929c-19-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            q: common_vendor.t(options.article_status_valuetotext[item.article_status]),
            r: "30a8929c-20-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            s: common_vendor.t(item.view_count || 0),
            t: "30a8929c-21-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            v: "30a8929c-23-" + i0 + "-" + i1 + "," + ("30a8929c-22-" + i0 + "-" + i1),
            w: common_vendor.p({
              threshold: [0, 0],
              date: item.publish_date
            }),
            x: "30a8929c-22-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1)
          }, _ctx.hasPermission("UPDATE_UNI_CMS_ARTICLE") ? {
            y: common_vendor.o(($event) => $options.navigateTo("../edit/edit?id=" + item._id, false), index)
          } : {}, {
            z: item.article_status === 1 && _ctx.hasPermission("UPDATE_UNI_CMS_ARTICLE")
          }, item.article_status === 1 && _ctx.hasPermission("UPDATE_UNI_CMS_ARTICLE") ? {
            A: common_vendor.o(($event) => $options.takeOffArticle(item._id), index)
          } : {}, _ctx.hasPermission("DELETE_UNI_CMS_ARTICLE") ? {
            B: common_vendor.o(($event) => $options.confirmDelete(item._id), index)
          } : {}, {
            C: "30a8929c-24-" + i0 + "-" + i1 + "," + ("30a8929c-13-" + i0 + "-" + i1),
            D: index,
            E: "30a8929c-13-" + i0 + "-" + i1 + "," + ("30a8929c-2-" + i0)
          });
        }),
        n: common_vendor.sr("table", "30a8929c-2-" + i0 + ",30a8929c-1"),
        o: "30a8929c-2-" + i0 + ",30a8929c-1",
        p: common_vendor.p({
          loading,
          emptyText: error.message || "没有更多数据",
          border: true,
          stripe: true,
          type: "selection"
        }),
        q: "30a8929c-25-" + i0 + ",30a8929c-1",
        r: common_vendor.o(($event) => pagination.current = $event),
        s: common_vendor.p({
          ["show-icon"]: true,
          ["page-size"]: pagination.size,
          total: pagination.count,
          modelValue: pagination.current
        }),
        t: i0,
        v: s0
      };
    }, {
      name: "d",
      path: "k",
      vueId: "30a8929c-1"
    }),
    l: common_vendor.o(($event) => $options.filterChange($event, "thumbnail")),
    m: common_vendor.o(($event) => $options.sortChange($event, "thumbnail")),
    n: common_vendor.p({
      align: "center",
      ["filter-type"]: "search",
      sortable: true
    }),
    o: common_vendor.o(($event) => $options.filterChange($event, "title")),
    p: common_vendor.o(($event) => $options.sortChange($event, "title")),
    q: common_vendor.p({
      align: "center",
      ["filter-type"]: "search",
      sortable: true
    }),
    r: common_vendor.o(($event) => $options.filterChange($event, "excerpt")),
    s: common_vendor.o(($event) => $options.sortChange($event, "excerpt")),
    t: common_vendor.p({
      align: "center",
      ["filter-type"]: "search",
      sortable: true
    }),
    v: common_vendor.o(($event) => $options.sortChange($event, "user_id")),
    w: common_vendor.p({
      align: "center",
      sortable: true
    }),
    x: common_vendor.o(($event) => $options.filterChange($event, "category_id._id")),
    y: common_vendor.o(($event) => $options.filterChange($event, "article_status")),
    z: common_vendor.o(($event) => $options.filterChange($event, "view_count")),
    A: common_vendor.o(($event) => $options.sortChange($event, "view_count")),
    B: common_vendor.p({
      align: "center",
      ["filter-type"]: "range",
      sortable: true
    }),
    C: common_vendor.o(($event) => $options.filterChange($event, "publish_date")),
    D: common_vendor.o(($event) => $options.sortChange($event, "publish_date")),
    E: common_vendor.p({
      align: "center",
      ["filter-type"]: "timestamp",
      sortable: true
    }),
    F: common_vendor.p({
      align: "center"
    }),
    G: common_vendor.p({
      align: "center"
    }),
    H: common_vendor.p({
      align: "center"
    }),
    I: common_vendor.p({
      align: "center"
    }),
    J: common_vendor.p({
      align: "center"
    }),
    K: common_vendor.p({
      align: "center"
    }),
    L: common_vendor.p({
      align: "center"
    }),
    M: common_vendor.p({
      align: "center"
    }),
    N: _ctx.hasPermission("UPDATE_UNI_CMS_ARTICLE"),
    O: _ctx.hasPermission("DELETE_UNI_CMS_ARTICLE"),
    P: common_vendor.p({
      align: "center"
    }),
    Q: common_vendor.o($options.selectionChange),
    R: common_vendor.o($options.onPageChanged),
    S: common_vendor.sr("udb", "30a8929c-1"),
    T: common_vendor.o($options.onqueryload),
    U: common_vendor.p({
      collection: $data.collectionList,
      where: $data.where,
      ["page-data"]: "replace",
      orderby: $data.orderby,
      getcount: true,
      ["page-size"]: $data.options.pageSize,
      ["page-current"]: $data.options.pageCurrent,
      options: $data.options,
      loadtime: "manual"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30a8929c"]]);
wx.createPage(MiniProgramPage);
