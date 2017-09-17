Ext.define('APP.mate.field.month', {
  extend: 'Ext.form.field.Date',
  alias: 'widget.monthfield',
  format: 'Y-m',
  width: 80,
  createPicker: function () {
    var me = this,
      picker = me.monthPicker,
      format = Ext.String.format,
      pickerConfig;
    pickerConfig = {
      pickerField: me,
      ownerCmp: me,
      renderTo: document.body,
      floating: true,
      hidden: true,
      focusOnShow: true,
      minDate: me.minValue,
      maxDate: me.maxValue,
      disabledDatesRE: me.disabledDatesRE,
      disabledDatesText: me.disabledDatesText,
      disabledDays: me.disabledDays,
      disabledDaysText: me.disabledDaysText,
      format: me.format,
      showToday: me.showToday,
      startDay: me.startDay,
      minText: format(me.minText, me.formatDate(me.minValue)),
      maxText: format(me.maxText, me.formatDate(me.maxValue)),
      listeners: {
        scope: me,
        cancelclick: me.onCancelClick,
        okclick: me.onOkClick,
        yeardblclick: me.onOkClick,
        monthdblclick: me.onOkClick
      },
      keyNavConfig: {
        esc: function () {
          me.collapse();
        }
      }
    };
    if (Ext.isChrome) {
      me.originalCollapse = me.collapse;
      pickerConfig.listeners.boxready = {
        fn: function () {
          this.picker.el.on({
            mousedown: function () {
              this.collapse = Ext.emptyFn;
            },
            mouseup: function () {
              this.collapse = this.originalCollapse;
            },
            scope: this
          });
        },
        scope: me,
        single: true
      }
    }
    if (!picker) {
      me.monthPicker = picker = Ext.create('Ext.picker.Month', pickerConfig);
      if (!me.disableAnim) {
        picker.hide();
        me.isExpanded = false
      }
      me.on('beforehide', Ext.Function.bind(me.hideMonthPicker, me, [false]))
    }
    return picker
//		return Ext.create('Ext.picker.Month', pickerConfig);
  },
  onOkClick: function (picker, value) {
    var me = this,
      month = value[0],
      year = value[1],
      date = new Date(year, month, 1);
    if (date.getMonth() !== month) {
      date = Ext.Date.getLastDateOfMonth(new Date(year, month, 1))
    }
    me.activeDate = date = Ext.util.Format.date(date, me.format);
    me.setValue(date);
    me.hideMonthPicker()
  },
  onCancelClick: function () {
    this.setValue(this.activeDate);
    this.hideMonthPicker()
  },
  hideMonthPicker: function (animate) {
    var me = this,
      picker = me.picker;
    if (picker) {
      if (me.shouldAnimate(animate)) {
        me.runAnimation(true)
      } else {
        picker.hide();
        me.isExpanded = false
      }
    }
    return me
  },
  shouldAnimate: function (animate) {
    return Ext.isDefined(animate) ? animate : !this.disableAnim
  },
  runAnimation: function (isHide) {
    var me = this,
      picker = this.picker,
      options = {
        duration: 200,
        callback: function () {
          if (isHide) {
            picker.hide();
            me.isExpanded = false
          } else {
            picker.show();
            me.isExpanded = true
          }
        }
      };
    if (isHide) {
      picker.el.slideOut('t', options)
    } else {
      picker.el.slideIn('t', options)
    }
  }
});
