Ext.define('APP.view.ia.system.account.controller',{
    extend:'APP.view.controller',
    alias:'controller.ia.system.account',

	returnPropertyMode:function(value,cell,record){
		var str;
		switch(value){
			case 0:{str=''}break;
			case 10000001:{str='信用赠金'}break;
			case 10000002:{str='赠金'}break;
		}
		return str;
	},


	//========================================================================================================================================账户类型
	//========================================================================================================================================账户类型
	onPropertyCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加账户类型',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'iaSystemAccountPropertyForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/settings/updateProperty.do'),
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
	onPropertyUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新账户类型：'+record.data.name,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'iaSystemAccountPropertyForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/settings/updateProperty.do'),
								params:{id:record.data.id},
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
	onPropertyRemoveClick:function(button){			
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='账户类型：'+record.data.name+'　'
			if(record.data.counts>0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.counts+' 个账户<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除账户类型：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除账户类型</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/system/settings/deleteProperty.do'),
					params:{keys:keys},
					success:function(data,opts){
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
	//========================================================================================================================================账户类型 END
	//========================================================================================================================================账户类型 END



	//========================================================================================================================================开户协议
	//========================================================================================================================================开户协议
	onAgreementCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'新增协议',
				viewModel:{data:{isUpdate:false}},
				items:[
					{xtype:'iaSystemAccountAgreementForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/sd/system/settings/updateAgreement.do'),
									callback:function(formValues,data){
										store.reload();
										if(data.message){
											Mate.info('<h6>账户开设成功：</h6>'+data.message)
										}
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
	onAgreementUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改协议：'+record.data.title_cn,
			viewModel:{data:{isUpdate:true}},
			items:[
				{xtype:'iaSystemAccountAgreementForm',
					listeners:{
						afterrender:function(formPanel){
							formPanel.setLoading(true);
							Mate.ajax({
								url:Boot.appUrl('/sd/system/settings/getAgreement.do'),
								params:{id:record.data.id},
								success:function(data){
									formPanel.setLoading(false);
									formPanel.getForm().setValues(data.plant[0]);
								},
								failure:function(data){
									formPanel.setLoading(false);
									Mate.error(data.message);
								}
							});
						}
					},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/system/settings/updateAgreement.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				}
			]
		});
		this.getView().add(win).show().center();
	},
	onAgreementRemoveClick:function(button){			
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='协议名称：'+record.data.title_cn+'　'
			keys.push(record.data.id);
			msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
		});
		if(!keys.length){return false;};
		var confirmText='<h6>删除协议：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除协议</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/system/settings/deleteAgreement.do'),
					params:{keys:keys},
					success:function(data,opts){
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
	//========================================================================================================================================开户协议 END
	//========================================================================================================================================开户协议 END




	//===========================================================================================================================================角色
	//===========================================================================================================================================角色
	onRoleAddRecord:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			rowEditing=grid.findPlugin('rowediting'),
			record=Ext.create('Ext.data.Model',{id:0});
			store.insert(0,record);
			rowEditing.startEdit(0,0);
	},
	
	onRoleGridSelectionChange:function(selModel,selections){ 
		var roleGrid=this.lookup('roleGrid'),
			treePanel=this.lookup('roleModuleTree');
			treePanel.setDisabled(true);
			roleGrid.down('[mateSelectionChange=true]').setDisabled(selections.length===0);
		if(selections.length){
			function resetNodes(nodes){ 
				var nodesLength=nodes.length;
				for(var i=0,len=nodesLength;i<len;i++){  
					nodes[i].set({checked:false});
					if(nodes[i].hasChildNodes()){resetNodes(nodes[i].childNodes);}  
				}  
			}  
			function ckeckedNodes(nodes,moduleid){  
				var nodesLength=nodes.length;
				for(var i=0,len=nodesLength;i<len;i++){  
					if(nodes[i].data.moduleid==moduleid){nodes[i].set({checked:true});}
					if(nodes[i].hasChildNodes()){ckeckedNodes(nodes[i].childNodes,moduleid);}  
				}  
			}  
			if(selections[0].data.id>0){
				treePanel.setDisabled(false);
				treePanel.setData(selections[0])
				var item=selections[0].data;
				treePanel.setTitle('权限分配：'+item.name);
				treePanel.setLoading(true);
				var roonodes=treePanel.getRootNode().childNodes;   //获取主节点
				resetNodes(roonodes);
				Mate.ajax({
					url:Boot.appUrl('/sd/system/settings/getRoleModule.do'),
					params:{roleid:item.id},
					success:function(data,opts){
						var records=data.plant;
						for(var i=0,len=records.length;i<len;i++){ckeckedNodes(roonodes,records[i].moduleid);}  
						treePanel.setLoading(false);
					}
				});
			}
		}
	},
	onRoleRemoveClick:function(button){	
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='角色：<b>'+record.data.name+'</b>　'
			if(record.data.counts>0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.counts+' 位成员<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除角色：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除角色：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除角色</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/system/settings/deleteRole.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						store.remove(records);
						grid.getView().refresh();
						Mate.showTask(Mate.settings.successMessage);
					 },
					 failure:function(data){
						Ext.MessageBox.hide();
						Mate.showTask(data.message,true);
					 }
				});
			}
		});
	},
	//===================================================================================角色模块 收缩/展开	
	onRoleModuleTreeToggleHandler:function(button,state){
		if(state){
			button.up('treepanel').expandAll();
			button.setIconCls('f-mt mt-collapse').setText('收缩全部');
		}else{
			button.up('treepanel').collapseAll();
			button.setIconCls('f-mt mt-expand').setText('展开全部');
		}
	},
	//===================================================================================角色模块 收缩/展开	
	onRoleModuleCheckChange:function(node,checked,eOpts){
		var roleid=this.lookup('roleGrid').getSelectionModel().getSelection()[0].data.id,
			modules=[];
		function setChildChecked(node,checked){
			node.expand();
			node.set({checked:checked});
			modules.push(node.data.moduleid);
			if(node.hasChildNodes()){
				node.eachChild(function(child){
					setChildChecked(child,checked);
				});
			}
		}
		function setParentChecked(node,checked){
			var parentNode=node.parentNode;
			if(parentNode!=null){
				node.set({checked:checked});
				modules.push(node.data.moduleid);
				var flag=false;
				parentNode.eachChild(function(child){if(child.data.checked==true){flag=true;}});
				if(checked==false){
					if(!flag){setParentChecked(parentNode,checked);}
				}else{
					if(flag){setParentChecked(parentNode,checked);}
				}
			}
		}
		
		setChildChecked(node,checked); 
		setParentChecked(node,checked); 
		Mate.ajax({
			url:Boot.appUrl('/sd/system/settings/updateRoleModule.do'),
			params:{
				roleid:roleid,
				modules:Ext.util.Format.uniqueArray(modules),
				checked:checked
			},
			success:function(data){
			}
		});	
	 }



	

	
})
