Ext.define('APP.view.ia.funds.apply.withdrawal',{
    extend:'Ext.grid.Panel',
    controller:'ia.funds',
	store:{
		autoLoad:true,
		type:'funds.apply',
		proxy:{extraParams:{menu:'withdrawal',audit:0}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'日期从',xtype:'startdatefield',name:'applyStartdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'applyEnddate'},
					{emptyText:'账号/代理...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onWithdrawalCreatClick',postRoles:{action:'creat'}},
			'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'交易账号',dataIndex:'login',minWidth:160,renderer:'returnTradeLogin',flex:1,summaryType:'count'},
		{text:'账户信息',columns:[
			{text:'上级代理',dataIndex:'agent',width:120,renderer:'returnAgentAccount'},
			{text:'销售',dataIndex:'salesman_namecn',width:100,renderer:'returnSalesman'}
		]},
		{text:'交易情况',defaults:{sortable:true,width:80,align:'right',summaryType:'sum'},columns:[
			{text:'交易量',dataIndex:'trade_volume',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'交易盈亏',dataIndex:'trade_profit',renderer:'returnShowMoney',summaryRenderer:'returnShowMoney'},
			{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryRenderer:'returnColorMoney'}
		]},
		{text:'申请信息',columns:[
			{text:'月份',dataIndex:'time',width:80},
			{text:'时间',dataIndex:'time',xtype:'datecolumn',format:'m-d H:i A',width:100},
			{text:'币别',dataIndex:'bank_currency',width:60},
			{text:'出款银行',dataIndex:'bank_name',width:100,renderer:'returnBankCard'},
			{text:'USD',dataIndex:'amount_usd',width:90,align:'right',tdCls:'x-ui-active x-ui-text-red',renderer:'returnUsMoney',summaryType:'sum',summaryRenderer:'returnUsMoney'},
			{text:'CNY',dataIndex:'amount',width:90,align:'right',tdCls:'x-ui-text-blue',renderer:'returnCnyMoney',summaryType:'sum',summaryRenderer:'returnCnyMoney'}
		]},
		{text:'账户资产',defaults:{sortable:true,width:80,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'持仓中',dataIndex:'account_margin',renderer:'returnYesNo',width:60,align:'center',summaryType:false,summaryRenderer:false},
			{text:'余额',dataIndex:'account_balance'},
			{text:'信用',dataIndex:'account_credit',hidden:true},
			{text:'净值',dataIndex:'account_equity'},
			{text:'已用',dataIndex:'account_margin',hidden:true},
			{text:'可用',dataIndex:'account_margin_free',tdCls:'x-ui-text-green'}
		]},
		{text:'审核详情',columns:[
			{text:'汇率',dataIndex:'rate',align:'right',width:60,renderer:Ext.util.Format.numberRenderer('0,0.0000')},
			{text:'状态',dataIndex:'audit',align:'center',width:60,renderer:'returnAuditStatus'},
			{text:'提示',dataIndex:'audit_explain',width:150,renderer:'returnFundsxplain'}
		]},
		{xtype:'actioncolumn',text:'操作',align:'center',width:60,postRole:true,
			items:[
				{tooltip:'审核',iconCls:'f-mt mt-audit',handler:'onWithdrawalAuditClick',role:'update'}
			]
		}
	],
	listeners:{ 
		itemdblclick:'onShowAccountDetails'
	},
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
});
















