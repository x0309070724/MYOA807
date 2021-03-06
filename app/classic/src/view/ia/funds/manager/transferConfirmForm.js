﻿Ext.define('APP.view.ia.funds.manager.transferConfirmForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerTransferConfirmForm',
	width:880,
	items:[
		{title:'转账信息',items:[
			{columnWidth:.34,items:[
				{fieldLabel:'转出账号',emptyText:'转出账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,enableKeyEvents:true,listeners:{blur:'onFieldLoginEnter'},bind:{readOnly:'{form.audit}'}}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'转入账号',emptyText:'转入账号',xtype:'numberfield',name:'transfer',vtype:'login',allowBlank:false,bind:{readOnly:'{form.audit}'}}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'转出金额',emptyText:'转出金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,bind:{readOnly:'{form.audit}'}}
			]}
		]},
		{title:'账户信息',xtype:'identityFieldSet'},
		{title:'账户资产',xtype:'assetsFieldSet'}
	]
});
