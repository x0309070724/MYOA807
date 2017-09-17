Ext.define('APP.view.rd.analysis.tool.assets',{
    extend:'Ext.Container',
    controller:'rd.analysis',
	padding:1,
	layout:{type:'hbox',align:'stretch'},
	viewModel:{
		stores:{
			store:{
				type:'cross',
				autoLoad:false,
				pageSize:10000,
				model:'APP.model.sd.trade.record',
				grouper:{
					groupFn:function(record){return Ext.Date.format(record.data.close_time,'Y-m-d')},
					property:'close_time',
					direction:'ASC'
				},		
				sorters:[{property:'order',direction:'ASC'}],
				proxy:{
					url:Boot.appUrl('/rd/analysis/account/getCash.do'),
					extraParams:{}
				}
			}
		}
	},
	items:[
		{xtype:'grid',width:480,
			title:'交易历史',
			bind:'{store}',
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
				{text:'日期',dataIndex:'close_time',xtype:'datecolumn',format:'Y-m-d',width:120,hidden:true},
				{text:'订单号',dataIndex:'order',xtype:'templatecolumn',tpl:'#{order}',width:100,hidden:true},
				{text:'交易类型',dataIndex:'cmd',renderer:'returnTradeCmd',minWidth:80,flex:1,summaryType:'count'},
				{text:'交易量',dataIndex:'volume',tdCls:'x-ui-text-bold',width:80,align:'right',renderer:'returnNumber',summaryType:'sum',summaryRenderer:'returnNumber'},
				{text:'开仓',xtype:'datecolumn',dataIndex:'open_time',width:70,format:'H:i:s',hidden:true},
				{text:'平仓',xtype:'datecolumn',dataIndex:'close_time',width:70,format:'H:i:s',hidden:true},
				//{text:'持仓',align:'right',renderer:'returnTradePositionsTime',width:60},
				{text:'盈亏',dataIndex:'profit',width:80,align:'right',tdCls:'x-ui-active',renderer:'returnColorMoney',summaryType:'sum',summaryRenderer:'returnColorMoney'},
				{text:'余额',dataIndex:'balance',width:100,align:'right',tdCls:'x-ui-active x-ui-text-blue',renderer:'returnShowMoney'}
			],
			viewConfig:{enableTextSelection:false},
			features:[{ftype:'groupingsummary'},{ftype:'summary',dock:'bottom'}]
		},
		{xtype:'panel',title:'图表',minWidth:600,flex:1,margin:'0 0 0 1',
			layout:{type:'fit'},
			items:[
				{xtype:'chartnavigator',border:false,
					navigator:{axis:'bottom',border:false,bind:'{store}'},
					chart:{
						xtype:'cartesian',
						interactions:{type:'panzoom',zoomOnPanGesture:false},
						bind:'{store}',
						axes:[
							{type:'numeric',position:'left'},
							{type:'category',dateFormat:'m-d H:i',position:'bottom',id:'bottom',
								fields:['id','close_time','idxkey','symbol','profit'],
								grid:false,label:{rotate:{degrees:-45}}
							},
						],				
						series:[
							{type:'area',xField:'close_time',yField:'balance',
								marker:{radius:4,lineWidth:2},
								label:{field:'balance',display:'over'},
								highlightCfg:{opacity:1,scaling:1.5},
								style:{opacity:0.60},	
								tooltip:{
									trackMouse:true,
									renderer:function(tooltip,record,item) {
										var text='<b>'+Ext.Date.format(record.data.close_time,'Y-m-d H:i:s')+'</b>';
											text+='<br/>余额：<b class="x-ui-text-green">'+record.data.balance+'</b>';
											text+='<br/>'+record.data.idxkey+' '+record.data.symbol+' <b class="x-ui-text-red">'+record.data.profit+'</b>';
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
								};
							}
						}
					}		
				}
			]
		}
	]
});












