Ext.define('APP.mate.grid.PagingBar', {
    extend: 'Ext.toolbar.Paging',
    xtype: 'pagingbar',
    //alias:'widget.pagingbar',
    dock: 'bottom',
    displayInfo: true,
    // border的默认属性是true
    border: true,
    resizer: true,
//	listeners:{
//		afterrender:function(paging){
//			var store=paging.up('grid').getStore();
//			paging.setStore(store);
//		}
//	},
    initComponent: function () {
        var me = this,
            plugins = [{ptype: 'ux-slidingpager'}];
        if (me.resizer) {
            plugins.push({ptype: 'pagingtoolbarresizer'})
        }
        Ext.apply(this, {
            store: me.up('grid').getStore(),
            plugins: plugins
        });
        this.callParent();
    }
})
