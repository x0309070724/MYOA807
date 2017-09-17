Ext.define('APP.view.sd.mgr.res.allot.staff',{
    extend:'Ext.tab.Panel',
    controller:'sd.mgr.res',
	tabPosition:'left',
	tabRotation:2,
	viewModel:{
		data:{
			menu:'staff',
			title:'分配：团队库存 → 员工库存'
		}
	},
	items:[
		{xtype:'sd.mgr.res.allot.specify'},
		{xtype:'sd.mgr.res.allot.random'}
	]
});
