Ext.define('APP.view.rd.settings.basis',{
    extend:'Ext.form.Panel',
    controller:'rd.settings',
	width:680,
	viewModel:true,
	items:[
		{title:'同步频率设置',fieldDefaults:{allowBlank:false},items:[
			{columnWidth:.85,items:[
				{fieldLabel:'基础数据',xtype:'sliderfield',name:'basedata_time',bind:'{basedata_time}',increment:60*5,minValue:60*10,maxValue:60*60,tipText:function(thumb){return String(thumb.value/60)+' 分钟'}},
				{xtype:'box',bind:{html:'商品、分组信息等基础数据每 <b class="x-ui-text-red">{basedata_time/60}</b> 分钟同步一次'},margin:'-3 0 5 76'},
				{fieldLabel:'账户数据',xtype:'sliderfield',name:'accountdata_time',bind:'{accountdata_time}',increment:60,minValue:60,maxValue:60*10,tipText:function(thumb){return String(thumb.value/60)+' 分钟'}},
				{xtype:'box',bind:{html:'账户、历史订单等交易数据每 <b class="x-ui-text-red">{accountdata_time/60}</b> 分钟同步一次'},margin:'-3 0 5 76'}
			]}
		]},
		{title:'监控频率设置',items:[
			{columnWidth:.85,items:[
				{fieldLabel:'下单监控',xtype:'sliderfield',name:'singletest_time',bind:'{singletest_time}',increment:60,minValue:60,maxValue:60*10,tipText:function(thumb){return String(thumb.value/60)+' 分钟'}},
				{xtype:'box',bind:{html:'每 <b class="x-ui-text-red">{singletest_time/60}</b> 分钟检测一次订单开仓状态'},margin:'-3 0 5 76'},
				{fieldLabel:'行情监控',xtype:'sliderfield',name:'quoted_time',bind:'{quoted_time}',increment:1,minValue:1,maxValue:10,tipText:function(thumb){return String(thumb.value)+' 秒'}},
				{xtype:'box',bind:{html:'每 <b class="x-ui-text-red">{quoted_time}</b> 秒检测一次行情状态'},margin:'-3 0 5 76'}
			]}
		]}
	],
	mateParameters:{
		url:Boot.appUrl('/rd/settings/getBasis.do')
	},
	listeners:{afterrender:'onMateFormLoadData'},
	buttons:['->',
		{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
			mateParameters:{
				url:Boot.appUrl('/rd/settings/updateBasis.do')
			},
			handler:'onMateFormSubmit'
		},
		{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
	]
});
