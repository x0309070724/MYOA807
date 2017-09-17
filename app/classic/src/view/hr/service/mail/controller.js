Ext.define('APP.view.hr.service.mail.controller',{
    extend:'APP.view.controller',
    alias:'controller.hr.service.mail',
    createEmail:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creat');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};

			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'添加邮箱',
				width:500,
				viewModel:{data:{isUpdate:false}},
				items:[
				Ext.create('Ext.form.Panel',{
					items:[
						{title:'添加邮箱',items:[
							{columnWidth:1,items:[
								{fieldLabel:'员工',emptyText:'员工',xtype:'comboCompanyStaff',name:'staffid',allowblank:false}
							]},
							{columnWidth:.85,items:[
							{fieldLabel:'Email',emptyText:'email',xtype:'textfield',name:'email',allowblank:false},
							]},
							{columnWidth:.15,items:[
							{xtype:'displayfield',value:'@thjz.ltd'}
							]},
							{columnWidth:1,items:[
								{fieldLabel:'启用',xtype:'checkbox',name:'status',checked:true}
							]},
						]}
					],
					buttons:[
							'->',
							{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
								mateParameters:{
									url:Boot.appUrl('/task/addEmail.do'),
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
			this.getView().add(win).show().center();
	},
    updateEmail:function(grid,rowIndex,colIndex,item,e,record,row){
    	var store=grid.getStore(),
    		winid=Mate.getWinId(this,'update-'+record.data.id);
    		grid.setSelection(record); 
    		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
    	var win=Ext.create('Ext.window.Window',{
    		id:winid,
    		title:'修改邮箱'+record.data.email,
    		width:500,
    		//height:400,
    		veiwModel:{},
    		items:[
    			Ext.create('Ext.form.Panel',{
    				items:[
						{title:'修改邮箱',items:[
							{columnWidth:.9,items:[
								{fieldLabel:'Email',emptyText:'email',xtype:'textfield',name:'email',value:record.data.email,readOnly:true}
							]},
							{columnWidth:.7,items:[
								{fieldLabel:'密码',emptyText:'password',xtype:'password',name:'password',}
							]},
							{columnWidth:.3,items:[
								{fieldLabel:'启用',xtype:'checkbox',name:'status'}
								//{fieldLabel:'状态',xtype:'checkbox',name:'status'}
							]}
						]}
					],
					//listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					buttons:[
						'->',
						{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
							mateParameters:{
								url:Boot.appUrl('/task/updateEmail.do'),
								//params:{desc:record.data.namecn},
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
    	this.getView().add(win).show().center();	
    },
    deleteEmail:function(button){
    	var grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
			console.log(records);
		var keys=records[0].data.email;
		if(!keys.length){return false;};
		var confirmText='<h6>删除邮箱：</h6>'+records[0].data.email;
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在删除邮箱</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/task/deleteEmail.do'),
					params:{email:keys},
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
    tongbuEmail:function(button){
    	var grid=button.up('grid'),
			store=grid.getStore(),
			records=grid.getView().getSelectionModel().getSelection();
			//console.log(records);
		//var keys=records[0].data.email;
		//if(!keys.length){return false;};
		var confirmText='<h6>同步邮箱：</h6>';
		Mate.confirm(confirmText,function(button){
			if(button=='yes'){
				Mate.waiting('<h6>正在同步邮箱</h6>请等待指令执行完成...');
				Mate.ajax({
					url:Boot.appUrl('/task/emailCollect.do'),
					//params:{email:keys},
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
	returnMailStatus:function(value,cell,record){
		switch(parseInt(value)){
			case 1:{var icon='<span class="f-mt mt-yes"></span>';}break;
			case 0:{var icon='<span class="f-mt mt-no"></span>';}break;
			default:{var icon='<span class="f-mt mt-pause x-ui-text-grey"></span>';}break;
		}	
		return icon
	}
})