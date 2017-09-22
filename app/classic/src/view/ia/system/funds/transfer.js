﻿Ext.define('APP.view.ia.system.funds.transfer',{
    extend:'Ext.form.Panel',
    controller:'ia.system.funds',
	width:680,
	items:[
		{collapsible:false,border:false,items:[
			{columnWidth:1,items:[
				{xtype:'checkbox',boxLabel:'启用转账功能',name:'enable',reference:'enableReference'},
				{xtype:'box',userCls:'x-ui-message x-ui-message-warning',html:'<b>警告：</b>「账户转账」功能已被禁用...',bind:{hidden:'{enableReference.checked}'}}
			]}
		]},
		{collapsible:false,title:'配置项',bind:{hidden:'{!enableReference.checked}'},items:[
			{columnWidth:1,items:[
				{fieldLabel:'允许转入',xtype:'checkboxarraygroup',layout:'hbox',name:'mode',
					defaults:{xtype:'checkbox',width:100},
					items:[
						{boxLabel:'同名账户'},
						{boxLabel:'下级账户'},
						{boxLabel:'其它账户'}
					]
				}
			]},
			{columnWidth:1,height:20},
			{columnWidth:1,items:[
				{fieldLabel:'功能控制',xtype:'checkboxarraygroup',layout:'vbox',name:'control',
					defaults:{xtype:'container',layout:'hbox',defaults:{xtype:'checkbox',width:100}},
					items:[
						{items:[
							{boxLabel:'需效验码'},
							{boxLabel:'需要审核'}
						]},
						{items:[
							{boxLabel:'短信通知'},
							{boxLabel:'邮件通知'},
							{boxLabel:'微信通知'}
						]}
					]
				}
			]}
		]}
	],
	mateParameters:{
		url:Boot.appUrl('/trade/settings/getTransfer.do')
	},
	listeners:{afterrender:'onMateFormLoadData'},
	buttons:['->',
		{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
			mateParameters:{
				url:Boot.appUrl('/trade/settings/updateTransfer.do')
			},
			handler:'onMateFormSubmit'
		},
		{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
	]
});