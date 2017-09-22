﻿Ext.define('APP.view.ia.funds.manager.creditAuditForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerCreditAuditForm',
	width:680,
	items:[
		{title:'信用信息',items:[
			{columnWidth:.34,items:[
				{fieldLabel:'账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,readOnly:true}
			]},
			{columnWidth:.33,items:[
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'金额',items:[
					{xtype:'numberfield',name:'amount_usd',allowBlank:false,readOnly:true,flex:.55},
					{xtype:'comboCreditType',name:'direction',flex:.45,margin:'0 0 0 5',readOnly:true}
				]}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'到期',xtype:'datefield',name:'expiration',format:'Y-m-d',allowBlank:false,readOnly:true}		
			]}
		]},
		{title:'审核结果',xtype:'iaFundsFieldsAudit'}
	]
});