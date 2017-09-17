Ext.define('APP.view.combo.account.field',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboAccountField',
	store:{
		fields:['field','name'],
		data:[
			['','N/A'],
			['namecn','申请人姓名 [中文]'],
			['name','申请人姓名 [英文]'],
			['mobile','申请人手机'],
			['email','申请人Email'],
			['identity_country','申请人国家 [证件颁发地]'],
			['identity_address','申请人地址 [证件地址]'],
			['identity_cardno','申请人证件号码'],
			['agent_namecn','代理姓名 [中文]'],
			['agent_name','代理姓名 [英文]'],
			['salesman_namecn','销售A [中文]'],
			['salesman_name','销售A [英文]'],
			['salesman2_namecn','销售B [中文]'],
			['salesman2_name','销售B [英文]']
		]
	},
	width:120,
	emptyText:'选择系统字段...',
	name:'field',
	valueField:'field',
	displayField:'name'
});