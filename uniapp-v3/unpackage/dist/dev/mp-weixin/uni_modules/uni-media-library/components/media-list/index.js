"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniMediaLibrary_common_crop = require("../../common/crop.js");
const db = common_vendor.Zs.database();
const _sfc_main = {
  name: "media-list",
  emits: ["onSelect", "onUploadMedia"],
  expose: ["cancelAllSelected", "deleteSelectedMedia", "chooseFiles", "mediaUploadProgress", "mediaUploadSuccess", "mediaUploadFailed"],
  props: {
    mediaType: {
      type: String,
      default: () => "all"
    },
    mediaGroup: String,
    keyword: String,
    selectedCount: Number
  },
  data() {
    return {
      lastId: null,
      lastSelectedIndex: 0,
      remoteMediaList: [],
      localMediaList: [],
      shiftKey: false,
      isUploading: false,
      processing: true
    };
  },
  watch: {
    mediaGroup() {
      this.loadMediaList(true);
    },
    keyword() {
      this.loadMediaList(true);
    }
  },
  computed: {
    collection() {
      return [
        db.collection("uni-media-library").where(this.mediaListWhere || {}).getTemp(),
        db.collection("uni-id-users").field("_id, nickname").getTemp()
      ];
    },
    mediaList() {
      return this.localMediaList.concat(this.remoteMediaList);
    },
    mediaListWhere() {
      const cond = [];
      if (this.mediaType !== "all") {
        cond.push(`type=="${this.mediaType}"`);
      }
      if (this.mediaGroup) {
        cond.push(`group=="${this.mediaGroup}"`);
      }
      if (this.keyword) {
        cond.push(`${new RegExp(this.keyword, "i")}.test(description)`);
      }
      return cond.join("&");
    }
  },
  mounted() {
    this.loadMediaList();
  },
  destroyed() {
  },
  methods: {
    coverImage(url, rule) {
      return uni_modules_uniMediaLibrary_common_crop.generateCoverURL(url, rule);
    },
    onKeyDown(e) {
      if (e.keyCode === 16) {
        this.shiftKey = true;
      }
    },
    onKeyUp(e) {
      if (e.keyCode === 16) {
        this.shiftKey = false;
      }
    },
    async onMediaListLoad(data) {
      var _a;
      const cloudFiles = [];
      data.forEach((item) => {
        item._src = item.src;
        item._cover = item.cover;
      });
      for (let i = 0; i < data.length; i++) {
        const media = data[i];
        if ((_a = media.src) == null ? void 0 : _a.startsWith("cloud://")) {
          cloudFiles.push({
            index: i,
            type: media.type,
            src: media.src,
            cover: media.cover
          });
        }
      }
      if (cloudFiles.length) {
        const res = await this.getMediaAssetTempURLs(
          new Set(
            [].concat.call([], ...cloudFiles.map((item) => [item.src, item.cover])).filter((item) => item)
          )
        );
        res.fileList.forEach((item) => {
          const srcTempFile = cloudFiles.find((file) => file.src === item.fileID);
          const coverTempFile = cloudFiles.find((file) => file.cover === item.fileID);
          if (srcTempFile) {
            data[srcTempFile.index].src = item.tempFileURL;
          }
          if (coverTempFile) {
            data[coverTempFile.index].cover = item.tempFileURL;
          }
        });
      }
      this.remoteMediaList = this.remoteMediaList.concat(data);
      this.processing = false;
    },
    async getMediaAssetTempURLs(listSet) {
      const limit = 30;
      const fileList = Array.from(listSet);
      const res = {
        fileList: []
      };
      for (let i = 0; i < fileList.length; i += limit) {
        const resTemp = await common_vendor.Zs.getTempFileURL({
          fileList: fileList.slice(i, i + limit)
        });
        res.fileList = res.fileList.concat(resTemp.fileList);
      }
      return res;
    },
    loadMediaList(reset = false) {
      if (reset) {
        this.localMediaList = [];
        this.cancelAllSelected();
      }
      this.processing = true;
      this.remoteMediaList = [];
      this.$nextTick(() => this.$refs.mediaUdb.loadData({
        clear: reset
      }));
    },
    loadMore() {
      this.$refs.mediaUdb.loadMore();
    },
    onSelect(index) {
      if (this.isUploading)
        return;
      let minIndex = index;
      let maxIndex = index;
      if (this.shiftKey) {
        minIndex = Math.min(this.lastSelectedIndex, index);
        maxIndex = Math.max(this.lastSelectedIndex, index);
      }
      const mediaItem = this.mediaList[index];
      if (this.selectedCount > 0 && !mediaItem.selected && !mediaItem.active) {
        const selectedMediaCount = this.mediaList.reduce((count, item) => item.selected || item.active ? count + 1 : count, 0);
        if (selectedMediaCount + (maxIndex - minIndex + 1) > this.selectedCount) {
          common_vendor.index.showToast({
            title: `最多只能选择${this.selectedCount}个媒体文件`,
            icon: "none"
          });
          return;
        }
      }
      if (!mediaItem.selected) {
        for (let i = minIndex; i <= maxIndex; i++) {
          this.$set(this.mediaList[i], "active", !mediaItem.active);
        }
        for (const otherMediaItem of this.mediaList) {
          if (otherMediaItem.active && otherMediaItem._id !== mediaItem._id) {
            this.$set(otherMediaItem, "active", false);
            this.$set(otherMediaItem, "selected", true);
          }
        }
      } else {
        this.$set(this.mediaList[index], "selected", false);
      }
      this.lastSelectedIndex = index;
      this.$nextTick(() => {
        this.$emit("onSelect", this.mediaList.filter((item) => item.selected || item.active));
      });
    },
    cancelAllSelected() {
      if (this.isUploading)
        return;
      for (const mediaItem of this.mediaList) {
        if (mediaItem.active || mediaItem.selected) {
          this.$set(mediaItem, "active", false);
          this.$set(mediaItem, "selected", false);
        }
      }
      this.$nextTick(() => {
        this.$emit("onSelect", []);
      });
    },
    deleteSelectedMedia(mediaIds) {
      if (this.isUploading)
        return;
      for (const id of mediaIds) {
        const index = this.remoteMediaList.findIndex((item) => item._id === id);
        this.remoteMediaList.splice(index, 1);
      }
      this.$nextTick(() => {
        this.$emit("onSelect", []);
      });
    },
    chooseFiles(files = []) {
      if (this.isUploading)
        return;
      this.isUploading = true;
      this.localMediaList = files.map((file) => {
        return {
          ...file,
          src: file.thumbUrl,
          type: file.mediaType,
          isUploading: true,
          tip: "等待上传"
        };
      });
    },
    mediaUploadProgress(file) {
      const mediaItemIndex = this.localMediaList.findIndex((item) => item.originUrl === file.originUrl);
      if (mediaItemIndex < 0)
        return;
      this.localMediaList[mediaItemIndex].tip = "正在上传";
      this.localMediaList[mediaItemIndex].status = file.status;
      this.localMediaList[mediaItemIndex].percent = file.percent;
    },
    async mediaUploadSuccess(files) {
      const failedFiles = files.filter((file) => file.status !== "uploaded");
      if (failedFiles.length)
        return;
      for (const file of files) {
        const mediaItemIndex = this.localMediaList.findIndex((item) => item.originUrl === file.originUrl);
        const mediaItem = this.localMediaList[mediaItemIndex];
        if (mediaItemIndex < 0)
          continue;
        const attrs = {
          cover: file.url,
          // 媒体资源封面
          ...file.attributes || {}
        };
        if (mediaItem.type === "video") {
          await this.cropVideoCover(mediaItemIndex, file.url, attrs);
        }
        await this.reportFunction(mediaItemIndex, file.url, attrs);
        this.localMediaList[mediaItemIndex].thumbUrl = file.url;
        this.localMediaList[mediaItemIndex].tip = "上传成功";
        this.localMediaList[mediaItemIndex].status = file.status;
      }
      this.isUploading = false;
      this.loadMediaList(true);
    },
    async mediaUploadFailed(file) {
      var _a;
      const mediaItemIndex = this.localMediaList.findIndex((item) => item.originUrl === file.originUrl);
      if (mediaItemIndex < 0)
        return;
      this.localMediaList[mediaItemIndex].tip = `上传失败: ${((_a = file.error) == null ? void 0 : _a.message) ?? "未知错误"}`;
      this.localMediaList[mediaItemIndex].status = file.status;
    },
    async reportFunction(mediaIndex, url, attrs = {}) {
      const mediaItem = this.localMediaList[mediaIndex];
      if (!mediaItem)
        return;
      this.localMediaList[mediaIndex].tip = "正在添加至媒体库";
      const uniMediaLibraryCo = common_vendor.Zs.importObject("uni-media-library-co", {
        customUI: true
      });
      await uniMediaLibraryCo.report({
        src: url,
        type: mediaItem.type,
        originalName: mediaItem.name,
        fileType: mediaItem.fileType,
        size: mediaItem.size,
        resolution: {
          width: attrs.width || 0,
          height: attrs.height || 0
        },
        duration: attrs.duration || 0,
        uploadUser: common_vendor.Zs.getCurrentUserInfo().uid,
        ...attrs
      });
    },
    async cropVideoCover(mediaIndex, url, attrs) {
      const mediaItem = this.localMediaList[mediaIndex];
      const isTcbCloud = url.startsWith("cloud://");
      const isAlipayCloud = url.startsWith("cloud://env-");
      if (!mediaItem || isTcbCloud && !isAlipayCloud)
        return void 0;
      this.localMediaList[mediaIndex].tip = "正在截取视频封面";
      const ossProcessRule = "video/snapshot,t_0,f_jpg,w_0,h_0,m_fast";
      let cropUrl = `${url}?x-oss-process=${ossProcessRule}`;
      if (isAlipayCloud) {
        const res = await common_vendor.Zs.getTempFileURL({
          fileList: [url]
        });
        if (res.fileList && res.fileList.length) {
          url = res.fileList[0].tempFileURL;
          cropUrl = `${url}&x-oss-process=${ossProcessRule}`;
        }
      }
      const image = await fetch(cropUrl);
      const imageBlob = await image.blob();
      const imageFile = new File([imageBlob], "image.jpg", { type: "image/jpeg" });
      const imageBlobUrl = await this.file2blob(imageFile);
      const uploadRes = await common_vendor.Zs.uploadFile({
        filePath: imageBlobUrl,
        cloudPath: `uni-media-library/video-cover-${Date.now() + Math.round(Math.random() * 1e4)}.jpg`,
        fileType: "image"
      });
      attrs.cover = uploadRes.fileID;
    },
    file2blob(file) {
      let url;
      if (window.createObjectURL !== void 0) {
        url = window.createObjectURL(file);
      } else if (window.URL !== void 0) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== void 0) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_icons2 + _easycom_unicloud_db2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_unicloud_db = () => "../../../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_unicloud_db)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      data,
      loading,
      error,
      pagination
    }, s0, i0) => {
      return common_vendor.e({
        a: (loading || $data.processing) && pagination.current === 1
      }, (loading || $data.processing) && pagination.current === 1 ? {
        b: "4980f6d0-1-" + i0 + ",4980f6d0-0",
        c: common_vendor.p({
          type: "spinner-cycle",
          size: "30",
          color: "#000"
        })
      } : $options.mediaList.length ? {
        d: common_vendor.f($options.mediaList, (mediaItem, index, i1) => {
          return common_vendor.e({
            a: mediaItem.type === "image"
          }, mediaItem.type === "image" ? {
            b: mediaItem.isUploading ? mediaItem.src : $options.coverImage(mediaItem.cover, mediaItem.thumbRules && mediaItem.thumbRules.listCover)
          } : {}, {
            c: mediaItem.type === "video"
          }, mediaItem.type === "video" ? common_vendor.e({
            d: mediaItem.isUploading || /^cloud:\/\//.test(mediaItem._src)
          }, mediaItem.isUploading || /^cloud:\/\//.test(mediaItem._src) ? {
            e: mediaItem.src,
            f: $options.coverImage(mediaItem.cover, mediaItem.thumbRules && mediaItem.thumbRules.listCover)
          } : {
            g: $options.coverImage(mediaItem.cover, mediaItem.thumbRules && mediaItem.thumbRules.listCover)
          }) : {}, {
            h: mediaItem.isUploading
          }, mediaItem.isUploading ? {
            i: mediaItem.percent + "%",
            j: common_vendor.t(mediaItem.tip),
            k: mediaItem.status === "failed" ? 1 : ""
          } : {}, {
            l: mediaItem.active ? 1 : "",
            m: mediaItem.selected ? 1 : "",
            n: common_vendor.o(($event) => $options.onSelect(index), mediaItem._id),
            o: mediaItem._id
          });
        })
      } : {
        e: "4980f6d0-2-" + i0 + ",4980f6d0-0",
        f: common_vendor.p({
          type: "images",
          size: "60",
          color: "#ccc"
        }),
        g: common_vendor.o(($event) => {
          _ctx.$emit("onUploadMedia");
        })
      }, {
        h: i0,
        i: s0
      });
    }, {
      name: "d",
      path: "a",
      vueId: "4980f6d0-0"
    }),
    b: $options.mediaList.length,
    c: common_vendor.sr("mediaUdb", "4980f6d0-0"),
    d: common_vendor.o($options.onMediaListLoad),
    e: common_vendor.p({
      collection: $options.collection,
      orderby: "createDate desc",
      loadtime: "manual",
      ["page-size"]: 50
    }),
    f: common_vendor.o((...args) => $options.loadMore && $options.loadMore(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
