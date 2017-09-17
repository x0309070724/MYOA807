Ext.define('APP.view.combo.company.staff', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboCompanyStaff',
  store: {
    fields: [
      {name: 'id', type: 'int'},
      {name: 'login', type: 'int'},
      {name: 'department_name', type: 'string'},
      {name: 'branch_name', type: 'string'},
      {name: 'teamid', type: 'int'},
      {name: 'team_name', type: 'string'},
      {name: 'name', type: 'string'},
      {name: 'namecn', type: 'string'},
      {
        name: 'display', type: 'string', convert: function (v, record) {
        return Ext.util.Format.stringPriority(record.data.namecn, record.data.name)
      }
      }
    ]
  },
  emptyText: '员工...',
  width: 120,
  name: 'staffid',
  valueField: 'id',
  displayField: 'display',
  forceSelection: true,
  listConfig: {
    minWidth: 440
  },
  initComponent: function () {
    var combo = this;
    // console.log(combo.root);
    if (combo.root) {
      Ext.apply(this, {
        listConfig: {
          minWidth: 440,
          tpl: [
            '<tpl for=".">',
            '<tpl if="xindex==1||this.t1Id(parent[xindex-2])!=this.t1Id(values)">',
            '<li class="x-ui-combo-l1">{[this.t1Name(values)]}</li>',
            '</tpl>',
            '<li role="option" class="x-boundlist-item x-ui-combo-column x-ui-column-3">{namecn} {name}</li>',
            '</tpl>',
            {
              t1Id: function (values) {
                return values.teamid.toString().substr(0, 9)
              }
            },
            {
              t1Name: function (values) {
                var teamid = values.teamid.toString().substr(0, 9) + '000';
                team = Mate.findManager(teamid);
                return team.name;
              }
            }
          ]
        }
      });
    } else {
      Ext.apply(this, {
        listConfig: {
          minWidth: 440,
          tpl: [
            '<tpl for=".">',
            '<tpl if="xindex==1||this.departmentId(parent[xindex-2])!=this.departmentId(values)">',
            '<li class="x-ui-combo-l1"><r class="f-mt mt-bottom-arrow"></r>{department_name}</li>',
            '</tpl>',
            '<tpl if="xindex==1||this.t1Id(parent[xindex-2])!=this.t1Id(values)">',
            '<li class="x-ui-combo-l2">{team_name}</li>',
            '</tpl>',
            '<li role="option" class="x-boundlist-item x-ui-combo-column x-ui-column-3">{namecn} <s>{name}</s></li>',
            '</tpl>',
            {
              departmentId: function (values) {
                return values.departmentid
              }
            },
            {
              t1Id: function (values) {
                return values.teamid.toString().substr(0, 9)
              }
            }
          ]
        }
      });
    }
    this.callParent();

    var data = APP.app.getAppData('company/staff'),
      newData = [];
    if (combo.root) {
      Ext.Array.each(data, function (item) {
        if (item.departmentid == combo.root) {
          newData.push(item);
        }
      });
    } else {
      var newData = data;
    }
    combo.getStore().sort('teamid');
    combo.getStore().setData(newData);
    //combo.setValue(combo.getValue());
    //combo.forceSelection=true;
  }
});
















