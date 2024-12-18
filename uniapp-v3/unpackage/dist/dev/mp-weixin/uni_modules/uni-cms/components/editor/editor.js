"use strict";
const common_vendor = require("../../../../common/vendor.js");
const ToolColor = () => "./tools/color.js";
const ToolBold = () => "./tools/bold.js";
const ToolItalic = () => "./tools/italic.js";
const ToolStrike = () => "./tools/strike.js";
const ToolList = () => "./tools/list.js";
const ToolHr = () => "./tools/hr.js";
const ToolUndo = () => "./tools/undo.js";
const ToolRedo = () => "./tools/redo.js";
const ToolHeader = () => "./tools/header.js";
const ToolAlign = () => "./tools/align.js";
const ToolLink = () => "./tools/link.js";
const ToolUnderline = () => "./tools/underline.js";
const ToolLineIndent = () => "./tools/line-indent.js";
const ToolSpaceBoth = () => "./tools/space-both.js";
const ToolLineHeight = () => "./tools/line-height.js";
const ToolLetterSpace = () => "./tools/letter-space.js";
const ToolBackground = () => "./tools/background.js";
const ToolImage = () => "./tools/image.js";
const ToolFormatClear = () => "./tools/format-clear.js";
const ToolUnlockContent = () => "./tools/unlock-content.js";
const ToolAi = () => "./tools/ai.js";
const ToolVideo = () => "./tools/video.js";
const uniImChat = () => "../ai/chat.js";
const ToolFontSize = () => "./tools/font-size.js";
const _sfc_main = {
  name: "editor",
  emits: ["change", "textchange"],
  components: {
    ToolBackground,
    ToolLetterSpace,
    ToolLineHeight,
    ToolLineIndent,
    ToolUnderline,
    ToolAlign,
    ToolUndo,
    ToolItalic,
    ToolBold,
    ToolStrike,
    ToolList,
    ToolHr,
    ToolRedo,
    ToolHeader,
    ToolLink,
    ToolSpaceBoth,
    ToolImage,
    ToolColor,
    ToolFormatClear,
    ToolUnlockContent,
    ToolAi,
    ToolVideo,
    uniImChat,
    ToolFontSize
  },
  data() {
    return {
      formats: {},
      // 编辑器格式状态
      keyboardHeight: 0,
      // 键盘高度
      showFooterToolBar: false,
      // 是否显示底部工具栏
      showToolSettingMask: false,
      // 是否显示工具栏设置遮罩层
      showInsertBlockToolSetting: false,
      // 是否显示插入块工具栏
      showToolPopup: "",
      // 当前工具栏弹出的工具名称，为空则表示没有弹出的工具
      toolPopupRect: {},
      // 弹出工具栏的位置和大小
      showImChat: false,
      // 是否显示 AI 聊天窗口
      currentLink: {
        // 当前链接的信息
        title: "",
        // 链接标题
        url: ""
        // 链接URL
      },
      drawerWidth: 0
      // 插入图片抽屉宽度
    };
  },
  computed: {
    // `editorHeight`计算属性，返回编辑器高度。当键盘弹出时，编辑器高度为键盘高度减去工具栏高度，否则为窗口高度减去工具栏高度
    editorHeight() {
      const toolbarHeight = 150;
      let toolHeight = 0;
      if (this.showToolPopup !== "") {
        toolHeight = 50;
      }
      return this.keyboardHeight > 0 ? this.systemInfo.windowHeight - this.keyboardHeight - toolbarHeight - toolHeight : 0;
    }
  },
  watch: {
    // 监听`showFooterToolBar`属性，当值为false时，清空弹出工具栏名称和弹出工具栏位置信息
    showFooterToolBar(newValue) {
      if (!newValue) {
        this.showToolPopup = "";
        this.toolPopupRect = {};
      }
    }
  },
  mounted() {
    this.systemInfo = common_vendor.index.getSystemInfoSync();
    this.drawerWidth = this.systemInfo.windowWidth * 0.8;
  },
  methods: {
    // 编辑器加载完成时触发
    onEditorReady(editorCtx) {
      this.createSelectorQuery().select("#editor").context((res) => {
        this.editorCtx = res.context;
        this.$emit("ready", res.context);
      }).exec();
      common_vendor.index.onKeyboardHeightChange(this.onKeyboardHeightChange.bind(this));
    },
    // 监听键盘高度变化事件
    onKeyboardHeightChange(res) {
      if (res.height < 20 || res.height === this.keyboardHeight)
        return;
      const duration = res.height > 0 ? res.duration * 1e3 : 0;
      setTimeout(() => {
        common_vendor.index.pageScrollTo({
          scrollTop: 0,
          success: () => {
            this.updatePosition(res.height);
            setTimeout(() => this.editorCtx.scrollIntoView(), 0);
          }
        });
      }, duration);
    },
    // 更新键盘高度
    updatePosition(keyboardHeight) {
      this.keyboardHeight = keyboardHeight;
    },
    // 显示工具栏弹出层
    showToolPopupView(id) {
      common_vendor.index.createSelectorQuery().in(this).select("#" + id).boundingClientRect((btnData) => {
        common_vendor.index.createSelectorQuery().in(this).select("#" + id + "-popup").boundingClientRect((popupData) => {
          const center = popupData.width / 2;
          if (btnData.left > center) {
            this.toolPopupRect.left = btnData.left - center + btnData.width / 2;
          } else {
            this.toolPopupRect.left = 10;
          }
          if (popupData.width > this.systemInfo.windowWidth) {
            this.toolPopupRect.right = 10;
          }
          this.showToolPopup = this.showToolPopup !== id ? id : "";
          if (this.showToolPopup === "") {
            this.toolPopupRect = {};
          }
        }).exec();
      }).exec();
    },
    // 显示插入块元素工具栏
    showInsertBlockView() {
      this.editorCtx.blur();
      common_vendor.index.hideKeyboard();
      this.showToolSettingMask = true;
      this.showInsertBlockToolSetting = true;
      this.showToolPopup = false;
      this.toolPopupRect = {};
    },
    // 关闭插入块元素工具栏
    closeToolSetting() {
      this.showToolSettingMask = false;
      this.showInsertBlockToolSetting = false;
    },
    // 编辑器辑器状态改变时触发
    onStatusChange(e) {
      this.formats = e.detail;
    },
    // 编辑器获取焦点时触发
    onEditorFocus() {
      this.showFooterToolBar = true;
    },
    // 编辑器失去焦点时触发
    onEditorBlur() {
      this.updatePosition(0);
      this.showFooterToolBar = false;
    },
    // 手动隐藏键盘
    hideKeyboard() {
      this.editorCtx.blur();
    },
    // 设置编辑器格式
    format(name, value) {
      if (!name || !this.editorCtx)
        return;
      switch (name) {
        case "hr":
          this.editorCtx.insertDivider();
          break;
        case "undo":
          this.editorCtx.undo();
          break;
        case "redo":
          this.editorCtx.redo();
          break;
        case "link":
          this.editorCtx.insertText({
            text: `[${value.text}](${value.link})`
          });
          break;
        case "space-both":
          this.editorCtx.format("marginLeft", value);
          this.editorCtx.format("marginRight", value);
          break;
        case "format-clear":
          this.editorCtx.removeFormat();
          break;
        case "image":
          this.editorCtx.insertImage(value);
          break;
        case "unlockContent":
          const isExist = document.querySelector(".ql-unlock-content");
          if (isExist) {
            common_vendor.index.showModal({
              content: "付费解锁不允许重新插入",
              showCancel: false
            });
            return;
          }
          this.editorCtx.insertUnlockContent(value);
          break;
        case "ai":
          this.showImChat = !this.showImChat;
          break;
        case "mediaVideo":
          break;
        default:
          this.editorCtx.format(name, value);
          break;
      }
      setTimeout(() => this.editorCtx.scrollIntoView(), 100);
    },
    // 获取编辑器所选内容的格式
    getFormat(range) {
      this.formats = range ? this.editorCtx.getFormat(range) : {};
      return this.formats;
    },
    // 复制图片进入编辑器上传
    uploadHandlerForH5({ blob, ext, size }, el) {
      return new Promise((resolve, reject) => {
        this.uploadEditorImage({
          filePath: blob,
          fileExt: ext,
          size
        }).then((fileID) => {
          resolve(fileID);
        }).catch((error) => {
          Quill && Quill.find(el).deleteAt(0);
          common_vendor.index.showModal({
            content: error.message,
            showCancel: false
          });
          reject();
        }).finally(() => {
          common_vendor.index.hideLoading();
        });
      });
    },
    onInsertImage(selectMediaItems) {
      const image = selectMediaItems[0];
      this.$refs.insertImageDrawer.close();
      this.format("image", {
        src: image.src,
        data: {
          source: image.src
        }
      });
      setTimeout(() => this.editorCtx.scrollIntoView(), 0);
    },
    uploadEditorImage({ filePath, fileExt, size }) {
      common_vendor.index.showLoading({
        title: "上传中..."
      });
      return new Promise((resolve, reject) => {
        new Promise((res, rej) => {
          common_vendor.Zs.uploadFile({
            filePath,
            cloudPath: `cms/media/images/${Date.now()}_${Math.round(Math.random() * 1e4)}.${fileExt || "jpg"}`,
            fileType: "image",
            success: (_res) => {
              res(_res);
            },
            fail: (error) => {
              rej(error);
            },
            complete: () => {
              common_vendor.index.hideLoading();
            }
          });
        }).then((res) => {
          common_vendor.index.showLoading({
            title: "图片检测中..."
          });
          const uniCmsCo = common_vendor.Zs.importObject("uni-cms-co", {
            customUI: true
          });
          return uniCmsCo.checkImageSec(res.fileID).then(() => {
            return res.fileID;
          });
        }).then((fileID) => {
          const isCloudFile = fileID.startsWith("cloud://");
          if (!isCloudFile)
            return fileID;
          return common_vendor.Zs.getTempFileURL({
            fileList: [fileID]
          }).then((res) => {
            if (res.fileList && res.fileList.length) {
              return res.fileList[0].tempFileURL;
            }
            return fileID;
          });
        }).then((fileID) => {
          common_vendor.index.showLoading({
            title: "上传媒体库..."
          });
          const uniMediaLibrary = common_vendor.Zs.importObject("uni-media-library-co", {
            customUI: true
          });
          return new Promise((_resolve) => {
            const image = new Image();
            image.onload = () => {
              _resolve({
                fileID,
                width: image.width,
                height: image.height
              });
            };
            image.src = fileID;
          }).then(({ fileID: fileID2, width, height }) => {
            return uniMediaLibrary.report({
              src: fileID2,
              cover: fileID2,
              type: "image",
              originalName: filePath.split("/").pop(),
              fileType: fileExt || "jpg",
              size,
              resolution: {
                width,
                height
              },
              uploadUser: common_vendor.Zs.getCurrentUserInfo().uid
            });
          }).then(() => {
            return fileID;
          }).catch((e) => {
            console.log(e, "e");
          });
        }).then((fileID) => {
          resolve(fileID);
        }).catch((error) => {
          reject(error);
        }).finally(() => {
          common_vendor.index.hideLoading();
        });
      });
    },
    // 在移动端插入超链接
    showLinkPopup(link) {
      this.currentLink.url = link;
      this.hideKeyboard();
      this.$refs.popup.open();
    },
    // 插入超链接
    linkChange() {
      if (!this.currentLink.url)
        return;
      this.format("link", {
        text: this.currentLink.title || this.currentLink.url,
        link: this.currentLink.url
      });
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _component_tool_undo = common_vendor.resolveComponent("tool-undo");
  const _component_tool_redo = common_vendor.resolveComponent("tool-redo");
  const _component_tool_format_clear = common_vendor.resolveComponent("tool-format-clear");
  const _component_tool_header = common_vendor.resolveComponent("tool-header");
  const _component_tool_font_size = common_vendor.resolveComponent("tool-font-size");
  const _component_tool_bold = common_vendor.resolveComponent("tool-bold");
  const _component_tool_italic = common_vendor.resolveComponent("tool-italic");
  const _component_tool_strike = common_vendor.resolveComponent("tool-strike");
  const _component_tool_underline = common_vendor.resolveComponent("tool-underline");
  const _component_tool_link = common_vendor.resolveComponent("tool-link");
  const _component_tool_align = common_vendor.resolveComponent("tool-align");
  const _component_tool_hr = common_vendor.resolveComponent("tool-hr");
  const _component_tool_list = common_vendor.resolveComponent("tool-list");
  const _component_tool_line_indent = common_vendor.resolveComponent("tool-line-indent");
  const _component_tool_space_both = common_vendor.resolveComponent("tool-space-both");
  const _component_tool_line_height = common_vendor.resolveComponent("tool-line-height");
  const _component_tool_letter_space = common_vendor.resolveComponent("tool-letter-space");
  const _component_tool_background = common_vendor.resolveComponent("tool-background");
  const _component_tool_color = common_vendor.resolveComponent("tool-color");
  const _component_tool_image = common_vendor.resolveComponent("tool-image");
  const _component_tool_video = common_vendor.resolveComponent("tool-video");
  const _component_tool_unlock_content = common_vendor.resolveComponent("tool-unlock-content");
  const _component_tool_ai = common_vendor.resolveComponent("tool-ai");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_uni_im_chat = common_vendor.resolveComponent("uni-im-chat");
  const _easycom_uni_media_library2 = common_vendor.resolveComponent("uni-media-library");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  (_component_tool_undo + _component_tool_redo + _component_tool_format_clear + _component_tool_header + _component_tool_font_size + _component_tool_bold + _component_tool_italic + _component_tool_strike + _component_tool_underline + _component_tool_link + _component_tool_align + _component_tool_hr + _component_tool_list + _component_tool_line_indent + _component_tool_space_both + _component_tool_line_height + _component_tool_letter_space + _component_tool_background + _component_tool_color + _component_tool_image + _component_tool_video + _component_tool_unlock_content + _component_tool_ai + _easycom_uni_icons2 + _easycom_uni_transition2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup2 + _component_uni_im_chat + _easycom_uni_media_library2 + _easycom_uni_drawer2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_transition = () => "../../../uni-transition/components/uni-transition/uni-transition.js";
const _easycom_uni_easyinput = () => "../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_media_library = () => "../../../uni-media-library/components/uni-media-library/uni-media-library.js";
const _easycom_uni_drawer = () => "../../../uni-drawer/components/uni-drawer/uni-drawer.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_transition + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup + _easycom_uni_media_library + _easycom_uni_drawer)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.onEditorReady && $options.onEditorReady(...args)),
    b: common_vendor.o((...args) => $options.onStatusChange && $options.onStatusChange(...args)),
    c: common_vendor.o((...args) => $options.onEditorFocus && $options.onEditorFocus(...args)),
    d: common_vendor.o((...args) => $options.onEditorBlur && $options.onEditorBlur(...args)),
    e: $options.editorHeight <= 0 ? "auto" : `${$options.editorHeight}px`,
    f: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    g: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    h: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    i: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    j: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    k: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    l: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    m: common_vendor.p({
      active: $data.formats.header,
      disabled: !$data.showFooterToolBar
    }),
    n: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    o: common_vendor.p({
      active: $data.formats.fontSize,
      disabled: !$data.showFooterToolBar
    }),
    p: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    q: common_vendor.p({
      active: $data.formats.bold,
      disabled: !$data.showFooterToolBar
    }),
    r: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    s: common_vendor.p({
      active: $data.formats.italic,
      disabled: !$data.showFooterToolBar
    }),
    t: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    v: common_vendor.p({
      active: $data.formats.strike,
      disabled: !$data.showFooterToolBar
    }),
    w: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    x: common_vendor.p({
      active: $data.formats.underline,
      disabled: !$data.showFooterToolBar
    }),
    y: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    z: common_vendor.p({
      active: $data.formats.link,
      disabled: !$data.showFooterToolBar
    }),
    A: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    B: common_vendor.p({
      active: $data.formats.align,
      disabled: !$data.showFooterToolBar
    }),
    C: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    D: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    E: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    F: common_vendor.p({
      active: $data.formats.list,
      disabled: !$data.showFooterToolBar
    }),
    G: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    H: common_vendor.p({
      active: $data.formats.textIndent,
      disabled: !$data.showFooterToolBar
    }),
    I: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    J: common_vendor.p({
      active: $data.formats.marginLeft && $data.formats.marginRight,
      disabled: !$data.showFooterToolBar
    }),
    K: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    L: common_vendor.p({
      active: $data.formats.lineHeight,
      disabled: !$data.showFooterToolBar
    }),
    M: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    N: common_vendor.p({
      active: $data.formats.letterSpacing,
      disabled: !$data.showFooterToolBar
    }),
    O: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    P: common_vendor.p({
      active: $data.formats.background,
      disabled: !$data.showFooterToolBar
    }),
    Q: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    R: common_vendor.p({
      active: $data.formats.color,
      disabled: !$data.showFooterToolBar
    }),
    S: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    T: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    U: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    V: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    W: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    X: common_vendor.p({
      disabled: !$data.showFooterToolBar
    }),
    Y: common_vendor.o(({
      type,
      value
    }) => $options.format(type, value)),
    Z: common_vendor.p({
      active: $data.showImChat,
      disabled: !$data.showFooterToolBar
    }),
    aa: common_vendor.p({
      type: "plus",
      size: "60rpx"
    }),
    ab: common_vendor.o((...args) => $options.showInsertBlockView && $options.showInsertBlockView(...args)),
    ac: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-text-group",
      size: "54rpx"
    }),
    ad: $data.showToolPopup === "m-tool-header" ? 1 : "",
    ae: common_vendor.o(($event) => $options.showToolPopupView("m-tool-header")),
    af: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-attr-group",
      size: "60rpx"
    }),
    ag: $data.showToolPopup === "m-tool-text" ? 1 : "",
    ah: common_vendor.o(($event) => $options.showToolPopupView("m-tool-text")),
    ai: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-align-left",
      size: "60rpx"
    }),
    aj: $data.showToolPopup === "m-tool-align" ? 1 : "",
    ak: common_vendor.o(($event) => $options.showToolPopupView("m-tool-align")),
    al: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-link",
      size: "60rpx"
    }),
    am: $data.formats.link ? 1 : "",
    an: common_vendor.o(($event) => $options.showLinkPopup($data.formats.link)),
    ao: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-image",
      size: "60rpx"
    }),
    ap: common_vendor.o(() => _ctx.$refs.insertImageDrawer.open()),
    aq: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-ai",
      size: "60rpx",
      color: "#b454ff"
    }),
    ar: common_vendor.o(($event) => $options.format("ai")),
    as: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-jianpan",
      size: "70rpx"
    }),
    at: common_vendor.o(($event) => $options.hideKeyboard()),
    av: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-header1",
      size: "60rpx"
    }),
    aw: $data.formats.header === 1 ? 1 : "",
    ax: common_vendor.o(($event) => $options.format("header", 1)),
    ay: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-header2",
      size: "60rpx"
    }),
    az: $data.formats.header === 2 ? 1 : "",
    aA: common_vendor.o(($event) => $options.format("header", 2)),
    aB: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-header3",
      size: "60rpx"
    }),
    aC: $data.formats.header === 3 ? 1 : "",
    aD: common_vendor.o(($event) => $options.format("header", 3)),
    aE: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-header4",
      size: "60rpx"
    }),
    aF: $data.formats.header === 4 ? 1 : "",
    aG: common_vendor.o(($event) => $options.format("header", 4)),
    aH: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-header5",
      size: "60rpx"
    }),
    aI: $data.formats.header === 5 ? 1 : "",
    aJ: common_vendor.o(($event) => $options.format("header", 5)),
    aK: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-header6",
      size: "60rpx"
    }),
    aL: $data.formats.header === 6 ? 1 : "",
    aM: common_vendor.o(($event) => $options.format("header", 6)),
    aN: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-ul",
      size: "60rpx"
    }),
    aO: $data.formats.list === "ordered" ? 1 : "",
    aP: common_vendor.o(($event) => $options.format("list", "ordered")),
    aQ: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-ol",
      size: "60rpx"
    }),
    aR: $data.formats.list === "bullet" ? 1 : "",
    aS: common_vendor.o(($event) => $options.format("list", "bullet")),
    aT: $data.showToolPopup === "m-tool-header" ? 1 : "",
    aU: `${$data.toolPopupRect.left}px`,
    aV: `${$data.toolPopupRect.right}px`,
    aW: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-bold",
      size: "60rpx"
    }),
    aX: $data.formats.bold ? 1 : "",
    aY: common_vendor.o(($event) => $options.format("bold")),
    aZ: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-italic",
      size: "60rpx"
    }),
    ba: $data.formats.italic ? 1 : "",
    bb: common_vendor.o(($event) => $options.format("italic")),
    bc: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-underline",
      size: "60rpx"
    }),
    bd: $data.formats.underline ? 1 : "",
    be: common_vendor.o(($event) => $options.format("underline")),
    bf: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-strike",
      size: "60rpx"
    }),
    bg: $data.formats.strike ? 1 : "",
    bh: common_vendor.o(($event) => $options.format("strike")),
    bi: $data.showToolPopup === "m-tool-text" ? 1 : "",
    bj: `${$data.toolPopupRect.left}px`,
    bk: `${$data.toolPopupRect.right}px`,
    bl: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-line-indent",
      size: "48rpx"
    }),
    bm: $data.formats.indent ? 1 : "",
    bn: common_vendor.o(($event) => $options.format("indent", $data.formats.indent ? "-1" : "+1")),
    bo: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-align-left",
      size: "60rpx"
    }),
    bp: $data.formats.align === "left" ? 1 : "",
    bq: common_vendor.o(($event) => $options.format("align", "left")),
    br: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-align-center",
      size: "60rpx"
    }),
    bs: $data.formats.align === "center" ? 1 : "",
    bt: common_vendor.o(($event) => $options.format("align", "center")),
    bv: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-align-right",
      size: "60rpx"
    }),
    bw: $data.formats.align === "right" ? 1 : "",
    bx: common_vendor.o(($event) => $options.format("align", "right")),
    by: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-align-justify",
      size: "60rpx"
    }),
    bz: $data.formats.align === "justify" ? 1 : "",
    bA: common_vendor.o(($event) => $options.format("align", "justify")),
    bB: $data.showToolPopup === "m-tool-align" ? 1 : "",
    bC: `${$data.toolPopupRect.left}px`,
    bD: `${$data.toolPopupRect.right}px`,
    bE: !$data.showFooterToolBar,
    bF: `translateY(-${$data.keyboardHeight}px)`,
    bG: common_vendor.o(() => {
    }),
    bH: common_vendor.p({
      type: "closeempty",
      size: "40rpx"
    }),
    bI: common_vendor.o((...args) => $options.closeToolSetting && $options.closeToolSetting(...args)),
    bJ: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-image",
      size: "70rpx"
    }),
    bK: common_vendor.o(() => _ctx.$refs.insertImageDrawer.open()),
    bL: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-hr",
      size: "70rpx"
    }),
    bM: common_vendor.o(($event) => $options.format("hr")),
    bN: common_vendor.p({
      ["custom-prefix"]: "editor-icon",
      type: "icon-unlock",
      size: "70rpx"
    }),
    bO: common_vendor.o(($event) => $options.format("unlockContent")),
    bP: common_vendor.p({
      ["mode-class"]: ["slide-bottom", "fade"],
      show: $data.showInsertBlockToolSetting
    }),
    bQ: common_vendor.p({
      show: $data.showToolSettingMask
    }),
    bR: common_vendor.o(($event) => $data.currentLink.title = $event),
    bS: common_vendor.p({
      modelValue: $data.currentLink.title
    }),
    bT: common_vendor.p({
      label: "链接名称",
      name: "link"
    }),
    bU: common_vendor.o(($event) => $data.currentLink.url = $event),
    bV: common_vendor.p({
      modelValue: $data.currentLink.url
    }),
    bW: common_vendor.p({
      label: "链接地址",
      name: "link"
    }),
    bX: common_vendor.p({
      ["label-width"]: "90px"
    }),
    bY: common_vendor.o(($event) => _ctx.$refs.popup.close()),
    bZ: common_vendor.o((...args) => $options.linkChange && $options.linkChange(...args)),
    ca: common_vendor.o(() => {
    }),
    cb: common_vendor.sr("popup", "e12c4750-54"),
    cc: common_vendor.p({
      type: "center"
    }),
    cd: common_vendor.p({
      type: "closeempty",
      size: "40rpx"
    }),
    ce: common_vendor.o(($event) => $data.showImChat = false),
    cf: common_vendor.sr("uniImChat", "e12c4750-61"),
    cg: !$data.showImChat,
    ch: $data.drawerWidth
  }, $data.drawerWidth ? {
    ci: common_vendor.o($options.onInsertImage),
    cj: common_vendor.p({
      mode: "picker",
      ["selected-count"]: 1,
      ["media-tabs"]: ["image"]
    }),
    ck: common_vendor.sr("insertImageDrawer", "e12c4750-62"),
    cl: common_vendor.p({
      mode: "right",
      width: $data.drawerWidth
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e12c4750"]]);
wx.createComponent(Component);
