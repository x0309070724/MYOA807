Ext.define('APP.view.rd.trade.balance.gift',{
    extend:'Ext.grid.Panel',
    controller:'rd.trade',
	store:{
		type:'rdTradeHistory',
		autoLoad:true,
		grouper:{
			groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d')},
			property:'close_time',
			direction:'DESC'
		},		
		proxy:{extraParams:{menu:'balance',field:'gift'}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	forceFit:true,
	columns:[
		{xtype:'rownumberer',maxWidth:40},
		{text:'日期',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d'},
		{text:'交易账号',dataIndex:'login',renderer:'returnTradeLogin',minWidth:200},
		{text:'订单号',dataIndex:'order',xtype:'templatecolumn',tpl:'#{order}',minWidth:140},
		{text:'交易类型',dataIndex:'cmd',renderer:'returnTradeCmd',minWidth:160},
		{text:'原因',dataIndex:'reason',renderer:'returnTradeReason',minWidth:100},
		{text:'时间',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d H:i:s',minWidth:180},
		{text:'金额',dataIndex:'profit',tdCls:'x-ui-active x-ui-text-bold',align:'right',minWidth:120,renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnColorMoney'},
		{text:'注释',dataIndex:'comment',renderer:'returnMore',minWidth:300}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onTradeDetail'
	}
});
















