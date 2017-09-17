Ext.define('APP.view.hr.company.department', {
  extend: 'Ext.grid.Panel',
  controller: 'hr.company',
  store: {
    type: 'cross',
    autoLoad: true,
    pageSize: false,
    sorters: [{property: 'sortnum', direction: 'ASC'}],
    proxy: {
      url: Boot.appUrl('/hr/company/getDepartment.do')
    }
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar',
      items: [
        '->',
        {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onDepartmentCreatClick'},
        {
          iconCls: 'f-mt mt-delete',
          text: '删除',
          disabled: true,
          selection: true,
          handler: 'onDepartmentRemoveClick'
        }, '-',
        {xtype: 'refreshbutton'}
      ]
    }
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '名称', dataIndex: 'name', width: 160},
    {
      text: '成员数',
      dataIndex: 'staff_count',
      align: 'right',
      width: 100,
      renderer: 'returnA',
      summaryType: 'sum',
      summaryRenderer: 'returnA'
    },
    {text: '描述', dataIndex: 'explain', minWidth: 200, flex: 1, renderer: 'returnMore'},
    {text: '禁用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnYes'},
    {
      text: '修改',
      xtype: 'actioncolumn',
      align: 'center',
      width: 60,
      iconCls: 'f-mt mt-edit',
      handler: 'onDepartmentUpdateClick'
    }
  ],
  features: [{ftype: 'summary', dock: 'bottom'}],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});
