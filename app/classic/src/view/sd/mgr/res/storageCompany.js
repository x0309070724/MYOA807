Ext.define('APP.view.sd.mgr.res.storageCompany',{
    extend:'Ext.Container',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'grid',title:'入库记录',width:600,
			store:{
				autoLoad:true,
				type:'resources.warehousing'
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{xtype:'refreshbutton'}						
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'月份',dataIndex:'time',minWidth:80,flex:1},
				{text:'入库信息',defaults:{width:100,renderer:'returnStorageCount',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
					{text:'A',dataIndex:'count_a'},
					{text:'B',dataIndex:'count_b'},
					{text:'C',dataIndex:'count_c'},
					{text:'D',dataIndex:'count_d'},
					{text:'ALL',dataIndex:'count',width:80,tdCls:'x-ui-active x-ui-text-blue',align:'right',renderer:'returnInt'}
				]},
//				{text:'分配至团队',defaults:{align:'right',width:90,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//					{text:'A',dataIndex:'team_count_a'},
//					{text:'B',dataIndex:'team_count_b'},
//					{text:'C',dataIndex:'team_count_c'},
//					{text:'D',dataIndex:'team_count_d'},
//					{text:'ALL',dataIndex:'team_count',tdCls:'x-ui-active x-ui-text-blue'}
//				]},
//				{text:'分配至员工',defaults:{align:'right',width:90,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//					{text:'A',dataIndex:'staff_count_a'},
//					{text:'B',dataIndex:'staff_count_b'},
//					{text:'C',dataIndex:'staff_count_c'},
//					{text:'D',dataIndex:'staff_count_d'},
//					{text:'ALL',dataIndex:'staff_count',tdCls:'x-ui-active x-ui-text-blue'}
//				]}
			],
			features:[{ftype:'summary',dock:'bottom'}]
		},
		{xtype:'panel',title:'库存概览',minWidth:800,flex:1,margin:'0 0 0 1',
			layout:{type:'vbox',align:'stretch'},
			defaults:{layout:{type:'hbox',align:'stretch'},userCls:'x-ui-gauge-group',padding:5,flex:1,defaults:{xtype:'gauge',flex:1,value:0}},
			reference:'storageGauge'
		}
	],
	listeners:{
		afterrender:'onWarehousingRender'
	}
});














