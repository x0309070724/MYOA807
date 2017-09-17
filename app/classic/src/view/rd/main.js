Ext.define('APP.view.rd.main', {
  extend: 'APP.view.main.layout',
  initComponent: function () {
    this.callParent();
    var me = this,
      tabpanel = me.down('tabpanel');
    var main = tabpanel.add({xtype: 'rdIndex', title: '<b>HOME</b>主页', iconCls: 'f-mt mt-home', closable: false});
    tabpanel.setActiveTab(main);


    if (window.Highcharts) {
      Highcharts.setOptions({
        //global:{timezoneOffset:-(Mate.getTimeZone()*60)},
        //global:{timezoneOffset:-(8*60)},
        global: {useUTC: false},
        credits: false,
        exporting: {enabled: false},
        //chart:{zoomType:"x"},
        scrollbar: {
          enabled: true,
          liveRedraw: false,
          height: 12,
          rifleColor: 'red',
          barBackgroundColor: '#f1f1f1',
          barBorderRadius: 0,
          barBorderWidth: 0,

          buttonArrowColor: 'red',
          buttonBackgroundColor: '#fafafa',
          buttonBorderWidth: 1,
          buttonBorderRadius: 0,

          trackBackgroundColor: '#fefefe',
          trackBorderWidth: 1,
          trackBorderRadius: 0,
          trackBorderColor: '#ccc'
        },
        //scrollbar:{enabled:false},
        //tooltip:false,
        lang: {
          rangeSelectorZoom: '',
          months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        colors: ['#000', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        plotOptions: {
          line: {lineWidth: 2},
          ohlc: {lineWidth: 2},
          candlestick: {lineWidth: 1, stickyTracking: true}
          //candlestick:{color:'#000',lineColor:'#000',upColor:'#fff',upLineColor:'#000'}
        },
        navigator: {enabled: true, margin: 3, bottom: 0, height: 80, outlineWidth: 1},
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%d/%m',
            week: '%d/%m',
            month: '%m/%Y',
            year: '%Y'
          },
          //tickPixelInterval:60,
          showLastLabel: true, showFirstLabel: true,
          gridLineWidth: 1,
          gridLineColor: '#eee',
          gridLineDashStyle: 'dash'
        },
        yAxis: {
          labels: {align: 'left', x: 3, style: {color: '#000'}},
          //tickPixelInterval:50,
          showLastLabel: true, showFirstLabel: true,
          gridLineWidth: 1,
          gridLineColor: '#eee',
          gridLineDashStyle: 'dash'
        }
      });
    }
  }
});

