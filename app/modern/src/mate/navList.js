Ext.define('APP.mate.navList', {
  extend: 'Ext.dataview.DataView',
  xtype: 'navList',
  userCls: 'x-ui-nav',
  itemCls: 'x-ui-box x-ui-arrow',
  // Optional HTML content to render inside this Component, or a reference to an existing element on the page.
  html: 'NAV',
  //ripple:false,
  //itemRipple:false,
  itemTpl: [
    '<div class="x-ui-nav-icon"><span class="{iconCls}"></span></div>',
    '<h3>',
      '{text}',
      '<tpl if="description">',
        '<br/><span class="description">{description}</span>',
      '</tpl>',
      '<tpl if="value">',
        '<span class="value">{value}</span>',
      '</tpl>',
    '</h3>'
  ],
  listeners: {
    initialize: 'onNavInitialize',
    itemtap: 'onNavItemtap'
  }
});
