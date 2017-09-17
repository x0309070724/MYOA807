Ext.define('APP.view.ia.funds.apply.deposit',{
    extend:'Ext.grid.Panel',
    controller:'ia.funds',
	store:{
		autoLoad:true,
		type:'funds.apply',
		proxy:{extraParams:{menu:'deposit',audit:0}}
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
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onDepositCreatClick',postRoles:{action:'creat'}},
			{iconCls:'f-mt mt-settings',text:'设置',mateWidget:'widgetGroup',mateParameters:{objname:'入金类型',code:'deposit'},handler:'onMateWidgetShow',postRoles:{action:'update'}},
			'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'交易账号',dataIndex:'login',minWidth:160,renderer:'returnTradeLogin',flex:1,summaryType:'count'},
		{text:'账户信息',columns:[
			{text:'上级代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount'},
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
			{text:'方式',dataIndex:'groupname',width:80},
			{text:'付款银行',dataIndex:'bank_name',width:100},
			{text:'USD',dataIndex:'amount_usd',width:80,align:'right',tdCls:'x-ui-active x-ui-text-green',renderer:'returnUsMoney',summaryType:'sum',summaryRenderer:'returnUsMoney'},
			{text:'CNY',dataIndex:'amount',width:80,align:'right',tdCls:'x-ui-text-blue',renderer:'returnCnyMoney',summaryType:'sum',summaryRenderer:'returnCnyMoney'},
			{text:'订单号',dataIndex:'order',width:160,renderer:'returnFundsOrder',hidden:true}
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
			{text:'汇率',dataIndex:'rate',align:'right',width:80,renderer:Ext.util.Format.numberRenderer('0,0.0000')},
			{text:'状态',dataIndex:'audit',align:'center',width:60,renderer:'returnAuditStatus'},
			{text:'说明',dataIndex:'audit_explain',width:130,renderer:'returnMore'}
		]},
		{text:'备注',dataIndex:'explain',minWidth:160,renderer:'returnMore',hidden:true,flex:1},
		{xtype:'actioncolumn',text:'操作',align:'center',width:60,postRole:true,
			items:[
				{tooltip:'审核',iconCls:'f-mt mt-audit',handler:'onDepositAuditClick',role:'update'}
			]
		}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetails'
	}
});
















