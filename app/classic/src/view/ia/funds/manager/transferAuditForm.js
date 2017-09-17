﻿Ext.define('APP.view.ia.funds.manager.transferAuditForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerTransferAuditForm',
    controller:'ia.funds',
	width:680,
	items:[
		{title:'转账信息',items:[
			{columnWidth:.34,items:[
				{fieldLabel:'转出账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,readOnly:true}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'转入账号',xtype:'numberfield',name:'transfer',vtype:'login',allowBlank:false,readOnly:true}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'转出金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,readOnly:true}
			]}
		]},
		{title:'审核结果',xtype:'iaFundsFieldsAudit'}
	]
});
