Ext.define('APP.store.hr.staff.changeTeam',{
    extend:'APP.store.cross',
	alias:'store.hrStaffChangeTeam',
	fields:[
		{name:'creattime',type:'date'}
	],
	sorters:[{property:'effectivedate',direction:'DESC'},{property:'id',direction:'DESC'}],
	proxy:{
		url:Boot.appUrl('/hr/staff/change/getTeam.do'),
		extraParams:{}
	}
});
