Ext.define('APP.view.main.navigation', {
  extend: 'Ext.NavigationView',
  xtype: 'mainNavigation',
  controller: 'navigation',
  reference: 'navigation',
  //scrollable:false,
  //fullscreen:true,
  //autoDestroy:true,
  fullscreen: true,
  navigationBar: false,
  layout: {type: 'card', animation: {type: 'cover'}},
  listeners: {
    // Fires when a view is pushed into this navigation view
    push: 'onNavigationPush',
    pop: 'onNavigationPop'
  }
});
