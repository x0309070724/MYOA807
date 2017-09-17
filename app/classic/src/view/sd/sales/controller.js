Ext.define('APP.view.sd.sales.controller',{
	extend:'APP.view.sd.controller',
	alias:'controller.sd.sales',
	getResultsData:function(cfg,callback){
		Mate.ajax({
			url:Boot.appUrl('/super/getStatistics.do'),
			params:{
				sp:'SP_SD_RESULTS_STATISTICS',
				menu:'staff',
				datepart:'month',
				startdate:cfg.startdate,
				enddate:cfg.enddate
			},
			success:function(json){
				var store=Ext.create('Ext.data.Store',{data:json.plant});
				store.sort('funds_net_deposit','DESC')
				
				var salesData=[],
					t1Key={},t1Data=[],
					total={
						beijing:{funds_deposit:0,funds_withdrawal:0,funds_net_deposit:0},
						shenzhen:{funds_deposit:0,funds_withdrawal:0,funds_net_deposit:0}
					},
					//total={funds_deposit:0,funds_withdrawal:0,funds_net_deposit:0},
					sRanking=1,
					tRanking=1;
				store.each(function(record,i){
					//======================================================销售
					if(record.data.funds_net_deposit!=0){
						if(salesData.length<10){
							salesData.push({
								id:record.data.id,
								objects:record.data.objects,
								objects_icon:record.data.objects_icon,
								ranking:sRanking++,
								name:record.data.name,
								namecn:record.data.namecn,
								teamid:record.data.teamid,
								team_name:record.data.team_name,
								managerid:record.data.managerid,
								funds_deposit:record.data.funds_deposit,
								funds_withdrawal:record.data.funds_withdrawal,
								funds_net_deposit:record.data.funds_net_deposit
							})
						}
					}
					//======================================================团队
					var key=record.data.teamid.toString().substr(0,9)+'000';
					if(!t1Key[key]){
						var team=Mate.findManager(key);
						t1Key[key]={
							id:key,
							//ranking:tRanking++,
							ranking:0,
							objects:team.name,
							manager_namecn:team.manager_namecn,
							manager_name:team.manager_name,
							funds_deposit:0,
							funds_withdrawal:0,
							funds_net_deposit:0
						}
					}
					t1Key[key]['funds_deposit']+=record.data.funds_deposit;
					t1Key[key]['funds_withdrawal']+=record.data.funds_withdrawal;
					t1Key[key]['funds_net_deposit']+=record.data.funds_net_deposit;
					
					//======================================================网点
//					total.funds_deposit+=record.data.funds_deposit;
//					total.funds_withdrawal+=record.data.funds_withdrawal;
//					total.funds_net_deposit+=record.data.funds_net_deposit;

					var key=record.data.teamid.toString().substr(3,3);
					if(key=='101'){
						total.beijing.funds_deposit+=record.data.funds_deposit;
						total.beijing.funds_withdrawal+=record.data.funds_withdrawal;
						total.beijing.funds_net_deposit+=record.data.funds_net_deposit;
					}else if(key=='102'){
						total.shenzhen.funds_deposit+=record.data.funds_deposit;
						total.shenzhen.funds_withdrawal+=record.data.funds_withdrawal;
						total.shenzhen.funds_net_deposit+=record.data.funds_net_deposit;
					}
				});
				for(i in t1Key){
					//console.log(t1Key[i])
					if(t1Key[i].funds_deposit!=0||t1Key[i].funds_withdrawal!=0){t1Data.push(t1Key[i])}
				};
				return callback({store:store,sales:salesData,t1:t1Data,total:total});
			}
		});	
	},
	onResultsDataRefresh:function(){
		var me=this,
			view=me.getView(),
			viewModel=view.getViewModel(),
			cfg=viewModel.getData(),
			account=APP.app.getAppData('account'),
			salesView=me.lookup('salesView'),
			salesStore=salesView.getStore(),
			t1View=me.lookup('t1View'),
			t1Store=t1View.getStore(),
			meView=view.prev('panel');
			
			
		view.setLoading(true);
		
		me.getResultsData(cfg,function(data){
			//console.log(data)
			salesStore.loadData(data.sales);
			t1Store.loadData(data.t1);
			
			t1Store.sort('funds_net_deposit','DESC')
			t1Store.each(function(record,i){
				record.set('ranking',i+1)
			});
			
			view.setLoading(false);
			
			var store=data.store,
				meRecord=store.getById(account.id);
			if(!meRecord){
				meRecord={data:false}
			}else{
				var ranking=store.indexOf(meRecord)+1;
				if(meRecord.data.funds_net_deposit<0){
					ranking=ranking-store.getCount()-1;
				}
				meRecord.set({ranking:ranking})
			}
//			meView.setData({
//				account:account,
//				results:meRecord.data,
//				total:data.total
//			});
			account.results=meRecord.data;
			meView.getViewModel().set({
				me:account,
				resultsPK:data.total
			});
		});
	},
	onResultsRender:function(panel){
		var nDate=Ext.Date.format(new Date(),'Y-m');
		panel.getViewModel().setData({startdate:nDate,enddate:nDate,tipText:nDate});
		this.onResultsDataRefresh();
	},
	onResultsChangeDate:function(panel,tool){
		var me=this,
			viewModel=me.getView().getViewModel(),
			cfg=viewModel.getData();
		var oDate=cfg.enddate,
			nDate=Ext.Date.format(oDate,'Y-m');
		var currValue=Ext.Date.format(new Date(),'Y-m'),
			prevValue=Ext.Date.format(Ext.Date.add(new Date(oDate),Ext.Date.MONTH,-1),'Y-m'),
			nextValue=Ext.Date.format(Ext.Date.add(new Date(oDate),Ext.Date.MONTH,1),'Y-m');
		
		var regionMenu=
			Ext.widget({
				xtype:'menu',
				items:[
					{text:'本　月　<r>'+currValue+'</r>',value:currValue,handler:function(e){
						viewModel.setData({startdate:e.getValue(),enddate:e.getValue(),tipText:e.getValue()})
						me.onResultsDataRefresh();
					}},
					{text:'上一月　<r>'+prevValue+'</r>',value:prevValue,handler:function(e){
						viewModel.setData({startdate:e.getValue(),enddate:e.getValue(),tipText:e.getValue()})
						me.onResultsDataRefresh();
					}},
					{text:'下一月　<r>'+nextValue+'</r>',value:nextValue,disabled:nextValue>currValue,handler:function(e){
						viewModel.setData({startdate:e.getValue(),enddate:e.getValue(),tipText:e.getValue()})
						me.onResultsDataRefresh();
					}}
//					{text:'指定月份',
//						menu:{xtype:'datemenu',handler:function(e){
//							viewModel.setData({startdate:e.getValue(),enddate:e.getValue(),tipText:e.getValue()})
//							me.onResultsDataRefresh();
//						}}
//					}
				]
			});
		regionMenu.showBy(tool.el);
	},
	
	











	
	
	//=========================================================================================================================================================库存概览
	//======================================================================销售员库存概览
	onSalesStorageRender:function(me){
		var me=this,
			storageGauge=this.lookup('storageGauge');
			storageGauge.setLoading(true);
		Mate.ajax({
			url:Boot.appUrl('/analysis/getStatistics.do'),
			params:{
				sp:'SP_SD_RESOURCES_STORAGE',
				menu:'staff',
				staff:1
			},
			success:function(json){
				storageGauge.setLoading(false);
				//console.log(json.plant[0]);
				var record=json.plant[0];
				if(!record){
					storageGauge.setHtml('<div class="x-grid-empty">No Records</div>');
					return false;
				}
				var items=me.getStorageGauge(record);
				storageGauge.add(items);
			}
		});
	},
	
	
	
	
	//=========================================================================================================================================================电资资料更新
	onResourcesUpdateClick:function(grid,record,item,index,e,eOpts){
		if(!index){
			var devTab=this.lookup('devTab'),
				grid=devTab.getActiveTab();
				record=grid.getSelection()[0];
		}
		var winid=Mate.getWinId(this,'update'),
			store=grid.getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'电资更新',
			modal:true,
			items:[
				{xtype:'largeForm',
					parameter:{
						iconCls:'f-mt mt-investment',
						fields:[
							{fieldLabel:'手机',xtype:'textfield',name:'mobile',value:record.data.mobile,readOnly:true},
							{fieldLabel:'姓名',xtype:'textfield',name:'name',value:record.data.name},
							{fieldLabel:'Email',xtype:'textfield',name:'email',value:record.data.email},
							{fieldLabel:'QQ',xtype:'textfield',name:'qq',value:record.data.qq},
							{fieldLabel:'备注',xtype:'textarea',name:'explain',value:record.data.explain,height:60,maxLength:240}
						],
						submit:{
							url:Boot.appUrl('/sd/sales/updateResources.do'),
							callback:function(formValues,data){
								record.set(formValues);
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},

	//=========================================================================================================================================================客户资料更新
	onCareUpdateClick:function(grid,record,item,index,e,eOpts){
		if(!index){
			var devTab=this.lookup('devTab'),
				grid=devTab.getActiveTab();
				record=grid.getSelection()[0];
		}
		var winid=Mate.getWinId(this,'update'),
			store=grid.getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'客户资料更新',
			modal:true,
			items:[
				{xtype:'largeForm',
					parameter:{
						iconCls:'f-mt mt-investment',
						fields:[
							{xtype:'hiddenfield',name:'login',value:record.data.login,readOnly:true},
							{fieldLabel:'手机',xtype:'textfield',name:'mobile',value:record.data.mobile,readOnly:true},
							{fieldLabel:'姓名',xtype:'textfield',name:'name',value:record.data.name},
							{fieldLabel:'Email',xtype:'textfield',name:'email',value:record.data.email},
							{fieldLabel:'QQ',xtype:'textfield',name:'qq',value:record.data.qq},
							{fieldLabel:'备注',xtype:'textarea',name:'explain',value:record.data.explain,height:60,maxLength:240}
						],
						submit:{
							url:Boot.appUrl('/sd/sales/updateCare.do'),
							callback:function(formValues,data){
								record.set(formValues);
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},



	//============================================================================分配记录 日期行点击
	onAllotTotalChange:function(grid,selected){
		var record=selected[0],
			gridDetail=this.lookup('gridDetail'),
			storeDetail=gridDetail.getStore();
		if(!record){
			storeDetail.removeAll();
			return false;
		}	
		grid.select(record);
		Ext.apply(storeDetail.proxy.extraParams,{
			type:record.data.type,
			date:record.data.date,
			staffid:record.data.staffid,
			teamid:record.data.teamid
		});
		storeDetail.loadPage(1);
	},
	//============================================================================销售记录 日期行点击
	onTrackTotalChange:function(grid,selected){
		var record=selected[0],
			gridDetail=this.lookup('gridDetail'),
			storeDetail=gridDetail.getStore();
		if(!record){
			storeDetail.removeAll();
			return false;
		}	
		grid.select(record);
		Ext.apply(storeDetail.proxy.extraParams,{
			startdate:record.data.objects,
			enddate:record.data.objects
		});
		storeDetail.loadPage(1);
	},

	//=========================================================================================================电资选中
	onDataChange:function(model,records){	
		if(!records.length){return false}
		var me=this,
			dev=this.getView(),
			devTab=this.lookup('devTab'),
			devHistory=this.lookup('devHistory'),
			devPanel=this.lookup('devPanel'),
			devForm=this.lookup('devForm'),
			fieldBoxTip=this.lookup('fieldBoxTip'),
			fieldTrack=this.lookup('fieldTrack'),
			fieldPanel=this.lookup('fieldPanel');
			record=records[0];
			
		//console.log(dev)	
			
		if(record){
			dev.getViewModel().set({selection:record.data});
			devPanel.setDisabled(false);
			
			fieldBoxTip.setData(record.data);
			fieldTrack.setValue(record.data.track||-100);
			devForm.reset();
			devForm.getForm().setValues({
				idx:record.data.idx,
				idxkey:record.data.idxkey,
				track:record.data.track||-100,
				rating:record.data.rating
			});
			devHistory.getStore().load({
				params:{menu:'history',mobile:record.data.mobile}
			});
		}
	},

	
	//=========================================================================================================选择 跟进情况
	onTrackFieldChange:function(segmented,value){
		var devForm=this.lookup('devForm'),
			fieldPanel=this.lookup('fieldPanel');
			fieldPanel.removeAll(true);
		switch(value){
			//======================================待跟进
			case 1:{
				fieldPanel.add([
					{xtype:'radiogroup',columns:6,fieldLabel:'原因',name:'tag',allowBlank:false,msgTarget:'side',
						items:[
							{boxLabel:'未接通',inputValue:'未接通'},
							{boxLabel:'不排斥',inputValue:'不排斥'},
							{boxLabel:'意向明确',inputValue:'意向明确'}
						]
					},
					{xtype:'fieldcontainer',fieldLabel:'下次联络',layout:'hbox',items:[
						{xtype:'datefield',name:'date',minValue:new Date(),maxValue:Ext.Date.add(new Date(),Ext.Date.DAY,14),allowBlank:false,width:140},
						{xtype:'timefield',name:'time',minValue:'10:00',maxValue:'22:00',increment:60,margin:'0 10 0 5',format:'H:i A',width:100},
						{xtype:'ratingfield',name:'rating',value:0,flex:1}
					]},
					{fieldLabel:'计划交流',xtype:'textfield',name:'reserve_explain',minLength:2,maxLength:240,allowBlank:false},
					{fieldLabel:'注释',xtype:'textarea',name:'explain',height:80,minLength:2,maxLength:800,allowBlank:false}
				]);
			}break;
			//======================================无意向
			case -1:{
				fieldPanel.add([
//					{xtype:'radiogroup',columns:6,fieldLabel:'原因',name:'tag',allowBlank:false,msgTarget:'side',
//						items:[
//							{boxLabel:'没兴趣',inputValue:'没兴趣'},
//							{boxLabel:'排斥',inputValue:'排斥'},
//							{boxLabel:'其它',inputValue:'其它'}
//						]
//					},
					{xtype:'hiddenfield',name:'tag',value:'其它'},
					{fieldLabel:'注释',xtype:'textarea',name:'explain',height:80,minLength:2,maxLength:800,allowBlank:false}
				]);
			}break;
			//======================================无效
			case -100:{
				fieldPanel.add([
					{xtype:'radiogroup',columns:6,fieldLabel:'原因',name:'tag',allowBlank:false,msgTarget:'side',
						items:[
							{boxLabel:'停机',inputValue:'停机'},
							{boxLabel:'空号',inputValue:'空号'}
						]
					},
					{fieldLabel:'注释',xtype:'textarea',name:'explain',height:80,maxLength:800,allowBlank:false,disabled:true}
				]);
			}break;
		}	
	},
	
	
	
	//=========================================================================================================提交跟进结果
	onTrackUpdate:function(button){
		var me=this,
			buttonText=button.getText(),
			devTab=this.lookup('devTab'),
			devPanel=this.lookup('devPanel'),
			devForm=this.lookup('devForm'),
			devHistory=this.lookup('devHistory');
			devToday=this.lookup('devToday'),
			devGrid=devTab.getActiveTab(),
			params=devForm.getForm().getValues();
			
		if(devForm.getForm().isValid()){
			button.setDisabled(true).setText('Saving...');
			Mate.ajax({
				url:Boot.appUrl('/sd/sales/updateTrack.do'),
				params:params,
				success:function(data){
					button.setDisabled(false).setText(buttonText);
					Mate.showTask(Mate.settings.successMessage);						
					
					//======================================================ADD 今日记录
					var record=devGrid.getSelection()[0]||{},
						trackRecord=Ext.create('Ext.data.Model',{
							id:new Date().getTime(),
							name:record.data.name,
							mobile:record.data.mobile,
							track:params.track,
							tag:params.tag,
							explain:params.explain,
							reserve_date:params.date,
							reserve_time:params.time,
							time:new Date().getTime()
						});
					devToday.getStore().add(trackRecord);
					devToday.getView().refresh();
					
					devGrid.getStore().remove(record);
					devPanel.setDisabled(true);
				},
				failure:function(){
					button.setDisabled(false).setText(buttonText);
				}
			});
		}
	}
	




});  
