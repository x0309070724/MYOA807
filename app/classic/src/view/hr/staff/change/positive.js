Ext.define('APP.view.hr.staff.change.positive', {
  extend: 'Ext.Panel',
  controller: 'hr.staff.change',
  layout: {type: 'border', align: 'stretch', padding: 3},
  defaults: {split: true, border: true},
  items: [
    {
      xtype: 'grid', region: 'west', title: '待转正', collapsible: true, width: 600,
      reference: 'gridBase',
      store: {
        type: 'hrStaff',
        autoLoad: true,
        pageSize: false,
        proxy: {
          extraParams: {positive: 0, invalid: 0}
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar', items: [
          {
            xtype: 'searchbar',
            fields: [
              {emptyText: '关键字...', xtype: 'textfield', name: 'query', width: 140}
            ]
          },
          '->',
          {xtype: 'refreshbutton'}
        ]
        }
      ],
      columns: [
        {xtype: 'rownumberer', width: 34},
        {text: 'ID', dataIndex: 'id', width: 80, hidden: true},
        {
          text: '姓名',
          xtype: 'templatecolumn',
          dataIndex: 'namecn',
          minWidth: 180,
          flex: 1,
          tpl: '{namecn} <s>{name}</s> <r>{post_name}</r>',
          summaryType: 'count'
        },
        {text: '工号', dataIndex: 'login', width: 100, renderer: 'returnLogin'},
        {text: '任职部门', xtype: 'templatecolumn', dataIndex: 'departmentid', width: 100, tpl: '{department_name}'},
        {
          text: '现属团队',
          xtype: 'templatecolumn',
          dataIndex: 'teamid',
          width: 160,
          tpl: '{team_name}<r>{manager_namecn}</r>'
        },
        {text: '入职日期', dataIndex: 'startdate', width: 100}
      ],
      viewConfig: {enableTextSelection: false},
      features: [{ftype: 'grouping'}, {ftype: 'summary', dock: 'bottom'}],
      listeners: {
        itemdblclick: 'onChangePositiveClick'
      }
    },
    {
      xtype: 'grid', region: 'center', title: '转正记录',
      reference: 'gridChange',
      store: {
        type: 'hrStaff',
        autoLoad: true,
        groupField: 'positivedate',
        groupDir: 'DESC',
        proxy: {
          extraParams: {positive: 1, invalid: 0}
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar', items: [
          {
            xtype: 'searchbar',
            fields: [
              {emptyText: '生效月份...', xtype: 'monthfield', name: 'month'},
              {emptyText: '员工...', xtype: 'comboCompanyStaff', name: 'staffid'},
              {emptyText: '关键字...', xtype: 'textfield', name: 'query', width: 140}
            ]
          },
          '->',
          {xtype: 'refreshbutton'}
        ]
        },
        {dock: 'bottom', xtype: 'pagingbar'}
      ],
      columns: [
        {xtype: 'rownumberer'},
        {text: 'ID', dataIndex: 'id', width: 80, hidden: true},
        {
          text: '姓名',
          xtype: 'templatecolumn',
          dataIndex: 'namecn',
          minWidth: 180,
          flex: 1,
          tpl: '{namecn} <s>{name}</s> <r>{post_name}</r>',
          summaryType: 'count'
        },
        {text: '工号', dataIndex: 'login', width: 100, renderer: 'returnLogin'},
        {text: '任职部门', xtype: 'templatecolumn', dataIndex: 'departmentid', width: 100, tpl: '{department_name}'},
        {text: '原属团队', xtype: 'templatecolumn', dataIndex: 'teamid', width: 160, tpl: '{team_name}<r>{post_name}</r>'},
        {text: '手机', dataIndex: 'mobile', width: 120},
        {text: '在职', dataIndex: 'work_day', width: 80, align: 'right', renderer: 'returnDays'},
        {text: '转正日期', dataIndex: 'positivedate', width: 100},
        {text: '操作时间', dataIndex: 'creattime', xtype: 'datecolumn', format: 'Y-m-d H:i A', width: 160},
        {text: '操作人', dataIndex: 'operator', width: 80}
      ],
      features: [{ftype: 'grouping'}]
    }
  ]
});
