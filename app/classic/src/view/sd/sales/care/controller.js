Ext.define('APP.view.sd.sales.care.controller',{
	extend:'APP.view.sd.controller',
	alias:'controller.sd.sales.care',
	
	
	onFundsTrackClick:function(grid,record,item,index,e,eOpts){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,'track');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'出金跟进',
			modal:true,
			items:[
				{xtype:'largeForm',
					parameter:{
						iconCls:'f-mt mt-trading',
						fields:[
							{xtype:'hiddenfield',name:'orderno',value:record.data.orderno,readOnly:true},
							{fieldLabel:'客户账号',xtype:'textfield',name:'login',value:record.data.account_type+' '+record.data.login,readOnly:true},
							{fieldLabel:'客户姓名',xtype:'textfield',name:'name',value:Ext.util.Format.stringMerge(record.data.account_namecn,record.data.account_name),readOnly:true},
							{fieldLabel:'出金金额',xtype:'textfield',name:'amount_usd',value:record.data.amount_usd,readOnly:true},
							{fieldLabel:'跟进内容',xtype:'textarea',name:'explain',height:120,minLength:2,maxLength:240}
						],
						submit:{
							url:Boot.appUrl('/sd/sales/care/updateFunds.do'),
							callback:function(formValues,data){
								store.remove(record);
								storeChange.reload();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	}
	




});  
