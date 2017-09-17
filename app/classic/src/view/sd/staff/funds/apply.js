Ext.define('APP.view.sd.staff.funds.apply',{
    extend:'Ext.grid.Panel',
    controller:'ia.funds',
	store:{
		autoLoad:true,
		type:'funds.apply',
		proxy:{extraParams:{staff:1}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'fieldaudit',name:'audit'},
					{emptyText:'日期从',xtype:'startdatefield',name:'applyStartdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'applyEnddate'},
					{emptyText:'账号/代理...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
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
		{text:'申请信息',columns:[
			{text:'日期',dataIndex:'time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'time',xtype:'datecolumn',format:'H:i A',width:80},
			{text:'类型',dataIndex:'direction',width:80,renderer:'returnFundsType'},
			{text:'金额',dataIndex:'money',width:90,align:'right',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
			{text:'说明',dataIndex:'explain',width:240,renderer:'returnMore'}
		]},
		{text:'处理结果',columns:[
			{text:'状态',dataIndex:'audit',align:'center',width:60,renderer:'returnAuditStatus'},
			{text:'日期',dataIndex:'audit_time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'audit_time',xtype:'datecolumn',format:'H:i A',width:80},
			{text:'说明',dataIndex:'audit_explain',width:150,renderer:'returnFundsxplain'}
		]},
		{text:'余额变化',defaults:{width:100,align:'right',renderer:'returnShowMoney'},columns:[
			{text:'执行前',dataIndex:'before_balance',tdCls:'x-ui-text-grey'},
			{text:'执行后',dataIndex:'after_balance',tdCls:'x-ui-text-blue'},
			{text:'执行于',dataIndex:'complete_time',xtype:'datecolumn',format:'H:i A',width:80,renderer:false}
		]}
	],
	listeners:{ 
		itemdblclick:'onShowFundsDetail'
	},
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
});
















