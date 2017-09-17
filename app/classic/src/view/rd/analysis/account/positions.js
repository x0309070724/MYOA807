Ext.define('APP.view.rd.analysis.account.positions',{
    extend:'Ext.grid.Panel',
    controller:'rd',
	store:'mt4TradeGroupByLogin',
	userCls:'x-ui-disabled-dirty',
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'textfield',name:'objects',width:200,keyMap:{ENTER:'onMateSearchRecord'}}
		]}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'账户',dataIndex:'objects',minWidth:120,flex:1,summaryType:'count'},
		{text:'BUY',defaults:{align:'right',width:100,summaryType:'sum'},columns:[
			{text:'交易量',dataIndex:'buy_volume',tdCls:'x-ui-text-green',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'交易笔数',dataIndex:'buy_count',tdCls:'x-ui-text-red',renderer:'returnInt',summaryRenderer:'returnInt'},
			{text:'浮亏',dataIndex:'buy_profit',width:120,tdCls:'x-ui-active x-ui-text-blue',renderer:'returnColorMoney',summaryRenderer:'returnColorMoney'}
		]},
		{text:'SELL',defaults:{align:'right',width:100,summaryType:'sum'},columns:[
			{text:'交易量',dataIndex:'sell_volume',tdCls:'x-ui-text-green',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'交易笔数',dataIndex:'sell_count',tdCls:'x-ui-text-red',renderer:'returnInt',summaryRenderer:'returnInt'},
			{text:'浮亏',dataIndex:'sell_profit',width:120,tdCls:'x-ui-active x-ui-text-blue',renderer:'returnColorMoney',summaryRenderer:'returnColorMoney'}
		]},
		{text:'ALL',defaults:{align:'right',width:100,summaryType:'sum'},columns:[
			{text:'交易量',dataIndex:'market_volume',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'交易笔数',dataIndex:'market_count',renderer:'returnInt',summaryRenderer:'returnInt'},
			{text:'净头寸',dataIndex:'position_volume',tdCls:'x-ui-active x-ui-text-green',renderer:'returnNumber',summaryRenderer:'returnNumber'},
			{text:'手续费',dataIndex:'commission',renderer:'returnShowMoney',summaryRenderer:'returnShowMoney'},
			{text:'利息',dataIndex:'storage',renderer:'returnShowMoney',summaryRenderer:'returnShowMoney'},
			{text:'税金',dataIndex:'taxes',renderer:'returnShowMoney',summaryRenderer:'returnShowMoney',hidden:true},
			{text:'浮亏',dataIndex:'profit',width:120,tdCls:'x-ui-active x-ui-text-blue',renderer:'returnColorMoney',summaryRenderer:'returnColorMoney'},
			{text:'净浮亏',dataIndex:'clear',width:120,renderer:'returnColorMoney',summaryRenderer:'returnColorMoney'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
