﻿Ext.define('APP.view.ia.account.manager.agent',{
    extend:'Ext.grid.Panel',
    controller:'ia.account',
	store:{
		type:'account.manager',
		autoLoad:true,
		proxy:{extraParams:{app:'agent'}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'特性...',xtype:'comboAccountFeature'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'组...',xtype:'comboAccountGroup',width:120},
					{emptyText:'账号/代理...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			//{iconCls:'f-mt mt-creat',text:'新账户',mateParameters:{typeid:1},handler:'onAccountCreatClick',bind:{disabled:'{!account.roles.creat}'}},
			//'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnLogin',summaryType:'count'},
		{text:'账户信息',defaults:{sortable:true,width:70},columns:[
			{text:'开户日期',dataIndex:'regdate',xtype:'datecolumn',format:'Y-m-d'},
			{text:'时间',dataIndex:'regdate',xtype:'datecolumn',format:'m-d H:i A',width:110},
			{text:'代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount',hidden:true},
			{text:'销售',dataIndex:'salesman_namecn',width:100,renderer:'returnSalesman'},
			{text:'组',dataIndex:'group',width:100},					
			{text:'杠杆',dataIndex:'leverage',width:70,align:'center',renderer:'returnLeverage'},
			{text:'状态',width:40,align:'center',renderer:'returnAccountState'}
		]},
		{text:'代理佣金',defaults:{sortable:true,align:'right',width:120,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'IBC',dataIndex:'agent_subordinate',align:'left',width:120,renderer:'returnAgentSubordinate',summaryRenderer:'returnA'},
			{text:'交易量',dataIndex:'agent_volume',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'内佣',dataIndex:'agent_commission_internal',tdCls:'x-ui-text-green'},
			{text:'外佣',dataIndex:'agent_commission_foreign',tdCls:'x-ui-text-red'},
			{text:'小计',dataIndex:'agent_commission',tdCls:'x-ui-text-green'},
			{text:'已出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'}
		]},
		{text:'账户资产',defaults:{sortable:true,width:120,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'信用',dataIndex:'credit',hidden:true},
			{text:'余额',dataIndex:'balance',tdCls:'x-ui-text-green'},
			{text:'已用',dataIndex:'margin',hidden:true},
			{text:'可用',dataIndex:'margin_free',tdCls:'x-ui-text-green',hidden:true},
			{text:'净值',dataIndex:'equity',tdCls:'x-ui-text-red'}
		]},
		{xtype:'actioncolumn',text:'操作',align:'center',width:60,tdCls:'x-ui-actioncolumn',
			items:[
				{tooltip:'重置密码',iconCls:'f-mt mt-password-safe',handler:'onAccountUpdatePasswordClick',roles:'update'},
				{tooltip:'用户系统',iconCls:'f-mt mt-action-link',handler:'onAccountSystemClick',roles:'other'},
				{tooltip:'修改',iconCls:'f-mt mt-action-update',handler:'onAccountUpdateClick',roles:'update'}
			],
			listeners:{render:'onShowRolesButton'}
		}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetail'
	}
});
















