Ext.define('APP.view.rd.monitor.spread',{
    extend:'Ext.Container',
    controller:'rd.monitor',
    layout:{type:'hbox',align:'stretch'},
 	margin:1,
	items:[
//		{xtype:'grid',flex:.3,
//			title:'最后报价',
//			store:{
//				type:'cross',
//				autoLoad:true,
//				groupField:'type',
//				groupDir:'DESC',
//				//sorters:[{property:'id',direction:'DESC'}],
//				proxy:{
//					type:Mate.proxyType(),
//					url:Boot.appUrl('/rd/mt4/getQuotes.do'),
//					extraParams:{app:'quotes'}
//				}
//			},
//			dockedItems:[
//				{dock:'top',xtype:'toolbar',items:[
//					'->',
//					{xtype:'refreshbutton'}
//				]}
//			],
//			forceFit:true,
//			features:[{ftype:'grouping'}],
//			columns:[
//				{xtype:'rownumberer'},
//				{text:'类型',dataIndex:'type',width:100},
//				{text:'商品',dataIndex:'symbol',width:100},
//				{text:'买入价',dataIndex:'ask',width:100,align:'right',renderer:'returnQuotesPrice'},
//				{text:'卖出价',dataIndex:'bid',width:100,align:'right',renderer:'returnQuotesPrice'},
//				{text:'差价',dataIndex:'spread',width:80,align:'right',tdCls:'x-ui-active x-ui-text-red',renderer:'returnInt'},
//				{text:'最高价',dataIndex:'high',width:100,align:'right',renderer:'returnQuotesPrice'},
//				{text:'最低价',dataIndex:'low',width:100,align:'right',renderer:'returnQuotesPrice'},
//				{text:'时间',dataIndex:'time',width:80,align:'right',xtype:'datecolumn',format:'H:i:s'}
//			]
//		},
		{xtype:'grid',flex:.5,
			reference:'gridTotal',
			title:'平均点差',
			store:{
				type:'cross',
				autoLoad:true,
				groupField:'sortnum',
				groupDir:'ASC',
				sorters:[{property:'symbol',direction:'ASC'}],
				proxy:{
					url:Boot.appUrl('/rd/mt4/getQuotes.do'),
					extraParams:{app:'avg',date:Ext.util.Format.utcDate(new Date(),'Y-m-d')}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'日期',xtype:'datefield',name:'date',value:Ext.util.Format.utcDate(new Date(),'Y-m-d'),allowBlank:false},
							{emptyText:'时间',xtype:'timefield',name:'time',increment:60,format:'H:i A',width:80}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			//forceFit:true,
			features:[{ftype:'grouping'}],
			viewConfig:{enableTextSelection:false},
			columns:[
				{xtype:'rownumberer',width:34},
				{text:'类型',xtype:'templatecolumn',dataIndex:'sortnum',tpl:'{groupname} {groupnamecn}',width:100},
				{text:'商品',dataIndex:'symbol',width:100,flex:1},
				{text:'平均点差',dataIndex:'spread_avg',width:140,renderer:'returnSpreadAvg'},
				{text:'最高点差',dataIndex:'spread_max',width:80,tdCls:'x-ui-text-red',align:'right',renderer:'returnInt'},
				{text:'最低点差',dataIndex:'spread_min',width:80,tdCls:'x-ui-text-green',align:'right',renderer:'returnInt'},
				{text:'平均点差 加减 2',dataIndex:'spread2_avg',width:180,renderer:'returnSpread2Avg'},
				{text:'平均点差 加减 5',dataIndex:'spread5_avg',width:180,renderer:'returnSpread5Avg'}
			],
			listeners:{ 
				selectionchange:'onQuotesHistoryHour'
			}
		},
		{xtype:'grid',flex:.5,margin:'0 0 0 3',
			reference:'gridDetail',
			title:'点差历史',
			bind:{title:'点差历史：{gridTotal.selection.symbol}'},
			store:{
				type:'cross',
				autoLoad:false,
				sorters:[{property:'time',direction:'DESC'}],
				fields:[
					{name:'time',type:'date'}
				],
				proxy:{
					url:Boot.appUrl('/rd/mt4/getQuotes.do'),
					extraParams:{}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			//forceFit:true,
			//features:[{ftype:'grouping'}],
			viewConfig:{enableTextSelection:false},
			columns:[
				{xtype:'rownumberer',maxWidth:40},
				{text:'时间',xtype:'datecolumn',dataIndex:'time',format:'m-d H:i A',width:100,flex:1},
				{text:'平均点差',dataIndex:'spread_avg',width:140,renderer:'returnSpreadAvg'},
				{text:'最高点差',dataIndex:'spread_max',width:80,tdCls:'x-ui-text-red',align:'right',renderer:'returnInt'},
				{text:'最低点差',dataIndex:'spread_min',width:80,tdCls:'x-ui-text-green',align:'right',renderer:'returnInt'},
				{text:'平均点差 加减 2',dataIndex:'spread2_avg',width:180,renderer:'returnSpread2Avg'},
				{text:'平均点差 加减 5',dataIndex:'spread5_avg',width:180,renderer:'returnSpread5Avg'}
			],
			listeners:{ 
				itemdblclick:'onQuotesHistoryTime'
			}
		}
   ]
});




