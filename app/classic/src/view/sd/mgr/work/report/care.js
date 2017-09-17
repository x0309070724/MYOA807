Ext.define('APP.view.sd.mgr.work.report.care',{
    extend:'Ext.Container',
    controller:'sd.mgr.res',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'grid',title:'维护报表',width:480,
			reference:'gridTotal',
			store:{
				type:'analysis.sales.statistics',
				autoLoad:true,
				sorters:[{property:'objects',direction:'DESC'}],
				proxy:{
					extraParams:{
						menu:'staff',
						datepart:'day',
						field:'care',
						startdate:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.DAY,-1),'Y-m-d'),
						enddate:Ext.Date.format(new Date(),'Y-m-d')
					}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'日期从',xtype:'startdatefield',name:'startdate',value:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.DAY,-1),'Y-m-d')},
							{emptyText:'日期至',xtype:'enddatefield',name:'enddate',value:Ext.Date.format(new Date(),'Y-m-d')}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
				{text:'无效',dataIndex:'resources_invalid',align:'right',width:60,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
				{text:'无意向',dataIndex:'resources_no',align:'right',tdCls:'x-ui-text-red',width:60,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
				{text:'待跟进',dataIndex:'resources_yes',align:'right',tdCls:'x-ui-text-green',width:60,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
				{text:'小计',dataIndex:'resources',align:'right',tdCls:'x-ui-active x-ui-text-blue',width:70,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'}
			],
			viewConfig:{enableTextSelection:false},
			features:[{ftype:'summary',dock:'bottom'}],
			listeners:{
				selectionchange:'onTrackTotalChange'
			}
	   	},
		{xtype:'grid',title:'销售记录',minWidth:600,flex:1,margin:'0 0 0 1',
			reference:'gridDetail',
			bind:{title:'销售记录：{gridTotal.selection.objects}'},
			store:{
				type:'sales.track',
				grouper:{groupFn:function(record){return Ext.Date.format(record.data.time,'Y-m-d H:00 A')},property:'time',direction:'DESC'},
				proxy:{extraParams:{app:'care',staffid:-1,startdate:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.DAY,-1),'Y-m-d'),enddate:Ext.Date.format(new Date(),'Y-m-d')}}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{xtype:'segmentedfield',segmented:{
								name:'track',
								items:[
									{tooltip:'无效',iconCls:'f-mt mt-remove x-ui-text-red',value:-100},
									{tooltip:'无意向',iconCls:'f-mt mt-attention x-ui-text-orange',value:-1},
									{tooltip:'待跟进',iconCls:'f-mt mt-customer x-ui-text-green',value:1},
									{tooltip:'全部',iconCls:'f-mt mt-icon',value:'',pressed:true} 
								]
							}},
							{xtype:'fieldSalesLevel'},
							{emptyText:'评星...',xtype:'comboRating',name:'rating',width:100},
							{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}						
				]},
				{dock:'bottom',xtype:'pagingbar'}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'时间',xtype:'datecolumn',dataIndex:'time',width:160,format:'Y-m-d H:00 A'},
				{text:'时间',xtype:'datecolumn',dataIndex:'time',width:80,format:'H:i:s'},
				{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',width:180},
				{text:'分级',dataIndex:'level',width:60,renderer:'returnResLevel'},
				{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},				
				{text:'历史跟进',dataIndex:'track_day',width:80,renderer:'returnResTrackHistory'},
				{text:'销售结果',dataIndex:'track',width:100,renderer:'returnTrackTime'},
				{text:'注释',dataIndex:'explain',minWidth:120,flex:1,renderer:'returnTrackExplain'}
			],
			features:[{ftype:'grouping'}],
			listeners:{
				itemdblclick:'onDataShowDetail'
			}
		}		
	]
});

















