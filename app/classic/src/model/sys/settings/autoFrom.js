Ext.define('APP.model.sys.settings.autoFrom', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [
    {name: 'id', type: 'int'},
    {name: 'plugin', type: 'string'},
    {
      name: 'display', type: 'string', convert: function (v, record) {
      return record.data.plugin
    }
    }
  ]
});
