Ext.define('APP.view.rd.quotes.chartTab',{
    extend:'Ext.tab.Panel',
	xtype:'rdQuotesChartTab',
	controller:'rd.quotes',
	plugins:[
		{ptype:'tabreorderer'}
	],
	userCls:'x-tabpanel',
	tabPosition:'top',
	tabPosition:'bottom',
	minTabWidth:128,
	defaults:{iconAlign:'left',textAlign:'center',closable:true},		
	dockedItems:[
		{xtype:'toolbar',dock:'top',userCls:'x-toolbar-trade',
			defaults:{uix:'icon',handler:'onChartMenuItemClick'},
			items:[
				{name:'type',iconCls:'f-mt mt-tree-diagram',tooltip:'柱状图',value:'ohlc'},
				{name:'type',iconCls:'f-mt mt-share',tooltip:'阴阳烛',value:'candlestick'},
				{name:'type',iconCls:'f-mt mt-figure-4',tooltip:'折线图',value:'line'},
				'-',
				//{name:'navigator',text:'N'},
				//{name:'volume',text:'S'},
				//'-',

				//{name:'askLine',text:'ASK'},
				//{name:'bidLine',text:'BID'},

				{name:'zoom',iconCls:'f-mt mt-action-creat',tooltip:'放大',value:1},
				{name:'zoom',iconCls:'f-mt mt-action-cancel',tooltip:'缩小',value:-1},
				'-',
				{name:'cycle',text:'M1',value:'M1',tooltip:'1 分钟'},
				{name:'cycle',text:'M5',value:'M5',tooltip:'5 分钟'},
				{name:'cycle',text:'M15',value:'M15',tooltip:'15 分钟'},
				{name:'cycle',text:'M30',value:'M30',tooltip:'30 分钟'},
				{name:'cycle',text:'H1',value:'H1',tooltip:'1 小时'},
				{name:'cycle',text:'H4',value:'H4',tooltip:'4 小时'},
				{name:'cycle',text:'D1',value:'D1',tooltip:'日线'},
				{name:'cycle',text:'W1',value:'W1',tooltip:'周线'},
				{name:'cycle',text:'WN',value:'WN',tooltip:'月线'},
				'->',
				{iconCls:'f-mt mt-creat',text:'新订单',ui:'blue',handler:'onChartAddOrder'}
			]
		}
	],
	
	listeners:{
		//render:'onChartTabRender',
		tabchange:'onChartTabChange'
	}
});



























