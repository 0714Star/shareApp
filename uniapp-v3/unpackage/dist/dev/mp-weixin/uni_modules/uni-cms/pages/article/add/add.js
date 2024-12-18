"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniCms_common_validator_uniCmsArticles = require("../../../common/validator/uni-cms-articles.js");
const uni_modules_uniCms_common_autoSaveMixin = require("../../../common/auto-save-mixin.js");
const uni_modules_uniCms_common_parseImageUrl = require("../../../common/parse-image-url.js");
const EditorComponent = () => "../../../components/editor/editor.js";
const db = common_vendor.Zs.database();
db.command;
const dbCollectionName = "uni-cms-articles";
function getValidator(fields) {
  let result = {};
  for (let key in uni_modules_uniCms_common_validator_uniCmsArticles.validator) {
    if (fields.includes(key)) {
      result[key] = uni_modules_uniCms_common_validator_uniCmsArticles.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  components: {
    EditorComponent
  },
  mixins: [uni_modules_uniCms_common_autoSaveMixin.autoSaveMixin],
  data() {
    let formData = {
      "user_id": common_vendor.Zs.getCurrentUserInfo().uid,
      "category_id": "",
      "title": "",
      "content": {},
      "excerpt": "",
      "article_status": 0,
      "is_sticky": null,
      "is_essence": null,
      "comment_status": null,
      "thumbnail": [{}]
    };
    return {
      formData,
      // 表单数据
      formOptions: {
        "comment_status_localdata": [
          {
            "value": 0,
            "text": "关闭"
          },
          {
            "value": 1,
            "text": "开放"
          }
        ]
      },
      rules: {
        ...getValidator(Object.keys(formData))
        // 表单验证规则
      },
      formats: {},
      // 编辑器格式
      wordCount: null,
      // 字数统计
      drawerWidth: 0,
      // 插入图片抽屉宽度
      autoGetCover: true,
      // 是否自动获取封面
      thumbMode: 1
      // 封面图展示方式
    };
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  mounted() {
    const sysinfo = common_vendor.index.getSystemInfoSync();
    this.drawerWidth = sysinfo.windowWidth * 0.8;
  },
  methods: {
    // 封面图展示方式改变
    thumbModeChange(e) {
      const coverCount = Number(e.detail.value);
      this.formData.thumbnail = Array.from(new Array(coverCount)).map((item, index) => {
        if (this.formData.thumbnail[index]) {
          return this.formData.thumbnail[index];
        } else {
          return {};
        }
      });
      this.thumbMode = coverCount;
    },
    // 监听富文本编辑器内容变化
    onTextChange(e) {
      this.wordCount = e.detail;
      this.autoGetEditorImage();
      this.autoSaveContent && this.autoSaveContent();
    },
    autoGetEditorImage() {
      if (!this.autoGetCover || this.thumbMode === 0)
        return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.editorCtx.getContents({
          success: (res) => {
            const { delta } = res;
            const imageList = [];
            delta.ops.forEach((item) => {
              if (item.insert && item.insert.image) {
                if (!item.attributes || !item.attributes.class || item.attributes.class.indexOf("uploading") === -1) {
                  const parseEditorImages = uni_modules_uniCms_common_parseImageUrl.parseEditorImage(item);
                  imageList.push(parseEditorImages[0]);
                }
              }
            });
            if (imageList.length <= 0)
              return;
            const newThumbnail = [...this.formData.thumbnail];
            for (let i = 0; i < newThumbnail.length; i++) {
              const thumbnail = newThumbnail[i];
              if (thumbnail !== imageList[i].source) {
                newThumbnail[i] = imageList[i] || {};
              }
            }
            this.formData.thumbnail = newThumbnail;
          },
          fail: (e) => {
            console.error(e);
          }
        });
      }, 1e3);
    },
    // 富文本编辑器初始化完成后触发
    onEditorReady(editorCtx) {
      if (!editorCtx)
        return;
      this.editorCtx = editorCtx;
    },
    /**
     * 验证表单并提交
     */
    submit(status) {
      if (!this.formData.title) {
        common_vendor.index.hideLoading();
        return common_vendor.index.showToast({
          icon: "none",
          title: "文章标题必填"
        });
      }
      if (this.formData.thumbnail) {
        for (const thumbnail of this.formData.thumbnail) {
          if (!thumbnail.source) {
            common_vendor.index.hideLoading();
            return common_vendor.index.showToast({
              icon: "none",
              title: "封面图必填"
            });
          }
        }
      }
      this.$refs.form.validate().then((res) => {
        this.editorCtx.getContents({
          success: (e) => {
            this.submitForm({
              ...res,
              thumbnail: this.formData.thumbnail.map((thumb) => thumb.source),
              article_status: status,
              title: this.formData.title.trim(),
              content: e.delta,
              publish_date: Date.now()
            });
          }
        });
      }).catch((e) => {
        console.error(e);
      });
    },
    /**
     * 提交表单
     */
    submitForm(value) {
      common_vendor.index.showLoading({
        mask: true
      });
      return db.collection(dbCollectionName).add(value).then((res) => {
        common_vendor.index.showToast({
          icon: "none",
          title: value.article_status === 0 ? "保存成功" : "发布成功"
        });
        try {
          this.getOpenerEventChannel().emit("refreshData");
        } catch (e) {
        }
        this.clearAutoSaveStorage && this.clearAutoSaveStorage();
        setTimeout(() => {
          if (value.article_status === 0) {
            common_vendor.index.redirectTo({
              url: "/uni_modules/uni-cms/pages/article/edit/edit?id=" + res.result.id
            });
          } else {
            common_vendor.index.navigateBack();
          }
        }, 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    // 返回上一页或跳转到文章列表页
    navigateBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack(-1);
      } else {
        common_vendor.index.redirectTo({
          url: "/uni_modules/uni-cms/pages/article/list/list"
        });
      }
    },
    openInsertImageDrawer(index) {
      this.$refs.insertImageDrawer.open();
      this.coverIndex = index;
    },
    async onInsertCover(selectMediaItems) {
      const coverIndex = this.coverIndex !== null ? this.coverIndex : 0;
      const image = selectMediaItems[0];
      const newThumbnail = [...this.formData.thumbnail];
      const parseImages = await uni_modules_uniCms_common_parseImageUrl.parseImageUrl(image.src);
      newThumbnail[coverIndex] = parseImages[0];
      this.$refs.insertImageDrawer.close();
      this.formData.thumbnail = newThumbnail;
    },
    removeThumbnail(index) {
      const newThumbnail = [...this.formData.thumbnail];
      newThumbnail[index] = {};
      this.formData.thumbnail = newThumbnail;
      this.autoGetCover = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_editor_component = common_vendor.resolveComponent("editor-component");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _component_uni_data_picker = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_media_library2 = common_vendor.resolveComponent("uni-media-library");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_easycom_uni_icons2 + _component_editor_component + _easycom_uni_forms_item2 + _component_uni_data_picker + _easycom_uni_forms2 + _easycom_uni_media_library2 + _easycom_uni_drawer2)();
}
const _easycom_uni_icons = () => "../../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms_item = () => "../../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_media_library = () => "../../../../uni-media-library/components/uni-media-library/uni-media-library.js";
const _easycom_uni_drawer = () => "../../../../uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_media_library + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "back",
      size: "24"
    }),
    b: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    c: common_vendor.o([($event) => $data.formData.title = $event.detail.value, () => _ctx.autoSaveContent && _ctx.autoSaveContent()]),
    d: $data.formData.title,
    e: common_vendor.o($options.onTextChange),
    f: common_vendor.o($options.onEditorReady),
    g: common_vendor.o([($event) => $data.formData.excerpt = $event.detail.value, () => _ctx.autoSaveContent && _ctx.autoSaveContent()]),
    h: $data.formData.excerpt,
    i: common_vendor.p({
      name: "excerpt",
      label: "文章摘要"
    }),
    j: $data.thumbMode === 1,
    k: $data.thumbMode === 3,
    l: $data.thumbMode === 0,
    m: common_vendor.o((...args) => $options.thumbModeChange && $options.thumbModeChange(...args)),
    n: $data.thumbMode > 0
  }, $data.thumbMode > 0 ? {
    o: common_vendor.f($data.formData.thumbnail, (thumbnail, index, i0) => {
      return common_vendor.e({
        a: thumbnail.source
      }, thumbnail.source ? {
        b: "0e626413-5-" + i0 + ",0e626413-4",
        c: common_vendor.p({
          type: "closeempty",
          size: "16",
          color: "#fff"
        }),
        d: common_vendor.o(() => $options.removeThumbnail(index), thumbnail.source),
        e: thumbnail.src
      } : {
        f: common_vendor.o(() => $options.openInsertImageDrawer(index), thumbnail.source),
        g: "0e626413-6-" + i0 + ",0e626413-4",
        h: common_vendor.p({
          type: "plusempty",
          size: "60",
          color: "#e8e8e8"
        })
      }, {
        i: thumbnail.source
      });
    })
  } : {}, {
    p: $data.thumbMode > 0
  }, $data.thumbMode > 0 ? {} : {}, {
    q: common_vendor.p({
      name: "thumbnail",
      label: "封面",
      required: true
    }),
    r: common_vendor.o(($event) => $data.formData.user_id = $event),
    s: common_vendor.p({
      collection: "uni-id-users",
      where: "role=='uni-cms-author'||role=='admin'",
      field: "nickname as text, _id as value",
      modelValue: $data.formData.user_id
    }),
    t: common_vendor.p({
      name: "user_id",
      label: "作者",
      required: true
    }),
    v: common_vendor.o(($event) => $data.formData.category_id = $event),
    w: common_vendor.p({
      collection: "uni-cms-categories",
      field: "name as text, _id as value",
      modelValue: $data.formData.category_id
    }),
    x: common_vendor.p({
      name: "category_id",
      label: "分类"
    }),
    y: common_vendor.o(($event) => $options.submit(0)),
    z: common_vendor.o(($event) => $options.submit(1)),
    A: common_vendor.sr("form", "0e626413-1"),
    B: common_vendor.p({
      ["label-width"]: 90,
      model: $data.formData,
      validateTrigger: "submit",
      ["err-show-type"]: "toast"
    }),
    C: _ctx.autoSave
  }, _ctx.autoSave ? {
    D: common_vendor.t(_ctx.autoSave.status === 1 ? "自动保存中..." : "已自动保存")
  } : {}, {
    E: $data.wordCount !== null
  }, $data.wordCount !== null ? {
    F: common_vendor.t($data.wordCount)
  } : {}, {
    G: common_vendor.o(($event) => $options.submit(0)),
    H: common_vendor.o(($event) => $options.submit(1)),
    I: $data.drawerWidth
  }, $data.drawerWidth ? {
    J: common_vendor.o($options.onInsertCover),
    K: common_vendor.p({
      mode: "picker",
      ["selected-count"]: 1,
      ["media-tabs"]: ["image"]
    }),
    L: common_vendor.sr("insertImageDrawer", "0e626413-11"),
    M: common_vendor.p({
      mode: "right",
      width: $data.drawerWidth
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
