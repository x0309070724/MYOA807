Ext.define('APP.view.sd.sales.care.dev.today',{
    extend:'Ext.grid.Panel',
	alias:'widget.sd.sales.care.dev.today',
	title:'今日维护记录',
	store:{
		autoLoad:true,
		type:'sales.uerTrack',
		pageSize:false,
		proxy:{extraParams:{app:'care',menu:'today'}}
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
		{text:'客户',xtype:'templatecolumn',dataIndex:'name',tpl:'{name:nullToNA}<r>{mobile:safeMobile}</r>',minWidth:150,flex:1,summaryType:'count'},
		{text:'销售结果',dataIndex:'track',width:120,renderer:'returnTrackTime'}
	],
	listeners:{
		itemdblclick:'onDataShowDetail'
	},
	features:[{ftype:'summary',dock:'bottom'}]
});












