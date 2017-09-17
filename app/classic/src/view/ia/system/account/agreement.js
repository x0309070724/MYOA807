Ext.define('APP.view.ia.system.account.agreement',{
    extend:'Ext.grid.Panel',
    controller:'ia.system.account',
	store:{
		type:'cross',
		autoLoad:true,
		pageSize:false,
		fields:[
			{name:'id',type:'int'},
			{name:'title_cn',type:'string'},
			{name:'title_hk',type:'string'},
			{name:'title_en',type:'string'},
			{name:'content_cn',type:'string'},
			{name:'content_hk',type:'string'},
			{name:'content_en',type:'string'}
		],
		sorters:[{property:'id',direction:'ASC'}],
		proxy:{
			url:Boot.appUrl('/sd/system/settings/getAgreement.do')
		}
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			'->',
			{iconCls:'f-mt mt-creat',text:'新增',handler:'onAgreementCreatClick'},
			{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onAgreementRemoveClick'},
			'-',
			{xtype:'refreshbutton'}
		]}
	],
	forceFit:true,
	columns:[
		{xtype:'rownumberer'},
		{text:'协议名称 (简)',dataIndex:'title_cn',minWidth:200},
		{text:'协议名称 (繁)',dataIndex:'title_hk',minWidth:200},
		{text:'协议名称 (英)',dataIndex:'title_en',minWidth:200},
		{xtype:'actioncolumn',text:'操作',align:'center',maxWidth:60,minWidth:60,
			items:[
				{tooltip:'更改',iconCls:'f-mt mt-edit',handler:'onAgreementUpdateClick'}
			]
		}
	],
	listeners:{ 
		selectionchange:'onMateGridShowActionButton'
	}
});
















