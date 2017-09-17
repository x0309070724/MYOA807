Ext.define('APP.view.hr.staff.activity.controller',{
    extend:'APP.view.hr.controller',
    alias:'controller.hr.staff.activity',
	//================================================投票管理
	returnVoteCase:function(value,cell,record){
		switch(parseInt(value)){
			case 0:{var str='所有员工可投票';}break;
			default:{var str='仅部门可投票';}break;
		}			
		return str;
	},
	returnMultipleChoice:function(value,cell,record){
		switch(parseInt(value)){
			case 1:{var str='单选';}break;
			case 2:{var str='多选-两票';}break;
			case 3:{var str='多选-三票';}break;
			case 4:{var str='多选-四票';}break;
			case 5:{var str='多选-五票';}break;
			case 6:{var str='多选-六票';}break;
			case 7:{var str='多选-七票';}break;
			case 8:{var str='多选-八票';}break;
			case 8:{var str='多选-九票';}break;
			default:{var str='多选-十票';}break;
		}		
		return str;
	},
	returnVoteStatus:function(value,cell,record){
		switch(parseInt(value)){
			case 1:{var icon='<span class="f-mt mt-yes"></span>';}break;
			case 0:{var icon='<span class="f-mt mt-no"></span>';}break;
			default:{var icon='<span class="f-mt mt-pause x-ui-text-grey"></span>';}break;
		}	
		return icon
	},

    //=========================================================================创建主题
    onVoteTitleCreatClick:function(button){
    	var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			iconCls:'menu-edit',
			title:'活动主题',
			width:400,
			items:[						
				{xtype:'form',frame:false,
					viewModel:{data:{isStart :true,notStart :false}},	
					items:[
	 					{fieldLabel:'主题名称',emptyText:'主题名称',xtype:'textfield',name:'name'}
					],
					buttons:['->',
						{text:'活动主题',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/vote/creatTheme.do'),
								callback:function(formValues,data){
									store.reload();
									//record.set(formValues);
								}
							},
							handler:'onMateFormSubmit'
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]
				}]
			}).show()
    },
	//=========================================================================点击主题事件
	onChangeVoteLoadClick:function(this_,record,eOpts){
		var gridChange=this.lookup('gridChange'),
		storeChange=gridChange.getStore();
		if(!record){
			storeChange.removeAll();
			return false;
		}	
		this_.select(record);
		Ext.apply(storeChange.proxy.extraParams,{themeid:record[0].data.id});
		storeChange.loadPage(1);
	},
	//============================================================================进入投票页面
	onVotingPageClick:function(grid,rowIndex,colIndex,item,e,record,row){

		var store=grid.getStore(),
			record=store.getAt(rowIndex);
		window.open('/page/index.html#/vote/section.html?themeid='+record.data.id);
	},


	//============================================================================添加投票活动
	onVoteActiveCreatClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			var theme = Ext.getCmp('theme_id');
			var m = theme.getSelectionModel();
			if(m.selected.items.length!=1){
				Mate.alert('请选择一个活动主题!');
				return false;
			}
			var data = m.selected.items[0];
			console.log(data.id);
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'新增投票',
				viewModel:{data:{isUpdate:false}},
				items:[
					Ext.create({
						xtype:'hrStaffActivityVoteForm',
						buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/vote/creatVote.do'),
									params:{themeid:data.id},
									callback:function(formValues,data){
										store.reload();
									}
								},
								handler:'onMateFormSubmit'
							},
							{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
						]					
					})
				]
			});
			win.down('hrStaffActivityVoteAccountForm').hide();
			this.getView().add(win).show().center();
	},
	//============================================================================编辑投票活动
	onVoteActiveUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
			//window['VoteWinID'] = record.data.id;
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			v_id:record.data.id,
			targetID:record.data.id,
			title:'更改投票：'+record.data.name,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrStaffActivityVoteForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/vote/updateVoteSection.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
								}
							},
							handler:'onMateFormSubmit'
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================删除投票活动
	onVoteActiveRemoveClick:function(button){			
		var keys=[],
			msgDelList='',
			grid=button.up('grid'),
			//grid=this.lookup('gridChange'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
		Ext.Array.each(records,function(record){
			msgDelList+='投票活动：'+record.data.name+'　'
			keys.push(record.data.id);
			msgDelList+='<span class="x-ui-text-green">可删除</span><br/>'
		});
		if(!keys.length){return false;};
		var confirmText='<h6>删除投票活动：</h6>'+msgDelList;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除投票活动</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/deleteAutotaskConfig.do'),
					params:{id:keys},
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
	},


	//============================================================================启动投票
	onStartVotingClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
		 	winid='WIN-StartVoting-'+record.data.name;
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			iconCls:'menu-edit',
			title:'启动投票:『'+record.data.name+'』',
			width:400,
			items:[						
				{xtype:'form',frame:false,
					viewModel:{data:{isStart :true,notStart :false}},	
					items:[
						{xtype:'radiogroup',fieldLabel:'启动投票',style:'margin-top:30px;',
							items:[
							{boxLabel:'启动',name:'status', bind: '{isStart}',inputValue:1},
							{boxLabel:'停止',name:'status',bind: '{notStart}',inputValue:2,style:'margin-left:20px;',checked:true}
							]
						}
					],
					buttons:['->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/vote/updateVoteSection.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
								}
							},
							handler:'onMateFormSubmit'
						},
						{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
					]
				}
			]
		});	
		this.getView().add(win).show().center();	
	},

	//============================================================================添加活动竞选人员
	onVoteAccountCreatClick:function(button){
		//console.log(button.up('window').v_id);
		var grid=button.up('panel').down('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
		if (Ext.get(winid)){Ext.getCmp(winid).show();return false};
		Ext.create('Ext.window.Window',{id:winid,iconCls:'menu-add',title:'新增竞选人员',width:680,
			items:[
				Ext.create('Ext.form.Panel',{
					items:[
						{title:'竞选信息',items:[
							{columnWidth:.55,items:[
								{fieldLabel:'竞选名称',emptyText:'竞选名称',xtype:'textfield',name:'name'},
								{fieldLabel:'拉票描述',emptyText:'激励',xtype:'textarea',height:100,name:'explain'},
								{fieldLabel:'竞选视频',emptyText:'竞选视频',xtype:'textfield',name:'video'}
							]},
							{columnWidth:.45,items:[
								{xtype:'fieldcontainer',fieldLabel:'上传图片',items:[
									{xtype:'uploadimagefield',mateParameters:{title:'上传图片',name:'image',height:130}}
								]}
							]}
						]}
					],
					buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/vote/creatElectioneer.do'),
									params:{sectionid:button.up('window').v_id},
									callback:function(formValues,data){
										store.reload();
									}
								},
								handler:'onMateFormSubmit'
							},
							{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
						]		
				})
			]
		}).show();
	},
	//============================================================================删除活动竞选人员
	onVoteAccountRemoveClick:function(e){	
		var keys=[],
			msgDelList='',
			store=e.up('panel').down('grid').getStore(),
			record=e.up('panel').down('grid').getSelectionModel().getSelection();
		Ext.each(record,function(item){
			keys.push(item.get('id'));
			msgDelList+=item.get('name')+'『'+item.get('account')+'』<br/>'
		});
		var confirmText='';
			confirmText+='<strong class="text-green">本次将删除以下竞选人员：</b><br/>';
			confirmText+=msgDelList;
		if(!keys.length){return false};
	},
	//============================================================================修改活动竞选人员信息
	onVoteAccountUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		grid.setSelection(record);
		if (Ext.get(winid)){Ext.getCmp(winid).show();return false};
		Ext.create('Ext.window.Window',{
			id:winid,
			iconCls:'menu-add',
			title:'编辑竞选人员'+record.data.name,
			viewModel:{data:{isUpdate:true}},
			width:680,
			items:[
				Ext.create('Ext.form.Panel',{
					items:[
						{title:'竞选信息',items:[
							{columnWidth:.55,items:[
								{fieldLabel:'竞选名称',emptyText:'竞选名称',xtype:'textfield',name:'name'},
								{fieldLabel:'拉票描述',emptyText:'激励',xtype:'textarea',height:100,name:'explain'},
								{fieldLabel:'竞选视频',emptyText:'竞选视频',xtype:'textfield',name:'video'}
							]},
							{columnWidth:.45,items:[
								{xtype:'fieldcontainer',fieldLabel:'上传图片',items:[
									{xtype:'uploadimagefield',mateParameters:{title:'上传图片',name:'image',height:130}}
								]}
							]}
						]}
					],

					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/vote/updateElectioneer.do'),
									params:{id:record.data.id},
									callback:function(formValues,data){
										store.reload();
									}
								},
								handler:'onMateFormSubmit'
							},
							{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
						]		
				})
			]
		}).show();
	}	
})
