Ext.define('APP.view.combo.pinyinFormat', {
  extend: 'Ext.form.field.ComboBox',
  xtype: 'comboPinyinFormat',
  store: {
    fields: ['groupname', 'value', 'display'],
    data: [
      ['姓在前', 11, 'Zhang Sanfeng'],
      ['姓在前', 12, 'Zhang San Feng'],
      ['姓在前', 13, 'ZHANG SANFENG'],
      ['姓在前', 14, 'ZHANG SAN FENG'],

      ['姓在后', 21, 'Sanfeng Zhang'],
      ['姓在后', 22, 'San Feng Zhang'],
      ['姓在后', 23, 'SANFENG ZHANG'],
      ['姓在后', 24, 'SAN FENG ZHANG'],

      ['其它', 31, 'ZHANG Sanfeng']
    ]
  },
  emptyText: '拼音格式...',
  name: 'pinyin',
  valueField: 'value',
  displayField: 'display',
  listConfig: {
    minWidth: 180,
    tpl: [
      '<tpl for=".">',
      '<tpl if="xindex== 1||this.getGroupStr(parent[xindex-2])!=this.getGroupStr(values)">',
      '<li class="x-ui-combo-l1">{[this.getGroupStr(values)]}</li>',
      '</tpl>',
      '<li role="option" class="x-boundlist-item x-ui-combo-list">{display}</li>',
      '</tpl>',
      {
        getGroupStr: function (values) {
          return values.groupname
        }
      }
    ]
  }
});
