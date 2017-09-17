Ext.define('APP.view.ia.system.funds.controller',{
    extend:'APP.view.controller',
    alias:'controller.ia.system.funds',

	//===========================================================================================================================================支付接口
	//===========================================================================================================================================支付接口
	//============================================================================添加 支付接口
	onPayCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加支付接口',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'iaSystemFundsSettingsPayForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								handler:'onMateFormSubmit',
								mateParameters:{
									url:Boot.appUrl('/trade/settings/updatePay.do'),
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
					xtype:'iaSystemFundsSettingsPayForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/trade/settings/updatePay.do'),
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
					url:Boot.appUrl('/trade/settings/deletePay.do'),
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
	//===========================================================================================================================================支付接口 END
	//===========================================================================================================================================支付接口	 END
	

	
})
