Ext.define('APP.view.ia.account.form.login',{
    extend:'Ext.form.Panel',
	xtype:'iaAccountFormLogin',
    controller:'ia.account',
	width:680,
	viewModel:true,
	layout:{type:'hbox',align:'stretch'},
	userCls:'x-ui-form-large',
	bodyPadding:'20 60 20 20',
	items:[
		{xtype:'container',width:160,items:[
			{xtype:'box',userCls:'x-ui-icon f-mt mt-password-safe'}
		]},
		{xtype:'container',layout:'anchor',flex:1,defaults:{allowBlank:false},items:[
			{fieldLabel:'交易账号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false,readOnly:true},
			{xtype:'checkboxgroup',hideEmptyLabel:true,fieldLabel:'重置项',columns:2,allowBlank:false,defaults:{width:120},items:[
				{boxLabel:'主密码',name:'isPassword',inputValue:1,checked:true},
				{boxLabel:'投资人密码',name:'isPasswordInvestor',inputValue:1},
				{boxLabel:'电话密码',name:'isPasswordPhone',inputValue:1},
				{boxLabel:'安全密码',name:'isPasswordSafe',inputValue:1}
			]},
			{xtype:'noticefield',values:[1,0,0]},
			{xtype:'container',layout:'anchor',margin:'20 0 0 0',items:[
				{fieldLabel:'安全校验',xtype:'passwordsafe',name:'passwordSafe',allowBlank:false},
				{xtype:'box',bind:{html:'请输入 <span class="x-ui-text-red">账户：{account.login}</span> 的安全密码. （6位数字）'},margin:'-5 0 0 74'}
			]}
		]}
	]
});
