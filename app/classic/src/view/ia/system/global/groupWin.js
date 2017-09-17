Ext.define('APP.view.ia.system.global.groupWin',{
	extend:'Ext.window.Window',
	xtype:'widgetGroup',
	iconCls:'f-mt mt-settings',
    controller:'ia.system.global',
	width:680,
	height:400,
	autoShow:true,
	bind:{title:'{objname}设置'},
	items:[
		{xtype:'grid',border:true,
			store:{
				type:'cross',
				autoLoad:false,
				remoteSort:false,
				model:'APP.model.sys.settings.group',
				//sorters:[{property:'pid',direction:'ASC'},{property:'sortnum',direction:'ASC'},{property:'id',direction:'ASC'}],
				proxy:{
					url:Boot.appUrl('/system/settings/getGroup.do')
				}
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{iconCls:'f-mt mt-creat',text:'新增',handler:'onGroupAddRecord'},
					{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onGroupRemoveClick'},'-',
					{xtype:'refreshbutton'}
				]},
				{dock:'bottom',xtype:'toolbar',items:[
					'->',
					{text:'关闭窗口',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{bind:{text:'{objname}'},dataIndex:'name',width:160,editor:{xtype:'textfield',allowBlank:false}},
				{text:'描述',dataIndex:'explain',flex:1,width:200,editor:{xtype:'textfield',allowBlank:true}},
				{text:'属性',dataIndex:'pid',width:80,renderer:function(v){return v==0?'系统内置':'自定义'}}
			],
			plugins:[{ptype:'rowediting',listeners:{edit:'onGroupUpdate'}}],
			listeners:{ 
				selectionchange:'onMateGridShowActionButton'
			}
		}
	],
	initComponent:function(){
		this.callParent();
		var me=this,
			viewModel=me.getViewModel(),
			store=me.down('grid').getStore();
			
		Ext.apply(store.proxy.extraParams,{code:viewModel.data.code});
		store.load();
	}
})
