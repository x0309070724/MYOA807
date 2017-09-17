Ext.define('APP.view.sys.pay.aisle.appPayFrom', {
  extend: 'Ext.form.Panel',
  xtype: 'sysPayAisleAppPayFrom',
  controller: 'sys.pay',
  width: 680,
  viewModel: true,
  items: [
    {
      title: 'App信息', fieldDefaults: {allowBlank: false}, items: [
      {
        columnWidth: .6, id: 'app_radio', items: [
        {
          // the meaning of action? explain ：类似于 name or reference 属性，只是为了标记这个component,方便用getAction方法获取
          xtype: 'radiogroup', action: 'aisle', margin: '10 40',
          items: [
            // Specifies a name for this component inside its component hierarchy. This name must be unique within its view or its Ext.app.ViewController.
            {boxLabel: '现有App', name: 'app_pay', inputValue: 'old_app', checked: true, reference: 'old_app'},
            {boxLabel: '新增App', name: 'app_pay', inputValue: 'new_app', reference: 'new_app'}
          ]
        }
      ]
      },
      {
        columnWidth: .45, items: [
        {
          fieldLabel: 'App名称',
          action: 'old_app',
          xtype: 'comboAppPay',
          name: 'payment',
          bind: {hidden: '{new_app.checked}', disabled: '{new_app.checked}'},
          allowBlank: false
        },
        {
          fieldLabel: 'App名称',
          action: 'new_app',
          xtype: 'textfield',
          name: 'name',
          bind: {hidden: '{!new_app.checked}', disabled: '{!new_app.checked}'},
          allowBlank: false
        },
        {
          fieldLabel: '支付标识',
          xtype: 'textfield',
          name: 'payment',
          bind: {hidden: '{!new_app.checked}', disabled: '{!new_app.checked}'},
          allowBlank: false
        },
        {fieldLabel: '单笔最小', xtype: 'numberfield', name: 'min_amount', allowBlank: false}
      ]
      },
      {
        columnWidth: .45, items: [
        {fieldLabel: '支付通道', xtype: 'comboPayment', name: 'payaisleid', allowBlank: false},
        {fieldLabel: '单笔最大', xtype: 'numberfield', name: 'max_amount', allowBlank: false}
      ]
      },
      {
        columnWidth: 1, items: [
        {fieldLabel: '启用', xtype: 'checkbox', name: 'invalid', checked: true}
      ]
      }
    ]
    }
  ]
  // items:[
  // 	{title:'App信息',fieldDefaults:{allowBlank:false},items:[
  // 		{columnWidth:.45,items:[
  // 			{fieldLabel:'名称',xtype:'textfield',name:'name'},
  // 			//{fieldLabel:'支付标识',xtype:'textfield',name:'payment'},
  // 			{fieldLabel:'单笔最小',xtype:'textfield',name:'min_amount'}
  // 		]},
  // 		{columnWidth:.45,items:[
  // 			{fieldLabel:'支付标识',xtype:'textfield',name:'payment'},
  // 			{fieldLabel:'单笔最大',xtype:'textfield',name:'max_amount'}
  // 			//{fieldLabel:'支付代码',xtype:'textfield',name:'paycode'},
  // 		]},
  // 		{columnWidth:1,items:[
  // 			{fieldLabel:'启用',xtype:'checkbox',name:'invalid',checked:true}
  // 		]}
  // 	]}
  // ]
});
