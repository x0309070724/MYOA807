Ext.define('APP.view.ia.account.change.controller',{
	extend:'APP.view.ia.account.controller',
	alias:'controller.ia.account.change',	
	returnTransferType:function(value,cell,record){
		return value==1?'销售A':'销售B'
	},
	
	//===================================================================================================================================================================批量交接
	onAccountBatchTransferClick:function(button){	
		var keys=[],
			salesmanidBefore=[],
			salesman2idBefore=[],
			winid=Mate.getWinId(this,'batchTransfer');
			grid=button.up('grid'),
			store=grid.getStore(),
			waitStore=this.lookup('waitGrid').getStore();;
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		store.each(function(record){
			keys.push(record.data.login);
		});
		if(!keys.length){
			Mate.showTask('<h6>无可用数据</h6>请向右侧表格添加数据后在操作...',true)
			return false;
		};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'批量交接　'+keys.length+' 个账户',
			border:false,
			items:[
				Ext.create({
					xtype:'iaAccountChangeTransferForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/batch/updateBatchTransfer.do'),
								params:{keys:keys},
								callback:function(formValues,data){
									waitStore.reload();
									store.removeAll();
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
	//===================================================================================================================================================================批量更新
	onAccountBatchUpdateClick:function(button){	
		var keys=[],
			winid=Mate.getWinId(this,'batchTransfer');
			grid=button.up('grid'),
			store=grid.getStore(),
			waitStore=this.lookup('waitGrid').getStore();;
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false;};
		store.each(function(record){
			keys.push(record.data.login);
		});
		if(!keys.length){
			Mate.showTask('<h6>无可用数据</h6>请向右侧表格添加数据后在操作...',true)
			return false;
		};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'批量更新　'+keys.length+' 个账户',
			border:false,
			items:[
				Ext.create({
					xtype:'iaAccountChangeUpdateForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/batch/updateBatchUpdate.do'),
								params:{keys:keys},
								callback:function(formValues,data){
									waitStore.reload();
									store.removeAll();
								}
							}
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	}
























});  
