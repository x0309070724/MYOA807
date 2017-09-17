Ext.define('APP.view.sd.mgr.work.analysis.results.timeGrid',{
    extend:'Ext.grid.Panel',
	store:{
		type:'analysis.results.trend',
		autoLoad:true,
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
		{text:'开户量',defaults:{align:'right',width:100,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'IB',dataIndex:'account_new_count_ib'},
			{text:'IBC',dataIndex:'account_new_count_ibc'},
			{text:'SH',dataIndex:'account_new_count_sh'},
			{text:'开户量',dataIndex:'account_new_count',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'出入金',defaults:{align:'right',width:150,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green'},
			{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'},
			{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'交易量',defaults:{align:'right',width:150,renderer:'returnSalesVolume',summaryType:'sum',summaryRenderer:'returnSalesVolume'},columns:[
			{text:'IB',dataIndex:'trade_volume_ib'},
			{text:'SH',dataIndex:'trade_volume_sh'},
			{text:'小计',dataIndex:'trade_volume',width:200,tdCls:'x-ui-active x-ui-text-blue'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}],
	listeners:{ 
		//itemdblclick:''
	}
});
















