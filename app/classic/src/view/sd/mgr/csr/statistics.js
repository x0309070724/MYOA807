Ext.define('APP.view.sd.mgr.csr.statistics',{
    extend:'Ext.Panel',
    controller:'ia.account',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{xtype:'panel',layout:'fit',split:true,border:true},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'datepartfield',name:'datepart',value:'month',allowBlank:false},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid'}
				]
			},
			'->',
			{iconCls:'f-mt mt-refresh',tooltip:'刷新',handler:'onMateStoreRefresh'}
		]}
	],
	items:[
		{xtype:'grid',region:'west',iconCls:'f-mt mt-grid',width:600,maxWidth:1000,collapsible:true,
			title:'数据报表',
			store:{
				type:'analysis.trade.statistics',
				autoLoad:false,
				sorters:[{property:'trade_volume',direction:'DESC'}],
				proxy:{
					extraParams:{
						menu:'account',
						datepart:'month',
						startdate:Ext.Date.format(new Date(),'Y-m'),
						enddate:Ext.Date.format(new Date(),'Y-m')
					}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',hidden:true,
					items:[
						'->',
						{xtype:'reconfigurebutton',
							items:[
								{text:'出入金',value:'me',pressed:true}
							]
						},
						'->'
					]
				}
			],
			multiSelect:false,
			config:{
				columns:{
					me:[
						{xtype:'rownumberer'},
						{text:'账户',xtype:'templatecolumn',dataIndex:'objects',minWidth:150,tpl:'{objects}<r>{objects_tip}</r>',flex:1,summaryType:'count'},
						{text:'交易量',dataIndex:'trade_volume',align:'right',width:100,renderer:'returnSalesVolume',summaryType:'sum',summaryRenderer:'returnSalesVolume'},
						{text:'入金',dataIndex:'funds_deposit',tdCls:'x-ui-text-green',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'出金',dataIndex:'funds_withdrawal',tdCls:'x-ui-text-red',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'},
						{text:'净入金',dataIndex:'funds_net_deposit',tdCls:'x-ui-active x-ui-text-blue',align:'right',width:100,renderer:'returnShowMoney',summaryType:'sum',summaryRenderer:'returnShowMoney'}
					]
				}
			},
			features:[{ftype:'summary',dock:'bottom'}],
			listeners:{
				sortchange:'onMateGridChartSortChange',
				selectionchange:'onMateGridChartSelectionChange'
			}
		},
		{xtype:'mate.chart',mateParameters:{
			type:'statistics',
			menu:{
				me:{
					checked:0,
					items:[
						{text:'交易量',field:'trade_volume',title:'个人业绩·代理交易量统计'},
						{text:'入金',field:'funds_deposit',title:'个人业绩·入金统计'}, 
						{text:'出金',field:'funds_withdrawal',title:'个人业绩·出金统计'}, 
						{text:'净入金',field:'funds_net_deposit',title:'个人业绩·净入金统计'}
					]
				}
			}
		}}
	]
});







