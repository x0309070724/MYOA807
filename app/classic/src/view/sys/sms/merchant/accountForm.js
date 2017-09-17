Ext.define('APP.view.sys.sms.merchant.accountForm', {
  extend: 'Ext.form.Panel',
  xtype: 'sysSmsMerchantAccountForm',
  controller: 'sys.sms',
  width: 600,
  viewModel: true,
  items: [
    {
      title: '商户信息', items: [
      {
        columnWidth: .49, items: [
        {fieldLabel: '名字', xtype: 'textfield', name: 'namecn', allowBlank: false}
      ]
      },
      {
        columnWidth: .5, items: [
        {fieldLabel: '商户号', xtype: 'textfield', name: 'merchantno', allowBlank: false, bind: {readOnly: '{isUpdate}'}}
      ]
      },
      {
        columnWidth: 1, items: [
        {
          fieldLabel: '秘钥',
          xtype: 'textfield',
          name: 'merchantkey',
          allowBlank: false,
          bind: {disabled: '{isUpdate}', hidden: '{isUpdate}'}
        },
        //{fieldLabel:'注释',xtype:'textarea',name:'explain',height:60},
        {
          xtype: 'fieldcontainer', fieldLabel: '控制项', items: [
          {xtype: 'checkbox', boxLabel: '锁定', name: 'invalid'}
        ]
        }
      ]
      }
    ]
    }
  ]
});
