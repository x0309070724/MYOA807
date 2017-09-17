Ext.define('APP.view.sys.pay.aisle.bankForm', {
  extend: 'Ext.form.Panel',
  xtype: 'sysPayAisleBankForm',
  controller: 'sys.pay',
  width: 680,
  viewModel: true,
  items: [
    {
      title: '银行代码信息', fieldDefaults: {allowBlank: false}, items: [
      {
        columnWidth: .45, items: [
        {fieldLabel: '银行类型', xtype: 'comboBanktype', name: 'type'},
        {fieldLabel: '中文名称', xtype: 'textfield', reference:'_content', name: 'namecn'},
        //{fieldLabel:'支付标识',xtype:'textfield',name:'payment'},
        {fieldLabel: '支付标识', xtype: 'textfield', name: 'code'}
      ]
      },
      {
        columnWidth: .45, items: [
        {
          fieldLabel: '简称', xtype: 'textfield', name: 'name', listeners: {
          blur: function () {
            // console.log(this.up('items'));
            // console.log(this.up('form').down('hiddenfield'));
            var str = '<div style=\"color: #0a6ebd;\">' + this.value + '</div>';
            // console.log(this.lookup('_content'));

            console.log(this.up('form'));
            // this.setValue()
            // console.log(this.up('form').getReferences()._content.getValue());
          }
        }
        },
        //{fieldLabel:'支付代码',xtype:'textfield',name:'paycode'},
        {fieldLabel: '图标样式', xtype: 'textfield', name: 'icon'}
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
