Ext.define('APP.view.combo.company.post', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboCompanyPost',
  store: {
    fields: [
      {name: 'id', type: 'int'},
      {name: 'departmentid', type: 'int'},
      {name: 'name', type: 'string'}
    ]
  },
  emptyText: '职务...',
  name: 'postid',
  valueField: 'id',
  displayField: 'name',
  width: 120,
  forceSelection: false,
  listConfig: {
    minWidth: 240,
    tpl: [
      '<tpl for=".">',
        '<tpl if="xindex==1||this.getGroupStr(parent[xindex-2])!=this.getGroupStr(values)">',
          '<li class="x-ui-combo-l1"><span class="f-mt mt-combo-title"></span>{[this.getGroupStr(values)]}</li>',
        '</tpl>',
        '<li role="option" class="x-boundlist-item x-ui-combo-column x-ui-column-2">{name}</li>',
      '</tpl>',
      {
        getGroupStr: function (values) {
          return values.department_name;
        }
      }
    ]
  },
  initComponent: function () {
    this.callParent();
    var combo = this,
      deptData = APP.app.getAppData('company/department'),
      postData = APP.app.getAppData('company/post'),
      data = [];
    // console.log(deptData);
    // console.log(postData);
    Ext.Array.each(postData, function (item) {
      var deptItem = Ext.Array.findBy(deptData, function (dept) {
        return item.departmentid === dept.id;
      });
      item.department_name = deptItem.name;
      data.push(item);
    });
    combo.getStore().setData(data);
    combo.getStore().sort([
      {property: 'departmentid', direction: 'ASC'},
      {property: 'id', direction: 'ASC'}
    ]);
    combo.setValue(combo.getValue());
    combo.forceSelection = true;
  }
});
