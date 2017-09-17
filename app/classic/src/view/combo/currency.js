Ext.define('APP.view.combo.currency', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboCurrency',
  store: {
    fields: ['value', 'display'],
    data: [
      ['USD', '美金 - USD'],
      ['GBP', '英镑 - GBP'],
      ['HKD', '港币 - HKD'],
      ['CNY', '人民币 - CNY']
    ]
  },
  emptyText: '币种...',
  width: 120,
  name: 'currency',
  valueField: 'value',
  displayField: 'display'
});


