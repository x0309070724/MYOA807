Ext.define('APP.view.sd.mgr.res.storageStaff',{
    extend:'Ext.grid.Panel',
	store:{
		type:'resources.storage',
		autoLoad:true,
		sorters:[{property:'teamid',direction:'ASC'},{property:'id',direction:'ASC'}],
		proxy:{
			extraParams:{menu:'staff'}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'团队...',xtype:'comboCompanyTeam',root:103,name:'teamid'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid'}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'员工',dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
		{text:'A',defaults:{width:110,rate:'storage_a',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'消耗率',dataIndex:'track_a',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_a',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_a',align:'right',width:80,tdCls:'x-ui-text-green'}
//			{text:'已分配',dataIndex:'allot_a',tdCls:'x-ui-text-red'},
//			{text:'无效',dataIndex:'track_invalid_a'},
//			{text:'无意向',dataIndex:'track_no_a'},
//			{text:'待跟进',dataIndex:'track_yes_a',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'B',defaults:{width:110,rate:'storage_b',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'消耗率',dataIndex:'track_b',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_b',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_b',align:'right',width:80,tdCls:'x-ui-text-green'}
//			{text:'已分配',dataIndex:'allot_b',tdCls:'x-ui-text-red'},
//			{text:'无效',dataIndex:'track_invalid_b'},
//			{text:'无意向',dataIndex:'track_no_b'},
//			{text:'待跟进',dataIndex:'track_yes_b',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'C',defaults:{width:110,rate:'storage_c',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'消耗率',dataIndex:'track_c',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_c',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_c',align:'right',width:80,tdCls:'x-ui-text-green'}
//			{text:'已分配',dataIndex:'allot_c',tdCls:'x-ui-text-red'},
//			{text:'无效',dataIndex:'track_invalid_c'},
//			{text:'无意向',dataIndex:'track_no_c'},
//			{text:'待跟进',dataIndex:'track_yes_c',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'D',defaults:{width:110,rate:'storage_d',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'消耗率',dataIndex:'track_d',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_d',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_d',align:'right',width:80,tdCls:'x-ui-text-green'}
//			{text:'已分配',dataIndex:'allot_d',tdCls:'x-ui-text-red'},
//			{text:'无效',dataIndex:'track_invalid_d'},
//			{text:'无意向',dataIndex:'track_no_d'},
//			{text:'待跟进',dataIndex:'track_yes_d',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'ALL',defaults:{width:110,rate:'storage',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'消耗率',dataIndex:'track',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage',align:'right',width:80,tdCls:'x-ui-text-green'}
//			{text:'已分配',dataIndex:'allot',tdCls:'x-ui-text-red'},
//			{text:'无效',dataIndex:'track_invalid'},
//			{text:'无意向',dataIndex:'track_no'},
//			{text:'待跟进',dataIndex:'track_yes',tdCls:'x-ui-active x-ui-text-blue'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
















