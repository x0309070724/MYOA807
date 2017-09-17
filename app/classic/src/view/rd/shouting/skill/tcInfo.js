Ext.define('APP.view.rd.shouting.skill.tcInfo',{
    extend:'Ext.window.Window',
	xtype:'rdShoutingSkillTcInfo',
	controller:'rd.shouting.skill',
	width:1120,
	modal:true,
	autoShow:true,
	border:true,
	initComponent:function(){
		var me=this,
			record=this.record;
			
		if(record.store.proxy.extraParams.language=='en'){
			record.data.tickerTitle='Ticker';
			record.data.symbolTitle='Symbol';
			record.data.timeTitle='Time';
		}else{
			record.data.tickerTitle='交易代码';
			record.data.symbolTitle='交易品种';
			record.data.timeTitle='发布时间';
		}
		
		Ext.apply(this,{
			title:record.data.title,
			items:[
				{xtype:'container',
					userCls:'x-ui-tc-panel',
					data:record,
					tpl:[
						'<div class="x-ui-tc-body">',
							'<div class="x-ui-tc-info">',
								'<div class="x-ui-tc-attr">',
									'<p><label>{tickerTitle}：</label>{ticker}</p>',
									'<p><label>{symbolTitle}：</label>{symbol}</p>',
									'<p><label>{timeTitle}：</label>{time:date("Y-m-d H:i")} (UTC'+Ext.Date.getGMTOffset(record.data.time,false).replace(new RegExp(/(0)/g),'')+')</p>',
								'</div>',
								'<div class="x-ui-tc-content">',
									'<h3 class="x-ui-tc-title">{title}</h3>',
									'{content}',
								'</div>',
							'</div>',
							'<div class="x-ui-tc-image">',
								'<img src="{image}" alt="{title}"/>',
							'</div>',
						'</div>'
					]
				}
			]
		});	
		this.callParent();
	}
});


						
						