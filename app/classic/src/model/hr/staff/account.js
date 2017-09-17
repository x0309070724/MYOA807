Ext.define('APP.model.hr.staff.account', {
  extend: 'Ext.data.Model',
  // The name of the field treated as this Model's unique id.
  idProperty: 'id',
  fields: [
    {name: 'id', type: 'int'},
    {name: 'login', type: 'int'},
    {name: 'administrator', type: 'int'}, {name: 'departmentid', type: 'int'}, {
      name: 'postid',
      type: 'int'
    }, {name: 'branchid', type: 'int'}, {name: 'teamid', type: 'int'},
    {name: 'locked', type: 'int'}, {name: 'invalid', type: 'int'},
    //{name:'password',type:'string'},{name:'password_safe',type:'string'},{name:'password_changetime',type:'date'},
    {name: 'namecn', type: 'string'}, {name: 'name', type: 'string'}, {name: 'gender', type: 'string'},
    {name: 'mobile', type: 'string'},
    {name: 'email', type: 'string'},
    {
      name: 'email_name', type: 'string', convert: function (v, record) {
      var val = record.data.email + '@';
      return val.split('@')[0];
    }
    },
//		{name:'email_domain',type:'string',convert:function(v,record){
//			return 'thjz.ltd';
//			//var val=record.data.email+'@';
//			//return val.split('@')[1];
//		}},
    {name: 'phone', type: 'string'}, {name: 'fax', type: 'string'}, {name: 'qq', type: 'string'},
    {name: 'counts', type: 'int'},
    {name: 'creattime', type: 'date'},
    {name: 'updatetime', type: 'date'}
  ]
});
