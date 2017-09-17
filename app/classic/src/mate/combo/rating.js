Ext.define('APP.mate.combo.rating',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboRating',
	store:{
		fields:['value','display'],
		data:[
			[1,'★☆☆☆☆'],
			[2,'★★☆☆☆'],
			[3,'★★★☆☆'],
			[4,'★★★★☆'],
			[5,'★★★★★']
		]
	},
	fieldCls:'x-ui-text-red',
	listConfig:{cls:'x-ui-text-red'},
	emptyText:'评星...',
	width:80,
	name:'rating',
	valueField:'value',
	displayField:'display'
});