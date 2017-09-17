Ext.define('APP.view.hr.company.post', {
  extend: 'Ext.Container',
  controller: 'hr.company',
  layout: {type: 'border', align: 'stretch', padding: 3},
  defaults: {layout: 'fit', split: true, border: true},
  items: [
    {
      xtype: 'grid', region: 'center', title: '职务', flex: .7,
      reference: 'postGrid',
      multiSelect: false,
      collapsible: false,
      store: {
        type: 'cross',
        autoLoad: true,
        pageSize: false,
        groupField: 'departmentid',
        groupDir: 'ASC',
        sorters: [{property: 'departmentid', direction: 'ASC'}, {property: 'id', direction: 'ASC'}],
        proxy: {
          url: Boot.appUrl('/hr/company/getPost.do')
        }
      },
      dockedItems: [
        {
          dock: 'top', xtype: 'toolbar',
          items: [
            {
              xtype: 'searchbar', fields: [
              {
                xtype: 'segmentedfield', segmented: {
                name: 'invalid',
                items: [
                  {tooltip: '启用', iconCls: 'f-mt mt-yes', value: 0, pressed: true},
                  {tooltip: '禁用', iconCls: 'f-mt mt-no', value: 1},
                  {tooltip: '全部', iconCls: 'f-mt mt-icon', value: ''}
                ]
              }
              }
            ]
            },
            '->',
            {iconCls: 'f-mt mt-creat', text: '新增', handler: 'onPostCreatClick'},
            //{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onPostRemoveClick'},
            '-',
            {xtype: 'refreshbutton'}
          ]
        }
      ],
      columns: [
        {xtype: 'rownumberer'},
        {text: '部门', dataIndex: 'departmentid', xtype: 'templatecolumn', width: 200, tpl: '{department_name}'},
        {text: '名称', dataIndex: 'name', width: 160, summaryType: 'count'},
        {text: '查询权限', dataIndex: 'query', width: 120, renderer: 'returnPostQuery'},
        {text: '管理权限', dataIndex: 'manager', width: 180, renderer: 'returnPostManager'},
        {text: '数据导出', dataIndex: 'export', renderer: 'returnYesNo', align: 'center', width: 80},
        {
          text: '成员数',
          dataIndex: 'staff_count',
          align: 'right',
          width: 80,
          renderer: 'returnA',
          summaryType: 'sum',
          summaryRenderer: 'returnA'
        },
        {text: '系统权限', dataIndex: 'competence_count', align: 'right', width: 80, renderer: 'returnA'},
        {text: '描述', dataIndex: 'explain', minWidth: 200, flex: 1, renderer: 'returnMore'},
        {text: '禁用', dataIndex: 'invalid', align: 'center', width: 60, renderer: 'returnYes'},
        {
          text: '修改',
          xtype: 'actioncolumn',
          align: 'center',
          width: 60,
          iconCls: 'f-mt mt-edit',
          handler: 'onPostUpdateClick'
        }
      ],
      features: [{ftype: 'groupingsummary'}, {ftype: 'summary', dock: 'bottom'}],
      listeners: {
        selectionchange: 'onMateGridShowActionButton',
        rowdblclick: 'onPostCompetenceRefresh'
      }
    },
    {
      xtype: 'treepanel', region: 'east', title: '系统权限', flex: .3,
      reference: 'postCompetenceTree',
      multiSelect: true,
      singleExpand: false,
      rootVisible: false,
      useArrows: true,
      disabled: true,
      tbar: ['->',
        {
          iconCls: 'f-mt mt-expand',
          text: '展开全部',
          enableToggle: true,
          toggleHandler: 'onPostCompetenceTreeToggleHandler'
        }
      ],
      listeners: {
        render: 'onPostCompetenceRender',
        checkchange: 'onPostCompetenceCheckChange'
      }
    }
  ]
});















