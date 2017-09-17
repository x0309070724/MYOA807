Ext.define('APP.model.sys.sms.merchant.record',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
		{name:'backmsg',type:'string'},
		{name:'channel',type:'int'},
		{name:'charnum',type:'int'},
		{name:'content',type:'string'},
		{name:'counts',type:'int'},
		{name:'id',type:'int'},
		{name:'merchantno',type:'string'},
		{name:'referer',type:'string'},
		{name:'send_mobile',type:'string'},
		{name:'sendtime',type:'date'},
		{name:'senduser',type:'string'},
		{name:'success',type:'int'},
		{name:'successid',type:'string'},
		{name:'successmsg',type:'string'}
	]
});
