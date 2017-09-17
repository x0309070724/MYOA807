Ext.define('APP.view.sys.sms.merchant.record', {
  extend: 'Ext.grid.Panel',
  xtype: 'sysSmsMerchantRecord',
  controller: 'sys.sms',
  store: {
    type: 'sysSmsMerchantRecord',
    autoLoad: true
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar', items: [
      {
        xtype: 'searchbar',
        fields: [
          //{xtype:'comboPayment',name:'aisleid',emptyText:'客户...'},
          {xtype: 'startdatefield', name: 'startdate', emptyText: '日期从'},
          {xtype: 'enddatefield', name: 'enddate', emptyText: '日期至'},
          {xtype: 'textfield', name: 'merchantno', width: 140, emptyText: '商户号'},
          {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
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
    {text: '发送人', dataIndex: 'senduser', minWidth: 160, flex: 1},
    //{text:'客户信息',minWidth:160,flex:1,renderer:'returnCustomer'},
    {
      text: '商户信息', defaults: {width: 80}, columns: [
      //{text:'商户',dataIndex:'merchant',width:180},
      {text: '商户号', dataIndex: 'merchantno', width: 80}
    ]
    },
    {
      text: '信息属性', columns: [
      {text: '发送时间', dataIndex: 'sendtime', width: 140, xtype: 'datecolumn', format: 'Y-m-d H 时'},
      {text: '时间', dataIndex: 'sendtime', xtype: 'datecolumn', format: 'H:i:s', width: 80},
      {text: '接收号码', dataIndex: 'send_mobile', width: 100},
      {text: '短信内容', dataIndex: 'content', width: 500, renderer: 'returnMore'},
      {text: '通道', dataIndex: 'channel', width: 70, renderer: 'returnChannel'},
      {text: '发送结果', dataIndex: 'success', width: 70, align: 'center', renderer: 'returnYesNo'},
      {text: '说明', dataIndex: 'successmsg', width: 200, renderer: 'returnSuccessMsg'},
      {text: '字符数', xtype: 'templatecolumn', dataIndex: 'charnum', width: 80, align: 'right', tpl: '{charnum} 字'},
      {
        text: '数量',
        dataIndex: 'counts',
        tdCls: 'mate-active',
        align: 'right',
        renderer: 'returnSmsCounts',
        summaryType: 'sum',
        summaryRenderer: 'returnSmsCounts'
      },
      {text: '发送人', dataIndex: 'senduser', width: 60, hidden: true}
    ]
    }
  ],
  features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}]
});
















