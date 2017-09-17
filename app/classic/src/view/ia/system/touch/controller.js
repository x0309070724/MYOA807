Ext.define('APP.view.ia.system.touch.controller',{
    extend:'APP.view.controller',
    alias:'controller.system.touch',
	//============================================================================新增员工
	onArticleCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'新增',
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'iaSystemTouchArticleForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/system/touch/updateArticle.do'),
								params:{typeid:1},
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
	//============================================================================更改员工资料
	onArticleUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改：'+record.data.title,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'iaSystemTouchArticleForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/system/touch/updateArticle.do'),
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
	//删除资料
	onArticleRemoveClick:function(button){	
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		
		Ext.Array.each(records,function(record){
			keys.push(record.data.id);
			msgDelList+='资料：'+record.data.title+'　<span class="x-ui-text-green">可删除</span><br/>'
		});
		if(!keys.length){return false;};
		var confirmText='<h6>删除资料：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除资料</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/system/touch/deleteArticle.do'),
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
	}	
	
	
	
	
	
	
	
	
	
	
	
	
})
