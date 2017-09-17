Ext.define('APP.view.sd.mgr.csr.recordIb',{
    extend:'Ext.grid.Panel',
	store:{
		type:'account.manager',
		autoLoad:true,
		grouper:{groupFn:function(record){return Ext.Date.format(record.data.regdate,'Y-m-d')},property:'regdate',direction:'DESC'},
		proxy:{extraParams:{type:'ib'}}
	},
//	dockedItems:[
//		{dock:'top',xtype:'toolbar',items:[
//			{xtype:'searchbar',
//				fields:[
//					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
//					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
//					{emptyText:'最后开户',xtype:'monthfield',name:'agentLastate'},
//					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
//					{emptyText:'账号/代理...',xtype:'textfield',name:'query',width:140}
//				]
//			},
//			'->',
//			{xtype:'refreshbutton'}
//		]},
//		{dock:'bottom',xtype:'pagingbar'}
//	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnLogin',summaryType:'count'},
		{text:'账户信息',defaults:{sortable:true,width:80},columns:[
			{text:'开户日期',dataIndex:'regdate',xtype:'datecolumn',format:'Y-m-d'},
			{text:'时间',dataIndex:'regdate',xtype:'datecolumn',format:'H:i A',width:80},
			{text:'账户性质',dataIndex:'property_name',width:80,hidden:true},
			{text:'手机',dataIndex:'mobile',width:100},
			{text:'QQ',dataIndex:'qq',align:'center',width:60,renderer:'returnQQ'},
			{text:'销售',dataIndex:'salesman_namecn',width:100,renderer:'returnSalesman'},
			//{text:'杠杆',dataIndex:'leverage',width:80,align:'center',renderer:'returnLeverage'},
			{text:'IBC',dataIndex:'agent_subordinate',align:'left',width:120,renderer:'returnAgentSubordinate',summaryRenderer:'returnA'},
			{text:'状态',width:60,align:'center',renderer:'returnAccountState'}
		]},
		{text:'出入金',defaults:{sortable:true,width:100,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'入金',dataIndex:'agent_deposit',tdCls:'x-ui-text-green'},
			{text:'出金',dataIndex:'agent_withdrawal',tdCls:'x-ui-text-red'},
			{text:'净入金',dataIndex:'agent_net_deposit',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'代理佣金',defaults:{sortable:true,align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'交易量',dataIndex:'agent_volume',width:80,renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'内佣',dataIndex:'agent_commission_internal',tdCls:'x-ui-text-green'},
			{text:'外佣',dataIndex:'agent_commission_foreign',tdCls:'x-ui-text-red'},
			{text:'小计',dataIndex:'agent_commission',tdCls:'x-ui-text-green'},
			{text:'已出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'}
		]},
		{text:'账户资产',defaults:{sortable:true,width:100,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'信用',dataIndex:'credit',hidden:true},
			{text:'余额',dataIndex:'balance',tdCls:'x-ui-text-green'},
			{text:'已用',dataIndex:'margin',hidden:true},
			{text:'可用',dataIndex:'margin_free',tdCls:'x-ui-text-green',hidden:true},
			{text:'净值',dataIndex:'equity',tdCls:'x-ui-text-red'}
		]}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetail'
	}
});
















