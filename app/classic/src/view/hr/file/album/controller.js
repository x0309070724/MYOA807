Ext.define('APP.view.hr.file.album.controller',{
    extend:'APP.view.hr.controller',
    alias:'controller.hr.file.album',
  
    onPhotoTitleCreatClick:function(button){
    	var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			iconCls:'menu-edit',
			title:'相册名称',
			width:600,
			items:[						
				{xtype:'form',frame:false,
					viewModel:{data:{isStart :true,notStart :false}},

					items:[
					
						{xtype:'fieldcontainer',layout:'hbox',items:[
							{fieldLabel:'相册名称',emptyText:'相册名称',xtype:'textfield',name:'title',flex:1,allowBlank:false},							
							{fieldLabel:'启用',xtype:'checkbox',name:'invalid',inputValue:1,flex:1,checked:true}
							
						]},
						{xtype:'fieldcontainer',layout:'hbox',items:[
							{fieldLabel:'部门',emptyText:'部门',xtype:'comboCompanyDepartment',flex:1,name:'departmentid'},
							{fieldLabel:'团队',emptyText:'团队',xtype:'comboCompanyTeam',flex:1,name:'teamid'}
							
						]},
	 					{fieldLabel:'描述',emptyText:'描述',xtype:'textarea',name:'explain'}
					],
					buttons:['->',
						{text:'相册名称',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/system/photo/updatePhotoGroup.do'),
								callback:function(formValues,data){
									store.reload();
									//record.set(formValues);
								}
							},
							handler:'onMateFormSubmit'
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]
				}]
			}).show()
    },
    onFileTitleUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增相册',
			width:400,
			viewModel:{data:{isUpdate:false}},
			items:[
				{xtype:'form',frame:false,
				viewModel:{data:{isStart :true,notStart :false}},	
				items:[
					{xtype:'fieldcontainer',layout:'hbox',items:[
						{fieldLabel:'相册名称',emptyText:'相册名称',xtype:'textfield',name:'title',flex:1,allowBlank:false},							
						{fieldLabel:'启用',xtype:'checkbox',name:'invalid',inputValue:1,flex:1,checked:true}
					]},
					{xtype:'fieldcontainer',layout:'hbox',items:[
						{fieldLabel:'部门',emptyText:'部门',xtype:'comboCompanyDepartment',flex:1,name:'departmentid'},
						{fieldLabel:'团队',emptyText:'团队',xtype:'comboCompanyTeam',flex:1,name:'teamid'}
					]},
					{fieldLabel:'描述',emptyText:'描述',xtype:'textarea',name:'explain'}
				],
				listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
				buttons:[
					'->',
					{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
						mateParameters:{
							url:Boot.appUrl('/system/photo/updatePhotoGroup.do'),
							params:{id:record.data.id},
							callback:function(formValues,data){
								store.reload();
							}
						},
						handler:'onMateFormSubmit'
					},
					{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
				]					
				//})
			}]
		});
		this.getView().add(win).show().center();
	},
    onPhotoTitleRemoveClick:function(button){			
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		var confirmText='<h6>删除文件：</h6>'+records[0].data.title;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除文件</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/system/photo/deletePhotoGroup.do'),
					params:{id:records[0].data.id},
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

    	//============================================================================添加
	onPhotoCreatClick:function(button){
		var	winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			var theme = Ext.getCmp('photo_type');
			var m = theme.getSelectionModel();
			if(m.selected.items.length!=1){
				Mate.alert('请选择一个相册!');
				return false;
			}
			var data = m.selected.items[0];
			// console.log(data.id);
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'新增图片',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'hrFileAlbumphotoForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/system/photo/addPhoto.do'),
									params:{groupid:data.id},
									callback:function(formValues,data){
										store.reload();
									}
								},
								handler:'onMateFormSubmit'
							},
							{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
						]					
					})
				]
			});
			//win.down('hrStaffActivityVoteAccountForm').hide();
			this.getView().add(win).show().center();
	},

	
	onPhotoRemoveClick:function(button){			
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		//if(!keys.length){return false;};
		var confirmText='<h6>删除文件：</h6>'+records[0].data.title;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除文件</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/system/photo/deletePhoto.do'),
					params:{id:records[0].data.id},
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

		//=========================================================================点击相册事件
	onChangePhotoLoadClick:function(this_,record,eOpts){
		var gridChange=this.lookup('gridChange');
		//console.log(gridChange.items.items[0].getStore());
		var storeView=gridChange.items.items[0];
		var storeChange=storeView.getStore();
		if(!record){
			storeChange.removeAll();
			return false;
		}	
		this_.select(record);
		Ext.apply(storeChange.proxy.extraParams,{groupid:record[0].data.id});
		storeChange.loadPage(1);
		storeChange.load({
					callback:function(){
						storeView.fireEvent('afterrender',storeView);
					}
				})
		//
	},

	//===============================================

	onResultsDataRefresh:function(this_){
		var gridChange=this.lookup('gridChange');
		var storeView=gridChange.items.items[0];
		//var panel=button.up('panel');
		//if(!panel){
		var dataview=this_.down('dataview');
		//}
		//console.log(dataview);
		dataview.getStore().load();		
		dataview.getStore().load({
					callback:function(){
						storeView.fireEvent('afterrender',storeView);
					}
				})
	}
	// 	var me=this,
	// 		account=APP.app.getAppData('account'),
	// 		salesView=me.lookup('salesView'),
	// 		salesStore=salesView.getStore(),
	// 		t1View=me.lookup('t1View'),
	// 		t1Store=t1View.getStore(),
	// 		meView=me.lookup('meView');
	// 	salesView.setLoading(true);
	// 	t1View.setLoading(true);
	// 	me.getResultsData(function(data){
	// 		//console.log(data)
	// 		salesStore.loadData(data.sales);
	// 		t1Store.loadData(data.t1);
			
	// 		t1Store.sort('funds_net_deposit','DESC')
	// 		t1Store.each(function(record,i){
	// 			record.set('ranking',i+1)
	// 		});
			
	// 		salesView.setLoading(false);
	// 		t1View.setLoading(false);
			
	// 		var store=data.store,
	// 			meRecord=store.getById(account.id);
	// 		if(!meRecord){
	// 			meRecord={data:false}
	// 		}else{
	// 			var ranking=store.indexOf(meRecord)+1;
	// 			if(meRecord.data.funds_net_deposit<0){
	// 				ranking=ranking-store.getCount()-1;
	// 			}
	// 			meRecord.set({ranking:ranking})
	// 		}
	// 		meView.setData({
	// 			account:account,
	// 			results:meRecord.data,
	// 			total:data.total
	// 		});
	// 	});
	// },
})