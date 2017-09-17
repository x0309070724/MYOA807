Ext.define('APP.view.hr.staff.change.controller',{
    extend:'APP.view.hr.staff.controller',
    alias:'controller.hr.staff.change',

	//============================================================================员工转正
	onChangePositiveClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'人事调动：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			modal:true,
			items:[
				Ext.create({
					xtype:'hrStaffChangePositiveForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/change/updatePositive.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									if(data.success){
										store.remove(record);
										storeChange.reload();
									}
								}
							}
						},
						'->'
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},

	//============================================================================人事调动
	onChangeTeamClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'人事调动：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			modal:true,
			items:[
				{xtype:'largeForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					parameter:{
						iconCls:'f-mt account-strate',
						fields:[
							{fieldLabel:'工号',xtype:'numberfield',name:'login',vtype:'login',readOnly:true},
							{fieldLabel:'姓名',xtype:'textfield',name:'namecn',readOnly:true},
							{fieldLabel:'现属团队',xtype:'fieldcontainer',layout:'hbox',items:[
								{xtype:'textfield',name:'department_name',flex:.5,readOnly:true},
								{xtype:'textfield',name:'team_name',flex:.5,margin:'0 0 0 5',readOnly:true}
							]},
							{fieldLabel:'调动后',xtype:'fieldcontainer',layout:'hbox',readOnly:true,items:[
								{xtype:'comboCompanyDepartment',name:'after_departmentid',flex:.5,allowBlank:false,listeners:{change:'onCompanyDepartmentChange'}},
								{xtype:'comboCompanyTeam',name:'after_teamid',flex:.5,margin:'0 0 0 5',allowBlank:false,readOnly:true}
							]},
							{fieldLabel:'生效日期',xtype:'datefield',name:'effectivedate',allowBlank:false}
						],
						submit:{
							url:Boot.appUrl('/hr/staff/change/updateTeam.do'),
							params:{id:record.data.id},
							callback:function(formValues,data){
								if(data.success){
									store.reload();
									storeChange.reload();
								}
							}
						}
					}
				}
//				Ext.create({
//					xtype:'hrStaffChangeTeamForm',
//					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
//					buttons:[
//						'->',
//						{text:'保存信息',xtype:'submitbutton',
//							handler:'onMateFormSubmit',
//							mateParameters:{
//								url:Boot.appUrl('/hr/staff/change/updateTeam.do'),
//								params:{id:record.data.id},
//								callback:function(formValues,data){
//									if(data.success){
//										store.reload();
//										storeChange.reload();
//									}
//								}
//							}
//						},
//						'->'
//					]					
//				})
			]
		});
		this.getView().add(win).show().center();
	},


	//============================================================================职务变更
	onChangePostClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'职务变更：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			modal:true,
			items:[
				Ext.create({
					xtype:'hrStaffChangePostForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/change/updatePost.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									if(data.success){
										store.reload();
										storeChange.reload();
									}
								}
							}
						},
						'->'
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},






	
	//============================================================================员工离职
	onChangeLeavingClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'离职处理：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			items:[
				Ext.create({
					xtype:'hrStaffChangeLeavingForm',
					listeners:{beforerender:function(formPanel){
						formPanel.getForm().setValues({
							login:record.data.login,
							namecn:record.data.namecn,
							startdate:record.data.startdate
						})
					}},
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/change/updateLeaving.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									store.remove(record);
									storeChange.reload();
								}
							}
						},
						'->'
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	},
	//============================================================================员工复职
	onChangeReinstatementClick:function(grid,record){
		var store=grid.getStore(),
			gridChange=this.lookup('gridChange'),
			storeChange=gridChange.getStore(),
			winid=Mate.getWinId(this,record.data.id);
		grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'复职处理：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			items:[
				Ext.create({
					xtype:'hrStaffChangeReinstatementForm',
					listeners:{beforerender:function(formPanel){
						formPanel.getForm().setValues({
							login:record.data.login,
							namecn:record.data.namecn,
							enddate:record.data.enddate
						})
					}},
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/change/updateLeaving.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									store.remove(record);
									storeChange.reload();
								}
							}
						},
						'->'
					]					
				})
			]
		});
		this.getView().add(win).show().center();
	}
	
	
	

		
})
