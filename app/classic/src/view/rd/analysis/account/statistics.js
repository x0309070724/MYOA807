Ext.define('APP.view.rd.analysis.account.statistics',{
    extend:'Ext.Panel',
    controller:'rd',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{xtype:'panel',layout:'fit',split:true,border:true},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'datepartfield',name:'datepart',value:'month',allowBlank:false}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	items:[
		{xtype:'grid',region:'west',iconCls:'f-mt mt-grid',width:560,maxWidth:1000,collapsible:true,
			title:'数据报表',
			store:{
				type:'analysis.trade.statistics',
				autoLoad:false,
				sorters:[{property:'trade_clear',direction:'ASC'}],
				super:true,
				proxy:{
					extraParams:{
						menu:'account',
						datepart:'month',
						startdate:Ext.Date.format(new Date(),'Y-m'),
						enddate:Ext.Date.format(new Date(),'Y-m')
					}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',
					items:[
						'->',
						{xtype:'reconfigurebutton',
							items:[
								{text:'出入金',value:'funds'},
								{text:'佣金',value:'commission'},
								{text:'交易盈亏',value:'trade',pressed:true}
							]
						},
						'->'
					]
				}
			],
			multiSelect:false,
			config:{
				columns:{
					funds:[
						{xtype:'rownumberer'},
						{text:'账户',xtype:'templatecolumn',dataIndex:'objects',minWidth:120,tpl:'{objects}<r>{objects_tip}</r>',flex:1,summaryType:'count'},
						{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green',align:'right',width:110,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red',align:'right',width:110,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:110,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'}
					],
					commission:[
						{xtype:'rownumberer'},
						{text:'账户',xtype:'templatecolumn',dataIndex:'objects',minWidth:120,tpl:'{objects}<r>{objects_tip}</r>',flex:1,summaryType:'count'},
						{text:'交易量',dataIndex:'trade_volume',tdCls:'x-ui-text-bold',align:'right',width:80,renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},
						{text:'内佣',dataIndex:'trade_commission_internal',tdCls:'x-ui-text-green',align:'right',width:90,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'外佣',dataIndex:'trade_commission_foreign',tdCls:'x-ui-text-red',align:'right',width:90,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'小计',dataIndex:'trade_commission_agent',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'}
					],
					trade:[
						{xtype:'rownumberer'},
						{text:'账户',xtype:'templatecolumn',dataIndex:'objects',minWidth:120,tpl:'{objects}<r>{objects_tip}</r>',flex:1,summaryType:'count'},
						{text:'交易量',dataIndex:'trade_volume',tdCls:'x-ui-text-bold',align:'right',width:80,renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},
						{text:'利息',dataIndex:'trade_storage',align:'right',width:80,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'税金',dataIndex:'trade_taxes',align:'right',width:80,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney',hidden:true},
						{text:'交易盈亏',dataIndex:'trade_profit',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'净盈亏',dataIndex:'trade_clear',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'}
					]
				}
			},
			features:[{ftype:'summary',dock:'bottom'}],
			listeners:{
				sortchange:'onMateGridChartSortChange',
				selectionchange:'onMateGridChartSelectionChange'
			}
		},
		{xtype:'mate.chart',mateParameters:{
			type:'statistics',
			menu:{
				funds:{
					checked:2,
					items:[
						{text:'入金',field:'funds_deposit',title:'账户分析·入金统计'}, 
						{text:'出金',field:'funds_withdrawal',title:'账户分析·出金统计'}, 
						{text:'净入金',field:'funds_net_deposit',title:'账户分析·净入金统计'}
					]
				},
				commission:{
					checked:3,
					items:[
						{text:'交易量',field:'trade_volume',title:'账户分析·交易量统计'}, 
						{text:'内佣',field:'trade_commission_internal',title:'账户分析·内佣统计'},
						{text:'外佣',field:'trade_commission_foreign',title:'账户分析·外佣统计'},
						{text:'小计',field:'trade_commission_agent',title:'账户分析·佣金统计'}
					]
				},
				trade:{
					checked:4,
					items:[
						{text:'交易量',field:'trade_volume',title:'账户分析·交易量统计'}, 
						{text:'利息',field:'trade_storage',title:'账户分析·交易利息统计'},
						{text:'税金',field:'trade_taxes',title:'账户分析·交易税金统计',hidden:true},
						{text:'交易盈亏',field:'trade_profit',title:'账户分析·交易盈亏统计'}, 
						{text:'净盈亏',field:'trade_clear',title:'账户分析·净盈亏统计'}
					]
				}
			}
		}}
	]
});







