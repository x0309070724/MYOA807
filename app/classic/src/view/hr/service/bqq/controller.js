Ext.define('APP.view.hr.service.bqq.controller',{
    extend:'APP.view.controller',
    alias:'controller.hr.service.bqq',
	onBqqSelectionchange:function(grid,records,eOpts){
		var record=records[0],
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore();
		if(!record){
			storeChange.removeAll();
			return false;
		}	
		Ext.apply(storeChange.proxy.extraParams,{bqq:record.data.bqq});
		storeChange.loadPage(1);
	},
	// onChangeQQClick:function(grid,record){
	// 	var store=grid.getStore(),
	// 		gridChange=this.lookup('gridChange'),
	// 		storeChange=gridChange.getStore(),
	// 		winid=Mate.getWinId(this,record.data.id);
	// 	grid.select(record);
	// 	if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
	// 	var win=Ext.create('Ext.window.Window',{
	// 		id:winid,
	// 		title:'人事调动：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
	// 		modal:true,
	// 		items:[
	// 			Ext.create({
	// 				xtype:'hrStaffChangePositiveForm',
	// 				listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
	// 				buttons:[
	// 					'->',
	// 					{text:'保存信息',xtype:'submitbutton',
	// 						handler:'onMateFormSubmit',
	// 						mateParameters:{
	// 							url:Boot.appUrl('/hr/staff/change/updatePositive.do'),
	// 							params:{id:record.data.id},
	// 							callback:function(formValues,data){
	// 								if(data.success){
	// 									store.reload();
	// 									storeChange.reload();
	// 								}
	// 							}
	// 						}
	// 					},
	// 					'->'
	// 				]					
	// 			})
	// 		]
	// 	});
	// 	this.getView().add(win).show().center();
	// }
})