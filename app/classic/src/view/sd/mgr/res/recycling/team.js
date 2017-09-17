Ext.define('APP.view.sd.mgr.res.recycling.team',{
    extend:'Ext.tab.Panel',
    controller:'sd.mgr.res',
	tabPosition:'left',
	tabRotation:2,
	viewModel:{
		data:{
			menu:'team',
			title:'回收：团队库存 → 总库存'
		}
	},
	items:[
		{xtype:'sd.mgr.res.recycling.specify'},
		{xtype:'sd.mgr.res.recycling.random'}
	]
});
