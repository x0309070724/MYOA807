Ext.define('APP.store.sys.sms.merchant.recharge',{
    extend:'APP.store.cross',
	//autoLoad:false,
	//remoteSort:false,
	alias:'store.sysSmsMerchantRecharge',
	model:'APP.model.sys.sms.merchant.recharge',
	sorters:[{property:'id',direction:'DESC'}],
	//grouper:{groupFn:function(record){return Ext.Date.format(record.data.submitdate,'Y-m-d')},property:'submitdate',direction:'DESC'},		
	proxy:{
		url:Boot.appUrl('/sd/system/pay/getPaymentRecords.do'),
		extraParams:{}
	}
});
