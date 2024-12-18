"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniMediaLibrary_common_uploader_base = require("./base.js");
const uni_modules_uniMediaLibrary_common_uploader_struct_uploadFile = require("./struct/upload-file.js");
class FromFileUploader extends uni_modules_uniMediaLibrary_common_uploader_base.Uploader {
  constructor(props) {
    super(props);
  }
  chooseImage(options) {
    return new Promise((resolve, reject) => {
      common_vendor.index.chooseImage({
        sizeType: ["original"],
        extension: options.extension,
        success: (res) => {
          resolve(res.tempFiles);
        },
        fail: (e) => {
          reject(e);
        }
      });
    });
  }
  chooseVideo(options) {
    return new Promise((resolve, reject) => {
      common_vendor.index.chooseVideo({
        compressed: false,
        extension: options.extension,
        success: (res) => {
          resolve([
            {
              name: res.tempFile && res.tempFile.name || "unknown",
              type: res.tempFile && res.tempFile.type || "",
              path: res.tempFilePath,
              duration: res.duration,
              size: res.size,
              height: res.height,
              width: res.width
            }
          ]);
        },
        fail: (e) => {
          reject(e);
        }
      });
    });
  }
  chooseAll(options) {
    return new Promise((resolve, reject) => {
      common_vendor.index.chooseFile({
        type: "all",
        extension: options.extension,
        success: (res) => {
          resolve(res.tempFiles);
        },
        fail: (e) => {
          reject(e);
        }
      });
    });
  }
  async chooseFileAndUpload(options) {
    const { type, onChooseFile, success, fail } = options;
    let choosePromise;
    if (type === "image") {
      choosePromise = this.chooseImage(options);
    } else if (type === "video") {
      choosePromise = this.chooseVideo(options);
    } else {
      choosePromise = this.chooseAll(options);
    }
    return choosePromise.then((files) => {
      return this.add(files);
    }).then(() => {
      typeof onChooseFile === "function" && onChooseFile(
        this.waitUploadFiles
      );
      return this.upload();
    }).then(success).catch(fail);
  }
  getImageInfo(tempFile, fileInfo) {
    return new Promise((resolve) => {
      common_vendor.index.getImageInfo({
        src: fileInfo.originUrl,
        success: (res) => {
          fileInfo.attributes.width = res.width;
          fileInfo.attributes.height = res.height;
        },
        complete: () => {
          resolve();
        }
      });
    });
  }
  getVideoInfo(tempFile, fileInfo) {
    return new Promise((resolve) => {
      fileInfo.attributes.duration = tempFile.duration;
      fileInfo.attributes.width = tempFile.width;
      fileInfo.attributes.height = tempFile.height;
      resolve();
    });
  }
  async normalizeFiles(files) {
    var _a;
    let newFiles = [];
    for (const file of files) {
      const [mediaType = "", fileType] = ((_a = file.type || file.fileType) == null ? void 0 : _a.split("/")) || [];
      const fileInfo = {
        name: file.name,
        originUrl: file.path,
        thumbUrl: file.path,
        size: file.size,
        mediaType,
        fileType,
        attributes: {}
      };
      if (mediaType === "image") {
        await this.getImageInfo(file, fileInfo);
      } else if (mediaType === "video") {
        await this.getVideoInfo(file, fileInfo);
      }
      newFiles.push(
        new uni_modules_uniMediaLibrary_common_uploader_struct_uploadFile.UploaderFile(fileInfo)
      );
    }
    return newFiles;
  }
}
exports.FromFileUploader = FromFileUploader;
