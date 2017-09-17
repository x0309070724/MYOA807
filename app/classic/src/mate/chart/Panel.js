Ext.define('APP.mate.chart.Panel',{
    extend:'Ext.Panel',
	xtype:'mate.chart',
	title:'图表',
	iconCls:'f-mt mt-chart',
	reference:'chartView',
	region:'center',
	flex:1,
	listeners:{ 
		afterrender:function(chartView,eOpts){
			var me=this,
				grid=chartView.prev('grid');
			if(grid){
				grid.getStore().on('load',function(store){
					var chartSegmented=me.down('segmentedbutton');
					if(chartSegmented){
						Ext.Array.each(chartSegmented.items.items,function(button,i){
							if(button.pressed){
								//console.log(button.pressed,i)
								me.up('panel').getController().onMateChartFieldsSwitch(chartSegmented,i)
							}
						})
					}
				});
			}
		}
	},
	initComponent:function(){
		var me=this,
			chartButtons,
			chartItems;
		switch(me.mateParameters.type){
			case 'statistics':{
				chartButtons=[
					{text:'饼状图',iconCls:'f-mt mt-chart-pie-4',value:'pie',pressed:true},
					{text:'条状图',iconCls:'f-mt mt-tree-chart',value:'bar'} ,
					{text:'柱状图',iconCls:'f-mt mt-tree-diagram-4',value:'column'} 
				]
				chartItems=[
	//				{xtype:'container',name:'pie',layout:{type:'hbox',align:'stretch'},
	//					defaults:{
	//						xtype:'polar',flex:.5,
	//						series:[{type:'pie3d',style:{colorSpread:1,distortion:.6,thickness:30,opacity:.5}}]
	//					},
	//					items:[{name:'piePlus'},{name:'pieLess'}]
	//				},
					{xtype:'polar',name:'pie',series:[{type:'pie',tooltip:{renderer:'rendererSeriesTooltip'}}]},		
					{xtype:'cartesian',name:'bar',flipXY:true,hidden:true,
						axes:[
							{type:'numeric',position:'bottom'},
							{type:'category',position:'left'}
						],
						series:[{type:'bar',tooltip:{renderer:'rendererSeriesTooltip'}}]
					},		
					{xtype:'cartesian',name:'column',minWidth:400,hidden:true,
						axes:[{type:'numeric3d'},{type:'category3d'}],
						series:[{type:'bar3d',tooltip:{renderer:'rendererSeriesTooltip'}}]
					}		
				]
			}break;
			default:{
				chartButtons=[
					{text:'柱状图',iconCls:'f-mt mt-tree-diagram-4',value:'column',pressed:true},
					{text:'条状图',iconCls:'f-mt mt-tree-chart',value:'bar'} ,
					{text:'区域图',iconCls:'f-mt mt-figure-3',value:'area'}
				]
				chartItems=[
					{xtype:'cartesian',name:'column',hidden:true,
						axes:[{type:'numeric3d'},{type:'category3d'}],
						series:[{type:'bar3d',tooltip:{renderer:'rendererSeriesTooltip'}}]
					},
					{xtype:'cartesian',name:'bar',flipXY:true,hidden:true,
						axes:[
							{type:'numeric',position:'bottom'},
							{type:'category',grid:true,position:'left'}
						],
						series:[{type:'bar',tooltip:{renderer:'rendererSeriesTooltip'}}]
					},		
					
					{xtype:'cartesian',name:'area',hidden:true,
						axes:[{type:'numeric3d'},{type:'category3d'}],
						series:[{type:'area',highlightCfg:{opacity:1,scaling:1.5},tooltip:{renderer:'rendererSeriesTooltip'}}]
					}
				]
			}break;
		}
		
		Ext.apply(this,{
			dockedItems:[
				{dock:'top',xtype:'toolbar',
					items:[
						{xtype:'segmentedbutton',reference:'chartSwitchButtons',defaults:{minWidth:100,scale:'medium'},
							config:me.mateParameters.menu,
							listeners:{change:'onMateChartFieldsSwitch'}
						},
						'->',
						{xtype:'segmentedbutton',defaults:{minWidth:100,scale:'medium'},
							items:chartButtons,
							listeners:{change:'onMateChartSwitch'}
						},
						'-',
						{tooltip:'风格切换',iconCls:'f-mt mt-eye-on',scale:'medium',handler:'onMateChartThemeSwitch'},'-',
						{tooltip:'预览',iconCls:'f-mt mt-statistics',scale:'medium',handler:'onMateChartPreview'}
					]
				}
			],
			items:chartItems
		}); 
        this.callParent();
	}
})
