Ext.define('APP.view.sd.mgr.res.storageTeam',{
    extend:'Ext.grid.Panel',
	store:{
		type:'resources.storage',
		autoLoad:true,
		sorters:[{property:'id',direction:'ASC'}],
		proxy:{
			extraParams:{menu:'team'}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'团队...',xtype:'comboCompanyTeam',root:103,name:'teamid'}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'团队',dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
		{text:'A',defaults:{width:110,rate:'storage_a',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//			{text:'分配率',dataIndex:'allot_a',renderer:'returnStorageRate'},
			{text:'消耗率',dataIndex:'track_a',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_a',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_a',align:'right',width:80,tdCls:'x-ui-text-green'}
		]},
		{text:'B',defaults:{width:110,rate:'storage_b',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//			{text:'分配率',dataIndex:'allot_b',renderer:'returnStorageRate'},
			{text:'消耗率',dataIndex:'track_b',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_b',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_b',align:'right',width:80,tdCls:'x-ui-text-green'}
		]},
		{text:'C',defaults:{width:110,rate:'storage_c',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//			{text:'分配率',dataIndex:'allot_c',renderer:'returnStorageRate'},
			{text:'消耗率',dataIndex:'track_c',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_c',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_c',align:'right',width:80,tdCls:'x-ui-text-green'}
		]},
		{text:'D',defaults:{width:110,rate:'storage_d',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//			{text:'分配率',dataIndex:'allot_d',renderer:'returnStorageRate'},
			{text:'消耗率',dataIndex:'track_d',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes_d',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage_d',align:'right',width:80,tdCls:'x-ui-text-green'}
		]},
		{text:'ALL',defaults:{width:110,rate:'storage',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
//			{text:'分配率',dataIndex:'allot',renderer:'returnStorageRate'},
			{text:'消耗率',dataIndex:'track',renderer:'returnStorageRate'},
			{text:'意向率',dataIndex:'track_yes',renderer:'returnStorageRate'},
			{text:'库存',dataIndex:'storage',align:'right',width:80,tdCls:'x-ui-text-green'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
















