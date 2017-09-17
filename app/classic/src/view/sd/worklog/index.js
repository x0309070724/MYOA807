Ext.define('APP.view.sd.worklog.index',{
    extend:'Ext.Container',
    controller:'sd.worklog',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'sd.worklog.record',reference:'logGrid',title:'日志记录',width:600},
		{xtype:'panel',reference:'logDetail',flex:1,margin:'0 0 0 1',layout:'fit',
			title:'日志内容',
			defaults:{border:false},
			items:[
				{xtype:'sd.worklog.form'}
			]
		}
		//{xtype:'sd.worklog.form',title:'写日志',flex:1,margin:'0 0 0 1'}
	],
	listeners:{
	}
});
