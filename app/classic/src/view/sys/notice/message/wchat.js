Ext.define('APP.view.sys.notice.message.wchat', {
  extend: 'Ext.grid.Panel',
  controller: 'sys.notice.message',
  store: {
    autoLoad: true,
    type: 'sysNoticeRecord',
    proxy: {
      extraParams: {cmd: 3}
    }
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar',
      items: [
        {
          xtype: 'searchbar', fields: [
          {emptyText: '日期从', xtype: 'startdatefield', name: 'startdate'},
          {emptyText: '日期至', xtype: 'enddatefield', name: 'enddate'},
          {emptyText: '关键字...', xtype: 'textfield', name: 'query', width: 200}
        ]
        },
        '->',
        {
          iconCls: 'f-mt mt-wechat',
          text: '发送微信通知',
          mateWidget: 'wechatSend',
          handler: 'onMateWidgetShow',
          mateAnimate: true
        },
        {xtype: 'refreshbutton'}
      ]
    },
    {dock: 'bottom', xtype: 'pagingbar'}
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '发送时间', dataIndex: 'sendtime', xtype: 'datecolumn', format: 'Y-m-d H:00'},
    {
      text: '通知对象', defaults: {sortable: true}, columns: [
      {text: '时间', dataIndex: 'sendtime', xtype: 'datecolumn', format: 'H:i A', width: 80},
      {text: '性质', width: 80, renderer: 'returnNoticeObjType'},
      {text: '对象', width: 180, renderer: 'returnNoticeObjName'},
      {text: 'OPENID', dataIndex: 'sendno', width: 240}
    ]
    },
    {
      text: '通知属性', defaults: {sortable: true}, columns: [
      {text: '系统', xtype: 'templatecolumn', dataIndex: 'root_name', tpl: '{root_name} {sys_name}', width: 120},
      {text: '动作', xtype: 'templatecolumn', dataIndex: 'type_name', tpl: '{type_name}', width: 120},
      {text: '结果', dataIndex: 'success', width: 60, align: 'center', renderer: 'returnYesNo'},
      {text: '说明', dataIndex: 'callback', width: 180, renderer: 'returnNoticeCallback'}
    ]
    },
    {text: '通知内容', dataIndex: 'content', renderer: 'returnMore', flex: 1}
  ],
  features: [{ftype: 'grouping'}],
  listeners: {
    itemdblclick: 'onDetailClick'
  }
});
