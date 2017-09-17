Ext.define('APP.view.sd.worklog.form',{
	extend:'Ext.form.Panel',
	alias:'widget.sd.worklog.form',
	layout:{type:'vbox',align:'stretch'},
	frame:false,
	dockedItems:[
		{dock:'bottom',xtype:'toolbar',items:[
			'->',
			{xtype:'button',text:'保存日志',scale:'large',width:300,
				mateParameters:{
					url:Boot.appUrl('/system/worklog/updateWorkLog.do'),
					callback:function(formValues,data){
						store.reload();
					}
				},
				handler:'onMateFormSubmit'
			
			},
			'->'
		]}
	],
	items:[
		{xtype:'hiddenfield',name:'id',value:0},
		{xtype:'fieldcontainer',layout:{type:'hbox',align:'stretch'},items:[
			{emptyText:'日志日期',xtype:'datefield',name:'date',width:160,allowBlank:false}
//			{xtype:'radiogroup',columns:2,name:'from',allowBlank:false,width:200,margin:'0 0 0 5',hidden:true,bind:{hidden:'{fieldIdx.value!=0}',disabled:'{fieldIdx.value!=0}'},
//				items:[
//					{boxLabel:'From OA',inputValue:'OA',checked:true},
//					{boxLabel:'From CRM',inputValue:'CRM'}
//				]
//			}
		]},

		{xtype:'fieldcontainer',layout:{type:'hbox',align:'stretch'},flex:1,
			defaults:{labelAlign:'top',xtype:'htmleditor',enableFont:false,enableSourceEdit:false,enableLinks:false,allowBlank:false,minHeight:300,flex:1},
			items:[
				{fieldLabel:'今日 已完成',name:'completed'},
				{fieldLabel:'今日 未完成',name:'undone',margin:'0 0 0 5'}
			]
		},
		{xtype:'fieldcontainer',layout:{type:'hbox',align:'stretch'},flex:1,
			defaults:{labelAlign:'top',xtype:'htmleditor',enableFont:false,enableSourceEdit:false,enableLinks:false,allowBlank:false,minHeight:300,flex:1},
			items:[
				{fieldLabel:'遇到问题',name:'problem'},
				{fieldLabel:'明日计划',name:'plan',margin:'0 0 0 5'}
			]
		}
	]
});
