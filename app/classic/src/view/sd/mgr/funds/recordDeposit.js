Ext.define('APP.view.sd.mgr.funds.recordDeposit',{
    extend:'Ext.grid.Panel',
	store:{
		type:'funds.manager',
		autoLoad:true,
		proxy:{extraParams:{menu:'deposit'}}
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
			{text:'方式',dataIndex:'groupname',width:80},
			{text:'付款银行',dataIndex:'bank_name',width:100},
			{text:'USD',dataIndex:'amount_usd',width:100,align:'right',tdCls:'x-ui-active x-ui-text-green',renderer:'returnUsMoney',summaryType:'sum',summaryRenderer:'returnUsMoney'},
			{text:'CNY',dataIndex:'amount',width:100,align:'right',tdCls:'x-ui-text-blue',renderer:'returnCnyMoney',summaryType:'sum',summaryRenderer:'returnCnyMoney'},
			{text:'汇率',dataIndex:'rate',align:'right',width:80,renderer:Ext.util.Format.numberRenderer('0,0.0000')},
			{text:'支付编号',dataIndex:'orderno',width:150,renderer:'returnFundsOrder'},
			{text:'时效',align:'right',width:80,renderer:'returnFundsEfficiency',hidden:true},
			{text:'订单号',dataIndex:'order',width:100},
			{text:'同步',xtype:'actioncolumn',align:'center',width:60,handler:'onDepositSyncClick',
				getClass:function(v,m,record,rIndex,cIndex,store){
					return record.data.complete_time?'x-hidden':'f-mt mt-action-api';
				},
				getTip:function(v,m,record,rIndex,cIndex,store){
					return record.data.complete_time?'':'同步至MT4';
				}
			}
		]},
		{text:'余额变化',defaults:{width:100,align:'right',renderer:'returnShowMoney'},columns:[
			{text:'执行前',dataIndex:'before_balance',tdCls:'x-ui-text-grey'},
			{text:'执行后',dataIndex:'after_balance',tdCls:'x-ui-text-blue'},
			{text:'执行于',dataIndex:'complete_time',xtype:'datecolumn',format:'H:i A',width:80,renderer:false}
		]},
		{text:'备注',dataIndex:'explain',minWidth:100,renderer:'returnMore',flex:1}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowFundsDetail'
	}
});
















