"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/index/index.js";
  "./pages/NoticeCenter/chat/chat.js";
  "./pages/NoticeCenter/NoticeCenter.js";
  "./pages/shop/shop.js";
  "./uni_modules/uni-cms/pages/article/list/list.js";
  "./pages/profile/profile.js";
  "./pages/profile/wxLogin/wxLogin.js";
  "./uni_modules/uni-cms/pages/article/add/add.js";
  "./uni_modules/uni-cms/pages/article/edit/edit.js";
  "./uni_modules/uni-cms/pages/categories/list/list.js";
  "./uni_modules/uni-cms/pages/categories/add/add.js";
  "./uni_modules/uni-cms/pages/categories/edit/edit.js";
  "./uni_modules/uni-media-library/pages/index/index.js";
  "./uni_modules/uni-id-pages/pages/register/register.js";
  "./uni_modules/uni-id-pages/pages/login/login-withoutpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-withpwd.js";
  "./uni_modules/uni-id-pages/pages/login/login-smscode.js";
  "./uni_modules/uni-id-pages/pages/userinfo/userinfo.js";
  "./uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile.js";
  "./uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage.js";
  "./uni_modules/uni-id-pages/pages/register/register-by-email.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve.js";
  "./uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email.js";
  "./uni_modules/uni-id-pages/pages/common/webview/webview.js";
  "./uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd.js";
  "./uni_modules/uni-id-pages/pages/register/register-admin.js";
  "./uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd.js";
  "./uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate.js";
  "./uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("小程序启动中...");
    store_index.store.dispatch("userModule/checkState").then(() => {
      console.log("登录状态检测完成");
    }).catch((error) => {
      console.error("登录状态检测失败：", error);
    });
  },
  onShow: function() {
    store_index.store.dispatch("userModule/checkState").then(() => {
      console.log("登录状态检测完成");
    }).catch((error) => {
      console.error("登录状态检测失败：", error);
    });
  },
  onHide: function() {
    store_index.store.dispatch("userModule/checkState").then(() => {
      console.log("登录状态检测完成");
    }).catch((error) => {
      console.error("登录状态检测失败：", error);
    });
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$store = store_index.store;
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
