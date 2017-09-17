Ext.define('APP.store.sys.mt4.symbolGroupTree',{
    extend:'Ext.data.TreeStore',
	alias:'store.mt4SymbolGroupTree',
	storeId:'mt4SymbolGroupTree',
	autoLoad:true,
	root:{expanded:true,children:[]}
});
