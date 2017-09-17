Ext.define('APP.view.combo.autoForm', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboAutoform',
  store: {
    type: 'cross',
    autoLoad: false,
    model: 'APP.model.sys.settings.autoFrom',
    sorters: [{property: 'id', direction: 'DESC'}],
    proxy: {
      url: Boot.appUrl('/getAutotaskConfig.do')
    }
  },
  emptyText: '插件名称...',
  name: 'plugin',
  valueField: 'plugin',
  displayField: 'display',
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
