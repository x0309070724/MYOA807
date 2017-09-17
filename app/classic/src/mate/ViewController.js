Ext.define('APP.mate.ViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mate',
  //===================================================================================================================================================全局事件
  //===================================================================================================================================================全局事件
  onMateFieldValidate: function (field) {
    field.next().validate();
  },
  onMateWindowDestroy: function (button) {
    button.up('window').hide().destroy();
  },
  onMateWindowHide: function (button) {
    button.up('window').hide();
  },
  //==========================================GRID 重载数据
  onMateFindGrid: function (button) {
    if (button) {
      var view = this.getView(),
        grid = button.up('grid');
      if (!grid) {
        var grid = view.down('grid');
      }
    } else {
      var view = this.getView();
      if (view.isXType('grid')) {
        var grid = view;
      } else {
        var grid = view.down('grid');
      }
    }
    return grid || false;
  },
//	onMateStoreRefresh:function(button){
//		var grid=this.onMateFindGrid(button),
//			store=grid.getStore();
//		store.loadPage(1);
//		//Ext.getStore(store).loadPage(1);
//	},

  onMateSearchRecord: function (e, field) {
    var grid = field.up('grid').getView(),
      store = grid.getStore(),
      record = store.getById(field.getValue());
    grid.setSelection(false);
    if (record) {
      //console.log(true,record)
      //grid.getView().select(record);
      grid.setSelection(record);
    }
  },


  onMateFormReset: function (button) {
    button.up('form').reset();
  },
  onMateExportToExcel: function (button) {
    var grid = this.onMateFindGrid(button),
      store = grid.getStore(),
      //model=store.getModel(),
      title = grid.getTitle().replace('<br/>', ' ');
    grid.saveDocumentAs({
      type: 'excel',
      author: 'MT4 MATE',
      charset: 'UTF-8',
      showSummary: true,
      title: title,
      fileName: title + ' ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xls'
    });
  },


  //===================================================================================================左表格数据 双击单条右移
  onMateGridRecordToRight: function (view, record) {
    var waitGrid = this.lookup('waitGrid'),
      beingGrid = this.lookup('beingGrid');

    waitGrid.getStore().remove(record);
    beingGrid.getStore().add(record);
    waitGrid.getView().refresh();
    beingGrid.getView().refresh();
  },
  //===================================================================================================右表格数据 双击单条左移
  onMateGridRecordToLeft: function (view, record) {
    var waitGrid = this.lookup('waitGrid'),
      beingGrid = this.lookup('beingGrid');

    beingGrid.getStore().remove(record);
    waitGrid.getStore().add(record);
    waitGrid.getView().refresh();
    beingGrid.getView().refresh();
  },

  //===================================================================================================左表格数据 右移
  onMateGridRecordBatchToRight: function (button) {
    var waitGrid = this.lookup('waitGrid'),
      beingGrid = this.lookup('beingGrid');
    records = waitGrid.view.getSelectionModel().getSelection();

    waitGrid.getStore().remove(records);
    beingGrid.getStore().add(records);
    waitGrid.getView().refresh();
    beingGrid.getView().refresh();
//			Ext.each(records,function(record){beingStore.add(record)});
//			beingGrid.view.getFeature(0).expandAll();
  },
  //===================================================================================================右表格数据 左移
  onMateGridRecordBatchToLeft: function (button) {
    var waitGrid = this.lookup('waitGrid'),
      beingGrid = this.lookup('beingGrid'),
      records = beingGrid.getView().getSelectionModel().getSelection();

    beingGrid.getStore().remove(records);
    waitGrid.getStore().add(records);

    waitGrid.getView().refresh();
    beingGrid.getView().refresh();
//			Ext.each(records,function(record){waitStore.add(record)});
//			waitGrid.view.getFeature(0).expandAll();
  },

  //==========================================GRID 行选择 激活BUTTON
  onMateGridShowActionButton: function (model, records) {
    //if(records.length||records.length==0){
    var grid = this.getView();
    Ext.each(grid.query('button[selection=true]'), function () {
      this.setDisabled(records.length === 0);
    })
    //}
  },
  //==========================================GRID 右键菜单
  //onMateGridShowRightMenu:function(gridView,record,item,index,e,eOpts){
  onMateGridShowRightMenu: function (gridView, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    var grid = gridView.up('grid'),
      actionColumn = grid.down('actioncolumn'),
      actionButton = grid.down('toolbar').query('> button'),
      controller = this.getView().getController(),
      arrMenu = [];
    if (actionButton) {
      Ext.Array.each(actionButton, function (button) {
        arrMenu.push({
          scope: this,
          iconCls: button.iconCls,
          text: button.text || button.tooltip,
          mateWidget: button.mateWidget || false,
          mateParameters: button.mateParameters || false,
          //handler:button.handler
          handler: function () {
            controller[button.handler](this)
          }
        });
      });
    }
    if (actionColumn) {
      arrMenu.push({xtype: 'menuseparator'});
      Ext.Array.each(actionColumn.items, function (column) {
        arrMenu.push({
          scope: controller,
          iconCls: column.iconCls,
          text: column.tooltip,
          handler: function () {
            controller[column.handler](gridView, rowIndex)
          }
        });
      });
    }
    arrMenu.push({xtype: 'menuseparator'});
    arrMenu.push({scope: this, iconCls: 'f-mt mt-drive', text: '复制文本', name: 'clip'});

    //if(arrMenu.length){
    var rightMenu = gridView.rightMenu || (gridView.rightMenu =
      Ext.widget({
          xtype: 'menu',
          items: arrMenu
        }
      ));
    e.preventDefault();
    rightMenu.showAt(e.getXY());

    //ZeroClipboard.config({swfPath:'//cdn.bootcss.com/zeroclipboard/2.2.0/ZeroClipboard.swf'});
    var clip = new ZeroClipboard(document.getElementById(rightMenu.down('[name=clip]').getId()));
    clip.on('copy', function (e) {
      //e.clipboardData.clearData();
      e.clipboardData.setData('text/plain', td.innerText);
    });
    //}
  },

  //==========================================模块调用 WINDOW
  onMateWidgetShow: function (button) {
    if (button.mateAnimate) {
      //Ext.widget(button.mateWidget,button.mateParameters).setPosition(false,0).animate({to:{y:200}});
      Ext.widget(button.mateWidget, {viewModel: {data: button.mateParameters}}).setPosition(false, 0).animate({to: {y: 200}});
    } else {
      Ext.widget(button.mateWidget, {viewModel: {data: button.mateParameters}});
    }
  },

  //==========================================子菜单 重载数据源
  onMateMenuReloadStore: function (menu, item) {
    if (item) {
      menu.items.each(function (item) {
        item.removeCls('x-menu-item-selected');
      });
      item.addCls('x-menu-item-selected');
      var store = menu.up('container').up('container').down('grid').getStore();
      Ext.apply(store.proxy.extraParams, item.params);
      store.reload();
    }
    return false;
  },


  //===========================================================================================加载表单数据 后端
  onMateFormLoadData: function (formPanel) {
    var parameters = formPanel.mateParameters;
    formPanel.setLoading(true);
    Mate.ajax({
      url: parameters.url,
      params: parameters.params || {},
      success: function (data) {
        formPanel.setLoading(false);
        if (formPanel.getViewModel()) {
          formPanel.getViewModel().setData(data.plant[0])
        }
        formPanel.getForm().setValues(data.plant[0]);
        return parameters.callback ? parameters.callback(formPanel, data.plant[0]) : false;
      },
      failure: function (data) {
        formPanel.setLoading(false);
        Mate.showTask('未找到有效数据...');
      }
    });
  },
  //===========================================================================================提交表单数据
  onMateFormSubmit: function (button) {
    var formPanel = button.up('form'),
      parameters = button.mateParameters;
    if (formPanel.getForm().isValid()) {
      formPanel.mask('Processing...');
      var params = parameters.params || {},
        formValues = formPanel.getForm().getValues();
      Ext.apply(params, formValues);
      Mate.ajax({
        url: parameters.url,
        params: params,
        success: function (data) {
          formPanel.unmask();
          Mate.showTask(Mate.settings.successMessage);
          formPanel.up('window').hide().destroy();
          return parameters.callback ? parameters.callback(formValues, data) : false;
        },
        failure: function (data) {
          formPanel.unmask();
        }
      });
    }
  },

  //===========================================================================================显示好友生日列表
  onMateShowBirthList: function (button) {
    button.up('#win1').hide().destroy();
    var win2 = Ext.ComponentQuery.query("#win2")[0];
    APP.app.getViewport().add(win2).show().center();
  },
  //=========================================================================================================================CHART 公用


  //========================================================================================================================================GRID 切换字段 关联CHART
  onMateGridReconfigure: function (segmented, value) {
    if (value == null) {
      return false
    }
    ;
    var me = this,
      grid = this.onMateFindGrid(),
      store = grid.getStore(),
      chartSegmented = this.lookup('chartSwitchButtons');

    function reconfigure() {
      //grid.reconfigure(grid.config.columns[value]);
      if (chartSegmented) {
        var config = chartSegmented.config[value];
        if (config) {
          chartSegmented.removeAll();
          config.items[config.checked].pressed = true;
          chartSegmented.add(config.items);
          chartSegmented.fireEvent('change', chartSegmented, [config.checked], [0]);
        }
      }
    };
    store.removeAll();
    grid.reconfigure(grid.config.columns[value]);

    Ext.apply(store.proxy.extraParams, {field: value});
    store.load({
      scope: this,
      callback: function (records, operation, success) {
        reconfigure();
      }
    });
  },

  //========================================================================================================================================CHART 字段切换
  onMateChartFieldsSwitch: function (segmented, value) {
    if (value == null) {
      return false
    }
    ;
    var view = this.getView(),
      grid = view.down('grid'),
      store = grid.getStore(),
      sorter = store.getSorters().items[0] || {},
      button = segmented.items.items[value];

    //=========================================构造CHART DATA
    var data = [], dataPlus = [], dataLess = [];
    var tempStore = Ext.create('Ext.data.Store', {data: store.getData().items}),
      plusValue = 0,
      plusOtherValue = 0,
      lessValue = 0,
      lessOtherValue = 0;

    tempStore.sort({property: button.field, direction: 'DESC'});
    tempStore.each(function (record) {
      var value = record.get(button.field);
      if (value > 0) {
        plusValue = plusValue + value
      }
      if (value < 0) {
        lessValue = lessValue + value
      }
    });
    tempStore.each(function (record) {
      var value = record.get(button.field),
        plusRate = (value / plusValue) * 100;
      lessRate = (value / lessValue) * 100;
      if (value > 0) {
        if (plusRate >= 1) {
          dataPlus.push({
            id: record.get('objects'),
            title: button.text,
            objects: record.get('objects'),
            value: value,
            rate: plusRate
          })
        } else {
          plusOtherValue = plusOtherValue + value;
        }
      }
      if (value < 0) {
        if (lessRate >= 1) {
          dataLess.push({
            id: record.get('objects'),
            title: button.text,
            objects: record.get('objects'),
            value: value,
            rate: lessRate
          })
        } else {
          lessOtherValue = lessOtherValue + value;
        }
      }
    });
    if (plusOtherValue > 0) {
      dataPlus.push({
        id: 'OTHER',
        title: button.text,
        objects: 'OTHER',
        value: plusOtherValue,
        rate: (plusOtherValue / plusValue) * 100
      })
    }
    if (lessOtherValue < 0) {
      dataLess.push({
        id: 'OTHER',
        title: button.text,
        objects: 'OTHER',
        value: lessOtherValue,
        rate: (lessOtherValue / lessValue) * 100
      })
    }
//		tempStore.sort({property:button.field,direction:'ASC'})
//		tempStore.each(function(record){
//			if(record.get(button.field)<0&&dataLess.length<10){
//				dataLess.push(itemData(record))
//			}
//		});
    tempStore.destroy();


    if (sorter.getProperty() == 'objects') {
      store.sort({property: 'objects', direction: 'ASC'})
    } else {
      store.sort({property: button.field, direction: 'DESC'})
    }
    store.each(function (record) {
      //totalValue=tempStore.sum(button.field),
      var item = {
        id: record.get('objects'),
        title: button.text,
        objects: record.get('objects'),
        value: record.get(button.field)
      };
      if (record.get(button.field) != 0 && data.length <= 50) {
        data.push(item)
      }
    });

    //=======================================处理CHART DATA
    Ext.Array.each(view.query('cartesian,polar'), function (chart) {
      if (chart.name == 'pie') {
        if (dataPlus.length && dataLess.length) {
          var series = [
            {
              type: 'pie',
              donut: 20,
              label: {display: 'inside', color: '#fafafa'},
              radiusFactor: 70,
              store: {data: dataPlus}
            },
            {type: 'pie', donut: 80, label: {display: 'outside'}, store: {data: dataLess}}
          ]
        } else {
          var seriesData = dataPlus.length ? dataPlus : dataLess;
          var series = [
            {type: 'pie', donut: 20, label: {display: 'outside'}, store: {data: seriesData}}
          ]
        }
        chart.setSeries(series);
        chart.setCenter(false);
      } else {
        chart.setStore({data: data})
      }
      Ext.Array.each(chart.getSeries(), function (series) {
        switch (series.type) {
          case 'pie3d':
          case 'pie': {
//						series.setAngleField(button.field);
          }
            break;
          default: {
            chart.getAxes()[chart.flipXY ? 1 : 0].setTitle({
              type: 'text',
              text: button.title || button.text,
              fontSize: 28,
              fillStyle: '#333'
            });
          }
            break;
        }
      });
    });
  },
  //========================================================================================================================================GRID SORT TO CHART
  onMateGridChartSortChange: function (ct, column, direction, eOpts) {
    if (column.dataIndex) {
      var view = this.getView(),
        grid = column.up('grid'),
        store = grid.getStore(),
        chartSegmented = this.lookup('chartSwitchButtons'),
        button = chartSegmented.down('[field=' + column.dataIndex + ']');
      if (button) {
        //console.log('SortChange')
        if (!button.pressed) {
          button.setPressed(true);
        }
      }
      Ext.Array.each(view.query('cartesian,polar'), function (chart) {
        chart.getStore().sort({property: column.dataIndex == 'objects' ? 'objects' : 'value', direction: direction})
      });
    }
  },
  //========================================================================================================================================GRID TO CHART 高亮
  onMateGridChartSelectionChange: function (model, records) {
    if (records.length) {
      var view = this.getView(),
        cartesian = view.down('cartesian'),
        polar = view.down('polar'),
        record = records[0];
      //console.log(cartesian)
      //console.log(cartesian.getStore().indexOf(records[0]),records[0])
      if (cartesian) {
        var store = cartesian.getStore(),
          index = store.indexOf(store.findRecord('objects', record.data.objects)),
          item = cartesian.getSeries()[0].getItemByIndex(index);
        cartesian.setHighlightItem(item);
      }
//			if(polar){
//				var store=polar.getStore(),
//					index=store.indexOf(store.getById(record.data.id)),
//					item=polar.getSeries()[0].getItemByIndex(index);
//					console.log(store,index,item)
//				polar.setHighlightItem(index);
//			}
    }
  },
  //========================================================================================================================================CHART TO GRID 高亮
  onMateGridChartItemHighlight: function (chart, item) {
    if (item && item.record) {
      var grid = this.getView().down('grid').getView(),
        store = grid.getStore(),
        record = store.findRecord('objects', item.record.data.objects);
      grid.getSelectionModel().select(record);
      //rowIndex=store.indexOf(record);
      //grid.scrollTo(rowIndex - 1, true);
      //console.log(grid.getStore().getData(),record)
      //rowIndex=store.indexOf(record);
      //grid.setSelection(record);
      //grid.scrollTo(0,rowIndex*30);
    }
  },
  //========================================================================================================================================CHART 视图切换
  onMateChartSwitch: function (segmented, value) {
    if (value == null) {
      return false
    }
    ;
    var chartView = this.lookup('chartView');
    //console.log(segmented.up('panel').items.items)
    Ext.Array.each(chartView.items.items, function (chart) {
      chart.setHidden(chart.name != value);
    });
  },
  //========================================================================================================================================CHART 切换风格
  onMateChartThemeSwitch: function (button) {
    var view = this.getView(),
      themes = Ext.chart.theme,
      themeNames = [],
      currentIndex = 0,
      name;

    Ext.Array.each(view.query('cartesian,polar'), function (chart) {
      var currentThemeClass = Ext.getClassName(chart.getTheme());
      for (name in themes) {
        if (Ext.getClassName(themes[name]) === currentThemeClass) {
          currentIndex = themeNames.length;
        }
        if (name !== 'Base' && name.indexOf('Gradients') < 0) {
          themeNames.push(name);
        }
      }
      chart.setTheme(themes[themeNames[++currentIndex % themeNames.length]]);
      //chart.redraw();
    });
  },
  //========================================================================================================================================CHART 预览
  onMateChartPreview: function (button) {
    var chartView = this.lookup('chartView');
    Ext.Array.each(chartView.query('cartesian,polar'), function (chart) {
      if (chart.isVisible()) {
        chart.preview();
        return false;
      }
    });

  },

  //========================================================================================================================================CHART 预览
  onMateChangeView: function (segmented, value, oldValue) {
    var view = this.getView(),
      items = segmented.items.items,
      button = items[value];
//		if(view.items[0]){
//			view.items[0].destroy();
//			console.log(view.items[0].getReferences())
//		}
    view.removeAll(true);
    view.add(Ext.create('APP.view.' + button.widget));
  }
});
