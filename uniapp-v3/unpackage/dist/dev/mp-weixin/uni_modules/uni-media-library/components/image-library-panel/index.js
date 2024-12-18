"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uniMediaLibraryCo = common_vendor.Zs.importObject("uni-media-library-co", {
  customUI: true
});
const _sfc_main = {
  name: "image-library-panel",
  emits: ["onCopyToMediaLibrary"],
  expose: [],
  props: {
    provider: String
  },
  data() {
    return {
      keyword: "",
      loading: false,
      page: 1,
      pageSize: 30,
      list: []
    };
  },
  watch: {
    page() {
      this.loadList();
    }
  },
  computed: {
    selectedCount() {
      return this.selectedImages.length;
    },
    selectedImages() {
      return this.list.filter((item) => item.selected);
    }
  },
  methods: {
    search() {
      if (this.loading)
        return;
      if (this.page === 1) {
        this.loadList();
      } else {
        this.page = 1;
      }
    },
    async loadList() {
      if (!this.keyword || this.loading)
        return;
      this.loading = true;
      let res;
      try {
        res = await uniMediaLibraryCo.searchImageLibrary({
          keyword: this.keyword,
          page: this.page,
          pageSize: this.pageSize,
          provider: this.provider
        });
      } catch (e) {
        return common_vendor.index.showToast({
          title: e.errMsg || e.message,
          icon: "none"
        });
      } finally {
        this.loading = false;
      }
      if (this.page === 1) {
        this.list = res.data;
      } else {
        this.list = [...this.list, ...res.data];
      }
    },
    loadMore() {
      if (!this.loading) {
        this.page += 1;
      }
    },
    onSelect(index) {
      if (this.loading)
        return;
      const mediaItem = this.list[index];
      this.$set(mediaItem, "selected", !mediaItem.selected);
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_easyinput2 + _easycom_uni_icons2)();
}
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => _ctx.$emit("onCopyToMediaLibrary", $options.selectedImages)),
    b: $options.selectedCount <= 0,
    c: common_vendor.o($options.search),
    d: common_vendor.o($options.search),
    e: common_vendor.o(($event) => $data.keyword = $event),
    f: common_vendor.p({
      suffixIcon: "search",
      placeholder: "搜索图片素材",
      modelValue: $data.keyword
    }),
    g: $data.loading && $data.page === 1
  }, $data.loading && $data.page === 1 ? {
    h: common_vendor.p({
      type: "spinner-cycle",
      size: "30",
      color: "#000"
    })
  } : $data.list.length ? {
    j: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.thumbUrl,
        b: item.selected ? 1 : "",
        c: common_vendor.o(($event) => $options.onSelect(index), item.id),
        d: item.id
      };
    })
  } : {
    k: common_vendor.p({
      type: "images",
      size: "60",
      color: "#ccc"
    })
  }, {
    i: $data.list.length,
    l: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
