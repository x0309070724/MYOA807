Ext.define('APP.view.hr.staff.profile.infoTree',{
    extend:'Ext.tree.Panel',
    controller:'hr.staff.profile',
	store:{
		type:'tree',
		//folderSort:true,
		root:{expanded:true},
		lazyFill:false,
		sorters:[{property:'departmentid',direction:'ASC'},{property:'teamid',direction:'ASC'},{property:'postid',direction:'ASC'}],
		fields:[
			{name:'id',type:'int'},
			{name:'name',type:'string'},
			{name:'iconCls',type:'string',
				convert:function(value,record){
					if(record.data.leaf){
						return 'f-mt mt-user x-ui-text-grey'
					}else{
						return Ext.util.Format.teamIcon(record.data.id)
					}
				}
			}
			

		],
		proxy:{
			url:Boot.appUrl('/hr/staff/getTree.do'),
			extraParams:{cmd:'staff'},
			reader:{type:'json'}
		}
	},
	
    //reserveScrollbar:false,
    useArrows:true,
    rootVisible:false,
    multiSelect:false,
   // singleExpand:false,
    //border:true,
	columnLines:true,
	emptyText:'No Records',	
	
	viewConfig:{
		stripeRows:true,
		enableTextSelection:false
	},
	dockedItems:[
		{dock:'top',xtype:'toolbar',
			items:[
				{xtype:'searchbar',fields:[
					{emptyText:'部门...',xtype:'comboCompanyDepartment',width:120},
					{emptyText:'网点...',xtype:'comboCompanyBranch',width:120},
					{emptyText:'团队...',xtype:'comboCompanyTeam',name:'teamid'},
					{emptyText:'职务...',xtype:'comboCompanyPost',name:'postid'},
					{xtype:'textfield',name:'query',width:140,emptyText:'关键字...'}
				]},
				'->',
				{iconCls:'f-mt mt-creat',text:'入职',handler:'onCreatClick'},
				'-',
				{xtype:'refreshbutton'}
			]
		}
		//{dock:'bottom',xtype:'pagingbar'}
	],
	forceFit:true,
	columns:[
		{xtype:'rownumberer'},
		//{text:'NAME',xtype:'treecolumn',dataIndex:'name',minWidth:280},
		//{text:'姓名',xtype:'templatecolumn',dataIndex:'namecn',minWidth:120,flex:1,tpl:'{namecn}<r>{gender} {name}</r>',summaryType:'count'},
		{text:'姓名',xtype:'treecolumn',dataIndex:'name',width:280,renderer:'returnRootName'},
		{text:'入职档案',defaults:{sortable:true},columns:[
			{text:'入职日期',dataIndex:'startdate',width:100},
			{text:'工号',dataIndex:'login',width:100,renderer:'returnLogin'},
			//{text:'任职部门',xtype:'templatecolumn',dataIndex:'departmentid',width:100,tpl:'{department_name}'},
			//{text:'团队',xtype:'templatecolumn',dataIndex:'teamid',width:160,tpl:'{team_name}<r>{post_name}</r>'},
			{text:'手机',dataIndex:'mobile',width:100},
			{text:'Email',dataIndex:'email',width:160},
			{text:'企业QQ',xtype:'templatecolumn',width:130,tpl:'{qq}<r>{qq:qqLink}</r>'},
			{text:'电话',dataIndex:'phone',width:120,hidden:true}
		]},
		{text:'证件信息',defaults:{sortable:true},columns:[
			{text:'民族',dataIndex:'identity_nationality',width:80},
			{text:'出生日期',dataIndex:'birthday',width:100},
			{text:'户籍地址',dataIndex:'identity_address',width:260,renderer:'returnMore'},
			{text:'证件号',dataIndex:'identity_cardno',width:150}
		]},
		{text:'扩展资料',defaults:{sortable:true},hidden:true,columns:[
			{text:'现住地址',dataIndex:'address',width:180,renderer:'returnMore'},
			{text:'住宅电话',dataIndex:'residence_phone',width:120}
		]},
		{xtype:'actioncolumn',text:'操作',align:'center',width:60,flex:1,
			//tdCls:'x-ui-actioncolumn',
			items:[
				{tooltip:'更新资料',iconCls:'f-mt mt-action-update',handler:'onUpdateInfoClick'}
			]
		}
	],
	features:[{ftype:'summary',dock:'bottom'}]
});

