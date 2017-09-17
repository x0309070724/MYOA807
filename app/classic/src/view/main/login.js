Ext.define('APP.view.main.login', {
  extend: 'Ext.Container',
  xtype: 'login',
  id: 'mateLogin',
  layout: {type: 'vbox', align: 'center', pack: 'center'},
  userCls: 'x-ui-login',
  defaults: {width: 620},
  items: [
    {
      xtype: 'container', userCls: 'x-ui-logo', height: 100, items: [
      {xtype: 'image', alt: 'LOGO', bind: {src: '{oa.basis.logo:oss}', alt: '{oa.basis.aliases}'}, width: 300}
    ]
    },
    {
      xtype: 'form', title: '系统登录',
      userCls: 'x-ui-form-large',
      bodyPadding: '20 60 10 30',
      margin: '36 0 0 0',
      border: false, scrollable: false,
      layout: {type: 'hbox', align: 'stretch'},
      items: [
        {
          xtype: 'container', width: 160, margin: '20 0 0 0', items: [
          {xtype: 'box', cls: 'x-ui-icon f-mt mt-users'}
        ]
        },
        {
          xtype: 'container', layout: 'anchor', flex: 1, items: [
          {xtype: 'hiddenfield', name: 'cmd', value: 'login'},
          {xtype: 'hiddenfield', name: 'type', bind: '{type.value}'},
          {
            xtype: 'segmentedbutton', defaults: {width: 60},
            margin: '0 0 10 74',
            reference: 'type', publishes: 'value',
            items: [
              {text: '账号', value: 'login', pressed: true},
              {text: '手机', value: 'mobile'}
            ]
          },
          {
            xtype: 'fieldcontainer',
            layout: 'anchor',
            bind: {hidden: '{type.value!="login"}', disabled: '{type.value!="login"}'},
            items: [
              {
                fieldLabel: '账号',
                xtype: 'numberfield',
                name: 'login',
                vtype: 'login',
                allowBlank: false,
                value: Mate.getCache('loginData/login')
              },
              {
                fieldLabel: '登录密码',
                xtype: 'passwordfield',
                name: 'password',
                allowBlank: false,
                keyMap: {ENTER: 'onLoginFormEnterSubmit'}
              },
              {
                boxLabel: '记住我',
                xtype: 'checkbox',
                value: true,
                name: 'rememberme',
                maxHeight: 20,
                minHeight: 20,
                hideEmptyLabel: false
              }
            ]
          },
          {
            xtype: 'fieldcontainer',
            layout: 'anchor',
            hidden: true,
            bind: {hidden: '{type.value!="mobile"}', disabled: '{type.value!="mobile"}'},
            items: [
              {
                fieldLabel: '手机',
                xtype: 'numberfield',
                name: 'mobile',
                vtype: 'mobile',
                allowBlank: false,
                value: Mate.getCache('loginData/mobile')
              },
              {
                fieldLabel: '校验码',
                xtype: 'verifycodefield',
                verifyData: {app: 'apply', key: 102102101},
                keyMap: {ENTER: 'onLoginFormEnterSubmit'}
              },
              {
                boxLabel: '记住我',
                xtype: 'checkbox',
                value: true,
                name: 'rememberme',
                maxHeight: 20,
                minHeight: 20,
                hideEmptyLabel: false
              }
            ]
          },
          {text: '登 录', xtype: 'submitbutton', handler: 'onLoginFormSubmit'}
        ]
        }
      ]
    }
  ]
});
