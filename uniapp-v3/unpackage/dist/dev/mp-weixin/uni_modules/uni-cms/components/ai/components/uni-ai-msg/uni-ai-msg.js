"use strict";
const uni_modules_uniCms_components_ai_static_markdownIt_min = require("../../static/markdown-it.min.js");
const uni_modules_uniCms_components_ai_static_highlightUni_min = require("../../static/highlight-uni.min.js");
const uni_modules_uniCms_components_ai_static_htmlParser = require("../../static/html-parser.js");
const common_vendor = require("../../../../../../common/vendor.js");
const markdownIt = uni_modules_uniCms_components_ai_static_markdownIt_min.mt({
  html: true,
  highlight: function(str, lang) {
    try {
      return '<pre class="hljs" style="padding: 5px 8px;margin: 5px 0;overflow: auto;"><code>' + uni_modules_uniCms_components_ai_static_highlightUni_min.$e.highlightAuto(str).value + "</code></pre>";
    } catch (__) {
    }
    return '<pre class="hljs" style="padding: 5px 8px;margin: 5px 0;overflow: auto;"><code>' + markdownIt.utils.escapeHtml(str) + "</code></pre>";
  }
});
const _sfc_main = {
  name: "msg",
  data() {
    return {
      left: "-100px",
      top: "-100px"
    };
  },
  mounted() {
  },
  props: {
    md: {
      type: String,
      default() {
        return "";
      }
    },
    showCursor: {
      type: [Boolean, Number],
      default() {
        return false;
      }
    }
  },
  computed: {
    html() {
      if (this.md.split("```").length % 2) {
        return markdownIt.render(this.md + ' \n <span class="cursor">|</span>');
      } else {
        return markdownIt.render(this.md) + ' \n <span class="cursor">|</span>';
      }
    },
    nodes() {
      return uni_modules_uniCms_components_ai_static_htmlParser.parseHtml(this.html);
    }
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.nodes && $options.nodes.length
  }, $options.nodes && $options.nodes.length ? {
    b: $options.nodes
  } : {}, {
    c: $props.showCursor ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
