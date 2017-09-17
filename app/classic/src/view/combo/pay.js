Ext.define('APP.view.combo.pay', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboPayment',
  store: {
    type: 'cross',
    autoLoad: false,
    sorters: [{property: 'id', direction: 'DESC'}],
    proxy: {
      url: Boot.appUrl('/sd/system/pay/getPayAisle.do')
    }
  },
  emptyText: '支付接口...',
  name: 'name',
  valueField: 'id',
  displayField: 'name',
  listConfig: {
    getInnerTpl: function () {
      return '<span class="x-ui-text-grey">{name}</span>'
    }
  },
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
