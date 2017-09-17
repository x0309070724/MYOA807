Ext.define('APP.view.rd.trade.controller',{
	extend:'APP.view.controller',
	alias:'controller.rd.trade',
	returnTradeVolume:function(value,cell,record){
		if(value){
			return Ext.util.Format.stringNumeral(value,2);
		}
	},
	returnTradePositionsTime:function(value,cell,record){
		return Ext.util.Format.timeConsuming(record.data.open_time,record.data.close_time);
	},
	returnTradeOpen:function(value,cell,record){
		return Ext.String.format(
			'<b>{0}</b><r>{1}</r>',
			record.data.open_price!=0?Ext.util.Format.stringNumeral(record.data.open_price,record.data.digits):'',
			Ext.Date.format(record.data.open_time,'H:i:s')
		);
	},
	returnTradeClose:function(value,cell,record){
		return Ext.String.format(
			'<b>{0}</b><r>{1}</r>',
			record.data.close_price!=0?Ext.util.Format.stringNumeral(record.data.close_price,record.data.digits):'',
			Ext.Date.format(record.data.close_time,'H:i:s')
		);
	},
	returnTradePositionsCount:function(value,cell,record){
		switch(record.data.cmd){
			case 0:{
				var v=record.data.close_price-record.data.open_price
			}break;
			case 1:{
				var v=record.data.open_price-record.data.close_price
			}break;
		}
		v=parseInt(v*Math.pow(10,record.data.digits));
		if(v){
			return Ext.String.format(
				'<span class="{1}">{0}</span>',
				v,
				v>0?'x-ui-text-green':'x-ui-text-red'
			);
		}
	},
	
	
	
	returnTradeSlTp:function(value,cell,record){
		if(record.data.cmd<6){
			return Ext.String.format(
				'<span class="x-ui-text-grey">{0}</span><y></y><span class="x-ui-text-grey">{1}</span>',
				record.data.sl>0?record.data.sl:'NIL',
				record.data.tp>0?record.data.tp:'NIL'
			);
		}
	},
	returnTradeReason:function(value,cell,record){
		return Ext.String.format(
			'{0}',
			value
		);
	}









});  
