Ext.define('APP.view.hr.staff.profile.account', {
  extend: 'Ext.grid.Panel',
  controller: 'hr.staff.profile',
  store: {
    type: 'hrStaff',
    autoLoad: true,
    pageSize: false,
    proxy: {
      extraParams: {invalid: 0}
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
            name: 'locked',
            items: [
              {tooltip: '正常', iconCls: 'f-mt mt-yes', value: 0},
              {tooltip: '已禁止登陆', iconCls: 'f-mt mt-no', value: 1},
              {tooltip: '全部', iconCls: 'f-mt mt-icon', value: '', pressed: true}
            ]
          }
          },
          //{emptyText:'部门...',xtype:'comboCompanyDepartment',width:120},
          //{emptyText:'网点...',xtype:'comboCompanyBranch',width:120},
          {emptyText: '团队...', xtype: 'comboCompanyTeam', name: 'teamid'},
          {emptyText: '职务...', xtype: 'comboCompanyPost', name: 'postid'},
          {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
        ]
        },
        '->',
        {xtype: 'refreshbutton'}
      ]
    }
    //{dock:'bottom',xtype:'pagingbar'}
  ],
  columns: [
    {xtype: 'rownumberer', width: 34},
    {text: 'ID', dataIndex: 'id', hidden: true},
    {
      text: '姓名',
      xtype: 'templatecolumn',
      dataIndex: 'namecn',
      minWidth: 140,
      flex: 1,
      tpl: '{namecn} <s>{name}</s> <r>{post_name}</r>',
      summaryType: 'count'
    },
    {
      text: '入职档案', defaults: {sortable: true}, columns: [
      {text: '入职日期', dataIndex: 'startdate', width: 100},
      {text: '工号', dataIndex: 'login', width: 100, renderer: 'returnLogin'},
      {text: '任职部门', xtype: 'templatecolumn', dataIndex: 'departmentid', width: 100, tpl: '{department_name}'},
      {text: '团队', xtype: 'templatecolumn', dataIndex: 'teamid', width: 160, tpl: '{team_name}<r>{manager_namecn}</r>'},
      {text: '手机', dataIndex: 'mobile', width: 100},
      {text: 'Email', dataIndex: 'email', width: 160},
      {text: '企业QQ', xtype: 'templatecolumn', width: 130, tpl: '{bqq}<r>{bqq:qqLink}</r>'},
      {text: '电话', dataIndex: 'phone', width: 120, hidden: true}
    ]
    },
    {
      text: '账户权限', defaults: {sortable: true}, columns: [
      {text: '超级', dataIndex: 'administrator', width: 80, align: 'center', renderer: 'returnYes'},
      {text: '查询权限', dataIndex: 'post_query', width: 160, renderer: 'returnPostQuery'},
      {text: '管理权限', dataIndex: 'post_manager', width: 160, renderer: 'returnPostManager'},
      {text: '导出', dataIndex: 'post_export', width: 80, align: 'center', renderer: 'returnYes'},
      {text: '禁止登录', dataIndex: 'locked', width: 80, align: 'center', renderer: 'returnYes'},
      {text: '最后登陆', xtype: 'datecolumn', dataIndex: 'logintime', width: 120, format: 'm-d H:i'}
    ]
    },
    {
      xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
      items: [
        {tooltip: '账户设置', iconCls: 'f-mt mt-password-safe', handler: 'onUpdateLoginClick'}
      ]
    }
  ],
  features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}]
});
