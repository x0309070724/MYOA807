Ext.define('Override.chart.series.Pie',{
    override:'Ext.chart.series.Pie',
	//config:{
		//legend:{docked:'bottom'},
		//interactions:['rotate','itemhighlight'],
		angleField:'value',
		label:{field:'objects',color:'#a74403',calloutLine:{length:60,width:.5}},
		captions:{title:{style:{fontSize:18,fontWeight:300}}},
		style:{colorSpread:.8,distortion:0.6,thickness:40,opacity:0.5},
		//style:{strokeStyle:'white',lineWidth:1,opacity:.5},		
		donut:20,
		highlight:{margin:20},
		tooltip:{trackMouse:true,renderer:'rendererSeriesTooltip'}
	//}
});