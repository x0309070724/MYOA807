Ext.define('APP.view.rd.monitor.controller',{
    extend:'APP.view.rd.controller',
    alias:'controller.rd.monitor',

	returnEquityVal:function(value,cell,record){
		var val=0,color='',icon='';
		if(value>0){
			val=Ext.util.Format.number(value,'0,0.00')
			color='x-ui-text-green';
			icon='icon icon-up';
		}else if(value<0){
			val=Ext.util.Format.number(value,'0,0.00')
			color='x-ui-text-red';
			icon='icon icon-down';
		}else{
			val='-'
			color='x-ui-text-grey';
			icon='icon icon-egal';
		}
		return Ext.String.format(
			'<span class="{2}"></span><r class="{1}">{0}</r>',
			val,color,icon
		);
	},
	
	returnEquityEQ:function(value,cell,record,rowIndex,colIndex,store,view){
		var val=0,color='',icon='';
		if(value>0){
			val=Ext.util.Format.number(value,'0,0.00%')
			color='x-ui-text-green';
			icon='icon icon-up-corner';
		}else if(value<0){
			val=Ext.util.Format.number(value,'0,0.00%')
			color='x-ui-text-red';
			icon='icon icon-down-corner';
		}else{
			val='-'
			color='x-ui-text-grey';
			icon='icon icon-egal';
		}
		return Ext.String.format(
			'<span class="{2}"></span><r class="{1}">{0}</r>',
			val,color,icon
		);
	},


	
	returnSpreadAvg:function(value,cell,record,rowIndex,colIndex,store,view){
		return Ext.String.format(
			'<div data-qtip="报价次数：{1} 次<br/>平均点差：{0}"><b class="x-ui-text-blue">{0}</b><r>{1}次</r></div>',
			Ext.util.Format.stringInteger(record.data.spread_avg),
			Ext.util.Format.stringInteger(record.data.count)
		);
	},
	returnSpread2Avg:function(value,cell,record,rowIndex,colIndex,store,view){
		if(record.data.spread2_count>0){
			return Ext.String.format(
				'<div><span class="x-ui-text-blue">{0}%</span><r>{1} 次</r></div>',
				Ext.util.Format.stringNumeral(record.data.spread2_avg),
				Ext.util.Format.stringInteger(record.data.spread2_count)
			);
		}
	},
	returnSpread5Avg:function(value,cell,record,rowIndex,colIndex,store,view){
		if(record.data.spread5_count>0){
			return Ext.String.format(
				'<div><span class="x-ui-text-blue">{0}%</span><r>{1} 次</r></div>',
				Ext.util.Format.stringNumeral(record.data.spread5_avg),
				Ext.util.Format.stringInteger(record.data.spread5_count)
			);
		}
	},
	//==================================================================================每小时 1条记录
	onQuotesHistoryHour:function(grid,selected){
		var record=selected[0],
			gridTotal=this.lookup('gridTotal'),
			gridDetail=this.lookup('gridDetail'),
			storeTotal=gridTotal.getStore(),
			storeDetail=gridDetail.getStore();
		if(!record){
			storeDetail.removeAll();
			return false;
		}	
		grid.select(record);
		storeDetail.removeAll();
		Ext.apply(storeDetail.proxy.extraParams,{
			app:record.data.symbol
		});
		storeDetail.load();
	},
	//=====================================================================行情明细
	onQuotesHistoryTime:function(grid,record,item,index,e,eOpts){
		var winid=Mate.getWinId(this,'allotRandom'),
			store=grid.getStore(),
			params=store.proxy.extraParams;
			console.log(Ext.Date.format(record.data.time,'Y-m-d'),Ext.Date.format(record.data.time,'H:i A'))
		var win=Ext.create('Ext.window.Window',{
			id:winid,
			title:'报价明细：'+record.data.symbol,
			modal:true,
			items:[
				{xtype:'grid',width:1000,height:600,
					store:{
						type:'cross',
						autoLoad:true,
						sorters:[{property:'time',direction:'DESC'}],
						proxy:{
							url:Boot.appUrl('/rd/mt4/getQuotes.do'),
							extraParams:{app:'record',date:Ext.Date.format(record.data.time,'Y-m-d'),time:Ext.Date.format(record.data.time,'H:i A'),symbol:record.data.symbol}
						}
					},
//					dockedItems:[
//						{dock:'top',xtype:'toolbar',items:[
//							'->',
//							{xtype:'refreshbutton'}
//						]}
//					],
					forceFit:true,
					columns:[
						{xtype:'rownumberer',width:40},
						//{text:'类型',dataIndex:'type',width:100},
						//{text:'商品',dataIndex:'symbol',width:100},
						{text:'时间',dataIndex:'time',width:80,align:'right',xtype:'datecolumn',format:'H:i:s'},
						{text:'买入价',dataIndex:'ask',width:100,align:'right',renderer:'returnQuotesPrice'},
						{text:'卖出价',dataIndex:'bid',width:100,align:'right',renderer:'returnQuotesPrice'},
						{text:'差价',dataIndex:'spread',width:80,align:'right',tdCls:'x-ui-active x-ui-text-red',renderer:'returnInt'},
						{text:'最高价',dataIndex:'high',width:100,align:'right',renderer:'returnQuotesPrice'},
						{text:'最低价',dataIndex:'low',width:100,align:'right',renderer:'returnQuotesPrice'}
					]
				},
			]
		});
		this.getView().add(win).show().center();
	},



		
})
