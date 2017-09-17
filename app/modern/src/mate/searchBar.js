Ext.define('APP.mate.searchBar', {
  extend: 'Ext.Toolbar',
  alias: 'widget.searchbar',
  docked: 'top',
  ui: 'search',
  border: true,
  // Allows addition of behavior to the rendering phase.
  initialize: function () {
    this.callParent();
    var me = this;
    // console.log(me.component);
    this.setItems([
      {
        xtype: 'searchfield', ui: 'faded', name: 'query', flex: 1, margin: '5 0',
        placeholder: 'Search',
        //labelIconAlign:'center',
        //textAlign:'center',
        inputType: 'text',
        //inputType:me.inputType||'search',
        component: me.component || {},
        listeners: {
          initialize: function (field) {
            window.setTimeout(function () {
              var input = Ext.getDom(field.getFocusEl().id);
              // console.log(field);
              input.pattern = field.component.pattern
            }, 1000)
          },
          //focus:function(field){
          //field.setTextAlign('left');
          //},
          blur: function (field) {
            var store = field.up('list').getStore(),
              params = store.getProxy().getExtraParams();
            //field.setTextAlign('center');
            if (field.getValue() && field.getValue() != '') {
              Ext.apply(params, {query: field.getValue()});
              store.loadPage(1);
            }
          },
          clearicontap: function (button, field) {
            var store = button.up('list').getStore(),
              params = store.getProxy().getExtraParams();
            field.setTextAlign('center');
            if (!params.query || params.query != '') {
              Ext.apply(params, {query: ''});
              store.loadPage(1);
            }
          }
        }
      }
    ]);
  }
});
