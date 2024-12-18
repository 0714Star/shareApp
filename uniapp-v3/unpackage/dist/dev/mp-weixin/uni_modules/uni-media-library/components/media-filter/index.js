"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "media-filter",
  emits: ["onUploadMedia", "onSearch", "onCancelSelect", "onDeleteSelect"],
  props: {
    selectMediaItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isSelected() {
      return this.selectMediaItems.length > 0;
    },
    selectedCount() {
      return this.selectMediaItems.length;
    }
  },
  data() {
    return {
      mediaGroup: "",
      keyword: "",
      lastKeyword: "",
      deleteOriFileChecked: true
    };
  },
  methods: {
    deleteOriFile() {
      this.deleteOriFileChecked = !this.deleteOriFileChecked;
    },
    close() {
      this.$refs.popup.close();
      this.deleteOriFileChecked = true;
    },
    search() {
      if (this.keyword === this.lastKeyword)
        return;
      this.$emit("onSearch", {
        mediaGroup: this.mediaGroup,
        keyword: this.keyword
      });
      this.lastKeyword = this.keyword;
    },
    deleteMedia() {
      this.$refs.popup.open();
    },
    async confirm() {
      if (this.selectedCount > 50) {
        common_vendor.index.showToast({
          title: "每次最多删除50项媒体资源",
          icon: "none"
        });
        return;
      }
      const uniMediaLibraryCo = common_vendor.Zs.importObject("uni-media-library-co", {
        loadingOptions: {
          title: "正在删除",
          mask: true
        }
      });
      const mediaIds = this.selectMediaItems.map((item) => item._id);
      await uniMediaLibraryCo.deleteMedia({
        mediaIds,
        deleteOriginalFile: this.deleteOriFileChecked
      });
      this.$emit("onDeleteSelect", mediaIds);
      this.deleteOriFileChecked = true;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_popup_dialog = () => "../../../uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "cloud-upload",
      size: "14",
      color: "#fff"
    }),
    b: common_vendor.o(($event) => _ctx.$emit("onUploadMedia")),
    c: common_vendor.o($options.search),
    d: common_vendor.o($options.search),
    e: common_vendor.o(($event) => $data.keyword = $event),
    f: common_vendor.p({
      suffixIcon: "search",
      placeholder: "搜索所有媒体...",
      modelValue: $data.keyword
    }),
    g: $options.isSelected
  }, $options.isSelected ? {
    h: common_vendor.t($options.selectedCount),
    i: common_vendor.o(($event) => _ctx.$emit("onCancelSelect")),
    j: common_vendor.o((...args) => $options.deleteMedia && $options.deleteMedia(...args)),
    k: $data.deleteOriFileChecked,
    l: $data.deleteOriFileChecked,
    m: common_vendor.o((...args) => $options.deleteOriFile && $options.deleteOriFile(...args)),
    n: common_vendor.o($options.close),
    o: common_vendor.o($options.confirm),
    p: common_vendor.p({
      title: `删除${$options.selectedCount}项媒体资源?`,
      confirmText: "确定删除",
      cancelText: "取消",
      duration: 2e3,
      ["before-close"]: true
    }),
    q: common_vendor.sr("popup", "07a4012c-2"),
    r: common_vendor.p({
      type: "dialog"
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
