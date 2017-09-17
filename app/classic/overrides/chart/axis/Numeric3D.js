Ext.define('Override.chart.axis.Numeric3D',{
    override:'Ext.chart.axis.Numeric3D',
	position:'left',
	majorTickSteps:9,
	grid:{odd:{fillStyle:'rgba(255,255,255,0.06)'},
	even:{fillStyle:'rgba(0,0,0,0.03)'}},
	renderer:'rendererAxesLabel'
});
