Ext.define('APP.mate.button.refresh', {
  extend: 'Ext.button.Button',
  alias: 'widget.refreshbutton',
  iconCls: 'f-mt mt-refresh',
  text: '刷新',
  // The scope (this reference) in which the handler and toggleHandler is executed. Defaults to this Button.
  scope: this,
  handler: function (button) {
    var grid = button.up('grid');
    if (!grid) {
      var view = button.up('panel'),
        grid = view.down('grid');
    }
    var store = grid.getStore();
    if (store.getPageSize()) {
      store.loadPage(1);
    } else {
      store.load();
    }
  }
});

