Ext.define('APP.store.sys.sms.merchant.account', {
  extend: 'APP.store.cross',
  //autoLoad:false,
  //remoteSort:false,
  alias: 'store.sysSmsMerchantAccount',
  model: 'APP.model.sys.sms.merchant.account',
  sorters: [{property: 'id', direction: 'DESC'}],
  grouper: {
    groupFn: function (record) {
      return Ext.Date.format(record.data.createtime, 'Y-m-d')
    }, property: 'createtime', direction: 'DESC'
  },
  proxy: {
    url: Boot.appUrl('/sd/system/sms/getSmsMerchant.do'),
    extraParams: {}
  }
});
