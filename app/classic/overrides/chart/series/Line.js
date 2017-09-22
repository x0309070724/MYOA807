Ext.define('Override.chart.series.Line',{
    override:'Ext.chart.series.Line',
	xField:'objects',
	yField:'value',
	label:{field:'value'},
	style:{opacity:0.50,lineWidth:2,strokeStyle:'#849d01'},
	marker:{fillStyle:'#fff',radius:6},
	highlight:{fillStyle:'yellow',radius:10,lineWidth:2,strokeStyle:'#000'}
});