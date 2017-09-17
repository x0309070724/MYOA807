Ext.define('APP.view.rd.analysis.tool.profit',{
    extend:'Ext.Container',
    controller:'rd.analysis',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	items:[
		{xtype:'grid',region:'west',width:480,
			title:'历史交易',
			store:{
				type:'rdTradeHistory',
				autoLoad:false,
				pageSize:10000,
				grouper:{
					groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d')},
					property:'close_time',
					direction:'DESC'
				},		
				proxy:{
					extraParams:{menu:'order'}
				}				
			},
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					{xtype:'searchbar',
						fields:[
							{emptyText:'账号',xtype:'textfield',name:'login',value:97671950,width:140}
						]
					},
					'->',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'日期',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d',width:120},
				{text:'订单号',dataIndex:'order',xtype:'templatecolumn',tpl:'#{order}',width:100,summaryType:'count'},
				{text:'交易类型',dataIndex:'cmd',renderer:'returnTradeCmd',minWidth:80,flex:1},
				{text:'交易量',dataIndex:'volume',tdCls:'x-ui-text-bold',width:80,align:'right',renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},
				{text:'开仓',xtype:'datecolumn',dataIndex:'open_time',width:70,format:'H:i:s',hidden:true},
				{text:'平仓',xtype:'datecolumn',dataIndex:'close_time',width:70,format:'H:i:s',hidden:true},
				{text:'持仓',align:'right',renderer:'returnTradePositionsTime',width:60},
				{text:'盈亏',dataIndex:'profit',width:80,align:'right',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnColorMoney'}
				//{text:'余额',dataIndex:'balance',width:100,align:'right',tdCls:'x-ui-active x-ui-text-blue',renderer:'returnShowMoney'}
			],
			viewConfig:{enableTextSelection:false},
			features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}],
			listeners:{ 
				//selectionchange:'onDataChange',
				itemdblclick:'onShowProfitChart'
			}
		},
		{xtype:'panel',region:'center',minWidth:600,flex:1,reference:'orderPanel',margin:'0 0 0 1',title:'交易详情',
			//layout:{type:'border',align:'stretch',padding:3},
			layout:{type:'vbox',align:'stretch'},
			items:[
				{xtype:'box',height:110,margin:1,
					reference:'orderInfo',
					tpl:[
						'<div class="x-ui-block-table">',
							'<table><tbody>',
								'<tr><td>订单：</td><td>#{order}</td><td>止盈/止损：</td><td>{sl} | {tp}</td><td>佣金</td><td>{commission}</td></tr>',
								'<tr><td>交易类型：</td><td>{cmd} {volume} {symbol}</td><td> </td><td> </td><td>税金</td><td>{taxes}</td></tr>',
								'<tr><td>开仓：</td><td>{open_time:date("Y-m-d H:i:s")}<r>{open_price}</r></td><td> </td><td> </td><td>利息</td><td>{storage}</td></tr>',
								'<tr><td>平仓：</td><td>{close_time:date("Y-m-d H:i:s")}<r>{close_price}</r></td><td> </td><td> </td><td>盈亏</td><td>{profit}</td></tr>',
							'</tbody></table>',
						'</div>'
					]
				},
				{xtype:'chartnavigator',minHeight:300,flex:1,border:false,
					navigator:{axis:'bottom',border:false},
					chart:{
						xtype:'cartesian',reference:'orderChart',
						interactions:{type:'panzoom',zoomOnPanGesture:false},
						store:{},
						axes:[
							{type:'numeric',position:'left'},
							{type:'category',position:'bottom',id:'bottom',dateFormat:'m-d H:i',grid:false,label:{rotate:{degrees:-45}}}
						],				
						series:[
							{type:'area',xField:'time',yField:'profit',
								marker:{radius:4,lineWidth:2},
								label:{field:'profit',display:'over'},
								highlightCfg:{opacity:1,scaling:1.5},
								style:{opacity:0.60},
								tooltip:{
									trackMouse:true,
									renderer:function(tooltip,record,item) {
										var text='<b>'+Ext.Date.format(record.data.time,'Y-m-d H:i:s')+'</b>';
											text+='<br/>盈亏：<b class="x-ui-text-red">'+record.data.profit+'</b>';
											//text+='<br/>开仓：'+Ext.Date.format(record.data.info.open_time,'m-d H:i')+'　'+record.data.info.open_price;
											//text+='<br/>平仓：'+Ext.Date.format(record.data.info.close_time,'m-d H:i')+'　'+record.data.info.close_price;
											text+='<br/>';
											text+='<br/><b>行情</b>';
											text+='<br/>开盘：'+record.data.rate.open;
											text+='<br/>最高：'+record.data.rate.high;
											text+='<br/>最低：'+record.data.rate.low;
											text+='<br/>收盘：'+record.data.rate.close;
										tooltip.setHtml(text);
									}
								}						
							}
						],
						listeners:{ 
							render:function(cartesian){
								var dom=Ext.getDom(cartesian.getId()),
									panzoom=cartesian.getInteraction('panzoom'),
									series=cartesian.getSeries()[0],
									xAxis=series.getXAxis();
								dom.onmousewheel=function(e){ 
									var range=xAxis._visibleRange;
									if(e.deltaY>0){
										min=range[0]>0?range[0]-.05:0;
										max=range[1]<1?range[1]+.05:1;
									}else{
										min=range[0]<1?range[0]+.05:1;
										max=range[1]>0?range[1]-.05:0
									}
									min=min>max?min-.05:min;
									max=max<min?max+.05:max;
									xAxis.setVisibleRange([min,max]);
									cartesian.redraw();
									//console.log(min,max)
								};
							}
						}
					}
				}
			]
		}	
	]
});












