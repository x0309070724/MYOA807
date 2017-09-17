Ext.define('APP.view.hr.company.branchForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrCompanyBranchForm',
  width: 600,
  items: [
    {
      title: '网点信息', items: [
      {
        columnWidth: .5, items: [
        {fieldLabel: '名称', xtype: 'textfield', name: 'name', allowBlank: false}
      ]
      },
      {columnWidth: 1},
      {
        columnWidth: .5, items: [
        {fieldLabel: '电话', xtype: 'textfield', name: 'phone'}
      ]
      },
      {
        columnWidth: .5, items: [
        {fieldLabel: '传真', xtype: 'textfield', name: 'fax'}
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '地址', xtype: 'textfield', name: 'address'}
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '描述', xtype: 'textarea', name: 'explain', height: 50},
        {
          xtype: 'checkboxgroup',
          fieldLabel: '控制项',
          columns: 2,
          allowBlank: true,
          bind: {disabled: '{!isUpdate}', hidden: '{!isUpdate}'},
          items: [
            {boxLabel: '禁用', name: 'invalid', inputValue: 1}
          ]
        }
      ]
      }
    ]
    }
  ]
});
