Ext.define('APP.view.ia.system.touch.articleForm',{
	extend:'Ext.form.Panel',
	xtype:'iaSystemTouchArticleForm',
	width:680,
	viewModel:true,	
	items:[
		{fieldLabel:'标题',xtype:'textfield',name:'title',anchor:'100%',allowBlank:false},
		{fieldLabel:'描述',xtype:'textfield',name:'description'},		
//		{xtype:'checkboxgroup',fieldLabel:'控制项',columns:6,allowBlank:true,bind:{hidden:'{!isUpdate}',disabled:'{!isUpdate}'},items:[
//			{boxLabel:'锁定',name:'locked',inputValue:1},
//		]},
		{hideLabel:true,xtype:'htmleditor',height:300,name:'content'}
	]
})
