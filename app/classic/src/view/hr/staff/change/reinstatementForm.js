Ext.define('APP.view.hr.staff.change.reinstatementForm',{
	extend:'Ext.form.Panel',
	xtype:'hrStaffChangeReinstatementForm',
	userCls:'x-ui-form-large',
	width:680,
	layout:{type:'hbox',align:'stretch'},
	bodyPadding:'20 60 0 20',
	items:[
		{xtype:'container',width:160,items:[
			{xtype:'box',userCls:'x-ui-icon f-mt mt-account-strate'}
		]},
		{xtype:'container',layout:'anchor',flex:1,items:[
			{xtype:'container',layout:'anchor',items:[
				{xtype:'hiddenfield',name:'leaving',value:0},
				{fieldLabel:'工号',xtype:'numberfield',name:'login',vtype:'login',readOnly:true},
				{fieldLabel:'姓名',xtype:'textfield',name:'namecn',readOnly:true},
				{fieldLabel:'离职日期',xtype:'datefield',name:'enddate',readOnly:true},
				{fieldLabel:'复职日期',xtype:'datefield',name:'date',allowBlank:false}
			]}
		]}
	]
})
