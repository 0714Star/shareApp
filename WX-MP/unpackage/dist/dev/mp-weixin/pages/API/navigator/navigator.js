"use strict";
const common_vendor = require("../../../common/vendor.js");
const preloadPageUrl = "/pages/extUI/calendar/calendar";
const _sfc_main = {
  data() {
    return {
      title: "navigate"
    };
  },
  computed: {
    ...common_vendor.mapState({
      hasLeftWin: (state) => !state.noMatchLeftWindow
    })
  },
  methods: {
    navigateTo() {
      common_vendor.index.navigateTo({
        url: "new-page/new-vue-page-1?data=Hello"
      });
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    },
    redirectTo() {
      common_vendor.index.redirectTo({
        url: "new-page/new-vue-page-1"
      });
    },
    switchTab() {
      common_vendor.index.switchTab({
        url: "/pages/tabBar/template/template"
      });
    },
    reLaunch() {
      if (this.hasLeftWin) {
        common_vendor.index.reLaunch({
          url: "/pages/component/view/view"
        });
        return;
      }
      common_vendor.index.reLaunch({
        url: "/pages/tabBar/component/component"
      });
    },
    customAnimation() {
      common_vendor.index.navigateTo({
        url: "new-page/new-vue-page-1?data=使用自定义动画打开页面",
        animationType: "slide-in-bottom",
        animationDuration: 200
      });
    },
    preloadPage() {
      common_vendor.index.preloadPage({
        url: preloadPageUrl,
        success() {
          common_vendor.index.showToast({
            title: "页面预载成功"
          });
        },
        fail() {
          common_vendor.index.showToast({
            title: "页面预载失败"
          });
        }
      });
    },
    unPreloadPage() {
      common_vendor.index.unPreloadPage({
        url: preloadPageUrl
      });
    },
    navigateToPreloadPage() {
      common_vendor.index.navigateTo({
        url: preloadPageUrl
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.navigateTo && $options.navigateTo(...args)),
    c: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    d: common_vendor.o((...args) => $options.redirectTo && $options.redirectTo(...args)),
    e: common_vendor.o((...args) => $options.switchTab && $options.switchTab(...args)),
    f: !_ctx.hasLeftWin
  }, !_ctx.hasLeftWin ? {
    g: common_vendor.o((...args) => $options.reLaunch && $options.reLaunch(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
