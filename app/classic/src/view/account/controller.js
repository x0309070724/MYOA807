Ext.define('APP.view.account.controller',{
    extend:'APP.view.controller',
    alias:'controller.account',
	
	
	
	
	//==============================================================================================================================提交 登录密码更改
	onUpdateAccountSubmit:function(button){
		var formPanel=button.up('form');
		if(formPanel.getForm().isValid()){
			formPanel.mask('Processing...')
			Mate.ajax({
				url:formPanel.url,
				params:formPanel.getValues(),
				success:function(data,opts){
					formPanel.unmask();
					Mate.showTask(data.message);
					formPanel.up('window').destroy();
					if(formPanel.password){
						Mate.showTask(
							'<h6>登录密码已成功更改</h6>请使用新密码重新登入系统！',
							false,
							function(){
								Mate.clearCache();
								window.location.reload();
							}
						);
					}
				 },
				 failure:function(data){
					formPanel.unmask();
				 }
			});
		}
	}
});
