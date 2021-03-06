Ext.define('APP.view.sd.account.accountReport', {
  extend: 'Ext.List',
  controller: 'sd.account',
  store: {
    type: 'analysis.trade.statistics',
    autoLoad: false,
    proxy: {
      extraParams: {
        menu: 'account',
        datepart: 'month',
        startdate: Ext.Date.format(new Date(), 'Y-m'),
        enddate: Ext.Date.format(new Date(), 'Y-m')
      }
    }
  },
  plugins: [
    {type: 'pullrefresh'}
  ],
  items: [
    {
      xtype: 'navbar', menu: [
      {xtype: 'spacer'},
      {xtype: 'datepartbutton'}
    ]
    },
    {xtype: 'boxdatepart'},
    {
      xtype: 'segmentedtab', ui: 'tab', name: 'field', bind: {value: '{parameter.field}'},
      items: [
        {
          text: '净入金',
          iconCls: 'f-mt mt-field-funds',
          value: 'funds',
          sorter: {property: 'funds_net_deposit', direction: 'DESC'}
        },
        {
          text: '交易量',
          iconCls: 'f-mt mt-field-volume',
          value: 'volume',
          sorter: {property: 'trade_volume', direction: 'DESC'}
        }
      ]
    },
    {xtype: 'boxtotal'}
  ],
  userCls: 'x-ui-list',
  itemCls: 'x-ui-list-report',
  itemTpl: [
    '<div class="x-ui-objects">',
      '<p>{objects}</p>',
      '<p>{objects_tip}</p>',
    '</div>',
    '<tpl switch="field">',
    // =====================================================================================净入金
      '<tpl case="funds">',
        '<div class="x-ui-explain">',
          '<p><label>入金：</label><b class="x-ui-text-green">{funds_deposit:money}</b></p>',
          '<p><label>出金：</label><b class="x-ui-text-red">{funds_withdrawal:money}</b></p>',
        '</div>',
        '<div class="x-ui-right">',
          '<label>净入金</label>',
          '<b>{funds_net_deposit:money}</b>',
        '</div>',
    // =====================================================================================交易量
      '<tpl case="volume">',
        '<div class="x-ui-explain">',
          '<p><label>手续费：</label><b class="x-ui-text-green">{trade_commission:money}</b></p>',
          '<p><label>佣　金：</label><b class="x-ui-text-red">{trade_commission_agent:money}</b></p>',
        '</div>',
        '<div class="x-ui-right">',
          '<label>交易量</label>',
          '<b>{trade_volume:stringNumeral(2)}</b>',
        '</div>',
    '</tpl>'
  ],
  listeners: {
    itemtap: 'onRecordItemtap'
  }
});
