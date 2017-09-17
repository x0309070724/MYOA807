Ext.define('APP.view.combo.account.type', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboAccountType',
  store: {
    fields: 'value',
    data: [
      {value: 'IB'},
      {value: 'IBC'},
      {value: 'SH'}
    ]
  },
  emptyText: '账户性质...',
  width: 80,
  name: 'type',
  valueField: 'value',
  displayField: 'value'
});
