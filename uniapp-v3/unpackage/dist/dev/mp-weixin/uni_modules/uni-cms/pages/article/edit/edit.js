"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniCms_common_translateContent = require("../../../common/translate-content.js");
const uni_modules_uniCms_common_validator_uniCmsArticles = require("../../../common/validator/uni-cms-articles.js");
const uni_modules_uniCms_common_autoSaveMixin = require("../../../common/auto-save-mixin.js");
const uni_modules_uniCms_common_parseImageUrl = require("../../../common/parse-image-url.js");
const EditorComponent = () => "../../../components/editor/editor.js";
const db = common_vendor.Zs.database();
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
      "user_id": "",
      "category_id": "",
      "title": "",
      "content": null,
      "excerpt": "",
      "article_status": 0,
      "is_sticky": null,
      "is_essence": null,
      "comment_status": null,
      "thumbnail": [{}],
      "publish_date": null
    };
    return {
      // 初始化表单数据的id
      formDataId: "",
      // 表单数据
      formData,
      // 表单选项
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
      // 表单验证规则
      rules: {
        ...getValidator(Object.keys(formData))
      },
      // 编辑器格式
      formats: {},
      // 字数统计
      wordCount: null,
      // 插入图片抽屉宽度
      drawerWidth: 0,
      // 封面图展示方式
      thumbMode: 1
    };
  },
  // 当页面准备好时，设置表单验证规则
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  // 当页面加载时，如果有id则获取表单数据
  onLoad(e) {
    if (e.id) {
      const id = e.id;
      this.formDataId = id;
      this.getDetail(id);
    }
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
    /**
     * 获取表单数据
     * @param {String} id - 文章id
     */
    getDetail(id) {
      common_vendor.index.showLoading({
        mask: true
      });
      db.collection(dbCollectionName).doc(id).field("is_admin,user_id,category_id,title,content,excerpt,article_status,is_sticky,is_essence,comment_status,thumbnail,publish_date").get().then((res) => {
        const data = res.result.data[0];
        if (data) {
          this.formData = data;
          const thumbnail = typeof this.formData.thumbnail === "string" ? [this.formData.thumbnail] : this.formData.thumbnail;
          this.thumbMode = this.formData.thumbnail && this.formData.thumbnail.length ? this.formData.thumbnail.length : 0;
          this.setContents();
          uni_modules_uniCms_common_parseImageUrl.parseImageUrl(thumbnail).then((res2) => {
            this.formData.thumbnail = res2;
          });
        }
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    /**
     * 当编辑器准备好时，设置编辑器内容
     * @param {Object} editorCtx - 编辑器上下文
     */
    onEditorReady(editorCtx) {
      if (!editorCtx)
        return;
      this.editorCtx = editorCtx;
      this.setContents();
    },
    /**
     * 设置编辑器内容
     */
    setContents() {
      if (this.editorCtx && this.formData.content) {
        const content = uni_modules_uniCms_common_translateContent.translateInputContent(this.formData.content);
        this.editorCtx.setContents({
          delta: content
        });
      }
    },
    /**
     * 验证表单并提交
     * @param {Number} status - 文章状态
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
      return new Promise((resolve) => {
        this.$refs.form.validate().then((res) => {
          this.editorCtx.getContents({
            success: async (e) => {
              await this.submitForm({
                ...res,
                thumbnail: this.formData.thumbnail.map((item) => item.source),
                article_status: status,
                title: this.formData.title,
                content: uni_modules_uniCms_common_translateContent.translateOutputContent(e.delta),
                publish_date: this.formData.publish_date ? this.formData.publish_date : Date.now()
              });
              resolve();
            }
          });
        }).catch((e) => {
          console.error(e);
        });
      });
    },
    /**
     * 提交表单
     * @param {Object} value - 表单数据
     */
    submitForm(value) {
      common_vendor.index.showLoading({
        mask: true
      });
      return db.collection(dbCollectionName).doc(this.formDataId).update(value).then(() => {
        common_vendor.index.showToast({
          icon: "none",
          title: value.article_status === 0 ? "保存成功" : this.formData.article_status === 0 ? "发布成功" : "更新成功"
        });
        try {
          this.getOpenerEventChannel().emit("refreshData");
        } catch (e) {
        }
        this.clearAutoSaveStorage && this.clearAutoSaveStorage();
        setTimeout(() => {
          if (value.article_status === 1) {
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
    /**
     * 文本内容变化时更新字数统计
     * @param {Object} e - 文本内容变化事件
     */
    onTextChange(e) {
      this.wordCount = e.detail;
      this.autoSaveContent && this.autoSaveContent();
    },
    /**
     * 返回上一页或跳转到文章列表页
     */
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
    },
    async previewArticle() {
      if (this.formDataId) {
        await this.submit(0);
        this.$refs.popup.open();
      }
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
        b: "509e04cf-5-" + i0 + ",509e04cf-4",
        c: common_vendor.p({
          type: "closeempty",
          size: "16",
          color: "#fff"
        }),
        d: common_vendor.o(() => $options.removeThumbnail(index), thumbnail.source),
        e: thumbnail.src
      } : {
        f: common_vendor.o(() => $options.openInsertImageDrawer(index), thumbnail.source),
        g: "509e04cf-6-" + i0 + ",509e04cf-4",
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
    y: $data.formData.article_status === 0
  }, $data.formData.article_status === 0 ? {
    z: common_vendor.o(($event) => $options.submit(0))
  } : {}, {
    A: common_vendor.o(($event) => $options.submit(1)),
    B: common_vendor.sr("form", "509e04cf-1"),
    C: common_vendor.p({
      ["label-width"]: 90,
      model: $data.formData,
      validateTrigger: "submit",
      ["err-show-type"]: "toast"
    }),
    D: _ctx.autoSave
  }, _ctx.autoSave ? {
    E: common_vendor.t(_ctx.autoSave.status === 1 ? "自动保存中..." : "已自动保存")
  } : {}, {
    F: $data.wordCount !== null
  }, $data.wordCount !== null ? {
    G: common_vendor.t($data.wordCount)
  } : {}, {
    H: $data.formData.article_status === 0
  }, $data.formData.article_status === 0 ? {
    I: common_vendor.o(($event) => $options.submit(0))
  } : {}, {
    J: common_vendor.t($data.formData.article_status === 0 ? "发布" : "更新"),
    K: common_vendor.o(($event) => $options.submit(1)),
    L: $data.drawerWidth
  }, $data.drawerWidth ? {
    M: common_vendor.o($options.onInsertCover),
    N: common_vendor.p({
      mode: "picker",
      ["selected-count"]: 1,
      ["media-tabs"]: ["image"]
    }),
    O: common_vendor.sr("insertImageDrawer", "509e04cf-11"),
    P: common_vendor.p({
      mode: "right",
      width: $data.drawerWidth
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
