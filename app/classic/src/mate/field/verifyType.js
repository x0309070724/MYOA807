Ext.define('APP.mate.field.verifyType',{
    extend:'Ext.form.FieldSet',
	alias:'widget.verifytypefield',
	collapsible:false,
	margin:'40 0 0 0',
	width:500,
	defaults:{layout:'anchor'},
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			items:[
//				{xtype:'toolbar',margin:'0 0 0 96',items:[
//					{xtype:'hiddenfield',name:'verifyType',bind:{value:'{verifyTypeReference.value}'}},
//					{xtype:'segmentedbutton',defaults:{width:140},reference:'verifyTypeReference',items:[
//						{text:'安全密码',value:'passwordSafe',reference:'passwordSafeReference',pressed:true},
//						{text:'效验码',value:'verifyCode',reference:'verifyCodeReference'}
//					]},
//				]},
				{xtype:'hiddenfield',name:'verifyType',value:'passwordSafe'},
				{xtype:'container',name:'passwordBox',items:[
					{fieldLabel:'安全密码',xtype:'passwordsafefield',name:'password_safe',listeners:{change:me.onCheckPasswordSafe},allowBlank:false},
					{xtype:'checkbox',inputValue:'passwordSafe',inputType:'hidden',boxLabelCls:'',hideEmptyLabel:false,listeners:{change:me.onChangeVerifyType},boxLabel:'忘记安全密码？ <span class="x-ui-text-red">请使用效验码.</span>'}
				]},
				{xtype:'container',name:'verifyBox',hidden:true,disabled:true,items:[
					{fieldLabel:'效验码',xtype:'verifycodefield',verifyData:me.verifyData},
					{xtype:'checkbox',inputValue:'verifyCode',inputType:'hidden',boxLabelCls:'',hideEmptyLabel:false,listeners:{change:me.onChangeVerifyType},boxLabel:'收不到效验码？ <span class="x-ui-text-red">请使用安全密码.</span>'}
				]}
			]
		});  
		this.callParent();
	},
	onCheckPasswordSafe:function(field){
		var form=field.up('form').getForm();
		if(form.isValid()&&Ext.isNumeric(field.getValue())){
		//if(field.validate()){
			field.setUserCls('x-ui-field-loading');
			Mate.ajax({
				url:Boot.appUrl('/checkPassword.do'),
				params:{
					cmd:'passwordSafe',
					password:field.getValue()
				},
				success:function(data,opts){
					field.setReadOnly(true);
					field.setUserCls('x-ui-field-success');
				 },
				 failure:function(data){
					field.setReadOnly(false);
					field.setUserCls('x-ui-field-invalid');
					Mate.showTask('安全密码错误，请检查重试！',true)
				 }
			});
		}
	},
	
	
	
	onChangeVerifyType:function(field){
		var view=field.up('verifytypefield'),
			verifyType=view.down('field[name=verifyType]'),
			passwordBox=view.down('container[name=passwordBox]'),
			verifyBox=view.down('container[name=verifyBox]');
	
		verifyType.setValue(field.inputValue=='passwordSafe'?'verifyCode':'passwordSafe');
		passwordBox.setHidden(field.inputValue=='passwordSafe').setDisabled(field.inputValue=='passwordSafe')
		verifyBox.setHidden(field.inputValue=='verifyCode').setDisabled(field.inputValue=='verifyCode')
	}
});
