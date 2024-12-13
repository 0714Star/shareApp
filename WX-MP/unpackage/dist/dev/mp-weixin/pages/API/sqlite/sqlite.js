"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "SQLite"
    };
  },
  methods: {
    openDB: function() {
      plus.sqlite.openDatabase({
        name: "first",
        path: "_doc/test.db",
        success: function(e) {
          plus.nativeUI.alert("打开数据库test.db成功 ");
        },
        fail: function(e) {
          plus.nativeUI.alert("打开数据库test.db失败: " + JSON.stringify(e));
        }
      });
    },
    // 执行SQL语句
    executeSQL: function() {
      plus.sqlite.executeSql({
        name: "first",
        sql: 'create table if not exists database("name" CHAR(110),"sex" CHAR(10),"age" INT(11))',
        success: function(e) {
          plus.sqlite.executeSql({
            name: "first",
            sql: "insert into database values('彦','女','7000')",
            success: function(e2) {
              plus.nativeUI.alert("创建表table和插入数据成功");
            },
            fail: function(e2) {
              plus.nativeUI.alert("创建表table成功但插入数据失败: " + JSON.stringify(e2));
            }
          });
        },
        fail: function(e) {
          plus.nativeUI.alert("创建表table失败: " + JSON.stringify(e));
        }
      });
    },
    // 查询SQL语句
    selectSQL: function() {
      plus.sqlite.selectSql({
        name: "first",
        sql: "select * from database",
        success: function(e) {
          plus.nativeUI.alert("查询SQL语句成功: " + JSON.stringify(e));
        },
        fail: function(e) {
          plus.nativeUI.alert("查询SQL语句失败: " + JSON.stringify(e));
        }
      });
    },
    // 删除表
    droptable: function() {
      plus.sqlite.executeSql({
        name: "first",
        sql: "drop table database",
        success: function(e) {
          plus.nativeUI.alert("删除表database成功");
        },
        fail: function(e) {
          plus.nativeUI.alert("删除表database失败: " + JSON.stringify(e));
        }
      });
    },
    // 关闭数据库
    closeDB: function() {
      plus.sqlite.closeDatabase({
        name: "first",
        success: function(e) {
          plus.nativeUI.alert("关闭数据库成功");
        },
        fail: function(e) {
          plus.nativeUI.alert("关闭数据库失败: " + JSON.stringify(e));
        }
      });
    },
    isOpenDB: function() {
      if (plus.sqlite.isOpenDatabase({
        name: "first",
        path: "_doc/test.db"
      })) {
        plus.nativeUI.alert("Opened!");
      } else {
        plus.nativeUI.alert("Unopened!");
      }
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.openDB && $options.openDB(...args)),
    c: common_vendor.o((...args) => $options.executeSQL && $options.executeSQL(...args)),
    d: common_vendor.o((...args) => $options.selectSQL && $options.selectSQL(...args)),
    e: common_vendor.o((...args) => $options.droptable && $options.droptable(...args)),
    f: common_vendor.o((...args) => $options.closeDB && $options.closeDB(...args)),
    g: common_vendor.o((...args) => $options.isOpenDB && $options.isOpenDB(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
