Ext.define('APP.view.ia.system.global.feedback',{
    extend:'Ext.form.Panel',
    controller:'ia.system.global',
	width:680,
	items:[
		{title:'业务反馈设置',collapsible:false,items:[
			{columnWidth:.2,items:[
				{labelAlign:'top',fieldLabel:'短信通知',xtype:'textarea',name:'mobile',emptyText:'手机',height:200}
			]},
			{columnWidth:.4,margin:'0 10',items:[
				{labelAlign:'top',fieldLabel:'邮件通知',xtype:'textarea',name:'email',emptyText:'Email',height:200}
			]},
			{columnWidth:.4,items:[
				{labelAlign:'top',fieldLabel:'微信通知',xtype:'textarea',name:'wechart',emptyText:'OPENID',height:200,readOnly:true}
			]}
		]}
	],
	mateParameters:{
		url:Boot.appUrl('/system/settings/getFeedback.do')
	},
	listeners:{afterrender:'onMateFormLoadData'},
	buttons:['->',
		{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
			mateParameters:{
				url:Boot.appUrl('/system/settings/updateFeedback.do')
			},
			handler:'onMateFormSubmit'
		},
		{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
	]
});
