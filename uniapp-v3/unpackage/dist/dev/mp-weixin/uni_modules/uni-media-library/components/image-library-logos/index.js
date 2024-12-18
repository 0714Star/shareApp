"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "imageLibraryLogos",
  props: {
    provider: {
      type: String,
      default: () => "default"
    }
  }
};
if (!Array) {
  const _component_path = common_vendor.resolveComponent("path");
  const _component_g = common_vendor.resolveComponent("g");
  const _component_rect = common_vendor.resolveComponent("rect");
  const _component_clipPath = common_vendor.resolveComponent("clipPath");
  const _component_defs = common_vendor.resolveComponent("defs");
  const _component_svg = common_vendor.resolveComponent("svg");
  (_component_path + _component_g + _component_rect + _component_clipPath + _component_defs + _component_svg)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.provider === "unsplash"
  }, $props.provider === "unsplash" ? {
    b: common_vendor.p({
      d: "M8.625 8.0625V3H15.375V8.0625H8.625ZM15.375 10.875H21V21H3V10.875H8.625V15.9375H15.375V10.875Z",
      fill: "black"
    }),
    c: common_vendor.p({
      ["clip-path"]: "url(#clip0_254_3)"
    }),
    d: common_vendor.p({
      width: "18",
      height: "18",
      fill: "white",
      transform: "translate(3 3)"
    }),
    e: common_vendor.p({
      id: "clip0_254_3"
    }),
    f: common_vendor.p({
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    })
  } : $props.provider === "giphy" ? {
    h: common_vendor.p({
      ["fill-rule"]: "evenodd",
      ["clip-rule"]: "evenodd",
      d: "M4 3.71429H6.28571V20.2857H4V3.71429Z",
      fill: "#00FF99"
    }),
    i: common_vendor.p({
      ["fill-rule"]: "evenodd",
      ["clip-rule"]: "evenodd",
      d: "M17.7143 8.28571H20V20.2857H17.7143V8.28571Z",
      fill: "#9933FF"
    }),
    j: common_vendor.p({
      ["fill-rule"]: "evenodd",
      ["clip-rule"]: "evenodd",
      d: "M4 19.7143H20V22H4V19.7143Z",
      fill: "#00CCFF"
    }),
    k: common_vendor.p({
      ["fill-rule"]: "evenodd",
      ["clip-rule"]: "evenodd",
      d: "M4 2H13.1429V4.28571H4V2Z",
      fill: "#FFF35C"
    }),
    l: common_vendor.p({
      ["fill-rule"]: "evenodd",
      ["clip-rule"]: "evenodd",
      d: "M17.7143 6.57143V4.28571H15.4286V2H13.1429V8.85714H20V6.57143",
      fill: "#FF6666"
    }),
    m: common_vendor.p({
      ["fill-rule"]: "evenodd",
      ["clip-rule"]: "evenodd",
      d: "M17.7143 11.1429V8.85714H20M13.1429 2V4.28571H10.8571",
      fill: "black"
    }),
    n: common_vendor.p({
      ["clip-path"]: "url(#clip0_254_6)"
    }),
    o: common_vendor.p({
      width: "16",
      height: "20",
      fill: "white",
      transform: "translate(4 2)"
    }),
    p: common_vendor.p({
      id: "clip0_254_6"
    }),
    q: common_vendor.p({
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    })
  } : $props.provider === "pexels" ? {
    s: common_vendor.p({
      d: "M6.79819 18.3927H12.2032V13.2669H13.8329C14.9765 13.2669 16.0733 12.8173 16.882 12.017C17.6906 11.2168 18.1449 10.1313 18.1449 8.99957C18.1449 7.86779 17.6906 6.78238 16.882 5.98209C16.0733 5.1818 14.9765 4.73221 13.8329 4.73221H6.79819V18.3927ZM15.0022 21.125H4V2.00071H13.8329C15.6231 1.97555 17.3562 2.62378 18.682 3.81443C20.0079 5.00508 20.8277 6.64939 20.9758 8.41515C21.1239 10.1809 20.5892 11.9365 19.4798 13.3271C18.3704 14.7178 16.769 15.6399 14.9991 15.9072L15.0022 21.125Z",
      fill: "black"
    }),
    t: common_vendor.p({
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    })
  } : {
    v: common_vendor.p({
      d: "M5.7 21C5.34501 21.0015 4.99325 20.9327 4.665 20.7975C4.33675 20.6623 4.03851 20.4635 3.78749 20.2125C3.53648 19.9615 3.33765 19.6633 3.20249 19.335C3.06733 19.0068 2.99851 18.655 3 18.3V5.7C2.99851 5.34501 3.06733 4.99325 3.20249 4.665C3.33765 4.33675 3.53648 4.03851 3.78749 3.78749C4.03851 3.53648 4.33675 3.33765 4.665 3.20249C4.99325 3.06733 5.34501 2.99851 5.7 3H18.3C18.655 2.99851 19.0068 3.06733 19.335 3.20249C19.6633 3.33765 19.9615 3.53648 20.2125 3.78749C20.4635 4.03851 20.6623 4.33675 20.7975 4.665C20.9327 4.99325 21.0015 5.34501 21 5.7V18.3C21.0015 18.655 20.9327 19.0068 20.7975 19.335C20.6623 19.6633 20.4635 19.9615 20.2125 20.2125C19.9615 20.4635 19.6633 20.6623 19.335 20.7975C19.0068 20.9327 18.655 21.0015 18.3 21H5.7ZM5.7 19.65H18.3C18.4798 19.6554 18.6587 19.6231 18.8253 19.5553C18.9919 19.4875 19.1425 19.3856 19.2675 19.2563C19.392 19.1306 19.49 18.9812 19.5557 18.8169C19.6214 18.6527 19.6535 18.4769 19.65 18.3V5.7C19.6558 5.52115 19.6248 5.34302 19.559 5.17661C19.4932 5.0102 19.394 4.85906 19.2675 4.73253C19.1409 4.606 18.9898 4.50677 18.8234 4.44097C18.657 4.37518 18.4788 4.34421 18.3 4.35H5.7C5.52312 4.34652 5.34735 4.37859 5.18309 4.44429C5.01883 4.50999 4.86944 4.608 4.74375 4.7325C4.61436 4.85746 4.5125 5.00806 4.4447 5.17467C4.37689 5.34127 4.34464 5.52021 4.35 5.7V18.3C4.35 18.658 4.49223 19.0014 4.74541 19.2546C4.99858 19.5078 5.34196 19.65 5.7 19.65ZM7.14 17.175L10.2 14.115L11.8425 15.735L13.8 13.26L16.9275 17.175H7.14ZM8.4 9.975C8.08848 9.97502 7.78395 9.88266 7.52492 9.7096C7.26589 9.53654 7.064 9.29055 6.94478 9.00274C6.82557 8.71494 6.79438 8.39824 6.85516 8.0927C6.91594 7.78717 7.06596 7.50652 7.28625 7.28625C7.58164 6.99087 7.98226 6.82492 8.4 6.82492C8.81774 6.82492 9.21837 6.99087 9.51375 7.28625C9.80914 7.58164 9.97508 7.98226 9.97508 8.4C9.97508 8.81774 9.80914 9.21837 9.51375 9.51375C9.36946 9.66263 9.19619 9.78037 9.00464 9.8597C8.81308 9.93903 8.60731 9.97827 8.4 9.975Z",
      fill: "black"
    }),
    w: common_vendor.p({
      ["clip-path"]: "url(#clip0_258_35)"
    }),
    x: common_vendor.p({
      width: "18",
      height: "18",
      fill: "white",
      transform: "translate(3 3)"
    }),
    y: common_vendor.p({
      id: "clip0_258_35"
    }),
    z: common_vendor.p({
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    })
  }, {
    g: $props.provider === "giphy",
    r: $props.provider === "pexels"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
