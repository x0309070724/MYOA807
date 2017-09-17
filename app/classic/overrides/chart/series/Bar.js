Ext.define('Override.chart.series.Bar',{
    override:'Ext.chart.series.Bar',
	config:{
		xField:'objects',
		yField:'value',
		label:{
			field:'value',
			display:'insideEnd',
			color:'#fefefe',
			color:'#a74403',
			strokeOpacity:0,
			font:'300 120% Helvetica',
			renderer:'rendererSeriesLabel'
		},
		stacked:true,
		style:{opacity:.8},
		highlight:{fillStyle:'yellow'},
		tooltip:{trackMouse:true}
	}
});
