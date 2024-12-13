"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index = require("./i18n/index.js");
const calendar = () => "./calendar.js";
const timePicker = () => "./time-picker.js";
const _sfc_main = {
  name: "UniDatetimePicker",
  options: {
    virtualHost: true
  },
  components: {
    calendar,
    timePicker
  },
  data() {
    return {
      isRange: false,
      hasTime: false,
      displayValue: "",
      inputDate: "",
      calendarDate: "",
      pickerTime: "",
      // 范围选
      caleRange: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
      },
      range: {
        startDate: "",
        endDate: ""
      },
      tempRange: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: ""
      },
      // 左右日历同步数据
      startMultipleStatus: {
        before: "",
        after: "",
        data: [],
        fulldate: ""
      },
      endMultipleStatus: {
        before: "",
        after: "",
        data: [],
        fulldate: ""
      },
      pickerVisible: false,
      popover: null,
      isEmitValue: false,
      isPhone: false,
      isFirstShow: true,
      i18nT: () => {
      }
    };
  },
  props: {
    type: {
      type: String,
      default: "datetime"
    },
    value: {
      type: [String, Number, Array, Date],
      default: ""
    },
    modelValue: {
      type: [String, Number, Array, Date],
      default: ""
    },
    start: {
      type: [Number, String],
      default: ""
    },
    end: {
      type: [Number, String],
      default: ""
    },
    returnType: {
      type: String,
      default: "string"
    },
    placeholder: {
      type: String,
      default: ""
    },
    startPlaceholder: {
      type: String,
      default: ""
    },
    endPlaceholder: {
      type: String,
      default: ""
    },
    rangeSeparator: {
      type: String,
      default: "-"
    },
    border: {
      type: [Boolean],
      default: true
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    clearIcon: {
      type: [Boolean],
      default: true
    },
    hideSecond: {
      type: [Boolean],
      default: false
    }
  },
  watch: {
    type: {
      immediate: true,
      handler(newVal) {
        this.hasTime = newVal.indexOf("time") !== -1;
        this.isRange = newVal.indexOf("range") !== -1;
      }
    },
    modelValue: {
      immediate: true,
      handler(newVal) {
        if (this.isEmitValue) {
          this.isEmitValue = false;
          return;
        }
        this.initPicker(newVal);
      }
    },
    start: {
      immediate: true,
      handler(newVal) {
        if (!newVal)
          return;
        const {
          defDate,
          defTime
        } = this.parseDate(newVal);
        this.caleRange.startDate = defDate;
        if (this.hasTime) {
          this.caleRange.startTime = defTime;
        }
      }
    },
    end: {
      immediate: true,
      handler(newVal) {
        if (!newVal)
          return;
        const {
          defDate,
          defTime
        } = this.parseDate(newVal);
        this.caleRange.endDate = defDate;
        if (this.hasTime) {
          this.caleRange.endTime = defTime;
        }
      }
    }
  },
  computed: {
    reactStartTime() {
      const activeDate = this.isRange ? this.tempRange.startDate : this.inputDate;
      const res = activeDate === this.caleRange.startDate ? this.caleRange.startTime : "";
      return res;
    },
    reactEndTime() {
      const activeDate = this.isRange ? this.tempRange.endDate : this.inputDate;
      const res = activeDate === this.caleRange.endDate ? this.caleRange.endTime : "";
      return res;
    },
    reactMobDefTime() {
      const times = {
        start: this.tempRange.startTime,
        end: this.tempRange.endTime
      };
      return this.isRange ? times : this.pickerTime;
    },
    mobSelectableTime() {
      return {
        start: this.caleRange.startTime,
        end: this.caleRange.endTime
      };
    },
    datePopupWidth() {
      return this.isRange ? 653 : 301;
    },
    /**
     * for i18n
     */
    singlePlaceholderText() {
      return this.placeholder || (this.type === "date" ? this.selectDateText : this.selectDateTimeText);
    },
    startPlaceholderText() {
      return this.startPlaceholder || this.startDateText;
    },
    endPlaceholderText() {
      return this.endPlaceholder || this.endDateText;
    },
    selectDateText() {
      return this.i18nT("uni-datetime-picker.selectDate");
    },
    selectDateTimeText() {
      return this.i18nT("uni-datetime-picker.selectDateTime");
    },
    selectTimeText() {
      return this.i18nT("uni-datetime-picker.selectTime");
    },
    startDateText() {
      return this.startPlaceholder || this.i18nT("uni-datetime-picker.startDate");
    },
    startTimeText() {
      return this.i18nT("uni-datetime-picker.startTime");
    },
    endDateText() {
      return this.endPlaceholder || this.i18nT("uni-datetime-picker.endDate");
    },
    endTimeText() {
      return this.i18nT("uni-datetime-picker.endTime");
    },
    okText() {
      return this.i18nT("uni-datetime-picker.ok");
    },
    clearText() {
      return this.i18nT("uni-datetime-picker.clear");
    },
    showClearIcon() {
      return this.clearIcon && !this.disabled && (this.displayValue || this.range.startDate && this.range.endDate);
    }
  },
  created() {
    this.initI18nT();
    this.platform();
  },
  methods: {
    initI18nT() {
      const vueI18n = common_vendor.initVueI18n(uni_modules_uniDatetimePicker_components_uniDatetimePicker_i18n_index.i18nMessages);
      this.i18nT = vueI18n.t;
    },
    initPicker(newVal) {
      if (!newVal || Array.isArray(newVal) && !newVal.length) {
        this.$nextTick(() => {
          this.clear(false);
        });
        return;
      }
      if (!Array.isArray(newVal) && !this.isRange) {
        const {
          defDate,
          defTime
        } = this.parseDate(newVal);
        this.displayValue = defDate;
        this.inputDate = defDate;
        this.calendarDate = defDate;
        if (this.hasTime) {
          this.displayValue = defDate + " " + defTime;
          this.pickerTime = defTime;
        }
      } else {
        const [before, after] = newVal;
        if (!before && !after)
          return;
        const defBefore = this.parseDate(before);
        const defAfter = this.parseDate(after);
        const startDate = defBefore.defDate;
        const endDate = defAfter.defDate;
        this.range.startDate = this.tempRange.startDate = startDate;
        this.range.endDate = this.tempRange.endDate = endDate;
        if (this.hasTime) {
          this.range.startDate = defBefore.defDate + " " + defBefore.defTime;
          this.range.endDate = defAfter.defDate + " " + defAfter.defTime;
          this.tempRange.startTime = defBefore.defTime;
          this.tempRange.endTime = defAfter.defTime;
        }
        const defaultRange = {
          before: defBefore.defDate,
          after: defAfter.defDate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
          which: "right"
        });
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
          which: "left"
        });
      }
    },
    updateLeftCale(e) {
      const left = this.$refs.left;
      left.cale.setHoverMultiple(e.after);
      left.setDate(this.$refs.left.nowDate.fullDate);
    },
    updateRightCale(e) {
      const right = this.$refs.right;
      right.cale.setHoverMultiple(e.after);
      right.setDate(this.$refs.right.nowDate.fullDate);
    },
    platform() {
      const { windowWidth } = common_vendor.index.getSystemInfoSync();
      this.isPhone = windowWidth <= 500;
      this.windowWidth = windowWidth;
    },
    show() {
      if (this.disabled) {
        return;
      }
      this.platform();
      if (this.isPhone) {
        this.$refs.mobile.open();
        return;
      }
      this.popover = {
        top: "10px"
      };
      const dateEditor = common_vendor.index.createSelectorQuery().in(this).select(".uni-date-editor");
      dateEditor.boundingClientRect((rect) => {
        if (this.windowWidth - rect.left < this.datePopupWidth) {
          this.popover.right = 0;
        }
      }).exec();
      setTimeout(() => {
        this.pickerVisible = !this.pickerVisible;
        if (!this.isPhone && this.isRange && this.isFirstShow) {
          this.isFirstShow = false;
          const {
            startDate,
            endDate
          } = this.range;
          if (startDate && endDate) {
            if (this.diffDate(startDate, endDate) < 30) {
              this.$refs.right.next();
            }
          } else {
            this.$refs.right.next();
            this.$refs.right.cale.lastHover = false;
          }
        }
      }, 50);
    },
    close() {
      setTimeout(() => {
        this.pickerVisible = false;
        this.$emit("maskClick", this.value);
        this.$refs.mobile && this.$refs.mobile.close();
      }, 20);
    },
    setEmit(value) {
      if (this.returnType === "timestamp" || this.returnType === "date") {
        if (!Array.isArray(value)) {
          if (!this.hasTime) {
            value = value + " 00:00:00";
          }
          value = this.createTimestamp(value);
          if (this.returnType === "date") {
            value = new Date(value);
          }
        } else {
          if (!this.hasTime) {
            value[0] = value[0] + " 00:00:00";
            value[1] = value[1] + " 00:00:00";
          }
          value[0] = this.createTimestamp(value[0]);
          value[1] = this.createTimestamp(value[1]);
          if (this.returnType === "date") {
            value[0] = new Date(value[0]);
            value[1] = new Date(value[1]);
          }
        }
      }
      this.$emit("change", value);
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
      this.isEmitValue = true;
    },
    createTimestamp(date) {
      date = this.fixIosDateFormat(date);
      return Date.parse(new Date(date));
    },
    singleChange(e) {
      this.calendarDate = this.inputDate = e.fulldate;
      if (this.hasTime)
        return;
      this.confirmSingleChange();
    },
    confirmSingleChange() {
      if (!this.inputDate) {
        this.pickerVisible = false;
        return;
      }
      if (!this.checkDate(this.inputDate)) {
        this.inputDate = this.getDate(Date.now());
      }
      let startLaterInputDate = false;
      let startDate, startTime;
      if (this.start) {
        let startString = this.start;
        if (typeof this.start === "number") {
          startString = this.getDateTime(this.start);
        }
        [startDate, startTime] = startString.split(" ");
        if (this.start && !this.dateCompare(startDate, this.inputDate)) {
          startLaterInputDate = true;
          this.inputDate = startDate;
        }
      }
      let endEarlierInputDate = false;
      let endDate, endTime;
      if (this.end) {
        let endString = this.end;
        if (typeof this.end === "number") {
          endString = this.getDateTime(this.end);
        }
        [endDate, endTime] = endString.split(" ");
        if (this.end && !this.dateCompare(this.inputDate, endDate)) {
          endEarlierInputDate = true;
          this.inputDate = endDate;
        }
      }
      if (this.hasTime) {
        if (startLaterInputDate) {
          this.pickerTime = startTime || this.getDefaultSecond();
        }
        if (endEarlierInputDate) {
          this.pickerTime = endTime || this.getDefaultSecond();
        }
        if (!this.pickerTime) {
          this.pickerTime = this.getTime(Date.now());
        }
        this.displayValue = `${this.inputDate} ${this.pickerTime}`;
      } else {
        this.displayValue = this.inputDate;
      }
      this.setEmit(this.displayValue);
      this.pickerVisible = false;
    },
    leftChange(e) {
      const {
        before,
        after
      } = e.range;
      this.rangeChange(before, after);
      const obj = {
        before: e.range.before,
        after: e.range.after,
        data: e.range.data,
        fulldate: e.fulldate
      };
      this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
    },
    rightChange(e) {
      const {
        before,
        after
      } = e.range;
      this.rangeChange(before, after);
      const obj = {
        before: e.range.before,
        after: e.range.after,
        data: e.range.data,
        fulldate: e.fulldate
      };
      this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
    },
    mobileChange(e) {
      if (this.isRange) {
        const { before, after } = e.range;
        if (!before || !after) {
          return;
        }
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime) {
          const {
            startTime,
            endTime
          } = e.timeRange;
          this.tempRange.startTime = startTime;
          this.tempRange.endTime = endTime;
        }
        this.confirmRangeChange();
      } else {
        if (this.hasTime) {
          this.displayValue = e.fulldate + " " + e.time;
        } else {
          this.displayValue = e.fulldate;
        }
        this.setEmit(this.displayValue);
      }
      this.$refs.mobile.close();
    },
    rangeChange(before, after) {
      if (!(before && after))
        return;
      this.handleStartAndEnd(before, after, true);
      if (this.hasTime)
        return;
      this.confirmRangeChange();
    },
    confirmRangeChange() {
      if (!this.tempRange.startDate || !this.tempRange.endDate) {
        this.pickerVisible = false;
        return;
      }
      if (!this.checkDate(this.tempRange.startDate)) {
        this.tempRange.startDate = this.getDate(Date.now());
      }
      if (!this.checkDate(this.tempRange.endDate)) {
        this.tempRange.endDate = this.getDate(Date.now());
      }
      let start, end;
      let startDateLaterRangeStartDate = false;
      let startDateLaterRangeEndDate = false;
      let startDate, startTime;
      if (this.start) {
        let startString = this.start;
        if (typeof this.start === "number") {
          startString = this.getDateTime(this.start);
        }
        [startDate, startTime] = startString.split(" ");
        if (this.start && !this.dateCompare(this.start, this.tempRange.startDate)) {
          startDateLaterRangeStartDate = true;
          this.tempRange.startDate = startDate;
        }
        if (this.start && !this.dateCompare(this.start, this.tempRange.endDate)) {
          startDateLaterRangeEndDate = true;
          this.tempRange.endDate = startDate;
        }
      }
      let endDateEarlierRangeStartDate = false;
      let endDateEarlierRangeEndDate = false;
      let endDate, endTime;
      if (this.end) {
        let endString = this.end;
        if (typeof this.end === "number") {
          endString = this.getDateTime(this.end);
        }
        [endDate, endTime] = endString.split(" ");
        if (this.end && !this.dateCompare(this.tempRange.startDate, this.end)) {
          endDateEarlierRangeStartDate = true;
          this.tempRange.startDate = endDate;
        }
        if (this.end && !this.dateCompare(this.tempRange.endDate, this.end)) {
          endDateEarlierRangeEndDate = true;
          this.tempRange.endDate = endDate;
        }
      }
      if (!this.hasTime) {
        start = this.range.startDate = this.tempRange.startDate;
        end = this.range.endDate = this.tempRange.endDate;
      } else {
        if (startDateLaterRangeStartDate) {
          this.tempRange.startTime = startTime || this.getDefaultSecond();
        } else if (endDateEarlierRangeStartDate) {
          this.tempRange.startTime = endTime || this.getDefaultSecond();
        }
        if (!this.tempRange.startTime) {
          this.tempRange.startTime = this.getTime(Date.now());
        }
        if (startDateLaterRangeEndDate) {
          this.tempRange.endTime = startTime || this.getDefaultSecond();
        } else if (endDateEarlierRangeEndDate) {
          this.tempRange.endTime = endTime || this.getDefaultSecond();
        }
        if (!this.tempRange.endTime) {
          this.tempRange.endTime = this.getTime(Date.now());
        }
        start = this.range.startDate = `${this.tempRange.startDate} ${this.tempRange.startTime}`;
        end = this.range.endDate = `${this.tempRange.endDate} ${this.tempRange.endTime}`;
      }
      if (!this.dateCompare(start, end)) {
        [start, end] = [end, start];
      }
      this.range.startDate = start;
      this.range.endDate = end;
      const displayRange = [start, end];
      this.setEmit(displayRange);
      this.pickerVisible = false;
    },
    handleStartAndEnd(before, after, temp = false) {
      if (!(before && after))
        return;
      const type = temp ? "tempRange" : "range";
      const isStartEarlierEnd = this.dateCompare(before, after);
      this[type].startDate = isStartEarlierEnd ? before : after;
      this[type].endDate = isStartEarlierEnd ? after : before;
    },
    /**
     * 比较时间大小
     */
    dateCompare(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      return startDate <= endDate;
    },
    /**
     * 比较时间差
     */
    diffDate(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
      return Math.abs(diff);
    },
    clear(needEmit = true) {
      if (!this.isRange) {
        this.displayValue = "";
        this.inputDate = "";
        this.pickerTime = "";
        if (this.isPhone) {
          this.$refs.mobile && this.$refs.mobile.clearCalender();
        } else {
          this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
        }
        if (needEmit) {
          this.$emit("change", "");
          this.$emit("input", "");
          this.$emit("update:modelValue", "");
        }
      } else {
        this.range.startDate = "";
        this.range.endDate = "";
        this.tempRange.startDate = "";
        this.tempRange.startTime = "";
        this.tempRange.endDate = "";
        this.tempRange.endTime = "";
        if (this.isPhone) {
          this.$refs.mobile && this.$refs.mobile.clearCalender();
        } else {
          this.$refs.left && this.$refs.left.clearCalender();
          this.$refs.right && this.$refs.right.clearCalender();
          this.$refs.right && this.$refs.right.next();
        }
        if (needEmit) {
          this.$emit("change", []);
          this.$emit("input", []);
          this.$emit("update:modelValue", []);
        }
      }
    },
    parseDate(date) {
      date = this.fixIosDateFormat(date);
      const defVal = new Date(date);
      const year = defVal.getFullYear();
      const month = defVal.getMonth() + 1;
      const day = defVal.getDate();
      const hour = defVal.getHours();
      const minute = defVal.getMinutes();
      const second = defVal.getSeconds();
      const defDate = year + "-" + this.lessTen(month) + "-" + this.lessTen(day);
      const defTime = this.lessTen(hour) + ":" + this.lessTen(minute) + (this.hideSecond ? "" : ":" + this.lessTen(second));
      return {
        defDate,
        defTime
      };
    },
    lessTen(item) {
      return item < 10 ? "0" + item : item;
    },
    //兼容 iOS、safari 日期格式
    fixIosDateFormat(value) {
      return value;
    },
    checkDate(date) {
      const dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
      return date.match(dateReg);
    },
    getDateTime(date) {
      return `${this.getDate(date)} ${this.getTime(date)}`;
    },
    getDate(date) {
      date = new Date(date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${this.addZero(month)}-${this.addZero(day)}`;
    },
    getTime(date) {
      date = new Date(date);
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return this.hideSecond ? `${this.addZero(hour)}:${this.addZero(minute)}` : `${this.addZero(hour)}:${this.addZero(minute)}:${this.addZero(second)}`;
    },
    addZero(num) {
      if (num < 10) {
        num = `0${num}`;
      }
      return num;
    },
    getDefaultSecond() {
      return this.hideSecond ? "00:00" : "00:00:00";
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_time_picker = common_vendor.resolveComponent("time-picker");
  const _component_calendar = common_vendor.resolveComponent("calendar");
  (_easycom_uni_icons2 + _component_time_picker + _component_calendar)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isRange
  }, !$data.isRange ? {
    b: common_vendor.p({
      type: "calendar",
      color: "#c0c4cc",
      size: "22"
    }),
    c: $options.singlePlaceholderText,
    d: $data.displayValue,
    e: common_vendor.o(($event) => $data.displayValue = $event.detail.value)
  } : {
    f: common_vendor.p({
      type: "calendar",
      color: "#c0c4cc",
      size: "22"
    }),
    g: $options.startPlaceholderText,
    h: $data.range.startDate,
    i: common_vendor.o(($event) => $data.range.startDate = $event.detail.value),
    j: common_vendor.t($props.rangeSeparator),
    k: $options.endPlaceholderText,
    l: $data.range.endDate,
    m: common_vendor.o(($event) => $data.range.endDate = $event.detail.value)
  }, {
    n: $options.showClearIcon
  }, $options.showClearIcon ? {
    o: common_vendor.p({
      type: "clear",
      color: "#c0c4cc",
      size: "22"
    }),
    p: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    q: $props.disabled ? 1 : "",
    r: $props.border ? 1 : "",
    s: common_vendor.o((...args) => $options.show && $options.show(...args)),
    t: $data.pickerVisible,
    v: common_vendor.o((...args) => $options.close && $options.close(...args)),
    w: !$data.isPhone
  }, !$data.isPhone ? common_vendor.e({
    x: !$data.isRange
  }, !$data.isRange ? common_vendor.e({
    y: $data.hasTime
  }, $data.hasTime ? {
    z: $options.selectDateText,
    A: $data.inputDate,
    B: common_vendor.o(($event) => $data.inputDate = $event.detail.value),
    C: $options.selectTimeText,
    D: !$data.inputDate,
    E: $data.pickerTime,
    F: common_vendor.o(($event) => $data.pickerTime = $event.detail.value),
    G: common_vendor.o(($event) => $data.pickerTime = $event),
    H: common_vendor.p({
      type: "time",
      border: false,
      disabled: !$data.inputDate,
      start: $options.reactStartTime,
      end: $options.reactEndTime,
      hideSecond: $props.hideSecond,
      modelValue: $data.pickerTime
    })
  } : {}, {
    I: common_vendor.sr("pcSingle", "d13b2506-4"),
    J: common_vendor.o($options.singleChange),
    K: common_vendor.p({
      showMonth: false,
      ["start-date"]: $data.caleRange.startDate,
      ["end-date"]: $data.caleRange.endDate,
      date: $data.calendarDate
    }),
    L: $data.hasTime
  }, $data.hasTime ? {
    M: common_vendor.t($options.okText),
    N: common_vendor.o((...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
  } : {}, {
    O: common_vendor.s($data.popover)
  }) : common_vendor.e({
    P: $data.hasTime
  }, $data.hasTime ? {
    Q: $options.startDateText,
    R: $data.tempRange.startDate,
    S: common_vendor.o(($event) => $data.tempRange.startDate = $event.detail.value),
    T: $options.startTimeText,
    U: !$data.tempRange.startDate,
    V: $data.tempRange.startTime,
    W: common_vendor.o(($event) => $data.tempRange.startTime = $event.detail.value),
    X: common_vendor.o(($event) => $data.tempRange.startTime = $event),
    Y: common_vendor.p({
      type: "time",
      start: $options.reactStartTime,
      border: false,
      disabled: !$data.tempRange.startDate,
      hideSecond: $props.hideSecond,
      modelValue: $data.tempRange.startTime
    }),
    Z: common_vendor.p({
      type: "arrowthinright",
      color: "#999"
    }),
    aa: $options.endDateText,
    ab: $data.tempRange.endDate,
    ac: common_vendor.o(($event) => $data.tempRange.endDate = $event.detail.value),
    ad: $options.endTimeText,
    ae: !$data.tempRange.endDate,
    af: $data.tempRange.endTime,
    ag: common_vendor.o(($event) => $data.tempRange.endTime = $event.detail.value),
    ah: common_vendor.o(($event) => $data.tempRange.endTime = $event),
    ai: common_vendor.p({
      type: "time",
      end: $options.reactEndTime,
      border: false,
      disabled: !$data.tempRange.endDate,
      hideSecond: $props.hideSecond,
      modelValue: $data.tempRange.endTime
    })
  } : {}, {
    aj: common_vendor.sr("left", "d13b2506-8"),
    ak: common_vendor.o($options.leftChange),
    al: common_vendor.o($options.updateRightCale),
    am: common_vendor.p({
      showMonth: false,
      ["start-date"]: $data.caleRange.startDate,
      ["end-date"]: $data.caleRange.endDate,
      range: true,
      pleStatus: $data.endMultipleStatus
    }),
    an: common_vendor.sr("right", "d13b2506-9"),
    ao: common_vendor.o($options.rightChange),
    ap: common_vendor.o($options.updateLeftCale),
    aq: common_vendor.p({
      showMonth: false,
      ["start-date"]: $data.caleRange.startDate,
      ["end-date"]: $data.caleRange.endDate,
      range: true,
      pleStatus: $data.startMultipleStatus
    }),
    ar: $data.hasTime
  }, $data.hasTime ? {
    as: common_vendor.t($options.clearText),
    at: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    av: common_vendor.t($options.okText),
    aw: common_vendor.o((...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
  } : {}, {
    ax: common_vendor.s($data.popover)
  }), {
    ay: $data.pickerVisible
  }) : {}, {
    az: $data.isPhone
  }, $data.isPhone ? {
    aA: common_vendor.sr("mobile", "d13b2506-10"),
    aB: common_vendor.o($options.mobileChange),
    aC: common_vendor.o($options.close),
    aD: common_vendor.p({
      clearDate: false,
      date: $data.calendarDate,
      defTime: $options.reactMobDefTime,
      ["start-date"]: $data.caleRange.startDate,
      ["end-date"]: $data.caleRange.endDate,
      selectableTimes: $options.mobSelectableTime,
      startPlaceholder: $props.startPlaceholder,
      endPlaceholder: $props.endPlaceholder,
      pleStatus: $data.endMultipleStatus,
      showMonth: false,
      range: $data.isRange,
      typeHasTime: $data.hasTime,
      insert: false,
      hideSecond: $props.hideSecond
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
