Ext.define('APP.view.sd.sales.resources.dev.today',{
    extend:'Ext.grid.Panel',
	alias:'widget.sd.sales.resources.dev.today',
	title:'今日销售记录',
	store:{
		autoLoad:true,
		type:'sales.uerTrack',
		pageSize:false,
		proxy:{extraParams:{app:'resources',menu:'today'}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',hideSearch:true,
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'track',
						items:[
							{tooltip:'无效',iconCls:'f-mt mt-remove x-ui-text-red',value:-100},
							{tooltip:'无意向',iconCls:'f-mt mt-attention x-ui-text-orange',value:-1},
							{tooltip:'待跟进',iconCls:'f-mt mt-customer x-ui-text-green',value:1},
							{tooltip:'全部',iconCls:'f-mt mt-icon',value:'',pressed:true} 
						]
					}}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'时间',xtype:'datecolumn',dataIndex:'time',width:80,format:'H:i A'},
		{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',minWidth:180,flex:1,summaryType:'count'},
		{text:'销售结果',dataIndex:'track',width:120,renderer:'returnTrackTime'}
	],
	listeners:{
		itemdblclick:'onDataShowDetail'
	},
	features:[{ftype:'summary',dock:'bottom'}]
});












