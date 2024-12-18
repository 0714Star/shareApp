"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniCms_common_validator_uniCmsCategories = require("../../../common/validator/uni-cms-categories.js");
const uni_modules_uniCms_common_authMixin = require("../../../common/auth-mixin.js");
const db = common_vendor.Zs.database();
const dbOrderBy = "";
const dbSearchFields = ["name"];
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
      collectionList: "uni-cms-categories",
      query: "",
      where: "",
      orderby: dbOrderBy,
      orderByFieldName: "",
      selectedIndexs: [],
      options: {
        pageSize,
        pageCurrent,
        filterData: {},
        ...uni_modules_uniCms_common_validator_uniCmsCategories.enumConverter
      },
      imageStyles: {
        width: 64,
        height: 64
      },
      exportExcel: {
        "filename": "uni-cms-categories.xls",
        "type": "xls",
        "fields": {
          "名称": "name",
          "描述": "description",
          "图标地址": "icon",
          "排序": "sort",
          "文章数量": "article_count",
          "创建时间": "create_date"
        }
      },
      exportExcelData: []
    };
  },
  onLoad() {
    this._filter = {};
  },
  onReady() {
    this.$refs.udb.loadData();
  },
  methods: {
    // 当数据加载完成时，将数据赋值给 exportExcelData
    onqueryload(data) {
      this.exportExcelData = data;
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
    // 执行搜索操作
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
    // 当页码改变时，清空选中项并重新加载数据
    onPageChanged(e) {
      this.selectedIndexs.length = 0;
      this.$refs.table.clearSelection();
      this.$refs.udb.loadData({
        current: e.current
      });
    },
    // 跳转到指定页面
    navigateTo(url, clear) {
      common_vendor.index.navigateTo({
        url,
        events: {
          // 监听 refreshData 事件，当页面返回时刷新数据
          refreshData: () => {
            this.loadData(clear);
          }
        }
      });
    },
    // 获取选中项的 ID
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
    // 选中项改变时更新 selectedIndexs 数组
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
    // 排序改变时更新 orderByFieldName 和 orderby
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
    // 筛选改变时更新 _filter 和 where
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
      let newWhere = uni_modules_uniCms_common_validator_uniCmsCategories.filterToWhere(this._filter, db.command);
      if (Object.keys(newWhere).length) {
        this.where = newWhere;
      } else {
        this.where = "";
      }
      this.$nextTick(() => {
        this.$refs.udb.loadData();
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
    e: _ctx.hasPermission("CREATE_UNI_CMS_CATEGORIES")
  }, _ctx.hasPermission("CREATE_UNI_CMS_CATEGORIES") ? {
    f: common_vendor.o(($event) => $options.navigateTo("../add/add"))
  } : {}, {
    g: _ctx.hasPermission("DELETE_UNI_CMS_CATEGORIES")
  }, _ctx.hasPermission("DELETE_UNI_CMS_CATEGORIES") ? {
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
      data,
      pagination,
      loading,
      error,
      options
    }, s0, i0) => {
      return {
        a: "72a43fda-4-" + i0 + "," + ("72a43fda-3-" + i0),
        b: "72a43fda-5-" + i0 + "," + ("72a43fda-3-" + i0),
        c: "72a43fda-6-" + i0 + "," + ("72a43fda-3-" + i0),
        d: "72a43fda-7-" + i0 + "," + ("72a43fda-3-" + i0),
        e: "72a43fda-8-" + i0 + "," + ("72a43fda-3-" + i0),
        f: "72a43fda-3-" + i0 + "," + ("72a43fda-2-" + i0),
        g: common_vendor.f(data, (item, index, i1) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: "72a43fda-10-" + i0 + "-" + i1 + "," + ("72a43fda-9-" + i0 + "-" + i1),
            c: common_vendor.t(item.description),
            d: "72a43fda-11-" + i0 + "-" + i1 + "," + ("72a43fda-9-" + i0 + "-" + i1),
            e: common_vendor.t(item.sort),
            f: "72a43fda-12-" + i0 + "-" + i1 + "," + ("72a43fda-9-" + i0 + "-" + i1),
            g: "72a43fda-14-" + i0 + "-" + i1 + "," + ("72a43fda-13-" + i0 + "-" + i1),
            h: common_vendor.p({
              threshold: [0, 0],
              date: item.create_date
            }),
            i: "72a43fda-13-" + i0 + "-" + i1 + "," + ("72a43fda-9-" + i0 + "-" + i1)
          }, _ctx.hasPermission("UPDATE_UNI_CMS_CATEGORIES") ? {
            j: common_vendor.o(($event) => $options.navigateTo("../edit/edit?id=" + item._id, false), index)
          } : {}, _ctx.hasPermission("DELETE_UNI_CMS_CATEGORIES") ? {
            k: common_vendor.o(($event) => $options.confirmDelete(item._id), index)
          } : {}, {
            l: "72a43fda-15-" + i0 + "-" + i1 + "," + ("72a43fda-9-" + i0 + "-" + i1),
            m: index,
            n: "72a43fda-9-" + i0 + "-" + i1 + "," + ("72a43fda-2-" + i0)
          });
        }),
        h: common_vendor.sr("table", "72a43fda-2-" + i0 + ",72a43fda-1"),
        i: "72a43fda-2-" + i0 + ",72a43fda-1",
        j: common_vendor.p({
          loading,
          emptyText: error.message || "没有更多数据",
          border: true,
          stripe: true,
          type: "selection"
        }),
        k: "72a43fda-16-" + i0 + ",72a43fda-1",
        l: common_vendor.o(($event) => pagination.current = $event),
        m: common_vendor.p({
          ["show-icon"]: true,
          ["page-size"]: pagination.size,
          total: pagination.count,
          modelValue: pagination.current
        }),
        n: i0,
        o: s0
      };
    }, {
      name: "d",
      path: "k",
      vueId: "72a43fda-1"
    }),
    l: common_vendor.o(($event) => $options.filterChange($event, "name")),
    m: common_vendor.o(($event) => $options.sortChange($event, "name")),
    n: common_vendor.p({
      align: "center",
      ["filter-type"]: "search",
      sortable: true
    }),
    o: common_vendor.o(($event) => $options.filterChange($event, "description")),
    p: common_vendor.o(($event) => $options.sortChange($event, "description")),
    q: common_vendor.p({
      align: "center",
      ["filter-type"]: "search",
      sortable: true
    }),
    r: common_vendor.o(($event) => $options.filterChange($event, "sort")),
    s: common_vendor.o(($event) => $options.sortChange($event, "sort")),
    t: common_vendor.p({
      align: "center",
      ["filter-type"]: "range",
      sortable: true
    }),
    v: common_vendor.o(($event) => $options.filterChange($event, "create_date")),
    w: common_vendor.o(($event) => $options.sortChange($event, "create_date")),
    x: common_vendor.p({
      align: "center",
      ["filter-type"]: "timestamp",
      sortable: true
    }),
    y: common_vendor.p({
      align: "center"
    }),
    z: common_vendor.p({
      align: "center"
    }),
    A: common_vendor.p({
      align: "center"
    }),
    B: common_vendor.p({
      align: "center"
    }),
    C: common_vendor.p({
      align: "center"
    }),
    D: _ctx.hasPermission("UPDATE_UNI_CMS_CATEGORIES"),
    E: _ctx.hasPermission("DELETE_UNI_CMS_CATEGORIES"),
    F: common_vendor.p({
      align: "center"
    }),
    G: common_vendor.o($options.selectionChange),
    H: common_vendor.o($options.onPageChanged),
    I: common_vendor.sr("udb", "72a43fda-1"),
    J: common_vendor.o($options.onqueryload),
    K: common_vendor.p({
      collection: $data.collectionList,
      field: "name,description,icon,sort,article_count,create_date",
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
