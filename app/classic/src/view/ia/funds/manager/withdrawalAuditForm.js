Ext.define('APP.view.ia.funds.manager.withdrawalAuditForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerWithdrawalAuditForm',
    controller:'ia.funds',
	width:680,
    viewModel:{
		formulas:{
			amountCny:{
				get:function(get){
					return get('fieldAmountUsd.value')*get('rate.bid');
				}
			}
		}
    },
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			items:[
				{xtype:'autocomplete'},
				{title:'出金信息',items:[
					{columnWidth:1,items:[
						{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'账号',items:[
							{emptyText:'账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,readOnly:true,width:260},
							{emptyText:'方式',xtype:'comboGroupname',code:'withdrawal',name:'groupid',value:803001,readOnly:true,flex:.65,margin:'0 0 0 5'}
						]}
					]},
					{columnWidth:1,items:[
						{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'金额',items:[
							{emptyText:'金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,readOnly:true,enableKeyEvents:true,reference:'fieldAmountUsd',publishes:'value',width:160},
							{emptyText:'币种',xtype:'textfield',name:'bank_currency',allowBlank:false,readOnly:true,width:95,margin:'0 0 0 5'},
							{xtype:'box',bind:{html:'<span class="x-ui-text-green">{fieldAmountUsd.value:money(2)}</span> * <span class="x-ui-text-blue">{rate.bid:number("0,0.0000")}</span> = <strong class="x-ui-text-red">{amountCny:cnyMoney(2)}</b>'},flex:.65,margin:'3 0 0 5'}
						]}
					]}
				]},
				{title:'审核结果',xtype:'iaFundsFieldsAudit'}
			]
		});  
		this.callParent();
	}			
});
