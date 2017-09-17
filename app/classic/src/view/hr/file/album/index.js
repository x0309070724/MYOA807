Ext.define('APP.view.hr.file.album.index',{
    extend:'Ext.Panel',
    controller:'hr.file.album',
	layout:{type:'border',align:'stretch',padding:3},
	defaults:{split:false,border:true},
	items:[
		{xtype:'grid',region:'center',title:'相册组',flex:.5,
			reference:'gridBase',
			id:'photo_type',
			store:{
				type:'cross',
				autoLoad:true,
				fields:[
					{name:'id',type:'int'},
					{name:'title',type:'string'},
					{name:'explain',type:'string'},
					{name:'createtime',type:'date'},
					//{name:'updateTime',type:'date'},
					{name:'operatorid',type:'string'},
					{name:'departmentid',type:'string'},
					{name:'teamid',type:'string'},
					{name:'invalid',type:'int'}
				],
				pageSize:false,
				sorters:[{property:'id',direction:'desc'}],
				proxy:{
					url:Boot.appUrl('/system/photo/getPhotoGroup.do')
				}	
			},
			multiSelect:false,
			dockedItems:[
				{dock:'top',xtype:'toolbar',items:[
					'->',
					{iconCls:'f-mt mt-creat',text:'新增',handler:'onPhotoTitleCreatClick'},
					{iconCls:'f-mt mt-remove',text:'删除',disabled:true,selection:true,handler:'onPhotoTitleRemoveClick'},
					 '-',
					{xtype:'refreshbutton'}
				]}
			],
			columns:[
				{xtype:'rownumberer'},
				{text:'ID',dataIndex:'id',width:80,flex:1,hidden:true},
				{text:'日期',dataIndex:'creattime',width:100,xtype:'datecolumn',format:'Y-m-d',summaryType:'count'},
				{text:'主题',dataIndex:'title',minWidth:100,flex:1},
				{text:'操作人',flex:1,dataIndex:'operatorid'},
				{text:'部门',flex:1,dataIndex:'departmentid'},
				{text:'团队',flex:1,dataIndex:'teamid'},
				{text:'启用',flex:1,dataIndex:'invalid',renderer:'returnVoteStatus'},
				{text:'描述',flex:1,dataIndex:'invalid',width:140,renderer:'returnMore',hidden:true},
				{xtype:'actioncolumn',text:'操作',align:'center',width:60,
					items:[
						{tooltip:'编辑',iconCls:'f-mt mt-action-update',handler:'onPhotoTitleUpdateClick'}
					]
				}
				// {xtype:'actioncolumn',text:'操作',align:'center',width:60,
				// 	items:[
				// 		{tooltip:'进入投票页面',iconCls:'f-mt mt-action-link',handler:'onVotingPageClick',role:'other'}
				// 	]
				// }
			],
			features:[{ftype:'grouping'},{ftype:'summary',dock:'bottom'}],
			listeners:{
				selectionchange:'onChangePhotoLoadClick',
				rowclick:'onMateGridShowActionButton'
			}
	   	},
		{xtype:'panel',region:'east',flex:.5,scrollable:'y', title: '照片列表',reference:'gridChange', 
		tools:[
				{type:'plus',text:'上传图片',callback:'onPhotoCreatClick'},
				{type:'refresh',callback:'onResultsDataRefresh'}
			],
		items:[
				{xtype:'dataview',
					store:{
						type:'cross',
						fields: ['url','title','id'],
						proxy:{
							url:Boot.appUrl('/system/photo/getPhoto.do')
						}	
					},
					itemTpl:[
						//'<style></style>'+
						'<div class="photo">'+
						'<img src="//'+Boot.ossDomain+'{url}">'+
						'<p><i class="f-mt mt-remove" data-id="{id}" data-title="{title}"></i></p>'+
						'<h6>{title}</h6></div>'
					],
		            listeners: {
		                afterrender: function(a, b) {
		                    var els = a.all.elements;
		                    for (var i = 0; i < els.length; i++) {
		                        var img = els[i].getElementsByTagName('img')[0];
		                        var delBtn = els[i].getElementsByTagName('i')[0];
                            	delBtn.onclick = function(){
                            		var id=this.getAttribute('data-id'),
                            			title=this.getAttribute('data-title');
                            		var confirmText='<h6>删除文件：</h6>'+title;
									Mate.confirm(confirmText,function(button){
										if(button=='yes'){
											Mate.waiting('<h6>正在删除文件</h6>请等待指令执行完成...');
											Mate.ajax({
												url:Boot.appUrl('/system/photo/deletePhoto.do'),
												params:{id:id},
												success:function(data,opts){
													Ext.MessageBox.hide();
													Mate.showTask(Mate.settings.successMessage);
												},
												failure:function(data){
													Ext.MessageBox.hide();
													Mate.error(data.message);
												}
											});
										}
									});
                            	}
		                        img.onload = function() {
		                            if (this.complete) {
		                                var imgW = this.width,
		                                    imgH = this.height;
		                                if (imgW > imgH) {
		                                    // alert('宽图');
		                                    this.style.height = '100%';
		                                } else if (imgW < imgH) {
		                                    // alert('长图');
		                                    this.style.width = '100%';
		                                } else {
		                                    this.style.height = '100%';
		                                    this.style.width = '100%';
		                                    // alert('方图')
		                                    // var w = Math.min(120, 120);
		                                    // this.height = this.width = w;
		                                }
		                            }
		                        }

		                    };
		                }
		            }
				}
			]
		},		
	]
});
