Ext.define('APP.view.hr.service.bqq.index', {
  extend: 'Ext.Panel',
  controller: 'hr.service.bqq',
  layout: {type: 'border', align: 'stretch', padding: 3},
  defaults: {split: true, border: true},
  items: [
    {
      xtype: 'grid', region: 'west', title: '企业QQ', collapsible: true, flex: .5,
      reference: 'gridBase',
      store: {
        type: 'cross',
        model: 'APP.model.hr.staff.account',
        autoLoad: true,
        pageSize: false,
        groupField: 'departmentid',
        groupDir: 'ASC',
        sorters: [{property: 'departmentid', direction: 'ASC'}, {property: 'id', direction: 'ASC'}],
        proxy: {
          url: Boot.appUrl('/task/getBQQ.do'),
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
            {xtype: 'refreshbutton'}
          ]
        }
      ],
      columns: [
        {xtype: 'rownumberer', width: 34},
        {text: 'ID', dataIndex: 'id', hidden: true},
        {
          text: '企业QQ',
          xtype: 'templatecolumn',
          minWidth: 140,
          flex: 1,
          tpl: '{bqq}<r>{bqq:qqLink}</r>',
          summaryType: 'count'
        },
        {
          text: '员工档案', columns: [
          {
            text: '姓名',
            xtype: 'templatecolumn',
            dataIndex: 'namecn',
            width: 180,
            tpl: '{namecn} <s>{name}</s> <r>{post_name}</r>'
          },
          {text: '入职日期', dataIndex: 'startdate', width: 100},
          {text: '工号', dataIndex: 'login', width: 130, renderer: 'returnLogin', hidden: true},
          {text: '任职部门', xtype: 'templatecolumn', dataIndex: 'departmentid', width: 100, tpl: '{department_name}'},
          {
            text: '团队',
            xtype: 'templatecolumn',
            dataIndex: 'teamid',
            width: 200,
            tpl: '{team_name}<r>{manager_namecn}</r>'
          },
          {text: '手机', dataIndex: 'mobile', width: 100,  hidden: true},
          {text: 'Email', dataIndex: 'email', width: 120, hidden: true},
          {text: '电话', dataIndex: 'phone', width: 120, hidden: true}
        ]
        },
        {text: '启用', dataIndex: 'invalid', width: 120, align: 'center', renderer: 'returnAuditStatus'}
      ],
      viewConfig: {enableTextSelection: false},
      features: [{ftype: 'grouping'}, {ftype: 'summary', dock: 'bottom'}],
      listeners: {
        selectionchange: 'onBqqSelectionchange'
      }
    },
    {
      xtype: 'grid', region: 'center', title: '历史记录', flex: .5,
      reference: 'gridChange',
      store: {
        type: 'hrStaff',
        autoLoad: false,
        pageSize: false,
        extraParams: {}
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar', items: [
          {
            xtype: 'searchbar',
            fields: [
              {emptyText: '入职日期...', xtype: 'datefield', name: 'time'},
              //{emptyText:'员工...',xtype:'comboCompanyStaff',name:'staffid'},
              //{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
            ]
          },
          '->',
          {xtype: 'refreshbutton'}
        ]
        },
        {dock: 'bottom', xtype: 'pagingbar'}
      ],
      columns: [
        {xtype: 'rownumberer', width: 34},
        {text: 'ID', dataIndex: 'id', hidden: true},
        {
          text: '企业QQ',
          xtype: 'templatecolumn',
          minWidth: 140,
          flex: 1,
          tpl: '{bqq}<r>{bqq:qqLink}</r>',
          summaryType: 'count'
        },
        {
          text: '员工档案', columns: [
          {
            text: '姓名',
            xtype: 'templatecolumn',
            dataIndex: 'namecn',
            width: 180,
            tpl: '{namecn} <s>{name}</s> <r>{post_name}</r>'
          },
          {text: '入职日期', dataIndex: 'startdate', width: 100},
          {text: '工号', dataIndex: 'login', width: 130, renderer: 'returnLogin', hidden: true},
          {text: '任职部门', xtype: 'templatecolumn', dataIndex: 'departmentid', width: 100, tpl: '{department_name}'},
          {
            text: '团队',
            xtype: 'templatecolumn',
            dataIndex: 'teamid',
            width: 200,
            tpl: '{team_name}<r>{manager_namecn}</r>'
          },
          {text: '手机', dataIndex: 'mobile', width: 100, hidden: true},
          {text: 'Email', dataIndex: 'email', width: 120, hidden: true},
          {text: '电话', dataIndex: 'phone', width: 120, hidden: true}
        ]
        }
      ],
      features: [{ftype: 'grouping'}]
    }
  ]
});






























