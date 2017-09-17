Ext.define('APP.view.hr.staff.profile.accountForm', {
  extend: 'Ext.form.Panel',
  //alias:'widget.hr.staff.profile.accountForm',
  xtype: 'hrStaffProfileAccountForm',
  viewModel: true,
  userCls: 'x-ui-form-large',
  width: 680,
  layout: {type: 'hbox', align: 'stretch'},
  bodyPadding: '20 60 20 20',
  items: [
    {
      xtype: 'container', width: 160, items: [
      {xtype: 'box', userCls: 'x-ui-icon f-mt mt-password-safe'}
    ]
    },
    {
      xtype: 'container', layout: 'anchor', flex: 1, defaults: {allowBlank: false}, items: [
      {
        hideEmptyLabel: false,
        boxLabel: '禁用登录',
        xtype: 'checkbox',
        name: 'locked',
        inputValue: 1,
        reference: 'isLocked'
      },
      {
        xtype: 'container', layout: 'anchor', defaults: {bind: {disabled: '{isLocked.checked}'}}, items: [
        //{fieldLabel:'工号',xtype:'numberfield',name:'login',vtype:'login',allowBlank:false},
        {
          xtype: 'fieldcontainer', layout: 'hbox', fieldLabel: '工号', items: [
          {xtype: 'textfield', name: 'login', allowBlank: false, flex: .6},
          {
            boxLabel: '超级管理员',
            xtype: 'checkbox',
            name: 'administrator',
            inputValue: 1,
            flex: .4,
            margin: '10 0 0 10',
            bind: {hidden: '{!account.administrator}'}
          }
        ]
        },
        //{xtype:'box',html:'该操作将同时重置登陆密码与安全密码',margin:'-5 0 20 74'},
        {fieldLabel: '手机', xtype: 'textfield', vtype: 'mobile', name: 'mobile', allowBlank: false},
        {
          fieldLabel: 'Email', xtype: 'fieldcontainer', layout: 'hbox', flex: .55, items: [
          {xtype: 'hiddenfield', name: 'email', bind: {value: '{emailName.value}@{emailDomain.value}'}},
          {
            xtype: 'textfield',
            name: 'email_name',
            flex: .5,
            reference: 'emailName',
            publishes: 'value',
            allowBlank: false
          },
          {xtype: 'box', html: '@', margin: '2 5', userCls: 'x-ui-text-bold'},
          {
            xtype: 'textfield',
            name: 'email_domain',
            flex: .5,
            value: 'thjz.ltd',
            reference: 'emailDomain',
            publishes: 'value',
            readOnly: true
          }
        ]
        },
        //{fieldLabel:'Email',xtype:'textfield',vtype:'email',name:'email',allowBlank:false},
        {
          hideEmptyLabel: false, xtype: 'checkboxgroup', columns: 1, allowBlank: true, items: [
          {boxLabel: '重置登陆密码', name: 'passwordType', inputValue: 'password'},
          {boxLabel: '重置安全密码', name: 'passwordType', inputValue: 'password_safe'}
        ]
        },

        {
          xtype: 'container', layout: 'anchor', margin: '20 0 0 0', items: [
          {fieldLabel: '安全校验', xtype: 'passwordsafe', name: 'passwordSafe', allowBlank: false},
          {
            xtype: 'box',
            bind: {html: '请输入 <span class="x-ui-text-red">账户：{account.login}</span> 的安全密码. （6位数字）'},
            margin: '-5 0 0 74'
          }
        ]
        }
      ]
      }
    ]
    }
  ]
});
