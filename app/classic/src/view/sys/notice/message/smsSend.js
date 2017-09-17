Ext.define('APP.view.sys.notice.message.smsSend', {
  extend: 'Ext.window.Window',
  xtype: 'smsSend',
  controller: 'sys.notice.message',
  autoShow: true,
  width: 680,
  title: '发送短信通知',
  border: true,
  items: [
    {
      xtype: 'form', frame: false, height: 340,
      layout: {type: 'hbox', align: 'stretch'},
      viewModel: {data: {sendnoCount: 0}},
      tbar: [
        {xtype: 'tbtext', bind: {text: '{time}'}}, '-',
        {xtype: 'tbtext', bind: {text: '待发送 <span class="x-ui-text-red">{sendnoCount}</span> 手机号'}},
        '->',
        {iconCls: 'f-mt mt-reset', tooltip: '重设', handler: 'onMateFormReset'}
      ],
      items: [
        {
          xtype: 'container', layout: {type: 'vbox', align: 'stretch'}, width: 180, items: [
          {xtype: 'hiddenfield', name: 'idx', value: 0, bind: {value: '{fieldIdx.value}'}},
          {
            xtype: 'segmentedbutton',
            reference: 'fieldIdx',
            publishes: 'value',
            defaults: {minWidth: 80, flex: 1},
            margin: '0 0 5 0',
            items: [
              {text: '客户', value: 2},
              {text: '员工', value: 1},
              {text: '其它', value: 0, pressed: true}
            ]
          },
          {
            emptyText: '类型...',
            xtype: 'comboAccountType',
            name: 'idxkey',
            hidden: true,
            bind: {hidden: '{fieldIdx.value!=2}', disabled: '{fieldIdx.value!=2}'}
          },
          {
            emptyText: '团队...',
            xtype: 'comboCompanyTeam',
            name: 'idxkey',
            hidden: true,
            bind: {hidden: '{fieldIdx.value!=1}', disabled: '{fieldIdx.value!=1}'}
          },
          {
            xtype: 'textarea',
            name: 'sendnos',
            flex: 1,
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {keyup: 'onEnterSms'},
            bind: {disabled: '{fieldIdx.value!=0}'}
          }
        ]
        },

        {
          xtype: 'container', layout: {type: 'vbox', align: 'stretch'}, flex: 1, margin: '0 0 0 5', items: [
          {
            xtype: 'fieldcontainer', layout: 'hbox', items: [
            {
              xtype: 'radiogroup',
              columns: 2,
              name: 'from',
              allowBlank: false,
              width: 200,
              margin: '0 0 0 5',
              hidden: true,
              bind: {hidden: '{fieldIdx.value!=0}', disabled: '{fieldIdx.value!=0}'},
              items: [
                {boxLabel: 'From OA', inputValue: 'OA', checked: true},
                {boxLabel: 'From CRM', inputValue: 'CRM'}
              ]
            }
          ]
          },
          {emptyText: '短信内容', xtype: 'textarea', name: 'content', flex: 1, allowBlank: false}
        ]
        }
      ],
      bbar: [
        '->',
        {
          text: '执行发送', iconCls: 'f-mt mt-button-submit', scale: 'medium',
          handler: 'onMateFormSubmit',
          mateParameters: {
            url: Boot.appUrl('/sys/notice/message/sendSms.do'),
            callback: function (formValues, data) {
            }
          }
        },
        {text: '取消操作', iconCls: 'f-mt mt-button-cancel', scale: 'medium', handler: 'onMateWindowDestroy'}
      ]
    }
  ]
});





