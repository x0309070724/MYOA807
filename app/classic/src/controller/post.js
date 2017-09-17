Ext.define('APP.controller.post', {
    extend:'Ext.app.Controller',
 	init:function(){
		//console.log('appController init')
	},
	config:{
		control:{
			//======================================================================================数据		
			'toolbar comboCompanyStaff,toolbar comboCompanyStaffs':{
				afterrender:function(combo){
					var account=APP.app.getAppData('account'),
						roles=account.roles,
						store=combo.getStore();
					if(account.administrator||account.departmentid!=103||roles.query==100){return false}

					store.clearFilter();
					store.filterBy(function(record){ 
						switch(parseInt(roles.query)){
							//===================================================================总监
							case 1:{
								return account.teamid.toString().substr(0,6)==record.get('teamid').toString().substr(0,6);  
							}break;
							//===================================================================经理
							case 2:{
								return account.teamid.toString().substr(0,9)==record.get('teamid').toString().substr(0,9);  
							}break;
							//===================================================================团长
							case 3:{
								return account.teamid==record.get('teamid');  
							}break;
							//===================================================================销售员
							default:{
								return account.id==record.get('id');  
							}break;
						}	
					});	
				}
			},
			'toolbar comboCompanyTeam':{
				afterrender:function(combo){
					var account=APP.app.getAppData('account'),
						roles=account.roles,
						store=combo.getStore();
					
					if(account.administrator||account.departmentid!=103||roles.query==100){return false}
					store.clearFilter();
					store.filterBy(function(record){ 
						switch(parseInt(roles.query)){
							//===================================================================总监
							case 1:{
								//return 1==1;
								return account.teamid.toString().substr(0,3)==record.get('id').toString().substr(0,3);
							}break;
							//===================================================================经理
							case 2:{
								return account.teamid.toString().substr(0,9)==record.get('id').toString().substr(0,9);  
							}break;
							//===================================================================团长
							case 3:{
								return account.teamid==record.get('id');  
							}break;
							//===================================================================销售员
							default:{
								return 1==2
							}break;
						}	
					});	
				}
			},

			
			//======================================================================================按钮 查询/操作			
			'button[postRoles]':{
				beforerender:function(button){
					var account=APP.app.getAppData('account'),
						postRoles=button.postRoles,
						roles=account.roles;
						//console.log(button.postRoles.query)
					if(postRoles.query){
						if(Ext.isArray(postRoles.query)){
							//console.log(Ext.Array.indexOf(postRoles.query,roles.query,0))
							button.setHidden(Ext.Array.indexOf(postRoles.query,roles.query,0)<0);
						}else{
							button.setHidden(!roles[postRoles.query]);
						}
					}else if(postRoles.action){
						button.setDisabled(!roles[postRoles.action]);
					}
					//
				}
			},

			//======================================================================================功能键			
//			'button[postRole=true]':{
//				beforerender:function(button){
//					var account=APP.app.getAppData('account'),
//						roles=account.roles;
//					button.setDisabled(!roles[button.role]);
//				}
//			},
			'actioncolumn[postRole=true]':{
				beforerender:function(column){
					var account=APP.app.getAppData('account'),
						roles=account.roles;
					Ext.Array.each(column.items,function(button){
						button.disabled=!roles[button.role];
					})
				}
			}
			
		}
	}
});


