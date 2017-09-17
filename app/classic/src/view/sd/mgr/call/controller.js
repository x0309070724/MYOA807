Ext.define('APP.view.sd.mgr.call.controller',{
    extend:'APP.view.sd.controller',
    alias:'controller.sd.call',
	
	returnNoStatus:function(value,cell,record){
		var icon='',
			text='';
		if(record.data.invalid){
			icon='mt-no';
			text='已弃用';
		}else{
			icon='mt-yes';
			text=record.data.status;
		}
		return Ext.String.format(
			'<i class="f-mt {0}" data-qtip="{1}"></i> {1}',
			icon,
			text
		);
	},
	
	
	returnNoSync:function(value,cell,record){
		var icon='',
			text='';
			
		if(record.data.invalid){
			icon='mt-no';
			text='已弃用';
		}else{
			if(record.data.sync<0){
				icon='mt-warning';
				text=record.data.sync_message;
			}else{
				icon='mt-yes';
				text=record.data.sync_message;
			}
		}
		return Ext.String.format(
			'<i class="f-mt {0}" data-qtip="{1}"></i>',
			icon,
			text
		);
	},
	
	returnFakeReason:function(value,cell,record){
		var val=record.data.othernum,
			text='';
		if(val.length!=11){
			text='服务号';
		}else{
//			var staff=APP.app.getData('company/staff');
//			var yes=Ext.Array.findBy(staff,function(item){
//				return  item.mobile==val;
//			});
			text='';
		}
		return Ext.String.format(
			'<span class="x-ui-text-red">{1}</span>',
			text
		);
	},
	
	//============================================================================调动、变更
//	onChangeStaffClick:function(grid,selected){
//		var record=selected[0],
//			gridChange=this.lookup('gridChange'),
//			storeChange=gridChange.getStore();
//		if(!record){
//			storeChange.removeAll();
//			return false;
//		}	
//		grid.select(record);
//
//		Ext.apply(storeChange.proxy.extraParams,{no:record.data.no});
//		storeChange.loadPage(1);
//	},
//	
	
	//================================================================================================================================================号码库管理
	//================================================================================================================================================号码库管理
	//============================================================================新增号码
	onCallNoCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'号码入库',
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'sdCallNoForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/call/updateNo.do'),
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
	//============================================================================更改号码
	onCallNoUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改号码：'+record.data.no,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'sdCallNoForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/sd/call/updateNo.do'),
								params:{id:record.data.id},
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
	}
})
