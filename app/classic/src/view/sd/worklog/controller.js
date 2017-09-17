Ext.define('APP.view.sd.worklog.controller',{
	extend:'APP.view.controller',
    alias:'controller.sd.worklog',
	onRecordAdd:function(button){
		var logDetail=this.lookup('logDetail');
		logDetail.removeAll();
		logDetail.add({xtype:'sd.worklog.form'})
	},
	onRecordEdit:function(button){
		var logGrid=this.lookup('logGrid'),
			logDetail=this.lookup('logDetail'),
			record=logGrid.getSelection()[0];
		if(record){
			logDetail.removeAll();
			logDetail.add({xtype:'sd.worklog.form',listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}}})
		}
	},
	onRecordPreview:function(grid,selected){
		var record=selected[0],
			logDetail=this.lookup('logDetail');
		if(record){
			grid.select(record);
			logDetail.removeAll();
			logDetail.add({xtype:'sd.worklog.preview',data:record})
		}	
	},
	
	
    onWorklogUpdate:function(button){
   		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'添加日志',
			width:800,
			items:[
			Ext.create({
				xtype:'hrServiceWorkWorklogForm',
				buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/system/worklog/updateWorkLog.do'),
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
	
	
    createWorklog:function(button){
   		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'添加日志',
			width:800,
			items:[
			Ext.create({
				xtype:'hrServiceWorkWorklogForm',
				buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/system/worklog/updateWorkLog.do'),
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
    updateWorklog:function(grid,rowIndex,colIndex,item,e,record,row){
    	var store=grid.getStore(),
    		winid=Mate.getWinId(this,'update-'+record.data.id);
    		grid.setSelection(record); 
    		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:record.data.namecn+'日志修改',
			width:800,
			//viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrServiceWorkWorklogForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/system/worklog/updateWorkLog.do'),
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
    replayWorklog:function(grid,rowIndex,colIndex,item,e,record,row){
    	var store=grid.getStore(),
    		winid=Mate.getWinId(this,'update-'+record.data.id);
    		grid.setSelection(record); 
    		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:record.data.namecn+'日志批复',
			width:800,
			viewModel:{data:{isRead:true,isReply:false}},
			items:[
			Ext.create({
				xtype:'hrServiceWorkWorklogForm',
				listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
				buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/system/worklog/updateWorkLog.do'),
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

    deleteWorklog:function(button){
    	var grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
			console.log(records);
		var keys=records[0].data.id;
		//if(!keys.length){return false;}
		var confirmText='<h6>删除日志：</h6>'+records[0].data.id;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除邮箱</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/system/worklog/deleteWorkLog.do'),
					params:{id:keys},
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
})