"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      title: "uni-fab",
      directionStr: "垂直",
      horizontal: "left",
      vertical: "bottom",
      direction: "horizontal",
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      is_color_type: false,
      content: [
        {
          iconPath: "/static/image.png",
          selectedIconPath: "/static/image-active.png",
          text: "相册",
          active: false
        },
        {
          iconPath: "/static/home.png",
          selectedIconPath: "/static/home-active.png",
          text: "首页",
          active: false
        },
        {
          iconPath: "/static/star.png",
          selectedIconPath: "/static/star-active.png",
          text: "收藏",
          active: false
        }
      ]
    };
  },
  onBackPress() {
    if (this.$refs.fab.isShow) {
      this.$refs.fab.close();
      return true;
    }
    return false;
  },
  methods: {
    trigger(e) {
      console.log(e);
      this.content[e.index].active = !e.item.active;
      common_vendor.index.showModal({
        title: "提示",
        content: `您${this.content[e.index].active ? "选中了" : "取消了"}${e.item.text}`,
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    fabClick() {
      common_vendor.index.showToast({
        title: "点击了悬浮按钮",
        icon: "none"
      });
    },
    switchBtn(hor, ver) {
      if (hor === 0) {
        this.direction = this.direction === "horizontal" ? "vertical" : "horizontal";
        this.directionStr = this.direction === "horizontal" ? "垂直" : "水平";
      } else {
        this.horizontal = hor;
        this.vertical = ver;
      }
      this.$forceUpdate();
    },
    switchColor() {
      this.is_color_type = !this.is_color_type;
      if (this.is_color_type) {
        this.pattern.iconColor = "#aaa";
        this.pattern.buttonColor = "#fff";
      } else {
        this.pattern.iconColor = "#fff";
        this.pattern.buttonColor = "#007AFF";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_fab2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.t($data.directionStr),
    c: common_vendor.o(($event) => $options.switchBtn(0)),
    d: common_vendor.o(($event) => $options.switchBtn("left", "bottom")),
    e: common_vendor.o(($event) => $options.switchBtn("right", "bottom")),
    f: common_vendor.o(($event) => $options.switchBtn("left", "top")),
    g: common_vendor.o(($event) => $options.switchBtn("left", "top")),
    h: common_vendor.o(($event) => $options.switchBtn("right", "top")),
    i: common_vendor.o((...args) => $options.switchColor && $options.switchColor(...args)),
    j: common_vendor.p({
      title: "基本功能",
      subTitle: "点击按钮,切换 fab 不同状态",
      type: "line"
    }),
    k: common_vendor.sr("fab", "a35532e4-2"),
    l: common_vendor.o($options.trigger),
    m: common_vendor.o($options.fabClick),
    n: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: $data.horizontal,
      vertical: $data.vertical,
      direction: $data.direction
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
