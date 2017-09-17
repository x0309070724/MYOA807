Ext.define('APP.view.hr.staff.profile.bank', {
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
      {text: '手机', dataIndex: 'mobile', width: 120},
      {text: 'Email', dataIndex: 'email', width: 220},
      {text: '企业QQ', xtype: 'templatecolumn', width: 140, tpl: '{bqq}<r>{bqq:qqLink}</r>'},
      {text: '电话', dataIndex: 'phone', width: 120, hidden: true}
    ]
    },
    {
      text: '银行卡信息', defaults: {sortable: true}, columns: [
      {text: '开户行', dataIndex: 'bank_name', width: 140},
      {text: '归属地', xtype: 'templatecolumn', width: 140, tpl: '{bank_province} {bank_city}'},
      {text: '支行', dataIndex: 'bank_branch', width: 160, hidden: true},
      {text: '卡号', xtype: 'templatecolumn', dataIndex: 'bank_cardno', width: 220, tpl: '{bank_cardno:spaceBankCard}'},
      {text: '实名', dataIndex: 'verify', align: 'center', width: 60, renderer: 'returnYes'}
    ]
    },
    {
      xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
      //tdCls:'x-ui-actioncolumn',
      items: [
        {tooltip: '更新资料', iconCls: 'f-mt mt-action-update', handler: 'onUpdateBankClick'}
      ]
    }
  ],
  features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}]
});

