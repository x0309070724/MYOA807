Ext.define('APP.view.sd.sales.care.dev.index',{
    extend:'Ext.Container',
    controller:'sd.sales',
	layout:{type:'hbox',align:'stretch'},
	padding:1,
	viewModel:true,
	items:[
		{xtype:'tabpanel',tabPosition:'left',tabRotation:2,width:660,reference:'devTab',
			items:[
				{xtype:'sd.sales.care.dev.sh'},
				{xtype:'sd.sales.care.dev.ib'}
			]
		},	
		{xtype:'container',disabled:true,margin:'0 1',minWidth:500,flex:1,
			reference:'devPanel',
			layout:{type:'vbox',align:'stretch'},
			items:[
				{xtype:'sd.sales.care.dev.form',height:380,
					reference:'devForm',
					bind:{title:'客户维护：{selection.name} {selection.mobile}'}
				},
				{xtype:'sd.sales.care.dev.history',flex:1,
					reference:'devHistory',
					bind:{title:'维护历史：{selection.name} {selection.mobile}'}
				}
			]
		},
		{xtype:'sd.sales.care.dev.today',width:440,
			reference:'devToday',
			title:'今日维护记录 · '+Ext.Date.format(new Date(),'Y-m-d')
		},
	]
});












