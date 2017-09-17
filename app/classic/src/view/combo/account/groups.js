Ext.define('APP.view.combo.account.groups',{
	extend:'Ext.form.field.Tag',
	xtype:'comboAccountGroups',
	store:{
		fields:[
			{name:'group',type:'string'}
		]
	},
	queryMode:'local', 
	selectOnFocus:false,
	filterPickList:true,
	width:120,
	emptyText:'组...',
	name:'mt4_group',
	valueField:'group',
	displayField:'group',
	forceSelection:false,
	multiSelect:true,
	listeners:{
		beforerender:function(combo){
			var data=APP.app.getAppData('crm/mt4Group');
			combo.getStore().setData(data);
			combo.setValue(combo.getValue());
			combo.forceSelection=true;
		}	
	}
});  
