Ext.define('APP.view.main.viewportController', {
  extend: 'APP.view.controller',
  alias: 'controller.mainViewport',
  onFullScreen: function (button) {
    var el = document.documentElement;
    var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
    if (typeof rfs != 'undefined' && rfs) {
      rfs.call(el);
    } else if (typeof window.ActiveXObject != 'undefined') {
      var wscript = new ActiveXObject('WScript.Shell');
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
  },
  getRegionMenu: function (panel, tool) {
    var regionMenu = panel.regionMenu || (panel.regionMenu =
      Ext.widget({
        xtype: 'menu',
        items: [
          {
            text: 'West', glyph: '9668@', handler: function () {
            panel.setBorderRegion('west');
          }
          },
          {
            text: 'East', glyph: '9658@', handler: function () {
            panel.setBorderRegion('east');
          }
          }
        ]
      }));
    regionMenu.showBy(tool.el);
  },

  onMainInitialize: function (view) {
    var account = APP.app.getAppData('account'),
      meKeys = APP.app.getAppData('navigation');
    if (account.administrator) {
      var navRoot = oaNav.navigation;
    } else {
      var navRoot = [];
      Ext.Array.each(oaNav.navigation, function (root) {
        if (Ext.Array.indexOf(meKeys, root.id) !== -1) {
          var treeChildren = [];
          Ext.Array.each(root.children, function (tree) {
            if (Ext.Array.indexOf(meKeys, tree.id) !== -1) {
              var groupChildren = [];
              Ext.Array.each(tree.children, function (group) {
                if (Ext.Array.indexOf(meKeys, group.id) !== -1) {
                  var items = [];
                  Ext.Array.each(group.children, function (item) {
                    if (Ext.Array.indexOf(meKeys, item.id) !== -1) {
                      items.push(item)
                    }
                  })
                  groupChildren.push({id: group.id, text: group.text, expanded: group.expanded, children: items});
                }
              });
              treeChildren.push({id: tree.id, text: tree.text, iconCls: tree.iconCls, children: groupChildren});
            }
          });
          navRoot.push({id: root.id, text: root.text, view: root.view, children: treeChildren});
        }
      });
    }
    Ext.create('Ext.data.TreeStore', {
      storeId: 'nav',
      root: {expanded: true, children: navRoot}
    });
    this.setNavRoot();
  },
  //=========================================================================================初始化菜单
  setNavRoot: function (view) {
    var mainBody = this.lookup('mainBody');
    var mainNavRoot = this.lookup('mainNavRoot'),
      store = Ext.getStore('nav'),
      rootButtons = [],
      mainCards = [];
    if (!store.getCount()) {
      return false;
    }


    store.each(function (root, i) {
      //=======================================================顶部主菜单
      rootButtons.push({
        text: root.data.text,
        value: root.data.id,
        view: root.data.view,
        hidden: store.getCount() == 1
      });
    });
//		mainNavRoot.suspendLayouts();
    mainNavRoot.add(rootButtons);
//		mainNavRoot.resumeLayouts(true);

    window.setTimeout(function () {
      var currNavRoot = Ext.state.Manager.get('navRoot', 0),
        currButton = mainNavRoot.down('button[value=' + currNavRoot + ']') || mainNavRoot.down('button');
      currButton.setPressed(true);
    });
  },
  //=========================================================================================创建 左侧栏目菜单 TREE
  onSetMain: function (segmentedbutton, button, isPressed) {
    var mainBody = this.lookup('mainBody'),
      rootId = button.getValue(),
      main = Ext.getCmp('MAIN-' + rootId);

    if (!main) {
//			mainBody.suspendLayouts();
      //mainBody.setLoading(true);
      //mainBody.removeAll();
      main = mainBody.add(Ext.create('APP.view.' + button.view, {
        name: 'mainCard',
        id: 'MAIN-' + rootId,
        rootId: rootId
      }));
//			mainBody.setLoading(false);
//			mainBody.resumeLayouts(true);
    }
    mainBody.setActiveItem(main);
    Ext.state.Manager.set('navRoot', rootId);
    var currNode = main.query('treepanel')[Ext.state.Manager.get('navTree-' + rootId, 0)];
    if (currNode) {
      currNode.expand(false)
    }
  },
  onMainNavTreeRender: function (mainNavTree) {
    var mainCard = mainNavTree.up('[name=mainCard]'),
      store = Ext.getStore('nav');
    //console.log('onMainNavTreeRender')
    //=======================================================左侧TREE菜单
    var root = store.getById(mainCard.rootId),
      treePanels = [];
    Ext.Array.each(root.childNodes, function (node, i) {
      var treeRoot = {children: []};
      Ext.Array.each(node.data.children, function (group, i) {
        treeRoot.children.push({
          id: group.id,
          iconCls: 'f-mt mt-tree-2',
          text: group.text,
          children: group.children,
          expanded: group.expanded
        });
      });
      var tree = Ext.create('Ext.tree.Panel', {
        border: false,
        autoScroll: true,
        animate: false,
        useArrows: true,
        rootVisible: false,
        collapsible: false,
        store: {type: 'tree', root: treeRoot},
        title: node.data.text,
        iconCls: node.data.iconCls,
        index: i,
        listeners: {
          itemclick: 'onNavigationTreeSelectionChange',
          expand: function (panel, eOpts) {
            Ext.state.Manager.set('navTree-' + root.data.id, panel.index);
          }
        }
      });
      treePanels.push(tree);
    });
//		mainNavTree.suspendLayouts();
    mainNavTree.add({xtype: 'panel', border: false, layout: {type: 'accordion', animate: false}, items: treePanels});
//		mainNavTree.resumeLayouts(true);
  },


  onToggleNavigationSize: function () {
    var mainBody = this.lookup('mainBody'),
      mainCard = mainBody.getLayout().getActiveItem(),
      mainNavTree = mainCard.down('panel');
    //console.log(mainCard)
    mainNavTree.setHidden(mainNavTree.isHidden() ? false : true)
  },

  onNavigationTreeSelectionChange: function (view, record) {
    if (!record.data.view) {
      return false;
    }

    var mainCard = view.up('[name=mainCard]'),
      mainCardTab = mainCard.down('[name=mainTab]'),
      viewId = 'APP-' + record.data.id;

    if (Ext.getCmp(viewId)) {
      mainCardTab.setActiveTab(viewId);
      return false;
    }

    switch (record.data.type) {
      case 'link': {
        Mate.openWin(record.data.view);
      }
        ;
        break;
      case 'window': {
        Ext.create('Ext.window.Window', {
          id: viewId,
          title: record.data.text,
          //iconCls:record.data.iconCls,
          autoShow: true,
          maximizable: true,
          items: [
            Ext.create('APP.view.' + record.data.view)
          ]
        });
      }
        ;
        break;
      default: {
        //console.log(record)
        //console.log(record.parentNode.data.text)
        var viewSrc = 'APP.view.' + record.data.view,
          //titleTip=Ext.String.format('<b>{0}</b><br/>{1}-{2}',view.up('treepanel').title.replace(' ',''),record.parentNode.data.text,record.data.text),
          title = Ext.String.format('<b>{0}</b>{1}', record.parentNode.data.text, record.data.text)
        iconCls = 'f-mt mt-window';
        //,tooltip:titleTip
        //mainCardTab.suspendLayouts();
        mainCardTab.add(Ext.create(viewSrc, {
          id: viewId,
          itemId: viewId,
          title: title,
          iconCls: iconCls,
          closable: true
        }));
        mainCardTab.setActiveTab(viewId);
        //mainCardTab.resumeLayouts(true);
        if (mainCardTab.items.items.length > 5) {
          mainCardTab.items.items[1].destroy();
        }
      }
        ;
        break;
    }
  },


  //====================================================================================================================================================================================登录
  //================================================登录 回车键
  onLoginFormEnterSubmit: function (e, field) {
    var form = field.up('form'),
      button = form.down('submitbutton');
    this.onLoginFormSubmit(button);
  },
  //================================================登录
  onLoginFormSubmit: function (button) {
    var buttonText = button.getText(),
      formPanel = button.up('form'),
      loginViewport = formPanel.up('viewport');

    if (formPanel.getForm().isValid()) {
      button.setDisabled(true).setText('正在验证...');
      //===================记住我
      var rememberme = formPanel.down('field[name=rememberme]').getValue();
      if (rememberme) {
        var loginData = {
          type: formPanel.down('field[name=type]').getValue(),
          login: formPanel.down('field[name=login]').getValue(),
          //mobile:formPanel.down('field[name=mobile]').getValue(),
          rememberme: rememberme
        }
        Mate.updateCache('loginData', loginData);
      } else {
        Mate.removeCache('loginData');
      }
      Mate.ajax({
        url: Boot.appUrl('/login.do'),
        params: formPanel.getValues(),
        success: function (json, options) {
          if (formPanel.up('loginUnlock')) {
            Ext.MessageBox.hide();
            Mate.showTask('操作成功：已完成系统解锁...')
            var unlock = formPanel.up('loginUnlock');
            unlock.destroy();
            return unlock.callback ? unlock.callback.call(this) : false
          } else {
            window.location.reload();
          }
        },
        failure: function (errors, opts) {
          button.setDisabled(false).setText(buttonText);
        }
      });
    }
  },

  //==============================================更新
  onUpgradeClick: function (button) {
    Mate.confirm('<h6>确定要更新系统数据？</h6>确认后，系统将从原CRM拉取数据...',
      function (button) {
        if (button == 'yes') {
          Mate.waiting('<h6>正在更新系统数据</h6>请等待指令执行完成...');
          Mate.ajax({
            url: Boot.appUrl('/upgrade.do'),
            success: function (data, opts) {
              Ext.MessageBox.hide();
              Mate.showTask('已完成系统数据更新...');
            },
            failure: function (data) {
              Ext.MessageBox.hide();
              Mate.showTask(data.message, true);
            }
          });
        }
      }
    );
  },
  //==============================================退出系统
  onLogoutClick: function (button) {
    Mate.confirm('<h6>确定要退出系统？</h6>退出后，将清空当前登录用户的缓存信息并返回至登录界面...',
      function (button) {
        if (button == 'yes') {
          APP.app.getViewport().mask('Exiting...');
          //Mate.waiting('<h6>正在安全退出系统</h6>请等待指令执行完成...');
          Mate.ajax({
            url: Boot.appUrl('/outLogin.do'),
            success: function (data, opts) {
              APP.app.getViewport().unmask();
              window.location.reload();
            },
            failure: function (data, opts) {
              APP.app.getViewport().unmask();
              Mate.showTask(data.message, true);
            }
          });
        }
      }
    );
  },

  //============================================================================显示祝福好友详细对话框
  onShowDetailDialog: function (grid, rowIndex, colIndex, item, e, record, row) {
    var json=APP.app.data;
    // console.log(record)
    var win = Ext.create('Ext.window.Window', {
      id: 'win',
      title: '好友生日祝福',
      width: 600,
      height: 300,
      viewModel: {data: {namecn: record.data.namecn}},
      items: [
        {
          xtype: 'sendBirForm',
          listeners:{afterrender:function(formPanel){
            formPanel.getReferences()._con.focus();
          }},
          buttons: [
            '->',
            {
              text: '发送生日祝福', iconCls: 'f-mt mt-button-submit', scale: 'small',
              handler: 'onMateFormSubmit',
              mateParameters: {
                url: Boot.appUrl('/tool/sendBroad.do?'),
                params: {
                  // sendby: 456,
                  // staffid: '552',
                  sendby: json.account.id,
                  staffid: record.data.id,
                  is_rich: 1
                },
                callback: function (formValues, data) {
                }
              }
            },
            {text: '关闭', iconCls: 'f-mt mt-button-cancel', scale: 'small', handler: 'onMateWindowDestroy'}
          ]
        }
      ]
    });
    this.getView().add(win).show().center();
  },

  //============================================================================显示祝福好友详细对话框(向多个好友发送)
  onShowDetailDialogMultiply:function(button){
    var json=APP.app.data;
    var keys = [],
      staffid = '',
      namecnAll='',
      grid=button.up('grid'),
      records=grid.getView().getSelectionModel().getSelection();
    Ext.Array.each(records,function(record){
      keys.push(record.data.id);
      staffid += record.data.id+',';
      namecnAll+=record.data.namecn+';';
    });
    staffid = staffid.substring(0,staffid.length-1);
    if(!keys.length){return false;}

    var win = Ext.create('Ext.window.Window', {
      id: 'win',
      title: '好友生日祝福',
      width: 600,
      height: 300,
      viewModel: {data: {namecn: namecnAll}},
      items: [
        {
          xtype: 'sendBirForm',
          buttons: [
            '->',
            {
              text: '发送生日祝福', iconCls: 'f-mt mt-button-submit', scale: 'small',
              handler: 'onMateFormSubmit',
              mateParameters: {
                url: Boot.appUrl('/tool/sendBroad.do?'),
                params: {
                  sendby: json.account.id,
                  staffid: staffid,
                  is_rich: 1
                },
                callback: function (formValues, data) {
                }
              }
            },
            {text: '关闭', iconCls: 'f-mt mt-button-cancel', scale: 'small', handler: 'onMateWindowDestroy'}
          ]
        }
      ]
    });
    this.getView().add(win).show().center();
  }
});
