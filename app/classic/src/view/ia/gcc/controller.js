Ext.define('APP.view.ia.gcc.controller',{
	extend:'APP.view.ia.controller',
	alias:'controller.ia.gcc',	
	

	onShowAccountDetail:function(grid,record,item,index,e,eOpts){
		console.log('Updateing...')
		return false;
	},
	


	//============================================================================添加账户 模拟
	onGccStaffLeavingClick:function(button){
		var grid=button.up('grid'),
			store=grid.getStore(),
			winid=Mate.getWinId(this,'creatDemo');
			if(Ext.get(winid)){Ext.getCmp(winid).show();return false};
			
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'GCC 员工离职',
			viewModel:{data:{isUpdate:false}},
			items:[
				Ext.create({
					xtype:'form',
					userCls:'x-ui-form-large',
					width:580,
					layout:{type:'hbox',align:'stretch'},
					bodyPadding:'20 60 0 20',
					items:[
						{xtype:'container',width:160,items:[
							{xtype:'box',userCls:'x-ui-icon f-mt mt-account-strate'}
						]},
						{xtype:'container',layout:'anchor',flex:1,items:[
							{xtype:'box',html:'<b>离职操作将更新GCC库中：</b><br/>1. 交易账户的销售员归零<br/>2. 员工账户状态变更为离职',margin:'0 0 20 0'},
							{xtype:'combo',
								name:'staffid',
								valueField:'id',
								displayField:'namecn',
								store:{
									type:'cross',
									autoLoad:true,
									proxy:{
										url:Boot.appUrl('/ia/gcc/account/getStaff.do')
									}
								}
							}
						]}
					],
					buttons:[
						'->',
						{text:'保存信息',xtype:'submitbutton',
							handler:'onMateFormSubmit',
							mateParameters:{
								url:Boot.appUrl('/ia/gcc/account/updateLeaving.do'),
								callback:function(formValues,data){
									store.reload();
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
	















});  
