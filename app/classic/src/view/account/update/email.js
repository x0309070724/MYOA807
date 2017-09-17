Ext.define('APP.view.account.update.email',{
    extend:'Ext.window.Window',
	xtype:'accountUpdateEmail',
    controller:'account',
	modal:true,
	maximizable:false,
	autoShow:true,
	title:'更换Email',
	width:680,
	items:[
		{xtype:'form',userCls:'x-ui-form-large',viewModel:true,
			layout:{type:'hbox',align:'stretch'},
			url:Boot.appUrl('/account/updateEmail.do'),
			bodyPadding:'20 60 20 20',
			items:[
				{xtype:'container',width:160,items:[
					{xtype:'box',userCls:'x-ui-icon f-mt mt-email'}
				]},
				{xtype:'container',layout:'anchor',flex:1,defaults:{allowBlank:false},items:[
					{fieldLabel:'原 Email',xtype:'textfield',name:'emailOld',bind:{value:'{account.email}'},allowBlank:true,readOnly:true},
					{xtype:'box',height:20},
					{fieldLabel:'新 Email',xtype:'textfield',vtype:'email',name:'emailNew',allowBlank:false},
					//{fieldLabel:'安全密码',xtype:'passwordfield',name:'passwordSafe'},
					{fieldLabel:'校验码',xtype:'verifycodefield',verifyData:{app:'main',key:102102204}},
					{text:'提交',xtype:'submitbutton',handler:'onUpdateAccountSubmit'}
				]}
			]
		}
	]
});





