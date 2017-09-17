Ext.define('APP.view.sd.sales.index', {
  extend: 'Ext.Panel',
  xtype: 'sdSalesIndex',
  controller: 'sd.sales',
  viewModel: true,
  layout: {type: 'hbox', align: 'stretch'},
  title: '销售战绩',
  bind: {title: '销售战绩 · {tipText}'},
  tools: [
    {type: 'gear', callback: 'onResultsChangeDate'},
    {type: 'refresh', callback: 'onResultsDataRefresh'}
  ],
  listeners: {
    afterrender: 'onResultsRender'
  },
  defaults: {userCls: 'x-ui-ranking-container', layout: {type: 'vbox', align: 'stretch'}, flex: 1},
//	dockedItems:[
//		{dock:'top',xtype:'toolbar',items:[
//			'->',
//			{xtype:'segmentedbutton',name:'audit',defaults:{minWidth:100},
//				items:[
//					{text:'本月',value:'',pressed:true},
//					{text:'上一月',value:1},
//					{text:'下一月',value:-1},
//				]
//			},
//			'->',
//			//{xtype:'refreshbutton'}
//		]}
//	],
  items: [
    {
      xtype: 'container', items: [
      {xtype: 'box', userCls: 'x-ui-ranking-title', height: 50, html: '个人战绩'},
      {
        xtype: 'dataview', reference: 'salesView', flex: 1, scrollable: 'y',
        store: {},
        padding: 1,
        itemCls: 'x-ui-listitem-ranking',
        itemTpl: [
          '<tpl>',
          '<div class="x-ui-no x-ui-no-{ranking}">',
          '<b>{ranking}</b>',
          '</div>',
          '<div class="x-ui-userface">',
          '<img src="{objects_icon:resizeWxImg("/0","/64")}" alt="" onerror="this.src=\'/resources/images/userface.png\'"/>',
          '</div>',
          '<div class="x-ui-name">',
          '<p>{namecn} {name}</p>',
          '<p>{team_name}{[this.postName(values)]}</p>',
          '</div>',
          '<div class="x-ui-value">',
          '<label>净入金</label>',
          '<b>{funds_net_deposit:money}</b>',
          '</div>',
          '</tpl>',
          {
            postName: function (record) {
              if (record.id == record.managerid && record.teamid.toString().substr(9, 3) == '000') {
                return '·经理'
              } else if (record.id == record.managerid) {
                return '·主管'
              }
            }
          }
        ]
      }
    ]
    },
    {
      xtype: 'container', items: [
      {xtype: 'box', userCls: 'x-ui-ranking-title', height: 50, html: '团队战绩'},
      {
        xtype: 'dataview', reference: 't1View', flex: 1, scrollable: 'y',
        store: {},
        padding: 1,
        itemCls: 'x-ui-listitem-ranking',
        itemTpl: [
          '<tpl>',
          '<div class="x-ui-no x-ui-no-{ranking}">',
          '<b>{ranking}</b>',
          '</div>',
          '<div class="x-ui-name">',
          '<p>{objects}</p>',
          '<p>{manager_namecn} <span>{manager_name}</span></p>',
          '</div>',
          '<div class="x-ui-value">',
          '<label>净入金</label>',
          '<b>{funds_net_deposit:money}</b>',
          '</div>',
          '</tpl>'
        ]
      }

    ]
    }
  ]
});
















