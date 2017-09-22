﻿Ext.define('APP.view.ia.account.apply.audit',{
    extend:'Ext.grid.Panel',
    controller:'ia.account',
	store:{
		autoLoad:true,
		type:'account.apply',
		sorters:[{property:'time',direction:'DESC'},{property:'id',direction:'DESC'}],
		grouper:{},		
		groupField:'type',
		groupDir:'DESC',
		proxy:{
			extraParams:{audit:0}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'账户类型...',xtype:'comboAccountType'},
					//{emptyText:'申请日期从',xtype:'startdatefield',name:'startdate'},
					//{emptyText:'申请日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'账号/代理/姓名...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账户类型',dataIndex:'type'},
		{text:'申请资料',defaults:{sortable:true},columns:[
			{text:'日期',dataIndex:'time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'time',xtype:'datecolumn',format:'H:i A',width:80},
			{text:'姓名',dataIndex:'namecn',width:80,renderer:'returnName'},
			{text:'手机',xtype:'templatecolumn',dataIndex:'mobile',tpl:'{mobile}<r><s>{same_mobile_count}</s></r>',width:120},
			{text:'Email',xtype:'templatecolumn',dataIndex:'email',tpl:'{email}<r><s>{same_email_count}</s></r>',width:200},
			{text:'证件',xtype:'templatecolumn',dataIndex:'identity_cardno',tpl:'{identity_country} {identity_cardno}<r><s>{same_identity_count}</s></r>',width:200},
			{text:'银行账户',xtype:'templatecolumn',dataIndex:'bank_cardno',tpl:'{bank_name} {bank_cardno}',width:240},
			{text:'实名',dataIndex:'verify',width:60,align:'center',renderer:'returnYesNo'}
//			{text:'计划入金',dateIndex:'deposit',tdCls:'x-ui-text-green',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'}
		]},
		{text:'账户信息',defaults:{sortable:true},columns:[
			{text:'账户性质',dataIndex:'property_name',width:80,hidden:true},
			{text:'杠杆',dataIndex:'leverage',width:70,align:'center',renderer:'returnLeverage'},
			{text:'代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount'},
			{text:'销售',dataIndex:'salesman_namecn',width:120,renderer:'returnSalesman'}
		]},						
		{text:'备注',dataIndex:'explain',minWidth:100,flex:1},
		{xtype:'actioncolumn',text:'操作',align:'center',width:60,postRoles:{action:'update'},
			tooltip:'审核',iconCls:'f-mt mt-audit',handler:'onAccountAuditClick'
		}
	],
	features:[{ftype:'grouping'}],
	listeners:{ 
		itemdblclick:'onAccountAuditClick'
	}
});