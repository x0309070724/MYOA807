﻿Ext.define('APP.view.sd.staff.csr.record',{
    extend:'Ext.Panel',
	layout:'fit',
    controller:'ia.account',
	defaults:{border:false},
	dockedItems:[
		{dock:'top',xtype:'toolbar',items:[
			{xtype:'segmentedbutton',defaults:{minWidth:60},reference:'csr',
				items:[
					{text:'IB',widget:'sd.staff.csr.recordIb'},
					{text:'IBC',widget:'sd.staff.csr.recordIbc'},
					{text:'SH',widget:'sd.staff.csr.recordSh'},
					{text:'ALL',widget:'sd.staff.csr.recordAll',pressed:true}
				],
				listeners:{ 
					change:'onMateChangeView'
				}
			},'-',
			{xtype:'searchbar',
				fields:[
					{emptyText:'日期从',xtype:'startdatefield',name:'startdate'},
					{emptyText:'日期至',xtype:'enddatefield',name:'enddate'},
					{emptyText:'首次入金',xtype:'monthfield',name:'firstDepositDate',bind:{hidden:'{csr.value==0}',disabled:'{csr.value==0}'}},
					{emptyText:'最后开户',xtype:'monthfield',name:'agentLastate',hidden:true,bind:{hidden:'{csr.value!=0}',disabled:'{csr.value!=0}'}},
					//{emptyText:'销售...',xtype:'comboCompanyStaff',root:103,name:'salesmanid'},
					{emptyText:'账号/代理...',xtype:'textfield',name:'query',width:140}
				]
			},
			'->',
			{xtype:'refreshbutton'}
		]}
	]
});
