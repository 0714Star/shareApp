"use strict";
const uni_modules_uniMediaLibrary_common_uploader_provider_internal = require("./internal.js");
const uni_modules_uniMediaLibrary_common_uploader_provider_qiniu = require("./qiniu.js");
function createUploaderProviderInstance(provider) {
  switch (provider) {
    case "internal":
      return new uni_modules_uniMediaLibrary_common_uploader_provider_internal.InternalUploadProvider();
    case "qiniu":
      return new uni_modules_uniMediaLibrary_common_uploader_provider_qiniu.QiniuUploadProvider();
    default:
      return new uni_modules_uniMediaLibrary_common_uploader_provider_internal.InternalUploadProvider();
  }
}
exports.createUploaderProviderInstance = createUploaderProviderInstance;
