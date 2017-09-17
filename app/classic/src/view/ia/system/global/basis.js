Ext.define('APP.view.ia.system.global.basis',{
    extend:'Ext.form.Panel',
    controller:'ia.system.global',
	width:1000,
	items:[
		{title:'系统信息',fieldDefaults:{allowBlank:false},items:[
			{columnWidth:.45,items:[
				{xtype:'fieldcontainer',fieldLabel:'LOGO',items:[
					{xtype:'uploadimagefield',mateParameters:{title:'上传 LOGO',name:'logo',height:130}}
				]}
			]},
			{columnWidth:.55,items:[
				{fieldLabel:'中文名称',xtype:'textfield',name:'company_namecn'},
				{fieldLabel:'英文名称',xtype:'textfield',name:'company_name'},
				{xtype:'fieldcontainer',layout:'hbox',items:[
					{fieldLabel:'简称/别名',xtype:'textfield',name:'aliases',flex:.5},
					{fieldLabel:'网址',xtype:'textfield',name:'webaddress',vtype:'url',flex:.5,margin:'0 0 0 5'}
				]},
				{xtype:'fieldcontainer',layout:'hbox',items:[
					{fieldLabel:'电话',xtype:'textfield',name:'phone',allowBlank:true,flex:.5},
					{fieldLabel:'传真',xtype:'textfield',name:'fax',allowBlank:true,flex:.5,margin:'0 0 0 5'}
				]},
				{xtype:'fieldcontainer',layout:'hbox',items:[
					{fieldLabel:'Email',xtype:'textfield',name:'email',vtype:'email',flex:.5},
					{fieldLabel:'企业QQ',xtype:'textfield',name:'bqq',allowBlank:true,flex:.5,margin:'0 0 0 5'}
				]}
			]},
			{columnWidth:1},
			{columnWidth:.45,items:[{fieldLabel:'中文地址',xtype:'textfield',name:'addresscn',allowBlank:true}]},
			{columnWidth:.55,items:[{fieldLabel:'英文地址',xtype:'textfield',name:'address',allowBlank:true}]}
		]},
		{title:'基础配置',items:[
			{columnWidth:.3,items:[{fieldLabel:'本位币',xtype:'comboCurrency',name:'currency',allowBlank:false}]},
			{columnWidth:.3,items:[{fieldLabel:'拼音格式',xtype:'comboPinyinFormat',name:'pinyin',allowBlank:false}]},
			{columnWidth:.4,items:[{fieldLabel:'优先显示',xtype:'radiogroup',columns:3,
				items:[
					{boxLabel:'英文',name:'priority',inputValue:'en'},
					{boxLabel:'中文',name:'priority',inputValue:'cn',checked:true}
				]
			}]}
		]},
		{title:'邮件接口配置',items:[
			{columnWidth:.3,items:[
				{fieldLabel:'SMTP',xtype:'textfield',name:'smtp_server'},
				{fieldLabel:'POP3',xtype:'textfield',name:'pop3_server'}
			]},
			{columnWidth:.3,items:[
				{fieldLabel:'端口',xtype:'fieldcontainer',layout:'hbox',items:[
					{xtype:'numberfield',name:'smtp_port',flex:.7},
					{boxLabel:'SSL',xtype:'checkbox',name:'smtp_ssl',inputValue:1,margin:'0 0 0 10',flex:.3}
				]},
				{fieldLabel:'端口',xtype:'fieldcontainer',layout:'hbox',items:[
					{xtype:'numberfield',name:'pop3_port',flex:.7},
					{boxLabel:'SSL',xtype:'checkbox',name:'pop3_ssl',inputValue:1,margin:'0 0 0 10',flex:.3}
				]}
			]},
			{columnWidth:.4,items:[
				{fieldLabel:'账号',xtype:'textfield',name:'mail_username',vtype:'email'},
				{fieldLabel:'密码',xtype:'passwordfield',name:'mail_password'}
			]}
		]},
		{title:'短信接口配置',items:[
			{columnWidth:.3,items:[{fieldLabel:'接口地址',xtype:'textfield',name:'smsmate_url',vtype:'url'}]},
			{columnWidth:.3,items:[{fieldLabel:'签名',xtype:'textfield',name:'smsmate_signature'}]},
			{columnWidth:1},
			{columnWidth:.3,items:[{fieldLabel:'商户号',xtype:'numberfield',name:'smsmate_merchantno',minLength:6,maxLength:6}]},
			{columnWidth:.7,items:[{fieldLabel:'密钥',xtype:'passwordfield',name:'smsmate_merchantkey',minLength:32,maxLength:32}]}
		]},
		{title:'微信接口配置',items:[
			{columnWidth:.3,items:[{fieldLabel:'应用ID',xtype:'textfield',name:'wechat_appid'}]},
			{columnWidth:.7,items:[{fieldLabel:'应用密钥',xtype:'passwordfield',name:'wechat_appsecret'}]}
		]},
		{title:'企业QQ接口配置',items:[
			{columnWidth:.3,items:[{fieldLabel:'应用ID',xtype:'textfield',name:'bqq_appid'}]},
			{columnWidth:.7,items:[{fieldLabel:'应用密钥',xtype:'passwordfield',name:'bqq_appsecret'}]}
		]}
	],
	mateParameters:{
		url:Boot.appUrl('/system/settings/getBasis.do'),
		params:{type:'CRM'}
	},
	listeners:{afterrender:'onMateFormLoadData'},
	buttons:['->',
		{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
			mateParameters:{
				url:Boot.appUrl('/system/settings/updateBasis.do'),
				params:{type:'CRM'}
			},
			handler:'onMateFormSubmit'
		},
		//{text:'上传标志',iconCls:'f-mt mt-button-upload',scale:'medium',handler:'onLogoUploadClick'},
		{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
	]
});
