"use strict";
require("../../../common/vendor.js");
const imageExtname = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
const videoExtname = [".mp4", ".avi", ".mov", ".rmvb", ".rm", ".flv", ".3gp", ".wmv", ".mkv"];
const extnameMap = {
  all: [...imageExtname, ...videoExtname],
  image: imageExtname,
  video: videoExtname
};
exports.extnameMap = extnameMap;
