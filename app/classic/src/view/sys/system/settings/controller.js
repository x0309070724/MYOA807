Ext.define('APP.view.sys.system.settings.controller',{
    extend:'APP.view.sys.controller',
    alias:'controller.sys.system.settings',
	//==============================================自动任务
	returnAutoCase:function(value,cell,record){
		switch(parseInt(value)){
			case 1:{var str='定时任务';}break;
			default:{var str='间隔任务';}break;
		}
		return str;
	},

	returnAutoTime:function(value,cell,record){
		return value+'分钟';
	},

	//============================================================================添加自动任务
	onAutoCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'新增自动任务',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'iaSystemAutoForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/addAutotaskConfig.do'),
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

	onAutoUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改自动任务：'+record.data.plugin_description,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'iaSystemAutoForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/updateAutotaskConfig.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
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

	onAutoRemoveClick:function(button){
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='自动任务：'+record.data.plugin_description+'　'
			keys.push(record.data.id);
			msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
		});
		if(!keys.length){return false;};
		var confirmText='<h6>删除自动任务：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除自动任务</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/deleteAutotaskConfig.do'),
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
	}










})
