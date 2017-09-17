Ext.define('APP.view.sys.mt4.time',{
    extend:'Ext.grid.Panel',
	xtype:'sysMt4Time',
    controller:'sys.mt4',
	store:{
		type:'cross',
		autoLoad:true,
		fields:[
			{name:'id',type:'int'},	
			{name:'mt4_zone',type:'int'},
			{name:'season',type:'int'},
			// {name:'summer_time',type:'int'},	
			// {name:'winter_time',type:'int',convert:function(v,record){return v<0?1:0}},	
			{name:'starttime',type:'date'},	
			{name:'endtime',type:'date'},		
			{name:'createtime',type:'date'}
		],
		sorters:[{property:'id',direction:'DESC'}],
		proxy:{
			url:Boot.appUrl('/Mt4Server/getMt4ServerTime.do')
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			'->',
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onMt4TimeCreatClick'},
			'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		//{text:'创建时间',dataIndex:'createtime',xtype:'datecolumn',width:200,flex:1,format:'Y-m-d H:i:s'},
		{text:'所在时区',dataIndex:'mt4_zone',minWidth:120,flex:1},
		{text:'夏令时',dataIndex:'season',align:'center',width:120,flex:1,renderer:'returnYes'},
		{text:'开始于',dataIndex:'starttime',xtype:'datecolumn',width:150,flex:1,format:'Y-m-d H:i:s'},
		{text:'结束于',dataIndex:'endtime',xtype:'datecolumn',width:150,flex:1,format:'Y-m-d H:i:s'},
		{xtype:'actioncolumn',text:'操作',align:'center',width:80,
			items:[
				{tooltip:'修改',iconCls:'f-mt mt-action-update',handler:'onMt4TimeUpdateClick'}
			]
		}
	],
	features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
});
