Ext.define('APP.view.ia.funds.controller',{
	extend:'APP.view.ia.controller',
	alias:'controller.ia.funds',
	
	
	returnFundsxplain:function(value,cell,record){
		var cls='',
			text=record.data.audit_explain;
		switch(record.data.audit){
			case -1:{
				cls='x-ui-text-red';
				text=record.data.audit_explain;
			}break;
			case 1:{
				cls='x-ui-text-green';
				text='已通过审核';
			}break;
			case 0:{
				cls='x-ui-text-blue';
				text='待审核';
//				if(record.data.direction==2){
//					if(record.data.account_margin_free<record.data.amount_usd){
//						cls='x-ui-text-red';
//						text='可用保证金不足';
//					}else if(record.data.account_margin>0){
//						cls='x-ui-text-blue';
//						text='账户持仓中';
//					}
//				}
			}break;
		}	
		return Ext.String.format(
			'<span class="{0}" data-qtip-"{1}">{1}</span>',
			cls,
			text
		);
	},
	returnFundsOrder:function(value,cell,record){
		var orderno=record.data.orderno;
		if(record.data.pay!=''){
			return Ext.String.format(
				'<span data-qtip="<b>{1}</b><br/>支付接口：{2}<br/>商户号：{3}<br/>支付编号：{4}">{2} {0}</span>',
				'#'+orderno.substr(orderno.length-6,orderno.length),
				record.data.groupname,
				record.data.pay.toUpperCase(),
				record.data.merchantno,
				orderno
			);
		}else{
			return Ext.String.format(
				'OTHER {0}',
				'#'+orderno.substr(orderno.length-6,orderno.length)
			);
		}
	},



	returnFundsEfficiency:function(value,cell,record){
		return Ext.util.Format.timeConsuming(record.data.time,record.data.audit_time);
	},


	returnFundsType:function(value,cell,record){
		var str='';
		switch(record.data.cmd){
			case 1:{
				switch(record.data.direction){
					case 1:{str='入金';}break;
					case 2:{str='出金';}break;
				}	
			}break;
			case 2:{
				switch(record.data.direction){
					case 1:{str='借信用';}break;
					case 2:{str='还信用';}break;
				}	
			}break;
			case 3:{
				switch(record.data.direction){
					case 1:{str='转入';}break;
					case 2:{str='转出';}break;
				}	
			}break;
		}	
		return str;
	},

//	returnFundsMoney:function(value,cell,record){
//		var color='',
//			money=0;
//		switch(record.data.direction){
//			case 1:{
//				color='x-ui-text-green';
//				money=value
//			}break;
//			case 2:{
//				color='x-ui-text-red';
//				money=0-value
//			}break;
//		}	
//		return Ext.String.format(
//			'<span class="{0}">{1}</span>',
//			color,
//			money
//		);
//	},
















	//===========================================================输入USD 触发
	keyupUsdAmount:function(e){
		var form=e.up('form').form,
			usdAmount=Ext.util.Format.number(e.getValue(),'0.00')
			rate=Ext.util.Format.number(form.findField('rate').getValue(),'0.00');
		form.findField('amount').setValue(Ext.util.Format.number(usdAmount*rate),'0.00')
	},
	
	//===========================================================输入CNY 触发
	keyupCnyAmount:function(e){
		var form=e.up('form').form,
			cnyAmount=Ext.util.Format.number(e.getValue(),'0.00'),
			usdAmount=Ext.util.Format.number(form.findField('amount_usd').getValue(),'0.00'),
			rate=Ext.util.Format.number((cnyAmount/usdAmount)*1,'0,0.0000');
		form.findField('rate').setValue(rate)
	},
	
	//===========================================================选择账户银行账号 触发
	selectAccountBank:function(combo,record){
		var formPanel=combo.up('form'),
			form=formPanel.getForm();
		form.findField('bank_city').setValue(record.data.city);
		form.findField('bank_branch').setValue(record.data.branches);
		form.findField('bank_username').setValue(record.data.username);
		form.findField('bank_cardno').setValue(record.data.account);
		form.findField('bank_swiftcode').setValue(record.data.swiftcode);
		form.findField('bank_address').setValue(record.data.address);
		form.findField('bank_currency').setValue(record.data.currency);
		form.findField('bank_icon').setValue(record.data.icon);
		form.findField('bank_card_front').setValue(record.data.card_front);
		form.findField('bank_card_negative').setValue(record.data.card_negative);
	},
	
	
	




	//=======================================================================================================================================================入金
	//=======================================================================================================================================================入金
	//================================================================================新增入金
	onDepositCreatClick:function(button){
		var me=this,
			grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增入金',
			items:[
				{xtype:'iaFundsManagerDepositConfirmForm',
					viewModel:{data:{form:{audit:false}}},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:0}),
									record=Ext.create('APP.model.account.funds',form.getValues());
								if(form.isValid()){
									me.doDepositAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//================================================================================入金审核
	onDepositAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var me=this,
			store=grid.getStore(),
			winid=Mate.getWinId(this,'confirm');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'入金审核：<span>From #'+record.data.login+' Deposit Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerDepositForm',
					viewModel:{data:{form:{audit:true}}},
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
							var loginField=formPanel.getForm().findField('login');
								loginField.setReadOnly(true);
								loginField.fireEvent('blur',loginField);
						}
					},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:record.data.id});
								if(form.isValid()){
									me.doDepositAudit(grid,record);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	doDepositAudit:function(grid,record,formValues){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'audit');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'入金审核：<span>From #'+record.data.login+' Deposit Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerDepositAuditForm',
					viewModel:{data:{form:{audit:true}}},
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
						}
					},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/trade/funds/updateDeposit.do'),
								params:formValues,
								callback:function(formValues,data){
									store.reload();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//=======================================================================================================================同步入金
	onDepositSyncClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'sync');
		grid.setSelection(record);
		
		if(record.data.syncstatus==1){return false};		
		Mate.confirm(
			'确定执行同步？<br/><strong class="x-ui-text-red">该操作将向 MT4 账户「'+record.data.login+'」入金「'+Ext.util.Format.money(record.data.amount_usd,2)+'」</b>',
			function(button){
				if(button=='yes'){
					var waiting=Mate.waiting('正在同步，请耐心等待...');
					Ext.Ajax.request({
						url:Boot.appUrl('/trade/funds/syncDeposit.do'),
						params:{orderno:record.data.orderno},
						success:function(data,opts){
							waiting.hide();
							Mate.showTask(Mate.settings.successMessage);
							record.set({syncstatus:1});
						},
						failure:function(data){
							waiting.hide();
							Mate.error(data.message);
						}
					});
				}
			}
		);
	},





	
	//=================================================================================================================================================出金
	//=================================================================================================================================================出金
	//==================================================================================新增出金
	onWithdrawalCreatClick:function(button){
		var me=this,
			grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增出金',
			items:[
				{xtype:'iaFundsManagerWithdrawalConfirmForm',
					viewModel:{data:{form:{audit:false}}},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:0}),
									record=Ext.create('APP.model.account.funds',form.getValues());
								if(form.isValid()){
									me.doWithdrawalAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//==================================================================================出金审核
	onWithdrawalAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var me=this,
			store=grid.getStore(),
			winid=Mate.getWinId(this,'confirm');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'出金审核：<span>From #'+record.data.login+' Withdrawal Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerWithdrawalConfirmForm',
					viewModel:{data:{form:{audit:true}}},
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
							var loginField=formPanel.getForm().findField('login');
								loginField.setReadOnly(true);
								loginField.fireEvent('blur',loginField);
						}
					},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:record.data.id});
								if(form.isValid()){
									me.doWithdrawalAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	doWithdrawalAudit:function(grid,record,formValues){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'audit');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'出金审核：<span>From #'+record.data.login+' Withdrawal Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerWithdrawalAuditForm',
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
						}
					},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/trade/funds/updateWithdrawal.do'),
								params:formValues,
								callback:function(formValues,data){
									store.reload();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	
	







	
	
	//=======================================================================================================================================================转账
	//=======================================================================================================================================================转账
	onTransferCreatClick:function(button){
		var me=this,
			grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增转账',
			items:[
				{xtype:'iaFundsManagerTransferConfirmForm',
					viewModel:{data:{form:{audit:false}}},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:0}),
									record=Ext.create('APP.model.account.funds',form.getValues());
								if(form.isValid()){
									me.doTransferAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	
	onTransferAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var me=this,
			store=grid.getStore(),
			winid=Mate.getWinId(this,'confirm');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'转账审核：<span>From #'+record.data.login+' To #'+record.data.transfer+' Transfer Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerTransferConfirmForm',
					viewModel:{data:{form:{audit:true}}},
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
							var loginField=formPanel.getForm().findField('login');
								loginField.setReadOnly(true);
								loginField.fireEvent('blur',loginField);
						}
					},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:record.data.id});
								if(form.isValid()){
									me.doTransferAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	
	doTransferAudit:function(grid,record,formValues){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'audit');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'转账审核：<span>From #'+record.data.login+' To #'+record.data.transfer+' Transfer Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerTransferAuditForm',
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
						}
					},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/trade/funds/updateTransfer.do'),
								params:formValues,
								callback:function(formValues,data){
									store.reload();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	




	//=======================================================================================================================================================信用
	//=======================================================================================================================================================信用
	onCreditCreatClick:function(button){
		var me=this,
			grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增信用',
			items:[
				{xtype:'iaFundsManagerCreditConfirmForm',
					viewModel:{data:{form:{audit:false}}},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:0}),
									record=Ext.create('APP.model.account.funds',form.getValues());
								if(form.isValid()){
									me.doCreditAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//================================================================================信用审核
	onCreditAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var me=this,
			store=grid.getStore(),
			winid=Mate.getWinId(this,'confirm');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'信用审核：<span>From #'+record.data.login+' Credit Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerCreditConfirmForm',
					viewModel:{data:{form:{audit:true}}},
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
							var loginField=formPanel.getForm().findField('login');
								loginField.setReadOnly(true);
								loginField.fireEvent('blur',loginField);
						}
					},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:true,
							handler:function(button){
								var form=button.up('form').getForm(),
									formValues=Ext.apply(form.getValues(),{id:record.data.id});
								if(form.isValid()){
									me.doCreditAudit(grid,record,formValues);
									win.destroy();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},

	doCreditAudit:function(grid,record,formValues){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'audit');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'信用审核：<span>From #'+record.data.login+' Credit Money '+Ext.util.Format.money(record.data.amount_usd,2)+'</span>',
			items:[
				{xtype:'iaFundsManagerCreditAuditForm',
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
						}
					},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/trade/funds/updateCredit.do'),
								params:formValues,
								callback:function(formValues,data){
									store.reload();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},






	//=======================================================================================================================修改订单
	onFundsUpdateClick:function(){
	},

	//=======================================================================================================================变更状态为 未审核
	onFundsUnAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'unAudit-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var confirmText='<h6>确认变更信息：</h6>';
			confirmText+='<b>'+record.data.login+'</b>：'+this.returnFundsType(0,0,record)+' '+record.data.money;
			confirmText+='　　<span class="x-ui-text-red">变更为：待审核</span>'
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在变更</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/trade/funds/unAudit.do'),
					params:{id:record.data.id},
					success:function(data,opts){
						Ext.MessageBox.hide();
						Mate.showTask(Mate.settings.successMessage);
						store.remove(record);
					 },
					 failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					 }
				});
			}
		});
	},

	//=======================================================================================================================删除出入金
	onFundsRemoveClick:function(e){	
		var keys=[],
			msgDelList='',
			store=e.up('grid').getStore(),
			records=e.up('grid').getSelectionModel().getSelection();
		Ext.each(records,function(record){
			keys.push(record.data.id);
			msgDelList+=record.data.account_namecn+'：<b>'+record.data.login+'</b>　金额：'+Ext.util.Format.money(record.data.amount_usd,2)+'<br/>'
		});
		if(!keys.length){return false};
		var confirmText='<h6>本次将删除以下信息：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/trade/funds/deleteFunds.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						Mate.showTask(Mate.settings.successMessage);
						store.remove(records);
					 },
					 failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					 }
				});
			}
		});
	},
	
	onFundsDetail:function(e){
		console.log('onFundsDetail')
	}
	
	
	
	
	
	
	
	
	
	
	
});  
