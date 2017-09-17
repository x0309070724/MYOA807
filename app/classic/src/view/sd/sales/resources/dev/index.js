Ext.define('APP.view.sd.sales.resources.dev.index',{
    extend:'Ext.Container',
    controller:'sd.sales',
	layout:{type:'hbox',align:'stretch'},
	padding:1,
	viewModel:true,
	items:[
		{xtype:'tabpanel',tabPosition:'left',tabRotation:2,width:640,reference:'devTab',
			items:[
				{xtype:'sd.sales.resources.dev.data',title:'我的电资'}
			]
		},	
		{xtype:'container',disabled:true,margin:'0 1',minWidth:500,flex:1,
			reference:'devPanel',
			layout:{type:'vbox',align:'stretch'},
			items:[
				{xtype:'sd.sales.resources.dev.form',height:380,
					reference:'devForm',
					bind:{title:'电资开发：{selection.name} {selection.mobile}'}
				},
				{xtype:'sd.sales.resources.dev.history',flex:1,
					reference:'devHistory',
					bind:{title:'销售历史：{selection.name} {selection.mobile}'}
				}
			]
		},
		{xtype:'sd.sales.resources.dev.today',width:440,
			reference:'devToday',
			title:'今日销售记录 · '+Ext.Date.format(new Date(),'Y-m-d')
		},
		
		
	]
});












