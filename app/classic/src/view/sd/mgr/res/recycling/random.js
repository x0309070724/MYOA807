Ext.define('APP.view.sd.mgr.res.recycling.random',{
    extend:'Ext.Container',
	alias:'widget.sd.mgr.res.recycling.random',
    controller:'sd.mgr.res',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	title:'随机回收',
	items:[
		{xtype:'grid',iconCls:'f-mt mt-grid',width:1100,margin:'0 1 0 0',
			reference:'gridBase',
			bind:{
				title:'{title}',
				store:{
					type:'resources.storage',
					autoLoad:true,
					sorters:[{property:'teamid',direction:'ASC'},{property:'id',direction:'ASC'}],
					proxy:{extraParams:{menu:'{menu}',field:'recycling'}}	
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			multiSelect:false,
			columns:[
				{xtype:'rownumberer'},
				{text:'对象',bind:{text:'{menu:objectsName}'},dataIndex:'teamid',minWidth:150,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
				{text:'入职',dataIndex:'startdate',width:88,renderer:'returnStorageStaffDays',align:'right',bind:{hidden:'{menu!="staff"}'}},
				{text:'电资概览',defaults:{sortable:true,align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
					{text:'总量',dataIndex:'storage',tdCls:'x-ui-active x-ui-text-blue'},
					{text:'人均',dataIndex:'staff_count',hidden:true,bind:{hidden:'{menu!="team"}'},renderer:'returnStorageStaffAvg'},
					{text:'待分配',dataIndex:'storage_waitallot',tdCls:'x-ui-text-red',hidden:true,bind:{hidden:'{menu!="team"}'}},
					{text:'已开户',dataIndex:'storage_account',width:70},
					{text:'黑名单',dataIndex:'storage_blacklist',width:70},
					{text:'开发中',dataIndex:'storage_ok',tdCls:'x-ui-active x-ui-text-green'}
				]},
				{text:'开发进度',defaults:{sortable:true,align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
					{text:'未跟进',dataIndex:'track_new',tdCls:'x-ui-text-red'},
					{text:'无效',dataIndex:'track_invalid'},
					{text:'无意向',dataIndex:'track_no'},
					{text:'待跟进',dataIndex:'track_yes',tdCls:'x-ui-active x-ui-text-green'}
				]},
				{text:'消耗率',dataIndex:'track_rate',width:130,renderer:'returnStorageTrackRate'},
			],
			viewConfig:{
				enableTextSelection:false
			},
			features:[{ftype:'summary',dock:'bottom'}],
			listeners:{
				selectionchange:'onStorageChange',
				itemdblclick:'onRecyclingRandomClick'
			}
		},
		{xtype:'panel',title:'电资概览',flex:1,
			bind:{title:'电资概览：{gridBase.selection.objects}'},
			layout:{type:'vbox',align:'stretch'},
			defaults:{layout:{type:'hbox',align:'stretch'},userCls:'x-ui-gauge-group',defaults:{xtype:'gauge',flex:1,value:0}},
			reference:'storageGauge'
		}
	]
});





