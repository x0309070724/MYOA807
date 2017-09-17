Ext.define('APP.store.sys.sms.merchant.record', {
  extend: 'APP.store.cross',
  //autoLoad:false,
  //remoteSort:false,
  alias: 'store.sysSmsMerchantRecord',
  model: 'APP.model.sys.sms.merchant.record',
  sorters: [{property: 'id', direction: 'DESC'}],
  //grouper:{groupFn:function(record){return Ext.Date.format(record.data.submitdate,'Y-m-d')},property:'submitdate',direction:'DESC'},
  proxy: {
    url: Boot.appUrl('/sd/system/sms/getSmsRecords.do'),
    extraParams: {}
  }
});
