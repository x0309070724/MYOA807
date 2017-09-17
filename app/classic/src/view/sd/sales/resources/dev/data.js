Ext.define('APP.view.sd.sales.resources.dev.data',{
    extend:'Ext.grid.Panel',
	alias:'widget.sd.sales.resources.dev.data',
	title:'我的电资',
	store:{
		type:'sales.userData',
		autoLoad:true,
		pageSize:100,
		proxy:{extraParams:{app:'resources',status:1}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'fieldSalesTrack',segmented:{name:'track_staff',value:0}},
					{emptyText:'评星...',xtype:'comboRating',name:'rating',width:100},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:120}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'电资',dataIndex:'mobile',renderer:'returnSalesResMobile',minWidth:180,flex:1},
		{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:100},
		{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},				
		//{text:'通话',dataIndex:'call_duration',width:120,renderer:'returnResCall'},
		//{text:'预约时间',xtype:'templatecolumn',dataIndex:'reserve_date',width:120,tpl:'{reserve_date:date("m-d")}<r>{reserve_time}</r>',hidden:true,bind:{hidden:'{track.value!=1}'}},
		{text:'分配日期',dataIndex:'staffdate',width:100,hidden:true},
		{text:'已跟进',dataIndex:'track_staff_day',width:88,renderer:'returnSalesResTrackHistory'},
		{text:'最新状态',dataIndex:'track_staff_time',width:100,renderer:'returnSalesResTrackTime'}
	],
	viewConfig:{enableTextSelection:false},
	listeners:{ 
		selectionchange:'onDataChange',
		itemdblclick:'onResourcesUpdateClick'
	}
});












