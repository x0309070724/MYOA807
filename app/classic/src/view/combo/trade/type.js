Ext.define('APP.view.combo.transfer.type',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboTransferType',
	store:Ext.create('Ext.data.Store', {
		fields:['value', 'display'],
		data:[
			[1, '转入'],
			[2, '转出']
		]
	}),
	emptyText:'转账类型...',
	width:120,
	name:'direction',
	valueField:'value',
	displayField:'display'
});