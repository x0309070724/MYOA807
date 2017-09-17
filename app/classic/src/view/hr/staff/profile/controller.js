Ext.define('APP.view.hr.staff.profile.controller',{
    extend:'APP.view.hr.staff.controller',
    alias:'controller.hr.staff.profile',

	returnRootName:function(value,cell,record){
		if(record.data.leaf){
			return Ext.String.format(
				'{0} <s>{1}</s><r>{2}</r>',
				record.data.namecn,
				record.data.name,
				record.data.post_name
			);
		}else{
			return Ext.String.format(
				'{0} <s><b>「{1}」</b></s>',
				record.data.name,
				record.data.staff_count
			);
		}
	},




	//============================================================================员工入职
	onCreatClick:function(button){
		var winid=Mate.getWinId(this,'creat'),
			store=button.up('grid').getStore();
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'员工入职',
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'hrStaffProfileInfoForm',
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/profile/updateInfo.do'),
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
	//============================================================================更新员工资料 INFO
	onUpdateInfoClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新员工档案：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrStaffProfileInfoForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/profile/updateInfo.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
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

	//============================================================================更新员工资料 BANK
	onUpdateBankClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更新员工银行账户：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			viewModel:{data:{isUpdate:true}},
			items:[
				Ext.create({
					xtype:'hrStaffProfileBankForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/profile/updateBank.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									record.set(formValues);
									record.set({verify:1});
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

	//============================================================================账户设置
	onUpdateLoginClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'updatePassword-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'重置账户：'+Ext.util.Format.stringPriority(record.data.namecn,record.data.name)+' #'+record.data.login,
			items:[
				Ext.create({
					xtype:'hrStaffProfileAccountForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record)}},
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/hr/staff/profile/updateLogin.do'),
								params:{id:record.data.id},
								callback:function(formValues,data){
									if(formValues.locked){
										record.set({locked:formValues.locked});
									}else{
										record.set({
											locked:formValues.locked,
											administrator:formValues.administrator,
											login:formValues.login,
											mobile:formValues.mobile,
											email:formValues.email_name+'@'+formValues.email_domain
										});
									}
									if(data.message){
										Mate.info('<h6>账户安全信息已重置：</h6>'+data.message)
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
	}



})
