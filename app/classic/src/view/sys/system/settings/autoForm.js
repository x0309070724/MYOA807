Ext.define('APP.view.ia.system.autoForm', {
  extend: 'Ext.form.Panel',
  xtype: 'iaSystemAutoForm',
  width: 750,
  items: [
    {
      items: [
        {
          columnWidth: .35, items: [
          {fieldLabel: '启用', xtype: 'checkbox', name: 'enabled', inputValue: 1, checked: true},
          {fieldLabel: '执行时间', boxLabel: '分钟', emptyText: '执行时间', xtype: 'textfield', name: 'at_time'},
          {
            fieldLabel: '执行频率', emptyText: '执行频率', xtype: 'combo', name: 'at_case',
            store: {
              fields: ['value', 'display'],
              data: [[1, '定时任务'], [2, '间隔任务']]
            },
            width: 120,
            valueField: 'value',
            displayField: 'display'
          },
          {
            xtype: 'checkboxgroup', columns: 3, fieldLabel: '每周定时', items: [
            {boxLabel: '周日', name: 'week_sun', inputValue: '1'},
            {boxLabel: '周一', name: 'week_mon', inputValue: '1'},
            {boxLabel: '周二', name: 'week_tue', inputValue: '1'},
            {boxLabel: '周三', name: 'week_wed', inputValue: '1'},
            {boxLabel: '周四', name: 'week_thur', inputValue: '1'},
            {boxLabel: '周五', name: 'week_fri', inputValue: '1'},
            {boxLabel: '周六', name: 'week_sat', inputValue: '1'}
          ]
          },
          {fieldLabel: '任务描述', xtype: 'textarea', name: 'plugin_description', height: 100, emptyText: '任务描述'}
        ]
        },
        {
          columnWidth: .65, items: [
          {fieldLabel: '插件名称', emptyText: '插件名称', xtype: 'comboAutoform', name: 'plugin'},
          {fieldLabel: '插件配置', xtype: 'textarea', name: 'plugin_config', height: 230, emptyText: '插件配置'}
        ]
        }
      ]
    }
  ]
});
