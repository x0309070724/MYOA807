Ext.define('APP.view.sd.mgr.funds.recordCredit',{
	extend:'Ext.grid.Panel',
	store:{
		type:'funds.manager',
		autoLoad:true,
		proxy:{extraParams:{menu:'credit'}}
	},
	columns:[
		{xtype:'rownumberer'},
		{text:'账户信息',columns:[
			{text:'交易账号',dataIndex:'login',width:160,renderer:'returnTradeLogin',summaryType:'count'},
			{text:'上级代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount'},
			{text:'销售',dataIndex:'salesman_namecn',width:100,renderer:'returnSalesman'}
		]},
		{text:'交易信息',columns:[
			{text:'日期',dataIndex:'audit_time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'audit_time',xtype:'datecolumn',format:'H:i A',tdCls:'x-ui-active',width:80},
			{text:'类型',dataIndex:'direction',width:100,renderer:'returnFundsType'},
			{text:'到期时间',dataIndex:'expiration',xtype:'datecolumn',width:100},
			{text:'金额',dataIndex:'amount_usd',width:100,align:'right',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
			{text:'时效',align:'right',width:80,renderer:'returnFundsEfficiency'},
			{text:'订单号',dataIndex:'order',width:100}
		]},
		{text:'余额变化',defaults:{width:100,align:'right',renderer:'returnShowMoney'},columns:[
			{text:'执行前',dataIndex:'before_balance',tdCls:'x-ui-text-grey'},
			{text:'执行后',dataIndex:'after_balance',tdCls:'x-ui-text-blue'},
			{text:'执行于',dataIndex:'complete_time',xtype:'datecolumn',format:'H:i A',width:80,renderer:false}
		]},
		{text:'备注',dataIndex:'explain',minWidth:160,renderer:'returnMore',flex:1}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowFundsDetail'
	}
});
















