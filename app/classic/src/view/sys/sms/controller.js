Ext.define('APP.view.sys.sms.controller',{
    extend:'APP.view.sys.controller',
    alias:'controller.sys.sms',
	//===========================================================================================================================================支付接口
	//============================================================================添加 上游通道
	onSmsAccountCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加上游通道',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'sysSmsAisleAccountForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/sms/creatSmsAisle.do'),
									callback:function(formValues,data){
										store.reload();
									}
								}
							},
							{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
						]					
					})
				]
			});
			this.getView().add(win).show().center();
	},
	//============================================================================更新 上游通道
	onSmsAccountUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新上游通道：'+record.data.merchantno,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysSmsAisleAccountForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/sms/updateSmsAisle.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
									record.set({locked:formValues.locked});
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================删除 上游通道
	onSmsAccountRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			keys.push(record.data.id);
			msgDelList+='支付接口：<b>'+record.data.name+'</b>　'
			msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
		});
		if(!keys.length){return false;};
		var confirmText='<h6>删除支付接口：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除删除支付接口</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/system/sms/delectSmsAisle.do'),
					params:{id:keys},
					success:function(response,opts){
						Ext.MessageBox.hide();
						Mate.showTask(Mate.settings.successMessage);
						store.remove(records);
						grid.getView().refresh();
					},
					failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					}
				});
			}
		});
	},
	//===========================================================================================================================================支付接口	 END



	//===========================================================================================================================================商户
	//============================================================================添加 商户
	smsMerchantAccountCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加商户',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'sysSmsMerchantAccountForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/sms/creatSmsMerchant.do'),
									callback:function(formValues,data){
										store.reload();
									}
								}
							},
							{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
						]					
					})
				]
			});
			this.getView().add(win).show().center();
	},
	//============================================================================更新 商户
	smsMerchantAccountUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新商户：'+record.data.merchantno,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysSmsMerchantAccountForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/sms/updateSmsMerchant.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
									record.set({locked:formValues.locked});
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================删除 商户
	smsMerchantAccountRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			keys.push(record.data.id);
			msgDelList+='支付接口：<b>'+record.data.merchantno+'</b>　'
			msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
		});
		if(!keys.length){return false;};
		var confirmText='<h6>删除支付接口：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除删除支付接口</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/system/sms/deleteSmsMerchant.do'),
					params:{id:keys},
					success:function(response,opts){
						Ext.MessageBox.hide();
						Mate.showTask(Mate.settings.successMessage);
						store.remove(records);
						grid.getView().refresh();
					},
					failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					}
				});
			}
		});
	}
	//===========================================================================================================================================商户   END
})
