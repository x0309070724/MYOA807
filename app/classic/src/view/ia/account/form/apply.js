﻿Ext.define('APP.view.ia.account.form.apply',{
    extend:'Ext.form.Panel',
	xtype:'iaAccountFormApply',
	width:880,
	items:[
		{title:'联络信息',items:[
			{columnWidth:.4,items:[
				{fieldLabel:'Email',exmpyText:'Email',xtype:'textfield',name:'email',vtype:'email',allowBlank:false,bind:{readOnly:'{form.audit}'}}
			]},
			{columnWidth:.3,items:[
				{fieldLabel:'手机',exmpyText:'手机',xtype:'textfield',name:'mobile',vtype:'mobile',allowBlank:false,bind:{readOnly:'{form.audit}'}}
			]},
			{columnWidth:.3,items:[
				{fieldLabel:'QQ',exmpyText:'QQ',xtype:'textfield',name:'qq',vtype:'qq',flex:.5,margin:'0 0 0 5',bind:{readOnly:'{form.audit}'}}
			]}
		]},
		{xtype:'identityFieldSet'},
		{xtype:'bankCardFieldSet'}
	]
});
