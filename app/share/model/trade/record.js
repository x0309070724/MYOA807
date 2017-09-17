﻿Ext.define('APP.model.sd.trade.record',{
	extend:'Ext.data.Model',
	idProperty:'order',
	fields:[
		{name:'order',type:'int'},
		{name:'login',type:'int'},
		{name:'symbol',type:'string'},
		{name:'digits',type:'int'},
		{name:'cmd',type:'int'},
		{name:'volume',type:'number'},
		{name:'open_time',type:'date'},
		{name:'open_price',type:'number'},
		{name:'close_time',type:'date'},
		{name:'expiration',type:'date'},
		{name:'close_price',type:'number'},
		{name:'sl',type:'number'},
		{name:'tp',type:'number'},
		{name:'margin_rate',type:'number'},
		{name:'commission',type:'number'},
		{name:'commission_agent',type:'number'},
		{name:'storage',type:'number'},
		{name:'taxes',type:'number'},
		{name:'profit',type:'number'},
		{name:'comment',type:'string'},
		{name:'clear',type:'number'},
		{name:'timestamp',type:'date'},
		
		
		
		{name:'account_typeid',type:'int'},{name:'account_type',type:'string'},
		{name:'account_namecn',type:'string'},{name:'account_name',type:'string'}
		
		
		
	]
});

