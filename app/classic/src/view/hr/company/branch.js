Ext.define('APP.view.hr.company.branch', {
  extend: 'Ext.grid.Panel',
  controller: 'hr.company',
  store: {
    type: 'cross',
    autoLoad: true,
    // 不分页
    pageSize: false,
    sorters: [{property: 'sortnum', direction: 'ASC'}],
    proxy: {
      url: Boot.appUrl('/hr/company/getBranch.do')
    }
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar',
      items: [
        '->',
        {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onBranchCreatClick'},
        {iconCls: 'f-mt mt-delete', text: '删除', disabled: true, selection: true, handler: 'onBranchRemoveClick'}, '-',
        {xtype: 'refreshbutton'}
      ]
    }
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '名称', dataIndex: 'name', width: 160},
    {text: '电话', dataIndex: 'phone', width: 160},
    {text: '传真', dataIndex: 'fax', width: 160},
    {text: '地址', dataIndex: 'address', width: 300},
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
      handler: 'onBranchUpdateClick'
    }
  ],
  features: [{ftype: 'summary', dock: 'bottom'}],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});
