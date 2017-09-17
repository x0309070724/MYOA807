Ext.define('APP.view.combo.groupname',{
	extend:'Ext.form.field.ComboBox',
	xtype:'comboGroupname',
	name:'groupid',
	valueField:'id',
	displayField:'name',
	width:100,
	initComponent:function(){
		this.addListener('beforerender',function(combo){
			var store=Ext.create('Ext.data.ArrayStore',{
				fields:[
					{name:'id',type:'int'},
					{name:'code',type:'string'},
					{name:'name',type:'string'}
				]
			});
			var data=APP.app.getAppData('system/group');
			Ext.Array.each(data,function(res){
				if(res.code==combo.code) {
					store.add({id:res.id,name:res.name})
				}
			});
			combo.setStore(store);
			combo.setValue(combo.getValue());
			combo.forceSelection=true;
		});		
		this.callParent();
	}
});