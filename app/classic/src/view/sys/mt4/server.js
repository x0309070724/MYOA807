Ext.define('APP.view.sys.mt4.server',{
    extend:'Ext.form.Panel',
	xtype:'sysMt4Server',
    controller:'sys.mt4',
	width:880,
	viewModel:true,
	items:[
		{title:'实盘',fieldDefaults:{allowBlank:false},items:[
			{columnWidth:.8,items:[
				{fieldLabel:'软件下载',xtype:'textfield',name:'real_softurl',vtype:'url',allowBlank:true}
			]},
			{columnWidth:.4,items:[
				{fieldLabel:'服务器',xtype:'textarea',name:'real_host',height:75,emptyText:'IP/Domain'},
				{fieldLabel:'同步服务器',xtype:'textfield',name:'real_sync_host',emptyText:'IP/Domain',allowBlank:true}
			]},
			{columnWidth:.4,items:[
				{fieldLabel:'版本',boxLabel:'大于 483',xtype:'checkbox',name:'real_version',inputValue:1,checked:true},
				{fieldLabel:'IB账号',xtype:'numberfield',name:'real_ib_login'},
				{xtype:'fieldcontainer',layout:'hbox',items:[
					{fieldLabel:'IB密码',xtype:'passwordfield',name:'real_ib_password',bind:{disabled:'{!isRealIbPassword.checked}'},flex:1},
					{boxLabel:'更改',xtype:'checkbox',name:'real_ib_password_edit',inputValue:1,checked:false,reference:'isRealIbPassword',width:48,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:.2,margin:'20 0 0 20',items:[
				{xtype:'button',iconCls:'f-mt mt-eye-on',scale:'medium',text:'测试联机',mateParameters:{type:1},handler:'onMt4HostTestClick'}
			]}
		]},
		{title:'模拟盘',fieldDefaults:{allowBlank:false},items:[
			{columnWidth:.8,items:[
				{fieldLabel:'软件下载',xtype:'textfield',name:'demo_softurl',vtype:'url',allowBlank:true}
			]},
			{columnWidth:.4,items:[
				{fieldLabel:'服务器',xtype:'textareafield',name:'demo_host',height:75,emptyText:'IP/Domain'}
			]},
			{columnWidth:.4,items:[
				{fieldLabel:'版本',boxLabel:'大于 483',xtype:'checkbox',name:'demo_version',flex:.5,margin:'0 0 0 5',inputValue:1,checked:true},
				{fieldLabel:'IB账号',xtype:'numberfield',name:'demo_ib_login'},
				{xtype:'fieldcontainer',layout:'hbox',items:[
					{fieldLabel:'IB密码',xtype:'passwordfield',name:'demo_ib_password',bind:{disabled:'{!isDemoIbPassword.checked}'},flex:1},
					{boxLabel:'更改',xtype:'checkbox',name:'demo_ib_password_edit',inputValue:1,checked:false,reference:'isDemoIbPassword',width:48,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:.2,margin:'20 0 0 20',items:[
				{xtype:'button',iconCls:'f-mt mt-eye-on',scale:'medium',text:'测试联机',mateParameters:{type:0},handler:'onMt4HostTestClick'}
			]}
		]}
	],
	mateParameters:{
		url:Boot.appUrl('/system/mt4/getServer.do')
	},
	listeners:{afterrender:'onMateFormLoadData'},
	buttons:['->',
		{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
			mateParameters:{
				url:Boot.appUrl('/system/mt4/updateServer.do')
			},
			handler:'onMateFormSubmit'
		},
		{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
	]
});
