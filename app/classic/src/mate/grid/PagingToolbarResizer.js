Ext.define('APP.mate.grid.PagingToolbarResizer', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pagingtoolbarresizer',
    options: [20, 30, 50, 100, 200, 300, 500, 1000],
    // mode:'remote'指的是要动态去服务器端拿数据
    mode: 'remote',
    displayText: '显示',
    constructor: function (config) {
        Ext.apply(this, config);
        // console.log(config)
        this.callParent(arguments)
        // console.log(arguments)
    },
    init: function (pagingToolbar) {
        // console.log(pagingToolbar);
        var comboStore = this.options;
        var ptStore = pagingToolbar.store;
        console.log(ptStore);
        var combo = Ext.create('Ext.form.field.ComboBox', {
            typeAhead: false,
            triggerAction: 'all',
            forceSelection: true,
            lazyRender: true,
            editable: false,
            mode: this.mode,
            value: ptStore.pageSize,
            width: ptStore.pageSize >= 1000 ? 60 : 50,
            store: comboStore,
            listeners: {
                select: function (combo, value, i) {
                    //ptStore.pageSize =combo.getValue();
                    Ext.apply(ptStore, {pageSize: combo.getValue()})
                    ptStore.load()
                }
            }
        });
        var index = pagingToolbar.items.indexOf(pagingToolbar.refresh);
        pagingToolbar.insert(++index, this.displayText);
        pagingToolbar.insert(++index, combo);
        pagingToolbar.insert(++index, '-');
        pagingToolbar.on({
            beforedestroy: function () {
                combo.destroy()
            }
        })
    }
});