﻿Ext.define('APP.view.ia.system.account.agreementForm',{
    extend:'Ext.form.Panel',
	xtype:'iaSystemAccountAgreementForm',
    controller:'ia.system.account',
	frame:false,
	width:1000,
	items:[
		{collapsible:false,border:false,items:[
			{columnWidth:.5,items:[
				{xtype:'combo',labelAlign:'top',fieldLabel:'协议类型',name:'type',allowBlank:false,
					store:{
						data:[
							{id:0,name:'模拟账户'},
							{id:1,name:'交易账户'},
							{id:2,name:'代理账户'}
						]
					},
					valueField:'id',
					displayField:'name'
				}
			]}
		]},
		{xtype:'panel',layout:'accordion',defaults:{xtype:'panel',layout:'anchor',bodyPadding:10},items:[
			{title:'简体编辑',items:[
				{emptyText:'协议名称',xtype:'textfield',name:'title_cn'},
				{hideLabel:true,xtype:'htmleditor',margin:0,height:240,name:'content_cn'}
			]},
			{title:'繁体编辑',defaults:{allowBlank:false},fieldDefaults:{allowBlank:false},items:[
				{emptyText:'协议名称',xtype:'textfield',name:'title_hk'},
				{hideLabel:true,xtype:'htmleditor',margin:0,height:240,name:'content_hk'}
			]},
			{title:'英文编辑',defaults:{allowBlank:false},fieldDefaults:{allowBlank:false},items:[
				{emptyText:'协议名称',xtype:'textfield',name:'title_en'},
				{hideLabel:true,xtype:'htmleditor',margin:0,height:240,name:'content_en'}
			]}
		]}
	]
});