﻿Ext.define('APP.view.sd.staff.funds.record',{
    extend:'Ext.Panel',
	layout:'fit',
    controller:'ia.funds',
	defaults:{border:false},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'segmentedbutton',defaults:{minWidth:60},reference:'funds',
				items:[
					{text:'入金',widget:'sd.staff.funds.recordDeposit',pressed:true},
					{text:'出金',widget:'sd.staff.funds.recordWithdrawal'},
					{text:'信用',widget:'sd.staff.funds.recordCredit'},
					{text:'转账',widget:'sd.staff.funds.recordTransfer'}
				],
				listeners:{
					change:'onMateChangeView'
				}
			},'-',
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',hidden:true,
						bind:{hidden:'{funds.value!=3}',disabled:'{funds.value!=3}'},
						segmented:{
							name:'direction',defaults:{minWidth:60},
							items:[
								{text:'转.入',value:1},
								{text:'转出',value:2},
								{text:'全部',value:'',pressed:true}
							]
						}
					},
					{emptyText:'入金类型...',xtype:'comboGroupname',name:'groupid',code:'deposit',hidden:true,bind:{hidden:'{funds.value!=0}',disabled:'{funds.value!=0}'}},
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					//{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'关键字...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	]
});
