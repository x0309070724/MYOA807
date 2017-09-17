Ext.define('APP.store.sys.sms.analysis.time',{
    extend:'APP.store.cross',
	//autoLoad:false,
	//remoteSort:false,
	alias:'store.sysSmsAnalysisTime',
	//model:'APP.model.sys.sms.analysis.time',
	sorters:[{property:'id',direction:'DESC'}],
	//grouper:{groupFn:function(record){return Ext.Date.format(record.data.submitdate,'Y-m-d')},property:'submitdate',direction:'DESC'},		
	proxy:{
		url:Boot.appUrl('/sd/system/pay/getPayAisle.do'),
		extraParams:{}
	}
});
