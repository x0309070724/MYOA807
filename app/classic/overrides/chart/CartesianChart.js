Ext.define('Override.chart.CartesianChart',{
    override:'Ext.chart.CartesianChart',
	config:{
		//colors:["#7cb5ec","#f7a35c","#90ee7e","#7798BF","#aaeeee","#ff0066","#eeaaee","#55BF3B","#DF5353","#7798BF","#aaeeee"],
		//colors:['#1d5491'],
		padding:1,
		background:'transparent',
		insetPadding:'20 20 10 10',
		minWidth:300,
		interactions:['itemhighlight','crosshair'],
		animation:{easing:'easeOut',duration:500},
	//			sprites:[
	//				{type:'text',text:'AAAAAA',textAlign:'left',fontSize:28,x:30,y:40,name:'title'}, 
	//				{type:'text',text:'BBBBBB',textAlign:'left',fontSize:16,x:30,y:60,name:'date'}
	//			],				
		interactions:[
			{type:'panzoom',enabled:false,zoomOnPanGesture:false,
				axes:{
					left:{allowPan:false,allowZoom:false},
					bottom:{allowPan:true,allowZoom:true}
				}
			},
			{type:'crosshair',
				axes:{
					label:{fillStyle:'white'},
					rect:{fillStyle:'#344459',opacity:0.7,radius:5}
				}
			}
		],
		listeners:{
			itemhighlight:'onMateGridChartItemHighlight'
		}
	}
});
