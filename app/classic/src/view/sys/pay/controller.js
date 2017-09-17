Ext.define('APP.view.sys.pay.controller',{
    extend:'APP.view.sys.controller',
    alias:'controller.sys.pay',
	//===========================================================================================================================================支付接口
	//============================================================================添加 支付接口
	onPayCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			// windid === eg:WIN-controller-176-creat
			winid=Mate.getWinId(this,'creat');
			// console.log(Ext.get(winid)) null
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加支付接口',
                // The ViewModel is a data provider for this component and its children.
                viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'sysPayAisleAccountForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/pay/creatPayAisle.do'),
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
	//============================================================================更新 支付接口
	onPayUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新支付接口：'+record.data.merchantno,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysPayAisleAccountForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/pay/updatePayAisle.do'),
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
	//============================================================================删除 支付接口
	onPayRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		/*console.log(grid.getView());
		console.log(grid.getView().getSelectionModel());
		console.log(grid.getView().getSelectionModel().getSelection());*/
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
					url:Boot.appUrl('/sd/system/pay/deletePayAisle.do'),
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
	onAccountCreatClick:function(button){
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
						xtype:'sysPayMerchantAccountForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/pay/creatPayMerchant.do'),
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
	onAccountUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新支付接口：'+record.data.merchantno,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysPayMerchantAccountForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/pay/updatePayMerchant.do'),
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
	onAccountRemoveClick:function(button){
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
					url:Boot.appUrl('/sd/system/pay/deletePayMerchant.do'),
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
	//===========================================================================================================================================商户   END



	//==================================================================================================================================================
	//============================================================================添加 系统银行
	onOurBankCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加系统银行',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'sysPayAisleBankForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/pay/updatePayBank.do'),
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
	//============================================================================更新 系统银行
	onOurBankUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var bankTypeName=record.data.type? '信用卡':'银行卡'
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新系统'+bankTypeName+'：'+record.data.namecn,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysPayAisleBankForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/pay/updatePayBank.do'),
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
	//============================================================================删除 系统银行
	// onOurBankRemoveClick:function(button){
	// 	var keys=[],
	// 		msgDelList='',
	// 		grid=button.up('grid'),
	// 		store=grid.getStore(),
	// 		records=grid.getView().getSelectionModel().getSelection();
	// 	Ext.Array.each(records,function(record){
	// 		keys.push(record.data.id);
	// 		msgDelList+='支付接口：<b>'+record.data.merchantno+'</b>　'
	// 		msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
	// 	});
	// 	if(!keys.length){return false;};
	// 	var confirmText='<h6>删除支付接口：</h6>'+msgDelList;
	// 	Mate.confirm(confirmText,function(button){
	// 		if(button=='yes'){
	// 			Mate.waiting('<h6>正在删除删除支付接口</h6>请等待指令执行完成...');
	// 			Mate.ajax({
	// 				url:Boot.appUrl('/sd/system/pay/deletePayBank.do'),
	// 				params:{id:keys},
	// 				success:function(response,opts){
	// 					Ext.MessageBox.hide();
	// 					Mate.showTask(Mate.settings.successMessage);
	// 					store.remove(records);
	// 					grid.getView().refresh();
	// 				},
	// 				failure:function(data){
	// 					Ext.MessageBox.hide();
	// 					Mate.error(data.message);
	// 				}
	// 			});
	// 		}
	// 	});
	// },
	//============================================================================添加 上游银行
	onPayBankCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			var banktype=grid.down('toolbar').down('segmentedbutton').getValue(),
				bankTypeName=banktype?'信用卡':'银行卡';
				//window.grid01 = grid;
			// console.log(grid.up('toolbar'));
			// console.log();
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加上游'+bankTypeName,
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'sysPayAislePayBankFrom',
						type:banktype,
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/pay/updateAisleBank.do'),
									//params:{type:banktype},
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
	//============================================================================更新 上游银行
	onPayBankUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var banktype=grid.grid.down('toolbar').down('segmentedbutton').getValue(),
			bankTypeName=banktype?'信用卡':'银行卡';
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新上游'+bankTypeName+'：'+record.data.namecn,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysPayAislePayBankFrom',
					type:banktype,
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/pay/updateAisleBank.do'),
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
	//============================================================================获取系统银行名称
	onFieldPayBanknameEnter:function(field){
		var formPanel=field.up('form'),
			form=formPanel.getForm();
		var type=formPanel.type;
		if(field.getValue()!=form.agent){
			form.agent=field.getValue();
			field.addCls('x-ui-field-loading').setReadOnly(true);
			Mate.ajax({
				url:Boot.appUrl('/sd/system/pay/getPayBank.do'),
				params:{namecn:field.getValue(),type:type},
				success:function(data,opts){
					field.removeCls('x-ui-field-loading').setReadOnly(false);
					form.findField('type').setValue(type);
					//form.findField('icon').setValue(data.plant[0].icon);
					form.findField('name').setValue(data.plant[0].name);
					form.findField('namecn').setValue(data.plant[0].namecn);
					//form.findField('agent_names').setValue(Ext.util.Format.stringPriority(data.namecn,data.name));
				},
				failure:function(data,opts){
					Mate.showTask('银行：「'+field.getValue()+'」非有效银行.',true);
					field.setValue('');
					form.findField('type').setValue(type);
					//form.findField('code').setValue();
					//form.findField('icon').setValue();
					form.findField('name').setValue();
					form.findField('namecn').setValue();
					form.findField('paycode').setValue();
					return false;
				}
			});
		}
	},
	//============================================================================
	//onFieldBanknameEnter:function(field){
		// var formPanel=field.up('form'),
		// 	form=formPanel.getForm();
		// if(field.getValue()!=form.agent){
		// 	form.agent=field.getValue();
		// 	field.addCls('x-ui-field-loading').setReadOnly(true);
		// 	Mate.ajax({
		// 		url:Boot.appUrl('/sd/system/pay/getPayBankInfo.do'),
		// 		params:{namecn:field.getValue()},
		// 		success:function(data,opts){
		// 			field.removeCls('x-ui-field-loading').setReadOnly(false);
		// 			form.findField('code').setValue(data.plant.code);
		// 			form.findField('icon').setValue(data.plant.icon);
		// 			form.findField('name').setValue(data.plant.name);
		// 			form.findField('namecn').setValue(data.plant.namecn);
		// 			form.findField('paycode').setValue(data.plant.paycode);
		// 			//form.findField('agent_names').setValue(Ext.util.Format.stringPriority(data.namecn,data.name));
		// 		},
		// 		failure:function(data,opts){
		// 			Mate.showTask('银行：「'+field.getValue()+'」非有效银行.',true);
		// 			field.setValue('');
		// 			form.findField('code').setValue();
		// 			form.findField('icon').setValue();
		// 			form.findField('name').setValue();
		// 			form.findField('namecn').setValue();
		// 			form.findField('paycode').setValue();
		// 			return false;
		// 		}
		// 	});
		// }
	//},
	//================================================================================
	returnBankType:function(value,cell,record){
		if(value){
			return '信用卡'
		}
		else return '银行卡'
	},

	//===========================================================================================================================================银行 END

	//==========================================================================================================================App支付

	//============================================================================添加 App支付
	onAppPayCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加App支付',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'sysPayAisleAppPayFrom',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/pay/updateAppPay.do'),
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
	//============================================================================更新 App支付
	onAppPayUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新App支付：'+record.data.name,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sysPayAisleAppPayFrom',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);Ext.getCmp('app_radio').hide();}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/pay/updateAppPay.do'),
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
	//============================================================================获取系统银行名称
	// onFieldAppPayEnter:function(field){
	// 	var formPanel=field.up('form'),
	// 		form=formPanel.getForm();
	// 	var type=formPanel.type;
	// 	if(field.getValue()!=form.agent){
	// 		form.agent=field.getValue();
	// 		field.addCls('x-ui-field-loading').setReadOnly(true);
	// 		Mate.ajax({
	// 			url:Boot.appUrl('/sd/system/pay/getPayBank.do'),
	// 			params:{namecn:field.getValue(),type:type},
	// 			success:function(data,opts){
	// 				field.removeCls('x-ui-field-loading').setReadOnly(false);
	// 				form.findField('payment').setValue(data.plant[0].payment);
	// 			},
	// 			failure:function(data,opts){
	// 				Mate.showTask('「'+field.getValue()+'」非有效App.',true);
	// 				field.setValue('');
	// 				field.removeCls('x-ui-field-loading').setReadOnly(false);
	// 				return false;
	// 			}
	// 		});
	// 	}
	// },
	//=============================================================================订单回调
	onDepositSyncClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'sync');
		grid.setSelection(record);
		if(record.data.syncstatus==1){return false};
		var waiting=Mate.waiting('正在回调，请耐心等待...');
		//console.dir(waiting)
		Mate.ajax({
			method:'POST',
			//type:'jsonP',
			url:Boot.appUrl('/sd/system/pay/syncOrder.do'),
			params:{billno:record.data.billno},
			success:function(response,opts){
				var json=Mate.ajaxData(response)
				//console.log(json)
				if(json.success){
					waiting.hide();
					Mate.showTask(Mate.settings.successMessage);
					record.set({syncstatus:1});
				}else{
					Mate.error(json.message);
				}
			}
		});
	}
})
