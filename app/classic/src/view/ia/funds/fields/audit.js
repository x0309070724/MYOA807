Ext.define('APP.view.ia.funds.fields.audit',{
    extend:'Ext.form.FieldSet',
	xtype:'iaFundsFieldsAudit',
	title:'审核结果',
	items:[
		{columnWidth:1,items:[
			{xtype:'radiogroup',columns:8,fieldLabel:'审核结果',
				items:[
					{boxLabel:'通过',name:'audit',inputValue:1,checked:true,reference:'fieldAudit'},
					{boxLabel:'拒绝',name:'audit',inputValue:-1}
				]
			}
		]},
		{columnWidth:1,bind:{hidden:'{!fieldAudit.checked}',disabled:'{!fieldAudit.checked}'},items:[
			{fieldLabel:'凭证号',xtype:'textfield',name:'certificate',width:336,anchor:false},						
			{fieldLabel:'备注',xtype:'textarea',name:'explain',height:50}
		]},
		{columnWidth:1,bind:{hidden:'{fieldAudit.checked}',disabled:'{fieldAudit.checked}'},items:[
			{fieldLabel:'原因',xtype:'textarea',name:'audit_explain',height:50,allowBlank:false}
		]},
		{columnWidth:1,margin:'20 0 0 0',items:[{xtype:'noticefield'}]}
	]
});

