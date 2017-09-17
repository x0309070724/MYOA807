Ext.define('APP.view.sys.pay.merchant.order', {
  extend: 'Ext.grid.Panel',
  controller: 'sys.pay',
  store: {
    type: 'sysPayMerchantOrder',
    autoLoad: true
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar', items: [
      {
        xtype: 'searchbar',
        fields: [
          {
            xtype: 'segmentedfield', segmented: {
            name: 'success', margin: '0 10 0 0',
            items: [
              {tooltip: '失败', iconCls: 'f-mt mt-no', value: 0},
              {tooltip: '成功', iconCls: 'f-mt mt-yes', value: 1},
              {tooltip: '全部', iconCls: 'f-mt mt-icon', value: '', pressed: true}
            ]
          }
          },
          {xtype: 'comboPayment', name: 'aisleid', emptyText: '支付通道...'},
          {xtype: 'startdatefield', name: 'startdate', emptyText: '交易日期从'},
          {xtype: 'enddatefield', name: 'enddate', emptyText: '交易日期至'},
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
    {
      text: '商户',
      dataIndex: 'merchantno',
      xtype: 'templatecolumn',
      minWidth: 120,
      tpl: '{merchantno}<r>{gender} {merchant_name}</r>',
      flex: 1
    },
    {
      text: '支付信息', defaults: {width: 80}, columns: [
      {text: '提交时间', dataIndex: 'submitdate', xtype: 'datecolumn', width: 150, format: 'Y-m-d H 时'},
      {text: '时间', dataIndex: 'submitdate', xtype: 'datecolumn', format: 'H:i:s'},
      {
        text: 'USD',
        dataIndex: 'amount_usd',
        width: 80,
        align: 'right',
        renderer: 'returnUsMoney',
        summaryType: 'sum',
        summaryRenderer: 'returnUsMoney'
      },
      {
        text: 'CNY',
        dataIndex: 'amount',
        width: 100,
        align: 'right',
        tdCls: 'mate-text-green',
        renderer: 'returnCnyMoney',
        summaryType: 'sum',
        summaryRenderer: 'returnCnyMoney'
      },
      {text: '支付通道', dataIndex: 'pay_name', width: 100},
      {text: '付款银行', dataIndex: 'bank', width: 100},
      {text: '付款人', dataIndex: 'username', width: 100},
      {text: '商户订单', dataIndex: 'billno', width: 150},
      {text: '来源', dataIndex: 'referer', width: 160, renderer: 'returnRefererDomain'}
    ]
    },
    {
      text: '成本与收益',
      defaults: {
        width: 70,
        align: 'right',
        renderer: 'returnCnyMoney',
        summaryType: 'sum',
        summaryRenderer: 'returnCnyMoney'
      },
      columns: [
        {text: '手续费', dataIndex: 'fee', tdCls: 'mate-text-blue'},
        {text: '成本', dataIndex: 'cost', tdCls: 'mate-text-red'},
        {text: '收益', dataIndex: 'profit', tdCls: 'mate-active mate-text-green'}
      ]
    },
    {
      text: '回调信息', columns: [
      {text: '结果', dataIndex: 'success', width: 50, align: 'center', renderer: 'returnPayOrderSiteServerback'},
      {text: '时间', xtype: 'templatecolumn', width: 160, tpl: '{serverback_count}次　{last_serverback_time}'}
    ]
    },
    {
      xtype: 'actioncolumn',
      text: '操作',
      align: 'center',
      width: 50,
      tooltip: '查询更新订单',
      iconCls: 'f-mt mt-action-link',
      handler: 'onDepositSyncClick'
    }
  ]
});


