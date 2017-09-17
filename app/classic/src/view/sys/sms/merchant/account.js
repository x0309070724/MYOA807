Ext.define('APP.view.sys.sms.merchant.account', {
  extend: 'Ext.grid.Panel',
  xtype: 'sysSmsMerchantAccount',
  controller: 'sys.sms',
  store: {
    type: 'sysSmsMerchantAccount',
    autoLoad: true
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar', items: [
      {
        xtype: 'searchbar',
        fields: [
          //{xtype:'comboPayment',name:'aisleid',emptyText:'客户...'},
          {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
        ]
      },
      '->',
      {iconCls: 'f-mt mt-creat', text: '添加', handler: 'smsMerchantAccountCreatClick'},
      {
        iconCls: 'f-mt mt-remove',
        text: '删除',
        disabled: true,
        selection: true,
        handler: 'smsMerchantAccountRemoveClick'
      },
      '-',
      {xtype: 'refreshbutton'}
    ]
    },
    {dock: 'bottom', xtype: 'pagingbar'}
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '商户', dataIndex: 'namecn', minWidth: 220, flex: 1},
    {
      text: '商户信息', defaults: {width: 300}, columns: [
      {text: '开通日期', dataIndex: 'createtime', width: 180, xtype: 'datecolumn'},
      {text: '开通月份', dataIndex: 'createtime', width: 180, xtype: 'datecolumn', format: 'Y-m'},
      {text: '商户号', dataIndex: 'merchantno', width: 280},
      {text: '商户KEY', dataIndex: 'merchantkey', width: 300}
    ]
    },
    {text: '启用', dataIndex: 'invalid', align: 'center', width: 120, renderer: 'returnAccountInvalid'},
    {
      xtype: 'actioncolumn',
      text: '操作',
      align: 'center',
      width: 100,
      tooltip: '修改',
      iconCls: 'f-mt mt-action-update',
      handler: 'smsMerchantAccountUpdateClick'
    }
  ],
  features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});
















