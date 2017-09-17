Ext.define('APP.view.rd.quotes.controller',{
    extend:'APP.view.controller',
	alias:'controller.rd.quotes',	



	
	//============================================================================================================================================================CHART TAB
	//========================================================================Render
//	onChartTabRender:function(chartTab){
//		var chartViews=[];
//		var chartId='XAUUSD-PANEL',
//			chartView={xtype:'rdQuotesChart',id:chartId,title:'XAUUSD',closable:true,viewParameter:{symbol:'XAUUSD'}};
//		chartViews.push(chartView);
//		chartTab.add(chartViews);
//		chartTab.setActiveItem(0);
//	},
	//========================================================================Chart Change
	onChartTabChange:function(chartTab,view,oldCard){
		var grid=chartTab.prev('grid').getView(),
			store=grid.getStore(),
			viewParameter=view.getViewModel().getData(),
			record=store.getById(viewParameter.symbol),
			rowIndex=store.indexOf(record);
		//grid.select(record)
		//grid.scrollTo(0,rowIndex*34);
		//=================================================Chart Right Ment
		
		var dom=Ext.getDom(view.getId())
			xAxis=view.chart.xAxis[0],
			yAxis=view.chart.xAxis[1];
		dom.onmousewheel=function(e){ 
			var min=xAxis.min,
				max=xAxis.max,
				time=60*1000;
			if(e.deltaY>0){
				min=min-(xAxis.len*.05*time)
				max=max+(xAxis.len*.05*time)
			}else{
				min=min+(xAxis.len*.05*time)
				max=max-(xAxis.len*.05*time)
			}
			min=min>xAxis.dataMin?min:xAxis.dataMin;
			max=max<xAxis.dataMax?max:xAxis.dataMax;
			//console.log(xAxis,min,max)
			xAxis.setExtremes(Math.ceil(min),Math.ceil(max));
			//yAxis.setExtremes(Math.ceil(min),Math.ceil(max));
		};


		Ext.get(view.getId()).on('contextmenu',function(e,t,eOpts){
			//if(e.item){return false;}
			var rightMenu=chartTab.rightMenu||(chartTab.rightMenu=
				Ext.widget({
					xtype:'menu',
					minWidth:200,
					defaults:{scope:this,handler:'onChartMenuItemClick'},
					items:[
						//{text:'显示导航',name:'navigator',iconCls:'f-mt mt-figure-6'},
						//{text:'显示成交量',name:'volume',iconCls:'f-mt mt-share'},
						
						//{xtype:'menuseparator'},
						{text:'柱状图',name:'type',iconCls:'f-mt mt-tree-diagram',value:'ohlc'},
						{text:'阴阳烛',name:'type',iconCls:'f-mt mt-share',value:'candlestick'},
						{text:'折线图',name:'type',iconCls:'f-mt mt-figure-4',value:'line'},

						{xtype:'menuseparator'},
						{text:'周期性',name:'xxx',iconCls:'f-mt mt-outline-right',menu:{
							minWidth:150,
							defaults:{scope:this,name:'cycle',handler:'onChartMenuItemClick'},
							items:[
								{text:'1 分钟',value:'M1'},
								{text:'5 分钟',value:'M5'},
								{text:'15 分钟',value:'M15'},
								{text:'30 分钟',value:'M30'},
								{text:'1 小时',value:'H1'},
								{text:'4 小时',value:'H4'},
								{text:'日线',value:'D1'},
								{text:'周线',value:'W1'},
								{text:'月线',value:'WN'}
							]
						}},
						//{xtype:'menuseparator'},
						//{text:'显示卖价线',name:'asKLine',iconCls:'f-mt mt-outline-right'},
						//{text:'显示买价线',name:'bidLine',iconCls:'f-mt mt-outline-left'},
						{xtype:'menuseparator'},
						{text:'放大',name:'zoom',iconCls:'f-mt mt-plus',value:1,handler:'onChartMenuItemClick'},
						{text:'缩小',name:'zoom',iconCls:'f-mt mt-reduction',value:-1,handler:'onChartMenuItemClick'}
					]
				}
			));
			
//			Ext.each(rightMenu.query('menuitem[name=zoom]'),function(menuItem){
//				if(menuItem.value==.2){
//					menuItem.setDisabled(viewParameter.zoom>=1.6);
//				}else{
//					menuItem.setDisabled(viewParameter.zoom<=.4);
//				}
//			});

//			rightMenu.down('menuitem[name=navigator]').setUserCls(viewParameter.navigator?'x-ui-enabled':'x-ui-disable');
//			Ext.each(rightMenu.query('menuitem[name=type]'),function(menuItem){
//				if(menuItem.value==viewParameter.type){
//					menuItem.setUserCls('x-ui-enabled');
//				}else{
//					menuItem.setUserCls('');
//				}
//			});
			Ext.each(rightMenu.query('menuitem[name=cycle]'),function(menuItem){
				if(menuItem.value==viewParameter.cycle){
					menuItem.setUserCls('x-ui-enabled');
				}else{
					menuItem.setUserCls('');
				}
			});

			//rightMenu.down('menuitem[name=volume]').setUserCls(viewParameter.volume?'x-ui-enabled':'x-ui-disable');
			//rightMenu.down('menuitem[name=asKLine]').setUserCls(viewParameter.asKLine?'x-ui-enabled':'x-ui-disable');
			//rightMenu.down('menuitem[name=bidLine]').setUserCls(viewParameter.bidLine?'x-ui-enabled':'x-ui-disable');
			
			
			e.preventDefault();  
			rightMenu.showAt(e.getXY());
		},this);		
	},
	
	
	
	
	

	
	onChartButtonClick:function(menuItem){
		var me=this,
			tabPanel=this.getView(),
			view=tabPanel.getActiveTab(),
			viewParameter=view.getViewModel().getData(),
			opts={name:menuItem.name};
		if(menuItem.value){
			opts.value=menuItem.value;
		}else{
			opts.value=viewParameter[menuItem.name]?false:true;
		}
		me.onChartUpdate(view,opts,menuItem);
	},
	onChartMenuItemClick:function(menuItem){
		var me=this,
			tabPanel=this.getView(),
			view=tabPanel.getActiveTab(),
			viewParameter=view.getViewModel().getData(),
			opts={name:menuItem.name};

		if(menuItem.value){
			opts.value=menuItem.value;
		}else{
			opts.value=viewParameter[menuItem.name]?false:true;
		}

		me.onChartUpdate(view,opts,menuItem);
	},
	
	onChartUpdate:function(view,opts,menuItem){
		var me=this,
			id=view.id+'-'+opts.name,
			viewModel=view.getViewModel(),
			viewParameter=viewModel.getData(),
			KLine=view.chart.get(view.id+'-KLine'),
			VLine=view.chart.get(view.id+'-VLine');
		
		switch(opts.name){
			case 'navigator':{
				var options=view.chart.options,
					state=options.navigator.enabled?true:false;
				options.navigator.enabled=state?true:false;
				options.scrollbar.height=state?12:0;
				options.scrollbar.buttonArrowColor=state?'red':'transparent';
				
				//me.onChartDestroy(view);
				console.log(view.chart)
				//view.chart.update(options)
				view.chart.redraw();
				//view.chart=new Highcharts.Chart(options);
				viewModel.set(opts.name,state);
			}break;
			case 'cycle':{
				if(viewParameter[opts.name]!=opts.value){
					//menuItem.setDisabled(true);
					view.reLoad();
					viewModel.set(opts.name,opts.value);
				}
			}break;
			case 'type':{
				KLine.update({type:opts.value});
				viewModel.set(opts.name,opts.value);
			}break;
			case 'volume':{
				VLine.setVisible(opts.value)
				viewModel.set(opts.name,opts.value);
			}break;
			case 'asKLine':{
				var line={type:'ask',color:'red',field:'ask',id:id};
				KLine.yAxis.removePlotLine(id)
				if(opts.value){
					KLine.yAxis.addPlotLine(me.createSvgLine(view,line))
				}
				viewModel.set(opts.name,opts.value);
			}break;
			case 'bidLine':{
				var line={type:'bid',color:'black',field:'bid',id:id};
				KLine.yAxis.removePlotLine(id)
				if(opts.value){
					KLine.yAxis.addPlotLine(me.createSvgLine(view,line))
				}
				viewModel.set(opts.name,opts.value);
			}break;
			case 'zoom':{
				var xAxis=view.chart.xAxis[0],
					min=xAxis.min,
					max=xAxis.max,
					time=60*1000;
				if(opts.value>0){
					min=min+(xAxis.len*.1*time)
					max=max-(xAxis.len*.1*time)
				}else{
					min=min-(xAxis.len*.1*time)
					max=max+(xAxis.len*.1*time)
				}
				min=min<xAxis.dataMin?xAxis.dataMin:min;
				max=max>xAxis.dataMax?xAxis.dataMax:max;
				xAxis.setExtremes(Math.ceil(min),Math.ceil(max));
				//view.chart.redraw();
			}break;
		}
	},
	
	
	createSvgLine:function(view,config){
		var viewParameter=view.getViewModel().getData();
		var line={
				//config:config,
				id:config.id,
				color:config.color,
				field:config.field,
				zIndex:7,
				width:1,
				label:{
					align:'right',
					x:0,y:0,
					textAlign:'left',
					useHTML:true,
					style:{color:'#fff','background':config.color,padding:'2px 5px'}
			}
		};
		if(config.field){
			var quoted=Ws.findQuoted(viewParameter.symbol);
			line.value=quoted[config.field]
			line.label.text=quoted[config.field]
		}else{
			line.value=config.value||0;
			line.label.text=config.text||'';
		}
		return line;
	},

	

	onChartInit:function(view){
		var me=this,
			chartTab=view.up('tabpanel'),
			toolbar=chartTab.getDockedItems()[0],
			viewParameter=view.getViewModel().getData();

		//=========================设置按钮
		me.onChartUpdate(view,{name:'navigator',value:viewParameter.navigator});
		me.onChartUpdate(view,{name:'volume',value:viewParameter.volume});
		me.onChartUpdate(view,{name:'type',value:viewParameter.type});
		me.onChartUpdate(view,{name:'asKLine',value:viewParameter.asKLine});
		me.onChartUpdate(view,{name:'bidLine',value:viewParameter.bidLine});
	},


	
	
	
	
	onChartAfterRender:function(view){
		var me=this,
			viewParameter=view.getViewModel().getData();

		PushService.ready(function(){
			var buffers=PushService.getBuffer();
			var config=buffers.getSymbol(viewParameter.symbol)||{};
			var options={
				//chart:{renderTo:'CHART-'+view.id,width:view.getWidth(),height:view.getHeight()},		
				chart:{renderTo:'CHART-'+view.id,width:me.getView().getWidth(),height:me.getView().getHeight()},		
				rangeSelector:false,	
				//xAxis:{minRange:false,range:range},  
				yAxis:[
					{lineWidth:2,labels:{formatter:function(){return this.value.toFixed(config.digits)}},tickInterval:config.point},
					{lineWidth:0,labels:{enabled:false},gridLineWidth:0,top:'85%',height:'15%'}
				],				
				//navigator:{enabled:true},
				//scrollbar:{enabled:true},
				tooltip:{
					headerFormat:'',
					crosshairs:[
						{width:1,color:'#333'},
						{width:1,color:'#333'}
					],
					crosshairs:false,	
					valueDecimals:config.digits
				},
				series:[	
					{type:'candlestick',data:[],yAxis:0,id:view.id+'-KLine',
				tooltip:{
					//shared:true,
					//backgroundColor:'#fff',
	//				pointFormatter	:function(){return 'QUOTE'}
					//headerFormat:false,
					//useHTML:true,
					pointFormatter:function(){
						var tip='';
							tip+='<b>'+Ext.Date.format(new Date(this.x),'Y-m-d H:i A')+'</b>';
							tip+='<br/>开盘：'+Ext.util.Format.stringNumeral(this.open,config.digits);
							tip+='<br/>最高：'+Ext.util.Format.stringNumeral(this.high,config.digits);
							tip+='<br/>最低：'+Ext.util.Format.stringNumeral(this.low,config.digits);
							tip+='<br/>收盘：'+Ext.util.Format.stringNumeral(this.close,config.digits);
							//volume?tip+='<br/>成交：<b>'+Ext.util.Format.stringNumeral(volume.point.y,2)+'</b>':'';
						return tip;
					}
				}
					},
					{type:'column',data:[],yAxis:1,id:view.id+'-VLine',visible:false}//,pointWidth:3
				]
			}
			view.chart=new Highcharts.StockChart(options);
			
		});
		
	},


	
	
	
	
	onChartDestroy:function(view){
		var me=this;
		if(view.chart){view.chart.destroy()};
		//me.onTaskStop(view);
	},
	onChartRemoved:function(view){
		this.onChartDestroy(view);
	},
	onChartResize:function(view,width,height){
		if(view.chart){
			view.chart.setSize(width,height);
		}
	},
	onTaskStart:function(view){
	},
	onTaskStop:function(view){
	}




	

});  
