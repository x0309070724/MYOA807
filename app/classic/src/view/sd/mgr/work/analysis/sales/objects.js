﻿Ext.define('APP.view.sd.mgr.work.analysis.sales.objects',{
    extend:'Ext.Panel',
	layout:'fit',
    controller:'baseController',
	defaults:{border:false},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'segmentedbutton',name:'menu',defaults:{minWidth:100},
				items:[
					{text:'报表',widget:'sd.mgr.work.analysis.sales.objectsGrid',pressed:true},
					{text:'分析',widget:'sd.mgr.work.analysis.sales.objectsChart'}
				],
				listeners:{ 
					change:'onMateChangeView'
				}
			},'-',
			{xtype:'searchbar',
				fields:[
					{xtype:'segmentedfield',segmented:{
						name:'menu',defaults:{minWidth:60},reference:'objects',
						items:[
							{text:'员工',value:'staff',pressed:true},
							{text:'团队',value:'t1'},
							{text:'网点',value:'branch'}
						]
					}},
					{xtype:'datepartfield',name:'datepart',value:'month',allowBlank:false},
					{emptyText:'团队...',xtype:'comboCompanyTeam',root:103,name:'teamid'},
					{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'staffid'}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});
