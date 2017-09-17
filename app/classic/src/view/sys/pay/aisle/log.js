Ext.define('APP.view.sys.pay.aisle.log',{
    extend:'Ext.grid.Panel',
    controller:'sys.pay',
	store:{
		type:'cross',
		fields:[
			{name:'id',type:'int'},
			{name:'logtime',type:'date'}
		],
		sorters:[{property:'id',direction:'DESC'}],
		autoLoad:true,
		proxy:{
			url:Boot.appUrl('/sd/system/pay/getPaymentRecords.do'),
			extraParams:{}
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'searchbar',
				fields:[
					{xtype:'startdatefield',name:'startdate',emptyText:'日期从'},
					{xtype:'enddatefield',name:'enddate',emptyText:'日期至'}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]},
		{dock:'bottom',xtype:'pagingbar'}
	],
	columns:[
		{xtype:'rownumberer'},
		{text:'商户',dataIndex:'merchantno',width:150},
		{text:'时间',dataIndex:'logtime',width:150,renderer:'returnWrapDate'},
		{text:'内容',xtype:'templatecolumn',width:500,flex:1,tpl:'<b>{title}</b><br/><span class="mate-text-grey">{content}</span>'},
		{text:'地域',xtype:'templatecolumn',width:300,tpl:'<b>{ip}</b><br/><span class="mate-text-grey">{iplookup}</span>'},
		{text:'来源',dataIndex:'referer',width:300}
		//{text:'操作人',dataIndex:'operator',width:100}
	]
});
















