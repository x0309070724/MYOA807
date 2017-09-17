Ext.define('APP.view.hr.staff.change.postForm',{
	extend:'Ext.form.Panel',
	xtype:'hrStaffChangePostForm',
	viewModel:true,
	userCls:'x-ui-form-large',
	width:680,
	layout:{type:'hbox',align:'stretch'},
	bodyPadding:'20 60 20 20',
	items:[
		{xtype:'container',width:160,items:[
			{xtype:'box',userCls:'x-ui-icon f-mt mt-account-strate'}
		]},
		{xtype:'container',layout:'anchor',flex:1,items:[
			{xtype:'container',layout:'anchor',defaults:{bind:{disabled:'{isLocked.checked}'}},items:[
				{fieldLabel:'工号',xtype:'numberfield',name:'login',vtype:'login',readOnly:true},
				{fieldLabel:'姓名',xtype:'textfield',name:'namecn',readOnly:true},
				{fieldLabel:'现属职务',xtype:'fieldcontainer',layout:'hbox',items:[
					{xtype:'textfield',name:'department_name',flex:.5,readOnly:true},
					{xtype:'textfield',name:'post_name',flex:.5,margin:'0 0 0 5',readOnly:true}
				]},
				{fieldLabel:'变更后',xtype:'fieldcontainer',layout:'hbox',readOnly:true,items:[
					{xtype:'comboCompanyDepartment',name:'after_departmentid',flex:.5,allowBlank:false,listeners:{change:'onCompanyDepartmentChange'}},
					{xtype:'comboCompanyPost',name:'after_postid',flex:.5,margin:'0 0 0 5',allowBlank:false,readOnly:true}
				]},
				{fieldLabel:'生效日期',xtype:'datefield',name:'effectivedate',allowBlank:false}
			]}
		]}
	]
})
