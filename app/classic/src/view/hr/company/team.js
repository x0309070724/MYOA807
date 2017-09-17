Ext.define('APP.view.hr.company.team', {
  extend: 'Ext.grid.Panel',
  controller: 'hr.company',
  store: {
    type: 'cross',
    autoLoad: true,
    pageSize: false,
    groupField: 'departmentid',
    groupDir: 'ASC',
    sorters: [{property: 'id', direction: 'ASC'}],
    proxy: {
      url: Boot.appUrl('/hr/company/getTeam.do')
    }
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar',
      items: [
        {
          xtype: 'searchbar', fields: [
          {
            xtype: 'segmentedfield', segmented: {
            name: 'invalid',
            items: [
              {tooltip: '启用', iconCls: 'f-mt mt-yes', value: 0, pressed: true},
              {tooltip: '禁用', iconCls: 'f-mt mt-no', value: 1},
              {tooltip: '全部', iconCls: 'f-mt mt-icon', value: ''}
            ]
          }
          }
        ]
        },
        '->',
        {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onTeamCreatClick'}, '-',
//				{iconCls:'f-mt mt-delete',text:'删除',disabled:true,selection:true,handler:'onTeamRemoveClick'},'-',
        {xtype: 'refreshbutton'}
      ]
    }
  ],
  columns: [
    {xtype: 'rownumberer'},
    //{text:'层级',dataIndex:'index',width:160,renderer:'returTeamIndex'},
    {text: '部门', dataIndex: 'departmentid', xtype: 'templatecolumn', tpl: '{department_name}', width: 160},
    {text: '名称', dataIndex: 'name', width: 160},
    {
      text: '负责人',
      dataIndex: 'managerid',
      xtype: 'templatecolumn',
      tpl: '{manager_namecn}<r>{manager_name}</r>',
      width: 160
    },
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
      handler: 'onTeamUpdateClick'
    }
  ],
  features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});
