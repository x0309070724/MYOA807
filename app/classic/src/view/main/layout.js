Ext.define('APP.view.main.layout', {
  extend: 'Ext.Container',
  //extend:'Ext.Panel',
  xtype: 'mainLayout',
  // A set of default configurations to apply to all child Components in this Container
  defaults: {split: true},
  layout: {type: 'border', animate: true, align: 'stretch', padding: 2},
  items: [
    {
      xtype: 'panel', region: 'west', collapsible: true, layout: 'fit',
      name: 'mainNav',
      width: 180,
      bind: {title: '{account.department_name}：{account.namecn}'},
      // next details
      listeners: {
        render: 'onMainNavTreeRender'
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar', items: [
          {
            tooltip: '更改登录密码',
            iconCls: 'f-mt mt-password',
            mateWidget: 'accountUpdatePassword',
            handler: 'onMateWidgetShow',
            mateAnimate: true
          }, '-',
          {
            tooltip: '更改安全密码',
            iconCls: 'f-mt mt-password-safe',
            mateWidget: 'accountUpdatePasswordSafe',
            handler: 'onMateWidgetShow',
            mateAnimate: true
          }, '-',
          {
            tooltip: '更换Email',
            iconCls: 'f-mt mt-email',
            mateWidget: 'accountUpdateEmail',
            handler: 'onMateWidgetShow',
            mateAnimate: true
          }, '-',
          {
            tooltip: '更换手机',
            iconCls: 'f-mt mt-mobile',
            mateWidget: 'accountUpdateMobile',
            handler: 'onMateWidgetShow',
            mateAnimate: true
          },
          '->',
          {tooltip: '退出系统', iconCls: 'f-mt mt-close', handler: 'onLogoutClick'}
        ]
        },
        {
          dock: 'bottom', xtype: 'toolbar', items: [
//					{tooltip:'用户系统',iconCls:'f-mt mt-home',href:'/'},'-',
//					{tooltip:'发送短信',iconCls:'f-mt mt-mobile',mateWidget:'smsSend',handler:'onMateWidgetShow',mateAnimate:true},'-',
//					{tooltip:'发送邮件',iconCls:'f-mt mt-email',mateWidget:'mailSend',handler:'onMateWidgetShow',mateAnimate:true},'-',
//					{tooltip:'发送微信',iconCls:'f-mt mt-wechat',mateWidget:'wechatSend',handler:'onMateWidgetShow',mateAnimate:true},'-',
//					{tooltip:'发送QQ广播',iconCls:'f-mt mt-qq',mateWidget:'bqqSend',handler:'onMateWidgetShow',mateAnimate:true},
          '->',
          '<b>Version：' + Boot.version + '</b>'
          //'->'
        ]
        }
      ],
      tools: [
        {type: 'gear', callback: 'getRegionMenu'},
        {type: 'help', href: '#'}
      ]
    },
    {
      xtype: 'tabpanel', region: 'center',
      layout: 'card',
      name: 'mainTab',
      closeAction: 'destroy',
      plugins: [
        {ptype: 'tabreorderer'},
        {
          ptype: 'tabclosemenu',
          closeTabText: '关闭当前选项卡',
          closeOthersTabsText: '除此之外全部关闭',
          closeAllTabsText: '全部关闭'
        }
      ],
//			activeTab:0,
//			resizeTabs:false,
//			deferredRender:false,
//			enableTabScroll:false,
//			frame:false,
      minTabWidth: 140
    }
  ]
});

