Ext.define('APP.view.combo.company.branch',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboCompanyBranch',
	store:{
		fields:[
			{name:'id',type:'int'},
			{name:'name',type:'string'}
		]
	},
	name:'branchid',
	valueField:'id',
	displayField:'name',
	emptyText:'网点...',
	width:120,
	forceSelection:true,
	initComponent:function(){
		this.callParent();
		var combo=this,
			data=APP.app.getAppData('company/branch');
		combo.getStore().setData(data);
	}
});
