Ext.define('APP.view.sd.mgr.work.analysis.results.objectsChart',{
    extend:'Ext.Container',
	layout:{type:'border',align:'stretch',padding:1},
	defaults:{xtype:'panel',layout:'fit',split:true,border:true},
	items:[
		{xtype:'grid',region:'west',iconCls:'f-mt mt-grid',width:540,maxWidth:1000,collapsible:true,
			title:'数据报表',
			store:{
				type:'analysis.results.statistics',
				super:true,
				sorters:[{property:'funds_net_deposit',direction:'DESC'}],
				proxy:{
					extraParams:{
						menu:'staff',
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
								{text:'开户量',value:'account'}, 
								{text:'出入金',value:'funds',pressed:true},
								{text:'交易量',value:'volume'}
							]
						},
						'->'
					]
				}
			],
			multiSelect:false,
			config:{
				columns:{
					account:[
						{xtype:'rownumberer'},
						{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
						{text:'IB',dataIndex:'account_new_count_ib',align:'right',width:70,renderer:'returnInt',summaryType:'sum',renderer:'returnInt'},
						{text:'IBC',dataIndex:'account_new_count_ibc',align:'right',width:70,renderer:'returnInt',summaryType:'sum',renderer:'returnInt'},
						{text:'SH',dataIndex:'account_new_count_sh',align:'right',width:70,renderer:'returnInt',summaryType:'sum',renderer:'returnInt'},
						{text:'开户量',dataIndex:'account_new_count',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:80,renderer:'returnInt',summaryType:'sum',renderer:'returnInt'}
					],
					funds:[
						{xtype:'rownumberer'},
						{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
						{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'}
					],
					volume:[
						{xtype:'rownumberer'},
						{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
						{text:'IB',dataIndex:'trade_volume_ib',align:'right',width:100,renderer:'returnSalesVolume',summaryType:'sum',summaryRenderer:'returnSalesVolume'},
						{text:'SH',dataIndex:'trade_volume_sh',align:'right',width:100,renderer:'returnSalesVolume',summaryType:'sum',summaryRenderer:'returnSalesVolume'},
						{text:'交易量',dataIndex:'trade_volume',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:100,renderer:'returnSalesVolume',summaryType:'sum',summaryRenderer:'returnSalesVolume'}
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
				account:{
					checked:3,
					items:[
						{text:'IB',field:'account_new_count_ib',title:'新开账户分析·IB'}, 
						{text:'IBC',field:'account_new_count_ibc',title:'新开账户分析·IBC'}, 
						{text:'SH',field:'account_new_count_sh',title:'新开账户分析·SH'}, 
						{text:'开户量',field:'account_new_count',title:'新开账户分析'}
					]
				},
				funds:{
					checked:2,
					items:[
						{text:'入金',field:'funds_deposit',title:'入金分析'}, 
						{text:'出金',field:'funds_withdrawal',title:'出金分析'}, 
						{text:'净入金',field:'funds_net_deposit',title:'净入金分析'}
					]
				},
				volume:{
					checked:2,
					items:[
						{text:'IB',field:'trade_volume_ib',title:'交易量分析·IB'}, 
						{text:'SH',field:'trade_volume_sh',title:'交易量分析·SH'},
						{text:'交易量',field:'trade_volume',title:'交易量分析'}
					]
				}
			}
		}}
	]
});




















