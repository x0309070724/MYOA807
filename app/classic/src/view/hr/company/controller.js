Ext.define('APP.view.hr.company.controller',{
    extend:'APP.view.hr.controller',
    alias:'controller.hr.company',


	returTeamGroup:function(value,cell,record){
		return record.data.department_name+'-'+record.data.branch_name
	},
	returnDepartment:function(value,cell,record){
		return record.data.department_name;
	},




	//===========================================================================================================================================网点
	//============================================================================新增
	onBranchCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false}
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增网点',
			border:false,
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrCompanyBranchForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updateBranch.do'),
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
	//============================================================================更改
	onBranchUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改网点：'+record.data.name,
			border:false,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrCompanyBranchForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updateBranch.do'),
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
	//============================================================================删除
	onBranchRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='网点：<b>'+record.data.name+'</b>　'
			if(record.data.staff_count>0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.staff_count+' 位成员<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除网点：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除网点：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除网点</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/hr/company/deleteBranch.do'),
					params:{keys:keys},
					success:function(data,opts){
						store.remove(records);
						grid.getView().refresh();
						Mate.showTask(Mate.settings.successMessage);
					},
					failure:function(json){
						Ext.MessageBox.hide();
						Mate.error(json.message);
					}
				});
			}
		});
	},



	//===========================================================================================================================================团队
	//============================================================================新增
	onTeamCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增团队',
			border:false,
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrCompanyTeamForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updateTeam.do'),
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
	//============================================================================更改
	onTeamUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改团队：'+record.data.name,
			border:false,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrCompanyTeamForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updateTeam.do'),
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
	//============================================================================删除
	onTeamRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='团队：<b>'+record.data.name+'</b>　'
			if(record.data.staff_count>0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.staff_count+' 位成员<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除团队：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除团队：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除团队</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/hr/company/deleteTeam.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						store.remove(records);
						grid.getView().refresh();
						Mate.showTask(Mate.settings.successMessage);
					},
					failure:function(json){
						Ext.MessageBox.hide();
						Mate.error(json.message);
					}
				});
			}
		});
	},






	//===========================================================================================================================================部门
	//============================================================================新增
	onDepartmentCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增部门',
			border:false,
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrCompanyDepartmentForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updateDepartment.do'),
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
	//============================================================================更改
	onDepartmentUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改部门：'+record.data.name,
			border:false,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrCompanyDepartmentForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updateDepartment.do'),
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
	//============================================================================删除
	onDepartmentRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='部门：<b>'+record.data.name+'</b>　'
			if(record.data.staff_count>0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.staff_count+' 位成员<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除部门：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除部门：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除部门</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/hr/company/deleteDepartment.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						store.remove(records);
						grid.getView().refresh();
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









	//===========================================================================================================================================职务
	//============================================================================新增
	onPostCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增职务',
			border:false,
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrCompanyPostForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updatePost.do'),
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
	//============================================================================更改
	onPostUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update');
		grid.setSelection(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改职务：'+record.data.name,
			border:false,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrCompanyPostForm',
					listeners:{afterrender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/company/updatePost.do'),
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
	//============================================================================删除
	onPostRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='职务：<b>'+record.data.name+'</b>　'
			if(record.data.staff_count>0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.staff_count+' 位成员<br/>'
			}else{
				keys.push(record.data.id);
				msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法删除职务：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>删除职务：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除职务</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/hr/company/deletePost.do'),
					params:{keys:keys},
					success:function(data,opts){
						Ext.MessageBox.hide();
						store.remove(records);
						grid.getView().refresh();
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
	onPostCompetenceRefresh:function(grid,record,tr,rowIndex,e,eOpts){
		var postGrid=grid,
			treePanel=this.lookup('postCompetenceTree'),
			rootNodes=treePanel.getRootNode().childNodes;
		function doNodesReset(nodes){
			Ext.Array.each(nodes,function(node){
				node.set({checked:false});
				if(node.hasChildNodes()){doNodesReset(node.childNodes)}
			});
		}
		function doNodesChecked(nodes,id){
			Ext.Array.each(nodes,function(node){
				if(node.data.id==id){node.set({checked:true})}
				if(node.hasChildNodes()){doNodesChecked(node.childNodes,id)}
			});
		}
		doNodesReset(rootNodes);
		treePanel.setLoading(true);
		Mate.ajax({
			url:Boot.appUrl('/hr/company/getPostCompetence.do'),
			params:{postid:record.data.id},
			success:function(json,opts){
				treePanel.setDisabled(false);
				treePanel.setData(record);
				treePanel.setTitle('权限分配：'+record.data.name);
				Ext.Array.each(json.plant,function(id){
					doNodesChecked(rootNodes,id);
				});
				treePanel.setLoading(false);
			},
			failure:function(json){
				treePanel.setLoading(false);
				treePanel.setDisabled(true);
				Mate.showTask(json.message,true)
			}
		});
	},













	onPostCompetenceRender:function(treePanel,eOpts){
		treePanel.setStore({
			type:'tree',
			root:{expanded:true,children:oaNav.navigation}
		});
	},


	//===================================================================================职务模块 收缩/展开
	onPostCompetenceTreeToggleHandler:function(button,state){
		if(state){
			button.up('treepanel').expandAll();
			button.setIconCls('f-mt mt-collapse').setText('收缩全部');
		}else{
			button.up('treepanel').collapseAll();
			button.setIconCls('f-mt mt-expand').setText('展开全部');
		}
	},
	//===================================================================================职务模块 收缩/展开
	onPostCompetenceCheckChange:function(node,checked,eOpts){
		var postid=this.lookup('postGrid').getSelectionModel().getSelection()[0].data.id,
			modules=[];
		function setChildChecked(node,checked){
			node.expand();
			node.set({checked:checked});
			modules.push(node.data.id);
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
				modules.push(node.data.id);
				var flag=false;
				parentNode.eachChild(function(child){if(child.data.checked==true){flag=true;}});
				if(checked==false){
					if(!flag){setParentChecked(parentNode,checked)}
				}else{
					if(flag){setParentChecked(parentNode,checked)}
				}
			}
		}

		setChildChecked(node,checked);
		setParentChecked(node,checked);
		Mate.ajax({
			url:Boot.appUrl('/hr/company/updatePostCompetence.do'),
			params:{
				postid:postid,
				modules:Ext.util.Format.uniqueArray(modules),
				checked:checked
			},
			success:function(data){
			}
		});
	 }

})
