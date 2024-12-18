"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const uni_modules_uniCms_common_validator_uniCmsCategories = require("../../../common/validator/uni-cms-categories.js");
const db = common_vendor.Zs.database();
db.command;
const dbCollectionName = "uni-cms-categories";
function getValidator(fields) {
  let result = {};
  for (let key in uni_modules_uniCms_common_validator_uniCmsCategories.validator) {
    if (fields.includes(key)) {
      result[key] = uni_modules_uniCms_common_validator_uniCmsCategories.validator[key];
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    let formData = {
      "name": "",
      "description": "",
      "icon": "",
      "sort": null,
      "create_date": null
    };
    return {
      formData,
      formOptions: {},
      // 表单验证规则
      rules: {
        ...getValidator(Object.keys(formData))
      }
    };
  },
  onLoad(e) {
    if (e.id) {
      const id = e.id;
      this.formDataId = id;
      this.getDetail(id);
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  methods: {
    /**
     * 验证表单并提交
     */
    submit() {
      common_vendor.index.showLoading({
        mask: true
      });
      this.$refs.form.validate().then((res) => {
        return this.submitForm(res);
      }).catch(() => {
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    /**
     * 提交表单
     * @param {Object} value 表单数据
     */
    submitForm(value) {
      return db.collection(dbCollectionName).doc(this.formDataId).update(value).then((res) => {
        common_vendor.index.showToast({
          title: "修改成功"
        });
        try {
          this.getOpenerEventChannel().emit("refreshData");
        } catch (e) {
        }
        setTimeout(() => common_vendor.index.navigateBack(), 500);
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      });
    },
    /**
     * 获取表单数据
     * @param {Object} id
     */
    getDetail(id) {
      common_vendor.index.showLoading({
        mask: true
      });
      db.collection(dbCollectionName).doc(id).field("name,description,icon,sort,create_date").get().then((res) => {
        const data = res.result.data[0];
        if (data) {
          this.formData = data;
        }
      }).catch((err) => {
        common_vendor.index.showModal({
          content: err.message || "请求服务失败",
          showCancel: false
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../../../uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../../uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../../../uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.formData.name = $event),
    b: common_vendor.p({
      placeholder: "类别名称",
      trim: "both",
      modelValue: $data.formData.name
    }),
    c: common_vendor.p({
      name: "name",
      label: "名称",
      required: true
    }),
    d: common_vendor.o(($event) => $data.formData.description = $event),
    e: common_vendor.p({
      placeholder: "类别描述",
      trim: "both",
      modelValue: $data.formData.description
    }),
    f: common_vendor.p({
      name: "description",
      label: "描述"
    }),
    g: common_vendor.o(($event) => $data.formData.sort = $event),
    h: common_vendor.p({
      placeholder: "类别显示顺序",
      type: "number",
      modelValue: $data.formData.sort
    }),
    i: common_vendor.p({
      name: "sort",
      label: "排序"
    }),
    j: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    k: common_vendor.sr("form", "58f9a393-0"),
    l: common_vendor.p({
      model: $data.formData,
      validateTrigger: "bind"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
