Ext.define('APP.view.sys.main',{
    extend:'APP.view.main.layout',
	initComponent:function(){
		this.callParent();
		var me=this,
			tabpanel=me.down('tabpanel');
		var main=tabpanel.add({xtype:'sysIndex',title:'<b>HOME</b>主页',iconCls:'f-mt mt-home',closable:false});
		tabpanel.setActiveTab(main); 
	}
});

