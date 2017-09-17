Ext.define('APP.store.sys.mt4.symbolTypeTree',{
    extend:'Ext.data.TreeStore',
	alias:'store.mt4SymbolTypeTree',
	storeId:'mt4SymbolTypeTree',
	//autoLoad:true,
	root:{expanded:true,children:[]}
	//rootVisible:true
	
	
	//sorters:[{property:'id',direction:'DESC'}],
//	proxy:{
//		type:Mate.proxyType(),
//		url:Boot.appUrl('/risk/log/sd/getRecord.do'),
//		reader:{type:'json',rootProperty:'plant',totalProperty:'totalProperty'}
//	}
});
