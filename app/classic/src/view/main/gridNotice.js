Ext.define('APP.view.main.gridNotice', {
  extend: 'Ext.grid.Panel',
  xtype: 'gridNotice',
  title: '同事好友生日列表',
  store: {
    type: 'cross',
    fields: [
      {name: 'login', type: 'string'},
      {name: 'namecn', type: 'string'},
      {name: 'birthday', type: 'string'},
      {name: 'department_name', type: 'string'}
    ],
    autoLoad: true,
    proxy: {
      url: Boot.appUrl('/mate.do'),
      extraParams: {},
      // 注意这里要加上需要读取的对象
      reader: {type: 'json', rootProperty: 'birthman'}
    }
  },
  multiSelect: true,
  columns: [
    {xtype: 'rownumberer'},
    {text: '工号', dataIndex: 'login', width: 80},
    {text: '好友名称', dataIndex: 'namecn', width: 100},
    {text: '所属部门', dataIndex: 'department_name', minWidth: 80, flex: 1},
    {text: '生日', dataIndex: 'birthday', width: 200},
    {
      xtype: 'actioncolumn',
      text: '发送生日祝福',
      align: 'center',
      width: 95,
      tooltip: '发送',
      iconCls: 'f-mt mt-action-update',
      handler: 'onShowDetailDialog'
    }
  ],
  buttons: [
    '->',
    {
      text: '发送生日祝福', iconCls: 'f-mt mt-button-submit', scale: 'small',
      handler: 'onShowDetailDialogMultiply'
    },
    {text: '关闭', iconCls: 'f-mt mt-button-cancel', scale: 'small', handler: 'onMateWindowDestroy'}
  ]
});
