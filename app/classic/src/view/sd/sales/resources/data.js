﻿Ext.define('APP.view.sd.sales.resources.data',{
    extend:'Ext.Container',
    controller:'sd.sales',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'panel',title:'电资概览',width:600,scrollable:'y',
			layout:{type:'vbox',align:'stretch'},
			defaults:{layout:{type:'hbox',align:'stretch'},userCls:'x-ui-gauge-group',flex:1,defaults:{xtype:'gauge',flex:1,value:0}},
			reference:'storageGauge'
		},
		{xtype:'grid',title:'电资明细',minWidth:600,flex:1,margin:'0 0 0 1',
			store:{
				autoLoad:true,
				type:'sales.userData',
				proxy:{extraParams:{app:'resources'}}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{xtype:'fieldSalesStatus',segmented:{name:'status',value:1}},
							{xtype:'fieldSalesTrack',segmented:{name:'track_staff'}},
							{emptyText:'评星...',xtype:'comboRating',name:'rating',width:100},
							{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
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
				{text:'电资信息',defaults:{sortable:true},columns:[
					{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:110},
					{text:'活跃日期',dataIndex:'lastdate',width:90},
					{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},					
					{text:'状态',dataIndex:'status',width:110,renderer:'returnResStatus'}
				]},
				{text:'跟进记录',defaults:{sortable:true},columns:[
					{text:'分配日期',dataIndex:'staffdate',width:88},
					{text:'通话时长',dataIndex:'call_duration',width:100,renderer:'returnResCall'},
					{text:'已跟进',dataIndex:'track_staff_day',width:88,renderer:'returnSalesResTrackHistory'},
					{text:'最新状态',dataIndex:'track_staff_time',width:100,renderer:'returnSalesResTrackTime'}
				]}
			],
			viewConfig:{enableTextSelection:false},
			listeners:{
				itemdblclick:'onDataShowDetail'
			}
		}
	],
	listeners:{
		afterrender:'onSalesStorageRender'
	}
});