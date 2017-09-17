Ext.define('APP.view.main.unlock',{
    extend:'Ext.window.Window',
    xtype:'loginUnlock',
	id:'loginUnlock',
	autoShow:true,
	title:'系统解锁',
	iconCls:'f-mt mt-unlock',
	modal:true,
	closable:false,
	maximizable:false,
	width:680,
    items:[
		{xtype:'form',userCls:'x-ui-form-large',viewModel:true,
			layout:{type:'hbox',align:'stretch'},
			bodyPadding:'20 60 20 20',
			items:[
				{xtype:'container',width:200,items:[
					{xtype:'box',cls:'x-ui-icon f-mt mt-password'}
				]},
				{xtype:'container',layout:'anchor',flex:1,items:[
					{xtype:'hiddenfield',value:'login',name:'cmd'},
					{xtype:'hiddenfield',value:'login',name:'type'},
					{xtype:'hiddenfield',value:1,name:'rememberme'},
					{xtype:'hiddenfield',name:'login',value:Mate.getCache('loginData/login')},
					{xtype:'tbtext',text:'输入登录密码执行解锁',cls:'x-ui-text-large x-ui-text-red',margin:'20 0 10 0'},
					{xtype:'passwordfield',name:'password',allowBlank:false,listeners:{specialkey:'onLoginFormEnterSubmit'}},
					{xtype:'tbtext',text:'会话有效期为30分钟<br/>超过该时间未执行操作系统将触发锁屏'},
					{text:'解 锁',xtype:'submitbutton',handler:'onLoginFormSubmit',margin:'20 0 10 0'}
				]}
			]
		}
    ]
});
