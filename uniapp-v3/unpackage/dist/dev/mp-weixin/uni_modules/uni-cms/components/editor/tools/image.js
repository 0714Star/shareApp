"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const ToolbarTool = () => "./base.js";
const _sfc_main = {
  name: "tool-image",
  emits: ["change"],
  props: {
    active: Boolean,
    disabled: Boolean
  },
  components: {
    ToolbarTool
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
      this.$refs.insertImageDrawer.open();
    },
    async onInsert(selectedMediaList) {
      const tcbCloudFiles = selectedMediaList.filter((item) => item.type === "image" && item.src.startsWith("cloud://"));
      let fileList = [];
      if (tcbCloudFiles.length) {
        const res = await common_vendor.Zs.getTempFileURL({
          fileList: [].concat.call([], ...tcbCloudFiles.map((item) => [item.src, item.cover])).filter((item) => item)
        });
        fileList = res.fileList;
      }
      selectedMediaList.forEach((media) => {
        const cloudFile = fileList.find((item) => item.fileID === media.src);
        media._src = media.src;
        if (cloudFile) {
          media.src = (cloudFile == null ? void 0 : cloudFile.tempFileURL) ?? media._src;
        }
      });
      this.$refs.insertImageDrawer.close();
      const selectedMedia = selectedMediaList[0];
      this.$emit("change", {
        type: "image",
        value: {
          src: selectedMedia.src,
          alt: selectedMedia.alt,
          data: {
            source: selectedMedia._src ?? selectedMedia.src
          }
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
      type: "icon-image",
      size: "22px"
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.p({
      type: "button",
      active: $props.active,
      disabled: $props.disabled,
      tooltip: {
        content: "插入图片"
      }
    }),
    d: common_vendor.r("d", {
      change: $options.change
    }),
    e: $data.drawerWidth
  }, $data.drawerWidth ? {
    f: common_vendor.o($options.onInsert),
    g: common_vendor.p({
      mode: "picker",
      ["selected-count"]: 1,
      ["media-tabs"]: ["image"]
    }),
    h: common_vendor.sr("insertImageDrawer", "3c5830e2-2"),
    i: common_vendor.p({
      mode: "right",
      width: $data.drawerWidth
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
