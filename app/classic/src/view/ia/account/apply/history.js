Ext.define('APP.view.ia.account.apply.history',{
    extend:'Ext.grid.Panel',
    controller:'ia.account',
	store:{
		autoLoad:true,
		type:'account.apply'
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'fieldaudit',name:'audit'},
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'账户类型...',xtype:'comboAccountType'},
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
		{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnLogin'},
		{text:'账户信息',defaults:{sortable:true},columns:[
			{text:'账户性质',dataIndex:'property_name',width:90,hidden:true},
			{text:'杠杆',dataIndex:'leverage',width:70,align:'center',renderer:'returnLeverage'},
			{text:'代理',dataIndex:'agent',width:140,renderer:'returnAgentAccount'},
			{text:'销售',dataIndex:'salesman_namecn',width:80,renderer:'returnSalesman'}
		]},
		{text:'申请人信息',defaults:{sortable:true},columns:[
			{text:'日期',dataIndex:'time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'time',xtype:'datecolumn',format:'H:i A',width:80},
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
		]},
		{text:'操作',xtype:'actioncolumn',align:'center',width:60,handler:'onAccountUnAuditClick',postRoles:{action:'update'},
			getClass:function(v,m,record,rIndex,cIndex,store){
				return record.data.audit<0?'f-mt mt-action-reset':'x-hidden';
			},
			getTip:function(v,m,record,rIndex,cIndex,store){
				return record.data.audit<0?'变更为 待审核 状态':'';
			}
		}
	],
	features:[{ftype:'grouping'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetail'
	}
});