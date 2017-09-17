Ext.define('APP.store.hr.staff.staff', {
  extend: 'APP.store.cross',
  alias: 'store.hrStaff',
  model: 'APP.model.hr.staff.account',
  sorters: [{property: 'teamid', direction: 'ASC'}, {property: 'postid', direction: 'ASC'}],
  groupField: 'departmentid',
  proxy: {
    url: Boot.appUrl('/hr/staff/profile/getInfo.do'),
    extraParams: {}
  }
});
