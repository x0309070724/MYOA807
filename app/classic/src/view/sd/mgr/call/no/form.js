Ext.define('APP.view.sd.mgr.call.no.form',{
	extend:'Ext.form.Panel',
	xtype:'sdCallNoForm',
	width:600,
	items:[
		{title:'号码信息',items:[
			{columnWidth:.6,items:[
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'号码',items:[
					{xtype:'numberfield',vtype:'mobile',name:'no',flex:.6,allowBlank:false,bind:{readOnly:'{isUpdate}'}},
					{xtype:'comboCallOperators',name:'type',value:10010,flex:.4,margin:'0 0 0 5 ',bind:{readOnly:'{isUpdate}'}}
				]},
				
				{fieldLabel:'密码',xtype:'textfield',name:'password',allowBlank:false}
				//{fieldLabel:'使用人',xtype:'comboCompanyStaff',name:'staffid'}
			]},
			{columnWidth:.8,items:[
				{fieldLabel:'备注',xtype:'textarea',name:'explain',height:50},,
//				{xtype:'checkboxgroup',fieldLabel:'控制项',columns:2,allowBlank:true,bind:{disabled:'{isUpdate}',hidden:'{isUpdate}'},items:[
//					{boxLabel:'执行数据同步',name:'isSync',inputValue:1,checked:true},
//				]},
				{xtype:'checkboxgroup',fieldLabel:'控制项',columns:2,allowBlank:true,bind:{disabled:'{!isUpdate}',hidden:'{!isUpdate}'},items:[
					{boxLabel:'弃用该号码',name:'invalid',inputValue:1}
				]}
			]}
		]}
	]
})
