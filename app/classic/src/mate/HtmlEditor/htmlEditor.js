Ext.define('APP.mate.HtmlEditor.htmlEditor', {
  extend: 'Ext.form.field.HtmlEditor',
  xtype: 'ux.htmlEditor',
  requires: [
    'APP.mate.HtmlEditor.Upload'
  ],
  initComponent: function () {
    this.plugins = [
      {ptype: 'HtmlEditorUpload'}
    ];
    this.callParent();
  }
});
