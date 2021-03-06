﻿Ext.define('APP.view.ia.system.account.role',{
    extend:'Ext.Container',
    controller:'ia.system.account',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{layout:'fit',split:true,border:true},
	items:[
		{xtype:'grid',region:'center',title:'角色管理',flex:.7,
			reference:'roleGrid',
			multiSelect:false,
			collapsible:false,
			store:{
				type:'cross',
				autoLoad:true,
				proxy:{
					url:Boot.appUrl('/sd/system/settings/getRole.do')
				},
				listeners:{ 
					update:function(store,record){ 
						Mate.waiting('<h6>正在更新职务</h6>请等待指令执行完成...');
						Mate.ajax({
							url:Boot.appUrl('/sd/system/settings/updateRole.do'),
							params:{
								id:record.data.id,
								name:record.data.name,
								explain:record.data.explain
							},
							success:function(data){
								Ext.MessageBox.hide();
								if(!record.data.id){store.reload();}
								Mate.showTask(Mate.settings.successMessage);
							 },
							 failure:function(data){
								Ext.MessageBox.hide();
								Mate.showTask(data.message,true);
							 }
						});	
					}
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',
					items:[
						'->',
						{iconCls:'f-mt mt-creat',text:'新增',handler:'onRoleAddRecord'},
						{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onRoleRemoveClick'},
						'-',
						{xtype:'refreshbutton'}
					]
				}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'角色名称',dataIndex:'name',width:100,flex:1,editor:{xtype:'textfield',allowBlank:false}},
				{text:'描述',dataIndex:'explain',width:100,flex:2,editor:{xtype:'textfield',allowBlank:true}},
				{text:'组成员',dataIndex:'counts',width:60,flex:1,align:'right',renderer:'returnA',editor:{disabled:true}}
			],
			plugins:[{ptype:'rowediting'}],
			listeners:{ 
				selectionchange:'onRoleGridSelectionChange'
			}
		},
		{xtype:'treepanel',region:'east',title:'权限分配',flex:.3,
			reference:'roleModuleTree',
			collapsible:true,
			store:{type:'navTradePC'},
			//viewConfig:{loadMask:true},
			multiSelect:true,
			//singleExpand:true,
			rootVisible:false,
			useArrows:true,
			disabled:true,
			tbar:['->',
				{iconCls:'f-mt mt-expand',text:'展开全部',enableToggle:true,toggleHandler:'onRoleModuleTreeToggleHandler'}
			],
			listeners:{  
				checkchange:'onRoleModuleCheckChange'
			}
		}
	]
});
