Ext.define('APP.view.rd.shouting.qun.controller',{
    extend:'APP.view.rd.controller',
	alias:'controller.rd.shouting.qun',
	returnQqName:function(value,cell,record){
		return Ext.String.format(
			'<a href="{1:qqHref}"><img src="{1:qqFace}" alt="" width="14" height="14"/> {0}</a>',
			//'{1:qunLink}',
			record.data.nick,
			record.data.uin
		);
	},
	
	returnQqUin:function(value,cell,record){
		if(value!=''){
			return Ext.String.format(
				'<a href="{0:qqHref}"><img src="{0:qqFace}" alt="" width="14" height="14"/> {0}</a>',
				value
			);
		}
	},
	
	
	returnQunName:function(value,cell,record){
		return Ext.String.format(
			'<a href="{1:qunHref}"><img src="{1:qunFace}" alt="" width="14" height="14"/> {0}</a>',
			record.data.gn,
			record.data.gc
		);
	},
	returnQunUin:function(value,cell,record){
		if(value!=''){
			return Ext.String.format(
				'<a href="{0:qunHref}"><img src="{0:qunFace}" alt="" width="14" height="14"/> {0}</a>',
				value
			);
		}
	},
	
	
	returnGroupCount:function(value,cell,record){
		return Ext.String.format(
			'<div data-qtip="最大成员：{1}<br/>现有成员：{0}<br/><br/>历史退群：{3}"><b class="x-ui-green">{0}</b> / <b class="x-ui-red">{1}</b> <r>{2}%</r></div>',
			record.data.count,
			record.data.max_count,
			Ext.util.Format.integer((record.data.count/record.data.max_count)*100),
			record.data.retreat_count
		);
	},
	
	returnGroupLevel:function(value,cell,record){
		var count=record.data.count,
			speakMonthCount=record.data.speak_month_count,
			str='LV1';
		if(count>50&&speakMonthCount>20){
			str='LV2';
		}else if(count>100&&speakMonthCount>40){
			str='LV3';
		}else if(count>200&&speakMonthCount>80){
			str='LV4';
		}else if(count>400&&speakMonthCount>120){
			str='LV5';
		}
		return str;
	},
	
	returnSpeakRate:function(value,cell,record){
		return Ext.String.format(
			'<span data-qtip="{1}/{2}">{0}%</span>',
			Ext.util.Format.integer((value/record.data.speak_count)*100),
			value,
			record.data.count
		);
	},
	
	
	returnSex:function(value,cell,record){
		switch(value){
			case 1:{return '女'}break;
			case 0:{return '男'}break;
			default:{return ''}break;
		}
	},
	
	onStaffChange:function(combo,newValue,oldValue,eOpts){
		var form=combo.up('form').getForm(),
			record=combo.getStore().getById(newValue);
		if(record){
			switch(combo.name){
				case 'sd_userid':{
					form.findField('sd_teamid').setValue(record.data.teamid).setReadOnly(true);
				}break;
				case 'rd_userid':{
					form.findField('rd_teamid').setValue(record.data.teamid).setReadOnly(true);
				}break;
			}
		}
	},
	
	
	//============================================================================更改员工资料
	onGroupUpdateClick:function(grid,rowIndex,colIndex,item,e,record,row){
		var store=grid.getStore(),
			winid=Mate.getWinId(this,'update-'+record.data.id);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		grid.setSelection(record);

		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'更改群信息：'+record.data.gc,
			items:[
				{xtype:'largeForm',
					listeners:{beforerender:function(formPanel){formPanel.getForm().loadRecord(record);}},
					parameter:{
						iconCls:'f-mt mt-users',
						fields:[
							{fieldLabel:'群名称',xtype:'textfield',name:'gn',readOnly:true},
							{fieldLabel:'群号',xtype:'textfield',name:'gc',readOnly:true},
							{fieldLabel:'销售团队',xtype:'comboCompanyTeam',root:103,name:'sd_teamid'},
							{fieldLabel:'交易助理',xtype:'comboCompanyStaff',root:104,name:'rd_userid'},
							{fieldLabel:'注释',xtype:'textarea',name:'explain',height:80}
						],
						submit:{
							url:Boot.appUrl('/rd/shouting/qun/updateGroup.do'),
							params:{id:record.data.id},
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
	
	
	//============================================================================账户与QQ 绑定
	onQQDetailedClick:function(grid,record){
		var winid=Mate.getWinId(this,record.data.id),
			store=grid.getStore();
			grid.select(record);
		if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
		
		
		if(!record.data.login_count){
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				title:'QQ与账户绑定',
				items:[
					{xtype:'largeForm',parameter:{
						iconCls:'f-mt mt-user',
						fields:[
							{fieldLabel:'昵称',xtype:'textfield',name:'nick',value:record.data.nick,readOnly:true},
							{fieldLabel:'QQ',xtype:'textfield',name:'uin',value:record.data.uin,readOnly:true},
							{fieldLabel:'账号',xtype:'numberfield',vtype:'login',name:'login',allowBlank:false}
						],
						submit:{
							url:Boot.appUrl('/rd/shouting/qun/bindAccount.do'),
							callback:function(formValues,data){
								record.set({
									login_count:1,
									login:formValues.login
								});
							}
						}
					}}
				]
			});
		}else{
			var win=Ext.create('Ext.window.Window',{
				id:winid,
				minHeight:400,
				maxHeight:680,
				width:1000,
				title:'QQ：'+record.data.uin+' 账户清单',
				items:[
					{xtype:'rdAccountPopup',store:{
						type:'account.manager',
						groupFn:false,
						autoLoad:true,
						pageSize:false,
						proxy:{extraParams:{qq:record.data.uin}}
					}}
				]
			});
		}
		this.getView().add(win).show().center();
	}
});  

