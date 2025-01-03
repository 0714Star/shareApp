"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const _sfc_main = {
  name: "color",
  emits: ["change"],
  props: {
    clearColor: String
  },
  data() {
    return {
      colors: [
        "#505050",
        "#666666",
        "#999999",
        "#CACACA",
        "#D8D8D8",
        "#E8E8E8",
        "#F2F2F2",
        "#F8F8F8",
        "#FFFFFF",
        "#F04142",
        "#EB28BD",
        "#8F2BFF",
        "#1A74FF",
        "#00ABAB",
        "#00AA54",
        "#70B500",
        "#FFBA12",
        "#FF7528",
        "#996D39",
        "#FFD1D1",
        "#FFBAEF",
        "#E0C4FF",
        "#C1E1F7",
        "#C7F2F2",
        "#C2EDD8",
        "#DEF7B5",
        "#FFEBBA",
        "#FFD8C2",
        "#F5D8B6",
        "#FF8585",
        "#FF87E3",
        "#C087FF",
        "#599AFF",
        "#5ED1D1",
        "#69CF9C",
        "#ACDE5B",
        "#FFD05E",
        "#FFA775",
        "#C79254",
        "#FF5E5E",
        "#F54CCD",
        "#AE66FF",
        "#3D89FF",
        "#39C4C4",
        "#3BBF7D",
        "#8ECC29",
        "#FFC740",
        "#FF8E4F",
        "#C0833B",
        "#B83232",
        "#B31E90",
        "#641EB3",
        "#1356BD",
        "#008585",
        "#008542",
        "#508200",
        "#CC950E",
        "#B3521C",
        "#815A2C",
        "#7A2122",
        "#75145E",
        "#4B1785",
        "#0E408C",
        "#005C5C",
        "#005E2F",
        "#314F00",
        "#856109",
        "#662F10",
        "#634119"
      ],
      customColor: "#000000"
    };
  },
  methods: {
    change(color) {
      this.$emit("change", {
        color: color === void 0 ? this.customColor : color
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.clearColor,
    b: common_vendor.o(($event) => $options.change(null)),
    c: common_vendor.f($data.colors, (color, k0, i0) => {
      return {
        a: color,
        b: common_vendor.o(($event) => $options.change(color), color),
        c: color
      };
    }),
    d: $data.customColor,
    e: $data.customColor,
    f: common_vendor.o(($event) => $data.customColor = $event.detail.value),
    g: common_vendor.o(($event) => $options.change())
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e10530f2"]]);
wx.createComponent(Component);
