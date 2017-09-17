Ext.define('APP.view.hr.staff.change.positiveForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrStaffChangePositiveForm',
  viewModel: true,
  userCls: 'x-ui-form-large',
  width: 680,
  layout: {type: 'hbox', align: 'stretch'},
  bodyPadding: '20 60 20 20',
  items: [
    {
      xtype: 'container', width: 160, items: [
      {xtype: 'box', userCls: 'x-ui-icon f-mt mt-account-strate'}
    ]
    },
    {
      xtype: 'container', layout: 'anchor', flex: 1, items: [
      {
        xtype: 'container', layout: 'anchor', defaults: {bind: {disabled: '{isLocked.checked}'}}, items: [
        {fieldLabel: '工号', xtype: 'numberfield', name: 'login', vtype: 'login', readOnly: true},
        {fieldLabel: '姓名', xtype: 'textfield', name: 'namecn', readOnly: true},
        {
          fieldLabel: '现属团队', xtype: 'fieldcontainer', layout: 'hbox', items: [
          {xtype: 'textfield', name: 'department_name', flex: .5, readOnly: true},
          {xtype: 'textfield', name: 'team_name', flex: .5, margin: '0 0 0 5', readOnly: true}
        ]
        },
        {fieldLabel: '转正日期', xtype: 'datefield', name: 'positivedate', allowBlank: false}
      ]
      }
    ]
    }
  ]
});
