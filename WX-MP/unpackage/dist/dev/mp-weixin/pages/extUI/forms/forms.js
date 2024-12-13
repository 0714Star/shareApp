"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 基础表单数据
      baseFormData: {
        name: "",
        age: "",
        introduction: "",
        sex: 2,
        hobby: [5],
        datetimesingle: 1627529992399,
        city: "",
        skills: 0
      },
      // 城市数据
      cityData: [{
        text: "北京",
        value: "10001"
      }, {
        text: "上海",
        value: "10002"
      }, {
        text: "深圳",
        value: "10004"
      }],
      skillsRange: [
        {
          value: 0,
          text: "编程"
        },
        {
          value: 1,
          text: "绘画"
        },
        {
          value: 2,
          text: "运动"
        }
      ],
      // 表单数据
      alignmentFormData: {
        name: "",
        age: ""
      },
      // 单选数据源
      sexs: [{
        text: "男",
        value: 0
      }, {
        text: "女",
        value: 1
      }, {
        text: "保密",
        value: 2
      }],
      // 多选数据源
      hobbys: [{
        text: "跑步",
        value: 0
      }, {
        text: "游泳",
        value: 1
      }, {
        text: "绘画",
        value: 2
      }, {
        text: "足球",
        value: 3
      }, {
        text: "篮球",
        value: 4
      }, {
        text: "其他",
        value: 5
      }],
      // 分段器数据
      current: 0,
      items: ["左对齐", "顶部对齐"],
      // 校验表单数据
      valiFormData: {
        name: "",
        age: "",
        introduction: ""
      },
      // 校验规则
      rules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "年龄不能为空"
          }, {
            format: "number",
            errorMessage: "年龄只能输入数字"
          }]
        }
      },
      // 自定义表单数据
      customFormData: {
        name: "",
        age: "",
        hobby: []
      },
      // 自定义表单校验规则
      customRules: {
        name: {
          rules: [{
            required: true,
            errorMessage: "姓名不能为空"
          }]
        },
        age: {
          rules: [{
            required: true,
            errorMessage: "年龄不能为空"
          }]
        },
        hobby: {
          rules: [
            {
              format: "array"
            },
            {
              validateFunction: function(rule, value, data, callback) {
                if (value.length < 2) {
                  callback("请至少勾选两个兴趣爱好");
                }
                return true;
              }
            }
          ]
        }
      },
      dynamicFormData: {
        email: "",
        domains: []
      },
      dynamicLists: [],
      dynamicRules: {
        email: {
          rules: [{
            required: true,
            errorMessage: "域名不能为空"
          }, {
            format: "email",
            errorMessage: "域名格式错误"
          }]
        }
      }
    };
  },
  computed: {
    // 处理表单排列切换
    alignment() {
      if (this.current === 0)
        return "left";
      if (this.current === 1)
        return "top";
      return "left";
    }
  },
  onLoad() {
  },
  onReady() {
    this.$refs.customForm.setRules(this.customRules);
  },
  methods: {
    onClickItem(e) {
      console.log(e);
      this.current = e.currentIndex;
    },
    add() {
      this.dynamicFormData.domains.push({
        label: "域名",
        value: "",
        rules: [{
          "required": true,
          errorMessage: "域名项必填"
        }],
        id: Date.now()
      });
    },
    del(id) {
      let index = this.dynamicLists.findIndex((v) => v.id === id);
      this.dynamicLists.splice(index, 1);
    },
    submit(ref) {
      console.log(this.baseFormData);
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        common_vendor.index.showToast({
          title: `校验通过`
        });
      }).catch((err) => {
        console.log("err", err);
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  (_easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_picker2 + _easycom_uni_data_select2 + _easycom_uni_forms2 + _easycom_uni_section2 + _easycom_uni_segmented_control2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_data_picker + _easycom_uni_data_select + _easycom_uni_forms + _easycom_uni_section + _easycom_uni_segmented_control)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o(($event) => $data.baseFormData.name = $event),
    c: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.baseFormData.name
    }),
    d: common_vendor.p({
      label: "姓名",
      required: true
    }),
    e: common_vendor.o(($event) => $data.baseFormData.age = $event),
    f: common_vendor.p({
      placeholder: "请输入年龄",
      modelValue: $data.baseFormData.age
    }),
    g: common_vendor.p({
      label: "年龄",
      required: true
    }),
    h: common_vendor.o(($event) => $data.baseFormData.sex = $event),
    i: common_vendor.p({
      localdata: $data.sexs,
      modelValue: $data.baseFormData.sex
    }),
    j: common_vendor.p({
      label: "性别",
      required: true
    }),
    k: common_vendor.o(($event) => $data.baseFormData.hobby = $event),
    l: common_vendor.p({
      multiple: true,
      localdata: $data.hobbys,
      modelValue: $data.baseFormData.hobby
    }),
    m: common_vendor.p({
      label: "兴趣爱好",
      required: true
    }),
    n: common_vendor.o(($event) => $data.baseFormData.introduction = $event),
    o: common_vendor.p({
      type: "textarea",
      placeholder: "请输入自我介绍",
      modelValue: $data.baseFormData.introduction
    }),
    p: common_vendor.p({
      label: "自我介绍"
    }),
    q: common_vendor.o(($event) => $data.baseFormData.datetimesingle = $event),
    r: common_vendor.p({
      type: "datetime",
      ["return-type"]: "timestamp",
      modelValue: $data.baseFormData.datetimesingle
    }),
    s: common_vendor.p({
      label: "日期时间"
    }),
    t: common_vendor.o(($event) => $data.baseFormData.city = $event),
    v: common_vendor.p({
      localdata: $data.cityData,
      ["popup-title"]: "选择城市",
      modelValue: $data.baseFormData.city
    }),
    w: common_vendor.p({
      label: "选择城市"
    }),
    x: common_vendor.o(($event) => $data.baseFormData.skills = $event),
    y: common_vendor.p({
      localdata: $data.skillsRange,
      modelValue: $data.baseFormData.skills
    }),
    z: common_vendor.p({
      label: "选择技能"
    }),
    A: common_vendor.sr("baseForm", "2b0b5d44-2,2b0b5d44-1"),
    B: common_vendor.p({
      model: $data.baseFormData,
      labelWidth: "80px"
    }),
    C: common_vendor.p({
      title: "基本用法",
      type: "line"
    }),
    D: common_vendor.o($options.onClickItem),
    E: common_vendor.p({
      current: $data.current,
      values: $data.items,
      styleType: "button"
    }),
    F: common_vendor.o(($event) => $data.baseFormData.name = $event),
    G: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.baseFormData.name
    }),
    H: common_vendor.p({
      label: "姓名",
      required: true
    }),
    I: common_vendor.o(($event) => $data.baseFormData.age = $event),
    J: common_vendor.p({
      placeholder: "请输入年龄",
      modelValue: $data.baseFormData.age
    }),
    K: common_vendor.p({
      label: "年龄",
      required: true
    }),
    L: common_vendor.sr("baseForm", "2b0b5d44-21,2b0b5d44-19"),
    M: common_vendor.p({
      modelValue: $data.alignmentFormData,
      ["label-position"]: $options.alignment
    }),
    N: common_vendor.p({
      title: "对齐方式",
      type: "line"
    }),
    O: common_vendor.o(($event) => $data.valiFormData.name = $event),
    P: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.valiFormData.name
    }),
    Q: common_vendor.p({
      label: "姓名",
      required: true,
      name: "name"
    }),
    R: common_vendor.o(($event) => $data.valiFormData.age = $event),
    S: common_vendor.p({
      placeholder: "请输入年龄",
      modelValue: $data.valiFormData.age
    }),
    T: common_vendor.p({
      label: "年龄",
      required: true,
      name: "age"
    }),
    U: common_vendor.o(($event) => $data.valiFormData.introduction = $event),
    V: common_vendor.p({
      type: "textarea",
      placeholder: "请输入自我介绍",
      modelValue: $data.valiFormData.introduction
    }),
    W: common_vendor.p({
      label: "自我介绍"
    }),
    X: common_vendor.sr("valiForm", "2b0b5d44-27,2b0b5d44-26"),
    Y: common_vendor.p({
      rules: $data.rules,
      model: $data.valiFormData,
      labelWidth: "80px"
    }),
    Z: common_vendor.o(($event) => $options.submit("valiForm")),
    aa: common_vendor.p({
      title: "表单校验",
      type: "line"
    }),
    ab: common_vendor.o(($event) => $data.customFormData.name = $event),
    ac: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.customFormData.name
    }),
    ad: common_vendor.p({
      label: "姓名",
      required: true,
      name: "name"
    }),
    ae: common_vendor.o(($event) => $data.customFormData.age = $event),
    af: common_vendor.p({
      placeholder: "请输入年龄",
      modelValue: $data.customFormData.age
    }),
    ag: common_vendor.p({
      label: "年龄",
      required: true,
      name: "age"
    }),
    ah: common_vendor.o(($event) => $data.customFormData.hobby = $event),
    ai: common_vendor.p({
      multiple: true,
      localdata: $data.hobbys,
      modelValue: $data.customFormData.hobby
    }),
    aj: common_vendor.p({
      label: "兴趣爱好",
      required: true,
      name: "hobby"
    }),
    ak: common_vendor.sr("customForm", "2b0b5d44-35,2b0b5d44-34"),
    al: common_vendor.p({
      rules: $data.customRules,
      labelWidth: "80px",
      modelValue: $data.customFormData
    }),
    am: common_vendor.o(($event) => $options.submit("customForm")),
    an: common_vendor.p({
      title: "自定义校验规则",
      type: "line"
    }),
    ao: common_vendor.o(($event) => $data.dynamicFormData.email = $event),
    ap: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.dynamicFormData.email
    }),
    aq: common_vendor.p({
      label: "邮箱",
      required: true,
      name: "email"
    }),
    ar: common_vendor.f($data.dynamicFormData.domains, (item, index, i0) => {
      return {
        a: "2b0b5d44-47-" + i0 + "," + ("2b0b5d44-46-" + i0),
        b: common_vendor.o(($event) => $data.dynamicFormData.domains[index].value = $event, item.id),
        c: common_vendor.p({
          placeholder: "请输入域名",
          modelValue: $data.dynamicFormData.domains[index].value
        }),
        d: common_vendor.o(($event) => $options.del(item.id), item.id),
        e: item.id,
        f: "2b0b5d44-46-" + i0 + ",2b0b5d44-43",
        g: common_vendor.p({
          label: item.label + " " + index,
          required: true,
          rules: item.rules,
          name: ["domains", index, "value"]
        })
      };
    }),
    as: common_vendor.sr("dynamicForm", "2b0b5d44-43,2b0b5d44-42"),
    at: common_vendor.p({
      rules: $data.dynamicRules,
      model: $data.dynamicFormData,
      labelWidth: "80px"
    }),
    av: common_vendor.o((...args) => $options.add && $options.add(...args)),
    aw: common_vendor.o(($event) => $options.submit("dynamicForm")),
    ax: common_vendor.p({
      title: "动态表单",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
