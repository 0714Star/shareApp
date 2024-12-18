"use strict";
const common_vendor = require("../../../../common/vendor.js");
const ImageLibraryLogos = () => "../image-library-logos/index.js";
const _sfc_main = {
  name: "free-media-button",
  emits: ["onChange", "onLoad"],
  components: {
    ImageLibraryLogos
  },
  props: {
    provider: {
      type: String,
      default: () => "internal"
    }
  },
  data() {
    return {
      providers: [{
        provider: "internal",
        name: "内置媒体库"
      }],
      showMenu: false
    };
  },
  mounted() {
    this.loadFreeImageLibraryProviders();
  },
  methods: {
    onChange(provider) {
      this.showMenu = false;
      this.$emit("onChange", provider);
    },
    async loadFreeImageLibraryProviders() {
      const uniMediaLibraryCo = common_vendor.Zs.importObject("uni-media-library-co", {
        customUI: true
      });
      const result = await uniMediaLibraryCo.getImageLibraryProviders();
      this.providers = [...this.providers, ...result.data];
      this.$emit("onLoad", this.providers);
    }
  }
};
if (!Array) {
  const _component_image_library_logos = common_vendor.resolveComponent("image-library-logos");
  const _component_path = common_vendor.resolveComponent("path");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_image_library_logos + _component_path + _component_svg)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      provider: $props.provider
    }),
    b: common_vendor.p({
      d: "m6 9 6 6 6-6"
    }),
    c: common_vendor.p({
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      ["stroke-width"]: "1",
      ["stroke-linecap"]: "round",
      ["stroke-linejoin"]: "round"
    }),
    d: common_vendor.o(($event) => $data.showMenu = !$data.showMenu),
    e: $data.showMenu
  }, $data.showMenu ? {
    f: common_vendor.f($data.providers, (provider, k0, i0) => {
      return {
        a: "43219f8a-3-" + i0,
        b: common_vendor.p({
          provider: provider.provider
        }),
        c: common_vendor.t(provider.name),
        d: provider.provider,
        e: common_vendor.o(($event) => $options.onChange(provider.provider), provider.provider)
      };
    }),
    g: common_vendor.o(($event) => $data.showMenu = false)
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-43219f8a"]]);
wx.createComponent(Component);
