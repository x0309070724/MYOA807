Ext.define('APP.view.combo.account.group',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboAccountGroup',
	store:{
		fields:[
			{name:'group',type:'string'}
		]
	},
	width:120,
	emptyText:'组...',
	name:'group',
	valueField:'group',
	displayField:'group',
	editable:false,
	forceSelection:true,
	initComponent:function(){
		this.callParent();
		var combo=this,
			data=APP.app.getAppData('crm/mt4Group');
		combo.getStore().setData(data);
	}
});  
