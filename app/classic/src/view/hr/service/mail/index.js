Ext.define('APP.view.hr.service.mail.index', {
  extend: 'Ext.grid.Panel',
  controller: 'hr.service.mail',
  store: {
    type: 'cross',
    model: 'APP.model.hr.staff.account',
    autoLoad: true,
    pageSize: false,
    groupField: 'departmentid',
    groupDir: 'desc',
    sorters: [{property: 'departmentid', direction: 'desc'}, {property: 'id', direction: 'ASC'}],
    proxy: {
      url: Boot.appUrl('/task/getEmail.do')
    }
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar',
      items: [
        {
          xtype: 'searchbar',
          fields: [
            {emptyText: '员工', xtype: 'comboCompanyStaff', name: 'staffid', width: 160},
            {emptyText: '关键字...', xtype: 'textfield', name: 'query', width: 160}
          ]
        },
        '->',
        {iconCls: 'f-mt mt-action-link', text: '同步', handler: 'tongbuEmail'},
        {iconCls: 'f-mt mt-creat', text: '新增', handler: 'createEmail'},
        {iconCls: 'f-mt mt-remove', text: '删除', disabled: true, selection: true, handler: 'deleteEmail'},
        '-',
        {xtype: 'refreshbutton'}
      ]
    }
  ],
  columns: [
    {xtype: 'rownumberer', width: 34},
    {text: 'ID', dataIndex: 'id', hidden: true},
    {text: 'Email', dataIndex: 'email', minWidth: 140, flex: 1, summaryType: 'count'},
    {
      text: '员工档案', columns: [
      {
        text: '姓名',
        xtype: 'templatecolumn',
        dataIndex: 'namecn',
        width: 220,
        tpl: '{namecn} <s>{name}</s> <r>{post_name}</r>'
      },
      {text: '入职日期', dataIndex: 'startdate', width: 100},
      {text: '工号', dataIndex: 'login', width: 160, renderer: 'returnLogin'},
      {text: '任职部门', xtype: 'templatecolumn', dataIndex: 'departmentid', width: 100, tpl: '{department_name}'},
      {text: '团队', xtype: 'templatecolumn', dataIndex: 'teamid', width: 180, tpl: '{team_name}<r>{manager_namecn}</r>'},
      {text: '手机', dataIndex: 'mobile', width: 130},
      {text: '企业QQ', xtype: 'templatecolumn', dataIndex: 'bqq', width: 160, tpl: '{bqq}<r>{bqq:qqLink}</r>'},
      {text: '电话', dataIndex: 'phone', width: 160, hidden: true}
    ]
    },
    {text: '启用', dataIndex: 'email_status', width: 120, align: 'center', renderer: 'returnMailStatus'},
    {text: '修改', xtype: 'actioncolumn', align: 'center', width: 80, iconCls: 'f-mt mt-edit', handler: 'updateEmail'}
  ],
  features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});















