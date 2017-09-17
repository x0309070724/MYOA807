Ext.define('APP.view.combo.account.leverage',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboAccountLeverage',
	store:{
		fields:[
			{name:'value',type:'int'},
			{name:'display',type:'string',convert:function(v,record){return '1:'+record.data.value}}
		]
	},
	emptyText:'杠杆...',
	width:120,
	name:'leverage',
	valueField:'value',
	displayField:'display',
	editable:false,
	forceSelection:false,
	initComponent:function(){
		this.callParent();
		var combo=this,
			data=APP.app.getAppData('crm/mt4Leverage'),
			comboData=[];
		Ext.Array.each(data,function(value){
			comboData.push({value:value});
		});
		combo.getStore().setData(comboData);
	}
});