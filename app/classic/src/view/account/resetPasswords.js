Ext.define('APP.view.account.resetPasswords',{
    extend:'Ext.window.Window',
	xtype:'resetPasswords',
    controller:'account',
    iconCls:'f-mt mt-password',
	title:'更改初始密码',
    width:680,
	modal:true,
	closable:false,
	maximizable:false,
	autoShow:true,
	items:[
		{xtype:'form',
			url:Boot.appUrl('/account/resetPasswords.do'),
			viewModel:true,
			password:true,
			items:[
				{xtype:'tbtext',cls:'x-ui-warning',margin:'0 0 10 0',html:'由于初始密码尚未修改，系统强制性要求您修改密码.<br/>密码长度应大于8位，并且由数字、字母或特殊字符任意组合.且登录密码不能与安全密码一致.'},
				{xtype:'container',layout:'hbox',defaults:false,items:[
					{xtype:'fieldset',flex:1,title:'登录密码',defaultType:'textfield',layout:'anchor',collapsible:false,defaults:{anchor:'98%'},
						items:[
							{fieldLabel:'原密码',xtype:'textfield',inputType:'password',name:'passwordOld',allowBlank:false},
							{fieldLabel:'新密码',xtype:'passwordstrengthfield',name:'passwordNew',vtype:'password',id:'passwordNew',listeners:{validitychange:'onMateFieldValidate',blur:'onMateFieldValidate'},allowBlank:false},
							{fieldLabel:'确认一次',xtype:'passwordstrengthfield',name:'passwordNew2',vtype:'passwordRepeat',initialPassField:'passwordNew',allowBlank:false}
						]
					},
					{xtype:'component',width:10},
					{xtype:'fieldset',flex:1,title:'安全密码',defaultType:'textfield',layout:'anchor',collapsible:false,defaults:{anchor:'98%'},
						items:[
							{fieldLabel:'原密码',xtype:'textfield',inputType:'password',name:'passwordSafeOld',allowBlank:false},
							{fieldLabel:'新密码',xtype:'passwordstrengthfield',name:'passwordSafeNew',vtype:'password',id:'passwordSafeNew',listeners:{validitychange:'onMateFieldValidate',blur:'onMateFieldValidate'},allowBlank:false},
							{fieldLabel:'确认一次',xtype:'passwordstrengthfield',name:'passwordSafeNew2',vtype:'passwordRepeat',initialPassField:'passwordSafeNew',allowBlank:false}
						]
					}
				]}
			],
			buttons:[
				'->',
				{text:'确认提交',scale:'large',width:200,handler:'onUpdateAccountSubmit'},
				'->'
			]
		}

	]
});


