Ext.define('APP.view.hr.company.postForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrCompanyPostForm',
  width: 600,
  items: [
    {
      title: '职务信息', items: [
      {
        columnWidth: .5, items: [
        {fieldLabel: '所属部门', xtype: 'comboCompanyDepartment', allowBlank: false}
      ]
      },
      {
        columnWidth: .5, items: [
        {fieldLabel: '名称', xtype: 'textfield', name: 'name', allowBlank: false}
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '职责描述', xtype: 'textarea', name: 'explain', height: 50},
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
    },
    {
      title: '系统权限', items: [
      {
        columnWidth: .5, items: [
        {
          fieldLabel: '查询权限', xtype: 'radiogroup', layout: 'anchor', anchor: '100%', columns: 1,
          items: [
            {boxLabel: '超级（不受限制）', name: 'query', inputValue: 100},
            {boxLabel: '总监（本网点）', name: 'query', inputValue: 1},
            {boxLabel: '经理（本部）', name: 'query', inputValue: 2},
            {boxLabel: '主管（本团队）', name: 'query', inputValue: 3},
            {boxLabel: '成员（本人）', name: 'query', inputValue: 4, checked: true}
          ]
        }
      ]
      },
      {
        columnWidth: .5, items: [
        {
          fieldLabel: '管理权限',
          xtype: 'checkboxarraygroup',
          name: 'manager',
          layout: 'anchor',
          anchor: '100%',
          columns: 1,
          items: [
            {boxLabel: '新增', inputValue: 1},
            {boxLabel: '更改', inputValue: 1},
            {boxLabel: '删除', inputValue: 1},
            {boxLabel: '其它', inputValue: 1}
          ]
        }
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '数据导出', xtype: 'checkbox', name: 'export', boxLabel: '允许', inputValue: 1}
      ]
      }
    ]
    }
  ]
});
