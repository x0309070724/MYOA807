Ext.define('APP.view.rd.trade.history.funds',{
    extend:'Ext.Container',
    controller:'rd.trade',
	layout:{type:'border',align:'stretch',padding:3},
	items:[
		{xtype:'panel',region:'west',collapsible:false,split:true,
			layout:{type:'vbox',align:'stretch'},
			width:180,
			minWidth:150,
			maxWidth:300,
			items:[
				{xtype:'menu',title:'分类检索',
					floating:false,
					userCls:'x-ui-nav-menu',
					defaults:{iconCls:'f-mt mt-right-arrow'},
					listeners:{click:'onMateMenuReloadStore'},
					items:[
						{text:'入金记录',params:{menu:'deposit'}},
						{text:'出金记录',params:{menu:'withdrawal'}},
						{text:'全部',params:{menu:'funds'},userCls:'x-menu-item-selected'}
					]
				}
			]
		},
		{xtype:'grid',region:'center',
			store:{
				type:'rdTradeHistory',
				autoLoad:true,
				grouper:{
					groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d')},
					property:'close_time',
					direction:'DESC'
				},		
				proxy:{extraParams:{menu:'funds'}}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
							{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
							{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
							{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
						]
					},
					'->',
					//{iconCls:'f-mt mt-excel',tooltip:'导出',handler:'onMateExportToExcel'},
					{xtype:'refreshbutton'}
				]},
				{dock:'bottom',xtype:'pagingbar'}
			],
			forceFit:true,
			columns:[
				{xtype:'rownumberer'},
				{text:'日期',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d'},
				{text:'交易账号',dataIndex:'login',renderer:'returnTradeLogin',minWidth:200},
				{text:'订单号',dataIndex:'order',xtype:'templatecolumn',tpl:'#{order}',minWidth:140},
				{text:'类型',dataIndex:'cmd',renderer:'returnTradeCmd',minWidth:160},
				{text:'原因',dataIndex:'reason',renderer:'returnTradeReason',minWidth:100},
				{text:'时间',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d H:i:s',minWidth:180},
				{text:'金额',dataIndex:'profit',tdCls:'x-ui-active x-ui-text-bold',align:'right',minWidth:120,renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnColorMoney'},
				{text:'注释',dataIndex:'comment',renderer:'returnMore',minWidth:300}
			],
			features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
			listeners:{ 
				itemdblclick:'onTradeDetail'
			}
		}
	]
});
















