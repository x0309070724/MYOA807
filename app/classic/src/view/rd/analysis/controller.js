Ext.define('APP.view.rd.analysis.controller',{
    extend:'APP.view.controller',
    alias:'controller.rd.analysis',
	returnTradePositionsTime:function(value,cell,record){
		return Ext.util.Format.timeConsuming(record.data.open_time,record.data.close_time);
	},
	
	//=========================================================================================================
	onShowProfitChart:function(grid,record,item,index,e,eOpts){
		var me=this,
			view=this.lookup('orderPanel'),
			orderInfo=this.lookup('orderInfo'),
			orderChart=this.lookup('orderChart'),
			orderChartStore=orderChart.getStore();
			
		orderInfo.setData(record);
		//orderChartStore.removeAll();
		view.setLoading(true);
		me.getChartData(record,function(data){
			//console.log(data)
			view.setLoading(false);
			orderChartStore.setData(data);
			//orderChart.getAxes()[1].setVisibleRange([0,600/data.length]);
			orderChart.redraw();
		});
	},
	getChartData:function(record,callback){	
		Number.prototype.normalize = function(digits) {
			digits = [1, 10, 100, 1E3, 1E4, 1E5, 1E6, 1E7, 1E8][digits > 8 ? 8 :
				digits < 0 ? 0 : digits
			];
			return this >= 0 ? Math.floor(this * digits + .5000001) / digits : Math
				.ceil(this * digits - .5000001) /
				digits;
		};
		//--- 计算某个订单的历史盈利
		function _tradeCalcProfit(Trade, RateInfo, Symbol,Period) {
			var _profit = 0;
			switch (Symbol.profit_mode) {
				case 0:
					var e = Symbol.contract_size * Trade.volume;
					_profit = Trade.cmd == 0 ? ((RateInfo.open * e) - (Trade.open_price * e)) : ((Trade.open_price * e) - (RateInfo.close * e));
					break;
				case 1:
					var e = Symbol.contract_size * Trade.volume;
					_profit = Trade.cmd == 0 ? (RateInfo.open - Trade.open_price) * e : (Trade.open_price - RateInfo.close) * e;
					break;
				case 2:
					_profit = Trade.cmd == 0 ? ((RateInfo.open - Trade.open_price) * Trade.volume * Symbol.tick_value / Symbol.tick_size) : ((Trade.open_price - RateInfo.close) * Trade.volume * Symbol.tick_value / Symbol.tick_size);
					break;
				default:
					break;
			}
	
			var s = Trade.symbol.substr(0, 3),
				m = Trade.symbol.substr(3, 3);
			if (m == 'USD') {} else if (s == 'USD') _profit =_profit/(Trade.cmd == 0 ? RateInfo.open : RateInfo.close);
			else {
				//----Symbol.currency
				// var _quote = _getQuote(m + 'USD',RateInfo.ctm,Period);
				// if (_quote) {
				// 	_profit *= (Trade.cmd == 0 ? _quote.bid : _quote.ask);
				// } else if (_quote = _getQuote('USD' + m,RateInfo.ctm,Period)) {
				// 	_profit /= (Trade.cmd == 0 ? _quote.bid : _quote.ask);
				// }
			}
	
			return _profit.normalize(2);
		}
	
		//--- 获取其他行情
		function _getQuote(symbol,ctm,period){
			var _rateinfo = _getRateInfo(symbol,period);
			if(!_rateinfo) return null;
			for (var i = 0; i < _rateinfo.length; i++) {
				//-- 获取close_time最近的时间
				if(_rateinfo[i] == ctm) return _rateinfo[i];
			};
	
			return null;
		}
	
		function _getRateInfo(symbol,period){
			return RateInfos[symbol]?RateInfos[symbol][period]:null;
		}
		
		


		PushService.ready(function(){
			var buffers=PushService.getBuffer();
			var data=[],
				symbol=buffers.getSymbol(record.data.symbol)||{};

			Mate.ajax({
				url:Boot.appUrl('/rd/symbol/getRate.do'),
				params:{
					cycle:'M1',
					symbol:record.data.symbol,
					login:record.data.login,
					startdate:record.data.open_time.getTime(),
					enddate:record.data.close_time.getTime()
					//Ext.Date.format(record.data.close_time,'Y-m-d H:i:s')
				},
				success:function(json){
					Ext.each(json.data.plant,function(arr){
						var time=Ext.Date.format(new Date(arr[0]),'Y-m-d H:i:s'),
							rateInfo={ctm:arr[0],open:arr[1],high:arr[2],low:arr[3],close:arr[4]},
							profit=_tradeCalcProfit(record.data,rateInfo,symbol);
						var row={
							id:arr[0],
							time:new Date(arr[0]),
							profit:profit,
							info:record.data,
							rate:rateInfo
						}
						data.push(row)
						//console.log(row)
					});
					return callback(data);
				},
				failure:function(json){}
			});	
		});
		

	},











	//===========================================================================================================GRID 双击
	onShowQuoteChart:function(grid,record,item,index,e,eOpts){
		var me=this;
			tabPanel=this.lookup('chartTab'),
			store=grid.getStore();

		var viewId=record.data.symbol+'-PANEL',
			view={xtype:'rdQuotesChart',id:viewId,closable:true,viewModel:{data:{login:record.data.login,symbol:record.data.symbol}}};
		
		if(!Ext.getCmp(viewId)){
			//console.log(viewId)
			tabPanel.add(view);
		}
		tabPanel.setActiveTab(viewId);
		var view=Ext.getCmp(viewId),
			viewModel=view.getViewModel(),
			viewParameter=view.getViewModel().getData();

		var orders=[],
			startDate,
			endDate;
		store.each(function(order){
			if(order.data.symbol==record.data.symbol){
				var openTime=order.data.open_time,
					closeTime=order.data.close_time;
				if(Ext.Date.format(closeTime,'Y-m-d')==Ext.Date.format(record.data.close_time,'Y-m-d')){
					orders.push(order);
					if(!startDate||openTime.getTime()<startDate){startDate=openTime.getTime()}
					if(!endDate||closeTime.getTime()>endDate){endDate=closeTime.getTime()}
				}
			}
		});
		
		if(!viewParameter.startDate){
			viewParameter.startDate=startDate;
			viewParameter.endDate=endDate;
			view.reLoad(function(){
				view.addOrderSeries(orders);
			});
		}else{
			//if(!orders.length){
				var reLoad=false;
				if(startDate<viewParameter.startDate){
					reLoad=true;
					viewModel.set('startDate',startDate)
				}
				if(endDate>viewParameter.endDate){
					reLoad=true;
					viewModel.set('startDate',endDate)
				}
				if(reLoad){
					view.reLoad(function(){
						var xAxis=view.chart.xAxis[0];
							xAxis.setExtremes(Math.ceil(xAxis.min),Math.ceil(xAxis.max));
						view.addOrderSeries(orders);
					});
				}else{
					view.addOrderSeries(orders);
				}
			//}
		}
	}
	
	








})
