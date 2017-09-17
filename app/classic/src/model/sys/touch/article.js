Ext.define('APP.model.sys.touch.article',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
		{name:'id',type:'int'},{name:'icon',type:'string'},
		{name:'title',type:'string'},{name:'keyword',type:'string'},{name:'description',type:'string'},{name:'content',type:'string'},
		{name:'sortnum',type:'int'},{name:'locked'},
		//{name:'creadate'},
		{name:'creattime',type:'date'},
		{name:'updatetime',type:'string'}
	]
});



