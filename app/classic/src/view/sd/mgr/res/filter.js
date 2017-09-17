Ext.define('APP.view.sd.mgr.res.filter',{
    extend:'Ext.grid.Panel',
    controller:'sd.mgr.res',
	store:{
		type:'resources.filter',
		autoLoad:true
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'action',
						items:[
							{tooltip:'执行方式·自动',iconCls:'f-mt mt-friends x-ui-text-green',value:0},
							{tooltip:'执行方式·手动',iconCls:'f-mt mt-powder x-ui-text-red',value:1},
							{tooltip:'全部',iconCls:'f-mt mt-icon',value:'',pressed:true} 
						]
					}},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:200}
				]
			},
			'->',
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onFilterUpdateClick'},
			{iconCls:'f-mt mt-delete',text:'删除',disabled:true,selection:true,handler:'onFilterRemoveClick'},'-',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'黑名单信息',defaults:{sortable:true,width:120},columns:[
			{text:'电资',dataIndex:'recycling_staff_count',renderer:'returnResMobile',minWidth:180,width:200},
			//{text:'姓名',dataIndex:'name',width:120},
			{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:120},
			{text:'分级',dataIndex:'level',width:70,renderer:'returnResLevel'},
			{text:'Email',dataIndex:'email',width:180,hidden:true},
			{text:'QQ',dataIndex:'qq',align:'center',width:60,renderer:'returnQQ'},
			{text:'活跃日期',dataIndex:'lastdate',width:100}
		]},
		{text:'提交信息',defaults:{sortable:true},columns:[
			{text:'日期',dataIndex:'operator_time',xtype:'datecolumn',format:'Y-m-d',width:100},
			{text:'时间',dataIndex:'operator_time',xtype:'datecolumn',format:'H:i A',width:80},
			{text:'执行方式',dataIndex:'action',width:80,renderer:'returnFilterAction'},
			{text:'提交人',dataIndex:'operatorid',width:120,renderer:'returnFilterOperator'}
		]},
		{text:'原因',dataIndex:'explain',minWidth:140,flex:1,renderer:'returnMore'}
	],
	features:[{ftype:'grouping'}],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
});
