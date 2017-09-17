Ext.define('APP.view.sd.sales.care.dev.sh',{
    extend:'Ext.grid.Panel',
	alias:'widget.sd.sales.care.dev.sh',
	title:'SH',
	store:{
		type:'sales.userData',
		type:'sales.data',
		autoLoad:true,
		proxy:{extraParams:{app:'care',type:'SH'}}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'fieldSalesTrack',name:'track'},
					{emptyText:'评星...',xtype:'comboRating',name:'rating',width:100},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:120}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'客户',xtype:'templatecolumn',dataIndex:'name',tpl:'{name:nullToNA}<r><b>{login}</b></r>',minWidth:120,flex:1},
		//{text:'区域',xtype:'templatecolumn',dataIndex:'province',tpl:'{province} {city}',width:110},
		{text:'评星',xtype:'widgetcolumn',dataIndex:'rating',width:88,widget:{xtype:'rating',userCls:'x-ui-default'}},					
		{text:'净入金',dataIndex:'funds_deposit',width:80,tdCls:'x-ui-text-blue',align:'right',renderer:'returnShowMoney'},
		{text:'交易量',dataIndex:'trade_volume',width:80,align:'right',renderer:'returnNumber'},
		//{text:'已开户',dataIndex:'track_staff_day',width:80,align:'right',renderer:'returnDays'},
		{text:'已跟进',dataIndex:'track_day',width:88,renderer:'returnSalesCareTrackHistory'},
		{text:'最新状态',dataIndex:'track_time',width:100,renderer:'returnSalesCareTrackTime'}
	],
	viewConfig:{enableTextSelection:false},
	listeners:{ 
		selectionchange:'onDataChange',
		itemdblclick:'onCareUpdateClick'
	}
});




