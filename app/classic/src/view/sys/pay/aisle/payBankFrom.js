Ext.define('APP.view.sys.pay.aisle.payBankFrom', {
  extend: 'Ext.form.Panel',
  xtype: 'sysPayAislePayBankFrom',
  controller: 'sys.pay',
  width: 680,
  viewModel: true,
  type: this.type,
  items: [
    {
      title: '银行代码信息', fieldDefaults: {allowBlank: false}, items: [
      {
        columnWidth: .45, items: [
        {fieldLabel: '中文名称', xtype: 'comboBankname', name: 'namecn', listeners: {change: 'onFieldPayBanknameEnter'}},
        {fieldLabel: '支付标识', xtype: 'comboSysPayment', name: 'payment'}
      ]
      },
      {
        columnWidth: .45, items: [
        {fieldLabel: '简称', xtype: 'textfield', name: 'name', readOnly: 'true'},
        {fieldLabel: '银行类型', xtype: 'textfield', name: 'type', hidden: true},
        {fieldLabel: '银行代码', xtype: 'textfield', name: 'code'}
        //{fieldLabel:'图标样式',xtype:'textfield',name:'icon',readOnly:'true'}
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '启用', xtype: 'checkbox', name: 'invalid', checked: true}
      ]
      }
    ]
    }
  ]
});

