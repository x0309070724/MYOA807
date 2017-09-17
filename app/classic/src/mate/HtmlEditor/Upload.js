Ext.define('APP.mate.HtmlEditor.Upload', {
  extend: 'Ext.util.Observable',
  alias: 'plugin.HtmlEditorUpload',
  init: function (view) {
    var scope = this;
    view.on('render', function () {
      scope.onRender(view);
    });
  },
  onRender: function (view) {
    var scope = this;
    console.log(view)
    view.getToolbar().add(
      {
        xtype: 'uploader',
        uploadConfig: {
          uploadUrl: escape('/action/uploadfile.jsp'),
          buttonImagePath: '/resources/icons/upload-image.png',
          buttonImageHoverPath: '/resources/icons/upload-image-hover.png'
        },
        listeners: {
          fileadded: function (source, file) {
          },
          uploadstart: function (source, file) {
          },
          uploadprogress: function (source, file) {
          },
          uploaddatacomplete: function (source, file) {
            var r = eval('(' + file.data + ')'),
              str = Ext.String.format(
                '<img src="{0}" alt=""/>',
                r.data.src
              );
            view.insertAtCursor(str);
            console.log(o);
            console.log(str);
          },
          queuedatacomplete: function (source, data) {
          },
          uploaderror: function (src, data) {
            var msg = 'ErrorType：' + data.errorType;
            Mate.error('图片上传失败：' + msg);
          }
        }
      }
    );
  }
});
