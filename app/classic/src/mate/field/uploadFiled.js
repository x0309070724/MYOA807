Ext.define('APP.mate.field.uploadField', {
  extend: 'Ext.Container',
  /** the difference between alias and xtype?
   *  简单地说，xtype是存在于widget命名空间下的alias。如果为一个新的UI组成声明了它的xtype，那么就等于在widget命名空间下为其声明了
   *  一个alias。
   *  xtype性能更高，alias范围更广。参考http://www.cnblogs.com/loveis715/p/4423502.html
   */
  alias: 'widget.uploadField',
  xtype: 'uploadField',
  viewModel: true,
  fileUpload: true,
  // The default Ext.Component of child Components to create in this Container when a child item is specified as a raw
  // configuration object, rather than as an instantiated Component.
  defaultType: 'textfield',
  items: [{
    xtype: 'textfield',
    name: 'url',
    inputType: 'file',
    allowBlank: false,
    width: '100%'
  }]
});
