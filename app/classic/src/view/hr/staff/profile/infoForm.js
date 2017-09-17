Ext.define('APP.view.hr.staff.profile.infoForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrStaffProfileInfoForm',
  width: 880,
  items: [
    {
      title: '账户信息', items: [
      {
        columnWidth: .4, items: [
        {fieldLabel: '工号', xtype: 'numberfield', name: 'login', vtype: 'login', allowBlank: false}
      ]
      },
      {columnWidth: 1},
      {
        columnWidth: .4, items: [
        {
          fieldLabel: '团队',
          xtype: 'comboCompanyTeam',
          allowBlank: false,
          listeners: {select: 'onCompanyTeamChange'},
          bind: {readOnly: '{isUpdate}'}
        },
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
        }
      ]
      },
      {
        columnWidth: .3, items: [
        {fieldLabel: '职位', xtype: 'comboCompanyPost', allowBlank: false, bind: {readOnly: '{isUpdate}'}},
        {fieldLabel: '手机', xtype: 'textfield', name: 'mobile', vtype: 'mobile', allowBlank: false}
      ]
      },
      {
        columnWidth: .3, items: [
        {fieldLabel: '入职日期', xtype: 'datefield', name: 'startdate', value: new Date(), allowBlank: false},
        {fieldLabel: '企业QQ', xtype: 'textfield', name: 'bqq', allowBlank: false}
      ]
      }
    ]
    },
    {
      title: '员工资料', items: [
      {
        columnWidth: .4, items: [
        {
          xtype: 'fieldcontainer', fieldLabel: '证件', items: [
          {
            xtype: 'uploadimagefield',
            mateParameters: {
              name: 'identity_image',
              api: 'idcard',
              height: 130,
              callback: function (me, json) {
                if (json.api) {
                  var form = me.up('form'),
                    data = json.api;
                  form.getForm().setValues({
                    namecn: data.namecn,
                    name: data.name,
                    gender: data.gender,
                    birthday: data.birthday,
                    identity_nationality: data.nationality,
                    identity_cardno: data.cardno,
                    identity_portrait: data.portrait,
                    identity_country: '中国',
                    identity_address: data.address
                  });
                }
              }
            }
          }
        ]
        }
      ]
      },
      {
        columnWidth: .6, items: [
        {xtype: 'hiddenfield', name: 'identity_type', value: 'china'},
        {xtype: 'hiddenfield', name: 'identity_portrait'},
        {
          xtype: 'fieldcontainer', layout: 'hbox', items: [
          {
            fieldLabel: '姓名', xtype: 'fieldcontainer', layout: 'hbox', flex: .55, items: [
            {emptyText: '中文', xtype: 'textfield', name: 'namecn', flex: .4, margin: '0 5 0 0', allowBlank: false},
            {emptyText: '英文', xtype: 'textfield', name: 'name', flex: .6, allowBlank: false}
          ]
          },
          {
            fieldLabel: '称谓', xtype: 'radiogroup', columns: 2, flex: .45, margin: '0 0 0 5', items: [
            {boxLabel: '先生', name: 'gender', inputValue: 'Mr.', checked: true},
            {boxLabel: '女士', name: 'gender', inputValue: 'Ms.'}
          ]
          }
        ]
        },
        {
          xtype: 'fieldcontainer', layout: 'hbox', items: [
          {fieldLabel: '证件号', xtype: 'textfield', name: 'identity_cardno', flex: .55},
          {fieldLabel: '生日', xtype: 'datefield', name: 'birthday', flex: .45, margin: '0 0 0 5'}
        ]
        },
        {fieldLabel: '户籍地址', xtype: 'textfield', name: 'identity_address'},
        {
          xtype: 'fieldcontainer', layout: 'hbox', items: [
          {fieldLabel: '住宅电话', xtype: 'textfield', name: 'residence_phone', flex: .55},
          {fieldLabel: '民族', xtype: 'textfield', name: 'identity_nationality', flex: .45, margin: '0 0 0 5'}
        ]
        },
        {fieldLabel: '现住地址', xtype: 'textfield', name: 'address'}
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '备注', xtype: 'textarea', name: 'explain', height: 50},
        {xtype: 'noticefield', values: [1, 0, 0], bind: {disabled: '{isUpdate}'}}
      ]
      }
    ]
    }
  ]
})
