Ext.define('APP.view.main.main', {
  extend: 'Ext.Container',
  xtype: 'main',
  layout: {type: 'vbox', align: 'stretch'},
  listeners: {beforerender: 'onMainInitialize'},
  userCls: 'x-ui-viewport',
  items: [
    {
      xtype: 'toolbar',
      userCls: 'x-ui-viewport-header',
      height: 48,
      items: [
        //{xtype:'component',reference:'mateLogo',cls:'x-ui-logo',width:180},
        {
          xtype: 'container', userCls: 'x-ui-logo', width: 180, items: [
          {xtype: 'image', height: 48, alt: 'LOGO', bind: {src: '{oa.basis.logo:oss}', alt: '{oa.basis.aliases}'}}
        ]
        },
        {iconCls: 'f-mt mt-navicon', handler: 'onToggleNavigationSize'},
        {
          xtype: 'segmentedbutton',
          reference: 'mainNavRoot',
          allowMultiple: false,
          //listeners:{toggle:'setNavTree'},
          defaults: {xtype: 'button', minWidth: 100, arrowVisible: false},
          listeners: {toggle: 'onSetMain'}
        },
        {xtype: 'tbspacer', flex: 1},
        {
          tooltip: '更改登录密码',
          iconCls: 'f-mt mt-password',
          mateWidget: 'accountUpdatePassword',
          handler: 'onMateWidgetShow',
          mateAnimate: true
        },
        {
          tooltip: '更改安全密码',
          iconCls: 'f-mt mt-password-safe',
          mateWidget: 'accountUpdatePasswordSafe',
          handler: 'onMateWidgetShow',
          mateAnimate: true
        },
        {
          tooltip: '更换Email',
          iconCls: 'f-mt mt-email',
          mateWidget: 'accountUpdateEmail',
          handler: 'onMateWidgetShow',
          mateAnimate: true
        },
        {
          tooltip: '更换手机',
          iconCls: 'f-mt mt-mobile',
          mateWidget: 'accountUpdateMobile',
          handler: 'onMateWidgetShow',
          mateAnimate: true
        },
        '-',
        {tooltip: '全屏', iconCls: 'f-mt mt-menu-no-3', handler: 'onFullScreen'},
        '-',
        {iconCls: 'f-mt mt-close', text: '退出系统', handler: 'onLogoutClick'},
        '-',
        {
          cls: 'x-ui-account', minWidth: 100, href: '#accountIndex', hrefTarget: '_self',
          bind: {
            html: [
              '<span class="x-ui-account-login">{account.department_name}：{account.namecn}</span>' +
              '<span class="x-ui-account-icon f-mt mt-account-audit"></span>'
            ]
          }
        }
      ]
    },
    {xtype: 'container', flex: 1, reference: 'mainBody', id: 'mainBody', layout: 'card'}
  ]
});
