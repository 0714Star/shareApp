"use strict";
const common_vendor = require("../../../../common/vendor.js");
const MediaPanel = () => "../media-panel/index.js";
const ImageLibraryPanel = () => "../image-library-panel/index.js";
const FreeMediaButton = () => "./free-media-button.js";
const tabs = [{
  key: "all",
  label: "全部"
}, {
  key: "image",
  label: "图片"
}, {
  key: "video",
  label: "视频"
}];
const _sfc_main = {
  name: "uni-media-library",
  emits: ["onInsert"],
  props: {
    // manager: 管理模式，picker: 选择模式
    mode: {
      type: String,
      default: () => "manager"
    },
    // 选择的媒体类型
    mediaTabs: {
      type: Array,
      default: () => []
    },
    // 选择的媒体数量
    selectedCount: {
      type: Number,
      default: () => 0
    }
  },
  components: {
    MediaPanel,
    ImageLibraryPanel,
    FreeMediaButton
  },
  data() {
    return {
      currentProvider: "internal",
      currentTab: "",
      providers: []
    };
  },
  computed: {
    tabs() {
      return this.mediaTabs.length > 0 ? tabs.filter((tab) => this.mediaTabs.includes(tab.key)) : tabs;
    },
    isInternalProvider() {
      return this.currentProvider === "internal";
    },
    providerWebsite() {
      const provider = this.providers.find((item) => item.provider === this.currentProvider);
      return provider ? provider.website : "";
    },
    providerName() {
      const provider = this.providers.find((item) => item.provider === this.currentProvider);
      return provider ? provider.name : "";
    }
  },
  created() {
    this.currentTab = this.tabs[0].key;
  },
  methods: {
    switchTab(tabKey) {
      this.currentTab = tabKey;
    },
    insertMedia() {
      const mediaPanel = this.$refs[this.currentTab];
      if (!mediaPanel)
        return;
      const selectedMediaItems = mediaPanel.getSelectedMediaItems();
      if (selectedMediaItems.length <= 0)
        return;
      const mediaList = selectedMediaItems.reduce((list, item) => {
        list.push({
          src: item._src,
          cover: item._cover,
          type: item.type,
          alt: item.alt,
          size: item.size,
          duration: item.duration
        });
        return list;
      }, []);
      this.$emit("onInsert", mediaList);
    },
    onFreeMediaProviderChange(provider) {
      this.currentProvider = provider;
    },
    onFreeMediaProviderLoad(providers) {
      this.providers = providers;
    },
    onCopyToMediaLibrary(images) {
      const imageLibraryProvider = this.currentProvider;
      this.currentProvider = "internal";
      this.currentTab = "all";
      this.$nextTick(() => {
        this.$refs.all.imageLibraryUploadMediaLibrary(images, imageLibraryProvider);
      });
    }
  }
};
if (!Array) {
  const _component_free_media_button = common_vendor.resolveComponent("free-media-button");
  const _component_media_panel = common_vendor.resolveComponent("media-panel");
  const _component_image_library_panel = common_vendor.resolveComponent("image-library-panel");
  (_component_free_media_button + _component_media_panel + _component_image_library_panel)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.mode === "manager"
  }, $props.mode === "manager" ? {
    b: common_vendor.o($options.onFreeMediaProviderChange),
    c: common_vendor.o($options.onFreeMediaProviderLoad),
    d: common_vendor.p({
      provider: $data.currentProvider
    })
  } : {}, {
    e: $options.isInternalProvider
  }, $options.isInternalProvider ? {
    f: common_vendor.f($options.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.label),
        b: tab.key,
        c: tab.key === $data.currentTab ? 1 : "",
        d: common_vendor.o(($event) => $options.switchTab(tab.key), tab.key)
      };
    })
  } : {
    g: common_vendor.t($options.providerName),
    h: $options.providerWebsite ? 1 : "",
    i: $options.providerWebsite
  }, {
    j: $props.mode === "picker"
  }, $props.mode === "picker" ? {
    k: common_vendor.o((...args) => $options.insertMedia && $options.insertMedia(...args))
  } : {}, {
    l: $options.isInternalProvider
  }, $options.isInternalProvider ? common_vendor.e({
    m: $data.currentTab === "all"
  }, $data.currentTab === "all" ? {
    n: common_vendor.sr("all", "44fe22b6-1"),
    o: common_vendor.p({
      ["media-type"]: "all",
      ["selected-count"]: $props.selectedCount
    })
  } : {}, {
    p: $data.currentTab === "image"
  }, $data.currentTab === "image" ? {
    q: common_vendor.sr("image", "44fe22b6-2"),
    r: common_vendor.p({
      ["media-type"]: "image",
      ["selected-count"]: $props.selectedCount
    })
  } : {}, {
    s: $data.currentTab === "video"
  }, $data.currentTab === "video" ? {
    t: common_vendor.sr("video", "44fe22b6-3"),
    v: common_vendor.p({
      ["media-type"]: "video",
      ["selected-count"]: $props.selectedCount
    })
  } : {}) : {
    w: common_vendor.o($options.onCopyToMediaLibrary),
    x: common_vendor.p({
      provider: $data.currentProvider
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
