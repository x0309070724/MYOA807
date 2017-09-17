Ext.define('APP.view.account.update.mobile',{
    extend:'Ext.window.Window',
	xtype:'accountUpdateMobile',
    controller:'account',
	modal:true,
	maximizable:false,
	autoShow:true,
	title:'更换手机',
	width:680,
	items:[
		{xtype:'form',userCls:'x-ui-form-large',viewModel:true,
			layout:{type:'hbox',align:'stretch'},
			url:Boot.appUrl('/account/updateMobile.do'),
			bodyPadding:'20 60 20 20',
			items:[
				{xtype:'container',width:160,items:[
					{xtype:'box',userCls:'x-ui-icon f-mt mt-mobile'}
				]},
				{xtype:'container',layout:'anchor',flex:1,defaults:{allowBlank:false},items:[
					{fieldLabel:'原手机',xtype:'textfield',name:'mobileOld',bind:{value:'{account.mobile}'},allowBlank:true,readOnly:true},
					{xtype:'box',height:20},
					{fieldLabel:'新手机',xtype:'textfield',name:'mobileNew',vtype:'mobile',enforceMaxLength:true,minLength:11,maxLength:11},
					//{fieldLabel:'安全密码',xtype:'passwordfield',name:'passwordSafe'},
					{fieldLabel:'校验码',xtype:'verifycodefield',verifyData:{app:'main',key:102102203}},
					{text:'提交',xtype:'submitbutton',handler:'onUpdateAccountSubmit'}
				]}
			]
		}
	]
});





