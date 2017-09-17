Ext.define('APP.view.sys.pay.merchant.account', {
  extend: 'Ext.grid.Panel',
  controller: 'sys.pay',
  store: {
    type: 'sysPayMerchantAccount',
    autoLoad: true
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar', items: [
      {
        xtype: 'searchbar',
        fields: [
          {xtype: 'startdatefield', name: 'startdate', emptyText: '生效日期'},
          {xtype: 'enddatefield', name: 'enddate', emptyText: '交易日期至', hidden: true},
          {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
        ]
      },
      '->',
      {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onAccountCreatClick'}, '-',
      {iconCls: 'f-mt mt-remove', text: '删除', disabled: true, selection: true, handler: 'onAccountRemoveClick'}, '-',
      {xtype: 'refreshbutton'}
    ]
    },
    {dock: 'bottom', xtype: 'pagingbar'}
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '商户名称', dataIndex: 'name', width: 180},
    {text: '商户', dataIndex: 'merchantno', width: 180},
    {text: '商户key', dataIndex: 'merchantkey', width: 250},
    {text: '生效日期', dataIndex: 'creattime', width: 180, xtype: 'datecolumn'},
    {text: '启用', dataIndex: 'invalid', align: 'center', width: 100, renderer: 'returnAccountInvalid'},
    {text: '备注', dataIndex: 'explain', minWidth: 140, flex: 1},
    {
      xtype: 'actioncolumn',
      text: '操作',
      align: 'center',
      width: 50,
      tooltip: '更新商户',
      iconCls: 'f-mt mt-action-update',
      handler: 'onAccountUpdateClick'
    }
  ],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});
















