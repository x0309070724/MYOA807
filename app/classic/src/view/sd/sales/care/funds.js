Ext.define('APP.view.sd.sales.care.funds',{
    extend:'Ext.Container',
    controller:'sd.sales.care',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'grid',title:'出金·待跟进',flex:.56,
			reference:'gridBase',
			store:{
				type:'sales.funds',
				autoLoad:true,
				pageSize:false,
				sorters:[{property:'id',direction:'DESC'}],
				grouper:{groupFn:function(record){return Ext.Date.format(record.data.time,'Y-m-d')},property:'time',direction:'ASC'},		
				proxy:{extraParams:{tracked:0}}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'申请月份',xtype:'monthfield',name:'time'},
							{emptyText:'关键字',xtype:'textfield',name:'query',width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			multiSelect:false,
			columns:[
				{xtype:'rownumberer'},
				{text:'账号',dataIndex:'login',minWidth:160,renderer:'returnTradeLogin',flex:1,summaryType:'count'},
				{text:'申请信息',columns:[
					{text:'申请日期',dataIndex:'time',xtype:'datecolumn',format:'Y-m-d',width:100},
					{text:'时间',dataIndex:'time',xtype:'datecolumn',format:'H:i A',width:80},
					{text:'币别',dataIndex:'bank_currency',width:60,hidden:true},
					{text:'出款银行',dataIndex:'bank_name',width:100,renderer:'returnBankCard'},
					{text:'金额',dataIndex:'amount_usd',width:90,align:'right',tdCls:'x-ui-active x-ui-text-red',renderer:'returnUsMoney',summaryType:'sum',summaryRenderer:'returnUsMoney'}
				]},
				{text:'账户信息',defaults:{sortable:true,width:90,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
					{text:'代理',dataIndex:'agent',width:120,align:'left',renderer:'returnAgentAccount',summaryType:false,summaryRenderer:false},
					{text:'交易量',dataIndex:'trade_volume',width:80,renderer:'returnNumber',summaryRenderer:'returnNumber'},
					{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryRenderer:'returnColorMoney'}
//					{text:'余额',dataIndex:'account_balance'},
//					{text:'信用',dataIndex:'account_credit',hidden:true},
//					{text:'净值',dataIndex:'account_equity'}
				]},
				{text:'账户资产',defaults:{sortable:true,width:100,align:'right',renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},columns:[
					{text:'信用',dataIndex:'account_credit',hidden:true},
					{text:'余额',dataIndex:'account_balance',tdCls:'x-ui-text-green'},
					{text:'已用',dataIndex:'account_margin',hidden:true},
					{text:'可用',dataIndex:'account_margin_free',tdCls:'x-ui-text-green',hidden:true},
					{text:'净值',dataIndex:'account_equity',tdCls:'x-ui-text-red'}
				]}
				//{text:'审核',dataIndex:'audit',width:60,align:'center',renderer:'returnYes'},
			],
			features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
			listeners:{
				itemdblclick:'onFundsTrackClick'
			}
		},
		{xtype:'grid',title:'出金·跟进记录',flex:.44,margin:'0 0 0 1',
			reference:'gridChange',
			store:{
				type:'sales.funds',
				autoLoad:true,
				remoteSort:true,
				sorters:[{property:'track_time',direction:'DESC'}],
				grouper:{groupFn:function(record){return Ext.Date.format(record.data.track_time,'Y-m-d')},property:'track_time',direction:'DESC'},			
				proxy:{extraParams:{tracked:1}}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'跟进月份',xtype:'monthfield',name:'track_time'},
							{emptyText:'关键字',xtype:'textfield',name:'query',width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]},
				{dock:'bottom',xtype:'pagingbar'}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'账号',dataIndex:'login',minWidth:160,renderer:'returnTradeLogin',flex:1,summaryType:'count'},
				{text:'申请信息',columns:[
					{text:'日期',dataIndex:'time',xtype:'datecolumn',format:'Y-m-d',width:88},
					{text:'金额',dataIndex:'amount_usd',width:90,align:'right',tdCls:'x-ui-active x-ui-text-red',renderer:'returnUsMoney',summaryType:'sum',summaryRenderer:'returnUsMoney'}
				]},
				{text:'跟进结果',columns:[
					{text:'跟进日期',dataIndex:'track_time',xtype:'datecolumn',format:'Y-m-d',width:88},
					{text:'时间',dataIndex:'track_time',xtype:'datecolumn',format:'H:i A',width:80},
					//{text:'结果',dataIndex:'audit',width:50,align:'center',renderer:'returnYes'},
					{text:'注释',dataIndex:'track_explain',width:280,renderer:'returnMore'}
				]},
			],
			features:[{ftype:'grouping'}]
		}		
	]
});