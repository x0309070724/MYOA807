Ext.define('APP.view.combo.account.property',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboAccountProperty',
	store:{
		fields:[{name:'id',type:'int'},{name:'name',type:'string'}]
	},
	emptyText:'账户性质...',
	name:'propertyid',
	valueField:'id',
	displayField:'name',
	forceSelection:false,
	width:120,
	initComponent:function(){
		this.callParent();
		var combo=this,
			data=APP.app.getAppData('crm/accountProperty');
		combo.getStore().setData(data);
	}
});  
