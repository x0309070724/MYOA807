Ext.define('APP.view.sys.mt4.group',{
    extend:'Ext.grid.Panel',
	xtype:'sysMt4Group',
    controller:'sys.mt4',
	store:{
		type:'cross',
		autoLoad:true,
		remoteSort:false,
		pageSize:false,
		fields:[
			{name:'group',type:'string'},
			{name:'enable',type:'int'},
			{name:'company',type:'string'},
			{name:'default_leverage',type:'int'},
			{name:'default_deposit',type:'int'}
		],
		proxy:{
			url:Boot.appUrl('/system/mt4/getGroup.do')
		}
	},
	columns:[
		{xtype:'rownumberer'},
		{text:'组名',dataIndex:'group',minWidth:100,flex:1},
		{text:'公司',dataIndex:'company',minWidth:100,flex:1},
		{text:'默认杠杆',dataIndex:'default_leverage',align:'right',width:140},
		{text:'默认入金',dataIndex:'default_deposit',align:'right',width:140},
		{text:'启用',dataIndex:'enable',width:60,align:'center',renderer:'returnYes'}
	],
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'enable',margin:'0 10 0 0',
						items:[
							{tooltip:'已禁用',iconCls:'f-mt mt-no',value:0},
							{tooltip:'已弃用',iconCls:'f-mt mt-yes',value:1},
							{tooltip:'全部',iconCls:'f-mt mt-icon',value:'',pressed:true} 
						]
					}},
					{xtype:'textfield',name:'query',width:140,emptyText:'关键字...'}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	]
});
