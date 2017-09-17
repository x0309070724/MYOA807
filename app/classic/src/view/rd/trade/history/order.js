Ext.define('APP.view.rd.trade.history.order',{
    extend:'Ext.Container',
    controller:'rd.trade',
	layout:{type:'border',align:'stretch',padding:3},
	items:[
		{xtype:'panel',region:'west',collapsible:false,split:true,
			layout:{type:'vbox',align:'stretch'},
			width:180,
			minWidth:150,
			maxWidth:300,
			items:[
				{xtype:'menu',title:'分类检索',
					floating:false,
					userCls:'x-ui-nav-menu',
					defaults:{iconCls:'f-mt mt-right-arrow'},
					listeners:{click:'onMateMenuReloadStore'},
					items:[
						{text:'含佣金订单',params:{field:'commission_agent'}},
						{text:'含手续费订单',params:{field:'commission'}},
						{text:'含利息订单',params:{field:'storage'}},
						{text:'含税金订单',params:{field:'taxes'}},
						{text:'盈利订单',params:{field:'profitPlus'}},
						{text:'亏损订单',params:{field:'profitLess'}},
						{text:'全部',params:{field:''},userCls:'x-menu-item-selected'}
					]
				}
			]
		},
		{xtype:'grid',region:'center',
			store:{
				type:'rdTradeHistory',
				autoLoad:true,
				grouper:{
					groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d H:00')},
					property:'close_time',
					direction:'DESC'
				},		
				proxy:{extraParams:{menu:'order'}}
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
					{text:'交易类型',dataIndex:'cmd',renderer:'returnTradeCmd',width:120},
					{text:'交易量',dataIndex:'volume',tdCls:'x-ui-text-bold',width:70,align:'right',renderer:'returnTradeVolume',summaryType:'sum',summaryRenderer:'returnTradeVolume'},
					{text:'S/L T/P',width:140,align:'right',renderer:'returnTradeSlTp'},
					{text:'原因',dataIndex:'reason',width:100,renderer:'returnTradeReason',hidden:true}
				]},
				{text:'交易属性',columns:[
					{text:'开仓',dataIndex:'open_time',width:140,renderer:'returnTradeOpen'},
					{text:'平仓',dataIndex:'close_time',width:140,renderer:'returnTradeClose'},
					{text:'持仓',align:'right',renderer:'returnTradePositionsTime',width:70},
					{text:'盈亏点',align:'right',renderer:'returnTradePositionsCount',width:70}
				]},
				{text:'交易结果',defaults:{width:70,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
					{text:'佣金',dataIndex:'commission_agent'},
					{text:'手续费',dataIndex:'commission'},
					{text:'利息',dataIndex:'storage'},
					{text:'税金',dataIndex:'taxes',hidden:true},
					{text:'交易盈亏',dataIndex:'profit',width:90,renderer:'returnColorMoney',hidden:true},
					{text:'净盈亏',dataIndex:'clear',width:90,tdCls:'x-ui-active',renderer:'returnTradeClear'}
				]},
				{text:'注释',dataIndex:'comment',minWidth:100,renderer:'returnMore',flex:1}
			],
			features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
			listeners:{ 
				itemdblclick:'onTradeDetail'
			}
		}
	]
});
















