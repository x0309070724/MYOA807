Ext.define('APP.model.sys.sms.merchant.account', {
  extend: 'Ext.data.Model',
  idProperty: 'id',
  fields: [
    {name: 'createtime', type: 'date'},
    {name: 'id', type: 'int'},
    {name: 'invalid', type: 'int'},
    {name: 'merchantkey', type: 'string'},
    {name: 'merchantno', type: 'string'},
    {name: 'namecn', type: 'string'},
    {name: 'updatetime', type: 'date'}
  ]
});
