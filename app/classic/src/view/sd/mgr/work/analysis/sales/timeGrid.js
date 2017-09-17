﻿Ext.define('APP.view.sd.mgr.work.analysis.sales.timeGrid',{
    extend:'Ext.grid.Panel',
	border:false,
	store:{
		type:'analysis.sales.trend',
		autoLoad:true,
		sorters:[{property:'objects',direction:'ASC'}],
		super:true,
		proxy:{
			extraParams:{
				datepart:'month',
				startdate:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.MONTH,-5),'Y-m'),
				enddate:Ext.Date.format(new Date(),'Y-m')
			}
		}
	},
	columns:[
		{xtype:'rownumberer'},
		{text:'时间',bind:{text:'{datepart.value:datepartName}'},dataIndex:'objects',minWidth:100,flex:1,renderer:'returnLedgerDay',summaryType:'count'},
		{text:'电资销售',defaults:{align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'无效',dataIndex:'resources_invalid'},
			{text:'无意向',dataIndex:'resources_no'},
			{text:'待跟进',dataIndex:'resources_yes',tdCls:'x-ui-text-green'},
			{text:'小计',dataIndex:'resources',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'客户维护',defaults:{align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'无效',dataIndex:'care_invalid'},
			{text:'无意向',dataIndex:'care_no'},
			{text:'待跟进',dataIndex:'care_yes',tdCls:'x-ui-text-green'},
			{text:'小计',dataIndex:'care',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'通话记录',defaults:{align:'right',width:80,renderer:'returnTimeFilter',summaryType:'sum',summaryRenderer:'returnTimeFilter'},columns:[
			{text:'次数',dataIndex:'call_count',renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},
			{text:'主叫',dataIndex:'call_duration_caller'},
			{text:'被叫',dataIndex:'call_duration_called'},
			{text:'呼转',dataIndex:'call_duration_transfer'},
			{text:'平均时长',dataIndex:'call_duration_average',tdCls:'x-ui-text-green',summaryType:'average'},
			{text:'总时长',dataIndex:'call_duration',tdCls:'x-ui-active x-ui-text-blue',width:100}
		]},
		{text:'销售结果·开户量',defaults:{align:'right',width:80,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'IB',dataIndex:'account_count_ib'},
			{text:'IBC',dataIndex:'account_count_ibc'},
			{text:'SH',dataIndex:'account_count_sh'},
			{text:'开户量',dataIndex:'account_count',tdCls:'x-ui-active x-ui-text-blue'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
















