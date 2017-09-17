Ext.define('APP.view.rd.settings.singletest',{
    extend:'Ext.form.Panel',
    controller:'rd.settings',
	width:680,
	viewModel:true,
	items:[
		{title:'配置警报规则',fieldDefaults:{allowBlank:false},items:[
			{columnWidth:.5,items:[
				{fieldLabel:'监控账户',xtype:'numberfield',name:'login',vtype:'login'}
			]},
			{columnWidth:.95,items:[
				{fieldLabel:'触发条件',xtype:'sliderfield',name:'timeout',bind:'{timeout}',increment:5,minValue:5,maxValue:60,tipText:function(thumb){return String(thumb.value)+' 秒'}},
				{xtype:'box',bind:{html:'如果在 <b class="x-ui-text-red">{timeout}</b> 秒内无未产生新订单则触发报警'},margin:'-3 0 5 76'},
				{fieldLabel:'贬值',xtype:'sliderfield',name:'repeat',bind:'{repeat}',increment:1,minValue:1,maxValue:10,tipText:function(thumb){return String(thumb.value)+' 次'}},
				{xtype:'box',bind:{html:'连续 <b class="x-ui-text-red">{repeat}</b> 次超过阈值后报警'},margin:'-3 0 10 76'},
				{xtype:'fieldcontainer',layout:'hbox',fieldLabel:'通知对象',items:[
					{xtype:'comboCompanyStaffs',name:'notice_userid',flex:.5},
					{xtype:'checkboxarraygroup',name:'notice_type',flex:.5,margin:'0 0 0 10',items:[
						{boxLabel:'短信'},
						{boxLabel:'邮件'},
						{boxLabel:'微信',checked:true},
						{boxLabel:'QQ'}
					]}
				]},
				{fieldLabel:'备注',xtype:'textarea',name:'explain',allowBlank:true,height:50}
			]}
		]}
	],
	mateParameters:{
		url:Boot.appUrl('/rd/settings/getSingletest.do')
	},
	listeners:{afterrender:'onMateFormLoadData'},
	buttons:['->',
		{text:'保存信息',iconCls:'f-mt mt-button-submit',scale:'medium',
			mateParameters:{
				url:Boot.appUrl('/rd/settings/updateSingletest.do')
			},
			handler:'onMateFormSubmit'
		},
		{text:'取消操作',iconCls:'f-mt mt-button-cancel',scale:'medium',handler:'onMateWindowDestroy'}
	]
});
