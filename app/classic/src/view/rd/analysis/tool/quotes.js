Ext.define('APP.view.rd.analysis.tool.quotes',{
    extend:'Ext.Panel',
    controller:'rd.analysis',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{split:false,border:true},
	items:[
		{xtype:'grid',region:'west',minWidth:260,width:480,
			title:'历史交易',
			reference:'dataGrid',
			store:{
				type:'rdTradeHistory',
				autoLoad:false,
				pageSize:10000,
				grouper:{
					groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d')},
					property:'close_time',
					direction:'DESC'
				},		
				proxy:{
					extraParams:{menu:'order'}
				}				
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'账号',xtype:'textfield',name:'login',value:97671950,allowBlank:false,width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
				//{dock:'bottom',xtype:'pagingtoolbar'}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'日期',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d',width:120},
				{text:'订单号',dataIndex:'order',xtype:'templatecolumn',tpl:'#{order}',width:100,summaryType:'count'},
				{text:'交易类型',dataIndex:'cmd',renderer:'returnTradeCmd',minWidth:80,flex:1},
				{text:'交易量',dataIndex:'volume',tdCls:'x-ui-text-bold',width:80,align:'right',renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},
				{text:'开仓',xtype:'datecolumn',dataIndex:'open_time',width:70,format:'H:i:s',hidden:true},
				{text:'平仓',xtype:'datecolumn',dataIndex:'close_time',width:70,format:'H:i:s',hidden:true},
				{text:'持仓',align:'right',renderer:'returnTradePositionsTime',width:60},
				{text:'盈亏',dataIndex:'profit',width:80,align:'right',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnColorMoney'}
			],
			viewConfig:{enableTextSelection:false},
			features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
			listeners:{ 
				//selectionchange:'XXX',
				itemdblclick:'onShowQuoteChart'
			}
		},
		{xtype:'rdQuotesChartTab',region:'center',margin:'0 0 0 3',reference:'chartTab'}	
	]
});












