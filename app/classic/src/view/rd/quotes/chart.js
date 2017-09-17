Ext.define('APP.view.rd.quotes.chart',{
    extend:'Ext.Panel',
	xtype:'rdQuotesChart',
	controller:'rd.quotes',
	//border:false,
	//bodyPadding:'10 0 0 0',
	height:'100%',
	viewModel:{
		data:{
			cycle:'M1',
			times:60,
			zoom:1,
			navigator:true,
			volume:false,
			type:'candlestick',
			askLine:false,
			bidLine:false,
			startDate:false,
			endDate:false
		}
	},
	
	bind:{title:'{symbol}　<b>{cycle}</b>'},
	listeners:{
		afterrender:'onChartAfterRender',
		resize:'onChartResize',
		removed:'onChartRemoved',
		destroy:'onChartDestroy'
	},
	bbar:[
		{xtype:'box',name:'chartTip',bind:{html:'From <b>{startDate:date("m-d H:i")}</b> To <b>{endDate:date("m-d H:i")}</b>'}}
	],
	initComponent:function(){
		var me=this;
		Ext.apply(this,{
			html:'<div id="CHART-'+this.id+'"></div>'
//			parameter:me.parameter
//			items:[
//				{xtype:'box',height:'100%',width:'100%',html:'AAAA',id:'CHART-'+this.id}
//			]
		});
		this.callParent();
	},
	reLoad:function(callback){
		var view=this,
			id=view.id,
			parameter=view.getViewModel().getData(),
			KLine=view.chart.get(view.id+'-KLine'),
			VLine=view.chart.get(view.id+'-VLine');
		view.setLoading(true);
		Mate.ajax({
			url:Boot.appUrl('/rd/symbol/getRate.do'),
			params:{
				cycle:parameter.cycle,
				symbol:parameter.symbol,
				login:parameter.login,
				startdate:parameter.startDate-(120*60*1000),
				enddate:parameter.endDate+(120*60*1000)
			},
			success:function(json){
				view.setLoading(false);
				var records=json.data.plant,
					data={ohlc:[],volume:[]};
				if(records.length){
					for(i=0;i<records.length;i+=1){
						data.ohlc.push([
							records[i][0], 	//the date
							records[i][1], 	//open
							records[i][2], 	//high
							records[i][3], 	//low
							records[i][4]	//close
						]);
						data.volume.push([
							records[i][0],	//the date
							records[i][5] 	//the volume
						]);
					}
					KLine.setData(data.ohlc,true,true,true);
					VLine.setData(data.volume,true,true,true);
				}
				return callback?callback():false;
			},
			failure:function(json){
				view.setLoading(false);
			}
		});	
	},
	getOrderSeries:function(record){
		var data=[
			[new Date(record.data.open_time).getTime(),record.data.open_price],
			[new Date(record.data.close_time).getTime(),record.data.close_price]
			//[new Date(record.data.open_time).getTime(),record.data.open_price],
			//[new Date(record.data.close_time).getTime(),record.data.close_price]
		];
		//data.push()
		//data.push()
		var seriesId=record.data.order+'-Line',
			color=Highcharts.getOptions().colors[parseInt(9*Math.random())],
			color='red',
			line={type:'line',name:'#'+record.data.order,data:data,record:record.data,id:seriesId,lineWidth:1,color:color,
				marker:{enabled:true,symbol:'circle',radius:10,fillColor:color,lineWidth:2},
	//				states:{hover:{
	//					lineColor:'rgba(0,0,0,.1)',
	//				}},
				
				tooltip:{
					pointFormatter: function() {
						//console.log('b',this.series.userOptions.record)
						var record=this.series.userOptions.record,
							tip='<br/>.<br/>';
							tip+='<b>'+record.symbol+' #'+record.order+'<b>';
							tip+='<br/>开仓：'+Ext.Date.format(record.open_time,'Y-m-d H:i:s')+'　　'+Ext.util.Format.stringNumeral(record.open_price,record.digits);
							tip+='<br/>平仓：'+Ext.Date.format(record.close_time,'Y-m-d H:i:s')+'　　'+Ext.util.Format.stringNumeral(record.close_price,record.digits);
							tip+='<br/>盈利：'+Ext.util.Format.stringNumeral(record.profit,record.digits);
						return tip
					}
				},
				dashStyle:'LongDash'
//				tooltip:{
//					headerFormat:'XXXXXXXX',
//					pointFormat:'<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>.'
//				}
			
			},
			flags={type:'flags',data:[{x:new Date(record.data.open_time).getTime(),color:color,fillColor:'yellow',title:'#'+record.data.order,text:'AAAAAAAAAAAA'}],onSeries:seriesId,shape:'squarepin',shadow:false,lineWidth:2,y:-40}
		return {line:line,flags:flags}
	},
	addOrderSeries:function(records){
		var view=this;
		Ext.Array.each(records,function(record){
			var series=view.chart.get(record.data.id+'-Line');
			if(!series){
				var opts=view.getOrderSeries(record)
				view.chart.addSeries(opts.line);
			}
			//view.chart.addSeries(series.flags)
		});
	}



	
	
	
});



























