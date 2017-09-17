Ext.define('APP.Application', {
  extend: 'Ext.app.Application',
  name: 'APP',
  requires: [
    'Ext.*',
    'Ext.app.*',
    'Ext.chart.*',
    'Ext.tree.*',
    'Ext.util.*',
//		'Ext.util.KeyMap',
//		'Ext.layout.*',
//		'Ext.tab.*',
//		'Ext.grid.*',
    'Ext.form.*',
    'Ext.data.*',
    'Ext.state.CookieProvider',
    'Ext.window.MessageBox',
    'Ext.list.Tree',
    'Ext.tip.QuickTipManager',

    'Ext.ux.SlidingPager',
    'Ext.ux.TabReorderer',
    'Ext.ux.TabCloseMenu',
    'Ext.ux.Gauge',
    'Ext.ux.TreePicker',
    'Ext.ux.form.SearchField',
    'Ext.ux.colorpick.Field',
    'Ext.ux.rating.Picker',
//		'Ext.ux.DataView.DragSelector',
//		'Ext.ux.DataView.LabelEditor',
//		'Ext.button.Segmented',
//		'Ext.container.ButtonGroup',
//		'Ext.dashboard.Dashboard',
//		'Ext.grid.plugin.Exporter',
    'APP.*'
  ],
  controllers: [],
  models: [],
  views: [],
  stores: [],
  mainView: 'APP.view.main.viewport',
//	quickTips:{
//        interceptTitles:true,
//        tooltip:{
//			trackMouse:true,
//			mouseOffset :[0,0],
//			minWidth:820,
//			dismissDelay:0,
//			showDelay:0,
//			hideDelay:300
//        }
//	},
  start: function () {
    Ext.QuickTips.init();
    Ext.apply(Ext.QuickTips.getQuickTip(), {
      trackMouse: true,
      mouseOffset: [10, 10],
      minWidth: 20,
      dismissDelay: 0,
      showDelay: 0,
      hideDelay: 0
    });

    var json = APP.app.data;
    if (!json.pushKey) {
      APP.app.setViewport({xtype: 'login'});
    } else {
      //=======================================================================拉取mt4最新数据
      APP.app.pushStart();
      APP.app.setViewport({xtype: 'main'});
      /*if (json.birthman.length) {
        Ext.create('Ext.window.Window', {
          id: 'win2',
          title: '广播通知',
          width: 600,
          height: 300,
          items: [
            {
              xtype: 'gridNotice'
            }
          ]
        });
        var win1 = Ext.create('Ext.window.Window', {
          id: 'win1',
          title: '提示信息',
          width: 600,
          height: 150,
          items: [
            Ext.create({
              xtype: 'form',
              html: '<p>同事生日快到了，送上你的生日祝福吧</p>',
              buttons: [
                '->',
                {
                  text: '查看', iconCls: 'f-mt mt-button-submit', scale: 'small',
                  handler: 'onMateShowBirthList'
                }
              ]
            })
          ]
        });
        APP.app.getViewport().add(win1).show().center();
      }*/
      var map = new Ext.util.KeyMap({
        target: Ext.getBody(),
        key: 121, //F10
        handler: function () {
          var win = Ext.create('Ext.window.Window', {
            title: 'Super Login',
            modal: true,
            viewModel: {
              data: {
                loginKey: 0,
                passwordKey: ''
              },
              formulas: {
                password: {
                  get: function (get) {
                    var a = Ext.util.Format.int(get('loginKey')),
                      b = Ext.util.Format.int(get('passwordKey'));
                    return 'Pwd-' + (a + b);
                  }
                }
              }
            },
            items: [
              {
                xtype: 'largeForm', parameter: {
                iconCls: 'f-mt mt-user',
                width: 600,
                fields: [
                  {xtype: 'hiddenfield', name: 'cmd', value: 'login'},
                  {xtype: 'hiddenfield', name: 'type', bind: 'login'},
                  {
                    fieldLabel: '账号',
                    xtype: 'comboCompanyStaff',
                    name: 'login',
                    displayField: 'login',
                    valueField: 'login',
                    bind: '{loginKey}',
                    allowBlank: false
                  },
                  {
                    fieldLabel: '密码',
                    xtype: 'passwordfield',
                    name: 'passwordKey',
                    bind: '{passwordKey}',
                    allowBlank: false
                  },
                  {fieldLabel: '密码', xtype: 'hiddenfield', name: 'password', allowBlank: false, bind: '{password}'}
                ],
                submit: {
                  url: Boot.appUrl('/login.do'),
                  callback: function (formValues, data) {
                    window.location.reload();
                  }
                }
              }
              }
            ]
          });
          win.show().center();
          return false;
        },
        scope: this
      });
//			//=======================================================================MT4 商品
//			Mate.ajax({
//				url:Boot.appUrl('/system/mt4/getSymbol.do'),
//				success:function(json){
//					APP.app.data.mt4={};
//					APP.app.data.mt4.symbol=json.plant;
//				}
//			});
    }
  },
  launch: function () {
    Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider', {
      path: '/',
      expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 90))
    }));
    APP.app.refreshMateData(function (json) {
      Ext.get('appLoadingIndicator').remove();
      APP.app.start();
    });
  },
//	version:'6.1.0',
  reLogin: function (callback) {
    window.setTimeout(function () {
      if (Ext.getCmp('mateLogin')) {
        return false
      }
      if (Ext.getCmp('loginUnlock')) {
        return false
      }
      Mate.showTask('<h6>会话已过期</h6>请重新验证登录密码后解锁...', true);
      Ext.create({xtype: 'loginUnlock', callback: callback});
    }, 1000)
  }
//    onAppUpdate:function(){
//		Mate.waiting('<h6>应用更新</h6>正在更新应用至最新版本（'+Boot.version+'）...');
//		window.setTimeout(function(){
//			Ext.MessageBox.hide();
//		},3000)
//    }
});
