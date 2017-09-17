Ext.define('APP.mate.combo.year',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboYear',
	store:{
		fields:[{name:'year',type:'int'}]
	},
	emptyText:'年份...',
	width:80,
	name:'year',
	valueField:'year',
	displayField:'year',
	initComponent:function(){
		var combo=this,
			yearComboData=[];
		for(var i=((new Date().getFullYear())+1);i>=2000;i--){
			yearComboData.push({year:i});
		}
		combo.getStore().setData(yearComboData);
		this.callParent();
	}
});