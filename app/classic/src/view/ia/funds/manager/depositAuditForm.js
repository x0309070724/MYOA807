Ext.define('APP.view.ia.funds.manager.depositAuditForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerDepositAuditForm',
	width:680,
    viewModel:{
		formulas:{
			amountCny:{
				get:function(get){
					return get('fieldAmountUsd.value')*get('rate.ask');
				}
			}
		}
    },
	items:[
		{xtype:'autocomplete'},
		{title:'入金信息',items:[
			{columnWidth:1,items:[
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'账号',items:[
					{emptyText:'账号',xtype:'numberfield',name:'login',vtype:'login',reference:'fieldLogin',publishes:'value',allowBlank:false,readOnly:true,width:260},
					{emptyText:'方式',xtype:'comboGroupname',code:'deposit',name:'groupid',allowBlank:false,readOnly:true,flex:.65,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:1,items:[
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'金额',items:[
					{emptyText:'金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,readOnly:true,enableKeyEvents:true,reference:'fieldAmountUsd',publishes:'value',width:260},
					{xtype:'box',bind:{html:'<span class="x-ui-text-green">{fieldAmountUsd.value:money(2)}</span> * <span class="x-ui-text-blue">{rate.ask:number("0,0.0000")}</span> = <strong class="x-ui-text-red">{amountCny:cnyMoney(2)}</b>'},flex:.65,margin:'3 0 0 5'}
				]}
			]}
		]},
		{title:'审核结果',xtype:'iaFundsFieldsAudit'}
	]
});