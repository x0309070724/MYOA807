Ext.define('APP.view.sd.sales.results.report',{
    extend:'Ext.grid.Panel',
    controller:'sd.sales',
	store:{
		type:'sales.analysis.results',
		autoLoad:true,
		proxy:{
			extraParams:{
				datepart:'month',
				startdate:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.MONTH,-11),'Y-m'),
				enddate:Ext.Date.format(new Date(),'Y-m')
			}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'datepartfield',name:'datepart',value:'month',allowBlank:false}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'时间',dataIndex:'objects',minWidth:100,flex:1,renderer:'returnLedgerDay'},
		{text:'开户量',defaults:{align:'right',width:100,renderer:'returnInt',summaryType:'sum',summaryRenderer:'returnInt'},columns:[
			{text:'IB',dataIndex:'account_new_count_ib'},
			{text:'IBC',dataIndex:'account_new_count_ibc'},
			{text:'SH',dataIndex:'account_new_count_sh'},
			{text:'开户量',dataIndex:'account_new_count',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'出入金',defaults:{align:'right',width:140,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green'},
			{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'},
			{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'交易量',defaults:{align:'right',width:140,renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},columns:[
			{text:'IB',dataIndex:'trade_volume_ib'},
			{text:'SH',dataIndex:'trade_volume_sh'},
			{text:'交易量',dataIndex:'trade_volume',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'代理佣金',defaults:{align:'right',width:140,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
			{text:'交易量',dataIndex:'trade_volume_ib',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'佣金',dataIndex:'trade_commission_agent',tdCls:'x-ui-active x-ui-text-blue'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
















