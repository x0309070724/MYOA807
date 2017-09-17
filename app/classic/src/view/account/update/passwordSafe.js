Ext.define('APP.view.account.update.passwordSafe',{
    extend:'Ext.window.Window',
	xtype:'accountUpdatePasswordSafe',
    controller:'account',
	modal:true,
	maximizable:false,
	autoShow:true,
	title:'更改安全密码',
	width:680,
	items:[
		{xtype:'form',userCls:'x-ui-form-large',viewModel:true,
			layout:{type:'hbox',align:'stretch'},
			url:Boot.appUrl('/account/updatePasswordSafe.do'),
			bodyPadding:'20 60 20 20',
			items:[
				{xtype:'container',width:160,items:[
					{xtype:'box',userCls:'x-ui-icon f-mt mt-password-safe'}
				]},
				{xtype:'container',layout:'anchor',flex:1,defaults:{allowBlank:false},items:[
					//{fieldLabel:'原密码',xtype:'passwordfield',name:'passwordOld'},
					//{xtype:'box',height:20},
					{fieldLabel:'新密码',xtype:'passwordfield',name:'passwordNew',id:'passwordNew',listeners:{validitychange:'onMateFieldValidate',blur:'onMateFieldValidate'}},
					{fieldLabel:'重复一次',xtype:'passwordfield',name:'passwordNew2',vtype:'passwordRepeat',initialPassField:'passwordNew'},
					{fieldLabel:'校验码',xtype:'verifycodefield',verifyData:{app:'main',key:102102202}},
					{text:'提交',xtype:'submitbutton',handler:'onUpdateAccountSubmit'}
				]}
			]
		}
	]
});





