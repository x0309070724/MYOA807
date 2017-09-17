Ext.define('APP.view.combo.company.department', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboCompanyDepartment',
  store: {
    fields: [
      {name: 'id', type: 'int'},
      {name: 'name', type: 'string'}
    ]
  },
  name: 'departmentid',
  valueField: 'id',
  displayField: 'name',
  emptyText: '部门...',
  width: 120,
  forceSelection: true,
  initComponent: function () {
    this.callParent();
    var combo = this,
      data = APP.app.getAppData('company/department');
    // console.log(data);
    combo.getStore().setData(data);
  }
});
