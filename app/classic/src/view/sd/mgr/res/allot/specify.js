Ext.define('APP.view.sd.mgr.res.allot.specify',{
    extend:'Ext.Container',
	alias:'widget.sd.mgr.res.allot.specify',
    controller:'sd.mgr.res',
	layout:{type:'hbox',align:'stretch'},
	padding:1,
	title:'指定分配',
	items:[
		{xtype:'grid',flex:.5,
			reference:'waitGrid',
			bind:{title:'{title}',},
			store:{
				type:'resources.data',
				sorters:[{property:'teamid',direction:'ASC'},{property:'id',direction:'ASC'}],
				proxy:{
					extraParams:{field:'allot'}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{xtype:'fieldSalesTrack',segmented:{name:'track',value:0}},
							{xtype:'fieldSalesLevel',segmented:{name:'level',value:''}},
							{emptyText:'团队...',xtype:'comboCompanyTeam',root:103,name:'teamid',bind:{disabled:'{menu=="team"}',hidden:'{menu=="team"}'}},
//							{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid',disabled:true,hidden:true,bind:{disabled:'{menu!="staff"}',hidden:'{menu!="staff"}'}},
							{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]},
				{dock:'bottom',xtype:'pagingbar'}
			],
			//forceFit:true,
			selType:'checkboxmodel',
			viewConfig:{enableTextSelection:false},
			columns:[
				{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',minWidth:180,flex:1},
				{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:100},
				{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},				
				{text:'分级',dataIndex:'level',width:70,renderer:'returnResLevel'},
				{text:'历史跟进',dataIndex:'track_day',width:88,renderer:'returnResTrackHistory'},
				{text:'累计通话',dataIndex:'call_duration',width:100,renderer:'returnResCall'},
				{text:'最新状态',dataIndex:'track_time',width:100,renderer:'returnResTrackTime'}
			],
			//features:[{ftype:'summary',dock:'bottom'}],
			listeners:{
				itemdblclick:'onMateGridRecordToRight',
				rowcontextmenu:'onDataShowMenu'
			}
	   	},
		{region:'east',xtype:'toolbar',margin:'0 1',dock:'right',
			items:[
				'->',
				{iconCls:'f-mt mt-outline-right',scale:'large',bind:{disabled:'{!waitGrid.selection}'},handler:'onMateGridRecordBatchToRight'},
				' ',
				{iconCls:'f-mt mt-outline-left',scale:'large',bind:{disabled:'{!beingGrid.selection}'},handler:'onMateGridRecordBatchToLeft'},
				'->'
			]
		},
		{xtype:'grid',title:'待分配',flex:.5,collapsible:true,
			reference:'beingGrid',
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{iconCls:'f-mt mt-account-update',text:'分配',handler:'onAllotSpecifyClick'}
				]}
			],
			store:{},
			viewConfig:{enableTextSelection:false},
			columns:[
				{xtype:'rownumberer'},
				{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',minWidth:180,flex:1},
				{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:100},
				{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},				
				{text:'分级',dataIndex:'level',width:70,renderer:'returnResLevel'},
				{text:'历史跟进',dataIndex:'track_day',width:88,renderer:'returnResTrackHistory'},
				{text:'累计通话',dataIndex:'call_duration',width:100,renderer:'returnResCall'},
				{text:'最新状态',dataIndex:'track_time',width:100,renderer:'returnResTrackTime'}
			],
			//features:[{ftype:'summary',dock:'bottom'}],
			listeners:{
				itemdblclick:'onMateGridRecordToLeft'
			}
		}		
	],
	initComponent:function(){
		this.callParent();
		var me=this,
			grid=this.lookup('waitGrid'),
			store=grid.getStore(),
			tabPanel=this.up('tabpanel');
		var parameter=tabPanel.getViewModel().getData();
		Ext.apply(store.getProxy().extraParams,{menu:parameter.menu,})
		store.load();
	}
});
