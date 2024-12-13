"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "新页面",
      data: ""
    };
  },
  computed: {
    ...common_vendor.mapState(["colorIndex", "colorList"]),
    ...common_vendor.mapGetters(["currentColor"])
  },
  onLoad(e) {
    if (e.data) {
      this.data = e.data;
    }
    common_vendor.index.$on("postMsg", (res) => {
      common_vendor.index.showModal({
        content: `收到uni.$emit消息:${res.msg}`,
        showCancel: false
      });
    });
  },
  onUnload() {
    common_vendor.index.$off("postMsg");
  },
  methods: {
    ...common_vendor.mapMutations(["setColorIndex"]),
    navToNvue() {
      common_vendor.index.navigateTo({
        url: "new-nvue-page-1"
      });
    },
    navToVue() {
      common_vendor.index.navigateTo({
        url: "new-vue-page-2"
      });
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t($data.data),
    c: common_vendor.o(($event) => _ctx.setColorIndex(_ctx.colorIndex > 1 ? 0 : _ctx.colorIndex + 1)),
    d: _ctx.currentColor,
    e: common_vendor.o((...args) => $options.navToVue && $options.navToVue(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
