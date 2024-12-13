"use strict";
function formatTime(time) {
  if (typeof time !== "number" || time < 0) {
    return time;
  }
  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;
  return [hour, minute, second].map(function(n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  }).join(":");
}
function formatLocation(longitude, latitude) {
  if (typeof longitude === "string" && typeof latitude === "string") {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude);
  }
  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);
  return {
    longitude: longitude.toString().split("."),
    latitude: latitude.toString().split(".")
  };
}
var dateUtils = {
  UNITS: {
    "年": 315576e5,
    "月": 26298e5,
    "天": 864e5,
    "小时": 36e5,
    "分钟": 6e4,
    "秒": 1e3
  },
  humanize: function(milliseconds) {
    var humanize = "";
    for (var key in this.UNITS) {
      if (milliseconds >= this.UNITS[key]) {
        humanize = Math.floor(milliseconds / this.UNITS[key]) + key + "前";
        break;
      }
    }
    return humanize || "刚刚";
  },
  format: function(dateStr) {
    var date = this.parse(dateStr);
    var diff = Date.now() - date.getTime();
    if (diff < this.UNITS["天"]) {
      return this.humanize(diff);
    }
    var _format = function(number) {
      return number < 10 ? "0" + number : number;
    };
    return date.getFullYear() + "/" + _format(date.getMonth() + 1) + "/" + _format(date.getDate()) + "-" + _format(date.getHours()) + ":" + _format(date.getMinutes());
  },
  parse: function(str) {
    var a = str.split(/[^0-9]/);
    return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
  }
};
exports.dateUtils = dateUtils;
exports.formatLocation = formatLocation;
exports.formatTime = formatTime;
