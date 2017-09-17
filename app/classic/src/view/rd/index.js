Ext.define('APP.view.rd.index',{
    extend:'Ext.Container',
	xtype:'rdIndex',
    controller:'rd',
    layout:{type:'hbox',align:'stretch'},
 	margin:1,
	items:[
		{xtype:'panel',
			minWidth:600,
			flex:.4,
			bodyPadding:'20 5',
			layout:{type:'vbox',align:'stretch'},
			items:[
				{xtype:'box',
					html:[
						'<h3 class="x-ui-line-title">盘面概览</h3>',
						'<div class="x-ui-block-box">',
							'<ul>',
								'<li>在线账户<br/><b itemId="account.online_count" format="stringInteger">N/A</b></li>',
								'<li>持仓账户<br/><b itemId="account.trade_count" format="stringInteger">N/A</b></li>',
								'<li class="x-ui-text-red">全部账户<br/><b itemId="account.count" format="stringInteger">N/A</b></li>',
								'<li>余额<br/><b itemId="assets.balance" format="moneyK">N/A</b></li>',
								'<li>已用保证金<br/><b itemId="assets.margin" format="moneyK">N/A</b></li>',
								'<li class="x-ui-text-red">净值<br/><b itemId="assets.equity" format="moneyK">N/A</b></li>',
							'</ul>',
						'</div>',
						'<br/><br/><br/>',
						'<h3 class="x-ui-line-title">持仓概览</h3>',
						'<div class="x-ui-block-box">',
							'<ul>',
								'<li>持仓订单<br/><b itemId="trade.market_volume" format="stringNumeral">N/A</b></li>',
								'<li>挂单交易<br/><b itemId="trade.pending_volume" format="stringNumeral">N/A</b></li>',
								'<li class="x-ui-text-red">全部订单<br/><b itemId="trade.volume" format="stringNumeral">N/A</b></li>',
								'<li>手续费<br/><b itemId="trade.commission" format="money">N/A</b></li>',
								'<li>库存费<br/><b itemId="trade.storage" format="money">N/A</b></li>',
								'<li class="x-ui-text-red">浮亏<br/><b itemId="trade.profit" format="money">N/A</b></li>',
							'</ul>',
						'</div>'
					],
					listeners:{ 
						afterrender:'onSummaryRender'
					}
				}
			]
		},
		{xtype:'rd.trade.positions.group',store:'mt4TradeGroupByLogin',margin:'0 1',flex:.3,title:'持仓账户',parameter:{name:'账户',field:'login'}},
 		{xtype:'rd.trade.positions.group',store:'mt4TradeGroupBySymbol',flex:.3,title:'持仓商品',parameter:{name:'商品',field:'symbol'}}
   ]
});










