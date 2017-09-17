Ext.define('APP.mate.field.verifyCode',{
    extend:'Ext.form.FieldContainer',
	alias:'widget.verifycodefield',
	layout:{type:'hbox',align:'stretch'},
	fieldLabel:'效验码',
	maxWidth:500,
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			items:[
				{xtype:'numberfield',name:'verifyCode',allowBlank:false,enableKeyEvents:true,enforceMaxLength:true,minLength:6,maxLength:6,margin:'0 5 0 0',reference:'verifycode',publishes:'value',readOnly:true,flex:1,listeners:{change:me.onCheck}},
				{xtype:'button',text:'获取',userCls:'x-ui-grey',iconCls:'f-mt mt-mobile',width:88,handler:me.onSend,verifyData:me.verifyData}
				//{xtype:'box',minWidth:100,hidden:true,tpl:'<strong class="x-ui-text-red">{s}</b> 秒后重新获取',data:{s:160}}
			]
		});  
		this.callParent();
	},
	onCheck:function(field){
		if(field.validate()){
			var verifyData=field.next().verifyData;
			field.setReadOnly(true);
			field.setUserCls('x-ui-field-loading');
			Mate.ajax({
				url:Boot.appUrl('/checkVerifyCode.do'),
				params:{
					app:verifyData.app,
					key:verifyData.key,
					verifyCode:field.getValue()
				},
				success:function(data,opts){
					field.setReadOnly(true);
					field.setUserCls('x-ui-field-success');
				 },
				 failure:function(data){
					field.setReadOnly(false);
					field.setUserCls('x-ui-field-invalid');
					Mate.showTask('效验码错误，请检查重试！',true)
				 }
			});
		}
	},
	//==========================================================发送效验码	
	onSend:function(button){
		var form=button.up('form').getForm(),
			field=button.prev(),
			buttonText=button.getText();
			
		field.clearInvalid();
		field.setDisabled(true);
		if(!form.isValid()){
			field.setDisabled(false);
		}else{
			button.setDisabled(true)
			var verifyData=button.verifyData,
				formParams=form.getValues();
			Ext.apply(formParams,{app:verifyData.app,key:verifyData.key});
			//console.log(formParams)
			Mate.ajax({
				url:Boot.appUrl('/getVerifyCode.do'),
				params:formParams,
				success:function(data){
					var expired=data.expired||120;
					field.setDisabled(false).setReadOnly(false);
					button.setText(expired);
					
					var message='<h6>效验码已发送至：</h6>';
					if(data.mobile){message+='手机：'+data.mobile;}
					if(data.email){message+='Email：'+data.email;}
					Mate.showTask(message);
					
					var task={
						run:function(s){
							button.setText(expired-s);
							if(s>=expired){
								Ext.TaskManager.stop(task);
								button.setDisabled(false);
								button.setText(buttonText);
							}	
						},
						interval:1000
					}
					Ext.TaskManager.start(task);
				 },
				 failure:function(data){
					button.setDisabled(false);
					button.setText(buttonText);
					Mate.showTask(data.message||'获取效验码超时，请重试！',true)
				 }
			});
			return false;
		}
	}
});
