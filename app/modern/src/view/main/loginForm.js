Ext.define('APP.view.main.loginForm',{
	extend:'Ext.form.Panel',
	xtype:'loginForm',
	viewModel:{data:{type:{value:'login'}}},
	bodyPadding:25,
	items:[
		{xtype:'field',name:'cmd',value:'login',hidden:true},
		{xtype:'container',name:'logo',userCls:'x-ui-logo',margin:20,height:80,items:[
			{xtype:'image',bind:{src:'{oa.basis.logo:oss}'},alt:'LOGO'}
			//{xtype:'image',bind:{src:'/resources/images/logo.png'},alt:'LOGO'}
		]},
		
		{xtype:'segmentedbutton',layout:{type:'hbox',align:'middle',pack:'center'},defaults:{flex:1,iconAlign:'center'},
			reference:'type',publishes:'value',
			items:[
				{text:'账号登陆',iconCls:'f-mt mt-user',value:'login',pressed:true},
				{text:'手机登陆',iconCls:'f-mt mt-mobile',value:'mobile'}
			]
		},
		{xtype:'field',name:'type',bind:{value:'{type.value}'},hidden:true},
		{xtype:'fieldset',
			bind:{hidden:'{type.value!="login"}',disabled:'{type.value!="login"}'},
			defaults:{labelAlign:'left',labelWidth:60,autoComplete:false,clearable:false,require:true},
			items:[
				{label:'Login',labelCls:'f-mt mt-user',xtype:'numberfield',component:{pattern:'[0-9]*'},name:'login',placeholder:'Login',value:Mate.getCache('loginData/login')},
				{label:'password',labelCls:'f-mt mt-password',xtype:'passwordfield',name:'password',placeholder:'Password',listeners:{blur:'onLoginFormEnterSubmit'}}
			]
		},
		{xtype:'fieldset',hidden:true,
			bind:{hidden:'{type.value!="mobile"}',disabled:'{type.value!="mobile"}'},
			defaults:{labelAlign:'left',labelWidth:60,autoComplete:false,clearable:false,require:true},
			items:[
				{label:'Mobile',labelCls:'f-mt mt-mobile',xtype:'numberfield',component:{pattern:'[0-9]*'},name:'mobile',placeholder:'Mobile',value:Mate.getCache('loginData/mobile')},
				{label:'password',labelCls:'f-mt mt-lock',xtype:'passwordfield',name:'password',placeholder:'Password'}
			]
		},
		{xtype:'button',text:'登 陆',name:'submit',ui:'border orange large',border:false,iconCls:'f-mt mt-account-audit',iconAlign:'center',handler:'onLoginFormSubmit'}
//		{xtype:'container',cls:'x-ui-api',defaults:{xtype:'button',border:false},layout:{type:'hbox',align:'middle',pack:'center'},margin:'100 0 0 0',items:[
//			{iconCls:'f-mt mt-wechat',ui:'green round large',handler:'onLoginFromWechat'},
//			{iconCls:'f-mt mt-qq',ui:'blue round large',handler:'onLoginFromQq',margin:'0 0 0 30'}
//		]}
	]
});