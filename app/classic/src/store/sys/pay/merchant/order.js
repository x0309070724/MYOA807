Ext.define('APP.store.sys.pay.merchant.order', {
  extend: 'APP.store.cross',
  alias: 'store.sysPayMerchantOrder',
  fields: [
    {name: 'id', type: 'int'},
    {name: 'submitdate', type: 'date'},
    {name: 'synctime', type: 'date'},
    {name: 'expiration', type: 'date'},
    {name: 'creattime', type: 'date'},
    {name: 'updatetime', type: 'date'}
  ],
  sorters: [{property: 'id', direction: 'DESC'}],
  grouper: {
    groupFn: function (record) {
      return Ext.Date.format(record.data.submitdate, 'Y-m-d')
    }, property: 'submitdate', direction: 'DESC'
  },
  proxy: {
    url: Boot.appUrl('/sd/system/pay/getRecords.do'),
    extraParams: {}
  }
});
