Ext.define('APP.view.ia.account.controller',{
	extend:'APP.view.ia.controller',
	alias:'controller.ia.account',	
	

	
	returnAccountState:function(value,cell,record){
		var stateTip='';
			stateTip+=!record.data.enable?'未启用<br/>':'';
			stateTip+=!record.data.enable_change_password?'不允许更改密码<br/>':'';
			stateTip+=record.data.enable_read_only?'只读<br/>':'';
			//stateTip+=!record.data.send_reports?'不发送报告<br/>':'';
		if(stateTip==''){
			return Ext.String.format(
				'<span class="f-mt mt-yes" data-qtip="正常"></span>'
			);
		}else{
			return Ext.String.format(
				'<span class="f-mt mt-warning" data-qtip="{0}"></span>',
				stateTip
			);
		}
	},


	onShowAccountDetail:function(grid,record,item,index,e,eOpts){
		console.log('Updateing...')
		return false;
	},
	
	onAccountSystemClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			record=store.getAt(rowIndex);
	grid.setSelection(record);
		Mate.ajax({
			url:Boot.appUrl('/systemAutoLogin.do'),
			params:{login:record.data.login},
			success:function(data,opts){
				Mate.openWin('/trade/')
			},
			 failure:function(data){
				Mate.showTask('授权失败！');
			 }
		});
		
	},




//	//============================================================================添加账户 模拟
//	onAccountCreatDemoClick:function(button){
//		var grid=button.up('grid'),
//			store=grid.getStore(),
//			winid=Mate.getWinId(this,'creatDemo');
//			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
//			
//		var win=Ext.create('Ext.window.Window',{
//			id:winid,
//			title:'添加模拟账户',
//			viewModel:{data:{isUpdate:false}},
//			items:[
//				Ext.create({
//					xtype:'iaAccountFormDemo',
//					listeners:{
//						afterrender:function(formPanel){
//							formPanel.mask('正在加载账户配置...');
//							Mate.ajax({
//								url:Boot.appUrl('/sd/account/getMt4AccountBasic.do'),
//								params:{typeid:0},
//								success:function(data,opts){
//									formPanel.unmask();
//									formPanel.getForm().setValues(data);
//									if(data.login==0){formPanel.getForm().findField('login').setReadOnly(true)}
//								},
//								failure:function(data){
//									formPanel.unmask();
//								}
//							});
//						}
//					},
//					buttons:[
//						'->',
//						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
//							handler:'onMateFormSubmit',
//							mateParameters:{
//								url:Boot.appUrl('/ia/account/updateAccountDemo.do'),
//								callback:function(formValues,data){
//									store.reload();
//									if(data.message){
//										Mate.info('<h6>账户开设成功：</h6>'+data.message)
//									}
//								}
//							}
//						},
//						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
//					]					
//				})
//			]
//		});
//		this.getView().add(win).show().center();
//	},
//	
	
	//============================================================================获取账户基础配置信息
	getMt4AccountBasic:function(typeid,callback){
		Mate.ajax({
			url:Boot.appUrl('/sd/account/getMt4AccountBasic.do'),
			params:{typeid:typeid},
			success:function(data,opts){
				return callback(data);
			},
			failure:function(data){
				Mate.showTask('<h6>错误提示：</h6>获取账户配置失败，请稍后尝试...');
				return callback(data);
			}
		});
	},
//	//============================================================================添加账户
//	onAccountCreatClick:function(button){
//		var me=this,
//			grid=button.up('grid'),
//			store=grid.getStore(),
//			winid=Mate.getWinId(this,'creat'),
//			params=button.mateParameters;
//			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
//			
//		var win=Ext.create('Ext.window.Window',{
//			id:winid,
//			title:params.typeid==2?'添加代理账户':'添加真实账户',
//			viewModel:{data:{form:{audit:false,agent:params.typeid==2}}},
//			items:[
//				{xtype:'iaAccountFormApply',
//					buttons:[
//						'->',
//						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:false,
//							handler:function(button){
//								var form=button.up('form').getForm(),
//									formValues=Ext.apply(form.getValues(),{id:0,typeid:params.typeid});
//									record=Ext.create('APP.model.account.record',form.getValues());
//									console.log(record)
//								if(form.isValid()){
//									win.mask('正在获取账户配置...');
//									me.getMt4AccountBasic(params.typeid,function(data){
//										win.unmask();
//										if(data.success){
//											record.set(data);
//											me.doAccountAudit(grid,record,formValues);
//											win.destroy();
//										}
//									});
//								}
//							}
//						},
//						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
//					]					
//				}
//			]
//		});
//		this.getView().add(win).show().center();
//	},
	//==================================================================================审核账户
	onAccountAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var me=this,
			store=grid.getStore(),
			winid=Mate.getWinId(this,'confirm');
	grid.setSelection(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'账户审核：'+Ext.util.Format.stringMerge(record.data.namecn,record.data.name),
			items:[
				{xtype:'iaAccountFormApply',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:false,
							handler:function(button){
								var form=button.up('form').getForm();
								if(form.isValid()){
									win.mask('正在获取账户配置...');
									me.getMt4AccountBasic(record.data.typeid,function(data){
										win.unmask();
										if(data.success){
											record.set(data);
											me.doAccountAudit(grid,record);
											win.destroy();
										}
									});
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
	//==================================================================================审核账户 子过程界面
	doAccountAudit:function(grid,record){
		var me=this,
			store=grid.getStore(),
			winid=Mate.getWinId(this,'audit');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'账户审核：'+Ext.util.Format.stringMerge(record.data.namecn,record.data.name),
			viewModel:{data:{form:{audit:true,agent:record.data.typeid==2}}},
			items:[
				{xtype:'iaAccountFormAudit',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/ia/account/updateAudit.do'),
								params:{id:record.data.id},
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
	

	//==================================================================================================================================================================账户确认
	onAccountConfirmClick:function(grid,record,item,index,e,eOpts){
		var me=this,
			store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'账户确认：'+Ext.util.Format.stringMerge(record.data.namecn,record.data.name),
			viewModel:{data:{form:{audit:true,agent:record.data.typeid==2}}},
			items:[
				{xtype:'iaAccountFormApply',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'确认无误 下一步',iconCls:'f-mt mt-button-submit',scale:'medium',name:'nextButton',disabled:false,
							handler:function(button){
								var form=button.up('form').getForm();
								if(form.isValid()){
									button.setDisabled(true);
									me.doAccountConfirm(grid,record);
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
	//==================================================================================账户确认 子过程界面
	doAccountConfirm:function(grid,record){
		var me=this,
			store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,'confirm');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'账户确认：'+Ext.util.Format.stringMerge(record.data.namecn,record.data.name),
			items:[
				{xtype:'iaAccountFormConfirm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/ia/account/updateConfirm.do'),
								callback:function(formValues,data){
									store.remove(record);
									storeChange.reload();
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
	
	
	

	//==================================================================================================================================================================账户更改
	onAccountUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
	grid.setSelection(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'账户更新：'+record.data.login,
			viewModel:{data:{form:{agent:record.data.typeid==2}}},
			items:[
				Ext.create({
					xtype:'iaAccountFormUpdate',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/ia/account/updateAccount.do'),
								params:{id:record.data.id,typeid:record.data.typeid},
								callback:function(formValues,data){
									record.set(formValues);
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
	
	
	
	
	
	
	
	
	
	









	
	//==================================================================================================重设账户登录信息
	onAccountUpdatePasswordClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'updatePassword-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'重置账户安全信息：'+record.data.login,
			viewModel:{data:{merchantno:record.data.merchantno,mobile:record.data.mobile,email:record.data.email}},
			items:[
				Ext.create({
					xtype:'iaAccountFormLogin',
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().loadRecord(record);
						}
					},
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							bind:{disabled:'{!verification.value}'},
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/account/updatePassword.do'),
								params:{login:record.data.login},
								callback:function(formValues,data){
									record.set(formValues);
									Mate.info('<h6>帐户安全信息已重置：</h6>'+data.message)
								}
							}
						},
						'->'
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},



	
	//=======================================================================================================================变更状态为 未审核
	onAccountUnAuditClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'unAudit-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var confirmText='<h6>确认变更信息：</h6>';
			confirmText+='<b>'+record.data.type+'</b>：'+record.data.namecn+' '+record.data.name;
			confirmText+='　　<span class="x-ui-text-red">变更为：待审核</span>'
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在变更</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/ia/account/unAudit.do'),
					params:{id:record.data.id},
					success:function(data,opts){
						Ext.MessageBox.hide();
						Mate.showTask(Mate.settings.successMessage);
					},
					failure:function(data){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					}
				});
			}
		});
	},
	
	//=======================================================================================================================删除账户
	onAccountRemoveClick:function(e){	
		var keys=[],
			msgDelList='',
			store=e.up('grid').getStore(),
			records=e.up('grid').getSelectionModel().getSelection();
		Ext.each(records,function(record){
			keys.push(record.data.id);
			msgDelList+=record.data.namecn+' '+record.data.name+'：<b>'+record.data.login+'</b><br/>'
		});
		if(!keys.length){return false};
		var confirmText='<h6>本次将删除以下信息：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/ia/account/deleteAccount.do'),
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
	}































});  
