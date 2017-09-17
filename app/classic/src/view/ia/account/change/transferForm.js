Ext.define('APP.view.ia.account.change.transferForm',{
    extend:'Ext.form.Panel',
	xtype:'iaAccountChangeTransferForm',
    controller:'ia.account.change',
	width:480,
	items:[
		{title:'交接销售 A',checkboxToggle:true,checkboxName:'isSalesmanid',items:[
			{columnWidth:.7,items:[
				{fieldLabel:'交接至',xtype:'comboCompanyStaff',root:103,name:'salesmanid',allowBlank:true},
				{fieldLabel:'生效日期',xtype:'datefield',name:'salesman_effectivedate',allowBlank:true,value:Ext.Date.format(new Date(),'Y-m-d')}
			]}
		]},		
		{title:'交接销售 B',checkboxToggle:true,checkboxName:'isSalesman2id',collapsed:true,items:[
			{columnWidth:.7,items:[
				{fieldLabel:'交接至',xtype:'comboCompanyStaff',root:103,name:'salesman2id',allowBlank:true},
				{fieldLabel:'生效日期',xtype:'datefield',name:'salesman2_effectivedate',allowBlank:true,value:Ext.Date.format(new Date(),'Y-m-d')}
			]}
		]}
	]
});
