Ext.define('APP.mate.field.uploadImage', {
  //extend:'Ext.form.Panel',
  extend: 'Ext.Container',
  alias: 'widget.uploadimagefield',
  xtype: 'uploadimagefield',
  viewModel: true,
  border: false,
  frame: false,
  cls: 'x-ui-upload-image',
  bodyPadding: 0,
  autoScroll: false,
  //referenceHolder:true,
  config: {
    mateParameters: {title: '副本', name: 'image', height: 120, demoUrl: false, api: '', readOnly: false}
  },
  listeners: {
    afterrender: function (widget, eOpts) {
      var me = this,
        buttonPanel = widget.down('container'),
        field = buttonPanel.down('filefield'),
        valField = widget.down('hiddenfield');
      if (!field.validate()) {
        Mate.showTask('<h6>文件类型错误</h6>仅限上传 图片格式文件', true);
        return false;
      }
      field.getEl().on('change', function (e) {
        var file = e.target.files[0],
          objUrl = Ext.getObjectURL(file);
        Ext.renderSVG(file, 800, 800, function (base64) {
          //img.setSrc(base64);
          me.setUserCls('x-uploading');
          var base64Str = base64.replace('data:' + file.type + ';base64,', '');
          Ext.Ajax.request({
            method: 'POST',
            url: Boot.appUrl('/upload.do'),
            params: {
              cmd: 'image',
              upload: 'base64',
              type: file.type,
              name: file.name,
              base64: base64Str,
              api: me.mateParameters.api
            },
            timeout: 300 * 1000,
            success: function (response, opts) {
              var data = Ext.decode(response.responseText);
              me.setUserCls(false);
              if (data.success) {
                valField.setValue(data.src);
                buttonPanel.setUserCls('x-hasValue');
                Mate.showTask('<h6>上传成功</h6>文件名称：' + file.name);
                if (me.mateParameters.callback) {
                  return me.mateParameters.callback(me, data)
                }
              } else {
                valField.setValue('');
                Mate.showTask(data.message, true);
              }
              field.reset();
            },
            failure: function (response, options) {
              me.setUserCls(false);
              valField.setValue('');
              Mate.showTask('<h6>上传失败</h6>文件名称：' + file.name, true);
              field.reset();
            }
          });
        });
      });

    }
  },
  initComponent: function () {
    var me = this,
      formModel = this.up('form').getViewModel(),
      formData = formModel ? formModel.getData().form || {} : {},
      hideButton = me.mateParameters.readOnly ? true : formData.audit;
    Ext.apply(this, {
      items: [
        {
          xtype: 'hiddenfield',
          name: me.mateParameters.name,
          reference: 'image',
          publishes: 'value',
          allowBlank: true,
          listeners: {change: me.onSetValue}
        },
        {
          xtype: 'box',
          userCls: 'x-ui-processing x-ui-mini',
          html: '<span></span><span></span><span></span>',
          hidden: true
        },
        {
          xtype: 'container', cls: 'x-ui-image', height: me.mateParameters.height,
          items: [
            {
              xtype: 'image',
              bind: {src: '{image.value:oss}'}, /*height:me.mateParameters.height-6,*/
              alt: me.mateParameters.title
            },
            {
              xtype: 'container', ui: 'upload', width: 130,
              items: [
                {
                  xtype: 'filefield',
                  ui: 'upload',
                  margin: 0,
                  padding: 0,
                  buttonOnly: true,
                  hideLabel: true,
                  vtype: 'image',
                  name: 'file',
                  allowBlank: true,
                  width: 60,
                  hidden: hideButton,
                  buttonConfig: {width: 60, iconCls: 'f-mt mt-plus'}
                  //listeners:{change:me.onUpload}
                },
                {
                  xtype: 'button',
                  ui: 'preview',
                  width: 60,
                  iconCls: 'f-mt mt-search-2',
                  margin: '0 0 0 10',
                  handler: me.onDetailClick
                }
              ]
            }
          ]
        }
      ]
    });
    this.callParent();
  },
  onSetValue: function (field, value) {
    var me = field.up('uploadimagefield'),
      buttonPanel = me.down('container[ui=upload]');
    buttonPanel.setUserCls(value != '' ? 'x-hasValue' : '');
//		window.setTimeout(function(){
//			var img=me.down('image').getEl().dom
//			console.log(img)
//			console.log(img.clientWidth,img.clientHeight)
//		},500)
  },
  onDetailClick: function (button) {
    var me = button.up('uploadimagefield'),
      src = me.down('hiddenfield').getValue(),
      winid = Mate.getWinId(this, me.getId());
    if (Ext.get(winid)) {
      Ext.getCmp(winid).show();
      return false
    }
    ;
    if (src == '') {
      Mate.showTask('<h6>不存在图片</h6>先上传图片后再查看');
      return false
    }
    var win = Ext.create('Ext.window.Window', {
      id: winid,
      iconCls: 'f-mt mt-window',
      title: '预览',
      //bodyPadding:1,
      minWidth: 680,
      minHeight: 400,
      //maxWidth:800,
      //maxHeight:800,
      border: true,
      maximizable: false,
      autoShow: true,
      data: {src: Ext.util.Format.oss(src)},
      tpl: [
        '<div class="x-ui-image-box">',
        '<img src="{src}" alt=""/>',
        '</div>'
      ]
    });
    win.setPosition(false, 0).animate({to: {y: 50}});
    win.show();
  }
});

















