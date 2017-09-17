Ext.define('APP.view.rd.monitor.assets',{
    extend:'Ext.grid.Panel',
    controller:'rd.monitor',
	store:{
		type:'cross',
		autoLoad:true,
		pageSize:false,
		sorters:[{property:'objects',direction:'DESC'}],
		proxy:{
			url:Boot.appUrl('/rd/mt4/getAssets.do'),
			extraParams:{startdate:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.MONTH,-1),'Y-m-d'),enddate:Ext.Date.format(new Date(),'Y-m-d')}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate',value:Ext.Date.format(Ext.Date.add(new Date(),Ext.Date.MONTH,-1),'Y-m-d')},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate',value:Ext.Date.format(new Date(),'Y-m-d')}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'日期',dataIndex:'objects',minWidth:140,flex:1,renderer:'returnLedgerDay'},
		{text:'盘面',defaults:{width:130,align:'right',renderer:'returnShowMoney'},columns:[
			{text:'账户数',dataIndex:'account_count',width:90,renderer:'returnInt'},
			{text:'余额',dataIndex:'balance',tdCls:'x-ui-active x-ui-text-green'},
			{text:'净值',dataIndex:'equity',tdCls:'x-ui-active x-ui-text-red'},
			{text:'浮亏',dataIndex:'profit',tdCls:'x-ui-text-blue'}
		]},
		{text:'出入金',defaults:{width:110,align:'right',renderer:'returnShowMoney'},columns:[
			{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green'},
			{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red'},
			{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'代理佣金',defaults:{align:'right',width:110,renderer:'returnShowMoney'},columns:[
			{text:'交易量',dataIndex:'trade_volume',width:90,tdCls:'x-ui-text-bold',renderer:'returnNumber'},
			{text:'内佣',dataIndex:'trade_commission_internal',tdCls:'x-ui-text-green'},
			{text:'外佣',dataIndex:'trade_commission_foreign',tdCls:'x-ui-text-red'},
			{text:'小计',dataIndex:'trade_commission_agent',tdCls:'x-ui-active x-ui-text-blue'}
		]},
		{text:'交易盈亏',defaults:{align:'right',width:110,renderer:'returnShowMoney'},columns:[
			{text:'利息',dataIndex:'trade_storage'},
			{text:'税金',dataIndex:'trade_taxes',hidden:true},
			{text:'交易盈亏',dataIndex:'trade_profit'},
			{text:'净盈亏',dataIndex:'trade_clear',tdCls:'x-ui-active x-ui-text-blue'}
		]}
	]
});

