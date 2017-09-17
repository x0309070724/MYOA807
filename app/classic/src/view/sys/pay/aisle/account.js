Ext.define('APP.view.sys.pay.aisle.account', {
  extend: 'Ext.Container',
  controller: 'sys.pay',
  padding: 1,
  layout: {type: 'hbox', align: 'stretch'},
  items: [
    {
      xtype: 'grid', title: '银行', flex: .5,
      store: {
        type: 'cross',
        sorters: [{property: 'id', direction: 'DESC'}],
        //grouper:{groupFn:function(record){return Ext.Date.format(record.data.submitdate,'Y-m-d')},property:'submitdate',direction:'DESC'},
        autoLoad: true,
        proxy: {
          url: Boot.appUrl('/sd/system/pay/getPayAisle.do'),
          extraParams: {}
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar',
          items: [
            '->',
            {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onPayCreatClick'}, '-',
            {
              iconCls: 'f-mt mt-action-remove',
              text: '删除',
              disabled: true,
              selection: true,
              handler: 'onPayRemoveClick'
            }, '-',
            {xtype: 'refreshbutton'}
          ]
        },
        {dock: 'bottom', xtype: 'pagingbar'}
      ],
      columns: [
        {xtype: 'rownumberer'},
        {text: '名称', dataIndex: 'name', width: 140},
        {text: '标识', dataIndex: 'payment', width: 140},
        {text: '商户号', dataIndex: 'merchantno', width: 160},
        {text: '商户KEY', dataIndex: 'merchantkey', width: 220, hidden: true},
        {text: '费率', dataIndex: 'cost_rate', xtype: 'templatecolumn', tpl: '{cost_rate} ‰', width: 60, align: 'right'},
        {text: '最大入金', dataIndex: 'max_amount', width: 140, renderer: 'returnCnyMoney'},
        {text: '绑定域名', dataIndex: 'domain', width: 180},
        {text: '备注', dataIndex: 'explain', minWidth: 120, flex: 1, renderer: 'returnMore'},
        {text: '启用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnAccountInvalid'},
        {
          xtype: 'actioncolumn',
          text: '修改',
          align: 'center',
          width: 80,
          tooltip: '修改',
          iconCls: 'f-mt mt-action-update',
          handler: 'onPayUpdateClick'
        }
        //{text:'接口',dataIndex:'counts',width:60,align:'right',renderer:'returnA'}
      ],
      features: [{ftype: 'summary', dock: 'bottom'}],
      listeners: {
        selectionchange: 'onMateGridShowActionButton'
      }
    },
    {
      xtype: 'grid', title: 'APP', flex: .5, margin: '0 0 0 1',
      store: {
        type: 'cross',
        fields: [
          {name: 'creattime', type: 'date'},
          {name: 'name', type: 'string'},
          {name: 'payment', type: 'string'},
          {name: 'min_amount', type: 'string'},
          {name: 'max_amount', type: 'string'},
          {name: 'invalid', type: 'int'}
        ],
        autoLoad: true,
        grouper: {property: 'aisle_name', direction: 'DESC'},
        proxy: {
          url: Boot.appUrl('/sd/system/pay/getApp.do')
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar',
          items: [
            {
              xtype: 'searchbar',
              fields: [
                {xtype: 'comboPayment', name: 'payaisleid', emptyText: '支付通道...'},
                //{xtype:'comboBanktype',name:'type',width:100,emptyText:'银行卡类型...'},
                {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
              ]
            },
            '->',
            {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onAppPayCreatClick'}, '-',
            {xtype: 'refreshbutton'}
          ]
        },
        {dock: 'bottom', xtype: 'pagingbar'}
      ],
      columns: [
        {xtype: 'rownumberer'},
        {text: '名称', dataIndex: 'name', xtype: 'templatecolumn', minWidth: 160, tpl: '{name}<r>{payment}</r>', flex: 1},
        {
          text: '通道信息', defaults: {width: 220}, columns: [
          {text: '通道名称', dataIndex: 'aisle_name'},
          {text: '商户号', dataIndex: 'merchantno'},
          {text: '通道标识', dataIndex: 'aisle_payment'}
        ]
        },
        {
          text: '支付信息', defaults: {width: 220}, columns: [
          {text: '单笔最小', dataIndex: 'min_amount', renderer: 'returnCnyMoney'},
          {text: '单笔最大', dataIndex: 'max_amount', renderer: 'returnCnyMoney'}
        ]
        },
        {text: '创建时间', dataIndex: 'creattime', xtype: 'datecolumn', width: 160, format: 'Y-m-d'},
        {text: '启用', dataIndex: 'app_invalid', align: 'center', width: 60, renderer: 'returnAccountInvalid'},
        {
          xtype: 'actioncolumn',
          text: '修改',
          align: 'center',
          width: 50,
          tooltip: '修改',
          iconCls: 'f-mt mt-action-update',
          handler: 'onAppPayUpdateClick'
        }
      ],
      features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}]
    }
  ]
});
















