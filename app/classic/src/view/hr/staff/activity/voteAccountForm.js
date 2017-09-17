Ext.define('APP.view.hr.staff.activity.voteAccountForm', {
  extend: 'Ext.form.Panel',
  xtype: 'hrStaffActivityVoteAccountForm',
  controller: 'hr.staff.activity',
  title: '竞选人信息',
  eid: '',
  frame: false,
  bodyStyle: 'background:rgba(243, 243, 199, 0.51);',
  layout: 'border',
  //padding:1,
  minHeight: 200,
  defaults: {border: false},
  dockedItems: [
    {
      dock: 'top', xtype: 'toolbar', items: [
      '->',
      {iconCls: 'f-mt mt-creat', text: '添加', title: '添加', handler: 'onVoteAccountCreatClick'},
      '-',
      {xtype: 'refreshbutton'}
    ]
    }
  ],
  items: [
    {
      xtype: 'grid', region: 'center', columnWidth: 1,
      store: {
        type: 'cross',
        fields: [
          {name: 'sectionid', type: 'int'},
          {name: 'name', type: 'string'},
          {name: 'description', type: 'string'}
        ],
        sorters: [{property: 'id', direction: 'DESC'}],
        proxy: {
          url: Boot.appUrl('/vote/getVoteElectioneer.do')
        }
      },
      columns: [
        {xtype: 'rownumberer'},
        {text: 'ID', width: 140, dataIndex: 'sectionid', hidden: true},
        //{text:'V_ID',width:140,dataIndex:'v_id',hidden:true},
        {text: '竞选名称', width: 140, dataIndex: 'name'},
        {text: '拉票宣言', minWidth: 160, flex: 1, dataIndex: 'explain'},
        {
          xtype: 'actioncolumn', text: '操作', align: 'center', width: 60,
          items: [
            {tooltip: '编辑', iconCls: 'f-mt mt-action-update', handler: 'onVoteAccountUpdateClick'}
          ]
        }
      ]
    }
  ], listeners: {
    render: function (panel) {
      var store = panel.down('grid').getStore();
      Ext.apply(store.proxy.extraParams, {sectionid: panel.up('window').v_id});
      store.loadPage(1);
    }
  }
});
