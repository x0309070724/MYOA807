Ext.define('APP.view.hr.file.document.index', {
  extend: 'Ext.Panel',
  controller: 'hr.file.document',
  layout: {type: 'border', align: 'stretch', padding: 3},
  defaults: {split: false, border: true},
  items: [
    {
      xtype: 'grid', region: 'center', title: '文件类型', flex: .3,
      reference: 'gridBase',
      id: 'file_type',
      store: {
        type: 'cross',
        autoLoad: true,
        fields: [
          {name: 'id', type: 'int'},
          {name: 'name', type: 'string'},
          {name: 'explain', type: 'string'},
          {name: 'createtime', type: 'date'}
        ],
        pageSize: false,
        sorters: [{property: 'id', direction: 'desc'}],
        proxy: {
          url: Boot.appUrl('/system/file/getFileGroup.do')
        }
      },
      multiSelect: false,
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar', items: [
          '->',
          {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onFileTitleCreatClick'},
          {iconCls: 'f-mt mt-remove', text: '删除', disabled: true, selection: true, handler: 'onFileTitleRemoveClick'},
          '-',
          {xtype: 'refreshbutton'}
        ]
        }
      ],
      columns: [
        {xtype: 'rownumberer'},
        {text: 'ID', dataIndex: 'id', width: 80, flex: 1, hidden: true},
        {text: '日期', dataIndex: 'createtime', width: 100, xtype: 'datecolumn', format: 'Y-m-d', summaryType: 'count'},
        {text: '主题', dataIndex: 'title', minWidth: 100, flex: 1},
        {text: '描述', flex: 1, dataIndex: 'explain', width: 140, renderer: 'returnMore', hidden: true},
        {
          xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
          items: [
            {tooltip: '编辑', iconCls: 'f-mt mt-action-update', handler: 'onFileTitleUpdateClick'}
          ]
        }
        // {xtype:'actioncolumn',text:'操作',align:'center',width:60,
        // 	items:[
        // 		{tooltip:'进入投票页面',iconCls:'f-mt mt-action-link',handler:'onVotingPageClick',role:'other'}
        // 	]
        // }
      ],
      features: [{ftype: 'grouping'}, {ftype: 'summary', dock: 'bottom'}],
      listeners: {
        selectionchange: 'onChangeFileLoadClick',
        rowclick: 'onMateGridShowActionButton'
      }
    },
    {
      xtype: 'grid', region: 'east', title: '文件列表', flex: .7, collapsible: true, margin: '0 0 0 3',
      reference: 'gridChange',
      store: {
        type: 'cross',
        fields: [
          {name: 'id', type: 'int'},
          {name: 'groupid', type: 'int'},
          {name: 'title', type: 'string'},
          {name: 'content', type: 'string'},
          {name: 'url', type: 'string'},
          {name: 'creatTime', type: 'date'},
          {name: 'updateTime', type: 'date'},
          {name: 'operatorid', type: 'int'},
          {name: 'departmentid', type: 'int'},
          {name: 'Improtant', type: 'int'},
          {name: 'Invalid', type: 'int'}
        ],
        sorters: [{property: 'id', direction: 'DESC'}],
        proxy: {
          url: Boot.appUrl('/system/file/getFile.do')
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar', items: [
          '->',
          {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onFileCreatClick'},
          {iconCls: 'f-mt mt-remove', text: '删除', disabled: true, selection: true, handler: 'onFileRemoveClick'},
          '-',
          {xtype: 'refreshbutton'}
        ]
        }
      ],
      columns: [
        {xtype: 'rownumberer'},
        {text: '文件标题', dataIndex: 'title', minWidth: 120},
        {text: '上传时间', dataIndex: 'createtime', width: 180, xtype: 'datecolumn', format: 'Y-m-d H:i A'},
        {text: '内容', dataIndex: 'content', minWidth: 120, flex: 1},
        {text: '操作人', dataIndex: 'staff', align: 'center', width: 80},
        {text: '部门', dataIndex: 'staff', align: 'center', width: 80},
        {text: '类别', dataIndex: 'type', align: 'center', width: 80, hidden: true},
        {text: '重要级别', dataIndex: 'staff', align: 'center', width: 80},
        {text: '锁定', dataIndex: 'status', minWidth: 80, align: 'center', renderer: 'returnVoteStatus'},
        {
          xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
          items: [
            {tooltip: '编辑', iconCls: 'f-mt mt-action-update', handler: 'onFileUpdateClick'}
          ]
        }
        // {xtype:'actioncolumn',text:'启动/停止',align:'center',width:100,
        // 	items:[
        // 		{tooltip:'启动/停止',iconCls:'f-mt mt-close',handler:'onStartVotingClick',role:'other'}
        // 	]
        // },
        // {xtype:'actioncolumn',text:'操作',align:'center',width:60,/*tdCls:'x-ui-actioncolumn',postRole:true,*/
        //items:[
        //{tooltip:'启动',iconCls:'f-mt mt-close',handler:'onStartVotingClick',role:'update'},
        //{tooltip:'进入投票页面',iconCls:'f-mt mt-action-link',handler:'onVotingPageClick',role:'other'},
        //{tooltip:'修改',iconCls:'f-mt mt-action-update',handler:'onFileUpdateClick',role:'update'}
        //]
        // }
      ],
      features: [{ftype: 'summary', dock: 'bottom'}],
      listeners: {
        selectionchange: 'onMateGridShowActionButton'
      }
    }
  ]
});
