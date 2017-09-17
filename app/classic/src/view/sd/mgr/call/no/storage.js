Ext.define('APP.view.sd.mgr.call.no.storage', {
  extend: 'Ext.grid.Panel',
  controller: 'sd.call',
  store: {
    type: 'call.storage',
    autoLoad: true,
    grouper: {
      groupFn: function (record) {
        return Ext.Date.format(record.data.opendate, 'Y-m-d')
      }, property: 'opendate', direction: 'ASC'
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
      {iconCls: 'f-mt mt-creat', text: '入库', handler: 'onCallNoCreatClick'},
      //{iconCls:'f-mt mt-delete',text:'删除',disabled:true,selection:true,handler:'onCallNoRemoveClick'},'-',
      {xtype: 'refreshbutton'}
    ]
    }
    //{dock:'bottom',xtype:'pagingbar'}
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '号码', dataIndex: 'no', minWidth: 100, flex: 1, summaryType: 'count'},
    {
      text: '号码属性', defaults: {sortable: true, width: 100}, columns: [
      {text: '开户日期', xtype: 'datecolumn', dataIndex: 'opendate', format: 'Y-m-d', width: 80},
      {text: '密码', dataIndex: 'password', width: 80, hidden: true},
      {text: '品牌', xtype: 'templatecolumn', tpl: '{brand_name} {brand}', width: 130},
      {text: '套餐', xtype: 'templatecolumn', tpl: '{package} <r>{status}<r>', width: 280}
    ]
    },
    {
      text: '语音包 本月',
      defaults: {
        sortable: true,
        width: 90,
        align: 'right',
        renderer: 'returnInt',
        summaryType: 'sum',
        summaryRenderer: 'returnInt'
      },
      columns: [
        {text: '总量', dataIndex: 'voice_addupupper'},
        {text: '已用', dataIndex: 'voice_used', tdCls: 'x-ui-text-green'},
        {text: '剩余', dataIndex: 'voice_canuse', tdCls: 'x-ui-text-red'},
        {text: '超出', dataIndex: 'voice_exceed', tdCls: 'x-ui-text-red', hidden: true}
      ]
    },
    {
      text: '短信包 本月',
      defaults: {
        sortable: true,
        width: 90,
        align: 'right',
        renderer: 'returnT',
        summaryType: 'sum',
        summaryRenderer: 'returnT'
      },
      columns: [
        {text: '总量', dataIndex: 'sms_addupupper'},
        {text: '已用', dataIndex: 'sms_used', tdCls: 'x-ui-text-green'},
        {text: '剩余', dataIndex: 'sms_canuse', tdCls: 'x-ui-text-red'},
        {text: '超出', dataIndex: 'sms_exceed', tdCls: 'x-ui-text-red'}
      ]
    },
    {
      text: '流量包',
      hidden: true,
      defaults: {
        sortable: true,
        width: 90,
        align: 'right',
        renderer: 'returnM',
        summaryType: 'sum',
        summaryRenderer: 'returnM'
      },
      columns: [
        {text: '总量', dataIndex: 'flow_addupupper'},
        {text: '已用', dataIndex: 'flow_used', tdCls: 'x-ui-text-green'},
        {text: '剩余', dataIndex: 'flow_canuse', tdCls: 'x-ui-text-red'},
        {text: '超出', dataIndex: 'flow_exceed', tdCls: 'x-ui-text-red'}
      ]
    },
    {
      text: '实时余额',
      defaults: {
        sortable: true,
        width: 100,
        align: 'right',
        renderer: 'returnCnyMoney',
        summaryType: 'sum',
        summaryRenderer: 'returnCnyMoney'
      },
      columns: [
        {text: '账户余额', dataIndex: 'balance', tdCls: 'x-ui-text-green'},
        {text: '信用额度', dataIndex: 'credit', tdCls: 'x-ui-text-blue'},
        {text: '可用额度', dataIndex: 'margin_free', tdCls: 'x-ui-text-red'}
      ]
    },
    {
      text: '修改',
      xtype: 'actioncolumn',
      align: 'center',
      width: 60,
      iconCls: 'f-mt mt-edit',
      handler: 'onCallNoUpdateClick'
    }
  ],
  features: [{ftype: 'groupingsummary', dock: 'bottom'}, {ftype: 'summary', dock: 'bottom'}]
});














