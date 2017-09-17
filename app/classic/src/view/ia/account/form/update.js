Ext.define('APP.view.ia.account.form.update',{
    extend:'Ext.form.Panel',
	xtype:'iaAccountFormUpdate',
	width:880,
	viewModel:true,
	items:[
		{title:'账户信息',items:[
			{columnWidth:.3,items:[
				{xtype:'fieldcontainer',fieldLabel:'账号',layout:'hbox',items:[
					{xtype:'numberfield',name:'login',vtype:'login',flex:.7,allowBlank:false,readOnly:true},
					{xtype:'checkbox',boxLabel:'测试',name:'tested',inputValue:1,flex:.3,margin:'0 0 0 5',allowBlank:true}
				]},
				{fieldLabel:'代理级别',xtype:'comboIblevel',name:'iblevel',allowBlank:false,hidden:true,disabled:true,bind:{hidden:'{!form.agent}',disabled:'{!form.agent}'}},
				{fieldLabel:'上级代理',xtype:'numberfield',name:'agent',vtype:'login'}
			]},
			{columnWidth:.4,items:[
				{fieldLabel:'账户性质',xtype:'comboAccountProperty',name:'propertyid',allowBlank:false,readOnly:true},
				{xtype:'fieldcontainer',fieldLabel:'销售员',layout:'hbox',items:[
					{emptyText:'销售A',xtype:'comboCompanyStaff',root:103,name:'salesmanid',flex:.5,readOnly:true},
					{emptyText:'销售B',xtype:'comboCompanyStaff',root:103,name:'salesman2id',flex:.5,margin:'0 0 0 5',readOnly:true}
				]},
				{fieldLabel:'颜色',xtype:'colorfield',name:'user_color',format:'#HEX6'}
				
			]},
			{columnWidth:.3,items:[
				{fieldLabel:'组',xtype:'comboAccountGroup',name:'group'},
				{fieldLabel:'杠杆',xtype:'comboAccountLeverage',name:'leverage'},
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'税率',items:[
					{xtype:'numberfield',name:'taxes',value:0,flex:1},
					{xtype:'textfield',value:'%',disabled:true,width:40,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:1,items:[{fieldLabel:'备注',xtype:'textarea',name:'explain',height:50}]},
			{columnWidth:1,items:[
				{xtype:'checkboxgroup',fieldLabel:'控制项',columns:8,allowBlank:true,items:[
					{boxLabel:'启用',name:'enable',inputValue:1},
					{boxLabel:'更改密码',name:'enable_change_password',inputValue:1},
					{boxLabel:'发送报告',name:'send_reports',inputValue:1},
					{boxLabel:'只读账户',name:'enable_read_only',inputValue:1}
				]}
			]}
		]}
	]
});
