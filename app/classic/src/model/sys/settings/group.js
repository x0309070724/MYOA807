﻿Ext.define('APP.model.sys.settings.group',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
		{name:'id',type:'int'},
		{name:'pid',type:'int'},
		{name:'code',type:'string'},
		{name:'name',type:'string'},
		{name:'explain',type:'string'},
		{name:'sortnum',type:'int'}
	]
});
