Ext.define('APP.view.rd.analysis.agent.report',{
    extend:'Ext.grid.Panel',
    controller:'rd',
	store:{
		type:'analysis.trade.statistics',
		autoLoad:true,
		sorters:[{property:'trade_commission_agent',direction:'DESC'}],
		super:true,
		proxy:{
			extraParams:{
				menu:'agent',
				datepart:'month',
				startdate:Ext.Date.format(new Date(),'Y-m'),
				enddate:Ext.Date.format(new Date(),'Y-m')
			}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'datepartfield',name:'datepart',value:'month',allowBlank:false}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'代理',xtype:'templatecolumn',dataIndex:'objects',minWidth:150,tpl:'{objects}<r>{objects_tip}</r>',flex:1,summaryType:'count'},
		{text:'账户',defaults:{align:'right',width:80,renderer:'returnInt',summaryType:'sum',renderer:'returnInt'},columns:[
			{text:'持有量',dataIndex:'account_count'},
			{text:'活跃量',dataIndex:'account_active_count'},
			{text:'开户量',dataIndex:'account_new_count',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'出入金',defaults:{align:'right',width:110,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green'},
			{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'},
			{text:'净入金',dataIndex:'funds_net_deposit',width:130,tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'代理佣金',defaults:{align:'right',width:110,summaryType:'sum',renderer:'returnShowMoney',summaryRenderer:'returnShowMoney'},columns:[
			{text:'交易量',dataIndex:'trade_volume',tdCls:'x-ui-text-bold',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'内佣',dataIndex:'trade_commission_internal',tdCls:'x-ui-text-green'},
			{text:'外佣',dataIndex:'trade_commission_foreign',tdCls:'x-ui-text-red'},
			{text:'小计',dataIndex:'trade_commission_agent',width:130,tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'交易盈亏',defaults:{align:'right',width:110,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'利息',dataIndex:'trade_storage'},
			{text:'税金',dataIndex:'trade_taxes',hidden:true},
			{text:'交易盈亏',dataIndex:'trade_profit'},
			{text:'净盈亏',dataIndex:'trade_clear',width:130,tdCls:'x-ui-active x-ui-text-blue'},
			{text:'均利/手',dataIndex:'trade_clear_average',tdCls:'x-ui-text-green'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
