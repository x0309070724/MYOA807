Ext.define('APP.view.rd.trade.history.all',{
    extend:'Ext.grid.Panel',
    controller:'rd.trade',
	store:{
		type:'rdTradeHistory',
		autoLoad:true,
		grouper:{
			groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d H:00')},
			property:'close_time',
			direction:'DESC'
		},		
		proxy:{extraParams:{menu:'all'}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'交易品种...',xtype:'comboTradeSymbol',name:'symbol'},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			//{iconCls:'f-mt mt-globe',text:'同步',handler:'onMt4TradeSyncClick'},'-',
			//{iconCls:'f-mt mt-excel',tooltip:'导出',handler:'onMateExportToExcel'},
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'平仓时间',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d H:00',width:120},
		{text:'订单',columns:[
			{text:'交易账号',dataIndex:'login',width:160,renderer:'returnTradeLogin'},
			{text:'订单号',dataIndex:'order',xtype:'templatecolumn',tpl:'#{order}',width:110},
			{text:'交易类型',dataIndex:'cmd',renderer:'returnTradeCmd',width:150},
			{text:'交易量',dataIndex:'volume',tdCls:'x-ui-text-bold',width:70,align:'right',renderer:'returnTradeVolume',summaryType:'sum',summaryRenderer:'returnTradeVolume'},
			{text:'S/L T/P',width:140,align:'right',renderer:'returnTradeSlTp'},
			{text:'原因',dataIndex:'reason',width:100,renderer:'returnTradeReason',hidden:true}
		]},
		{text:'交易',columns:[
			{text:'开仓',dataIndex:'open_time',width:150,renderer:'returnTradeOpen'},
			{text:'平仓',dataIndex:'close_time',width:150,renderer:'returnTradeClose'},
			{text:'持仓',align:'right',renderer:'returnTradePositionsTime',width:70},
			{text:'盈亏点',align:'right',renderer:'returnTradePositionsCount',width:70}
		]},
		{text:'盈亏',defaults:{renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'佣金',dataIndex:'commission_agent',width:80,align:'right'},
			{text:'手续费',dataIndex:'commission',width:80,align:'right'},
			{text:'利息',dataIndex:'storage',width:80,align:'right'},
			{text:'税金',dataIndex:'taxes',width:80,align:'right',hidden:true},
			{text:'交易盈亏',dataIndex:'profit',width:100,align:'right',renderer:'returnColorMoney'},
			{text:'净盈亏',dataIndex:'clear',width:100,align:'right',tdCls:'x-ui-active',renderer:'returnTradeClear'}
		]},
		//{text:'Gateway Order',dataIndex:'gw_order',width:80},
		//{text:'Gateway Volume',dataIndex:'gw_volume',width:80},
		//{text:'Open Price Delta',dataIndex:'gw_open_price',width:80},
		//{text:'Close Price Delta',dataIndex:'gw_close_price',width:80},
		//{text:'期限',dataIndex:'expiration',xtype:'datecolumn',width:100},
		{text:'注释',dataIndex:'comment',minWidth:100,renderer:'returnMore',flex:1}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		itemdblclick:'onTradeDetail'
	}
});
















