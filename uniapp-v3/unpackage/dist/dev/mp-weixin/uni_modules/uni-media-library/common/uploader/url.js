"use strict";
const uni_modules_uniMediaLibrary_common_uploader_base = require("./base.js");
const uni_modules_uniMediaLibrary_common_uploader_struct_uploadFile = require("./struct/upload-file.js");
class FromURLUploader extends uni_modules_uniMediaLibrary_common_uploader_base.Uploader {
  constructor(props) {
    super(props);
  }
  normalizeFiles(files) {
    return files.map((file) => {
      return new uni_modules_uniMediaLibrary_common_uploader_struct_uploadFile.UploaderFile({
        id: file.id,
        name: file.name,
        originUrl: file.url,
        thumbUrl: file.thumbUrl || file.url,
        mediaType: file.mediaType
      });
    });
  }
}
exports.FromURLUploader = FromURLUploader;
