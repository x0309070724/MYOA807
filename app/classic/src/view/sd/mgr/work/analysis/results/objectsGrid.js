Ext.define('APP.view.sd.mgr.work.analysis.results.objectsGrid',{
    extend:'Ext.grid.Panel',
	store:{
		type:'analysis.results.statistics',
		autoLoad:true,
		sorters:[{property:'funds_net_deposit',direction:'DESC'}],
		super:true,
		proxy:{
			extraParams:{
				menu:'staff',
				datepart:'month',
				startdate:Ext.Date.format(new Date(),'Y-m'),
				enddate:Ext.Date.format(new Date(),'Y-m')
			}
		}
	},
	columns:[
		{xtype:'rownumberer'},
		{text:'对象',bind:{text:'{objects.value:objectsName}'},dataIndex:'teamid',minWidth:180,flex:1,renderer:'returnSalesObjects',summaryType:'count'},
		{text:'开户数',defaults:{align:'right',width:100,renderer:'returnInt',summaryType:'sum',renderer:'returnInt'},columns:[
			{text:'IB',dataIndex:'account_new_count_ib'},
			{text:'IBC',dataIndex:'account_new_count_ibc'},
			{text:'SH',dataIndex:'account_new_count_sh'},
			{text:'小计',dataIndex:'account_new_count',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'出入金',defaults:{align:'right',width:120,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green'},
			{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'},
			{text:'净入金',dataIndex:'funds_net_deposit',width:140,tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'交易量',defaults:{align:'right',width:120,renderer:'returnSalesVolume',summaryType:'sum',summaryRenderer:'returnSalesVolume'},columns:[
			{text:'IB·标准',dataIndex:'trade_volume_ib_norm'},
			{text:'IB·专业',dataIndex:'trade_volume_ib_pro'},
			{text:'IB',dataIndex:'trade_volume_ib',hidden:true},
			{text:'SH·标准',dataIndex:'trade_volume_sh_norm'},
			{text:'SH·专业',dataIndex:'trade_volume_sh_pro'},
			{text:'SH',dataIndex:'trade_volume_sh',hidden:true},
			{text:'小计',dataIndex:'trade_volume',width:140,tdCls:'x-ui-active x-ui-text-blue'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		//itemdblclick:''
	}
});
