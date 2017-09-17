Ext.define('APP.view.sd.mgr.call.change.controller',{
    extend:'APP.view.sd.mgr.call.controller',
    alias:'controller.sd.call.change',


	//============================================================================分配
	onAllotClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.select(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'号码分配：'+record.data.no,
			modal:true,
			items:[
				{xtype:'largeForm',
					parameter:{
						iconCls:'f-mt mt-users',
						fields:[
							{xtype:'hiddenfield',name:'idx',value:'ALLOT'},
							{fieldLabel:'号码',xtype:'textfield',name:'no',value:record.data.no,readOnly:true},
							{fieldLabel:'分配予',xtype:'comboCompanyStaff',name:'after',allowBlank:false},
							{fieldLabel:'生效日期',xtype:'datefield',name:'effectivedate',allowBlank:false}
						],
						submit:{
							url:Boot.appUrl('/sd/call/change/updateStaff.do'),
							callback:function(formValues,data){
								store.reload();
								storeChange.reload();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================交接
	onTransferClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.select(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'号码交接：'+record.data.no,
			modal:true,
			items:[
				{xtype:'largeForm',
					parameter:{
						iconCls:'f-mt mt-users',
						fields:[
							{xtype:'hiddenfield',name:'idx',value:'TRANSFER'},
							{fieldLabel:'号码',xtype:'textfield',name:'no',value:record.data.no,readOnly:true},
							{fieldLabel:'现使用人',xtype:'textfield',name:'namecn',value:record.data.namecn,readOnly:true},
							{fieldLabel:'交接后',xtype:'comboCompanyStaff',name:'after',allowBlank:false},
							{fieldLabel:'生效日期',xtype:'datefield',name:'effectivedate',allowBlank:false}
						],
						submit:{
							url:Boot.appUrl('/sd/call/change/updateStaff.do'),
							callback:function(formValues,data){
								store.reload();
								storeChange.reload();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================回收
	onRecyclingClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.select(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'号码回收：'+record.data.no,
			modal:true,
			items:[
				{xtype:'largeForm',
					parameter:{
						iconCls:'f-mt mt-users',
						fields:[
							{xtype:'hiddenfield',name:'idx',value:'RECYCLING'},
							{xtype:'hiddenfield',name:'after',value:0},
							{fieldLabel:'号码',xtype:'numberfield',name:'no',value:record.data.no,readOnly:true},
							{fieldLabel:'现使用人',xtype:'textfield',name:'namecn',value:record.data.namecn,readOnly:true},
							{fieldLabel:'生效日期',xtype:'datefield',name:'effectivedate',allowBlank:false}
						],
						submit:{
							url:Boot.appUrl('/sd/call/change/updateStaff.do'),
							callback:function(formValues,data){
								store.reload();
								storeChange.reload();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},





	
	

		
})
