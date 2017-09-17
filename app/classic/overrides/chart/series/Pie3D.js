Ext.define('Override.chart.series.Pie3D',{
    override:'Ext.chart.series.Pie3D',
	config:{
		angleField:'value',
		label:{field:'objects',color:'#a74403',font:'bold 18px Helvetica,"Microsoft YaHei"'},
		style:{colorSpread:1.5,distortion:0.6,thickness:40,opacity:0.5},
		donut:20,
		highlight:{margin:20},
		tooltip:{trackMouse:true}
	}
});
