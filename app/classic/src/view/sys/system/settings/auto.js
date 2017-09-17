Ext.define('APP.view.sys.system.settings.auto', {
  extend: 'Ext.grid.Panel',
  xtype: 'sysSystemSettingsAuto',
  controller: 'sys.system.settings',
  store: {
    type: 'cross',
    autoLoad: true,
    fields: [
      {name: 'id', type: 'int'},
      {name: 'enable', type: 'int'},
      {name: 'week_mon', type: 'string'},
      {name: 'week_tue', type: 'string'},
      {name: 'week_wed', type: 'string'},
      {name: 'week_thur', type: 'string'},
      {name: 'week_fri', type: 'string'},
      {name: 'week_sat', type: 'string'},
      {name: 'week_sun', type: 'string'},
      {name: 'plugin_description', type: 'string'},
      {name: 'at_case', type: 'int'},
      {name: 'at_time', type: 'int'},
      {name: 'plugin', type: 'string'},
      {name: 'plugin_config', type: 'string'},
      {name: 'plugin_description', type: 'string'}
    ],
    sorters: [{property: 'id', direction: 'DESC'}],
    proxy: {
      url: Boot.appUrl('/getAutotaskConfig.do')
    }
  },
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar', items: [
      {
        xtype: 'searchbar', fields: [
        {
          xtype: 'segmentedfield', segmented: {
          name: 'enable',
          items: [
            {tooltip: '启用', iconCls: 'f-mt mt-yes', value: 1, pressed: true},
            {tooltip: '禁用', iconCls: 'f-mt mt-no', value: 0},
            {tooltip: '全部', iconCls: 'f-mt mt-icon', value: ''}
          ]
        }
        }
      ]
      },
      '->',
      {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onAutoCreatClick'},
      {iconCls: 'f-mt mt-remove', text: '删除', disabled: true, selection: true, handler: 'onAutoRemoveClick'},
      '-',
      {xtype: 'refreshbutton'}
    ]
    }
  ],
  columns: [
    {xtype: 'rownumberer'},
    {text: '任务描述', dataIndex: 'plugin_description', minWidth: 120, flex: 1},
    {text: '执行频率', dataIndex: 'at_case', minWidth: 120, renderer: 'returnAutoCase'},
    {text: '执行时间', dataIndex: 'at_time', Width: 80, renderer: 'returnAutoTime'},
    {
      text: '每周定时', defaults: {width: 120, align: 'left', renderer: 'returnArrayLenght'}, columns: [
      {text: '周日', dataIndex: 'week_sun', align: 'center', renderer: 'returnAuditStatus'},
      {text: '周一', dataIndex: 'week_mon', align: 'center', renderer: 'returnAuditStatus'},
      {text: '周二', dataIndex: 'week_tue', align: 'center', renderer: 'returnAuditStatus'},
      {text: '周三', dataIndex: 'week_wed', align: 'center', renderer: 'returnAuditStatus'},
      {text: '周四', dataIndex: 'week_thur', align: 'center', renderer: 'returnAuditStatus'},
      {text: '周五', dataIndex: 'week_fri', align: 'center', renderer: 'returnAuditStatus'},
      {text: '周六', dataIndex: 'week_sat', align: 'center', renderer: 'returnAuditStatus'}
    ]
    },
    {text: '启动', dataIndex: 'enable', minWidth: 120, flex: 1, align: 'center', renderer: 'returnAuditStatus'},
    {
      xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
      items: [
        {tooltip: '编辑', iconCls: 'f-mt mt-action-update', handler: 'onAutoUpdateClick'}
      ]
    }
  ],
  features: [{ftype: 'summary', dock: 'bottom'}],
  listeners: {
    selectionchange: 'onMateGridShowActionButton'
  }
});
