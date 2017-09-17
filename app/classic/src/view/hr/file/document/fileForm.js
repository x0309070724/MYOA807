Ext.define('APP.view.hr.file.document.fileForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrFileDocumentFileForm',
  controller: 'hr.file.document',
  width: 680,
  items: [
    {
      xtype: 'container', layout: {type: 'vbox', align: 'stretch'}, flex: 1, margin: '0 0 0 5', items: [
      {
        xtype: 'fieldcontainer', layout: 'hbox', items: [
        {emptyText: '文件标题', xtype: 'textfield', name: 'title', flex: 1, height: 25, allowBlank: false},
        {
          xtype: 'radiogroup',
          columns: 2,
          name: 'improtant',
          allowBlank: false,
          width: 270,
          height: 25,
          margin: '0 0 0 60',
          items: [
            {boxLabel: '常规', inputValue: '0', checked: true},
            {boxLabel: '重要', inputValue: '1'}
          ]
        }
      ]
      },
      {
        xtype: 'fieldcontainer', layout: 'hbox', items: [
        {emptyText: '实施部门', xtype: 'comboCompanyDepartment', flex: 1, height: 25, name: 'departmentid'},
        {fieldLabel: '启用', xtype: 'checkbox', name: 'invalid', inputValue: 1, flex: 1, checked: true}

      ]
      },
      {emptyText: '上传文件', xtype: 'uploadField', name: 'url', flex: 1, height: 25, allowBlank: true},
      {emptyText: '文件内容', xtype: 'htmleditor', name: 'content', flex: 1, allowBlank: false}
    ]
    }
  ]
});

