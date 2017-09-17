Ext.define('APP.view.sd.sales.resources.dev.form',{
    extend:'Ext.form.Panel',
	alias:'widget.sd.sales.resources.dev.form',
	frame:false,
	border:true,
	title:'电资开发',
	reference:'devForm',
	items:[
		{title:'销售对象',collapsible:false,items:[
			{columnWidth:.8,items:[
				{xtype:'box',reference:'fieldBoxTip',
					data:{id:0,qq:'00000000',mobile:'00000000000',name:'NAME',lastdate:'YYYY-MM-DD',province:'',city:''},
					tpl:[
						'<div class="x-ui-mobile-box">',
							'<div class="x-ui-face">{qq:qqLink}</div>',
							'<p><b>{mobile:spaceMobile}</b><br/><span>{name}</span>　<s>{lastdate}　{province}{city}</s></p>',
						'</div>'
					]
				}
			]},
			{columnWidth:.2,items:[
				{xtype:'button',iconCls:'f-mt mt-edit',minWidth:120,height:40,margin:'10 0 0 0',text:'更新资料',scale:'medium',handler:'onResourcesUpdateClick'}
			]}
		]},
		{title:'销售结果',collapsible:false,items:[
			{xtype:'hiddenfield',name:'idx'},
			{xtype:'hiddenfield',name:'idxkey'},
			{columnWidth:1,items:[
				{xtype:'fieldcontainer',hideEmptyLabel:false,items:[
					{xtype:'hiddenfield',name:'track',bind:{value:'{fieldTrack.value}'}},
					{xtype:'segmentedbutton',reference:'fieldTrack',publishes:'value',value:-100,defaults:{minWidth:120},
						items:[
							{text:'无效',value:-100},
							{text:'无意向',value:-1},
							{text:'待跟进',value:1}
						],
						listeners:{change:'onTrackFieldChange'}
					}
				]}
			]},
			{columnWidth:1,layout:{type:'vbox',align:'stretch'},reference:'fieldPanel'}
		]}
	],
	bbar:[
		'->',
		{xtype:'button',text:'保存结果',scale:'large',width:300,handler:'onTrackUpdate'},
		'->'
	]
});












