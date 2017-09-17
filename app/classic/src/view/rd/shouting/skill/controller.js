Ext.define('APP.view.rd.shouting.skill.controller',{
    extend:'APP.view.rd.controller',
	alias:'controller.rd.shouting.skill',
	
	returnCallCmd:function(value,cell,record){
		return Ext.String.format(
			'{0}',
			value==1?'多':'空'
		);
	},
	returnCallResult:function(value,cell,record){
		var text='',value='';
		if(record.data.open_time){
			text='持仓中'
			value=10
		}else if(record.data.close_time){
			text='已平仓'
			value='止盈'
		}else{
			text='未进场'
			value=1.62555
		}
		return Ext.String.format(
			'{0}<r>{1}</r>',
			text,
			value
		);
	},

	returnCallOpen:function(value,cell,record){
		return Ext.String.format(
			'{0}<r>{1}</r>',
			Ext.Date.format(record.data.open_time,'m:d H:i A'),
			record.data.open_price
		);
	},
	returnCallClose:function(value,cell,record){
		return Ext.String.format(
			'{0}<r>{1}</r>',
			Ext.Date.format(record.data.close_time,'m:d H:i A'),
			record.data.close_price
		);
	},




	returnTcType:function(value,cell,record){
		var text='';
		switch(value){
			case 'DEVISES':{text='外汇'}break;
			case 'INDICES':{text='指数'}break;
			case 'ACTIONS':{text='股票'}break;
			case 'TAUX':{text='债券'}break;
			case 'COMMODITIES':{text='商品'}break;
			default:{text=value}break;
		}
		return Ext.String.format(
			'{0}',
			text,
			value
		);
	},
	returnTcDaily:function(value,cell,record){
		return Ext.String.format(
			'<span class="icon icon-{0}"></span><r>{1}</r>',
			(record.data.daily).replace('_','-'),
			record.data.daily_change
		);
	},
	returnTcWeekly:function(value,cell,record){
		return Ext.String.format(
			'<span class="icon icon-{0}"></span><r>{1}</r>',
			(record.data.weekly).replace('_','-'),
			record.data.weekly_change
		);
	},
	returnTcTitle:function(value,cell,record){
		return Ext.String.format(
			'<a href="{0}" target="_blank" class="f-mt mt-figure-3 x-ui-text-green"></a>{1}',
			record.data.image,
			value
		);
	},
	
	
	onTcDetail:function(table,record,item,index){
		//console.log(table,record,item,index);
		var winid=Mate.getWinId(this,record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		table.select(index);
		Ext.widget({
			xtype:'rdShoutingSkillTcInfo',
			id:winid,
			record:record
		});
	},

	onCallCreateClick:function(button){
		var grid = button.up('grid'),
			store = grid.getStore(),
			winid = Mate.getWinId(this,'create');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'添加喊单记录',
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'rdShoutingSKillCallFrom',
					//listeners:{beforerender:function(formPanel){Ext.getCmp('callResult').hide();}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/tool/updatecall.do'),
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

	//============================================================================更新 
	onCallUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新喊单记录：'+record.data.symbol,
			viewModel:{data:{isUpdate:true,xxx:new Date().getTime()}},
			items:[
				Ext.create({
					xtype:'rdShoutingSKillCallFrom',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/tool/updatecall.do'),
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
	}

});  

