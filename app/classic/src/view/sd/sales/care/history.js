Ext.define('APP.view.sd.sales.care.history',{
    extend:'Ext.Container',
    controller:'sd.sales',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'grid',title:'维护日报',width:400,
			reference:'gridTotal',
			store:{
				type:'sales.analysis.sales',
				autoLoad:true,
				sorters:[{property:'objects',direction:'DESC'}],
				proxy:{
					extraParams:{
						datepart:'day',
						field:'care',
						startdate:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.DAY,-30),'Y-m-d'),
						enddate:Ext.Date.format(new Date(),'Y-m-d')
					}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'日期从',xtype:'startdatefield',name:'startdate',value:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.DAY,-30),'Y-m-d')},
							{emptyText:'日期至',xtype:'enddatefield',name:'enddate',value:Ext.Date.format(new Date(),'Y-m-d')},
							{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid'}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'时间',dataIndex:'objects',minWidth:70,flex:1,renderer:'returnLedgerDay',summaryType:'count'},
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
		{xtype:'grid',title:'维护记录',minWidth:600,flex:1,margin:'0 0 0 1',
			reference:'gridDetail',
			bind:{title:'维护记录：{gridTotal.selection.objects}'},
			store:{
				autoLoad:false,
				type:'sales.uerTrack',
				grouper:{groupFn:function(record){return Ext.Date.format(record.data.time,'Y-m-d H:00 A')},property:'time',direction:'DESC'},
				proxy:{
					extraParams:{app:'care'}
				}
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
							{emptyText:'关键字...',xtype:'textfield',name:'query',width:200}
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
				{text:'时间',xtype:'datecolumn',dataIndex:'time',width:100,format:'H:i A'},
				{text:'客户',xtype:'templatecolumn',tpl:'{name:nullToNA}<r>{mobile:safeMobile}</r>',width:200},
				{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:120},
				{text:'维护结果',dataIndex:'track',width:160,renderer:'returnSalesCareTrackTime'},
				{text:'预约时间',xtype:'templatecolumn',tpl:'{reserve_date}<r>{reserve_time}</r>',width:160},
				{text:'注释',dataIndex:'explain',minWidth:120,flex:1,renderer:'returnMore'}
			],
			features:[{ftype:'grouping'}],
			listeners:{
				itemdblclick:'onDataShowDetail'
			}
		}		
	]
});

