Ext.define('APP.view.ia.funds.manager.creditConfirmForm',{
    extend:'Ext.form.Panel',
	xtype:'iaFundsManagerCreditConfirmForm',
	width:880,
    viewModel:{
		formulas:{
			cnyMoney:{
				get:function(get){
					return Ext.util.Format.number(get('usdField.value')*get('rate.bid'),'0.00');
				}
			}
		}
    },
	items:[
		{title:'信用信息',items:[
			{columnWidth:.34,items:[
				{fieldLabel:'账号',emptyText:'账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,enableKeyEvents:true,listeners:{blur:'onFieldLoginEnter'},bind:{readOnly:'{form.audit}'}}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'金额',xtype:'fieldcontainer',layout:'hbox',items:[
					{emptyText:'金额',xtype:'numberfield',name:'amount_usd',allowBlank:false,enableKeyEvents:true,reference:'usdField',publishes:'value',bind:{readOnly:'{form.audit}'},flex:.55},
					{emptyText:'方式',xtype:'comboCreditType',name:'direction',value:1,flex:.45,margin:'0 0 0 5',bind:{readOnly:'{form.audit}'},listeners:{
							change:function(combo,newValue,oldValue){
								var f=combo.up('form').getForm();
									f.findField('expiration').setHidden(newValue==2).setDisabled(newValue==2);
							}
						}
					}
				]}
			]},
			{columnWidth:.33,items:[
				{fieldLabel:'到期',emptyText:'到期',xtype:'datefield',name:'expiration',format:'Y-m-d',submitFormat:'time',minValue:new Date(),allowBlank:false,bind:{readOnly:'{form.audit}'}}		
			]}
		]},
		{title:'账户信息',xtype:'identityFieldSet'},
		{title:'账户资产',xtype:'assetsFieldSet'}
	]
});
