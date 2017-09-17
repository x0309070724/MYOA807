Ext.define('APP.view.sys.pay.aisle.bank', {
  extend: 'Ext.Container',
  controller: 'sys.pay',
  padding: 1,
  layout: {type: 'hbox', align: 'stretch'},
  items: [
    {
      xtype: 'grid', title: '上游银行', flex: .5,
      // where is the gridBase?
      reference: 'gridBase',
      store: {
        // the detail info of cross?
        type: 'cross',
        fields: [
          {name: 'type', type: 'int'},
          {name: 'code', type: 'string'},
          {name: 'namecn', type: 'string'},
          {name: 'name', type: 'string'},
          {name: 'icon', type: 'string'},
          {name: 'payment', type: 'string'}
        ],
        autoLoad: true,
        grouper: {property: 'payment', direction: 'DESC'},
        proxy: {
          url: Boot.appUrl('/sd/system/pay/getAisleBank.do'),
          extraParams: {type: 0}
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar',
          items: [
            {
              xtype: 'searchbar',
              fields: [
                {
                  xtype: 'segmentedfield', segmented: {
                  name: 'type', defaults: {minWidth: 60}, margin: '0 10 0 0',
                  items: [
                    {text: '银行卡', tooltip: '银行卡', value: 0, pressed: true},
                    {text: '信用卡', tooltip: '信用卡', value: 1}
                  ]
                }
                },
                {xtype: 'comboSysPayment', name: 'payment', emptyText: '支付通道...'},
                //{xtype:'comboBanktype',name:'type',width:100,emptyText:'银行卡类型...'},
                {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
              ]
            },
            '->',
            {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onPayBankCreatClick'}, '-',
            {xtype: 'refreshbutton'}
          ]
        },
        {dock: 'bottom', xtype: 'pagingbar'}
      ],
      multiSelect: false,
      columns: [
        {xtype: 'rownumberer'},
        {text: '通道标识', dataIndex: 'payment', width: 160},
        {text: '支付标识', dataIndex: 'code', minWidth: 80, flex: 1},
        {text: '银行名称', xtype: 'templatecolumn', dataIndex: 'namecn', width: 200, tpl: '{namecn}<r>{name}</r>'},
        {text: '图标样式', dataIndex: 'icon', width: 80, flex: 1},
        {text: '禁用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnYes'},
        {
          xtype: 'actioncolumn',
          text: '修改',
          align: 'center',
          width: 50,
          tooltip: '修改',
          iconCls: 'f-mt mt-action-update',
          handler: 'onPayBankUpdateClick'
        }
      ],
      features: [{ftype: 'grouping'}]
    },
    {
      xtype: 'grid', title: '系统银行', flex: .5, collapsible: true, margin: '0 0 0 1',
      reference: 'gridChange',
      store: {
        type: 'cross',
        autoLoad: true,
        sorters: [{property: 'id', direction: 'DESC'}],
        //grouper:{groupFn:function(record){return Ext.Date.format(record.data.submitdate,'Y-m-d')},property:'submitdate',direction:'DESC'},
        proxy: {
          url: Boot.appUrl('/sd/system/pay/getPayBank.do')
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar',
          items: [
            {
              xtype: 'searchbar',
              fields: [
                {xtype: 'comboBanktype', name: 'type', width: 100, emptyText: '银行卡类型...'},
                {xtype: 'textfield', name: 'query', width: 140, emptyText: '关键字...'}
              ]
            },
            '->',
            {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onOurBankCreatClick'}, '-',
            //{iconCls:'f-mt mt-action-remove',text:'删除',disabled:true,selection:true,handler:'onOurBankRemoveClick'},'-',
            {xtype: 'refreshbutton'}
          ]
        },
        {dock: 'bottom', xtype: 'pagingbar'}
      ],
      multiSelect: false,
      columns: [
        {xtype: 'rownumberer'},
        {text: '银行卡类型', dataIndex: 'type', width: 100, renderer: 'returnBankType'},
        //{text:'通道标识',dataIndex:'payment',width:160,flex:1},
        {text: '支付标识', dataIndex: 'code', width: 120, flex: 1},
        {text: '银行中文名称', dataIndex: 'namecn', width: 160, flex: 1},
        {text: '银行英文名称', dataIndex: 'name', width: 100, flex: 1},
        {text: '图标样式', dataIndex: 'icon', width: 80, flex: 1},
        {text: '启用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnAccountInvalid'},
        //{xtype:'actioncolumn',text:'复制',align:'center',width:50,tooltip:'复制',iconCls:'f-mt mt-action-copy',handler:'onBankCopyClick'},
        {
          xtype: 'actioncolumn',
          text: '修改',
          align: 'center',
          width: 50,
          tooltip: '修改',
          iconCls: 'f-mt mt-action-update',
          handler: 'onOurBankUpdateClick'
        }
      ],
      features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}]
    }
  ]
});
