Ext.define('APP.mate.combo.callOperators',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboCallOperators',
	store:{
		fields:['id','name'],
		data:[
			[10086,'中国移动'],
			[10010,'中国联通'],
			[10000,'中国电信']
		]
	},
	emptyText:'运营商..',
	width:80,
	name:'call_operators',
	valueField:'id',
	displayField:'name'
});