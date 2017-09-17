Ext.define('APP.view.sd.staff.csr.apply',{
    extend:'Ext.grid.Panel',
    controller:'ia.account',
	store:{
		type:'account.apply',
		autoLoad:true,
		grouper:{groupFn:function(record){return Ext.Date.format(record.data.time,'Y-m')},property:'time',direction:'DESC'},
		proxy:{extraParams:{staff:1}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'fieldaudit',name:'audit'},
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'账户类型...',xtype:'comboAccountType'},
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
		{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnLogin',summaryType:'count'},
		{text:'账户信息',defaults:{sortable:true},columns:[
			{text:'账户性质',dataIndex:'property_name',width:90,hidden:true},
			{text:'杠杆',dataIndex:'leverage',width:70,align:'center',renderer:'returnLeverage'},
			{text:'代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount'},
			{text:'销售',dataIndex:'salesman_namecn',width:80,renderer:'returnSalesman'}
		]},
		{text:'申请人信息',defaults:{sortable:true},columns:[
			{text:'申请月份',dataIndex:'time',xtype:'datecolumn',format:'Y-m'},
			{text:'日期',dataIndex:'time',xtype:'datecolumn',format:'m-d H:i A',width:120},
			{text:'姓名',dataIndex:'namecn',width:80,renderer:'returnName'},
			{text:'手机',xtype:'templatecolumn',dataIndex:'mobile',tpl:'{mobile}<r><s>{same_mobile_count}</s></r>',width:120},
			{text:'Email',xtype:'templatecolumn',dataIndex:'email',tpl:'{email}<r><s>{same_email_count}</s></r>',width:200},
			{text:'证件',xtype:'templatecolumn',dataIndex:'identity_cardno',tpl:'{identity_country} {identity_cardno}<r><s>{same_identity_count}</s></r>',width:200},
			{text:'银行账户',xtype:'templatecolumn',dataIndex:'bank_cardno',tpl:'{bank_name} {bank_cardno}',width:240,hidden:true}
		]},						
		{text:'审核信息',defaults:{sortable:true},columns:[
			{text:'日期',dataIndex:'audit_time',xtype:'datecolumn'},
			{text:'时间',dataIndex:'audit_time',xtype:'datecolumn',format:'H:i A',width:80,hidden:true},
			{text:'状态',dataIndex:'audit',align:'center',width:80,renderer:'returnAuditStatus'},
			{text:'说明',dataIndex:'audit_explain',width:260,renderer:'returnMore'}
		]}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetail'
	}
});