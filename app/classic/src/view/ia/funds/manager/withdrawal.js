Ext.define('APP.view.ia.funds.manager.withdrawal',{
	extend:'Ext.grid.Panel',
    controller:'ia.funds',
	store:{
		type:'funds.manager',
		autoLoad:true,
		proxy:{extraParams:{menu:'withdrawal'}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					//{xtype:'comboGroupname',name:'groupid',code:'withdrawal',emptyText:'出金类型...'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{xtype:'startdatefield',name:'startdate',emptyText:'出金日期从'},
					{xtype:'enddatefield',name:'enddate',emptyText:'出金日期至'},
					{xtype:'textfield',name:'query',width:140,emptyText:'关键字...'}
				]
			},
			'->',
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onWithdrawalCreatClick',postRoles:{action:'creat'}},
			'-',
			//{iconCls:'f-mt mt-settings',text:'设置',mateWidget:'widgetGroup',mateParameters:{objname:'出金类型',code:'withdrawal'},handler:'onMateWidgetShow',postRoles:{action:'update'}},'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账户信息',columns:[
			{text:'交易账号',dataIndex:'login',width:160,renderer:'returnTradeLogin',summaryType:'count'},
			{text:'上级代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount'},
			{text:'销售',dataIndex:'salesman_namecn',width:100,renderer:'returnSalesman'}
		]},
		{text:'交易请信息',columns:[
			{text:'日期',dataIndex:'audit_time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'audit_time',xtype:'datecolumn',format:'H:i A',tdCls:'x-ui-active',width:80},
			{text:'币别',dataIndex:'bank_currency',width:60},
			{text:'出款银行',dataIndex:'bank_name',width:100,renderer:'returnBankCard'},
			{text:'USD',dataIndex:'amount_usd',width:100,align:'right',tdCls:'x-ui-active x-ui-text-red',renderer:'returnUsMoney',summaryType:'sum',summaryRenderer:'returnUsMoney'},
			{text:'CNY',dataIndex:'amount',width:100,align:'right',tdCls:'x-ui-text-blue',renderer:'returnCnyMoney',summaryType:'sum',summaryRenderer:'returnCnyMoney'},
			{text:'汇率',dataIndex:'rate',align:'right',width:80,renderer:Ext.util.Format.numberRenderer('0,0.0000')},
			{text:'时效',align:'right',width:80,renderer:'returnFundsEfficiency'},
			{text:'订单号',dataIndex:'order',width:100}
		]},
		{text:'余额变化',defaults:{width:100,align:'right',renderer:'returnShowMoney'},columns:[
			{text:'执行前',dataIndex:'before_balance',tdCls:'x-ui-text-grey'},
			{text:'执行后',dataIndex:'after_balance',tdCls:'x-ui-text-blue'},
			{text:'执行于',dataIndex:'complete_time',xtype:'datecolumn',format:'H:i A',width:80,renderer:false}
		]},
		{text:'备注',dataIndex:'explain',minWidth:160,renderer:'returnMore',flex:1}
//		,{xtype:'actioncolumn',text:'操作',align:'center',width:60,
//			items:[
//				{tooltip:'修改',iconCls:'f-mt mt-edit',handler:'onFundsUpdateClick'}
//			]
//		}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowFundsDetail'
	}
});
















