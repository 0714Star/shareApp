"use strict";
const common_vendor = require("../../../../../common/vendor.js");
class UploaderFile {
  constructor(props = {}) {
    if (!props.name || !props.mediaType || !props.originUrl) {
      throw new Error("缺少必要字段");
    }
    this.id = props.id;
    this.name = props.name;
    this.size = props.size;
    this.mediaType = props.mediaType;
    this.fileType = props.fileType;
    this.originUrl = props.originUrl;
    this.thumbUrl = props.thumbUrl;
    this.attributes = props.attributes || {};
    this.url = "";
    this.status = "waiting";
    this.percent = 0;
    this.error = null;
  }
  setError(error) {
    this.error = error;
  }
  setUrl(url) {
    this.url = url;
  }
  setPercent(percent) {
    this.percent = percent;
  }
  setStatus(status) {
    this.status = status;
  }
  setAttributes(attributes = {}) {
    if (attributes.fileType) {
      this.fileType = attributes.fileType;
    }
    if (attributes.size) {
      this.size = attributes.size;
    }
    this.attributes = attributes;
  }
  getFileType() {
    return new Promise((resolve, reject) => {
      if (this.fileType) {
        return resolve(this.fileType);
      }
      common_vendor.index.getImageInfo({
        src: this.originUrl,
        success(info) {
          this.fileType = info.type.toLowerCase();
          resolve(this.fileType);
        },
        fail(err) {
          reject(new Error(err.errMsg || "未能获取图片类型"));
        }
      });
    });
  }
}
exports.UploaderFile = UploaderFile;
