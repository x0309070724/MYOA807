Ext.define('APP.view.ia.account.change.transferRecord',{
    extend:'Ext.grid.Panel',
	controller:'ia.account.change',
	//multiColumnSort:true,
	store:{
		type:'account.transfer',
		autoLoad:true
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid'},
					{emptyText:'账号...',xtype:'textfield',name:'login',width:140}
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
		{text:'交接日期',dataIndex:'effective_date',xtype:'datecolumn',summaryType:'count'},
		{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnTradeLogin'},
		{text:'账户信息',defaults:{sortable:true,width:100},columns:[
			{text:'开户日期',dataIndex:'account_regdate',xtype:'datecolumn'},
			{text:'代理',dataIndex:'agent',width:160,renderer:'returnAgentAccount'},
			{text:'组',dataIndex:'account_group',width:160},					
			{text:'杠杆',dataIndex:'account_leverage',align:'center',renderer:'returnLeverage'}
		]},
		{text:'交接内容',defaults:{sortable:true},columns:[
			{text:'对象',dataIndex:'type',width:100,renderer:'returnTransferType'},
			{text:'前销售',dataIndex:'before_salesmancn',width:180,xtype:'templatecolumn',tpl:'{before_namecn} <s>{before_name}</s><r>{before_team_name}</r>'},
			{text:'现销售',dataIndex:'after_salesmancn',width:180,tdCls:'x-ui-text-green',xtype:'templatecolumn',tpl:'{after_namecn} <s>{after_name}</s><r>{after_team_name}</r>'},
			{text:'操作时间',dataIndex:'time',width:160,xtype:'datecolumn',format:'Y-m-d H:i A',width:160},
			{text:'操作人',dataIndex:'operator',width:120}
		]}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onShowAccountDetails'
	}
});
