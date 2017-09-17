Ext.define('APP.view.account.update.password',{
    extend:'Ext.window.Window',
	xtype:'accountUpdatePassword',
    controller:'account',
	modal:true,
	maximizable:false,
	autoShow:true,
	title:'更改登录密码',
	width:680,
	items:[
		{xtype:'form',userCls:'x-ui-form-large',viewModel:true,
			layout:{type:'hbox',align:'stretch'},
			url:Boot.appUrl('/account/updatePassword.do'),
			bodyPadding:'20 60 20 20',
			items:[
				{xtype:'container',width:160,items:[
					{xtype:'box',userCls:'x-ui-icon f-mt mt-password'}
				]},
				{xtype:'container',layout:'anchor',flex:1,defaults:{allowBlank:false},items:[
					//{fieldLabel:'原密码',xtype:'passwordfield',name:'passwordOld'},
					//{xtype:'box',height:20},
					{fieldLabel:'新密码',xtype:'passwordstrengthfield',name:'passwordNew',vtype:'password',id:'passwordNew',listeners:{validitychange:'onMateFieldValidate',blur:'onMateFieldValidate'}},
					{fieldLabel:'重复一次',xtype:'passwordstrengthfield',name:'passwordNew2',vtype:'passwordRepeat',initialPassField:'passwordNew'},
					{fieldLabel:'校验码',xtype:'verifycodefield',verifyData:{app:'main',key:102102201}},
					{text:'提交',xtype:'submitbutton',handler:'onUpdateAccountSubmit'}
				]}
			]
		}
	]
});





