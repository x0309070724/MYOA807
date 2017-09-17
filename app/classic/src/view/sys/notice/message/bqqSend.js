Ext.define('APP.view.notice.message.bqqSend', {
  extend: 'Ext.window.Window',
  xtype: 'bqqSend',
  controller: 'sys.notice.message',
  autoShow: true,
  width: 1080,
  title: '发送QQ广播',
  border: true,
  items: [
    {
      xtype: 'form', frame: false, height: 480,
      layout: {type: 'hbox', align: 'stretch'},
      viewModel: {data: {sendnoCount: 0}},
      tbar: [
        {xtype: 'tbtext', bind: {text: '{time}'}}, '-',
        {xtype: 'tbtext', bind: {text: '待发送 <span class="x-ui-text-red">{sendnoCount}</span> 个收件人'}},
        '->',
        {iconCls: 'f-mt mt-reset', tooltip: '重设', handler: 'onMateFormReset'}
      ],
      items: [
        {
          xtype: 'container', layout: {type: 'vbox', align: 'stretch'}, width: 260, items: [
          {xtype: 'hiddenfield', name: 'idx', value: 1, bind: {value: '{fieldIdx.value}'}},
          {
            xtype: 'segmentedbutton',
            reference: 'fieldIdx',
            publishes: 'value',
            defaults: {minWidth: 80, flex: 1},
            margin: '0 0 5 0',
            items: [
              {text: '客户', value: 2, disabled: true},
              {text: '员工', value: 1, pressed: true},
              {text: '其它', value: 0, disabled: true}
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
            listeners: {keyup: 'onEnterMail'},
            bind: {disabled: '{fieldIdx.value!=0}'}
          }
        ]
        },


        {
          xtype: 'container', layout: {type: 'vbox', align: 'stretch'}, flex: 1, margin: '0 0 0 5', items: [
          {
            xtype: 'fieldcontainer', layout: 'hbox', items: [
            {emptyText: '标题', xtype: 'textfield', name: 'title', flex: 1, allowBlank: false},
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
          {emptyText: '内容', xtype: 'textarea', name: 'content', height: 80, allowBlank: false},

          {
            xtype: 'checkbox',
            boxLabel: '启用URL内容连接',
            inputValue: 1,
            checked: false,
            margin: '10 0 0 0',
            name: 'ishtml',
            reference: 'fieldIshtml'
          },
          {
            emptyText: '连接内容',
            xtype: 'htmleditor',
            name: 'html',
            flex: 1,
            allowBlank: false,
            bind: {disabled: '{!fieldIshtml.checked}'}
          }
        ]
        }

      ],
      bbar: [
        '->',
        {
          text: '执行发送', iconCls: 'f-mt mt-button-submit', scale: 'medium',
          //xtype:'submitbutton',
          handler: 'onMateFormSubmit',
          mateParameters: {
            url: Boot.appUrl('/sys/notice/message/sendBqq.do'),
            callback: function (formValues, data) {
            }
          }
        },
        {text: '取消操作', iconCls: 'f-mt mt-button-cancel', scale: 'medium', handler: 'onMateWindowDestroy'}
      ]
    }
  ]
});





