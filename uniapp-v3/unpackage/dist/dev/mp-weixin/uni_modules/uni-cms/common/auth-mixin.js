"use strict";
const common_vendor = require("../../../common/vendor.js");
const authMixin = {
  data() {
    return {
      authUserInfo: common_vendor.Zs.getCurrentUserInfo()
    };
  },
  methods: {
    hasPermission(permission) {
      const { permission: userPermissions, role: userRoles } = this.authUserInfo;
      return userRoles.includes("admin") || userPermissions.includes(permission);
    }
  }
};
exports.authMixin = authMixin;
