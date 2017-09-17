Ext.define('APP.view.sys.sms.merchant.recharge',{
    extend:'Ext.grid.Panel',
	xtype:'sysSmsMerchantRecharge',
    controller:'sys.sms',
	store:{
		type:'sysSmsMerchantRecharge',
		autoLoad:true
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'comboPayment',name:'aisleid',emptyText:'客户...'},
					{xtype:'startdatefield',name:'startdate',emptyText:'充值日期从'},
					{xtype:'enddatefield',name:'enddate',emptyText:'充值日期至'},
					{xtype:'textfield',name:'query',width:140,emptyText:'关键字...'}
				]
			},
			'->',
			{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onAccountRemoveClick'},
			'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'客户信息',minWidth:160,flex:1,renderer:'returnCustomer'},
		{text:'商户信息',columns:[
			{text:'商户',dataIndex:'merchant',width:240},
			{text:'商户号',dataIndex:'merchantno',width:100},
			{text:'充值',dataIndex:'recharge_counts',tdCls:'mate-active mate-text-blue',align:'right',renderer:'returnSmsCounts',summaryType:'sum',summaryRenderer:'returnSmsCounts'},
			{text:'消费',dataIndex:'consumption_counts',tdCls:'mate-text-green',align:'right',renderer:'returnSmsCounts',summaryType:'sum',summaryRenderer:'returnSmsCounts'},
			{text:'剩余',dataIndex:'surplus_counts',tdCls:'mate-text-red',align:'right',renderer:'returnSmsCounts',summaryType:'sum',summaryRenderer:'returnSmsCounts'}
		]},
		{text:'本次充值信息',columns:[
			{text:'充值月份',dataIndex:'rechargedate',xtype:'datecolumn',format:'Y-m'},
			{text:'日期',dataIndex:'rechargedate',xtype:'datecolumn',format:'Y-m-m',width:100},
			{text:'时间',dataIndex:'rechargedate',xtype:'datecolumn',format:'H:i:s',width:100},
			{text:'充值数量',dataIndex:'counts',tdCls:'mate-active mate-text-green',align:'right',renderer:'returnSmsCounts',summaryType:'sum',summaryRenderer:'returnSmsCounts'},
			{text:'说明',dataIndex:'description',width:360},
			{text:'操作人',dataIndex:'operator',width:100}
		]}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
});
















