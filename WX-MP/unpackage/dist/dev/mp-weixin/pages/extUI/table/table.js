"use strict";
const pages_extUI_table_tableData = require("./tableData.js");
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchVal: "",
      tableData: [],
      // 每页数据量
      pageSize: 10,
      // 当前页
      pageCurrent: 1,
      // 数据总量
      total: 0,
      loading: false
    };
  },
  onLoad() {
    this.selectedIndexs = [];
    this.getData(1);
  },
  methods: {
    // 多选处理
    selectedItems() {
      return this.selectedIndexs.map((i) => this.tableData[i]);
    },
    // 多选
    selectionChange(e) {
      console.log(e.detail.index);
      this.selectedIndexs = e.detail.index;
    },
    //批量删除
    delTable() {
      console.log(this.selectedItems());
    },
    // 分页触发
    change(e) {
      this.$refs.table.clearSelection();
      this.selectedIndexs.length = 0;
      this.getData(e.current);
    },
    // 搜索
    search() {
      this.getData(1, this.searchVal);
    },
    // 获取数据
    getData(pageCurrent, value = "") {
      this.loading = true;
      this.pageCurrent = pageCurrent;
      this.request({
        pageSize: this.pageSize,
        pageCurrent,
        value,
        success: (res) => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    // 伪request请求
    request(options) {
      const { pageSize, pageCurrent, success, value } = options;
      let total = pages_extUI_table_tableData.tableData.length;
      let data = pages_extUI_table_tableData.tableData.filter((item, index) => {
        const idx = index - (pageCurrent - 1) * pageSize;
        return idx < pageSize && idx >= 0;
      });
      if (value) {
        data = [];
        pages_extUI_table_tableData.tableData.forEach((item) => {
          if (item.name.indexOf(value) !== -1) {
            data.push(item);
          }
        });
        total = data.length;
      }
      setTimeout(() => {
        typeof success === "function" && success({
          data,
          total
        });
      }, 500);
    }
  }
};
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2)();
}
const _easycom_uni_th = () => "../../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      width: "150",
      align: "center"
    }),
    b: common_vendor.p({
      width: "150",
      align: "center"
    }),
    c: common_vendor.p({
      align: "center"
    }),
    d: common_vendor.p({
      width: "204",
      align: "center"
    }),
    e: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: "faf5e348-7-" + i0 + "," + ("faf5e348-6-" + i0),
        c: common_vendor.t(item.name),
        d: "faf5e348-8-" + i0 + "," + ("faf5e348-6-" + i0),
        e: common_vendor.t(item.address),
        f: "faf5e348-9-" + i0 + "," + ("faf5e348-6-" + i0),
        g: "faf5e348-10-" + i0 + "," + ("faf5e348-6-" + i0),
        h: index,
        i: "faf5e348-6-" + i0 + ",faf5e348-0"
      };
    }),
    f: common_vendor.p({
      align: "center"
    }),
    g: common_vendor.sr("table", "faf5e348-0"),
    h: common_vendor.o($options.selectionChange),
    i: common_vendor.p({
      loading: $data.loading,
      border: true,
      stripe: true,
      type: "selection",
      emptyText: "暂无更多数据"
    }),
    j: common_vendor.o($options.change),
    k: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
