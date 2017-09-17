Ext.define('APP.view.ia.funds.manager.withdrawalConfirmForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerWithdrawalConfirmForm',
	width:880,
    viewModel:{
		formulas:{
			amountCny:{
				get:function(get){
					return get('fieldAmountUsd.value')*get('rate.bid');
				}
			}
		}
    },
	items:[
		{title:'出金信息',items:[
			{columnWidth:.5,items:[
				{fieldLabel:'账号',xtype:'fieldcontainer',layout:'hbox',items:[
					{emptyText:'账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,enableKeyEvents:true,listeners:{blur:'onFieldLoginEnter'},bind:{readOnly:'{form.audit}'},flex:.35},
					{emptyText:'方式',xtype:'comboGroupname',code:'withdrawal',name:'groupid',value:803001,readOnly:true,flex:.65,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:.5,items:[
				{fieldLabel:'金额',xtype:'fieldcontainer',layout:'hbox',items:[
					{emptyText:'金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,enableKeyEvents:true,reference:'fieldAmountUsd',publishes:'value',bind:{readOnly:'{form.audit}'},flex:.35},
					{xtype:'box',bind:{html:'<span class="x-ui-text-green">{fieldAmountUsd.value:money(2)}</span> * <span class="x-ui-text-blue">{rate.bid:number("0,0.0000")}</span> = <strong class="x-ui-text-red">{amountCny:cnyMoney(2)}</b>'},flex:.65,margin:'3 0 0 5'}
				]}
			]}
		]},
		{title:'账户信息',xtype:'identityFieldSet'},
		{title:'账户资产',xtype:'assetsFieldSet'},
		{title:'银行卡信息',xtype:'bankCardFieldSet'}
	]
});
