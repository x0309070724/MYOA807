Ext.define('APP.view.hr.file.document.controller',{
    extend:'APP.view.hr.controller',
    alias:'controller.hr.file.document',
//=========================================================================创建文件主题
    onFileTitleCreatClick:function(button){
    	var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			iconCls:'menu-edit',
			title:'文件类型',
			width:400,
			items:[
				{xtype:'form',frame:false,
					viewModel:{data:{isStart :true,notStart :false}},
					items:[
	 					{fieldLabel:'文件名称',emptyText:'文件名称',xtype:'textfield',name:'title'},
	 					{fieldLabel:'描述',emptyText:'描述',xtype:'textarea',name:'explain'}
					],
					buttons:['->',
						{text:'文件类型',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/system/file/updateFileGroup.do'),
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
			title:'新增文件',
			width:400,
			viewModel:{data:{isUpdate:false}},
			items:[
				{xtype:'form',frame:false,
				viewModel:{data:{isStart :true,notStart :false}},
				items:[
					{fieldLabel:'文件名称',emptyText:'文件名称',xtype:'textfield',name:'title'},
					{fieldLabel:'描述',emptyText:'描述',xtype:'textarea',name:'explain'}
				],
				listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
				buttons:[
					'->',
					{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
						mateParameters:{
							url:Boot.appUrl('/system/file/updateFileGroup.do'),
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
	onFileTitleRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();

		// Ext.Array.each(records,function(record){
		// 	msgDelList+='文件主题：'+record.data.plugin_description+'　'
		// 	keys.push(record.data.id);
		// 	msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
		// });
		//if(!keys.length){return false;};
		var confirmText='<h6>删除文件主题：</h6>'+records[0].data.title;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除文件主题</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/system/file/deleteFileGroup.do'),
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


   //============================================================================添加文件
	onFileCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			var theme = Ext.getCmp('file_type');
			var m = theme.getSelectionModel();
			if(m.selected.items.length!=1){
				Mate.alert('请选择一个文件主题!');
				return false;
			}
			var data = m.selected.items[0];
			// console.log(data.id);
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'新增文件',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'hrFileDocumentFileForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/system/file/updateFile.do'),
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
	onFileUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增文件',
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrFileDocumentFileForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/system/file/updateFile.do'),
								params:{id:record.data.id},
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
		this.getView().add(win).show().center();
	},
	onFileRemoveClick:function(button){
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
					url:Boot.appUrl('/system/file/deleteFile.do'),
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

		//=========================================================================点击主题事件
	onChangeFileLoadClick:function(this_,record,eOpts){
		var gridChange= this.lookup('gridChange'),
		storeChange=gridChange.getStore();
		if(!record){
			storeChange.removeAll();
			return false;
		}
		// console.log(this_)
		this_.select(record);
		Ext.apply(storeChange.proxy.extraParams,{groupid:record[0].data.id});
		storeChange.loadPage(1);
	},
})
