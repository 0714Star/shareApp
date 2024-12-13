"use strict";
const uni_modules_uniPopup_components_uniPopup_popup = require("../uni-popup/popup.js");
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniPopup_components_uniPopup_i18n_index = require("../uni-popup/i18n/index.js");
const { t } = common_vendor.initVueI18n(uni_modules_uniPopup_components_uniPopup_i18n_index.messages);
const _sfc_main = {
  name: "UniPopupShare",
  mixins: [uni_modules_uniPopup_components_uniPopup_popup.popup],
  emits: ["select"],
  props: {
    title: {
      type: String,
      default: ""
    },
    beforeClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bottomData: [
        {
          text: "微信",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2b17470-50be-11eb-b680-7980c8a877b8.png",
          name: "wx"
        },
        {
          text: "支付宝",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/d684ae40-50be-11eb-8ff1-d5dcf8779628.png",
          name: "wx"
        },
        {
          text: "QQ",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/e7a79520-50be-11eb-b997-9918a5dda011.png",
          name: "qq"
        },
        {
          text: "新浪",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0dacdbe0-50bf-11eb-8ff1-d5dcf8779628.png",
          name: "sina"
        }
        // {
        // 	text: '百度',
        // 	icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/1ec6e920-50bf-11eb-8a36-ebb87efcf8c0.png',
        // 	name: 'copy'
        // },
        // {
        // 	text: '其他',
        // 	icon: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/2e0fdfe0-50bf-11eb-b997-9918a5dda011.png',
        // 	name: 'more'
        // }
      ]
    };
  },
  created() {
  },
  computed: {
    cancelText() {
      return t("uni-popup.cancel");
    },
    shareTitleText() {
      return this.title || t("uni-popup.shareTitle");
    }
  },
  methods: {
    /**
     * 选择内容
     */
    select(item, index) {
      this.$emit("select", {
        item,
        index
      });
      this.close();
    },
    /**
     * 关闭窗口
     */
    close() {
      if (this.beforeClose)
        return;
      this.popup.close();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.shareTitleText),
    b: common_vendor.f($data.bottomData, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.select(item, index), index)
      };
    }),
    c: common_vendor.t($options.cancelText),
    d: common_vendor.o((...args) => $options.close && $options.close(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
