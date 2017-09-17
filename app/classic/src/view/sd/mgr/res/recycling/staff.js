Ext.define('APP.view.sd.mgr.res.recycling.staff',{
    extend:'Ext.tab.Panel',
    controller:'sd.mgr.res',
	tabPosition:'left',
	tabRotation:2,
	viewModel:{
		data:{
			menu:'staff',
			title:'回收：员工库存 → 团队库存'
		}
	},
	items:[
		{xtype:'sd.mgr.res.recycling.specify'},
		{xtype:'sd.mgr.res.recycling.random'}
	]
});
