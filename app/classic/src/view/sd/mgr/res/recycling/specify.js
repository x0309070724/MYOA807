Ext.define('APP.view.sd.mgr.res.recycling.specify',{
    extend:'Ext.Container',
	alias:'widget.sd.mgr.res.recycling.specify',
    controller:'sd.mgr.res',
	layout:{type:'hbox',align:'stretch'},
	padding:1,
	title:'指定回收',
	items:[
		{xtype:'grid',flex:.5,
			reference:'waitGrid',
			bind:{title:'{title}'},
			store:{
				type:'resources.data',
				//autoLoad:true,
				sorters:[{property:'teamid',direction:'ASC'},{property:'id',direction:'ASC'}],
				proxy:{
					extraParams:{field:'recycling'}
				}
			},		
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'团队...',xtype:'comboCompanyTeam',root:103,name:'teamid',bind:{disabled:'{menu=="team"}',hidden:'{menu=="team"}'}},
							//{emptyText:'团队...',xtype:'comboCompanyTeam',root:103,name:'teamid',bind:{disabled:'{menu!="team"}',hidden:'{menu!="team"}'}},
							{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid',disabled:true,hidden:true,bind:{disabled:'{menu!="staff"}',hidden:'{menu!="staff"}'}},
							{emptyText:'状态...',xtype:'comboTrack',name:'track'},
							{emptyText:'次/天',xtype:'numberfield',name:'trackValue',width:60},
							{emptyText:'关键字...',xtype:'textfield',name:'staff_namecn',width:140}
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
				{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',minWidth:140,flex:1},
				{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:100},
				{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},				
				{text:'分级',dataIndex:'level',width:60,renderer:'returnResLevel'},
				{text:'团队',xtype:'templatecolumn',dataIndex:'teamid',tpl:'{team_name}</s>',width:80,bind:{hidden:'{menu!="team"}'}},
				{text:'销售员',xtype:'templatecolumn',dataIndex:'staffid',tpl:'{staff_namecn}',width:80,bind:{hidden:'{menu!="staff"}'}},
				{text:'已跟进',dataIndex:'track_staff_day',width:88,renderer:'returnSalesResTrackHistory'},
				{text:'累计通话',dataIndex:'call_duration',width:100,renderer:'returnResCall'},
				{text:'最新状态',dataIndex:'track_staff_time',width:100,renderer:'returnSalesResTrackTime'}
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
		{xtype:'grid',title:'待回收',flex:.5,collapsible:true,
			reference:'beingGrid',
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{iconCls:'f-mt mt-account-update',text:'回收',handler:'onRecyclingSpecifyClick'}
				]}
			],
			store:{},
			columns:[
				{xtype:'rownumberer'},
				{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',minWidth:140,flex:1},
				{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:100},
				{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},				
				{text:'分级',dataIndex:'level',width:60,renderer:'returnResLevel'},
				{text:'销售员',xtype:'templatecolumn',tpl:'{staff_namecn} <s>{staff_name}</s>',width:100},
				{text:'历史跟进',dataIndex:'track_day',width:88,renderer:'returnResTrackHistory'},
				{text:'累计通话',dataIndex:'call_duration',width:100,renderer:'returnResCall'},
				{text:'最新状态',dataIndex:'track_time',width:100,renderer:'returnResTrackTime'}
			],
			viewConfig:{enableTextSelection:false},
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












