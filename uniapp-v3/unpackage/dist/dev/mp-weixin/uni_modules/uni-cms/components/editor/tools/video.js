"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "mediaVideo",
  emits: ["change"],
  components: {
    ToolbarTool
  },
  props: {
    active: Boolean,
    disabled: Boolean
  },
  data() {
    return {
      drawerWidth: null
    };
  },
  mounted() {
    const sysinfo = common_vendor.index.getSystemInfoSync();
    this.drawerWidth = sysinfo.windowWidth * 0.8;
  },
  methods: {
    change() {
      this.$refs.insertVideoDrawer.open();
    },
    onInsert(selectedMediaList) {
      this.$refs.insertVideoDrawer.close();
      this.$emit("change", {
        type: "mediaVideo",
        value: {
          poster: selectedMediaList[0].cover,
          src: selectedMediaList[0].src,
          duration: selectedMediaList[0].duration
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_toolbarTool = common_vendor.resolveComponent("toolbarTool");
  const _easycom_uni_media_library2 = common_vendor.resolveComponent("uni-media-library");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_icons2 + _component_toolbarTool + _easycom_uni_media_library2 + _easycom_uni_drawer2)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_media_library = () => "../../../../uni-media-library/components/uni-media-library/uni-media-library.js";
const _easycom_uni_drawer = () => "../../../../uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_media_library + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-video",
      size: "24px"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "button",
      tooltip: {
        content: "插入视频"
      },
      disabled: $props.disabled,
      active: $props.active
    }),
    d: $data.drawerWidth
  }, $data.drawerWidth ? {
    e: common_vendor.o($options.onInsert),
    f: common_vendor.p({
      mode: "picker",
      ["selected-count"]: 1,
      ["media-tabs"]: ["video"]
    }),
    g: common_vendor.sr("insertVideoDrawer", "7fb9e7fc-2"),
    h: common_vendor.p({
      mode: "right",
      width: $data.drawerWidth
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
