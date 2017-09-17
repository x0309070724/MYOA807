Ext.define('APP.view.sd.worklog.preview',{
	extend:'Ext.Panel',
	alias:'widget.sd.worklog.preview',
	layout:{type:'vbox',align:'stretch'},
	dockedItems:[
		{dock:'top',xtype:'toolbar',
			items:[
				'->',
				{iconCls:'f-mt mt-creat',text:'写日志',handler:'onRecordAdd'},
				'-',
				{iconCls:'f-mt mt-creat',text:'编辑',handler:'onRecordEdit'},
				'-',
				{iconCls:'f-mt mt-remove',text:'删除',handler:'onRecordDelete'}
			]
		}
	],
	tpl:[
		'<div>日期：{date}</div>',
		'<div>今日 已完成</div>',
		'<div>{completed}</div>',
		'<div>今日 未完成</div>',
		'<div>{undone}</div>',
		'<div>遇到的问题</div>',
		'<div>{problem}</div>',
		'<div>明日计划</div>',
		'<div>{plan}</div>'
	],
//	bbar:[
//		'->',
//		{xtype:'button',text:'保存结果',scale:'large',width:300,handler:'onTrackUpdate'},
//		'->'
//	]
//			bbar:[
//				'->',
//				{xtype:'submitbutton',text:'',
//					handler:'onMateFormSubmit',
//					mateParameters:{
//						url:Boot.appUrl('/sys/notice/message/sendMail.do'),
//						callback:function(formValues,data){
//						}
//					}
//				},
//				'->'
//			]					
});
