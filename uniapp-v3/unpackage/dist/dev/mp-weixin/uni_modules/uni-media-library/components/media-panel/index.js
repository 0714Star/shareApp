"use strict";
const uni_modules_uniMediaLibrary_common_uploadHelper = require("../../common/upload-helper.js");
const uni_modules_uniMediaLibrary_common_uploader_file = require("../../common/uploader/file.js");
const uni_modules_uniMediaLibrary_common_uploader_url = require("../../common/uploader/url.js");
const common_vendor = require("../../../../common/vendor.js");
const MediaInfo = () => "../media-info/index.js";
const MediaFilter = () => "../media-filter/index.js";
const MediaList = () => "../media-list/index.js";
const _sfc_main = {
  name: "media-panel",
  props: {
    mediaType: String,
    selectedCount: Number
  },
  expose: ["imageLibraryUploadMediaLibrary", "getSelectedMediaItems"],
  components: {
    MediaList,
    MediaFilter,
    MediaInfo
  },
  data() {
    return {
      currentMedia: null,
      selectedMediaItems: [],
      isExpend: false,
      filter: {
        mediaGroup: null,
        keyword: null
      }
    };
  },
  watch: {
    currentMedia(newVal) {
      if (!newVal) {
        this.isExpend = false;
      }
    }
  },
  methods: {
    onUploadMediaEvent() {
      let uploader = new uni_modules_uniMediaLibrary_common_uploader_file.FromFileUploader();
      uploader.on("progress", (progress) => {
        this.$refs.mediaList.mediaUploadProgress(progress);
      });
      uploader.on("success", (files) => {
        this.$refs.mediaList.mediaUploadSuccess(files);
      });
      uploader.chooseFileAndUpload({
        type: this.mediaType,
        extension: uni_modules_uniMediaLibrary_common_uploadHelper.extnameMap[this.mediaType],
        onChooseFile: (files) => {
          this.$refs.mediaList.chooseFiles(files);
        },
        success: () => {
          uploader = null;
        },
        fail: (e) => {
          console.error(e);
        }
      });
    },
    async imageLibraryUploadMediaLibrary(images, imageLibraryProvider) {
      let uploader = new uni_modules_uniMediaLibrary_common_uploader_url.FromURLUploader({
        provider: "internal",
        imageLibraryProvider
      });
      uploader.on("progress", (progress) => {
        this.$refs.mediaList.mediaUploadProgress(progress);
      });
      uploader.on("success", (files) => {
        this.$refs.mediaList.mediaUploadSuccess(files);
      });
      uploader.on("error", (file) => {
        this.$refs.mediaList.mediaUploadFailed(file);
      });
      await uploader.add(images.map((item) => ({
        ...item,
        name: item.originalName,
        mediaType: "image"
      })));
      this.$refs.mediaList.chooseFiles(
        uploader.waitUploadFiles
      );
      await uploader.cloudUpload();
      this.$nextTick(() => {
        uploader = null;
      });
    },
    onSearchEvent(filter) {
      this.filter = filter;
    },
    onSelectEvent(selectedMediaItems) {
      const currentMedia = selectedMediaItems.find((item) => item.active);
      this.selectedMediaItems = selectedMediaItems;
      this.currentMedia = currentMedia;
    },
    getSelectedMediaItems() {
      return this.selectedMediaItems;
    },
    expendMediaInfo() {
      this.isExpend = !this.isExpend;
    }
  }
};
if (!Array) {
  const _component_media_filter = common_vendor.resolveComponent("media-filter");
  const _component_media_list = common_vendor.resolveComponent("media-list");
  const _component_media_info = common_vendor.resolveComponent("media-info");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_media_filter + _component_media_list + _component_media_info + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.onSearchEvent),
    b: common_vendor.o($options.onUploadMediaEvent),
    c: common_vendor.o(() => _ctx.$refs.mediaList.cancelAllSelected()),
    d: common_vendor.o((e) => _ctx.$refs.mediaList.deleteSelectedMedia(e)),
    e: common_vendor.p({
      selectMediaItems: $data.selectedMediaItems
    }),
    f: common_vendor.sr("mediaList", "47cff021-1"),
    g: common_vendor.o($options.onUploadMediaEvent),
    h: common_vendor.o($options.onSelectEvent),
    i: common_vendor.p({
      ["media-group"]: $data.filter.mediaGroup,
      ["media-type"]: $props.mediaType,
      keyword: $data.filter.keyword,
      selectedCount: $props.selectedCount
    }),
    j: $data.currentMedia
  }, $data.currentMedia ? {
    k: common_vendor.p({
      ["current-media"]: $data.currentMedia
    })
  } : {}, {
    l: $data.currentMedia
  }, $data.currentMedia ? {
    m: common_vendor.p({
      type: $data.isExpend ? "right" : "left",
      size: "16",
      color: "#fff"
    }),
    n: common_vendor.o((...args) => $options.expendMediaInfo && $options.expendMediaInfo(...args))
  } : {}, {
    o: $data.isExpend ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-47cff021"]]);
wx.createComponent(Component);
