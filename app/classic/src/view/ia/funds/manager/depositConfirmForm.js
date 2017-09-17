Ext.define('APP.view.ia.funds.manager.depositConfirmForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerDepositConfirmForm',
	width:880,
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
		{title:'入金信息',items:[
			{columnWidth:.5,items:[
				{fieldLabel:'账号',xtype:'fieldcontainer',layout:'hbox',items:[
					{emptyText:'账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,enableKeyEvents:true,listeners:{blur:'onFieldLoginEnter'},bind:{readOnly:'{form.audit}'},flex:.35},
					{emptyText:'方式',xtype:'comboGroupname',code:'deposit',name:'groupid',allowBlank:false,bind:{readOnly:'{form.audit}'},flex:.65,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:.5,items:[
				{fieldLabel:'金额',xtype:'fieldcontainer',layout:'hbox',items:[
					{emptyText:'金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,enableKeyEvents:true,reference:'fieldAmountUsd',publishes:'value',bind:{readOnly:'{form.audit}'},flex:.35},
					{xtype:'box',bind:{html:'<span class="x-ui-text-green">{fieldAmountUsd.value:money(2)}</span> * <span class="x-ui-text-blue">{rate.ask:number("0,0.0000")}</span> = <strong class="x-ui-text-red">{amountCny:cnyMoney(2)}</b>'},flex:.65,margin:'3 0 0 5'}
				]}
			]}
		]},
		{title:'账户信息',xtype:'identityFieldSet'},
		{title:'账户资产',xtype:'assetsFieldSet'}
	]
});