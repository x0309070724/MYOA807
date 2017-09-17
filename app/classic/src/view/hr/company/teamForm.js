Ext.define('APP.view.hr.company.teamForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrCompanyTeamForm',
  width: 600,
  items: [
    {
      title: '团队信息', items: [
      {fieldLabel: '网点', xtype: 'hiddenfield', name: 'branchid', value: 101, allowBlank: false},
      {
        columnWidth: .5, items: [
        {fieldLabel: '团队名称', xtype: 'textfield', name: 'name', allowBlank: false}
      ]
      },
      {
        columnWidth: .5, items: [
        {fieldLabel: '负责人', xtype: 'comboCompanyStaff', name: 'managerid', allowBlank: false}
      ]
      },
      {columnWidth: 1},
      {
        columnWidth: .5, items: [
        {fieldLabel: '所属部门', xtype: 'comboCompanyDepartment', allowBlank: false}
      ]
      },
      {
        columnWidth: .5, items: [
        {fieldLabel: '上级部门', xtype: 'comboCompanyTeam', name: 'parentid', allowBlank: false}
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
})
