"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniMediaLibrary_common_crop = require("../../common/crop.js");
const _sfc_main = {
  name: "media-info",
  props: {
    currentMedia: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      mediaInfo: {
        height: 200
      }
    };
  },
  computed: {
    showMediaInfoPanel() {
      return this.currentMedia && this.currentMedia._id;
    },
    fileSize() {
      const size = this.currentMedia.size;
      if (!size)
        return "0.00 MB";
      if (size < 1024)
        return size + " B";
      if (size < 1024 * 1024)
        return (size / 1024).toFixed(2) + " KB";
      if (size < 1024 * 1024 * 1024)
        return (size / 1024 / 1024).toFixed(2) + " MB";
      return (size / 1024 / 1024 / 1024).toFixed(2) + " GB";
    },
    fileType() {
      if (this.currentMedia.fileType) {
        return this.currentMedia.fileType.toUpperCase();
      } else {
        return "-";
      }
    },
    resolution() {
      const res = {
        width: 0,
        height: 0
      };
      if (this.currentMedia.resolution) {
        res.width = this.currentMedia.resolution.width || 0;
        res.height = this.currentMedia.resolution.height || 0;
      }
      return res;
    },
    mediaDuration() {
      if (this.currentMedia.duration) {
        const duration = this.currentMedia.duration;
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration - hours * 3600) / 60);
        const seconds = Math.floor(duration - hours * 3600 - minutes * 60);
        return `${hours}:${minutes}:${seconds}`;
      } else {
        return "-";
      }
    },
    createDate() {
      if (!this.currentMedia.createDate)
        return "-";
      const date = new Date(this.currentMedia.createDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    },
    coverImage() {
      var _a;
      return uni_modules_uniMediaLibrary_common_crop.generateCoverURL(this.currentMedia.cover, (_a = this.currentMedia.thumbRules) == null ? void 0 : _a.detailCover);
    }
  },
  methods: {
    previewImage() {
      common_vendor.index.previewImage({
        current: this.currentMedia.src,
        urls: [this.currentMedia.src]
      });
    },
    onFiledChange(field) {
      const db = common_vendor.Zs.database();
      db.collection("uni-media-library").doc(this.currentMedia._id).update({
        [field]: this.currentMedia[field] || ""
      }).catch((err) => {
        console.log(err);
        common_vendor.index.showToast({
          title: "更新失败",
          icon: "none"
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.showMediaInfoPanel
  }, $options.showMediaInfoPanel ? common_vendor.e({
    b: $props.currentMedia.src
  }, $props.currentMedia.src ? common_vendor.e({
    c: $props.currentMedia.type === "image"
  }, $props.currentMedia.type === "image" ? {
    d: $options.coverImage
  } : $props.currentMedia.type === "video" ? {
    f: $props.currentMedia.src,
    g: $options.coverImage
  } : {}, {
    e: $props.currentMedia.type === "video",
    h: $props.currentMedia.type === "image"
  }, $props.currentMedia.type === "image" ? {
    i: common_vendor.p({
      type: "eye",
      size: "16",
      color: "#333"
    }),
    j: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args))
  } : {}) : {}, {
    k: /^cloud:\/\//.test($props.currentMedia._src)
  }, /^cloud:\/\//.test($props.currentMedia._src) ? {
    l: common_vendor.t($props.currentMedia._src)
  } : {
    m: common_vendor.t($props.currentMedia.src)
  }, {
    n: common_vendor.o(($event) => $options.onFiledChange("description")),
    o: common_vendor.o(($event) => $options.onFiledChange("description")),
    p: common_vendor.o(($event) => $props.currentMedia.description = $event),
    q: common_vendor.p({
      placeholder: "描述; 用于媒体资源搜索",
      modelValue: $props.currentMedia.description
    }),
    r: common_vendor.o(($event) => $options.onFiledChange("alt")),
    s: common_vendor.o(($event) => $options.onFiledChange("alt")),
    t: common_vendor.o(($event) => $props.currentMedia.alt = $event),
    v: common_vendor.p({
      placeholder: "替代文字，资源加载失败时展示",
      modelValue: $props.currentMedia.alt
    }),
    w: common_vendor.t($props.currentMedia.originalName || "-"),
    x: common_vendor.t($options.fileType),
    y: common_vendor.t($options.fileSize || "-"),
    z: common_vendor.t($options.resolution.width),
    A: common_vendor.t($options.resolution.height),
    B: $props.currentMedia.type === "video"
  }, $props.currentMedia.type === "video" ? {
    C: common_vendor.t($options.mediaDuration)
  } : {}, {
    D: common_vendor.t($props.currentMedia.uploadUser && $props.currentMedia.uploadUser[0] && $props.currentMedia.uploadUser[0].nickname || "-"),
    E: common_vendor.t($options.createDate)
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
