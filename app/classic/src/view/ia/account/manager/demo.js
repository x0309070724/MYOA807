Ext.define('APP.view.ia.account.manager.demo',{
    extend:'Ext.grid.Panel',
    controller:'ia.account',
	store:{
		type:'cross',
		model:'APP.model.account.record',
		sorters:[{property:'login',direction:'DESC'}],
		grouper:{groupFn:function(record){return Ext.Date.format(record.data.time,'Y-m-d')},property:'time',direction:'DESC'},			
		autoLoad:true,
		remoteSort:true,
		proxy:{
			url:Boot.appUrl('/sd/account/getAccountDemo.do')
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'numberfield',name:'login',vtype:'login',width:120,emptyText:'账号...'},
					{emptyText:'申请日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'申请日期至',xtype:'enddatefield',name:'enddate'},
					{xtype:'textfield',name:'query',width:140,emptyText:'关键字...'}
				]
			},
			'->',
//			{iconCls:'f-mt mt-creat',text:'新账户',handler:'onAccountCreatDemoClick',postRoles:{action:'creat'}},
//			'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账号',dataIndex:'login',minWidth:140,flex:1,renderer:'returnLogin',summaryType:'count'},
		{text:'账户信息',defaults:{sortable:true,width:200},columns:[
			{text:'申请日期',dataIndex:'time',xtype:'datecolumn'},
			{text:'时间',dataIndex:'time',xtype:'datecolumn',format:'H:i A'},
			{text:'组',dataIndex:'group'},					
			{text:'杠杆',dataIndex:'leverage',align:'center',renderer:'returnLeverage'},
			{text:'模拟资金',dataIndex:'amount',align:'right',tdCls:'x-ui-text-green',renderer:'returnShowMoney'}		
		]},
		{text:'联络资料',defaults:{sortable:true,width:200},columns:[
			{text:'手机',dataIndex:'mobile'},
			{text:'Email',dataIndex:'email',width:280}
		]}
	],
	features:[{ftype:'grouping'}]
});
















