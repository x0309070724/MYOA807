Ext.define('APP.store.sys.notice.record', {
  extend: 'APP.store.cross',
  alias: 'store.sysNoticeRecord',
  fields: [
    {name: 'id', type: 'int'},
    {name: 'sendtime', type: 'date'}
  ],
  sorters: [{property: 'sendtime', direction: 'DESC'}],
  grouper: {
    groupFn: function (record) {
      return Ext.Date.format(record.data.sendtime, 'Y-m-d H:00')
    }, property: 'sendtime', direction: 'DESC'
  },
  proxy: {
    url: Boot.appUrl('/tool/notice/getRecord.do'),
    extraParams: {}
  }
});
