Ext.define('APP.view.combo.appPay', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboAppPay',
  store: {
    type: 'cross',
    autoLoad: false,
    model: 'APP.model.sys.settings.autoFrom',
    sorters: [{property: 'id', direction: 'DESC'}],
    proxy: {
      url: Boot.appUrl('/sd/system/pay/getAppByGroup.do')
    }
  },
  emptyText: 'App名称...',
  name: 'name',
  valueField: 'payment',
  displayField: 'name',
  forceSelection: false,
  listeners: {
    beforerender: function (combo) {
      if (!combo.getStore().isLoaded()) {
        combo.setReadOnly(true);
        combo.getStore().load({
          callback: function () {
            combo.setValue(combo.getValue())
            combo.setReadOnly(false);
            combo.forceSelection = true;
          }
        })
      } else {
        combo.forceSelection = true;
      }
    }
  }
});
