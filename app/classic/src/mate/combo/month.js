Ext.define('APP.mate.combo.month',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboMonth',
	store:{
		fields:['month', 'monthname'],
		data:[
			['01', '一月'],
			['02', '二月'],
			['03', '三月'],
			['04', '四月'],
			['05', '五月'],
			['06', '六月'],
			['07', '七月'],
			['08', '八月'],
			['09', '九月'],
			['10', '十月'],
			['11', '十一月'],
			['12', '十二月']
		]
	},
	emptyText:'月份...',
	width:120,
	name:'month',
	valueField:'month',
	displayField:'monthname'
});