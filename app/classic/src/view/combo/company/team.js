Ext.define('APP.view.combo.company.team', {
  extend: 'Ext.ux.TreePicker',
  xtype: 'comboCompanyTeam',
  store: Ext.create('Ext.data.TreeStore'),
  name: 'teamid',
  valueField: 'id',
  displayField: 'name',
  minPickerWidth: 400,
  minPickerHeight: 200,
  maxPickerHeight: 360,
  emptyText: '选择团队',
//	editable:false,
//	rootVisible:false,
  width: 150,
  value: '',
  enableKeyEvents: true,
  //columnWidth:300,
  //forceSelection:true,
  initComponent: function () {
    this.callParent();
    var combo = this,
      store = Ext.create('Ext.data.TreeStore', {
        fields: [
          {name: 'id', type: 'int'},
          {name: 'name', type: 'string'}
          //			{name:'display',type:'string',
          //				convert:function(value,record){
          //					return record.data.id
          //				}
          //			}
        ],
        root: {text: '', id: 0, expanded: true}
      }),
      data = APP.app.getTeamTreeData();
    // console.log(data);
    store.setRoot({text: '', id: 0, expanded: true, children: data});
    if (combo.root) {
      //store.clearFilter();
      store.filterBy(function (record) {
        return record.get('id').toString().substr(0, 3) == combo.root;
      });
    }
    combo.setStore(store);
  }
});
