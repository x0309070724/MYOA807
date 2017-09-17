Ext.define('APP.mate.combo.day',{
	extend:'Ext.form.field.ComboBox',
	alias:'comboDay',
	emptyText:'日..',
	width:120,
	name:'day',
	valueField:'day',
	displayField:'dayname',
	forceSelection:false,
	initComponent:function(){
		var dayComboData= [];
		for (var i = 1; i <= 31; i++) {
			dayComboData.push([i, i]);
		}
		this.store=Ext.create('Ext.data.ArrayStore', {
			fields:['day', 'dayname'],
			data:dayComboData
		});
		this.callParent();
	}
});