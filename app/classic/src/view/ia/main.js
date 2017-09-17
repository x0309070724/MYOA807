Ext.define('APP.view.ia.main',{
    extend:'APP.view.main.layout',
	initComponent:function(){
		this.callParent();
		var me=this,
			tabpanel=me.down('tabpanel');
		var main=tabpanel.add({xtype:'iaIndex',title:'<b>HOME</b>主页',iconCls:'f-mt mt-home',closable:false});
		tabpanel.setActiveTab(main); 
	}
});

