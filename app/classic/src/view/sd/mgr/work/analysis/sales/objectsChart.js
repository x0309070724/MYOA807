Ext.define('APP.view.sd.mgr.work.analysis.sales.objectsChart',{
    extend:'Ext.Container',
	layout:{type:'border',align:'stretch',padding:1},
	defaults:{xtype:'panel',layout:'fit',split:true,border:true},
	items:[
		{xtype:'grid',region:'west',iconCls:'f-mt mt-grid',width:600,maxWidth:1000,collapsible:true,
			title:'数据报表',
			store:{
				type:'analysis.sales.statistics',
				autoLoad:false,
				sorters:[{property:'resources',direction:'DESC'}],
				super:true,
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
								{text:'电资销售',value:'resources',pressed:true},
								{text:'客户维护',value:'care'},
								{text:'通话记录',value:'call'}
							]
						},
						'->'
					]
				}
			],
			multiSelect:false,
			config:{
				columns:{
					resources:[
						{xtype:'rownumberer'},
						{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
						{text:'无效',dataIndex:'resources_invalid',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						{text:'无意向',dataIndex:'resources_no',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						{text:'待跟进',dataIndex:'resources_yes',align:'right',tdCls:'x-ui-text-green',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						{text:'小计',dataIndex:'resources',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'}
					],
					care:[
						{xtype:'rownumberer'},
						{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
						{text:'无效',dataIndex:'care_invalid',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						{text:'无意向',dataIndex:'care_no',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						{text:'待跟进',dataIndex:'care_yes',align:'right',tdCls:'x-ui-text-green',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						{text:'小计',dataIndex:'care',align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'}
					],
					call:[
						{xtype:'rownumberer'},
						{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
						{text:'通话次数',dataIndex:'call_count',align:'right',width:100,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
						//{text:'主叫',dataIndex:'call_duration_caller',align:'right',width:70,renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
						//{text:'被叫',dataIndex:'call_duration_called',align:'right',width:70,renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
						//{text:'呼转',dataIndex:'call_duration_transfer',align:'right',width:70,renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},
						{text:'平均时长',dataIndex:'call_duration_average',tdCls:'x-ui-text-green',align:'right',width:100,renderer:'returnTimeFilter',summaryType:'average',summaryRenderer:'returnTimeFilter'},
						{text:'通话时长',dataIndex:'call_duration',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:100,renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'}
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
			renderer:'returnTimeFilterText',
			menu:{
				resources:{
					checked:3,
					items:[
						{text:'无效',field:'resources_invalid',title:'分析·无效'}, 
						{text:'无意向',field:'resources_no',title:'分析·无意向'}, 
						{text:'待跟进',field:'resources_yes',title:'分析·待跟进'}, 
						{text:'小计',field:'resources',title:'分析·小计'}
					]
				},
				care:{
					checked:3,
					items:[
						{text:'无效',field:'care_invalid',title:'分析·无效'}, 
						{text:'无意向',field:'care_no',title:'分析·无意向'}, 
						{text:'待跟进',field:'care_yes',title:'分析·待跟进'}, 
						{text:'小计',field:'care',title:'分析·销售次数'}
					]
				},
				call:{
					checked:2,
					items:[
						{text:'通话次数',field:'call_count',title:'分析·通话次数'},
						{text:'平均时长',field:'call_duration_average',title:'分析·平均时长'},
						{text:'通话时长',field:'call_duration',title:'分析·通话时长'}
					]
				}
			}
		}}
	]
});




















