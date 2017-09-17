Ext.define('Override.chart.series.Area',{
    override:'Ext.chart.series.Area',
	config:{
		xField:'objects',
		yField:'value',
		label:{field:'value'},
		style:{opacity:.6},
		marker:{
			opacity:0,
			scaling:0.01,
			fx:{duration:200,easing:'easeOut'}
		},
		highlightCfg:{
			opacity:1,
			scaling:1.5
		},		
		tooltip:{trackMouse:true}
	}
});


