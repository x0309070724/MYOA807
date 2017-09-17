Ext.define('APP.view.main.sendBirForm', {
  extend: 'Ext.form.Panel',
  xtype: 'sendBirForm',
  width: 600,
  controller: 'mainViewport',
  items: [
    {
      fieldLabel: '祝福对象',
      xtype: 'textfield',
      name: 'namecn',
      allowBlank: false,
      readOnly: true,
      bind: {value: '{namecn}'}
    },
    {
      xtype: 'hiddenfield',
      reference: '_content',
      name: 'content',
      allowBlank: false
    },
    {fieldLabel: '主题', xtype: 'hiddenfield', name: 'title', allowBlank: false, value: 'happy birthday to you'},
    {
      fieldLabel: '内容',
      allowBlank: false,
      xtype: 'textarea',
      name: '_content',
      reference: '_con',
      height: 80,
      listeners: {
        blur: function () {
          var str = '<div style=\"color: #e5872c;font-size: 14px;\">' + this.value + '</div>';
          this.up('form').getReferences()._content.setValue(str);
        }
      }
    }
  ]
});
