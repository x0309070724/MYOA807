Ext.define('APP.mate.form.large',{
    extend:'Ext.form.Panel',
	alias:'widget.largeForm',
	userCls:'x-ui-form-large',
	layout:{type:'hbox',align:'stretch'},
	bodyPadding:'20 60 20 20',
	width:680,
	//title:'Large Form',
	parameter:{iconCls:'f-mt'},
	initComponent:function(){
		var me=this,
			parameter=this.parameter;	
		
		Ext.apply(this,{
			items:[
				{xtype:'container',width:160,items:[
					{xtype:'box',userCls:'x-ui-icon '+parameter.iconCls}
				]},
				{xtype:'container',layout:'anchor',flex:1,items:[
					{xtype:'container',layout:'anchor',items:parameter.fields}
				]}
			],
			buttons:[
				'->',
				{text:'保存信息',xtype:'submitbutton',handler:'onMateFormSubmit',mateParameters:parameter.submit},
				'->'
			]					
		});
		this.callParent();
	}
});
