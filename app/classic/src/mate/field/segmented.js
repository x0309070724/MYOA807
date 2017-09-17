Ext.define('APP.mate.field.segmented', {
  extend: 'Ext.form.FieldContainer',
  alias: 'widget.segmentedfield',
  findStore: function () {
    var panel = this.up('toolbar').up('panel');
    if (!panel.isXType('grid')) {
      panel = panel.down('grid');
    }
    return panel ? panel.getStore() : false;
  },
  initComponent: function () {
    var me = this;
    // console.log(me.segmented);

    var segmented = {
      xtype: 'segmentedbutton',
      defaults: {minWidth: 30},
      changeOnload: true
    };
    Ext.apply(segmented, me.segmented);
    Ext.apply(this, {
      items: [
        {xtype: 'hiddenfield', name: segmented.name, value: segmented.value},
        segmented
      ]
    });
    this.callParent();

    me.down('segmentedbutton').on('change', function (segmented, value) {
      var field = segmented.prev('field');
      field.setValue(value);
      if (segmented.changeOnload) {
        var store = me.findStore();
        if (store) {
          var params = {},
            button = segmented.down('button[pressed]');
          params[segmented.name] = value;
          Ext.apply(store.proxy.extraParams, params);
          //console.log(button.value,button)
          if (button.sorters) {
            store.sort(button.sorters)
          }
        }
        if (segmented.changeOnloadState) {
          store.removeAll();
          if (store.getPageSize()) {
            store.loadPage(1);
          } else {
            store.load();
          }
        }
        segmented.changeOnloadState = true;
      }
    });
  }
});



