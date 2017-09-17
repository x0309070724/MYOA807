Ext.define('APP.view.sd.mgr.res.controller',{
	extend:'APP.view.sd.controller',
	alias:'controller.sd.mgr.res',
	//======================================================================公司、团队库存概览
	onStorageRender:function(me){
		var me=this,
			storageGauge=this.lookup('storageGauge');
			storageGauge.setLoading(true);
		Mate.ajax({
			url:Boot.appUrl('/analysis/getStatistics.do'),
			params:{
				sp:'SP_SD_RESOURCES_STORAGE',
				menu:'company'
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

	//============================================================================
	onStorageChange:function(grid,selected){
		var me=this,
			storageGauge=this.lookup('storageGauge'),
			record=selected[0];
		storageGauge.removeAll();
		if(!record){
			storageGauge.setHtml('<div class="x-grid-empty">No Records</div>');
			return false;
		}
		var items=me.getStorageGauge(record.data);
		storageGauge.add(items);
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
		var idx='TEAM',
			idxkey=record.data.teamid;
		if(record.data.staffid>0){
			idx='STAFF';
			idxkey=record.data.staffid;
		}
		Ext.apply(storeDetail.proxy.extraParams,{
			type:record.data.type,
			date:record.data.date,
			idx:idx,
			idxkey:idxkey
//			staffid:record.data.staffid,
//			teamid:record.data.teamid
		});
		storeDetail.loadPage(1);
	},


	//============================================================================销售记录 日期行点击
	onTrackTotalChange:function(grid,selected){
		var record=selected[0],
			gridTotal=this.lookup('gridTotal'),
			gridDetail=this.lookup('gridDetail'),
			storeTotal=gridTotal.getStore(),
			storeDetail=gridDetail.getStore();
		if(!record){
			storeDetail.removeAll();
			return false;
		}	
		grid.select(record);
		storeDetail.removeAll();
		Ext.apply(storeDetail.proxy.extraParams,{
			staffid:record.data.id,
			startdate:storeTotal.proxy.extraParams.startdate,
			enddate:storeTotal.proxy.extraParams.enddate
		});
		storeDetail.loadPage(1);
	},




	//=========================================================================================================================================================总库存
	onWarehousingRender:function(me){
		var storageGauge=this.lookup('storageGauge');
			storageGauge.setLoading(true);
		Mate.ajax({
			url:Boot.appUrl('/analysis/getStatistics.do'),
			params:{
				sp:'SP_SD_RESOURCES_STORAGE',
				menu:''
			},
			success:function(json){
				storageGauge.setLoading(false);
				var record=json.plant[0];
				if(!record){
					storageGauge.setHtml('<div class="x-grid-empty">No Records</div>')
					return false
				}
				var sum=function(v1,v2){
					var v=(record[v1]/record[v2])*100,
						v=Ext.util.Format.stringNumeral(v,2);
					return v;
				}
				var items=[
					{xtype:'container',items:[
						{xtype:'box',userCls:'x-ui-gauge-label',html:'<div><b>ALL</b><br/><s>'+record.storage+'</s></div>',width:160,flex:0}, 
						{ui:'orange',value:sum('track','storage'),textTpl:'<s>开发中</s><br/><b>{value}%</b>'}, 
						{ui:'blue',value:sum('track_new','storage'),textTpl:'<s>未跟进</s><br/><b>{value}%</b>'},
						{ui:'green',value:sum('track_yes','storage'),textTpl:'<s>意向</s><br/><b>{value}%</b>'},
						{ui:'red',value:sum('track_invalid','storage'),textTpl:'<s>无效</s><br/><b>{value}%</b>'} 
					]},
					{xtype:'container',items:[
						{xtype:'box',userCls:'x-ui-gauge-label',html:'<div><b>A</b><br/><s>'+record.storage_a+'</s></div>',width:160,flex:0}, 
						{ui:'orange',value:sum('track_a','storage_a'),textTpl:'<s>开发中</s><br/><b>{value}%</b>'}, 
						{ui:'blue',value:sum('track_new_a','storage_a'),textTpl:'<s>未跟进</s><br/><b>{value}%</b>'}, 
						{ui:'green',value:sum('track_yes_a','storage_a'),textTpl:'<s>意向</s><br/><b>{value}%</b>'},
						{ui:'red',value:sum('track_invalid_a','storage_a'),textTpl:'<s>无效</s><br/><b>{value}%</b>'} 
					]},
					{xtype:'container',items:[
						{xtype:'box',userCls:'x-ui-gauge-label',html:'<div><b>B</b><br/><s>'+record.storage_b+'</s></div>',width:160,flex:0}, 
						{ui:'orange',value:sum('track_b','storage_b'),textTpl:'<s>开发中</s><br/><b>{value}%</b>'}, 
						{ui:'blue',value:sum('track_new_b','storage_b'),textTpl:'<s>未跟进</s><br/><b>{value}%</b>'},
						{ui:'green',value:sum('track_yes_b','storage_b'),textTpl:'<s>意向</s><br/><b>{value}%</b>'},
						{ui:'red',value:sum('track_invalid_b','storage_a'),textTpl:'<s>无效</s><br/><b>{value}%</b>'} 
					]},
					{xtype:'container',items:[
						{xtype:'box',userCls:'x-ui-gauge-label',html:'<div><b>C</b><br/><s>'+record.storage_c+'</s></div>',width:160,flex:0}, 
						{ui:'orange',value:sum('track_c','storage_c'),textTpl:'<s>开发中</s><br/><b>{value}%</b>'}, 
						{ui:'blue',value:sum('track_new_c','storage_c'),textTpl:'<s>未跟进</s><br/><b>{value}%</b>'},
						{ui:'green',value:sum('track_yes_c','storage_c'),textTpl:'<s>意向</s><br/><b>{value}%</b>'},
						{ui:'red',value:sum('track_invalid_c','storage_a'),textTpl:'<s>无效</s><br/><b>{value}%</b>'} 
					]},
					{xtype:'container',items:[
						{xtype:'box',userCls:'x-ui-gauge-label',html:'<div><b>D</b><br/><s>'+record.storage_d+'</s></div>',width:160,flex:0}, 
						{ui:'orange',value:sum('track_d','storage_d'),textTpl:'<s>开发中</s><br/><b>{value}%</b>'}, 
						{ui:'blue',value:sum('track_new_d','storage_d'),textTpl:'<s>未跟进</s><br/><b>{value}%</b>'},
						{ui:'green',value:sum('track_yes_d','storage_d'),textTpl:'<s>意向</s><br/><b>{value}%</b>'},
						{ui:'red',value:sum('track_invalid_d','storage_a'),textTpl:'<s>无效</s><br/><b>{value}%</b>'} 
					]}
				];
				storageGauge.add(items);
			}
		});
	},


	//=========================================================================================================================================================新增至黑名单
	onFilterUpdateClick:function(button){
		var grid=this.getView(),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'update');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'添加黑名单',
			modal:true,
			items:[
				{xtype:'largeForm',parameter:{
					iconCls:'f-mt mt-button-remove',
					fields:[
						{fieldLabel:'手机',xtype:'textfield',name:'mobile',allowBlank:false},
						{fieldLabel:'原因',xtype:'textarea',name:'explain',allowBlank:false,height:120,maxLength:480}
					],
					submit:{
						url:Boot.appUrl('/sd/resources/manager/updateFilter.do'),
						callback:function(formValues,data){
							store.reload();
						}
					}
				}}
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================删除
	onFilterRemoveClick:function(button){	
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='黑名单：<b>'+record.data.mobile+'</b>　'
			if(record.data.action==0){
				msgDelList+='<span class="x-ui-text-red">不可删除</span>　'+record.data.mobile+' 由系统创建<br/>'
			}else{
				keys.push(record.data.id);
			}
		});
		if(!keys.length){
			Mate.warning('<h6>无法解除黑名单：</h6>'+msgDelList);
			return false;
		};
		var confirmText='<h6>解除黑名单：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在解除黑名单</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/resources/manager/deleteFilter.do'),
					params:{keys:keys},
					success:function(data,opts){
						store.remove(records);
						grid.getView().refresh();
						Mate.showTask(Mate.settings.successMessage);
					},
					failure:function(json){
						Ext.MessageBox.hide();
						Mate.error(json.message);
					}
				});
			}
		});
	},







	//======================================================================================================================================分配
	//======================================================================================================================================分配
	//=====================================================================随机
	onAllotRandomClick:function(grid,record,item,index,e,eOpts){
		var winid=Mate.getWinId(this,'allotRandom'),
			store=grid.getStore(),
			params=store.proxy.extraParams;
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'电资分配·随机',
			modal:true,
			items:[
				{xtype:'largeForm',
					viewModel:true,
					listeners:{beforerender:function(formPanel){
						formPanel.getForm().setValues({
							name:record.data.objects+' '+record.data.objects_tip,
							idx:params.menu.toUpperCase(),
							idxkey:record.data.id,
							_a:record.data.storage_a,
							_b:record.data.storage_b,
							_c:record.data.storage_c,
							_d:record.data.storage_d
						});
						//formPanel.getViewModel().set(record.data);
						if(params.menu=='team'){
							formPanel.getViewModel().set({
								a:record.data.allot_team_a,
								b:record.data.allot_team_b,
								c:record.data.allot_team_c,
								d:record.data.allot_team_d
							});
						}else{
							formPanel.getViewModel().set({
								a:record.data.allot_staff_a,
								b:record.data.allot_staff_b,
								c:record.data.allot_staff_c,
								d:record.data.allot_staff_d
							});
						}
					}},
					parameter:{
						iconCls:'f-mt mt-database',
						fields:[
							{xtype:'hiddenfield',name:'idx'},
							{xtype:'hiddenfield',name:'idxkey'},
							{fieldLabel:'分配予',xtype:'textfield',name:'name',margin:'0 0 20 0',readOnly:true},
							
							{fieldLabel:'A 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_a',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-plus x-ui-text-green x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'a',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{a}'}}
							]},
							{xtype:'box',bind:{html:'可用资源剩余：<b class="x-ui-text-red">{a:stringInteger}</b> 个'},margin:'-5 0 10 74'},
							
							{fieldLabel:'B 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_b',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-plus x-ui-text-green x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'b',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{b}'}}
							]},
							{xtype:'box',bind:{html:'可用资源剩余：<b class="x-ui-text-red">{b:stringInteger}</b> 个'},margin:'-5 0 10 74'},
			
							{fieldLabel:'C 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_c',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-plus x-ui-text-green x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'c',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{c}'}}
							]},
							{xtype:'box',bind:{html:'可用资源剩余：<b class="x-ui-text-red">{c:stringInteger}</b> 个'},margin:'-5 0 10 74'},
			
							{fieldLabel:'D 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_d',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-plus x-ui-text-green x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'d',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{d}'}}
							]},
							{xtype:'box',bind:{html:'可用资源剩余：<b class="x-ui-text-red">{d:stringInteger}</b> 个'},margin:'-5 0 0 74'}
						],
						submit:{
							url:Boot.appUrl('/sd/resources/allot/updateRandom.do'),
							callback:function(formValues,data){
								store.reload();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},
	//====================================================================指定数据
	onAllotSpecifyClick:function(button){
		var winid=Mate.getWinId(this,'allotSpecify'),
			grid=button.up('grid'),
			store=grid.getStore();

		var staffData=[],
			teamData=[],
			teamid=0;
		store.each(function(record){
			//==========================分配至 团队
			if(record.data.teamid==0&&record.data.staffid==0){
				teamData.push(record.data.mobile);
			}
			//==========================分配至 员工
			if(record.data.teamid>0&&record.data.staffid==0){
				teamid=record.data.teamid;
				staffData.push(record.data.mobile);
			}
		});

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'电资分配·指定数据',
			modal:true,
			items:[
				{xtype:'largeForm',
					viewModel:true,
					listeners:{
						beforerender:function(formPanel){
							formPanel.getForm().setValues({
								teamdata:teamData,
								staffdata:staffData
							});
							formPanel.getViewModel().set({
								teamCount:teamData.length,
								staffCount:staffData.length
							});
							
							var staffCombo=formPanel.down('comboCompanyStaff'),
								staffStore=staffCombo.getStore();
							staffStore.clearFilter();
							staffStore.filterBy(function(record){ 
								return teamid.toString().substr(0,9)==record.get('teamid').toString().substr(0,9);  
							});	
						}
					},
					parameter:{
						iconCls:'f-mt mt-database',
						fields:[
							{xtype:'container',layout:'anchor',margin:'0 0 20 0',bind:{hidden:'{!teamCount}',disabled:'{!teamCount}'},items:[
								{xtype:'hiddenfield',name:'teamdata'},
								{xtype:'box',bind:{html:'从 <span class="x-ui-text-red">总库存</span> 分配 <b class="x-ui-text-red">{teamCount:stringInteger}</b> 个指定资源至 <span class="x-ui-text-red">团队库存</span>'},margin:'0 0 5 74'},
								{fieldLabel:'分配予',xtype:'comboCompanyTeam',root:103,t1:true,name:'teamid'}
							]},
							
							{xtype:'container',layout:'anchor',margin:'0 0 20 0',bind:{hidden:'{!staffCount}',disabled:'{!staffCount}'},items:[
								{xtype:'hiddenfield',name:'staffdata'},
								{xtype:'box',bind:{html:'从 <span class="x-ui-text-red">团队库存</span> 分配 <b class="x-ui-text-red">{staffCount:stringInteger}</b> 个指定资源至 <span class="x-ui-text-red">员工库存</span>'},margin:'0 0 5 74'},
								{fieldLabel:'分配予',xtype:'comboCompanyStaff',root:103,name:'staffid'}
							]}
						],
						submit:{
							url:Boot.appUrl('/sd/resources/allot/updateSpecify.do'),
							callback:function(formValues,data){
								store.removeAll();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},
	
	
	
	









	//======================================================================================================================================回收
	//======================================================================================================================================回收
	//======================================================================================回收 随机
	onRecyclingRandomClick:function(grid,record,item,index,e,eOpts){
		var winid=Mate.getWinId(this,'allot');
			store=grid.getStore(),
			params=store.proxy.extraParams;
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'电资回收·随机',
			modal:true,
			//width:800,
			items:[
				{xtype:'largeForm',
					viewModel:true,
					listeners:{beforerender:function(formPanel){
						formPanel.getForm().setValues({
							name:record.data.objects+' '+record.data.objects_tip,
							idx:params.menu.toUpperCase(),
							idxkey:record.data.id,
							_a:record.data.storage_a,
							_b:record.data.storage_b,
							_c:record.data.storage_c,
							_d:record.data.storage_d
						});
						formPanel.getViewModel().set(record.data);
					}},
					parameter:{
						iconCls:'f-mt mt-database',
						fields:[
							{xtype:'hiddenfield',name:'idx'},
							{xtype:'hiddenfield',name:'idxkey'},
							{fieldLabel:'回收',xtype:'textfield',name:'name',margin:'0 0 20 0',readOnly:true},
							{fieldLabel:'A 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_a',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-reduction x-ui-text-red x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'a',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{storage_a-track_yes_a}'}}
							]},
							{xtype:'box',bind:{html:'最多可回收：<b class="x-ui-text-red">{storage_a-track_yes_a:stringInteger}</b> 个  (不包含 <b class="x-ui-text-green">{track_yes_a:stringInteger}</b> 个意向)'},margin:'-5 0 10 74'},
							
							{fieldLabel:'B 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_b',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-reduction x-ui-text-red x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'b',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{storage_b-track_yes_b}'}}
							]},
							{xtype:'box',bind:{html:'最多可回收：<b class="x-ui-text-red">{storage_b-track_yes_b:stringInteger}</b> 个  (不包含 <b class="x-ui-text-green">{track_yes_b:stringInteger}</b> 个意向)'},margin:'-5 0 10 74'},
			
							{fieldLabel:'C 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_c',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-reduction x-ui-text-red x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'c',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{storage_c-track_yes_c}'}}
							]},
							{xtype:'box',bind:{html:'最多可回收：<b class="x-ui-text-red">{storage_c-track_yes_c:stringInteger}</b> 个  (不包含 <b class="x-ui-text-green">{track_yes_c:stringInteger}</b> 个意向)'},margin:'-5 0 10 74'},
			
							{fieldLabel:'D 类',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'numberfield',name:'_d',flex:.5,readOnly:true},
								{xtype:'box',userCls:'f-mt mt-reduction x-ui-text-red x-ui-text-medium',margin:'0 5'},
								{xtype:'numberfield',name:'d',flex:.5,decimalPrecision:0,value:0,minValue:0,allowBlank:false,bind:{maxValue:'{storage_d-track_yes_d}'}}
							]},
							{xtype:'box',bind:{html:'最多可回收：<b class="x-ui-text-red">{storage_d-track_yes_d:stringInteger}</b> 个  (不包含 <b class="x-ui-text-green">{track_yes_d:stringInteger}</b> 个意向)'},margin:'-5 0 10 74'}
						],
						submit:{
							url:Boot.appUrl('/sd/resources/recycling/updateRandom.do'),
							callback:function(formValues,data){
								store.reload();
							}
						}
					}
				}
			]
		});
		this.getView().add(win).show().center();
	},


	//======================================================================================================================================回收 指定数据
	onRecyclingSpecifyClick:function(button){
		var staffData=[],
			teamData=[];
			msgDelList='',
			grid=button.up('grid'),
			store=grid.getStore();
			
		store.each(function(record){
			//==========================回收 团队库存
			if(record.data.teamid>0&&record.data.staffid==0){
				teamData.push(record.data.mobile);
			}
			
			//==========================回收 员工库存
			if(record.data.teamid>0&&record.data.staffid>0){
				staffData.push(record.data.mobile);
			}
		});
		if(!(staffData.length+teamData.length)){return false};
//		if((staffData.length+teamData.length)>100){
//			Mate.info('单次最多操作 <b class="x-ui-text-red">100</b> 条记录');
//			return false;
//		}
		if(staffData.length>0){
			msgDelList+='回收员工电资 <b>'+staffData.length+'</b> 个 至团队库存<br/>';
		}
		if(teamData.length>0){
			msgDelList+='回收团队电资 <b>'+teamData.length+'</b> 个 至总库存<br/>';
		}
		var confirmText='<h6>确认要回收：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在回收电资</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/sd/resources/recycling/updateSpecify.do'),
					params:{staff:staffData.toString(),team:teamData.toString()},
					success:function(data,opts){
						Ext.MessageBox.hide();
						store.remove(records);
						grid.getView().refresh();
						Mate.showTask(Mate.settings.successMessage);
					},
					failure:function(data,opts){
						Ext.MessageBox.hide();
						Mate.error(data.message);
					}
				});
			}
		});
	}

//
//	//==========================================================================电资交接
//	onChangeTransferClick:function(button){	
//		var grid=button.up('grid'),
//			store=grid.getStore(),
//			winid=Mate.getWinId(this,'transfer'),
//			data=[];
//
//		store.each(function(record){
//			data.push(record.data.mobile);
//		});
//
//		var win=Ext.create('Ext.window.Window',{
//			id:winid,
//			title:'电资交接',
//			border:false,
//			items:[
//				Ext.create({
//					xtype:'sdResourcesChangeTransferForm',
//					listeners:{
//						beforerender:function(formPanel){
//							formPanel.getForm().setValues({
//								data:data,
//								length:data.length
//							});
//						}
//					},
//					buttons:[
//						'->',
//						{text:'保存信息',xtype:'submitbutton',
//							handler:'onMateFormSubmit',
//							mateParameters:{
//								url:Boot.appUrl('/sd/resources/change/updateTransfer.do'),
//								callback:function(formValues,data){
//									store.removeAll();
//								}
//							}
//						},
//						'->'
//					]					
//				})
//			]
//		});
//		this.getView().add(win).show().center();
//	}
//	
	
	
});  
