"use strict";
const common_vendor = require("../../../common/vendor.js");
function parseEditorImage(blocks = []) {
  const images = [];
  if (!Array.isArray(blocks)) {
    blocks = [blocks];
  }
  for (const block of blocks) {
    const { insert = {}, attributes = {} } = block;
    const { "data-custom": custom = "" } = attributes;
    let parseCustom = custom.split("&").reduce((obj, item) => {
      const [key, value] = item.split("=");
      obj[key] = value;
      return obj;
    }, {});
    images.push({
      src: insert.image,
      source: parseCustom.source
    });
  }
  return images;
}
async function parseImageUrl(images = [], type = "media") {
  if (type === "editor") {
    images = parseEditorImage(images).map((item) => item.source);
  } else {
    if (!Array.isArray(images)) {
      images = [images];
    }
  }
  if (!images)
    return null;
  const tcbFiles = images.filter((item) => item.startsWith("cloud://"));
  if (tcbFiles.length) {
    const res = await common_vendor.Zs.getTempFileURL({
      fileList: tcbFiles
    });
    return images.map((image) => {
      const file = res.fileList.find((item) => item.fileID === image);
      return {
        src: (file == null ? void 0 : file.tempFileURL) ?? image,
        source: image
      };
    });
  } else {
    return images.map((image) => ({
      src: image,
      source: image
    }));
  }
}
exports.parseEditorImage = parseEditorImage;
exports.parseImageUrl = parseImageUrl;
