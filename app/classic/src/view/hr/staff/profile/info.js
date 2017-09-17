Ext.define('APP.view.hr.staff.profile.info', {
  extend: 'Ext.grid.Panel',
  controller: 'hr.staff.profile',
  store: {
    type: 'hrStaff',
    autoLoad: true,
    pageSize: false
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
            reference: 'invalid',
            items: [
              {tooltip: '在职', iconCls: 'f-mt mt-yes', value: 0, pressed: true},
              {tooltip: '离职', iconCls: 'f-mt mt-no', value: 1},
              {tooltip: '全部', iconCls: 'f-mt mt-icon', value: ''}
            ]
          }
          },
          //{emptyText:'部门...',xtype:'comboCompanyDepartment',width:120},
          //{emptyText:'网点...',xtype:'comboCompanyBranch',width:120},
          {emptyText: '团队...', xtype: 'comboCompanyTeam', name: 'teamid'},
          {emptyText: '职务...', xtype: 'comboCompanyPost', name: 'postid'},
          {emptyText: '关键字...', xtype: 'textfield', name: 'query', width: 140}
        ]
        },
        '->',
        {iconCls: 'f-mt mt-creat', text: '入职', handler: 'onCreatClick'},
        '-',
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
      {text: '入职日期', dataIndex: 'startdate', width: 100, bind: {hidden: '{invalid.value==1}'}},
      {text: '离职日期', dataIndex: 'enddate', width: 100, bind: {hidden: '{invalid.value!=1}'}},
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
      text: '证件信息', defaults: {sortable: true}, columns: [
      {text: '民族', dataIndex: 'identity_nationality', width: 80},
      {text: '出生日期', dataIndex: 'birthday', width: 100},
      {text: '证件号', dataIndex: 'identity_cardno', width: 150},
      {text: '户籍地址', dataIndex: 'identity_address', width: 340, renderer: 'returnMore'}
    ]
    },
    {
      xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
      //tdCls:'x-ui-actioncolumn',
      items: [
        {tooltip: '更新资料', iconCls: 'f-mt mt-action-update', handler: 'onUpdateInfoClick'}
      ]
    }
  ],
  features: [{ftype: 'grouping'}, {ftype: 'summary', dock: 'bottom'}]
  //features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
});

