Ext.define('APP.mate.field.password',{
	extend:'Ext.form.field.Text',
	//inputType:'password',
	alias:[
		'widget.password',
		'widget.passwordfield'
	],
	name:'password',
	initComponent:function(){
		var me=this;
		window.setTimeout(function(){
			var input=Ext.getDom(me.getInputId());
				input.type='password'
		},1000)
		this.callParent();
	}
});