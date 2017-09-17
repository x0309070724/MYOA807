Ext.define('APP.view.sd.mgr.res.allot.team',{
    extend:'Ext.tab.Panel',
    controller:'sd.mgr.res',
	tabPosition:'left',
	tabRotation:2,
	viewModel:{
		data:{
			menu:'team',
			title:'分配：总库存 → 团队库存'
		}
	},
	items:[
		{xtype:'sd.mgr.res.allot.specify'},
		{xtype:'sd.mgr.res.allot.random'}
	]
});
